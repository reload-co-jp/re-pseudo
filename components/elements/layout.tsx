import { ComponentProps, FC } from "react"

export const Title: FC<ComponentProps<"h1">> = ({
  style,
  children,
  ...props
}) => (
  <h1 style={{ fontSize: "1rem", margin: 0, ...style }} {...props}>
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
      borderRadius: "4px",
      color,
      display: "inline-block",
      fontSize: ".75rem",
      fontWeight: 600,
      padding: "2px 8px",
      ...style,
    }}
  >
    {label}
  </span>
)

export const Card: FC<ComponentProps<"div">> = ({ style, children, ...props }) => (
  <div
    style={{
      backgroundColor: "#372630",
      border: "1px solid #5a3d48",
      borderRadius: "8px",
      padding: "1rem",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
)
