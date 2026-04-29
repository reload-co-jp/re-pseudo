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

export const getCategoryCount = (): Record<Claim["category"], number> => {
  const counts: Record<string, number> = {}
  for (const c of claims) {
    counts[c.category] = (counts[c.category] ?? 0) + 1
  }
  return counts as Record<Claim["category"], number>
}
