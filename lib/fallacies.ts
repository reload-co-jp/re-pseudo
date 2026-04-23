import { getClaims } from "lib/claims"

export type FallacyGroup = {
  name: string
  count: number
  claims: {
    id: string
    title: string
    items: string[]
  }[]
}

export const getFallacyGroups = (): FallacyGroup[] => {
  const claims = getClaims()
  const map = new Map<string, FallacyGroup>()

  for (const claim of claims) {
    for (const f of claim.common_fallacies) {
      const existing = map.get(f.group)
      if (existing) {
        existing.claims.push({ id: claim.id, title: claim.title, items: f.items })
        existing.count++
      } else {
        map.set(f.group, {
          name: f.group,
          count: 1,
          claims: [{ id: claim.id, title: claim.title, items: f.items }],
        })
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => b.count - a.count)
}
