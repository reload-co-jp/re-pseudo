import { FC } from "react"

export const metadata = {
  title: "このサイトについて",
  description:
    "Re pseudoは、陰謀論や疑似科学的な情報を科学的な再現性・検証可能性の観点から見直し、事実に基づいた理解を広めることを目的としたサイトです。",
  alternates: {
    canonical: "https://re-pseudo.reload.co.jp/about/",
  },
  openGraph: {
    type: "article",
    url: "https://re-pseudo.reload.co.jp/about/",
    title: "このサイトについて — Re pseudo",
    description:
      "Re pseudoは、陰謀論や疑似科学的な情報を科学的な再現性・検証可能性の観点から見直し、事実に基づいた理解を広めることを目的としたサイトです。",
  },
}

const AboutPage: FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "680px" }}>
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

export default AboutPage
