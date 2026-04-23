"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  definition: string
}

async function renderMermaid(definition: string, id: string): Promise<string> {
  const mermaid = (await import("mermaid")).default
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    themeVariables: {
      background: "#1a1014",
      primaryColor: "#372630",
      primaryBorderColor: "#5a3d48",
      primaryTextColor: "#e2e8f0",
      secondaryColor: "#2d1f26",
      secondaryBorderColor: "#5a3d48",
      secondaryTextColor: "#cbd5e0",
      tertiaryColor: "#1a1014",
      tertiaryBorderColor: "#4a5568",
      tertiaryTextColor: "#a0aec0",
      lineColor: "#4a5568",
      edgeLabelBackground: "#1a1014",
      clusterBkg: "#2d1f26",
      clusterBorder: "#5a3d48",
      titleColor: "#e2e8f0",
      nodeBorder: "#5a3d48",
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      fontSize: "13px",
    },
    flowchart: {
      curve: "basis",
      padding: 16,
      nodeSpacing: 40,
      rankSpacing: 60,
    },
  })
  const { svg } = await mermaid.render(id, definition)
  return svg
}

function setSvgSize(el: HTMLDivElement, maxWidth: string) {
  const svgEl = el.querySelector("svg")
  if (svgEl) {
    svgEl.style.maxWidth = maxWidth
    svgEl.style.width = "100%"
    svgEl.style.height = "auto"
  }
}

export const MermaidDiagram = ({ definition }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [svg, setSvg] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const id = `mermaid-${Math.random().toString(36).slice(2)}`
    renderMermaid(definition, id).then((result) => {
      if (cancelled) return
      setSvg(result)
    })
    return () => {
      cancelled = true
    }
  }, [definition])

  useEffect(() => {
    if (svg && ref.current) {
      ref.current.innerHTML = svg
      setSvgSize(ref.current, "100%")
    }
  }, [svg])

  useEffect(() => {
    if (svg && open && modalRef.current) {
      modalRef.current.innerHTML = svg
      setSvgSize(modalRef.current, "100%")
    }
  }, [svg, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <button
        aria-label="相関図を拡大表示"
        onClick={() => setOpen(true)}
        style={{
          background: "none",
          border: "none",
          borderRadius: "4px",
          cursor: "zoom-in",
          display: "block",
          padding: 0,
          width: "100%",
        }}
        type="button"
      >
        <div
          ref={ref}
          style={{
            background: "#1a1014",
            borderRadius: "4px",
            minHeight: "120px",
            overflow: "hidden",
            padding: "1rem",
            pointerEvents: "none",
          }}
        />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="相関図拡大表示"
          style={{
            alignItems: "center",
            background: "rgba(0,0,0,.8)",
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            left: 0,
            position: "fixed",
            right: 0,
            top: 0,
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#1a1014",
              border: "1px solid #5a3d48",
              borderRadius: "6px",
              maxHeight: "90dvh",
              maxWidth: "95vw",
              overflow: "auto",
              padding: "1.5rem",
              position: "relative",
              width: "min(900px, 95vw)",
            }}
          >
            <button
              aria-label="閉じる"
              onClick={() => setOpen(false)}
              style={{
                background: "#372630",
                border: "1px solid #5a3d48",
                borderRadius: "50%",
                color: "#a0aec0",
                cursor: "pointer",
                fontSize: "1rem",
                height: "2rem",
                lineHeight: 1,
                position: "absolute",
                right: "1rem",
                top: "1rem",
                width: "2rem",
              }}
              type="button"
            >
              ×
            </button>
            <div ref={modalRef} style={{ paddingTop: ".25rem" }} />
          </div>
        </div>
      )}
    </>
  )
}
