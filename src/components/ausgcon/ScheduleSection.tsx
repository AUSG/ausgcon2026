import { sessions, type Track } from "@/data/conference";

const tracks: Track[] = ["CLOUD", "TECH", "JUMP"];

export function ScheduleSection() {
  return (
    <section id="schedule" className="schedule content-section">
      <div className="container">
        <header className="content-heading">
          <p className="eyebrow">PROGRAM</p>
          <h2>Three chapters.<br />One momentum.</h2>
          <p>세션 정보는 순차적으로 업데이트됩니다.</p>
        </header>
        <div className="schedule__chapters">
          {tracks.map((track, chapterIndex) => (
            <article className="schedule__chapter" key={track}>
              <div className="schedule__track">
                <span>0{chapterIndex + 1}</span>
                <h3>{track}</h3>
              </div>
              <div className="schedule__sessions">
                {sessions.filter((session) => session.track === track).map((session) => (
                  <div className="session-row" key={`${session.time}-${session.title}`}>
                    <time>{session.time}</time>
                    <div>
                      <p>{session.title}</p>
                      <span>{session.speaker}</span>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
