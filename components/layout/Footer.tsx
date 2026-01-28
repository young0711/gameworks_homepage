import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-xs text-muted-foreground">
            © 2025 GAMEWORKS. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Link href="/apply" className="hover:underline">
            지원하기
          </Link>
          {/* TODO: SNS 아이콘 추가 */}
        </div>
      </div>
    </footer>
  );
}
