type Row = {
  name: string;
  points: number;
  exact_hits: number;
};

export function Standings({ rows }: { rows: Row[] }) {
  const sorted = [...rows].sort(
    (a, b) =>
      b.points - a.points ||
      b.exact_hits - a.exact_hits
  );

  return (
    <div>
      {sorted.map((row, index) => (
        <div className="standing-row" key={row.name}>
          <div className={`place ${index === 0 ? "first" : ""}`}>
            {index + 1}
          </div>

          <strong>{row.name}</strong>

          <span className="points">
            {row.points} pkt
          </span>

          <span className="exact">
            🎯 {row.exact_hits}
          </span>
        </div>
      ))}
    </div>
  );
}