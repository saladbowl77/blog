---
title: faviconを取得する方法
slug: gat-favicon-from-google
date: 2020-10-20T11:00:58.980Z
description: サイトに外部サイトのfaviconを入れたい！そんな時の便利な方法
tags:
  - Salad's memo
  - google
card: summary
---
favicon取得したい時毎回リンク探ってとか、保存したりするのめんどくさいですよね。  
そんな時便利なリンクがあるんです。
## コード
```html
https://www.google.com/s2/favicons?domain=[URL]
```
これです。  
例えば僕のブログでやると


```html
<img
	src="https://www.google.com/s2/favicons?domain=https://blog.saladbowl.work/"
	alt="さらいふのアイコン"
/>
```

になります。
それを表示すると、

{{<img src='<img src="https://www.google.com/s2/favicons?domain=https://blog.saladbowl.work/"alt="さらいふのアイコン"/>' >}}

***ちっさ***

まぁfaviconですから。小さいのは仕方ないです。

まぁそんな感じでいけます。  
何でもかんでも取って使っていいかと言われると少し微妙ですが、自己紹介とかで使うのはいかがでしょうか？  
以上salad's Memoでした！