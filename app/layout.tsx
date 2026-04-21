import Link from "next/link"
import { Title } from "components/elements/layout"
import "./reset.css"

const BASE_URL = "https://re-pseudo.reload.co.jp"

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Re pseudo — 似非科学・陰謀論の主張検証",
    template: "%s — Re pseudo",
  },
  description:
    "世の中で流通している似非科学・陰謀論・誤情報について、主張・根拠・検証結果を構造化して提示するカタログ型Webサイト。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "Re pseudo",
    title: "Re pseudo — 似非科学・陰謀論の主張検証",
    description:
      "世の中で流通している似非科学・陰謀論・誤情報について、主張・根拠・検証結果を構造化して提示するカタログ型Webサイト。",
  },
  twitter: {
    card: "summary",
    title: "Re pseudo — 似非科学・陰謀論の主張検証",
    description:
      "世の中で流通している似非科学・陰謀論・誤情報について、主張・根拠・検証結果を構造化して提示するカタログ型Webサイト。",
  },
  alternates: {
    canonical: BASE_URL,
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <header
          style={{
            backgroundColor: "#3d2b34",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: ".75rem 1.5rem",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "2rem",
              margin: "0 auto",
              maxWidth: "900px",
            }}
          >
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              <Title>Re pseudo</Title>
            </Link>
            <nav style={{ display: "flex", gap: "1.25rem" }}>
              <Link
                href="/claims/"
                style={{ color: "#a0aec0", fontSize: ".875rem", textDecoration: "none" }}
              >
                一覧
              </Link>
              <Link
                href="/about/"
                style={{ color: "#a0aec0", fontSize: ".875rem", textDecoration: "none" }}
              >
                このサイトについて
              </Link>
            </nav>
          </div>
        </header>
        <main
          style={{
            background: "#261b22",
            minHeight: "calc(100dvh - 6rem)",
            padding: "2rem 1.5rem",
          }}
        >
          <div style={{ margin: "0 auto", maxWidth: "900px" }}>{children}</div>
        </main>
        <footer
          style={{
            backgroundColor: "#3d2b34",
            boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
            fontSize: ".75rem",
            padding: "1rem 1.5rem",
          }}
        >
          <p style={{ color: "#718096", margin: "0 auto", maxWidth: "900px" }}>
            &copy; Re pseudo — 情報の信頼性を判断するための材料提供を目的としています。
          </p>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout
