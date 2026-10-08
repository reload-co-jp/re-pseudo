"use client"

import { usePathname } from "next/navigation"
import { FC, useEffect } from "react"

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

const AdSlot: FC = () => {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [])

  return (
    <ins
      className="adsbygoogle"
      data-ad-client="ca-pub-6542845006087970"
      data-ad-format="auto"
      data-ad-slot="4829146611"
      data-full-width-responsive="true"
      style={{ display: "block", marginTop: "2.5rem" }}
    />
  )
}

// 共通ディスプレイ: ページ遷移ごとに再マウントして広告を再読み込み
const DisplayAd: FC = () => <AdSlot key={usePathname()} />

export default DisplayAd
