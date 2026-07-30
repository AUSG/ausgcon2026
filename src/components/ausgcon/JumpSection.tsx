import { AnimatedAsset } from "./AnimatedAsset";
import { SectionLabel } from "./SectionLabel";

export function JumpSection() {
  return (
    <section id="jump" className="narrative narrative--jump" data-journey="JUMP">
      <div className="container narrative__inner">
        <SectionLabel index="03" name="JUMP" inverted />
        <div className="narrative__copy narrative__copy--jump">
          <h2>JUMP</h2>
          <p className="narrative__message">시행착오를<br />발판 삼아<br /><br />다음 단계로<br />뛰어오르다</p>
          <p className="narrative__body">모든 도전은 실패로 끝나는 것이 아닙니다.<br />다음 성장을 위한 추진력이 됩니다.</p>
        </div>
        <AnimatedAsset
          src="/assets/ausgcon/jump.png"
          alt="산뜻한 라임색의 비대칭 별 모양 키링"
          className="narrative__asset narrative__asset--jump"
          width={992}
          height={1403}
        />
      </div>
      <p className="jump-manifesto">EVERY CHALLENGE BECOMES THE NEXT JUMP.</p>
    </section>
  );
}
