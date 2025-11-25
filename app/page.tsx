import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-6 max-w-2xl">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          NoteNest
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          A beautiful, blazing-fast note-taking app.<br />
          Private by default. Built for thinkers.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/api/auth/signin">Get Started Free</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com/yourusername/notenest">GitHub</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}