import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) return new Response("Unauthorized", { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const notes = await prisma.note.findMany({
    where: { userId: user?.id },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) return new Response("Unauthorized", { status: 401 });

  const { title, content } = await request.json();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const note = await prisma.note.create({
    data: {
      title: title || "Untitled",
      content: content || "",
      userId: user!.id,
    },
  });

  return NextResponse.json(note, { status: 201 });
}