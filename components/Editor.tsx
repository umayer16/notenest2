'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Editor({ note }: { note?: { id: string; title: string; content: string } }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isPreview, setIsPreview] = useState(false);

  const saveNote = async () => {
    const method = note ? 'PATCH' : 'POST';
    const url = note ? `/api/notes/${note.id}` : '/api/notes';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Note"
            className="text-2xl font-bold outline-none w-full max-w-md"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
              {isPreview ? "Edit" : "Preview"}
            </Button>
            <Button onClick={saveNote}>Save</Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {isPreview ? (
          <Card className="p-8 prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {content}
            </ReactMarkdown>
          </Card>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing... (Markdown supported)"
            className="w-full min-h-screen p-4 text-lg outline-none resize-none font-mono"
          />
        )}
      </div>
    </div>
  );
}