"use client";

import { useEffect, useState } from "react";

const labels = ["CLOUD", "TECH", "CHALLENGE", "JUMP"];

export function FloatingJourneyIndicator() {
  const [active, setActive] = useState("CLOUD");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-journey]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive((visible.target as HTMLElement).dataset.journey ?? "CLOUD");
        }
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="journey-indicator" aria-label="현재 여정">
      {labels.map((label) => (
        <a
          key={label}
          className={active === label ? "is-active" : ""}
          href={`#${label.toLowerCase()}`}
          aria-current={active === label ? "location" : undefined}
        >
          <span aria-hidden="true" />
          {label}
        </a>
      ))}
    </nav>
  );
}
