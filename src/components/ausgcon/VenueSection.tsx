import Image from "next/image";

const sponsors = [
  { name: "Amazon Web Services", logo: "/assets/ausgcon/sponsors/aws.svg", className: "aws" },
  { name: "AWSKRUG", logo: "/assets/ausgcon/sponsors/awskrug.svg", className: "awskrug" },
  { name: "Lablup", logo: "/assets/ausgcon/sponsors/lablup.png", className: "lablup" },
  { name: "한빛미디어", logo: "/assets/ausgcon/sponsors/hanbitmedia.png", className: "hanbit" },
] as const;

export function VenueSection() {
  return (
    <section id="venue" className="venue content-section">
      <div className="container venue__grid">
        <div className="venue__copy">
          <h2>MAP</h2>
          <p className="venue__city">CENTERFIELD EAST 18F</p>
          <dl>
            <div><dt>ADDRESS</dt><dd>서울 강남구 테헤란로 231<br />CENTERFIELD EAST, 18층</dd></div>
            <div><dt>TRANSIT</dt><dd>역삼역 8번 출구에서 도보 8분</dd></div>
          </dl>
        </div>
        <div className="venue-map">
          <iframe
            title="센터필드 EAST 위치"
            src="https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%ED%85%8C%ED%97%A4%EB%9E%80%EB%A1%9C%20231%20CENTERFIELD%20EAST&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href="https://www.google.com/maps/search/?api=1&query=%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%ED%85%8C%ED%97%A4%EB%9E%80%EB%A1%9C%20231%20CENTERFIELD%20EAST"
            target="_blank"
            rel="noreferrer"
          >GOOGLE MAPS <span>↗</span></a>
        </div>
      </div>
      <div id="sponsors" className="container sponsor-strip" aria-label="AUSGCON 2026 후원사">
        <div className="sponsor-strip__heading">
          <span>WITH SUPPORT FROM</span>
          <h3>SPONSORS</h3>
        </div>
        <div className="sponsor-strip__grid">
          {sponsors.map((sponsor) => (
            <div className={`sponsor-strip__slot sponsor-strip__slot--${sponsor.className}`} key={sponsor.name}>
              <Image src={sponsor.logo} alt={sponsor.name} fill sizes="(max-width: 768px) 45vw, 18vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
