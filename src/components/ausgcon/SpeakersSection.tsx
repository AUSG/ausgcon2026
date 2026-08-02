import { speakers } from "@/data/conference";

export function SpeakersSection() {
  return (
    <section id="speakers" className="speakers content-section">
      <div className="container">
        <header className="speakers__heading">
          <p>13 VOICES / 3 TRACKS</p>
          <h2>SMALL TALKS.<br /><em>BIG MOMENTUM.</em></h2>
          <span>현장에서 부딪혀 얻은 답과 다음 도전을 만드는 질문을 나눕니다.</span>
        </header>
        <div className="speakers__grid">
          {speakers.map((speaker, index) => (
            <article className="speaker-card" key={speaker.name} tabIndex={0}>
              <div className={`speaker-card__portrait speaker-card__portrait--${speaker.track.toLowerCase()}`} aria-label={`${speaker.name} 프로필 이미지 준비 중`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{speaker.name.slice(0, 1)}</strong>
              </div>
              <div className="speaker-card__body">
                <div className="speaker-card__meta">
                  <h3>{speaker.name}</h3>
                  <span>{speaker.track}</span>
                </div>
                <h4>{speaker.session}</h4>
                <p>{speaker.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
