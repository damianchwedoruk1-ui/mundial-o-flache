"use client";

import React, { useState } from "react";

type Props = {
  icon: string;
  name: string;
  rarity: string;
  desc?: string;
  active?: boolean;
  used?: boolean;
  onClick?: () => void;
  hideAction?: boolean;
};

const rarityStyles: Record<
  string,
  {
    color: string;
    soft: string;
    label: string;
  }
> = {
  common: {
    color: "#22c55e",
    soft: "rgba(34, 197, 94, 0.18)",
    label: "COMMON",
  },
  rare: {
    color: "#38bdf8",
    soft: "rgba(56, 189, 248, 0.18)",
    label: "RARE",
  },
  epic: {
    color: "#a855f7",
    soft: "rgba(168, 85, 247, 0.2)",
    label: "EPIC",
  },
  legendary: {
    color: "#facc15",
    soft: "rgba(250, 204, 21, 0.2)",
    label: "LEGENDARY",
  },
};

const powerImages: Record<string, string> = {
  Vabank: "/powers/vabank.svg",
  Goleador: "/powers/goleador.svg",
  "Rozdwojenie Jaźni": "/powers/rozdwojenie-jazni.svg",
  Slabiak: "/powers/slabiak.svg",
  Słabiak: "/powers/slabiak.svg",
  Zamianka: "/powers/zamianka.svg",
  Blokada: "/powers/blokada.svg",
  Złodziej: "/powers/zlodziej.svg",
};

const powerDescriptions: Record<string, string> = {
  Vabank: "Punkty zdobyte tego dnia liczą się podwójnie. Jeżeli skończysz dzień z 0 punktów, dostajesz karę -4 punkty.",
  Goleador: "Wybierasz jedną drużynę. Dostajesz +1 punkt za każdą bramkę tej drużyny w wybranym dniu/meczu.",
  "Rozdwojenie Jaźni": "Możesz podać drugi typ do jednego wybranego meczu. Po zakończeniu meczu system liczy lepszy z Twoich dwóch typów.",
  Slabiak: "Odwraca punktację dnia graczom, których nie chroni Blokada. Najlepszy wynik dnia spada na dół, a najsłabszy idzie do góry.",
  Słabiak: "Odwraca punktację dnia graczom, których nie chroni Blokada. Najlepszy wynik dnia spada na dół, a najsłabszy idzie do góry.",
  Zamianka: "Zamienia Twoje punkty z danego dnia z punktami wybranego gracza. Nie działa na gracza chronionego Blokadą.",
  Blokada: "Chroni Cię przed mocami wieczornymi innych graczy, takimi jak Słabiak, Zamianka i Złodziej.",
  Złodziej: "Zabiera punkty dnia wybranemu graczowi i dodaje je Tobie. Nie działa na gracza chronionego Blokadą.",
};

