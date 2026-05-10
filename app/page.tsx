"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type CardKey = "beans" | "recipes" | "cafes";

function AnimatedIllus({
  triggered,
  images,
}: {
  triggered: boolean;
  images: [string, string];
}) {
  return (
    <div
      style={{
        width: 90,
        height: 90,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <Image
        src={triggered ? images[1] : images[0]}
        alt=""
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export default function Home() {
  const [triggered, setTriggered] = useState<Record<CardKey, boolean>>({
    beans: false,
    recipes: false,
    cafes: false,
  });

  const cards = [
    {
      key: "beans" as CardKey,
      href: "/beans",
      title: "コーヒー豆",
      desc: "産地・焙煎度・テイストを記録",
      images: ["/beans-1.png", "/beans-2.png"] as [string, string],
    },
    {
      key: "recipes" as CardKey,
      href: "/recipes",
      title: "抽出レシピ",
      desc: "湯温・湯量・抽出時間を共有",
      images: ["/recipe-1.png", "/recipe-2.png"] as [string, string],
    },
    {
      key: "cafes" as CardKey,
      href: "/cafes",
      title: "カフェ記録",
      desc: "訪れたカフェの思い出を残す",
      images: ["/cafe-1.png", "/cafe-2.png"] as [string, string],
    },
  ];

  return (
    <main>
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
          コーヒーの記憶
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
          {cards.map(({ key, href, title, desc, images }) => (
            <Link
              key={key}
              href={href}
              style={{
                textDecoration: "none",
              }}
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
                  background: "#FCFAF9",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "1.75rem 1rem",
                  textAlign: "center",
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <AnimatedIllus
                  triggered={triggered[key]}
                  images={images}
                />

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
