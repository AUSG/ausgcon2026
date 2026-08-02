export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a className="brand brand--light" href="#top">AUSGCON <span>2026</span></a>
        <nav aria-label="푸터 메뉴">
          <a href="#about">ABOUT</a>
          <a href="#schedule">SCHEDULE</a>
          <a href="#speakers">SPEAKERS</a>
          <a href="#mentoring">MENTORING</a>
          <a href="#venue">VENUE</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="footer__social">
          <a href="https://www.instagram.com/ausg.awskrug/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://kr.linkedin.com/company/ausg-kr" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/AUSG" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <p>© 2026 AUSG. All rights reserved.</p>
      </div>
    </footer>
  );
}
