import { FC } from "react"

const BASE_URL = "https://re-pseudo.reload.co.jp"
const DESCRIPTION =
  "Re pseudoは、陰謀論や疑似科学的な情報を科学的な再現性・検証可能性の観点から見直し、事実に基づいた理解を広めることを目的としたサイトです。"

export const metadata = {
  title: "このサイトについて",
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/about/`,
  },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/about/`,
    title: "このサイトについて — Re pseudo",
    description: DESCRIPTION,
    images: [{ url: "/logo.svg", width: 220, height: 56, alt: "Re pseudo" }],
  },
  twitter: {
    card: "summary",
    title: "このサイトについて — Re pseudo",
    description: DESCRIPTION,
    images: ["/logo.svg"],
  },
}

const AboutPage: FC = () => {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "このサイトについて",
        item: `${BASE_URL}/about/`,
      },
    ],
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "680px" }}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <h1 style={{ fontSize: "1.25rem", fontWeight: 700 }}>このサイトについて</h1>

      <p style={{ color: "#a0aec0", fontSize: ".9375rem", lineHeight: 1.9 }}>
        近年、陰謀論や疑似科学的な情報が広く拡散され、多くの人がその真偽の判断に迷う状況が生まれています。
      </p>

      <p style={{ color: "#a0aec0", fontSize: ".9375rem", lineHeight: 1.9 }}>
        本サイトは、そうした情報を科学的な再現性や検証可能性の観点から見直し、事実に基づいた理解を広めることを目的として立ち上げました。
      </p>

      <p style={{ color: "#a0aec0", fontSize: ".9375rem", lineHeight: 1.9 }}>
        特定の主張を否定すること自体を目的とするのではなく、「どのように検証されているのか」「何が事実として確認されているのか」を丁寧に整理することで、より健全な情報環境に貢献したいと考えています。
      </p>
    </div>
  )
}

export default AboutPage
