import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Editor from "@/components/Editor";

export default async function NotePage({ params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/api/auth/signin");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  const note = await prisma.note.findFirst({
    where: { id: params.id, userId: user?.id },
  });

  if (!note) {
    redirect("/dashboard");
  }

  return <Editor note={note} />;
}