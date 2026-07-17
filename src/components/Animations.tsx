'use client';

import { motion, Variants } from 'framer-motion';

export function FadeIn({ children, delay = 0, y = 30 }: { children: React.ReactNode, delay?: number, y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerText({ text }: { text: string }) {
  const words = text.split(" ");
  
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      className="inline-block"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={item} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function GlowingStarsText({ text }: { text: string }) {
  const letters = text.split("");
  
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0, filter: 'brightness(0) blur(10px)' },
    show: { 
      opacity: 1, 
      scale: 1, 
      filter: 'brightness(1.5) blur(0px)',
      transition: { type: 'spring', damping: 12, stiffness: 100 }
    }
  };

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      className="text-3xl font-light tracking-wide text-white/90 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={item} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
}
