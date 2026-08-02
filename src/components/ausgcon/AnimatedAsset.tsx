"use client";

import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
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
  const pointerXValue = useMotionValue(0);
  const pointerYValue = useMotionValue(0);
  const pointerRotateValue = useMotionValue(0);
  const pointerX = useSpring(pointerXValue, { stiffness: 95, damping: 22 });
  const pointerY = useSpring(pointerYValue, { stiffness: 95, damping: 22 });
  const pointerRotate = useSpring(pointerRotateValue, { stiffness: 90, damping: 24 });
  const combinedY = useTransform(
    [translateY, pointerY],
    ([scrollOffset, pointerOffset]) => Number(scrollOffset) + Number(pointerOffset),
  );
  const combinedRotate = useTransform(
    [rotate, pointerRotate],
    ([scrollRotation, pointerRotation]) => Number(scrollRotation) + Number(pointerRotation),
  );

  useEffect(() => {
    const section = ref.current?.closest(".narrative") as HTMLElement | null;
    if (!section || reducedMotion) return;

    const resetPointer = () => {
      pointerXValue.set(0);
      pointerYValue.set(0);
      pointerRotateValue.set(0);
    };
    const handlePointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = section.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
      pointerXValue.set(normalizedX * 56 * direction);
      pointerYValue.set(normalizedY * 36);
      pointerRotateValue.set(normalizedX * 5 * direction);
    };

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", resetPointer);
    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", resetPointer);
    };
  }, [direction, pointerRotateValue, pointerXValue, pointerYValue, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: pointerX, y: combinedY, rotate: combinedRotate }}
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
