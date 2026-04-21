import { FC } from "react"
import { Claim } from "types/claim"
import { MermaidDiagram } from "./MermaidDiagram"

function sanitize(text: string): string {
  return text.replace(/"/g, "'").replace(/[<>]/g, " ").replace(/\n/g, " ")
}

function buildDefinition(claim: Claim): string {
  const lines: string[] = ["flowchart LR"]

  lines.push(`  CLAIM(["${sanitize(claim.title)}"])`)
  lines.push("")

  // Fallacy groups → claim
  claim.common_fallacies.forEach((g, i) => {
    const id = `FG${i}`
    lines.push(`  ${id}["${sanitize(g.group)}"]`)
    lines.push(`  ${id} --> CLAIM`)
  })

  lines.push("")

  // Claim → spread reasons
  claim.why_it_spreads.forEach((reason, i) => {
    const id = `SP${i}`
    const short = reason.length > 30 ? reason.slice(0, 30) + "…" : reason
    lines.push(`  ${id}["${sanitize(short)}"]`)
    lines.push(`  CLAIM --> ${id}`)
  })

  lines.push("")
  lines.push("  style CLAIM fill:#3b2a24,stroke:#f6ad55,color:#f6ad55,font-weight:bold")
  claim.common_fallacies.forEach((_, i) => {
    lines.push(`  style FG${i} fill:#2d1a1a,stroke:#fc8181,color:#e2e8f0`)
  })
  claim.why_it_spreads.forEach((_, i) => {
    lines.push(`  style SP${i} fill:#1a2d1f,stroke:#68d391,color:#e2e8f0`)
  })

  return lines.join("\n")
}

export const ClaimDiagram: FC<{ claim: Claim }> = ({ claim }) => {
  const definition = buildDefinition(claim)
  return (
    <figure style={{ margin: 0 }}>
      <MermaidDiagram definition={definition} />
      <figcaption
        style={{
          color: "#718096",
          fontSize: ".75rem",
          marginTop: ".5rem",
          textAlign: "center",
        }}
      >
        左: 論法・誤謬　中央: 主張　右: 拡散する理由
      </figcaption>
    </figure>
  )
}
