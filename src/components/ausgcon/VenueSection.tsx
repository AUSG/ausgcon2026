export function VenueSection() {
  return (
    <section id="venue" className="venue content-section">
      <div className="container venue__grid">
        <div className="venue__copy">
          <p className="eyebrow">VENUE</p>
          <h2>AWS Korea</h2>
          <p className="venue__city">Seoul,<br />Republic of Korea</p>
          <p>정확한 장소와 입장 방법은 추후 안내됩니다.</p>
          <dl>
            <div><dt>ADDRESS</dt><dd>To be announced</dd></div>
            <div><dt>TRANSIT</dt><dd>대중교통 안내 예정</dd></div>
          </dl>
          <button className="outline-button" type="button" disabled>OPEN MAP <span>↗</span></button>
        </div>
        <div className="map-placeholder" aria-label="행사장 지도 준비 중">
          <div className="map-placeholder__roads" aria-hidden="true" />
          <span className="map-placeholder__pin" aria-hidden="true" />
          <p>SEOUL<br /><span>37.5665° N, 126.9780° E</span></p>
        </div>
      </div>
    </section>
  );
}
