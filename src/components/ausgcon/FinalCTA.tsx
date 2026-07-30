import { AnimatedAsset } from "./AnimatedAsset";

export function FinalCTA() {
  return (
    <section id="register" className="final-cta">
      <div className="container final-cta__inner">
        <div className="final-cta__copy">
          <p className="eyebrow">AUSGCON 2026</p>
          <h2>Every Challenge<br /><span>becomes</span><br />the next Jump.</h2>
          <p>AUSGCON 2026에서<br />당신의 다음 도약을 만나보세요.</p>
          <div className="final-cta__actions">
            <a className="register-button register-button--lime" href="mailto:ausgcon@ausg.me">사전 등록 알림 받기 <span>↗</span></a>
            <a className="text-link text-link--light" href="#schedule">프로그램 다시 보기 <span>↑</span></a>
          </div>
        </div>
        <AnimatedAsset
          src="/assets/ausgcon/keyring.png"
          alt="AUSGCON 2026의 전체 키링 오브제"
          className="final-cta__asset"
          width={1240}
          height={1754}
          direction={-1}
        />
      </div>
    </section>
  );
}
