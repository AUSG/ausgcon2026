import { timetable, type Track } from "@/data/conference";

const tracks: Track[] = ["CLOUD", "TECH", "JUMP"];

export function ScheduleSection() {
  return (
    <section id="schedule" className="schedule content-section">
      <div className="container">
        <header className="schedule__heading">
          <div className="schedule__meta">
            <span>2026.09.05 / AWS KOREA</span>
            <span>13:00 - 18:00</span>
          </div>
          <h2><span>ONE TIME.</span><em>THREE TRACKS.</em></h2>
          <p>Cloud, Tech, Jump. 세 개의 트랙이 같은 시간 위에서 각자의 도전을 시작합니다.</p>
        </header>
        <div className="program-board" role="table" aria-label="AUSGCON 2026 프로그램 시간표">
          <div className="program-board__header" role="row">
            <span role="columnheader">TIME</span>
            {tracks.map((track) => <span role="columnheader" key={track}>{track}</span>)}
          </div>
          {timetable.map((row, rowIndex) => (
            <div className={`program-row${row.shared ? " program-row--shared" : ""}`} role="row" key={row.time}>
              <time role="rowheader">{row.time}</time>
              {row.shared ? (
                <article className="program-card program-card--shared" role="cell">
                  <span>{String(rowIndex + 1).padStart(2, "0")}</span>
                  <strong>{row.shared.title}</strong>
                  <small>{row.shared.speaker}</small>
                </article>
              ) : (
                tracks.map((track) => {
                  const session = row.sessions?.find((item) => item.track === track);
                  return (
                    <article className={`program-card program-card--${track.toLowerCase()}`} role="cell" key={track}>
                      <span>{track}</span>
                      <strong>{session?.title ?? "TBD"}</strong>
                      <small>{session?.speaker ?? "TBD"}</small>
                    </article>
                  );
                })
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
