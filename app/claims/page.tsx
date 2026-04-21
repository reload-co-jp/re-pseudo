import { FC } from "react"
import ClaimsClient from "components/ClaimsClient"
import { getClaims } from "lib/claims"

export const metadata = {
  title: "一覧 — Re pseudo",
  description: "似非科学・陰謀論・誤情報の主張一覧。カテゴリ・判定・危険度でフィルタリングできます。",
}

const ClaimsPage: FC = () => {
  const claims = getClaims()

  return (
    <div>
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
        }}
      >
        主張一覧
      </h1>
      <ClaimsClient claims={claims} />
    </div>
  )
}

export default ClaimsPage
