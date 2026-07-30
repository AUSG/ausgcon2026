import { timetable, type Track } from "@/data/conference";

const tracks: Track[] = ["CLOUD", "JUMP", "TECH"];

export function ScheduleSection() {
  return (
    <section id="schedule" className="schedule content-section">
      <div className="container">
        <header className="content-heading">
          <p className="eyebrow">PROGRAM</p>
          <h2>One time.<br />Three tracks.</h2>
          <p>세 개의 트랙이 동시에 진행됩니다. 세션 정보는 순차적으로 공개됩니다.</p>
        </header>
        <div className="timetable">
          <table>
            <thead>
              <tr>
                <th scope="col">TIME</th>
                {tracks.map((track) => <th scope="col" key={track}>{track}</th>)}
              </tr>
            </thead>
            <tbody>
              {timetable.map((row) => (
                <tr key={row.time}>
                  <th scope="row"><time>{row.time}</time></th>
                  {row.shared ? (
                    <td className="timetable__shared" colSpan={3}>
                      <strong>{row.shared.title}</strong>
                      <span>{row.shared.speaker}</span>
                    </td>
                  ) : (
                    tracks.map((track) => {
                      const session = row.sessions?.find((item) => item.track === track);
                      return (
                        <td key={track} data-track={track}>
                          <strong>{session?.title ?? "Session title TBA"}</strong>
                          <span>{session?.speaker ?? "Speaker TBA"}</span>
                        </td>
                      );
                    })
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
