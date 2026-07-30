import { SectionLabel } from "./SectionLabel";

export function ChallengeSection() {
  return (
    <section id="challenge" className="challenge" data-journey="CHALLENGE">
      <div className="container challenge__inner">
        <SectionLabel index="—" name="THE BRIDGE" inverted />
        <div className="challenge__architecture" aria-hidden="true">
          {/* TODO: Replace this explicit placeholder when /public/assets/ausgcon/challenge.png is supplied. */}
          <span>Challenge</span>
          <small>3D ASSET PENDING</small>
        </div>
        <div className="challenge__copy">
          <p>Knowledge becomes action.</p>
          <h2>Action creates<br /><em>challenge.</em></h2>
          <p className="challenge__korean">배운 것을 실행하는 순간,<br />새로운 도전이 시작됩니다.</p>
        </div>
      </div>
    </section>
  );
}
