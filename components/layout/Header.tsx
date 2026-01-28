'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">GAMEWORKS</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/member"
            className={`transition-colors hover:text-foreground/80 ${
              pathname === '/member' ? 'text-foreground' : 'text-foreground/60'
            }`}
          >
            member
          </Link>
          <Link
            href="/roadmap"
            className={`transition-colors hover:text-foreground/80 ${
              pathname === '/roadmap' ? 'text-foreground' : 'text-foreground/60'
            }`}
          >
            roadmap
          </Link>
          <Link
            href="/history"
            className={`transition-colors hover:text-foreground/80 ${
              pathname === '/history' ? 'text-foreground' : 'text-foreground/60'
            }`}
          >
            history
          </Link>
        </nav>
      </div>
    </header>
  );
}
