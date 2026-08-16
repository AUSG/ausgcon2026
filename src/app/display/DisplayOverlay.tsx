"use client";

import QRCode from "react-qr-code";
import { useEffect, useRef, useState } from "react";

const SITE_URL = "https://2026.ausg.me/";
const SCROLL_SPEED = 46;
const START_HOLD_MS = 5_000;
const END_HOLD_MS = 7_000;
const RESET_FADE_MS = 1_100;

export function DisplayOverlay() {
  const [paused, setPaused] = useState(false);
  const [resetting, setResetting] = useState(false);
  const pausedRef = useRef(paused);
  const resettingRef = useRef(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let animationFrame = 0;
    let lastFrame = performance.now();
    let holdUntil = lastFrame + START_HOLD_MS;
    let endReached = false;
    const resetTimers: number[] = [];
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;

    document.documentElement.style.scrollBehavior = "auto";

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      progressRef.current?.style.setProperty("--display-progress", `${progress * 100}%`);
    };

    const resetToTop = (now: number) => {
      resettingRef.current = true;
      setResetting(true);

      resetTimers.push(window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        updateProgress();
      }, 420));

      resetTimers.push(window.setTimeout(() => {
        resettingRef.current = false;
        setResetting(false);
      }, RESET_FADE_MS));

      holdUntil = now + RESET_FADE_MS + START_HOLD_MS;
      endReached = false;
    };

    const tick = (now: number) => {
      const deltaSeconds = Math.min((now - lastFrame) / 1_000, 0.1);
      lastFrame = now;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const atBottom = maxScroll > 0 && window.scrollY >= maxScroll - 2;

      if (!pausedRef.current && !resettingRef.current) {
        if (atBottom) {
          if (!endReached) {
            endReached = true;
            holdUntil = now + END_HOLD_MS;
          } else if (now >= holdUntil) {
            resetToTop(now);
          }
        } else if (now >= holdUntil) {
          window.scrollBy({ top: SCROLL_SPEED * deltaSeconds, left: 0, behavior: "auto" });
        }
      }

      updateProgress();
      animationFrame = window.requestAnimationFrame(tick);
    };

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resetTimers.forEach(window.clearTimeout);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className={`display-reset-curtain${resetting ? " display-reset-curtain--visible" : ""}`}
      />

      <aside className="display-qr" aria-label="AUSGCON 2026 홈페이지 QR 코드">
        <div className="display-qr__code" aria-hidden="true">
          <QRCode
            value={SITE_URL}
            bgColor="#ffffff"
            fgColor="#0b0d10"
            level="M"
            size={168}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="display-qr__copy">
          <span className="display-qr__eyebrow">SCAN TO EXPLORE</span>
          <strong>휴대폰으로 스캔하세요</strong>
          <p>AUSGCON 2026의 전체 프로그램과 참가 정보를 확인할 수 있어요.</p>
          <span className="display-qr__url">2026.ausg.me</span>
        </div>

        <button
          className="display-qr__pause"
          type="button"
          aria-label={paused ? "자동 스크롤 재생" : "자동 스크롤 일시 정지"}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
        </button>

        <div ref={progressRef} className="display-qr__progress" aria-hidden="true" />
      </aside>
    </>
  );
}
