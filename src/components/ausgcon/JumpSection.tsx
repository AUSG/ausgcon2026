import { AnimatedAsset } from "./AnimatedAsset";

export function JumpSection() {
  return (
    <section id="jump" className="narrative narrative--jump" data-journey="JUMP">
      <div className="container narrative__inner">
        <div className="narrative__copy narrative__copy--jump">
          <h2>JUMP</h2>
          <p className="narrative__message">도전을 발판 삼아<br />다음으로 뛰어오르다</p>
          <p className="narrative__body">모든 도전은 다음 성장을 위한 추진력이 됩니다.</p>
        </div>
        <AnimatedAsset
          src="/assets/ausgcon/starv2.png"
          alt="산뜻한 라임색의 비대칭 별 오브젝트"
          className="narrative__asset narrative__asset--jump"
          width={992}
          height={1403}
        />
      </div>
    </section>
  );
}
