import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Re pseudo — 似非科学・陰謀論の主張検証",
    short_name: "Re pseudo",
    description:
      "似非科学・陰謀論・誤情報の主張を、根拠・出典・流布状況・よく使われる論法とともに整理する検証カタログ。",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#261b22",
    theme_color: "#3d2b34",
    lang: "ja",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}