export function PowerCard({ icon, name, rarity, desc, active, used, onClick, hideAction }: Props) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const style = rarityStyles[rarity] || rarityStyles.common;
  const imageSrc = powerImages[name];
  const cardDescription = desc || powerDescriptions[name] || "Kliknij kartę, aby wybrać tę moc.";

  const handleCardClick = () => {
    if (used) return;
    onClick?.();
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleCardClick();
  };

  return (
    <div
      role="button"
      tabIndex={used ? -1 : 0}
      aria-disabled={used}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      className={`premium-power-card ${active ? "active" : ""} ${used ? "used" : ""}`}
      style={
        {
          "--power-color": style.color,
          "--power-soft": style.soft,
        } as React.CSSProperties
      }
    >
      <style>
        {`
          .premium-power-card {
            position: relative;
            cursor: pointer;
            min-height: 250px;
            padding: 0;
            border: none;
            background: transparent;
            perspective: 1200px;
            text-align: left;
            isolation: isolate;
          }

          .premium-power-card::before {
            content: "";
            position: absolute;
            inset: -8px;
            border-radius: 28px;
            background:
              radial-gradient(circle at 50% 50%, var(--power-color), transparent 58%);
            filter: blur(18px);
            opacity: .45;
            transform: scale(.96);
            transition: .45s ease;
            z-index: -2;
          }

          .premium-power-card::after {
            content: "";
            position: absolute;
            inset: -20px;
            border-radius: 34px;
            background:
              linear-gradient(90deg, transparent, var(--power-color), transparent);
            filter: blur(26px);
            opacity: 0;
            transform: scaleX(.55);
            transition: .45s ease;
            z-index: -3;
          }

          .premium-power-card:hover::before {
            opacity: .8;
            transform: scale(1.06);
          }

          .premium-power-card:hover::after,
          .premium-power-card.active::after {
            opacity: .75;
            transform: scaleX(1.16);
          }

          .premium-power-card:hover .power-inner {
            transform: translateY(-8px) rotateY(0deg);
          }

          .premium-power-card.active .power-inner {
            transform: translateY(-6px) rotateY(180deg);
          }

          .power-inner {
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 250px;
            transform-style: preserve-3d;
            transition: transform .75s cubic-bezier(.2,.8,.2,1);
          }

          .power-face {
            position: absolute;
            inset: 0;
            padding: 18px;
            border-radius: 24px;
            backface-visibility: hidden;
            overflow: hidden;
          }

          .power-face::before {
            content: "";
            position: absolute;
            inset: -80px;
            background:
              linear-gradient(115deg, transparent 35%, rgba(255,255,255,.22) 48%, transparent 61%);
            transform: translateX(-75%) rotate(8deg);
            transition: .7s ease;
            pointer-events: none;
          }

          .premium-power-card:hover .power-face::before,
          .premium-power-card.active .power-face::before {
            transform: translateX(75%) rotate(8deg);
          }

          .power-front {
            background:
              radial-gradient(circle at top right, var(--power-soft), transparent 44%),
              linear-gradient(145deg, rgba(15,23,42,.98), rgba(30,41,59,.92));
            border: 1px solid var(--power-color);
            box-shadow:
              0 0 18px color-mix(in srgb, var(--power-color) 45%, transparent),
              0 0 44px color-mix(in srgb, var(--power-color) 26%, transparent),
              inset 0 0 30px rgba(255,255,255,.04);
          }

          .power-back {
            transform: rotateY(180deg);
            background:
              radial-gradient(circle at center, var(--power-soft), transparent 48%),
              linear-gradient(145deg, rgba(2,6,23,.99), rgba(15,23,42,.96));
            border: 2px solid var(--power-color);
            box-shadow:
              0 0 28px color-mix(in srgb, var(--power-color) 70%, transparent),
              0 0 80px color-mix(in srgb, var(--power-color) 42%, transparent),
              inset 0 0 40px color-mix(in srgb, var(--power-color) 12%, transparent);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }

          .power-back-orbit {
            position: absolute;
            inset: -45%;
            background:
              conic-gradient(from 90deg, transparent, var(--power-color), transparent, var(--power-color), transparent);
            opacity: .4;
            animation: powerSpin 3s linear infinite;
          }

          .premium-power-card.active .power-burst {
            animation: powerBurst .7s ease-out;
          }
          .power-help-button {
            position: absolute;
            top: 14px;
            right: 14px;
            z-index: 20;
            width: 34px;
            height: 34px;
            border-radius: 999px;
            border: 1px solid var(--power-color);
            background: rgba(2, 6, 23, .74);
            color: white;
            font-size: 18px;
            font-weight: 950;
            line-height: 1;
            cursor: pointer;
            box-shadow: 0 0 16px color-mix(in srgb, var(--power-color) 55%, transparent);
          }

          .power-help-button:hover {
            transform: scale(1.08);
            background: var(--power-soft);
          }

          .power-help-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: grid;
            place-items: center;
            padding: 18px;
            background: rgba(2, 6, 23, .72);
            backdrop-filter: blur(8px);
          }

          .power-help-modal {
            width: min(420px, 100%);
            position: relative;
            border-radius: 24px;
            padding: 22px;
            border: 1px solid var(--power-color);
            background:
              radial-gradient(circle at top right, var(--power-soft), transparent 42%),
              linear-gradient(145deg, rgba(15,23,42,.98), rgba(2,6,23,.98));
            box-shadow:
              0 0 34px color-mix(in srgb, var(--power-color) 46%, transparent),
              0 24px 90px rgba(0,0,0,.55);
          }

          .power-help-close {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 34px;
            height: 34px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,.2);
            background: rgba(255,255,255,.08);
            color: white;
            cursor: pointer;
            font-size: 22px;
            line-height: 1;
          }

          .power-help-close:hover {
            background: rgba(248,113,113,.24);
            border-color: rgba(248,113,113,.7);
          }


          @keyframes powerSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes powerBurst {
            0% { transform: scale(.65); opacity: .9; }
            100% { transform: scale(1.55); opacity: 0; }
          }

          .premium-power-card.used {
            cursor: not-allowed;
            filter: grayscale(1) brightness(.55);
          }

          .premium-power-card.used::before {
            opacity: .08;
          }

          .premium-power-card.used::after {
            display: none;
          }

          .premium-power-card.used .power-inner,
          .premium-power-card.used:hover .power-inner,
          .premium-power-card.used.active .power-inner {
            transform: none;
          }

          .premium-power-card.used .power-face::before {
            display: none;
          }

          .premium-power-card.used .power-front {
            border-color: rgba(148, 163, 184, .35);
            box-shadow: inset 0 0 34px rgba(15, 23, 42, .75);
          }

          .premium-power-card.used .power-desc,
          .premium-power-card.used .power-name {
            opacity: .72;
          }
        `}
      </style>

      <button
        type="button"
        className="power-help-button"
        aria-label={`Opis mocy ${name}`}
        onClick={(event) => {
          event.stopPropagation();
          setIsHelpOpen(true);
        }}
      >
        ?
      </button>

      {isHelpOpen && (
        <div
          className="power-help-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Opis mocy ${name}`}
          onClick={(event) => {
            event.stopPropagation();
            setIsHelpOpen(false);
          }}
        >
          <div
            className="power-help-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="power-help-close"
              aria-label="Zamknij opis"
              onClick={() => setIsHelpOpen(false)}
            >
              ×
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "14px",
                paddingRight: "36px",
              }}
            >
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(2, 6, 23, 0.62)",
                  border: `1px solid ${style.color}88`,
                  boxShadow: `inset 0 0 18px ${style.color}22, 0 0 18px ${style.color}44`,
                  flexShrink: 0,
                }}
              >
                {imageSrc ? (
                  <img src={imageSrc} alt={name} width={42} height={42} />
                ) : (
                  <span style={{ fontSize: "30px" }}>{icon}</span>
                )}
              </div>

              <div>
                <div
                  style={{
                    color: style.color,
                    fontSize: "12px",
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {style.label}
                </div>
                <h3
                  style={{
                    margin: 0,
                    color: "white",
                    fontSize: "22px",
                    lineHeight: 1.15,
                  }}
                >
                  {name}
                </h3>
              </div>
            </div>

            <p
              style={{
                margin: 0,
                color: "#dbeafe",
                fontSize: "15px",
                lineHeight: 1.55,
              }}
            >
              {cardDescription}
            </p>
          </div>
        </div>
      )}

      <span
        className="power-burst"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-14px",
          borderRadius: "32px",
          border: `2px solid ${style.color}`,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {used && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "38px",
            left: "-18px",
            zIndex: 10,
            transform: "rotate(-18deg)",
            padding: "8px 34px",
            borderRadius: "10px",
            border: "2px solid rgba(248, 113, 113, 0.9)",
            background: "rgba(127, 29, 29, 0.72)",
            color: "#fecaca",
            fontSize: "13px",
            fontWeight: 950,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 0 22px rgba(248, 113, 113, 0.32)",
          }}
        >
          Moc wykorzystana
        </span>
      )}

      <div className="power-inner">
        <div className="power-face power-front">
          <span
            className="badge"
            style={{
              position: "relative",
              background: style.soft,
              color: "white",
              border: `1px solid ${style.color}88`,
              boxShadow: `0 0 12px ${style.color}55`,
            }}
          >
            {used ? "ZUŻYTA" : active ? "AKTYWNA" : style.label}
          </span>

          <div
            style={{
              position: "relative",
              marginTop: "16px",
              width: "72px",
              height: "72px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(2, 6, 23, 0.62)",
              border: `1px solid ${style.color}88`,
              boxShadow: `inset 0 0 22px ${style.color}22, 0 0 22px ${style.color}44`,
            }}
          >
            {imageSrc ? (
              <img src={imageSrc} alt={name} width={58} height={58} />
            ) : (
              <span style={{ fontSize: "38px" }}>{icon}</span>
            )}
          </div>

          <div
            className="power-name"
            style={{
              position: "relative",
              marginTop: "16px",
              fontSize: "20px",
              fontWeight: 900,
              color: "white",
            }}
          >
            {name}
          </div>

          <div
            className="power-desc"
            style={{
              position: "relative",
              marginTop: "8px",
              color: "#cbd5e1",
              fontSize: "14px",
              lineHeight: 1.35,
            }}
          >
            {hideAction ? "Kliknij kartę, a potem potwierdź wybór poniżej." : "Kliknij, aby wybrać tę moc."}
          </div>

          <div
            style={{
              position: "absolute",
              right: "-42px",
              bottom: "-48px",
              width: "150px",
              height: "150px",
              borderRadius: "999px",
              background: style.color,
              filter: "blur(62px)",
              opacity: 0.32,
            }}
          />
        </div>

        <div className="power-face power-back">
          <span className="power-back-orbit" aria-hidden="true" />

          <div
            style={{
              position: "relative",
              width: "122px",
              height: "122px",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(15, 23, 42, 0.82)",
              border: `1px solid ${style.color}aa`,
              boxShadow: `0 0 30px ${style.color}99, inset 0 0 34px ${style.color}22`,
            }}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={name}
                width={100}
                height={100}
                style={{
                  filter: `drop-shadow(0 0 16px ${style.color})`,
                }}
              />
            ) : (
              <span style={{ fontSize: "66px" }}>{icon}</span>
            )}
          </div>

          <strong
            style={{
              position: "relative",
              color: "white",
              fontSize: "22px",
              textAlign: "center",
              textShadow: `0 0 14px ${style.color}`,
            }}
          >
            {name}
          </strong>

          <span
            style={{
              position: "relative",
              color: style.color,
              fontWeight: 900,
              letterSpacing: "0.08em",
              fontSize: "12px",
            }}
          >
            MOC WYBRANA
          </span>
        </div>
      </div>
    </div>
  );
}