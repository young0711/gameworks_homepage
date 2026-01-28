"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const devImages = [
  { src: "/images/dev-1.jpg", alt: "Code on screen" },
  { src: "/images/dev-2.jpg", alt: "Developer workspace" },
  { src: "/images/dev-3.jpg", alt: "Team collaboration" },
  { src: "/images/dev-4.jpg", alt: "Game development" },
];

export function DevSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-muted py-32 md:py-48">
      <div className="absolute inset-0">
        <Image
          src="/images/dev-bg.jpg"
          alt="Development background"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-muted/80" />
      </div>

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 text-center text-[20vw] font-black leading-none tracking-tighter text-foreground md:mb-32"
        >
          DEV
        </motion.h2>

        <div className="space-y-8">
          <motion.div style={{ x: x1 }} className="flex gap-6">
            {[...devImages, ...devImages].map((img, i) => (
              <div
                key={`row1-${i}`}
                className="relative h-48 w-72 flex-shrink-0 overflow-hidden md:h-64 md:w-96"
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>

          <motion.div style={{ x: x2 }} className="flex gap-6">
            {[...devImages.reverse(), ...devImages].map((img, i) => (
              <div
                key={`row2-${i}`}
                className="relative h-48 w-72 flex-shrink-0 overflow-hidden md:h-64 md:w-96"
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
