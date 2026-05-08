import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Versare",
  description: "コーヒーの記憶",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav style={{
          background: "var(--dark)",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          <a href="/" style={{
            color: "var(--cream)",
            fontSize: "1.6rem",
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "0.1em",
            textDecoration: "none",
          }}>
            Versare
          </a>
          <div style={{ display: "flex" }}>
            {[
              { href: "/", label: "ホーム" },
              { href: "/beans", label: "豆" },
              { href: "/recipes", label: "レシピ" },
              { href: "/cafes", label: "カフェ" },
            ].map(({ href, label }) => (
              <NavLink key={href} href={href} label={label} />
            ))}
          </div>
        </nav>
        {children}
        <footer
          style={{
            padding: "2rem",
            textAlign: "center",
            borderTop: "1px solid var(--border)",
            marginTop: "4rem",
            color: "var(--mid)",
            fontSize: "12px",
          }}
        >
        © 2026 Kiyoshiro Shibata
      </footer>
      </body>
    </html>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="nav-link">
      {label}
    </a>
  );
}

