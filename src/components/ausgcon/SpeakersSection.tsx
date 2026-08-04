"use client";

import { speakers, type Speaker } from "@/data/conference";
import { SpeakerPortrait } from "@/components/ausgcon/SpeakerPortrait";
import { useEffect, useRef, useState } from "react";

interface SelectedSpeaker {
  speaker: Speaker;
  index: number;
}

export function SpeakersSection() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<SelectedSpeaker | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeDialog = () => {
    setSelectedSpeaker(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!selectedSpeaker) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDialog();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSpeaker]);

  return (
    <section id="speakers" className="speakers content-section">
      <div className="container">
        <header className="speakers__heading">
          <h2>SPEAKERS</h2>
          <span>현장에서 부딪혀 얻은 답과 다음 도전을 만드는 질문을 나눕니다.</span>
        </header>
        <div className="speakers__grid">
          {speakers.map((speaker, index) => {
            const isDuo = speaker.name.includes(" · ");
            return (
              <button
                type="button"
                className={`speaker-card speaker-card--${speaker.track.toLowerCase()}${isDuo ? " speaker-card--duo" : ""}`}
                aria-haspopup="dialog"
                aria-label={`${speaker.name} 연사 및 발표 정보 보기`}
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelectedSpeaker({ speaker, index });
                }}
                key={speaker.name}
              >
                <SpeakerPortrait speaker={speaker} index={index} />
                <div className="speaker-card__body">
                  <div className="speaker-card__meta">
                    <h3>{speaker.name}</h3>
                    <span>{speaker.track}</span>
                  </div>
                  {speaker.credential && <small className="speaker-card__credential">{speaker.credential}</small>}
                  <h4>{speaker.session}</h4>
                  <p>{speaker.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedSpeaker && (
        <div
          className="speaker-dialog"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div
            className="speaker-dialog__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="speaker-dialog-title"
            tabIndex={-1}
            ref={dialogRef}
          >
            <button type="button" className="speaker-dialog__close" onClick={closeDialog} aria-label="연사 정보 닫기">
              <span />
              <span />
            </button>
            <SpeakerPortrait speaker={selectedSpeaker.speaker} index={selectedSpeaker.index} variant="dialog" />
            <div className="speaker-dialog__body">
              <span>{selectedSpeaker.speaker.track}</span>
              <h3 id="speaker-dialog-title">{selectedSpeaker.speaker.name}</h3>
              {selectedSpeaker.speaker.credential && (
                <small className="speaker-dialog__credential">{selectedSpeaker.speaker.credential}</small>
              )}
              <h4>{selectedSpeaker.speaker.session}</h4>
              <p>{selectedSpeaker.speaker.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
