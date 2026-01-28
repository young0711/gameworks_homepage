import Link from 'next/link';
import { Mail, MessageCircle, Instagram } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

export function Footer() {
  return (
    <footer className="bg-black py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Contact Info */}
          <div className="space-y-1 text-[10px] text-white/50 md:text-xs">
            <p>숭실대학교 글로벌미디어학부</p>
            <a
              href="mailto:gameworks@ssu.ac.kr"
              className="block transition-colors hover:text-white/70"
            >
              gameworks@ssu.ac.kr
            </a>
          </div>

          {/* Support Button */}
          <Link
            href={ROUTES.APPLY}
            className="rounded-md border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] font-light tracking-wide text-white/90 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 md:text-xs"
          >
            지원하기
          </Link>

          {/* SNS Icons */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:gameworks@ssu.ac.kr"
              className="text-white/50 transition-colors hover:text-white/80"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="text-white/50 transition-colors hover:text-white/80"
              aria-label="KakaoTalk"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="text-white/50 transition-colors hover:text-white/80"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>

          {/* Copyright */}
          <div className="mt-4 text-[9px] text-white/30 md:text-[10px]">
            © {new Date().getFullYear()} GAMEWORKS. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
