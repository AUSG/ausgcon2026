export function VenueSection() {
  return (
    <section id="venue" className="venue content-section">
      <div className="container venue__grid">
        <div className="venue__copy">
          <h2>MAP</h2>
          <p className="venue__city">AWS Korea 18F</p>
          <p>센터필드 EAST 18층 AWS Korea에서 만나요.</p>
          <dl>
            <div><dt>ADDRESS</dt><dd>서울 강남구 테헤란로 231<br />센터필드 EAST 18F AWS Korea</dd></div>
            <div><dt>TRANSIT</dt><dd>역삼역 8번 출구에서 도보 8분</dd></div>
          </dl>
        </div>
        <div className="venue-map">
          <iframe
            title="AWS Korea 센터필드 위치"
            src="https://www.google.com/maps?q=AWS%20Korea%20Centerfield%20Seoul&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href="https://www.google.com/maps/search/?api=1&query=AWS%20Korea%20Centerfield%20Seoul"
            target="_blank"
            rel="noreferrer"
          >GOOGLE MAPS <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}
