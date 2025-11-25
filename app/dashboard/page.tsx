import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NoteList } from "@/components/NoteList";
import { NewNoteButton } from "@/components/NewNoteButton";
import Navbar from "@/components/Navbar";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) redirect("/api/auth/signin");

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Notes</h1>
          <NewNoteButton />
        </div>
        <NoteList />
      </div>
    </>
  );
}