export type Claim = {
  id: string
  title: string
  description: string
  category: "health" | "environment" | "conspiracy" | "technology" | "finance"
  verdict: "false" | "misleading" | "insufficient_evidence" | "partially_true" | "unverified"
  confidence: "high" | "medium" | "low"
  risk_level: "high" | "medium" | "low"
  summary: string
  explanation: string
  verification_process: string[]
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
  images?: {
    url: string
    alt: string
    caption?: string
    credit?: string
    source_url?: string
  }[]
  created_at: string
  updated_at: string
  tags: string[]
}
