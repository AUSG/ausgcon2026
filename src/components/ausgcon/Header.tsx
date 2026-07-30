"use client";

import { useEffect, useState } from "react";

const navigation = [
  ["ABOUT", "#about"],
  ["SCHEDULE", "#schedule"],
  ["SPEAKERS", "#speakers"],
  ["VENUE", "#venue"],
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
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
          <a className="register-button register-button--small" href="#register">REGISTER</a>
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
