"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── keyframe CSS injected once ───────────────────────────────
const CSS = `
@keyframes beanFall {
  0%   { transform: translateY(-18px) rotate(0deg); opacity: 0; }
  60%  { transform: translateY(4px) rotate(15deg); opacity: 1; }
  100% { transform: translateY(0px) rotate(10deg); opacity: 1; }
}
@keyframes pourDrop {
  0%   { opacity: 0; stroke-dashoffset: 40; }
  100% { opacity: 1; stroke-dashoffset: 0; }
}
@keyframes fillCup {
  0%   { transform: scaleY(0); }
  100% { transform: scaleY(1); }
}
@keyframes doorOpen {
  0%   { transform: scaleX(1); }
  100% { transform: scaleX(0.15); }
}
`;

// ── SVG illustrations ────────────────────────────────────────

function BeanIllus({ triggered }: { triggered: boolean }) {
  const beanDelay = ["0s", "0.1s", "0.2s"];
  const beans = [
    { cx: 35, cy: 14, rx: 4, ry: 3 },
    { cx: 44, cy: 10, rx: 3.5, ry: 2.5 },
    { cx: 39, cy: 6, rx: 3, ry: 2.2 },
  ];

  return (
    <div style={{ width: 80, height: 80, margin: "0 auto", position: "relative" }}>
      <svg
        viewBox="0 0 80 80"
        fill="none"
        style={{
          width: 80,
          height: 80,
          position: "absolute",
          top: 0,
          left: 0,
          transition: "opacity 0.3s",
          opacity: triggered ? 0 : 1,
        }}
      >
        <rect x="20" y="34" width="40" height="34" rx="4" fill="#8B6340" opacity="0.18" />
        <rect x="22" y="36" width="36" height="30" rx="3" fill="#C4A882" opacity="0.6" />
        <rect x="28" y="26" width="24" height="14" rx="3" fill="#8B6340" opacity="0.35" />
        <rect x="32" y="22" width="16" height="8" rx="2" fill="#5C3D1E" opacity="0.45" />
        <ellipse cx="40" cy="54" rx="8" ry="6" fill="#5C3D1E" opacity="0.55" />
      </svg>

      <svg
        viewBox="0 0 80 80"
        fill="none"
        style={{
          width: 80,
          height: 80,
          position: "absolute",
          top: 0,
          left: 0,
          transition: "opacity 0.3s",
          opacity: triggered ? 1 : 0,
        }}
      >
        <rect x="20" y="34" width="40" height="34" rx="4" fill="#8B6340" opacity="0.18" />
        <rect x="22" y="36" width="36" height="30" rx="3" fill="#C4A882" opacity="0.6" />
        {beans.map(({ cx, cy, rx, ry }, i) => (
          <g
            key={i}
            style={{
              animation: triggered
                ? `beanFall 0.6s ease-out forwards ${beanDelay[i]}`
                : "none",
            }}
          >
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#5C3D1E" opacity="0.85" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function PourIllus({ triggered }: { triggered: boolean }) {
  return (
    <div style={{ width: 80, height: 80, margin: "0 auto", position: "relative" }}>
      <svg
        viewBox="0 0 80 80"
        fill="none"
        style={{
          width: 80,
          height: 80,
          position: "absolute",
          top: 0,
          left: 0,
          transition: "opacity 0.3s",
          opacity: triggered ? 0 : 1,
        }}
      >
        <ellipse cx="40" cy="27" rx="14" ry="10" fill="#8B6340" opacity="0.55" />
      </svg>

      <svg
        viewBox="0 0 80 80"
        fill="none"
        style={{
          width: 80,
          height: 80,
          position: "absolute",
          top: 0,
          left: 0,
          transition: "opacity 0.3s",
          opacity: triggered ? 1 : 0,
        }}
      >
        <g transform="rotate(-30 56 28)">
          <ellipse cx="40" cy="27" rx="14" ry="10" fill="#8B6340" opacity="0.55" />
        </g>

        <path
          d="M54 42 Q52 50 46 54"
          stroke="#378ADD"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
          strokeDasharray="40"
          style={{
            animation: triggered ? "pourDrop 0.7s ease-in forwards" : "none",
          }}
        />

        <rect
          x="26"
          y="57"
          width="26"
          height="13"
          fill="#5C3D1E"
          opacity="0.55"
          style={{
            transformOrigin: "26px 70px",
            animation: triggered ? "fillCup 0.8s ease forwards 0.3s" : "none",
            transform: "scaleY(0)",
          }}
        />
      </svg>
    </div>
  );
}

function DoorIllus({ triggered }: { triggered: boolean }) {
  return (
    <div style={{ width: 80, height: 80, margin: "0 auto", position: "relative" }}>
      <svg
        viewBox="0 0 80 80"
        fill="none"
        style={{
          width: 80,
          height: 80,
          position: "absolute",
          top: 0,
          left: 0,
          transition: "opacity 0.3s",
          opacity: triggered ? 0 : 1,
        }}
      >
        <rect x="28" y="46" width="24" height="26" rx="2" fill="#5C3D1E" opacity="0.7" />
      </svg>

      <svg
        viewBox="0 0 80 80"
        fill="none"
        style={{
          width: 80,
          height: 80,
          position: "absolute",
          top: 0,
          left: 0,
          transition: "opacity 0.3s",
          opacity: triggered ? 1 : 0,
        }}
      >
        <g
          style={{
            transformOrigin: "28px 46px",
            animation: triggered ? "doorOpen 0.6s ease-out forwards" : "none",
          }}
        >
          <rect x="28" y="46" width="24" height="26" rx="2" fill="#5C3D1E" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────

type CardKey = "beans" | "recipes" | "cafes";

export default function Home() {
  const [triggered, setTriggered] = useState<Record<CardKey, boolean>>({
    beans: false,
    recipes: false,
    cafes: false,
  });

  useEffect(() => {
    const keys: CardKey[] = ["beans", "recipes", "cafes"];
    let i = 0;

    const timer = setInterval(() => {
      const key = keys[i % keys.length];

      setTriggered((prev) => ({
        ...prev,
        [key]: true,
      }));

      setTimeout(() => {
        setTriggered((prev) => ({
          ...prev,
          [key]: false,
        }));
      }, 1000);

      i++;
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const cards = [
    {
      key: "beans" as CardKey,
      href: "/beans",
      title: "コーヒー豆",
      desc: "産地・焙煎度・テイストを記録",
      illus: <BeanIllus triggered={triggered.beans} />,
    },
    {
      key: "recipes" as CardKey,
      href: "/recipes",
      title: "抽出レシピ",
      desc: "湯温・湯量・抽出時間を共有",
      illus: <PourIllus triggered={triggered.recipes} />,
    },
    {
      key: "cafes" as CardKey,
      href: "/cafes",
      title: "カフェ記録",
      desc: "訪れたカフェの思い出を残す",
      illus: <DoorIllus triggered={triggered.cafes} />,
    },
  ];

  return (
    <main>
      <style>{CSS}</style>

      {/* Hero */}
      <div
        style={{
          background: "var(--dark)",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
          color: "var(--cream)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "4rem",
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "0.08em",
            marginBottom: "0.75rem",
          }}
        >
          Versare
        </h1>

        <p
          style={{
            fontSize: "14px",
            color: "var(--light)",
            letterSpacing: "0.06em",
            fontWeight: 300,
          }}
        >
          コーヒーの記憶を、ここに。
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2.5rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {cards.map(({ key, href, title, desc, illus }) => (
            <Link
              key={key}
              href={href}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card"
                onMouseEnter={() =>
                  setTriggered((prev) => ({
                    ...prev,
                    [key]: true,
                  }))
                }
                onMouseLeave={() =>
                  setTriggered((prev) => ({
                    ...prev,
                    [key]: false,
                  }))
                }
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "1.75rem 1rem",
                  textAlign: "center",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {illus}

                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.3rem",
                    fontStyle: "italic",
                    color: "var(--dark)",
                    margin: "10px 0 4px",
                  }}
                >
                  {title}
                </div>

                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--mid)",
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
