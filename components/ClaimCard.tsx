import Link from "next/link"
import { Badge, Card } from "components/elements/layout"
import { formatDate } from "lib/claims"
import { CATEGORY_LABEL, RISK_COLOR, RISK_LABEL, VERDICT_COLOR, VERDICT_LABEL } from "lib/labels"
import type { Claim } from "types/claim"

type Props = {
  claim: Claim
}

const ClaimCard = ({ claim }: Props) => (
  <Card style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
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
        color: "#e2e8f0",
        fontSize: "1rem",
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      {claim.title}
    </Link>
    <p style={{ color: "#a0aec0", fontSize: ".875rem", lineHeight: 1.6 }}>
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
    <p style={{ color: "#718096", fontSize: ".75rem" }}>{formatDate(claim.created_at)}</p>
  </Card>
)

export default ClaimCard
