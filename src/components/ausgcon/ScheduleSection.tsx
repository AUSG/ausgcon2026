import { handsOnSessions, timetable, type Track } from "@/data/conference";
import { Fragment } from "react";

const tracks: Track[] = ["CLOUD", "TECH", "JUMP"];

export function ScheduleSection() {
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
                <article
                  className="program-card program-card--shared"
                  role="cell"
                  style={{ gridColumn: "2 / -1", gridRow: rowIndex + 2 }}
                >
                  <strong>{row.shared.title}</strong>
                  <small>{row.shared.speaker}</small>
                </article>
              ) : (
                tracks.map((track, trackIndex) => {
                  const session = row.sessions?.find((item) => item.track === track);
                  return (
                    <article
                      className={`program-card program-card--${track.toLowerCase()}`}
                      role="cell"
                      style={{ gridColumn: trackIndex + 2, gridRow: rowIndex + 2 }}
                      key={track}
                    >
                      <strong>{session?.title ?? "TBD"}</strong>
                      <small>{session?.speaker ?? "TBD"}</small>
                    </article>
                  );
                })
              )}
            </Fragment>
          ))}
          {handsOnSessions.map((session, index) => (
            <article
              className="program-card program-card--hands-on"
              role="cell"
              style={{ gridColumn: 5, gridRow: `${index === 0 ? 4 : 6} / span 2` }}
              key={session.time}
            >
              <time>{session.time}</time>
              <strong>{session.title}</strong>
              <small>{session.speaker}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
