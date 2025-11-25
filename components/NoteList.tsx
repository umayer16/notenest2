import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import NoteCard from "./NoteCard";

export async function NoteList() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const notes = await prisma.note.findMany({
    where: { userId: user?.id },
    orderBy: { updatedAt: "desc" },
  });

  if (notes.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-xl">No notes yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}