const overview = [
  ["DATE", "2026. MM. DD"],
  ["VENUE", "SEOUL"],
  ["TRACKS", "3"],
  ["SESSIONS", "TBA"],
  ["FORMAT", "OFFLINE CONFERENCE"],
];

export function EventOverview() {
  return (
    <section className="overview">
      <div className="container">
        <p className="eyebrow">EVENT SPECIFICATION</p>
        <h2>Built for the<br />next leap.</h2>
        <dl className="overview__list">
          {overview.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
