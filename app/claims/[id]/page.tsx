import { notFound } from "next/navigation"
import { FC } from "react"
import { Badge, Card } from "components/elements/layout"
import { getClaims, getClaimById } from "lib/claims"
import {
  CATEGORY_LABEL,
  CONFIDENCE_LABEL,
  RISK_COLOR,
  RISK_LABEL,
  SOURCE_TYPE_LABEL,
  VERDICT_COLOR,
  VERDICT_LABEL,
} from "lib/labels"

type Props = {
  params: Promise<{ id: string }>
}

export const generateStaticParams = () =>
  getClaims().map((c) => ({ id: c.id }))

const BASE_URL = "https://re-pseudo.reload.co.jp"

const VERDICT_RATING: Record<string, { value: number; label: string }> = {
  false: { value: 1, label: "虚偽" },
  misleading: { value: 2, label: "誤解を招く" },
  insufficient_evidence: { value: 3, label: "根拠不十分" },
  partially_true: { value: 4, label: "部分的に正確" },
  unverified: { value: 3, label: "未検証" },
}

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params
  const claim = getClaimById(id)
  if (!claim) return {}
  const url = `${BASE_URL}/claims/${id}/`
  return {
    title: claim.title,
    description: claim.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: claim.title,
      description: claim.summary,
      publishedTime: claim.created_at,
      modifiedTime: claim.updated_at,
    },
  }
}

const ClaimDetailPage: FC<Props> = async ({ params }) => {
  const { id } = await params
  const claim = getClaimById(id)
  if (!claim) notFound()

  const sectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: ".75rem",
  }

  const sectionTitleStyle: React.CSSProperties = {
    color: "#a0aec0",
    fontSize: ".75rem",
    fontWeight: 600,
    letterSpacing: ".05em",
    textTransform: "uppercase",
  }

  const rating = VERDICT_RATING[claim.verdict]
  const claimReviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    url: `${BASE_URL}/claims/${id}/`,
    datePublished: claim.created_at,
    claimReviewed: claim.claim,
    author: {
      "@type": "Organization",
      name: "Re pseudo",
      url: BASE_URL,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating.value,
      bestRating: 5,
      worstRating: 1,
      alternateName: rating.label,
    },
    itemReviewed: {
      "@type": "Claim",
      author: { "@type": "Thing", name: "不明" },
    },
  }

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(claimReviewJsonLd) }}
        type="application/ld+json"
      />
      <header style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".375rem" }}>
          <Badge
            color={VERDICT_COLOR[claim.verdict]}
            label={VERDICT_LABEL[claim.verdict]}
          />
          <Badge
            color={RISK_COLOR[claim.risk_level]}
            label={RISK_LABEL[claim.risk_level]}
          />
          <Badge color="#718096" label={CATEGORY_LABEL[claim.category]} />
          <Badge color="#718096" label={CONFIDENCE_LABEL[claim.confidence]} />
        </div>
        <h1 style={{ fontSize: "1.375rem", fontWeight: 700, lineHeight: 1.4 }}>
          {claim.title}
        </h1>
        <p style={{ color: "#718096", fontSize: ".75rem" }}>
          公開: {claim.created_at}
          {claim.updated_at !== claim.created_at && `　更新: ${claim.updated_at}`}
        </p>
      </header>

      <Card style={sectionStyle}>
        <p style={sectionTitleStyle}>主張</p>
        <p style={{ fontSize: ".9375rem", lineHeight: 1.7 }}>{claim.claim}</p>
      </Card>

      <Card
        style={{
          ...sectionStyle,
          borderLeft: `3px solid ${VERDICT_COLOR[claim.verdict]}`,
        }}
      >
        <p style={sectionTitleStyle}>判定</p>
        <div style={{ alignItems: "center", display: "flex", gap: ".75rem" }}>
          <span
            style={{
              color: VERDICT_COLOR[claim.verdict],
              fontSize: "1.25rem",
              fontWeight: 700,
            }}
          >
            {VERDICT_LABEL[claim.verdict]}
          </span>
          <span style={{ color: "#718096", fontSize: ".875rem" }}>
            {CONFIDENCE_LABEL[claim.confidence]}
          </span>
        </div>
      </Card>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>サマリー</h2>
        <p style={{ fontSize: ".9375rem", lineHeight: 1.7 }}>{claim.summary}</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>解説</h2>
        <p
          style={{
            color: "#a0aec0",
            fontSize: ".9375rem",
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
          }}
        >
          {claim.explanation}
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>拡散する理由</h2>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            listStyle: "none",
            padding: 0,
          }}
        >
          {claim.why_it_spreads.map((reason, i) => (
            <li
              key={i}
              style={{
                alignItems: "flex-start",
                color: "#a0aec0",
                display: "flex",
                fontSize: ".9375rem",
                gap: ".5rem",
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: "#718096", flexShrink: 0 }}>•</span>
              {reason}
            </li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>よく使われる論法・誤謬</h2>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            listStyle: "none",
            padding: 0,
          }}
        >
          {claim.common_fallacies.map((fallacy, i) => (
            <li
              key={i}
              style={{
                alignItems: "flex-start",
                color: "#a0aec0",
                display: "flex",
                fontSize: ".9375rem",
                gap: ".5rem",
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: "#d69e2e", flexShrink: 0 }}>!</span>
              {fallacy}
            </li>
          ))}
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>出典</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {claim.sources.map((source, i) => (
            <div
              key={i}
              style={{
                alignItems: "baseline",
                display: "flex",
                gap: ".75rem",
              }}
            >
              <Badge color="#718096" label={SOURCE_TYPE_LABEL[source.type]} />
              <a
                href={source.url}
                rel="noopener noreferrer"
                style={{
                  color: "#63b3ed",
                  fontSize: ".875rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                target="_blank"
              >
                {source.title}
              </a>
            </div>
          ))}
        </div>
      </section>

      {claim.tags.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>タグ</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".375rem" }}>
            {claim.tags.map((tag) => (
              <Badge color="#718096" key={tag} label={`#${tag}`} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

export default ClaimDetailPage
