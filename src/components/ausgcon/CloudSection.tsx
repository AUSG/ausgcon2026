import { AnimatedAsset } from "./AnimatedAsset";
import { SectionLabel } from "./SectionLabel";

export function CloudSection() {
  return (
    <section id="cloud" className="narrative narrative--cloud" data-journey="CLOUD">
      <div className="container narrative__inner">
        <SectionLabel index="01" name="CLOUD" />
        <div className="narrative__copy">
          <h2>CLOUD</h2>
          <p className="narrative__message">인프라의<br />아키텍처를 이해하고<br />기반을 세우다</p>
          <p className="narrative__body">서비스의 기반이 되는 구조를 이해하고,<br />확장 가능하고 안정적인 시스템을 함께 고민합니다.</p>
        </div>
        <div className="cloud-atmosphere" aria-hidden="true" />
        <AnimatedAsset
          src="/assets/ausgcon/cloud.png"
          alt="반투명한 흰색 구름 키링 오브제"
          className="narrative__asset narrative__asset--cloud"
          width={992}
          height={1403}
        />
      </div>
      <p className="transition-word" aria-hidden="true">FROM FOUNDATION</p>
    </section>
  );
}
