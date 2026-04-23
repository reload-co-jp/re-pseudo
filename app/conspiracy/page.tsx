import Link from "next/link"
import { FC } from "react"
import { Card } from "components/elements/layout"

const BASE_URL = "https://re-pseudo.reload.co.jp"
const DESCRIPTION =
  "陰謀論の定義・特徴・なぜ広まるのかを解説。心理的メカニズムから社会的影響まで、陰謀論を理解するための基礎知識。"

export const metadata = {
  title: "陰謀論とは何か",
  description: DESCRIPTION,
  alternates: {
    canonical: `${BASE_URL}/conspiracy/`,
  },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/conspiracy/`,
    title: "陰謀論とは何か — Re pseudo",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "陰謀論とは何か — Re pseudo",
    description: DESCRIPTION,
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

const features = [
  {
    title: "悪意ある集団の存在を前提にする",
    description:
      "「権力者・政府・企業・秘密結社などが、意図的に人々を欺いている」という前提から出発する。事態の原因を偶発性や構造的問題ではなく、意志を持った悪意ある主体に帰属させる。",
    example: "「パンデミックは製薬会社が人口削減のために作った」",
  },
  {
    title: "証拠の非対称な扱い",
    description:
      "都合のよい証拠は採用し、矛盾する証拠は「隠蔽されている」「偽造されている」として排除する。反証が出るほど「さらに深い陰謀がある」と解釈し、主張が反証不可能になる。",
    example: "「ワクチンが安全だというデータは当局が改ざんしたものだ」",
  },
  {
    title: "パターンの過剰検出",
    description:
      "無関係な出来事を結びつけ、意味のあるパターンを見出す。人間には本来、ランダムな事象からでもパターンを読み取ろうとする認知傾向（アポフェニア）があり、陰謀論はこれを利用する。",
    example: "「飛行機雲の形が化学兵器散布の証拠だ」",
  },
  {
    title: "内輪と外部の二項対立",
    description:
      "「真実に気づいた者」と「騙されている大衆」を截然と区別する。この構造が帰属意識と使命感を生み、信奉者のコミュニティを強固にする。",
    example: "「目覚めた人間（awakened）だけが本当のことを知っている」",
  },
  {
    title: "既存の権威への不信",
    description:
      "主流メディア・政府機関・学術機関はすべて陰謀に加担しているとみなす。そのため、これらによる反論や否定は「陰謀の証拠」として逆に主張を強化する方向に働く。",
    example: "「WHOが否定するということは、逆に本当のことだということだ」",
  },
]

const psychFactors = [
  {
    title: "不確実性への不安",
    description:
      "複雑で予測不能な世界に対し、「悪意ある存在が操作している」という説明は、混乱に秩序と原因を与える。コントロールを失った感覚が強いほど陰謀論への傾倒が強まる傾向がある。",
  },
  {
    title: "独自知識による自尊感情",
    description:
      "「大衆には知られていない真実を自分だけが知っている」という感覚が自尊感情を満たす。これが情報の共有・伝達へのモチベーションになる。",
  },
  {
    title: "確証バイアス",
    description:
      "既に信じていることを支持する情報を優先的に処理し、矛盾する情報を軽視する。SNSのアルゴリズムによるエコーチェンバーがこれを強化する。",
  },
  {
    title: "代理人バイアス（エージェンシーの過剰帰属）",
    description:
      "無生物や偶然の出来事にも意図や意思を見出す傾向。「たまたまそうなった」より「誰かが意図してそうした」という説明を好む。",
  },
  {
    title: "社会的同調",
    description:
      "信頼する人物や所属コミュニティが信じている情報は、批判的検証なしに受け入れられやすい。特定の政治的・宗教的コミュニティ内での信念は強化される。",
  },
]

const harms = [
  {
    label: "公衆衛生",
    text: "ワクチン忌避、治療拒否、感染対策への不協力。実際の健康被害が生じる。",
    color: "#fc8181",
  },
  {
    label: "社会的分断",
    text: "「真実を知る者」と「騙された大衆」の対立構造が社会の信頼を損ない、民主的な議論を困難にする。",
    color: "#f6ad55",
  },
  {
    label: "暴力・差別",
    text: "特定の集団（政府・企業・民族・宗教）を陰謀の主体と名指しすることで、ヘイトクライムや実際の暴力につながる事例がある。",
    color: "#fc8181",
  },
  {
    label: "制度不信",
    text: "科学・司法・選挙・メディアへの根拠のない不信が蓄積し、民主主義の機能を損なう。",
    color: "#f6ad55",
  },
  {
    label: "経済的被害",
    text: "効果のない代替療法への支出、詐欺的な「真実の情報商材」への投資など、個人レベルの経済被害が生じる。",
    color: "#fefcbf",
  },
]

const warningSigns = [
  "「メインストリームメディアは報じない」という前置き",
  "「研究者たちは口を封じられている」という主張",
  "疑問を持つ人を「洗脳されている」と切り捨てる",
  "複数の無関係な出来事を一つの「計画」で説明する",
  "反証されるほど「さらに深い陰謀がある」と主張する",
  "「調べれば分かる」と言って一次ソースを示さない",
  "緊迫感・恐怖・怒りを煽る語り口",
]

const ConspiracyPage: FC = () => {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "陰謀論とは何か", item: `${BASE_URL}/conspiracy/` },
    ],
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "陰謀論とは何か",
    description: DESCRIPTION,
    url: `${BASE_URL}/conspiracy/`,
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
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700 }}>陰謀論とは何か</h1>
        <p style={bodyStyle}>
          陰謀論（Conspiracy Theory）は、ある出来事や状況の原因を、<strong style={{ color: "#e2e8f0" }}>秘密裏に行動する悪意ある集団の意図的な計画</strong>に帰属させる説明様式である。
          陰謀論の問題は「陰謀の存在を主張すること」ではなく、検証不可能な構造と証拠の非対称な扱いにある。
        </p>
        <p style={{ ...bodyStyle, color: "#718096", fontSize: ".875rem" }}>
          注意: 現実の歴史には実際の陰謀（政府の不正、企業の隠蔽工作など）が存在する。陰謀論的思考を批判することは「陰謀は存在しない」を主張するものではなく、<strong style={{ color: "#a0aec0" }}>検証不可能な説明様式</strong>を問題にするものである。
        </p>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={h2Style}>定義</h2>
        <Card style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
          <p style={bodyStyle}>
            研究者によって定義は異なるが、現代の認知科学・社会心理学では以下の要素を陰謀論の核心とする。
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: ".5rem", listStyle: "none", padding: 0 }}>
            {[
              "強力な集団が秘密裏に計画を実行しているという信念",
              "その集団は悪意を持ち、公益に反する目的で行動しているという前提",
              "公式の説明（政府・科学・メディア）は偽りまたは隠蔽であるという仮定",
              "証拠の有無にかかわらず信念が維持される閉じた認識論的構造",
            ].map((item) => (
              <li
                key={item}
                style={{
                  alignItems: "flex-start",
                  color: "#a0aec0",
                  display: "flex",
                  fontSize: ".875rem",
                  gap: ".5rem",
                  lineHeight: 1.7,
                }}
              >
                <span style={{ color: "#b794f4", flexShrink: 0 }}>◆</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ ...bodyStyle, color: "#718096", fontSize: ".8125rem" }}>
            出典: Brotherton (2015) "Suspicious Minds: Why We Believe Conspiracy Theories" / Sunstein & Vermeule (2009) "Conspiracy Theories"
          </p>
        </Card>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={h2Style}>陰謀論の5つの特徴</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
          {features.map((f, i) => (
            <Card key={f.title} style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: ".75rem" }}>
                <span style={{ color: "#b794f4", fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                <h3 style={h3Style}>{f.title}</h3>
              </div>
              <p style={bodyStyle}>{f.description}</p>
              <div
                style={{
                  backgroundColor: "#2d1f28",
                  borderLeft: "3px solid #5a3d48",
                  borderRadius: "0 4px 4px 0",
                  padding: ".6rem 1rem",
                }}
              >
                <p style={{ ...labelStyle, marginBottom: ".25rem" }}>典型例</p>
                <p style={{ ...bodyStyle, fontSize: ".875rem" }}>「{f.example}」</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={h2Style}>なぜ広まるのか — 心理的メカニズム</h2>
        <p style={{ ...bodyStyle, fontSize: ".875rem" }}>
          陰謀論を信じることは「無知」や「愚かさ」の問題ではない。人間の認知の仕組みそのものが、陰謀論的説明を魅力的にする。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
          {psychFactors.map((f) => (
            <Card key={f.title} style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <h3 style={h3Style}>{f.title}</h3>
              <p style={bodyStyle}>{f.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={h2Style}>社会的影響</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {harms.map((h) => (
            <div
              key={h.label}
              style={{
                borderLeft: `3px solid ${h.color}`,
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                padding: ".75rem 1rem",
                backgroundColor: "#2d1f28",
                borderRadius: "0 4px 4px 0",
              }}
            >
              <span
                style={{
                  backgroundColor: `${h.color}22`,
                  border: `1px solid ${h.color}`,
                  borderRadius: "2px",
                  color: h.color,
                  flexShrink: 0,
                  fontSize: ".75rem",
                  fontWeight: 700,
                  padding: "2px 8px",
                }}
              >
                {h.label}
              </span>
              <p style={{ ...bodyStyle, fontSize: ".875rem" }}>{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={h2Style}>陰謀論的コンテンツの警戒サイン</h2>
        <p style={{ ...bodyStyle, fontSize: ".875rem" }}>
          以下の表現や語り口が複数見られるとき、陰謀論的な情報構造である可能性が高い。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {warningSigns.map((sign, i) => (
            <div
              key={i}
              style={{
                alignItems: "flex-start",
                backgroundColor: "#372630",
                border: "1px solid #5a3d48",
                borderRadius: "4px",
                display: "flex",
                gap: ".75rem",
                padding: ".65rem 1rem",
              }}
            >
              <span style={{ color: "#d69e2e", flexShrink: 0, fontWeight: 700 }}>!</span>
              <p style={{ ...bodyStyle, fontSize: ".875rem" }}>{sign}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h2 style={h2Style}>陰謀論と疑似科学の関係</h2>
        <p style={bodyStyle}>
          陰謀論と疑似科学はしばしば結びついて現れる。疑似科学的な主張（「ワクチンは危険」「化学物質は毒だ」）が、それを否定する科学的コンセンサスへの不信から陰謀論的説明（「学会は製薬会社に買収されている」）へと接続される構造は典型的なパターンである。
        </p>
        <p style={bodyStyle}>
          共通するのは、<strong style={{ color: "#e2e8f0" }}>反証を受け付けない閉じた認識論的構造</strong>である。科学が「証拠によって更新される知識」を目指すのに対し、陰謀論・疑似科学はいかなる反証も「陰謀の証拠」として内部化する。
        </p>
        <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
          <Link
            href="/criteria/"
            style={{
              border: "1px solid #5a3d48",
              borderRadius: "4px",
              color: "#63b3ed",
              fontSize: ".875rem",
              padding: ".4rem .875rem",
              textDecoration: "none",
            }}
          >
            似非科学の判断基準 →
          </Link>
          <Link
            href="/fallacies/"
            style={{
              border: "1px solid #5a3d48",
              borderRadius: "4px",
              color: "#63b3ed",
              fontSize: ".875rem",
              padding: ".4rem .875rem",
              textDecoration: "none",
            }}
          >
            よくある誤謬 →
          </Link>
          <Link
            href="/claims/?category=conspiracy"
            style={{
              border: "1px solid #5a3d48",
              borderRadius: "4px",
              color: "#63b3ed",
              fontSize: ".875rem",
              padding: ".4rem .875rem",
              textDecoration: "none",
            }}
          >
            陰謀論カテゴリの主張一覧 →
          </Link>
        </div>
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        <h2 style={h2Style}>参考文献</h2>
        <ul style={{ display: "flex", flexDirection: "column", gap: ".35rem", listStyle: "none", padding: 0 }}>
          {[
            "Brotherton, R. (2015). Suspicious Minds: Why We Believe Conspiracy Theories. Bloomsbury Sigma.",
            "Sunstein, C. & Vermeule, A. (2009). Conspiracy Theories. Journal of Political Philosophy, 17(2), 202–227.",
            "van Prooijen, J-W. & Douglas, K. M. (2018). Conspiracy theories as part of history: The role of societal crisis situations. Memory Studies, 10(3), 323–333.",
            "Lewandowsky, S. et al. (2015). Reclaiming Cognition: The Case for Cognitive Science in the Study of Conspiracy Theories. Psychological Science in the Public Interest, 16(1), 1–38.",
            "Oliver, J. E. & Wood, T. J. (2014). Conspiracy Theories and the Paranoid Style(s) of Mass Opinion. American Journal of Political Science, 58(4), 952–966.",
          ].map((ref) => (
            <li key={ref} style={{ ...bodyStyle, color: "#718096", fontSize: ".8125rem" }}>
              {ref}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default ConspiracyPage
