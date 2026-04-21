export type Claim = {
  id: string
  title: string
  category: "health" | "environment" | "conspiracy" | "technology" | "finance"
  claim: string
  verdict: "false" | "misleading" | "insufficient_evidence" | "partially_true" | "unverified"
  confidence: "high" | "medium" | "low"
  risk_level: "high" | "medium" | "low"
  summary: string
  explanation: string
  why_it_spreads: string[]
  common_fallacies: {
    group: string
    items: string[]
  }[]
  circulation: {
    first_seen: string
    spread_period: string
    spread_scope: string
    note: string
    spreaders?: string[]
    beneficiaries?: string[]
    source: {
      title: string
      url: string
    }
  }
  sources: {
    title: string
    url: string
    type: "paper" | "government" | "article" | "other"
  }[]
  created_at: string
  updated_at: string
  tags: string[]
}
