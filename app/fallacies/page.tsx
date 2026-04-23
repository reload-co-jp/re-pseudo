import Link from "next/link"
import { FC } from "react"
import { Card } from "components/elements/layout"
import { getFallacyGroups } from "lib/fallacies"

const BASE_URL = "https://re-pseudo.reload.co.jp"
const DESCRIPTION =
  "陰謀論・疑似科学の主張でよく使われる誤謬・論法を、出現頻度と具体例とともに整理したカタログ。"

export const metadata = {
  title: "よくある誤謬",
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/fallacies/`,
  },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/fallacies/`,
    title: "よくある誤謬 — Re pseudo",
    description: DESCRIPTION,
    images: [{ url: "/logo.svg", width: 220, height: 56, alt: "Re pseudo" }],
  },
  twitter: {
    card: "summary",
    title: "よくある誤謬 — Re pseudo",
    description: DESCRIPTION,
    images: ["/logo.svg"],
  },
}

const sectionTitleStyle: React.CSSProperties = {
  color: "#a0aec0",
  fontSize: ".75rem",
  fontWeight: 600,
  letterSpacing: ".05em",
  textTransform: "uppercase",
}

const FallaciesPage: FC = () => {
  const groups = getFallacyGroups()

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "よくある誤謬", item: `${BASE_URL}/fallacies/` },
    ],
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <header style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700 }}>よくある誤謬</h1>
        <p style={{ color: "#a0aec0", fontSize: ".875rem", lineHeight: 1.8 }}>
          {DESCRIPTION}
        </p>
      </header>

      <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
        {groups.map((g) => (
          <a
            key={g.name}
            href={`#${encodeURIComponent(g.name)}`}
            style={{
              backgroundColor: "#372630",
              border: "1px solid #5a3d48",
              borderRadius: "4px",
              color: "#e2e8f0",
              fontSize: ".8125rem",
              padding: ".3rem .75rem",
              textDecoration: "none",
            }}
          >
            {g.name}
            <span style={{ color: "#718096", marginLeft: ".4em" }}>{g.count}</span>
          </a>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {groups.map((group) => (
          <section
            id={encodeURIComponent(group.name)}
            key={group.name}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                alignItems: "baseline",
                borderBottom: "1px solid #5a3d48",
                display: "flex",
                gap: ".75rem",
                paddingBottom: ".5rem",
              }}
            >
              <h2 style={{ fontSize: "1rem", fontWeight: 700 }}>{group.name}</h2>
              <span style={{ color: "#718096", fontSize: ".8125rem" }}>{group.count}件の主張で使用</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {group.claims.map((claim) => (
                <Card
                  key={claim.id}
                  style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
                >
                  <Link
                    href={`/claims/${claim.id}/`}
                    style={{
                      color: "#e2e8f0",
                      fontSize: ".875rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    {claim.title}
                  </Link>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".35rem",
                      listStyle: "none",
                      padding: 0,
                    }}
                  >
                    {claim.items.map((item) => (
                      <li
                        key={item}
                        style={{
                          alignItems: "flex-start",
                          color: "#a0aec0",
                          display: "flex",
                          fontSize: ".875rem",
                          gap: ".5rem",
                          lineHeight: 1.6,
                        }}
                      >
                        <span style={{ color: "#d69e2e", flexShrink: 0 }}>!</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <Link
              href={`/claims/?fallacy=${encodeURIComponent(group.name)}`}
              style={{ color: "#63b3ed", fontSize: ".8125rem", textDecoration: "none" }}
            >
              「{group.name}」の主張一覧 →
            </Link>
          </section>
        ))}
      </div>
    </div>
  )
}

export default FallaciesPage
