"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function StudentsSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/study-notes.jpg"
          alt="Study atmosphere with handwritten notes"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-primary-foreground/70">
            Our Purpose
          </span>
          <h2 className="text-5xl font-black tracking-tight text-primary-foreground md:text-7xl lg:text-8xl">
            학생을 위하는
            <br />
            소모임
          </h2>
          <p className="mx-auto mt-8 max-w-md text-lg text-primary-foreground/80 md:text-xl">
            배움의 열정을 나누고, 함께 성장하는 공간
          </p>
        </motion.div>
      </div>
    </section>
  );
}
