export function JourneyIntro() {
  return (
    <section id="about" className="journey-intro">
      <div className="container">
        <p className="eyebrow">THE JOURNEY</p>
        <div className="journey-intro__headline">
          <h2>Three stages.<br />One journey.</h2>
          <p>Infrastructure.<br />Experience.<br />Growth.</p>
        </div>
        <ol className="journey-map" aria-label="컨퍼런스 여정">
          <li><span>01</span><strong>CLOUD</strong></li>
          <li><span>02</span><strong>TECH</strong></li>
          <li className="journey-map__bridge"><span>—</span><strong>CHALLENGE</strong><small>THE BRIDGE</small></li>
          <li><span>03</span><strong>JUMP</strong></li>
        </ol>
      </div>
    </section>
  );
}
