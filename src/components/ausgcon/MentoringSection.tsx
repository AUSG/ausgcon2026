import Image from "next/image";

const mentors = [
  { name: "우수연", company: "IBM", level: "SENIOR", image: "/assets/ausgcon/mentors/woo-sooyeon.jpg" },
  { name: "문성혁", company: "쿠팡", level: "SENIOR", image: "/assets/ausgcon/mentors/moon-seonghyeok.jpg" },
  { name: "안지완", company: "Moloco", level: "JUNIOR", image: "/assets/ausgcon/mentors/ahn-jiwan.jpg" },
  { name: "오형근", company: "AWS", level: "JUNIOR", image: "/assets/ausgcon/mentors/oh-hyeonggeun.jpg" },
] as const;

export function MentoringSection() {
  return (
    <section id="mentoring" className="mentoring content-section">
      <div className="container">
        <header className="mentoring__heading">
          <span className="eyebrow">CAREER MENTORING</span>
          <h2>MENTORING</h2>
          <div className="mentoring__lead">
            <div>
              <p className="mentoring__tagline">당신의 다음 선택을 위한 45분의 1:1 대화.</p>
              <p className="mentoring__description">
                <strong>1:1 · 45 MINUTES · RESERVATION ONLY</strong>
                <span>
                  취업·이직을 준비하는 대학생과 1~3년 차 주니어 개발자를 위한 커리어 멘토링입니다.
                  이력서·포트폴리오 등 준비한 자료와 질문을 바탕으로 현재의 고민을 살펴보고, 앞으로의 준비 방향을 함께 정리합니다.
                </span>
              </p>
            </div>
            <span className="mentoring__apply mentoring__apply--pending">8월 10일 신청 시작</span>
          </div>
        </header>

        <div className="mentor-grid">
          {mentors.map((mentor, index) => (
            <article className={`mentor-card mentor-card--${mentor.level.toLowerCase()}`} key={mentor.name}>
              <div className="mentor-card__portrait mentor-card__portrait--photo">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Image src={mentor.image} alt={`${mentor.name} 멘토`} fill sizes="(max-width: 768px) 45vw, 24vw" />
              </div>
              <div className="mentor-card__body">
                <span>{mentor.level}</span>
                <h4>{mentor.name}</h4>
                <p>{mentor.company}</p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
