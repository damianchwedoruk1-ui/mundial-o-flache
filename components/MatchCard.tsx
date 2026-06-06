"use client";

const flags: Record<string, string> = {
  Polska: "https://flagcdn.com/w40/pl.png",
  Meksyk: "https://flagcdn.com/w40/mx.png",
  "Republika Południowej Afryki": "https://flagcdn.com/w40/za.png",
  "Korea Południowa": "https://flagcdn.com/w40/kr.png",
  Czechy: "https://flagcdn.com/w40/cz.png",
  Kanada: "https://flagcdn.com/w40/ca.png",
  "Bośnia i Hercegowina": "https://flagcdn.com/w40/ba.png",
  Katar: "https://flagcdn.com/w40/qa.png",
  Szwajcaria: "https://flagcdn.com/w40/ch.png",
  Brazylia: "https://flagcdn.com/w40/br.png",
  Maroko: "https://flagcdn.com/w40/ma.png",
  Haiti: "https://flagcdn.com/w40/ht.png",
  Szkocja: "https://flagcdn.com/w40/gb-sct.png",
  USA: "https://flagcdn.com/w40/us.png",
  Paragwaj: "https://flagcdn.com/w40/py.png",
  Australia: "https://flagcdn.com/w40/au.png",
  Turcja: "https://flagcdn.com/w40/tr.png",
  Niemcy: "https://flagcdn.com/w40/de.png",
  Curacao: "https://flagcdn.com/w40/cw.png",
  "Curaçao": "https://flagcdn.com/w40/cw.png",
  "Wybrzeże Kości Słoniowej": "https://flagcdn.com/w40/ci.png",
  Ekwador: "https://flagcdn.com/w40/ec.png",
  Holandia: "https://flagcdn.com/w40/nl.png",
  Japonia: "https://flagcdn.com/w40/jp.png",
  Szwecja: "https://flagcdn.com/w40/se.png",
  Tunezja: "https://flagcdn.com/w40/tn.png",
  Belgia: "https://flagcdn.com/w40/be.png",
  Egipt: "https://flagcdn.com/w40/eg.png",
  Iran: "https://flagcdn.com/w40/ir.png",
  "Nowa Zelandia": "https://flagcdn.com/w40/nz.png",
  Hiszpania: "https://flagcdn.com/w40/es.png",
  "Wyspy Zielonego Przylądka": "https://flagcdn.com/w40/cv.png",
  "Arabia Saudyjska": "https://flagcdn.com/w40/sa.png",
  Urugwaj: "https://flagcdn.com/w40/uy.png",
  Francja: "https://flagcdn.com/w40/fr.png",
  Senegal: "https://flagcdn.com/w40/sn.png",
  Irak: "https://flagcdn.com/w40/iq.png",
  Norwegia: "https://flagcdn.com/w40/no.png",
  Argentyna: "https://flagcdn.com/w40/ar.png",
  Algieria: "https://flagcdn.com/w40/dz.png",
  Austria: "https://flagcdn.com/w40/at.png",
  Jordania: "https://flagcdn.com/w40/jo.png",
  Portugalia: "https://flagcdn.com/w40/pt.png",
  "Demokratyczna Republika Konga": "https://flagcdn.com/w40/cd.png",
  Uzbekistan: "https://flagcdn.com/w40/uz.png",
  Kolumbia: "https://flagcdn.com/w40/co.png",
  Anglia: "https://flagcdn.com/w40/gb-eng.png",
  Chorwacja: "https://flagcdn.com/w40/hr.png",
  Ghana: "https://flagcdn.com/w40/gh.png",
  Panama: "https://flagcdn.com/w40/pa.png",
};

function getFlag(teamName: string) {
  return flags[teamName] || "https://flagcdn.com/w40/un.png";
}

type MatchCardProps = {
  match: any;
  prediction: {
    homeScore: string;
    awayScore: string;
  };
  onPredictionChange: (
    matchId: number,
    field: "homeScore" | "awayScore",
    value: string
  ) => void;
};

export function MatchCard({
  match,
  prediction,
  onPredictionChange,
}: MatchCardProps) {
  return (
    <div
      className="card"
      style={{
        padding: "clamp(16px, 4vw, 28px)",
        marginBottom: "24px",
        borderRadius: "24px",
        background: "rgba(15, 23, 42, 0.75)",
        border: "1px solid rgba(148, 163, 184, 0.18)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: "18px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
            alignItems: "center",
            gap: "clamp(10px, 3vw, 28px)",
          }}
        >
          <div
            style={{
              minWidth: 0,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <img
              src={getFlag(match.teamA)}
              alt={match.teamA}
              width={34}
              height={34}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            <strong
              style={{
                fontSize: "clamp(12px, 3.4vw, 20px)",
                lineHeight: 1.15,
                wordBreak: "break-word",
              }}
            >
              {match.teamA}
            </strong>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(6px, 2vw, 14px)",
              justifyContent: "center",
            }}
          >
            <input
              type="number"
              inputMode="numeric"
              value={prediction.homeScore}
              onChange={(e) =>
                onPredictionChange(match.id, "homeScore", e.target.value)
              }
              placeholder="0"
              style={{
                width: "clamp(52px, 14vw, 82px)",
                height: "clamp(48px, 13vw, 64px)",
                borderRadius: "14px",
                border: "1px solid rgba(139, 92, 246, 0.9)",
                background: "rgba(15, 23, 42, 0.95)",
                color: "white",
                fontSize: "clamp(22px, 6vw, 28px)",
                fontWeight: 800,
                textAlign: "center",
                outline: "none",
              }}
            />

            <span
              style={{
                color: "#93a4d8",
                fontSize: "clamp(24px, 6vw, 30px)",
                fontWeight: 800,
              }}
            >
              :
            </span>

            <input
              type="number"
              inputMode="numeric"
              value={prediction.awayScore}
              onChange={(e) =>
                onPredictionChange(match.id, "awayScore", e.target.value)
              }
              placeholder="0"
              style={{
                width: "clamp(52px, 14vw, 82px)",
                height: "clamp(48px, 13vw, 64px)",
                borderRadius: "14px",
                border: "1px solid rgba(99, 102, 241, 0.9)",
                background: "rgba(15, 23, 42, 0.95)",
                color: "white",
                fontSize: "clamp(22px, 6vw, 28px)",
                fontWeight: 800,
                textAlign: "center",
                outline: "none",
              }}
            />
          </div>

          <div
            style={{
              minWidth: 0,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <img
              src={getFlag(match.teamB)}
              alt={match.teamB}
              width={34}
              height={34}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            <strong
              style={{
                fontSize: "clamp(12px, 3.4vw, 20px)",
                lineHeight: 1.15,
                wordBreak: "break-word",
              }}
            >
              {match.teamB}
            </strong>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "18px",
        }}
      >
        {match.group && (
          <span
            className="badge"
            style={{
              background: "rgba(250, 204, 21, 0.14)",
              border: "1px solid rgba(250, 204, 21, 0.28)",
              color: "#fde68a",
            }}
          >
            {match.group}
          </span>
        )}

        {match.date && (
          <span
            className="badge"
            style={{
              background: "rgba(34, 197, 94, 0.14)",
              border: "1px solid rgba(34, 197, 94, 0.28)",
              color: "#bbf7d0",
            }}
          >
            📅 {match.date}
          </span>
        )}

        <span
          className="badge"
          style={{
            background: "rgba(59, 130, 246, 0.16)",
            border: "1px solid rgba(59, 130, 246, 0.32)",
            color: "#bfdbfe",
          }}
        >
          🕒 Start: {match.time}
        </span>
      </div>
    </div>
  );
}