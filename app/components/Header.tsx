'use client';

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          StoryBit
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm md:text-base">
          <Link href="/" className="hover:opacity-80 transition">Home</Link>
          <span className="opacity-70 cursor-default">TV Shows</span>
          <span className="opacity-70 cursor-default">My List</span>
        </nav>

      </div>
    </header>
  );
}
