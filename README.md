# Re pseudo

似非科学・陰謀論の主張検証プラットフォーム

---

## 1. 概要

本サービスは、世の中で流通している似非科学・陰謀論・誤情報について、
「主張」「根拠」「検証結果」を構造化して提示するカタログ型Webサイトである。

単なる否定や批判ではなく、以下を目的とする：

- 情報の信頼性を判断するための材料提供
- 読者のリテラシー向上
- 誤情報による被害の予防（prebunking）

---

## 2. 技術構成

### フロントエンド

- Next.js（App Router）
- TypeScript

### データ管理

- JSON or Markdown（ローカルファイル）
- 将来的にCMS化可能

### 配信

- 静的エクスポート（output: export）
- GitHub Pages

---

## 3. データスキーマ

type Claim = {
id: string
title: string
category: "health" | "environment" | "conspiracy" | "technology" | "finance"
claim: string
verdict: "false" | "misleading" | "insufficient_evidence" | "partially_true" | "unverified"
confidence: "high" | "medium" | "low"
risk_level: "high" | "medium" | "low"
summary: string
explanation: string
why_it_spreads: string[]
common_fallacies: string[]
sources: {
title: string
url: string
type: "paper" | "government" | "article" | "other"
}[]
created_at: string
updated_at: string
tags: string[]
}

---

## 4. ページ構成

### トップ

- 注目記事
- 新着
- カテゴリ
- 検索

### 一覧

- フィルター（カテゴリ / 判定 / 危険度）
- カード表示

### 詳細

1. 主張
2. 判定
3. サマリー
4. 解説
5. 拡散理由
6. 論法
7. 出典

---

## 5. 編集ポリシー

- 人物ではなく主張を対象にする
- 出典必須
- 体験談は根拠にしない
- 扇動的表現禁止
