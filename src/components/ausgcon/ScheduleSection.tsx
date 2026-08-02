"use client";

import { handsOnSessions, speakers, timetable, type Speaker, type Track } from "@/data/conference";
import { Fragment, useEffect, useRef, useState } from "react";

type MobileTrack = Track | "HANDS-ON";
type SessionTrack = Speaker["track"];

interface SessionDetail {
  title: string;
  speaker: string;
  track: SessionTrack;
  description: string;
  index: number;
}

const tracks: Track[] = ["CLOUD", "TECH", "JUMP"];
const mobileTracks: MobileTrack[] = [...tracks, "HANDS-ON"];

function normalizeSpeakerName(name: string) {
  return name.replaceAll("&", "·").replaceAll(" ", "");
}

function findSpeaker(name: string) {
  const normalizedName = normalizeSpeakerName(name);
  return speakers.find((speaker) => normalizeSpeakerName(speaker.name) === normalizedName);
}

function getSessionDetail(title: string, speakerName: string, fallbackTrack: SessionTrack): SessionDetail {
  const speaker = findSpeaker(speakerName);

  return {
    title,
    speaker: speakerName,
    track: speaker?.track ?? fallbackTrack,
    description: speaker?.description ?? "세션의 상세 내용은 곧 공개됩니다.",
    index: speaker ? speakers.indexOf(speaker) : 0,
  };
}

function getSpeakerMark(name: string) {
  const names = name.split(/\s*[·&]\s*/).filter(Boolean);
  if (names.length > 1) return names.map((item) => item.slice(0, 1)).join(" · ");
  return name.slice(0, 1);
}

export function ScheduleSection() {
  const [activeTrack, setActiveTrack] = useState<MobileTrack>("CLOUD");
  const [selectedSession, setSelectedSession] = useState<SessionDetail | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openSession = (
    trigger: HTMLButtonElement,
    title: string,
    speaker: string,
    track: SessionTrack,
  ) => {
    triggerRef.current = trigger;
    setSelectedSession(getSessionDetail(title, speaker, track));
  };

  const closeDialog = () => {
    setSelectedSession(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!selectedSession) return;

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
  }, [selectedSession]);

  return (
    <section id="schedule" className="schedule content-section">
      <div className="container">
        <header className="schedule__heading">
          <h2>TIME TABLE</h2>
        </header>

        <div className="program-board" role="table" aria-label="AUSGCON 2026 프로그램 시간표">
          <div className="program-board__header" role="row">
            <span role="columnheader">TIME</span>
            {tracks.map((track) => <span role="columnheader" key={track}>{track}</span>)}
            <span role="columnheader">HANDS-ON</span>
          </div>
          {timetable.map((row, rowIndex) => (
            <Fragment key={row.time}>
              <time className="program-time" style={{ gridColumn: 1, gridRow: rowIndex + 2 }}>{row.time}</time>
              {row.shared ? (
                <button
                  type="button"
                  className="program-card program-card--shared"
                  role="cell"
                  aria-label={`세션 상세 보기: ${row.shared.title}`}
                  style={{ gridColumn: "2 / -1", gridRow: rowIndex + 2 }}
                  onClick={(event) => openSession(event.currentTarget, row.shared!.title, row.shared!.speaker, "ALL")}
                  >
                    <strong>{row.shared.title}</strong>
                    <small>{row.shared.speaker}</small>
                </button>
              ) : (
                tracks.map((track, trackIndex) => {
                  const session = row.sessions?.find((item) => item.track === track);
                  const title = session?.title ?? "TBD";
                  const speaker = session?.speaker ?? "TBD";
                  return (
                    <button
                      type="button"
                      className={`program-card program-card--${track.toLowerCase()}`}
                      role="cell"
                      aria-label={`세션 상세 보기: ${title}`}
                      style={{ gridColumn: trackIndex + 2, gridRow: rowIndex + 2 }}
                      onClick={(event) => openSession(event.currentTarget, title, speaker, track)}
                      key={track}
                    >
                      <strong>{title}</strong>
                      <small>{speaker}</small>
                    </button>
                  );
                })
              )}
            </Fragment>
          ))}
          {handsOnSessions.map((session, index) => (
            <button
              type="button"
              className="program-card program-card--hands-on"
              role="cell"
              aria-label={`세션 상세 보기: ${session.title}`}
              style={{ gridColumn: 5, gridRow: index === 0 ? "4 / span 2" : "6 / span 3" }}
              onClick={(event) => openSession(event.currentTarget, session.title, session.speaker, "HANDS-ON")}
              key={session.time}
            >
              <time>{session.time}</time>
              <strong>{session.title}</strong>
              <small>{session.speaker}</small>
            </button>
          ))}
        </div>

        <div className="program-mobile">
          <div className="program-track-tabs" role="tablist" aria-label="시간표 트랙 선택">
            {mobileTracks.map((track) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeTrack === track}
                aria-controls="mobile-track-schedule"
                data-track={track}
                onClick={() => setActiveTrack(track)}
                key={track}
              >
                {track}
              </button>
            ))}
          </div>

          <div id="mobile-track-schedule" className="program-mobile__list" role="tabpanel">
            {activeTrack === "HANDS-ON" ? (
              handsOnSessions.map((session) => (
                <div className="program-mobile__row" key={session.time}>
                  <time>{session.time}</time>
                  <button
                    type="button"
                    className="program-card program-card--hands-on"
                    aria-label={`세션 상세 보기: ${session.title}`}
                    onClick={(event) => openSession(event.currentTarget, session.title, session.speaker, "HANDS-ON")}
                  >
                    <strong>{session.title}</strong>
                    <small>{session.speaker}</small>
                  </button>
                </div>
              ))
            ) : (
              timetable.map((row) => {
                const session = row.sessions?.find((item) => item.track === activeTrack);
                const content = row.shared ?? session;

                if (!content) return null;

                return (
                  <div className="program-mobile__row" key={`${activeTrack}-${row.time}`}>
                    <time>{row.time}</time>
                    <button
                      type="button"
                      className={`program-card program-card--${row.shared ? "shared" : activeTrack.toLowerCase()}`}
                      aria-label={`세션 상세 보기: ${content.title}`}
                      onClick={(event) => openSession(event.currentTarget, content.title, content.speaker, row.shared ? "ALL" : activeTrack)}
                    >
                      <strong>{content.title}</strong>
                      <small>{content.speaker}</small>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {selectedSession && (
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
            aria-labelledby="schedule-dialog-title"
            tabIndex={-1}
            ref={dialogRef}
          >
            <button type="button" className="speaker-dialog__close" onClick={closeDialog} aria-label="세션 정보 닫기">
              <span />
              <span />
            </button>
            <div className={`speaker-dialog__portrait speaker-card__portrait--${selectedSession.track.toLowerCase()}`}>
              <span>{String(selectedSession.index + 1).padStart(2, "0")}</span>
              <strong>{getSpeakerMark(selectedSession.speaker)}</strong>
            </div>
            <div className="speaker-dialog__body">
              <span>{selectedSession.track}</span>
              <h3 id="schedule-dialog-title">{selectedSession.title}</h3>
              <h4>{selectedSession.speaker}</h4>
              <p>{selectedSession.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
