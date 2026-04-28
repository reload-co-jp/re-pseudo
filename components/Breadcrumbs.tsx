import Link from "next/link"
import { FC } from "react"

type BreadcrumbItem = {
  href?: string
  label: string
}

type Props = {
  items: BreadcrumbItem[]
}

const Breadcrumbs: FC<Props> = ({ items }) => (
  <nav aria-label="パンくず" style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
    {items.map((item, index) => {
      const isLast = index === items.length - 1

      return (
        <span
          key={`${item.label}-${index}`}
          style={{
            alignItems: "center",
            color: isLast ? "#cbd5e0" : "#718096",
            display: "inline-flex",
            fontSize: ".75rem",
            gap: ".5rem",
            lineHeight: 1.6,
          }}
        >
          {item.href && !isLast ? (
            <Link
              href={item.href}
              style={{ color: "#a0aec0", textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {!isLast ? <span style={{ color: "#5a3d48" }}>/</span> : null}
        </span>
      )
    })}
  </nav>
)

export default Breadcrumbs
