"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 80, damping: 24 });
  const y = useSpring(useMotionValue(0), { stiffness: 80, damping: 24 });
  const rotateValue = useMotionValue(-6);
  const rotate = useSpring(rotateValue, { stiffness: 85, damping: 24 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(normalizedX * 78);
    y.set(normalizedY * 46);
    rotateValue.set(-6 + normalizedX * 5);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
    rotateValue.set(-6);
  };

  return (
    <section id="top" className="hero" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__inner">
        <motion.div
          className="hero__copy"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            <span>AUSGCON 2026;</span>
            <strong>CHALLENGE</strong>
          </h1>
          <p className="hero__subtitle">Dive into Tech,<br />Jump into Future</p>
          <div className="hero__meta">
            <span>2026.09.05.SAT 1PM - 6PM</span>
            <span>CENTERFIELD EAST 18F</span>
          </div>
          <div className="hero__actions">
            <a
              className="register-button register-button--lime"
              href="https://event-us.kr/m/131417/58268"
              target="_blank"
              rel="noreferrer"
            >등록하기 <span>↗</span></a>
            <a className="text-link text-link--light" href="#schedule">프로그램 다시보기 <span>›</span></a>
          </div>
        </motion.div>
        <motion.div
          className="hero__asset"
          style={{ x, y, rotate }}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
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
    </section>
  );
}
