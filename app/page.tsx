import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div style={{
        background: "var(--dark)",
        padding: "5rem 2rem 4rem",
        textAlign: "center",
        color: "var(--cream)",
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "4rem",
          fontWeight: 300,
          fontStyle: "italic",
          letterSpacing: "0.08em",
          marginBottom: "0.75rem",
        }}>
          Versare
        </h1>
        <p style={{
          fontSize: "14px",
          color: "var(--light)",
          letterSpacing: "0.06em",
          fontWeight: 300,
        }}>
          コーヒーの記憶
        </p>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
        }}>
          {[
            { href: "/beans", icon: "🫘", title: "コーヒー豆", desc: "産地・焙煎度・テイストを記録" },
            { href: "/recipes", icon: "☕️", title: "抽出レシピ", desc: "湯温・湯量・抽出時間を共有" },
            { href: "/cafes", icon: "🏠", title: "カフェ探訪記", desc: "訪れたカフェの思い出を残す" },
          ].map(({ href, icon, title, desc }) => (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div className="card" style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "1.75rem",
                textAlign: "center",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem", opacity: 0.6 }}>{icon}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.3rem",
                  fontStyle: "italic",
                  color: "var(--dark)",
                  marginBottom: "6px",
                }}>
                  {title}
                </div>
                <div style={{ fontSize: "12px", color: "var(--mid)" }}>{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
