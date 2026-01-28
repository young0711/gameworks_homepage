'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const paragraphs = [
  {
    text: 'GAMEWORKS는 2000년대 초반, 글로벌미디어학부의 시작과 함께했습니다.',
  },
  {
    text: '20년이 넘는 시간 동안 학부와 함께 성장하며, 수많은 선배들의 열정과 노력이 켜켜이 쌓여왔습니다.',
  },
  {
    text: '우리는 단순한 소모임이 아닌, 글로벌미디어학부의 역사이자 미래입니다.',
  },
  {
    text: '끊임없이 진화하고, 새로운 도전을 두려워하지 않습니다.',
  },
];

function AnimatedParagraph({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
      className="mx-auto max-w-2xl text-xl leading-relaxed text-foreground/80 md:text-2xl lg:text-3xl"
    >
      {text}
    </motion.p>
  );
}

export function BrandStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-32 md:py-48"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-16 md:gap-24">
          {paragraphs.map((para, index) => (
            <AnimatedParagraph key={index} text={para.text} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
