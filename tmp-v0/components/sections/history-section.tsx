"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function HistorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="history" ref={ref} className="relative h-[120vh] overflow-hidden bg-primary">
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <Image
          src="/images/city-night.jpg"
          alt="City at night symbolizing history and continuity"
          fill
          className="object-cover opacity-60"
          priority
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/50" />
      
      <motion.div
        style={{ opacity }}
        className="sticky top-0 flex h-screen flex-col items-center justify-center px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 text-sm uppercase tracking-[0.3em] text-primary-foreground/60"
        >
          Since 2000s
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-5xl font-black tracking-tight text-primary-foreground md:text-7xl lg:text-8xl"
        >
          역사 있는
          <br />
          소모임
        </motion.h2>
      </motion.div>
    </section>
  );
}
