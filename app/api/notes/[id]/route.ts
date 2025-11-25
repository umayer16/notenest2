import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session?.user?.email) return new Response("Unauthorized", { status: 401 });

  const note = await prisma.note.findUnique({
    where: { id: params.id },
  });

  if (!note || note.userId !== (await getUserId(session))) {
    return new Response("Not found", { status: 404 });
  }

  return NextResponse.json(note);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session?.user?.email) return new Response("Unauthorized", { status: 401 });

  const { title, content } = await request.json();
  const userId = await getUserId(session);

  const note = await prisma.note.updateMany({
    where: { id: params.id, userId },
    data: { title, content },
  });

  if (note.count === 0) return new Response("Not found", { status: 404 });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session?.user?.email) return new Response("Unauthorized", { status: 401 });

  await prisma.note.deleteMany({
    where: { id: params.id, userId: await getUserId(session) },
  });

  return new Response(null, { status: 204 });
}

async function getUserId(session: any) {
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  return user!.id;
}