import type { Claim } from "types/claim"

export const VERDICT_LABEL: Record<Claim["verdict"], string> = {
  false: "虚偽",
  misleading: "誤解を招く",
  insufficient_evidence: "根拠不十分",
  partially_true: "部分的に正確",
  unverified: "未検証",
}

export const VERDICT_COLOR: Record<Claim["verdict"], string> = {
  false: "#e53e3e",
  misleading: "#dd6b20",
  insufficient_evidence: "#d69e2e",
  partially_true: "#3182ce",
  unverified: "#718096",
}

export const RISK_LABEL: Record<Claim["risk_level"], string> = {
  high: "高リスク",
  medium: "中リスク",
  low: "低リスク",
}

export const RISK_COLOR: Record<Claim["risk_level"], string> = {
  high: "#e53e3e",
  medium: "#dd6b20",
  low: "#38a169",
}

export const CATEGORY_LABEL: Record<Claim["category"], string> = {
  health: "健康・医療",
  environment: "環境",
  conspiracy: "陰謀論",
  technology: "テクノロジー",
  finance: "金融・経済",
}

export const CONFIDENCE_LABEL: Record<Claim["confidence"], string> = {
  high: "確実性：高",
  medium: "確実性：中",
  low: "確実性：低",
}

export const SOURCE_TYPE_LABEL: Record<
  Claim["sources"][number]["type"],
  string
> = {
  paper: "論文",
  government: "政府機関",
  article: "記事",
  other: "その他",
}
