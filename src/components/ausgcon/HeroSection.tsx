"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 80, damping: 24 });
  const y = useSpring(useMotionValue(0), { stiffness: 80, damping: 24 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.018);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.018);
  };

  return (
    <section id="top" className="hero" onPointerMove={handlePointerMove}>
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__inner">
        <motion.div
          className="hero__copy"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">AWSKRUG UNIVERSITY STUDENT GROUP</p>
          <h1>
            <span>AUSGCON 2026</span>
            <strong>CHALLENGE</strong>
          </h1>
          <p className="hero__subtitle">Dive into Tech,<br />Jump into Future</p>
          <p className="hero__statement">Every challenge becomes the next jump.</p>
          <div className="hero__meta">
            <span>2026. MM. DD</span>
            <span>SEOUL</span>
          </div>
          <div className="hero__actions">
            <a className="register-button" href="#register">사전 등록하기 <span>↗</span></a>
            <a className="text-link" href="#schedule">프로그램 미리보기 <span>↓</span></a>
          </div>
        </motion.div>
        <motion.div
          className="hero__asset"
          style={{ x, y }}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9, rotate: -17 }}
          animate={{ opacity: 1, scale: 1, rotate: -23 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/assets/ausgcon/keyring.png"
            alt="구름, TECH 키캡, 별 오브제가 연결된 AUSGCON 키링"
            width={1240}
            height={1754}
            sizes="(max-width: 768px) 96vw, 58vw"
            priority
          />
        </motion.div>
      </div>
      <p className="hero__scroll">SCROLL TO BEGIN <span aria-hidden="true">↓</span></p>
    </section>
  );
}
