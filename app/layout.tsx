import Link from "next/link"
import Script from "next/script"
import "./reset.css"

const BASE_URL = "https://re-pseudo.reload.co.jp"
const GA_MEASUREMENT_ID = "G-XTHQD4EWNJ"
const IS_PRODUCTION = process.env.NODE_ENV === "production"
const SITE_TITLE = "Re pseudo — 疑似科学・似非科学・陰謀論の主張検証"
const SITE_DESCRIPTION =
  "疑似科学・似非科学・陰謀論・誤情報の主張を、根拠・出典・流布状況・よく使われる論法とともに整理する検証カタログ。"

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
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export const viewport = {
  themeColor: "#141012",
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
        {IS_PRODUCTION && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
          type="application/ld+json"
        />
        <header
          style={{
            backdropFilter: "blur(18px)",
            backgroundColor: "rgba(16, 13, 17, .82)",
            borderBottom: "1px solid var(--border)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, .22)",
            padding: ".8rem 1.5rem",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              margin: "0 auto",
              maxWidth: "1040px",
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
            <nav
              style={{ display: "flex", flexWrap: "wrap", gap: "1rem 1.15rem" }}
            >
              <Link
                href="/claims/"
                style={{
                  color: "var(--muted)",
                  fontSize: ".875rem",
                  textDecoration: "none",
                }}
              >
                一覧
              </Link>
              <Link
                href="/fallacies/"
                style={{
                  color: "var(--muted)",
                  fontSize: ".875rem",
                  textDecoration: "none",
                }}
              >
                よくある誤謬
              </Link>
              <Link
                href="/criteria/"
                style={{
                  color: "var(--muted)",
                  fontSize: ".875rem",
                  textDecoration: "none",
                }}
              >
                判断基準
              </Link>
              <Link
                href="/conspiracy/"
                style={{
                  color: "var(--muted)",
                  fontSize: ".875rem",
                  textDecoration: "none",
                }}
              >
                陰謀論とは何か
              </Link>
              <Link
                href="/about/"
                style={{
                  color: "var(--muted)",
                  fontSize: ".875rem",
                  textDecoration: "none",
                }}
              >
                このサイトについて
              </Link>
            </nav>
          </div>
        </header>
        <main
          style={{
            minHeight: "calc(100dvh - 6rem)",
            padding: "2.5rem 1.5rem 3.25rem",
          }}
        >
          <div style={{ margin: "0 auto", maxWidth: "1040px" }}>{children}</div>
        </main>
        <footer
          style={{
            backgroundColor: "rgba(16, 13, 17, .9)",
            borderTop: "1px solid var(--border)",
            boxShadow: "0 -10px 30px rgba(0, 0, 0, .18)",
            fontSize: ".75rem",
            padding: "1rem 1.5rem",
          }}
        >
          <div
            style={{
              color: "#7d736a",
              margin: "0 auto",
              maxWidth: "1040px",
              display: "flex",
              flexDirection: "column",
              gap: ".25rem",
            }}
          >
            <p>
              &copy; Re pseudo —
              情報の信頼性を判断するための材料提供を目的としています。
            </p>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <Link
                href="/diet/"
                style={{
                  color: "#7d736a",
                  textDecoration: "none",
                }}
              >
                ダイエット関連
              </Link>
              <Link
                href="/anti-government-conspiracy/"
                style={{
                  color: "#7d736a",
                  textDecoration: "none",
                }}
              >
                反政府陰謀論
              </Link>
            </div>
            <p>
              運営:&nbsp;
              <a
                href="https://reload.co.jp"
                rel="noopener noreferrer"
                style={{ color: "#7d736a" }}
                target="_blank"
              >
                株式会社リロード
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout
