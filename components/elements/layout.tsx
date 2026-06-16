import { ComponentProps, FC } from "react"

export const Title: FC<ComponentProps<"h1">> = ({
  style,
  children,
  ...props
}) => (
  <h1
    style={{ color: "var(--ink)", fontSize: "1rem", margin: 0, ...style }}
    {...props}
  >
    {children}
  </h1>
)

export const Badge: FC<{
  label: string
  color: string
  style?: React.CSSProperties
}> = ({ label, color, style }) => (
  <span
    style={{
      backgroundColor: `${color}22`,
      border: `1px solid ${color}`,
      borderRadius: "999px",
      color,
      display: "inline-block",
      fontSize: ".6875rem",
      fontWeight: 700,
      letterSpacing: ".04em",
      padding: "3px 9px",
      ...style,
    }}
  >
    {label}
  </span>
)

export const Card: FC<ComponentProps<"div">> = ({
  style,
  children,
  ...props
}) => (
  <div
    style={{
      background:
        "linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.015)), var(--panel)",
      border: "1px solid var(--border)",
      borderRadius: "8px",
      boxShadow: "0 12px 32px rgba(0,0,0,.18)",
      padding: "1.05rem",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
)
