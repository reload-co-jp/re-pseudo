---
name: add-claim
description: Add a new structured claim entry to this Re pseudo Next.js dataset. Use when Codex is asked to add, register, create, or draft a new pseudoscience, conspiracy, misinformation, health, environment, technology, or finance claim in data/claims.json, including research-backed verification content, circulation history, spreaders/beneficiaries, tags, and source metadata that match the current types/claim.ts schema.
---

# Add Claim

## Workflow

1. Read `types/claim.ts`, `data/claims.json`, `lib/labels.ts`, and the relevant display component before editing. The schema may have changed.
2. Choose a stable lowercase hyphenated `id` that does not already exist.
3. Research the claim before writing factual assertions. Prefer primary or high-quality sources:
   - government/public-health agencies for health, environment, radiofrequency, food, and safety topics
   - peer-reviewed papers or systematic reviews for scientific claims
   - established fact-checkers only for origin/spread details, social-media claims, or when primary sources do not address the misinformation framing
4. Add exactly one object to `data/claims.json`; preserve valid JSON and nearby style.
5. Set `created_at` and `updated_at` to today's local date unless the user specifies otherwise.
6. Run validation:
   - `node -e "JSON.parse(require('fs').readFileSync('data/claims.json','utf8')); console.log('claims.json ok')"`
   - `pnpm build`

## Current Claim Shape

Use the current `Claim` type as source of truth. At the time this skill was written, each entry has:

```ts
{
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
  common_fallacies: { group: string; items: string[] }[]
  circulation: {
    first_seen: string
    spread_period: string
    spread_scope: string
    note: string
    spreaders?: string[]
    beneficiaries?: string[]
    source: { title: string; url: string }
  }
  sources: { title: string; url: string; type: "paper" | "government" | "article" | "other" }[]
  created_at: string
  updated_at: string
  tags: string[]
}
```

## Content Standards

- Write in Japanese to match the dataset.
- Keep `claim` as the strongest common formulation of the claim being checked.
- Keep `summary` concise: conclusion plus why it matters.
- Keep `explanation` factual and evidence-focused; do not moralize.
- Include 4 to 6 `sources` when feasible. Include at least one government or paper source for health/science claims.
- `circulation.source` should support the origin/spread narrative, not necessarily the scientific verdict.
- Use `spreaders` for groups or media channels that are documented as amplifying the claim. Avoid naming private individuals unless reputable sources do and the name is necessary.
- Use `beneficiaries` only when there is a plausible, documented benefit. Prefer cautious wording such as `受益しうる主体`. Do not imply intent without evidence.
- Use reusable fallacy group names where possible:
  - `因果の誤認`
  - `陰謀論的推論`
  - `情報の選択`
  - `証拠の扱い`
  - `自然・直感への訴え`
  - `不確実性の誤用`
  - `論点のすり替え`
  - `専門知への不信`
  - `心理的要因の見落とし`

## JSON Template

Adapt this template, then insert it in `data/claims.json`.

```json
{
  "id": "example-claim-id",
  "title": "表示用タイトル",
  "category": "health",
  "claim": "検証対象の主張を一文から二文で具体的に書く。",
  "verdict": "false",
  "confidence": "high",
  "risk_level": "medium",
  "summary": "判定の要点と実害・注意点を簡潔に書く。",
  "explanation": "主要な根拠、メカニズム、研究・公的見解を整理して説明する。",
  "why_it_spreads": [
    "広まりやすい心理的・社会的理由",
    "既存不安や不信との接続",
    "SNSや体験談で伝播しやすい要因"
  ],
  "common_fallacies": [
    {
      "group": "因果の誤認",
      "items": ["相関や時系列を因果として扱う"]
    }
  ],
  "circulation": {
    "first_seen": "確認できる初出・初期の起点。",
    "spread_period": "大きく流布した時期。",
    "spread_scope": "国・言語圏・コミュニティなどの範囲。",
    "note": "流布の文脈や注意点。",
    "spreaders": ["確認できる拡散主体"],
    "beneficiaries": ["受益しうる主体"],
    "source": {
      "title": "初出・流布状況を支える参照元",
      "url": "https://example.com"
    }
  },
  "sources": [
    {
      "title": "検証根拠のタイトル",
      "url": "https://example.com",
      "type": "government"
    }
  ],
  "created_at": "YYYY-MM-DD",
  "updated_at": "YYYY-MM-DD",
  "tags": ["タグ1", "タグ2"]
}
```

## Final Response

Report the added claim id, title, main sources used, and validation results. Mention if any origin, spreader, or beneficiary information was uncertain or intentionally omitted.
