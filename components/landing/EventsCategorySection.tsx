'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export function EventsCategorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section id="events" ref={ref} className="relative h-[120vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/cherry-blossom.jpg"
          alt="Group photo with cherry blossoms"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/30" />
      </div>

      <div className="sticky top-0 flex h-screen flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[15vw] font-black leading-none tracking-tighter text-primary-foreground md:text-[12vw]"
        >
          Events
        </motion.h2>

        <motion.div
          style={{ x }}
          className="mt-12 flex gap-4 whitespace-nowrap"
        >
          {['MT', '스터디', '프로젝트', '네트워킹', '해커톤', '전시회', '워크샵'].map(
            (event, i) => (
              <span
                key={i}
                className="text-xl font-medium tracking-wide text-primary-foreground/80 md:text-2xl"
              >
                {event}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
