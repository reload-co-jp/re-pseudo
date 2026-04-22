import Link from "next/link"
import "./reset.css"

const BASE_URL = "https://re-pseudo.reload.co.jp"
const SITE_TITLE = "Re pseudo — 似非科学・陰謀論の主張検証"
const SITE_DESCRIPTION =
  "似非科学・陰謀論・誤情報の主張を、根拠・出典・流布状況・よく使われる論法とともに整理する検証カタログ。"

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Re pseudo",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Re pseudo",
  authors: [{ name: "Re pseudo" }],
  creator: "Re pseudo",
  publisher: "Re pseudo",
  manifest: "/manifest.webmanifest",
  keywords: [
    "似非科学",
    "疑似科学",
    "陰謀論",
    "誤情報",
    "ファクトチェック",
    "ClaimReview",
    "反証",
    "検証",
  ],
  category: "fact-checking",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "Re pseudo",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/logo.svg",
        width: 220,
        height: 56,
        alt: "Re pseudo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/logo.svg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export const viewport = {
  themeColor: "#3d2b34",
  colorScheme: "dark",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Re pseudo",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    sameAs: [BASE_URL],
  }

  return (
    <html lang="ja">
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          type="application/ld+json"
        />
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
            <Link
              href="/"
              style={{
                alignItems: "center",
                display: "flex",
                flexShrink: 0,
                textDecoration: "none",
              }}
            >
              <img
                alt="Re pseudo"
                height={52}
                src="/logo.svg"
                style={{ display: "block", height: "52px", width: "204px" }}
                width={204}
              />
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
