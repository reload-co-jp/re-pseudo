import { FC } from "react"
import { Card } from "components/elements/layout"

const BASE_URL = "https://re-pseudo.reload.co.jp"
const DESCRIPTION =
  "似非科学を見分けるための基準を、反証可能性・査読・再現性・科学的コンセンサスの観点から解説。ポパーの基準からチェックリストまで。"

export const metadata = {
  title: "似非科学の判断基準",
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/criteria/`,
  },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/criteria/`,
    title: "似非科学の判断基準 — Re pseudo",
    description: DESCRIPTION,
    images: [{ url: "/logo.svg", width: 220, height: 56, alt: "Re pseudo" }],
  },
  twitter: {
    card: "summary",
    title: "似非科学の判断基準 — Re pseudo",
    description: DESCRIPTION,
    images: ["/logo.svg"],
  },
}

const h2Style: React.CSSProperties = {
  borderBottom: "1px solid #5a3d48",
  fontSize: "1rem",
  fontWeight: 700,
  marginBottom: "1rem",
  paddingBottom: ".5rem",
}

const h3Style: React.CSSProperties = {
  color: "#e2e8f0",
  fontSize: ".9375rem",
  fontWeight: 700,
  marginBottom: ".5rem",
}

const bodyStyle: React.CSSProperties = {
  color: "#a0aec0",
  fontSize: ".9375rem",
  lineHeight: 1.9,
}

const labelStyle: React.CSSProperties = {
  color: "#718096",
  fontSize: ".75rem",
  fontWeight: 600,
  letterSpacing: ".05em",
  textTransform: "uppercase",
}

const criteria = [
  {
    id: "falsifiability",
    title: "反証可能性",
    subtitle: "Falsifiability",
    description:
      "「その主張が間違っていると示すには、どんな証拠が必要か」を明示できるか。反証できる可能性がない主張は科学的検証の対象にならない。",
    science: "仮説から予測を導き、その予測が外れたら仮説を修正・棄却する。",
    pseudo: "どんな反証が出ても「例外だ」「測定が間違っている」と退け、主張を変えない。",
    example: "「同質療法は効かないという研究は製薬会社が資金提供しているから無効」",
    origin: "カール・ポパー（1934年）が提唱した科学的知識の境界基準。",
  },
  {
    id: "reproducibility",
    title: "再現性",
    subtitle: "Reproducibility",
    description:
      "同じ条件で実験・観察を繰り返したとき、独立した第三者が同じ結果を得られるか。一度だけの観察や特定の研究者にしか再現できない結果は信頼性が低い。",
    science: "プロトコルを公開し、別の研究機関が追試して同じ結果を確認する。",
    pseudo: "発見者本人か信奉者しか再現できず、懐疑的な研究者による追試が失敗する。",
    example: "「超能力を測定した実験は、信者が立ち会わないと成功しない」",
    origin: "科学哲学・実験科学の根本規範。再現性の危機（Replication Crisis）として現在も議論継続中。",
  },
  {
    id: "peer-review",
    title: "査読と公開",
    subtitle: "Peer Review & Openness",
    description:
      "主張の根拠となるデータ・方法論・結論が、専門家による査読を経て公開されているか。非公開データや「企業秘密」に隠れた主張は検証できない。",
    science: "生データ・分析コード・方法論を公開し、査読者が独立に評価する。",
    pseudo: "「詳細は有料セミナーで」「特許申請中で公開できない」として検証を拒否する。",
    example: "「波動水の効果は独自の測定装置でしか検出できず、装置の仕様は非公開」",
    origin: "17世紀の王立協会設立以来、科学の標準的な知識伝達・検証プロセス。",
  },
  {
    id: "consensus",
    title: "科学的コンセンサス",
    subtitle: "Scientific Consensus",
    description:
      "その分野の専門家集団の総体的な合意と整合しているか。コンセンサスに反する主張は否定されるわけではないが、より高い証明責任を負う。",
    science: "既存の知識体系と整合し、反証する場合は強力な証拠と方法論的厳密さが必要。",
    pseudo: "「主流派は間違っている」と主張しながら、代替説明の証拠を示さない。あるいは少数派研究者を「学会から弾圧されている天才」と描く。",
    example: "「ワクチンと自閉症の関係を示した論文は撤回されたが、真実を隠すための圧力だ」",
    origin: "トーマス・クーン『科学革命の構造』（1962年）が科学的パラダイムとその変化を体系化。",
  },
  {
    id: "effect-size",
    title: "効果量と統計的妥当性",
    subtitle: "Effect Size & Statistical Validity",
    description:
      "測定された効果が統計的に意味のある大きさか。p値だけを根拠にした主張や、サンプルサイズが極端に小さい研究は信頼性が低い。",
    science: "事前登録した仮説、適切なサンプルサイズ、効果量・信頼区間を報告する。",
    pseudo: "p値ハッキング（有意な結果が出るまで分析を繰り返す）や、外れ値を除外して都合のよい結果だけを報告する。",
    example: "「20人の実験でp=0.049が出た。この療法は有効だ」",
    origin: "統計的仮説検定の誤用問題は1950年代から指摘され、現在は事前登録・オープンサイエンスが推奨される。",
  },
  {
    id: "mechanism",
    title: "メカニズムの説明",
    subtitle: "Plausible Mechanism",
    description:
      "主張された効果が、既知の物理・化学・生物学的原理と整合したメカニズムで説明できるか。既存の原理に反するなら、それを覆す強力な証拠が必要。",
    science: "分子・細胞・器官レベルで作用機序を説明し、それを実験的に確認する。",
    pseudo: "「量子エネルギー」「波動」など、物理学の用語を借用するが定義が曖昧で測定できない。",
    example: "「磁気ブレスレットが体内の電磁バランスを整える」（測定方法も作用機序も未定義）",
    origin: "ベルの定理・プランクの量子論など、既存の物理法則を覆す主張には特に厳密な証明が求められる。",
  },
]

