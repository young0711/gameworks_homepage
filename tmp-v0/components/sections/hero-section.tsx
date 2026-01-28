"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // 3D object parallax based on scroll
  const objectY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const objectScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const objectRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  // Smooth spring for mouse parallax
  const springConfig = { stiffness: 50, damping: 30 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize mouse position to -1 to 1
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      mouseX.set(x * 30);
      mouseY.set(y * 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const letters = [
    { char: "G", weight: "font-thin" },
    { char: "A", weight: "font-extralight" },
    { char: "M", weight: "font-light" },
    { char: "E", weight: "font-normal" },
    { char: "W", weight: "font-medium" },
    { char: "O", weight: "font-semibold" },
    { char: "R", weight: "font-bold" },
    { char: "K", weight: "font-extrabold" },
    { char: "S", weight: "font-black" },
  ];

  return (
    <section
      ref={ref}
      className="relative h-[200vh]"
    >
      {/* Background with subtle blue gradient */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Subtle blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-indigo-950/10 via-transparent to-transparent" />
        
        {/* 3D Object with parallax */}
        <motion.div
          style={{
            y: objectY,
            scale: objectScale,
            rotateZ: objectRotate,
            x: mouseX,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 120,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              y: mouseY,
            }}
            className="relative"
          >
            <Image
              src="/images/hero-3d-object.png"
              alt=""
              width={800}
              height={800}
              className="h-[60vh] w-auto max-w-none opacity-60 md:h-[80vh]"
              priority
            />
            {/* Soft glow effect */}
            <div className="absolute inset-0 blur-3xl">
              <Image
                src="/images/hero-3d-object.png"
                alt=""
                width={800}
                height={800}
                className="h-[60vh] w-auto max-w-none opacity-20 md:h-[80vh]"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Content overlay */}
        <div className="relative flex h-full flex-col items-center justify-center">
          <motion.div
            style={{ scale, opacity, y }}
            className="flex flex-col items-center gap-6 px-4 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex text-[12vw] leading-none tracking-tighter text-white md:text-[10vw]"
            >
              {letters.map((item, index) => (
                <motion.span
                  key={index}
                  className={item.weight}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {item.char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-sm tracking-widest text-white/60 md:text-base"
            >
              글로벌미디어학부 종합 학술 소모임
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest text-white/40">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-8 w-5 rounded-full border-2 border-white/20"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mx-auto mt-1.5 h-2 w-1 rounded-full bg-white/40"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
