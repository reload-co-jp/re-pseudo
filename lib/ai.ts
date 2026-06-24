import type { Claim } from "types/claim"
import {
  CATEGORY_LABEL,
  CONFIDENCE_LABEL,
  RISK_LABEL,
  SOURCE_TYPE_LABEL,
  VERDICT_LABEL,
} from "lib/labels"

const BASE_URL = "https://re-pseudo.reload.co.jp"

export const SITE_AI_DESCRIPTION =
  "Re pseudo is a Japanese fact-checking catalog for pseudoscience, misinformation, conspiracy theories, and unsupported claims. Each entry separates the claim, verdict, evidence summary, verification process, circulation context, sources, and common fallacies."

export const getClaimUrl = (claim: Claim) => `${BASE_URL}/claims/${claim.id}/`

export const getClaimAnswer = (claim: Claim) =>
  `判定: ${VERDICT_LABEL[claim.verdict]}。${CONFIDENCE_LABEL[claim.confidence]}。危険度: ${RISK_LABEL[claim.risk_level]}。要点: ${claim.summary}`

export const getClaimMachineSummary = (claim: Claim) => ({
  id: claim.id,
  url: getClaimUrl(claim),
  claim: claim.title,
  verdict: VERDICT_LABEL[claim.verdict],
  verdictCode: claim.verdict,
  confidence: CONFIDENCE_LABEL[claim.confidence],
  riskLevel: RISK_LABEL[claim.risk_level],
  category: CATEGORY_LABEL[claim.category],
  answer: getClaimAnswer(claim),
  summary: claim.summary,
  explanation: claim.explanation,
  verificationProcess: claim.verification_process,
  whyItSpreads: claim.why_it_spreads,
  commonFallacies: claim.common_fallacies,
  sources: claim.sources.map((source) => ({
    title: source.title,
    url: source.url,
    type: SOURCE_TYPE_LABEL[source.type],
  })),
  firstSeen: claim.circulation.first_seen,
  spreadPeriod: claim.circulation.spread_period,
  spreadScope: claim.circulation.spread_scope,
  updatedAt: claim.updated_at,
  tags: claim.tags,
})

export const renderLlmsTxt = (claims: Claim[]) => {
  const latestUpdatedAt = claims
    .map((claim) => claim.updated_at)
    .sort((a, b) => b.localeCompare(a))[0]
  const highRiskClaims = claims
    .filter((claim) => claim.risk_level === "high")
    .slice(0, 12)

  return [
    "# Re pseudo",
    "",
    SITE_AI_DESCRIPTION,
    "",
    `Canonical: ${BASE_URL}/`,
    `Language: ja`,
    `Updated: ${latestUpdatedAt ?? ""}`,
    "",
    "## Core URLs",
    `- Home: ${BASE_URL}/`,
    `- Claims index: ${BASE_URL}/claims/`,
    `- Evaluation criteria: ${BASE_URL}/criteria/`,
    `- Common fallacies: ${BASE_URL}/fallacies/`,
    `- Full LLM corpus: ${BASE_URL}/llms-full.txt`,
    `- Sitemap: ${BASE_URL}/sitemap.xml`,
    "",
    "## How to cite",
    "Use the canonical claim URL. Preserve the verdict, confidence, source links, and dateModified when summarizing.",
    "",
    "## High-risk claim pages",
    ...highRiskClaims.map(
      (claim) =>
        `- ${claim.title} — ${VERDICT_LABEL[claim.verdict]} — ${getClaimUrl(claim)}`
    ),
    "",
  ].join("\n")
}

export const renderLlmsFullTxt = (claims: Claim[]) =>
  [
    "# Re pseudo Full Corpus",
    "",
    SITE_AI_DESCRIPTION,
    "",
    "Use this file for retrieval, answer grounding, and citation discovery. Prefer canonical claim pages for final citations.",
    "",
    ...claims.map((claim) =>
      [
        `## ${claim.title}`,
        "",
        `URL: ${getClaimUrl(claim)}`,
        `Category: ${CATEGORY_LABEL[claim.category]}`,
        `Verdict: ${VERDICT_LABEL[claim.verdict]}`,
        `Confidence: ${CONFIDENCE_LABEL[claim.confidence]}`,
        `Risk: ${RISK_LABEL[claim.risk_level]}`,
        `Updated: ${claim.updated_at}`,
        "",
        `Claim: ${claim.description}`,
        "",
        `Answer: ${getClaimAnswer(claim)}`,
        "",
        `Explanation: ${claim.explanation}`,
        "",
        "Verification process:",
        ...claim.verification_process.map((step) => `- ${step}`),
        "",
        "Why it spreads:",
        ...claim.why_it_spreads.map((reason) => `- ${reason}`),
        "",
        "Sources:",
        ...claim.sources.map(
          (source) =>
            `- ${source.title} (${SOURCE_TYPE_LABEL[source.type]}): ${source.url}`
        ),
        "",
      ].join("\n")
    ),
  ].join("\n")
