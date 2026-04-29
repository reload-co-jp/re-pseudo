import { notFound } from "next/navigation"
import Link from "next/link"
import { FC } from "react"
import Breadcrumbs from "components/Breadcrumbs"
import { Badge, Card } from "components/elements/layout"
import { formatDate, getClaims, getClaimById, getRelatedClaims } from "lib/claims"
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

export const generateStaticParams = () => getClaims().map((c) => ({ id: c.id }))

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
    title: `【検証】${claim.title}`,
    description: claim.summary,
    keywords: [
      claim.title,
      claim.category,
      claim.verdict,
      ...claim.tags,
      ...claim.common_fallacies.map((group) => group.group),
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `【検証】${claim.title}`,
      description: claim.summary,
      publishedTime: claim.created_at,
      modifiedTime: claim.updated_at,
      tags: claim.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `【検証】${claim.title}`,
      description: claim.summary,
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
  const circulationItems = [
    { label: "初出・起点", value: claim.circulation.first_seen },
    { label: "流布時期", value: claim.circulation.spread_period },
    { label: "流行範囲", value: claim.circulation.spread_scope },
    { label: "補足", value: claim.circulation.note },
  ]
  const claimReviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    url: `${BASE_URL}/claims/${id}/`,
    mainEntityOfPage: `${BASE_URL}/claims/${id}/`,
    datePublished: claim.created_at,
    dateModified: claim.updated_at,
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
    publisher: {
      "@type": "Organization",
      name: "Re pseudo",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
    keywords: claim.tags.join(", "),
  }
  const relatedClaims = getRelatedClaims(claim)
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
        name: "主張一覧",
        item: `${BASE_URL}/claims/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: claim.title,
        item: `${BASE_URL}/claims/${id}/`,
      },
    ],
  }

  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(claimReviewJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <header
        style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}
      >
        <Breadcrumbs
          items={[
            { href: "/", label: "ホーム" },
            { href: "/claims/", label: "主張一覧" },
            { label: claim.title },
          ]}
        />
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
        <h1
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          {claim.title}
        </h1>
        <p style={{ color: "#718096", fontSize: ".75rem" }}>
          公開: {formatDate(claim.created_at)}
          {claim.updated_at !== claim.created_at && `更新: ${formatDate(claim.updated_at)}`}
        </p>
      </header>

      <Card
        style={{
          ...sectionStyle,
          padding: "1.25rem",
        }}
      >
        <p style={{ ...sectionTitleStyle, color: "#f6ad55" }}>検証する主張</p>
        <p
          style={{
            color: "#d9d9d6",
            fontSize: "clamp(1.25rem, 2.8vw, 1.75rem)",
            fontWeight: 700,
            lineHeight: 1.55,
          }}
        >
          {claim.claim}
        </p>
      </Card>

      <Card style={sectionStyle}>
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

      <Card style={sectionStyle}>
        <p style={sectionTitleStyle}>初出・流布状況</p>
        <dl
          style={{
            display: "grid",
            gap: ".75rem",
            margin: 0,
          }}
        >
          {circulationItems.map((item) => (
            <div
              key={item.label}
              style={{
                display: "grid",
                gap: ".25rem",
              }}
            >
              <dt
                style={{
                  color: "#f6ad55",
                  fontSize: ".75rem",
                  fontWeight: 700,
                }}
              >
                {item.label}
              </dt>
              <dd
                style={{
                  color: "#cbd5e0",
                  fontSize: ".875rem",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
        {Boolean(
          claim.circulation.spreaders?.length ||
          claim.circulation.beneficiaries?.length
        ) && (
          <div
            style={{
              display: "grid",
              gap: ".75rem",
            }}
          >
            {claim.circulation.spreaders?.length ? (
              <div>
                <h3
                  style={{
                    color: "#f6ad55",
                    fontSize: ".75rem",
                    fontWeight: 700,
                    marginBottom: ".4rem",
                  }}
                >
                  流布させた主体
                </h3>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".35rem",
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  {claim.circulation.spreaders.map((spreader) => (
                    <li
                      key={spreader}
                      style={{
                        color: "#cbd5e0",
                        display: "flex",
                        fontSize: ".875rem",
                        gap: ".5rem",
                        lineHeight: 1.7,
                      }}
                    >
                      <span style={{ color: "#718096" }}>•</span>
                      {spreader}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {claim.circulation.beneficiaries?.length ? (
              <div>
                <h3
                  style={{
                    color: "#f6ad55",
                    fontSize: ".75rem",
                    fontWeight: 700,
                    marginBottom: ".4rem",
                  }}
                >
                  受益しうる主体
                </h3>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".35rem",
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  {claim.circulation.beneficiaries.map((beneficiary) => (
                    <li
                      key={beneficiary}
                      style={{
                        color: "#cbd5e0",
                        display: "flex",
                        fontSize: ".875rem",
                        gap: ".5rem",
                        lineHeight: 1.7,
                      }}
                    >
                      <span style={{ color: "#718096" }}>•</span>
                      {beneficiary}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
        <a
          href={claim.circulation.source.url}
          rel="noopener noreferrer"
          style={{
            color: "#63b3ed",
            fontSize: ".75rem",
            overflowWrap: "anywhere",
            textDecoration: "none",
          }}
          target="_blank"
        >
          参照: {claim.circulation.source.title}
        </a>
      </Card>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>よく使われる論法・誤謬</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".75rem",
          }}
        >
          {claim.common_fallacies.map((fallacyGroup) => (
            <div
              key={fallacyGroup.group}
              style={{
                backgroundColor: "#261b22",
                border: "1px solid #372630",
                borderRadius: "4px",
                padding: ".875rem 1rem",
              }}
            >
              <Link
                href={`/claims/?fallacy=${encodeURIComponent(fallacyGroup.group)}`}
                style={{
                  color: "#f6ad55",
                  display: "inline-block",
                  fontSize: ".875rem",
                  fontWeight: 700,
                  marginBottom: ".5rem",
                  textDecoration: "none",
                }}
              >
                {fallacyGroup.group}
              </Link>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {fallacyGroup.items.map((fallacy) => (
                  <li
                    key={fallacy}
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
            </div>
          ))}
        </div>
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
              <Link
                href={`/claims/?tag=${encodeURIComponent(tag)}`}
                key={tag}
                style={{ textDecoration: "none" }}
              >
                <Badge color="#718096" label={`#${tag}`} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedClaims.length > 0 && (
        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>類似の主張</h2>
          <div
            style={{
              display: "grid",
              gap: ".5rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            {relatedClaims.map((related) => (
              <Link
                href={`/claims/${related.id}/`}
                key={related.id}
                style={{
                  backgroundColor: "#261b22",
                  border: "1px solid #372630",
                  borderRadius: "4px",
                  color: "#e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".35rem",
                  minWidth: 0,
                  padding: ".75rem",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    color: "#f6ad55",
                    fontSize: ".75rem",
                    fontWeight: 700,
                    lineHeight: 1.4,
                  }}
                >
                  {VERDICT_LABEL[related.verdict]}
                </span>
                <span
                  style={{
                    fontSize: ".875rem",
                    fontWeight: 700,
                    lineHeight: 1.45,
                    overflowWrap: "anywhere",
                  }}
                >
                  {related.title}
                </span>
                <span
                  style={{
                    color: "#a0aec0",
                    fontSize: ".75rem",
                    lineHeight: 1.5,
                    overflowWrap: "anywhere",
                  }}
                >
                  {related.summary}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section style={{ ...sectionStyle, alignItems: "flex-start" }}>
        <h2 style={sectionTitleStyle}>シェア</h2>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(claim.title)}&url=${encodeURIComponent(`${BASE_URL}/claims/${id}/`)}`}
          rel="noopener noreferrer"
          style={{
            alignItems: "center",
            backgroundColor: "#000",
            border: "1px solid #333",
            borderRadius: "6px",
            color: "#fff",
            display: "inline-flex",
            fontSize: ".875rem",
            fontWeight: 600,
            gap: ".5rem",
            padding: ".5rem 1rem",
            textDecoration: "none",
          }}
          target="_blank"
        >
          <svg
            fill="currentColor"
            height="16"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
          </svg>
          Xでシェア
        </a>
      </section>
    </article>
  )
}

export default ClaimDetailPage
