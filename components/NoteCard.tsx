import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { format } from "date-fns";

type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
};

export default function NoteCard({ note }: { note: Note }) {
  const preview = note.content.slice(0, 120) + (note.content.length > 120 ? "..." : "");

  return (
    <Link href={`/note/${note.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="line-clamp-2">{note.title || "Untitled"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-3">{preview || "No content"}</p>
          <p className="text-xs text-gray-400 mt-4">
            {format(new Date(note.updatedAt), "MMM d, yyyy h:mm a")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
