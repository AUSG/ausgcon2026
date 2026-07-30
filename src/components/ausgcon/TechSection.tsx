import { AnimatedAsset } from "./AnimatedAsset";
import { SectionLabel } from "./SectionLabel";

export function TechSection() {
  return (
    <section id="tech" className="narrative narrative--tech" data-journey="TECH">
      <div className="container narrative__inner narrative__inner--reverse">
        <SectionLabel index="02" name="TECH" />
        <AnimatedAsset
          src="/assets/ausgcon/tech.png"
          alt="T E C H 글자가 새겨진 네 개의 반투명 키캡 키링"
          className="narrative__asset narrative__asset--tech"
          width={992}
          height={1403}
          direction={-1}
        />
        <div className="narrative__copy narrative__copy--tech">
          <h2>TECH</h2>
          <p className="narrative__message">기술을 적용하고<br />경험을 나누다</p>
          <p className="narrative__body">현장에서 마주한 선택과 시행착오를 구체적으로 공유합니다.</p>
        </div>
      </div>
    </section>
  );
}
