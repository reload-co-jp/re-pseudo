import claimsData from "data/claims.json"
import type { Claim } from "types/claim"

export const formatDate = (date: string): string => date.replace(/-/g, ".")

const claims = claimsData as Claim[]

export const getClaims = (): Claim[] => claims

export const getClaimById = (id: string): Claim | undefined =>
  claims.find((c) => c.id === id)

export const getFeaturedClaims = (): Claim[] =>
  claims
    .filter((c) => c.risk_level === "high" && c.confidence === "high")
    .slice(0, 3)

export const getLatestClaims = (): Claim[] =>
  [...claims].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 4)

const DIET_TAGS = new Set([
  "16時間断食",
  "カロリー",
  "ケトダイエット",
  "ケトジェニック",
  "ジュースクレンズ",
  "ダイエット",
  "デトックスティー",
  "ファスティング",
  "低炭水化物食",
  "低糖質",
  "体重管理",
  "健康油",
  "夜に食べると太る",
  "断続的断食",
  "断食",
  "時間制限食",
  "減量",
  "糖質オフ",
  "糖質ゼロ",
  "糖質制限",
  "脂肪燃焼",
  "肉食ダイエット",
  "酵素ダイエット",
])

export const getDietClaims = (): Claim[] =>
  claims.filter((claim) => claim.tags.some((tag) => DIET_TAGS.has(tag)))

export const getRelatedClaims = (claim: Claim, limit = 6): Claim[] => {
  const tags = new Set(claim.tags)
  const fallacies = new Set(claim.common_fallacies.map((group) => group.group))

  return claims
    .filter((candidate) => candidate.id !== claim.id)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => tags.has(tag)).length
      const sharedFallacies = candidate.common_fallacies.filter((group) =>
        fallacies.has(group.group)
      ).length
      const sameCategory = candidate.category === claim.category ? 1 : 0

      return {
        claim: candidate,
        score: sharedTags * 4 + sharedFallacies * 2 + sameCategory,
      }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return b.claim.created_at.localeCompare(a.claim.created_at)
    })
    .slice(0, limit)
    .map((item) => item.claim)
}

export const getCategoryCount = (): Record<Claim["category"], number> => {
  const counts: Record<string, number> = {}
  for (const c of claims) {
    counts[c.category] = (counts[c.category] ?? 0) + 1
  }
  return counts as Record<Claim["category"], number>
}
