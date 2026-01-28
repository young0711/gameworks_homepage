"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FooterSection() {
  return (
    <footer className="bg-primary py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <h3 className="mb-8 text-4xl font-black tracking-tight text-primary-foreground md:text-5xl">
            GAMEWORKS
          </h3>

          <Button
            size="lg"
            className="mb-12 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            지원하기
          </Button>

          <div className="mb-12 flex items-center gap-6">
            <a
              href="#"
              className="text-primary-foreground/60 transition-colors hover:text-primary-foreground"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-primary-foreground/60 transition-colors hover:text-primary-foreground"
              aria-label="KakaoTalk"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="mailto:gameworks@ssu.ac.kr"
              className="text-primary-foreground/60 transition-colors hover:text-primary-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="space-y-2 text-sm text-primary-foreground/50">
            <p>숭실대학교 글로벌미디어학부</p>
            <p>gameworks@ssu.ac.kr</p>
          </div>

          <div className="mt-12 text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} GAMEWORKS. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
