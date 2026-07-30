import { speakers } from "@/data/conference";

export function SpeakersSection() {
  return (
    <section id="speakers" className="speakers content-section">
      <div className="container">
        <header className="content-heading content-heading--row">
          <div>
            <p className="eyebrow">SPEAKERS</p>
            <h2>Voices from<br />the field.</h2>
          </div>
          <p>현장에서 발견한 질문과<br />직접 부딪혀 얻은 답을 나눕니다.</p>
        </header>
        <div className="speakers__grid">
          {speakers.map((speaker, index) => (
            <article className="speaker-card" key={speaker.name} tabIndex={0}>
              <div className="speaker-card__portrait" aria-label={`${speaker.name} 프로필 이미지 준비 중`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{speaker.name.slice(-2)}</strong>
              </div>
              <div className="speaker-card__meta">
                <h3>{speaker.name}</h3>
                <p>{speaker.role} · {speaker.company}</p>
                <p className="speaker-card__session">{speaker.session}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
