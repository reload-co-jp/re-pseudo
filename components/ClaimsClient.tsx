"use client"

import { useState } from "react"
import ClaimCard from "components/ClaimCard"
import { CATEGORY_LABEL, RISK_LABEL, VERDICT_LABEL } from "lib/labels"
import type { Claim } from "types/claim"

type Props = {
  claims: Claim[]
}

const inputStyle: React.CSSProperties = {
  backgroundColor: "#372630",
  border: "1px solid #5a3d48",
  borderRadius: "6px",
  color: "#f0f0f0",
  fontSize: ".875rem",
  padding: ".5rem .75rem",
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
}

const ClaimsClient = ({ claims }: Props) => {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<Claim["category"] | "">("")
  const [verdict, setVerdict] = useState<Claim["verdict"] | "">("")
  const [riskLevel, setRiskLevel] = useState<Claim["risk_level"] | "">("")

  const filtered = claims.filter((c) => {
    const q = query.toLowerCase()
    const matchQuery =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.claim.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
    const matchCategory = !category || c.category === category
    const matchVerdict = !verdict || c.verdict === verdict
    const matchRisk = !riskLevel || c.risk_level === riskLevel
    return matchQuery && matchCategory && matchVerdict && matchRisk
  })

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".75rem",
          marginBottom: "1.5rem",
        }}
      >
        <input
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワード検索..."
          style={{ ...inputStyle, flexGrow: 1, minWidth: "200px" }}
          type="text"
          value={query}
        />
        <select
          onChange={(e) => setCategory(e.target.value as Claim["category"] | "")}
          style={selectStyle}
          value={category}
        >
          <option value="">カテゴリ：すべて</option>
          {(Object.entries(CATEGORY_LABEL) as [Claim["category"], string][]).map(
            ([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ),
          )}
        </select>
        <select
          onChange={(e) => setVerdict(e.target.value as Claim["verdict"] | "")}
          style={selectStyle}
          value={verdict}
        >
          <option value="">判定：すべて</option>
          {(Object.entries(VERDICT_LABEL) as [Claim["verdict"], string][]).map(
            ([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ),
          )}
        </select>
        <select
          onChange={(e) =>
            setRiskLevel(e.target.value as Claim["risk_level"] | "")
          }
          style={selectStyle}
          value={riskLevel}
        >
          <option value="">危険度：すべて</option>
          {(Object.entries(RISK_LABEL) as [Claim["risk_level"], string][]).map(
            ([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ),
          )}
        </select>
      </div>

      <p style={{ color: "#718096", fontSize: ".875rem", marginBottom: "1rem" }}>
        {filtered.length}件
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filtered.length > 0 ? (
          filtered.map((c) => <ClaimCard claim={c} key={c.id} />)
        ) : (
          <p style={{ color: "#718096" }}>該当する主張が見つかりません。</p>
        )}
      </div>
    </div>
  )
}

export default ClaimsClient
