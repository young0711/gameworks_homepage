"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { LoginModal } from "@/components/auth/login-modal";
import { SignupModal } from "@/components/auth/signup-modal";
import { ProfileCompletionModal } from "@/components/auth/profile-completion-modal";
import { UserDropdown } from "@/components/auth/user-dropdown";

export function Header() {
  const { isLoggedIn } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auth modals state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up";
    
    if (direction === "down" && latest > 100) {
      setIsVisible(false);
    } else if (direction === "up") {
      setIsVisible(true);
    }
    
    setIsScrolled(latest > 50);
    setLastScrollY(latest);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleNeedsCompletion = (email: string) => {
    setSignupEmail(email);
    setShowProfileCompletion(true);
  };

  const navItems = [
    { label: "Member", href: "#team" },
    { label: "Roadmap", href: "#events" },
    { label: "History", href: "#history" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-md border-b border-white/5" 
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-8">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="relative flex items-center gap-3 transition-opacity hover:opacity-70"
            aria-label="Scroll to top"
          >
            <Image
              src="/images/logo.png"
              alt="GAMEWORKS Logo"
              width={32}
              height={32}
              className="h-7 w-7 md:h-8 md:w-8"
            />
            <span className="text-sm font-medium tracking-wider text-white md:text-base">
              GAMEWORKS
            </span>
          </button>

          {/* Navigation and Auth */}
          <div className="flex items-center gap-6 md:gap-10">
            {/* Nav Links */}
            <ul className="hidden items-center gap-6 sm:flex md:gap-10">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group relative text-sm font-light tracking-wide text-white/80 transition-colors hover:text-white md:text-base"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Auth Section */}
            {isLoggedIn ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-sm font-light tracking-wide text-white/70 transition-colors hover:text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignupModal(true)}
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-light tracking-wide text-white/90 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </nav>
      </motion.header>

      {/* Auth Modals */}
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupModal
        open={showSignupModal}
        onOpenChange={setShowSignupModal}
        onSwitchToLogin={handleSwitchToLogin}
        onNeedsCompletion={handleNeedsCompletion}
      />
      <ProfileCompletionModal
        open={showProfileCompletion}
        onOpenChange={setShowProfileCompletion}
        email={signupEmail}
      />
    </>
  );
}
