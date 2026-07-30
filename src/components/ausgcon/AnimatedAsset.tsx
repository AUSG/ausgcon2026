"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedAssetProps {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
  direction?: number;
  priority?: boolean;
}

export function AnimatedAsset({
  src,
  alt,
  className,
  width,
  height,
  direction = 1,
  priority = false,
}: AnimatedAssetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [40 * direction, -40 * direction],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [-1.5 * direction, 1.5 * direction],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: translateY, rotate }}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 88vw, 48vw"
        priority={priority}
      />
    </motion.div>
  );
}
