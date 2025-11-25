"use client";

import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export function NewNoteButton() {
  const createNote = async () => {
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title: "New Note", content: "" }),
    });
    const note = await res.json();
    window.location.href = `/note/${note.id}`;
  };

  return (
    <Button onClick={createNote} size="lg">
      <Plus className="mr-2 h-5 w-5" /> New Note
    </Button>
  );
}