'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
    setLastScrollY(latest);
  });

  const navItems = [
    { label: 'member', href: ROUTES.MEMBER },
    { label: 'roadmap', href: ROUTES.ROADMAP },
    { label: 'history', href: ROUTES.HISTORY },
  ];

  return (
    <motion.header
      initial={{ opacity: 1 }}
      animate={{
        height: isScrolled ? '56px' : '80px',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link
          href={ROUTES.HOME}
          className="relative flex items-center transition-opacity hover:opacity-70"
          aria-label="GAMEWORKS Home"
        >
          <span
            className={`font-medium tracking-wider text-white transition-all duration-300 ${
              isScrolled ? 'text-sm md:text-base' : 'text-base md:text-lg'
            }`}
          >
            GAMEWORKS
          </span>
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-6 md:gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`group relative text-sm font-light tracking-wide transition-colors md:text-base ${
                    isActive
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
