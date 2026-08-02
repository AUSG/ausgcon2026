const mentors = [
  { name: "우수연", company: "IBM", role: "직무 공개 예정", level: "SENIOR" },
  { name: "문성혁", company: "쿠팡", role: "직무 공개 예정", level: "SENIOR" },
  { name: "안지완", company: "Moloco", role: "직무 공개 예정", level: "JUNIOR" },
  { name: "오형근", company: "AWS", role: "직무 공개 예정", level: "JUNIOR" },
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
                  취업·이직을 준비하는 대학생과 1~3년차 주니어 개발자를 위한 45분 커리어 멘토링입니다.
                  준비한 자료와 질문을 바탕으로 독립된 미팅룸에서 진행합니다.
                </span>
              </p>
            </div>
            <a
              className="mentoring__apply"
              href="mailto:ausgcon@ausg.me?subject=AUSGCON%202026%20커리어%20멘토링%20신청"
            >
              신청하러 가기 <span>↗</span>
            </a>
          </div>
        </header>

        <div className="mentor-grid">
          {mentors.map((mentor, index) => (
            <article className={`mentor-card mentor-card--${mentor.level.toLowerCase()}`} key={mentor.name}>
              <div className="mentor-card__portrait" role="img" aria-label={`${mentor.name} 멘토 프로필 이미지 준비 중`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{mentor.name.slice(0, 1)}</strong>
              </div>
              <div className="mentor-card__body">
                <span>{mentor.level}</span>
                <h4>{mentor.name}</h4>
                <p>{mentor.company}</p>
                <small>{mentor.role}</small>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
