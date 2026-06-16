import Link from "next/link"
import { Badge, Card } from "components/elements/layout"
import { formatDate } from "lib/claims"
import {
  CATEGORY_LABEL,
  RISK_COLOR,
  RISK_LABEL,
  VERDICT_COLOR,
  VERDICT_LABEL,
} from "lib/labels"
import type { Claim } from "types/claim"

type Props = {
  claim: Claim
}

const ClaimCard = ({ claim }: Props) => (
  <Card
    className="claim-card"
    style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr auto" }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        minWidth: 0,
      }}
    >
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
      </div>
      <Link
        href={`/claims/${claim.id}/`}
        style={{
          color: "var(--ink)",
          fontSize: "1rem",
          fontWeight: 700,
          lineHeight: 1.55,
          textDecoration: "none",
        }}
      >
        {claim.title}
      </Link>
      {claim.site_catchphrase && (
        <p
          style={{
            color: "var(--accent-soft)",
            fontSize: ".8125rem",
            fontWeight: 700,
            lineHeight: 1.5,
          }}
        >
          {claim.site_catchphrase}
        </p>
      )}
      <p
        style={{ color: "var(--muted)", fontSize: ".875rem", lineHeight: 1.75 }}
      >
        {claim.summary}
      </p>
      {claim.tags.length > 0 && (
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
      )}
      <p style={{ color: "#7d736a", fontSize: ".75rem" }}>
        {formatDate(claim.created_at)}
      </p>
    </div>
    {claim.images?.[0] && (
      <Link
        aria-label={`${claim.title}の詳細へ`}
        className="claim-card__image"
        href={`/claims/${claim.id}/`}
        style={{
          alignSelf: "start",
          aspectRatio: "4 / 3",
          backgroundColor: "#141012",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          display: "block",
          boxShadow: "0 10px 24px rgba(0,0,0,.28)",
          overflow: "hidden",
          width: "96px",
        }}
      >
        <img
          alt={claim.images[0].alt}
          loading="lazy"
          src={claim.images[0].url}
          style={{
            display: "block",
            height: "100%",
            objectFit: "cover",
            width: "100%",
          }}
        />
      </Link>
    )}
  </Card>
)

export default ClaimCard
