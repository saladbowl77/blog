---
title: NetlifyCMSで日本語の文章を正しく入力する方法
slug: netlifycms_japanese
date: 2021-04-04T14:39:06.439Z
description: NetlifyCMSで日本語を入力すると文字がロールバックしたりするという場合の対処法！
tags:
  - "#Netlify"
  - "#NetlifyCMS"
  - "#CMS"
card: summary_large_image
---
NetlifyCMSで本文を入力している時なぜか文字が戻ったりして正しく入力できないということがありませんか？
その対処法です

```toml
{label: "本文", name: "body", widget: "markdown"}

```

を

```toml
{label: "本文", name: "body", widget: "text"}
```

に変えるだけです。
ただし、プレビュー画面ではMDで表示されないので注意