const checklist = [
  { q: "反証できる可能性はあるか？", bad: "「どんな証拠が出ても信じる」は科学ではない" },
  { q: "独立した第三者による再現実験はあるか？", bad: "信奉者のみ再現できる結果は信頼できない" },
  { q: "査読済みの論文や公開データがあるか？", bad: "「専門家に見せると盗まれる」は検証拒否" },
  { q: "主流の専門家コミュニティはどう評価しているか？", bad: "「弾圧された天才」の語りは要注意" },
  { q: "効果量は十分か、統計処理は適切か？", bad: "p値だけ・少数例・事後選択は信頼できない" },
  { q: "作用メカニズムは既知の原理と整合するか？", bad: "定義不明の「波動・量子・エネルギー」は曖昧語" },
  { q: "研究資金・利益相反は開示されているか？", bad: "資金源を隠す研究は独立性を疑う" },
]

const CriteriaPage: FC = () => {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "似非科学の判断基準", item: `${BASE_URL}/criteria/` },
    ],
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "似非科学の判断基準",
    description: DESCRIPTION,
    url: `${BASE_URL}/criteria/`,
    inLanguage: "ja",
    publisher: {
      "@type": "Organization",
      name: "Re pseudo",
      url: BASE_URL,
    },
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} type="application/ld+json" />

      <header style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700 }}>似非科学の判断基準</h1>
        <p style={bodyStyle}>
          「科学」と「似非科学」を分ける境界は、単純な正誤ではなく<strong style={{ color: "#e2e8f0" }}>検証可能性・透明性・反証への態度</strong>にある。
          以下の基準は、ある主張が科学的方法論に沿っているかを評価するための参照点であり、一つの基準だけで決定するものではない。
        </p>
        <p style={{ ...bodyStyle, color: "#718096", fontSize: ".875rem" }}>
          注意: これらの基準は「その主張は間違いか」を判定するためではなく、「その主張はどの程度信頼できる根拠に基づいているか」を問うための枠組みである。
        </p>
      </header>

      <nav style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
        {criteria.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            style={{
              backgroundColor: "#372630",
              border: "1px solid #5a3d48",
              borderRadius: "4px",
              color: "#e2e8f0",
              fontSize: ".8125rem",
              padding: ".3rem .75rem",
              textDecoration: "none",
            }}
          >
            {c.title}
          </a>
        ))}
      </nav>

      <section style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h2 style={h2Style}>6つの判断基準</h2>
        {criteria.map((c) => (
          <Card
            id={c.id}
            key={c.id}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: ".75rem", flexWrap: "wrap" }}>
              <h3 style={h3Style}>{c.title}</h3>
              <span style={labelStyle}>{c.subtitle}</span>
            </div>

            <p style={bodyStyle}>{c.description}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <div style={{ display: "flex", gap: ".75rem", alignItems: "flex-start" }}>
                <span style={{ color: "#68d391", flexShrink: 0, fontSize: ".8125rem", fontWeight: 700, marginTop: ".1em" }}>科学</span>
                <p style={{ ...bodyStyle, fontSize: ".875rem" }}>{c.science}</p>
              </div>
              <div style={{ display: "flex", gap: ".75rem", alignItems: "flex-start" }}>
                <span style={{ color: "#fc8181", flexShrink: 0, fontSize: ".8125rem", fontWeight: 700, marginTop: ".1em" }}>似非</span>
                <p style={{ ...bodyStyle, fontSize: ".875rem" }}>{c.pseudo}</p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#2d1f28",
                borderLeft: "3px solid #5a3d48",
                borderRadius: "0 4px 4px 0",
                padding: ".75rem 1rem",
              }}
            >
              <p style={{ ...labelStyle, marginBottom: ".35rem" }}>典型例</p>
              <p style={{ ...bodyStyle, fontSize: ".875rem" }}>「{c.example}」</p>
            </div>

            <p style={{ ...bodyStyle, color: "#718096", fontSize: ".8125rem" }}>
              <strong style={{ color: "#a0aec0" }}>背景: </strong>{c.origin}
            </p>
          </Card>
        ))}
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={h2Style}>実践チェックリスト</h2>
        <p style={{ ...bodyStyle, fontSize: ".875rem" }}>
          情報に接したとき、以下を自問する。「いいえ」が多いほど、その主張の科学的信頼性は低い。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
          {checklist.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#372630",
                border: "1px solid #5a3d48",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                gap: ".35rem",
                padding: ".75rem 1rem",
              }}
            >
              <div style={{ display: "flex", gap: ".75rem", alignItems: "baseline" }}>
                <span style={{ color: "#d69e2e", flexShrink: 0, fontWeight: 700 }}>{i + 1}</span>
                <p style={{ color: "#e2e8f0", fontSize: ".875rem", fontWeight: 600 }}>{item.q}</p>
              </div>
              <p style={{ ...bodyStyle, color: "#718096", fontSize: ".8125rem", paddingLeft: "1.375rem" }}>
                {item.bad}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={h2Style}>「なぜ基準が必要か」という問い</h2>
        <p style={bodyStyle}>
          科学と似非科学の境界問題（Demarcation Problem）はカール・ポパーが提起し、現在も科学哲学の未解決問題である。
          単一の基準で白黒をつけることはできないが、「検証を拒否する主張」「反証されても修正されない主張」は知識の積み上げに貢献しない。
        </p>
        <p style={bodyStyle}>
          このサイトが提示する判断基準は、ある主張を即座に「偽」と断定するためではなく、
          <strong style={{ color: "#e2e8f0" }}>「どこを確認すれば信頼できるか」を問うための出発点</strong>として使われることを意図している。
        </p>
        <p style={{ ...bodyStyle, color: "#718096", fontSize: ".875rem" }}>
          参考文献: Karl Popper, "The Logic of Scientific Discovery" (1934/1959) / Thomas Kuhn, "The Structure of Scientific Revolutions" (1962) / Imre Lakatos, "The Methodology of Scientific Research Programmes" (1978) / Robert Park, "Voodoo Science" (2000)
        </p>
      </section>
    </div>
  )
}

export default CriteriaPage
