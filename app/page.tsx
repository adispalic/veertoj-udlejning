// File: app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Udlej dit værktøj</h1>
      <p className="text-lg text-center max-w-xl mb-6">
        Velkommen til din nye værktøjsudlejningsplatform. Her kan du nemt oprette, søge og leje
        værktøj – alt sammen på dansk og engelsk.
      </p>
      <div className="space-x-4">
        <Link href="/tools" className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow">
          Se værktøj
        </Link>
        <Link href="/add-tool" className="bg-green-500 text-white px-4 py-2 rounded-xl shadow">
          Opret værktøj
        </Link>
      </div>
    </main>
  );
}