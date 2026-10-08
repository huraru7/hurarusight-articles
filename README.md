# hurarusight-articles

huraru.com の記事(Markdown と画像)を置くリポジトリです。サイトのコードは [hurarusight](https://github.com/huraru7/hurarusight) にあります。

## 記事の書き方

```bash
npm run new <記事名>   # ひな形を作る(記事名は半角の英小文字・数字・ハイフン)
npm run check          # frontmatter を検証する
```

- 記事は `articles/<記事名>.md` に置きます。**ファイル名がそのまま URL** になります(`/articles/<記事名>/`)。公開後に変えると URL が変わるので、最初に決めます。
- 画像は `images/<記事名>/` に置き、記事からは `/article-images/<記事名>/<ファイル名>` で参照します。

```yaml
---
title: 記事のタイトル
description: 検索結果やSNSに出る説明文(120字前後まで)
date: "2026-10-08"
status: draft          # draft / unlisted / published
tags: [サイト制作]
---
```

| status | 意味 |
|---|---|
| draft | 下書き。サイトの開発サーバーでは見えるが、公開サイトには出ない |
| unlisted | 一覧とサイトマップに出さず、検索にも載せない。URL を知っていれば読める |
| published | 公開 |

**注意**: このリポジトリは public なので、`draft` の記事も GitHub 上では誰でも読めます。公開前に隠したい内容は push しないでください。

## 書きながらサイトで確認する

サイトのリポジトリと同じ階層に、このリポジトリを置きます。

```
hurarusight\
  hurarusight-system\     ← サイトのコード(npm run dev をここで起動)
  hurarusight-articles\   ← このリポジトリ
```

サイト側で `npm run dev` を起動しておくと、このリポジトリの記事を編集するたびに、ブラウザの表示が更新されます。置き場所を変えたいときは、環境変数 `ARTICLES_DIR` にこのリポジトリのパスを指定します。

## 公開のしかた

`main` に push すると、GitHub Actions が検証(`npm run check`)をして、Cloudflare Pages の Deploy Hook を叩きます。1〜3分ほどで huraru.com に反映されます。

初回だけ、GitHub の Secrets に `CLOUDFLARE_DEPLOY_HOOK_URL`(Cloudflare Pages で発行した Deploy Hook の URL)の登録が必要です。
