"use client";

import { useEffect, useState } from "react";

const navigation = [
  ["ABOUT", "#cloud"],
  ["SCHEDULE", "#schedule"],
  ["SPEAKERS", "#speakers"],
  ["MENTORING", "#mentoring"],
  ["VENUE", "#venue"],
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 16);
      const probeY = Math.min(88, window.innerHeight - 1);
      const currentSection = Array.from(document.querySelectorAll<HTMLElement>("main > section"))
        .find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= probeY && rect.bottom > probeY;
        });

      if (!currentSection) return;
      if (currentSection.id === "jump") {
        const rect = currentSection.getBoundingClientRect();
        const progress = Math.max(0, -rect.top) / rect.height;
        setTheme(progress < 0.28 ? "light" : "dark");
        return;
      }

      setTheme(["top", "schedule", "speakers"].includes(currentSection.id) ? "dark" : "light");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header className={`site-header site-header--${theme}${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label="AUSGCON 2026 홈">
          AUSGCON <span>2026</span>
        </a>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navigation.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>
        <div className="site-header__actions">
          <a className="register-button register-button--small" href="mailto:ausgcon@ausg.me">REGISTER</a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav${open ? " mobile-nav--open" : ""}`}
        aria-label="모바일 메뉴"
      >
        {navigation.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
