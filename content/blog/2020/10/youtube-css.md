---
title: YouTubeの埋め込みの時のレスポンシブデザインCSSメモ
slug: youtube-css
date: 2020-10-10T23:00:58.777Z
description: YouTubeの埋め込みどうするんだっけってなった時見返す用のノート
tags:
  - YouTube
  - CSS
  - Salad's Memo
card: summary_large_image
---
YouTubeの埋め込みって固定サイズですよね。  
それをレスポンシブデザイン対応にする、小技のめも。
```html
<div class="youtube">
    <iframe
        src="https://www.youtube.com/embed/yaUxNp-fn-A"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
</div>
```

```css
.youtube {
    position: relative;
    width: 100%;
    max-width: 704px;
    max-height: 396px;
    padding-top: 56.25%;
    display: block;
    margin: 0 auto;
}
.youtube iframe {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
}
```

最大幅については、{{< link url="https://blog.phantom4.org/archives/300" txt="4:3、16:9のサイズ一覧 / phantom4 JavaScriptなどのフロントエンド開発メモ">}}を参考

実装結果

{{< youtube url="yaUxNp-fn-A" >}}

これはshortcodeを使って埋め込み実装をしています。

{{< link_ogp url="/blog/2020/10/hugo-shortcode" txt="HUGOでデザイン凝りたい？ならShortcode使おうぜ">}} 

につかいかたをのせています。ぜひそちらもごらんください