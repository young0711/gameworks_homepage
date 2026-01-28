"use client";

import { motion } from "framer-motion";

const executives = [
  { role: "회장", names: ["조영찬", "장윤아"] },
  { role: "부회장", names: ["유다은", "최서정", "최지원", "박서연"] },
  { role: "총무", names: ["박서영"] },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function TeamSection() {
  return (
    <section id="team" className="bg-background py-32 md:py-48">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Leadership
          </span>
          <h2 className="text-5xl font-black tracking-tight text-foreground md:text-7xl">
            발전하는
            <br />
            소모임
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          {executives.map((exec, groupIndex) => (
            <motion.div
              key={exec.role}
              variants={itemVariants}
              className="mb-16 last:mb-0"
            >
              <h3 className="mb-6 text-center text-lg font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {exec.role}
              </h3>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {exec.names.map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className="flex h-24 w-24 items-center justify-center border border-border bg-card transition-all duration-300 group-hover:border-foreground group-hover:bg-foreground md:h-32 md:w-32">
                      <span className="text-lg font-semibold text-card-foreground transition-colors group-hover:text-background md:text-xl">
                        {name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 text-center text-lg text-muted-foreground md:text-xl"
        >
          "글미를 넘어 숭실대를 대표하는 그날까지…"
        </motion.p>
      </div>
    </section>
  );
}
