---
title: HUGOでデザイン凝りたい？ならShortcode使おうぜ
slug: hugo-shortcode
date: 2020-10-11T23:00:58.777Z
description: HUGOで画像とか表とかなんか色々デザイン凝りたいけどマークダウン だけだと満足できない人のためのShortcode入門
tags:
  - HUGO
  - Shortcode
card: summary
---
HUGOで画像を入れる時みなさんはどうしていますか？  
多分ほとんどのマークダウン 方式になれた人は
``` markdown
![画像の名前](画像URL)
```  
みたいな感じで書いていると思います。ただそれって  
```html
<p><img src="hoge/hoge.png" alt="hoge"></p>
```  
というふうに出力されるんですよね。  
それってなんか**気持ち悪くないですか？**  
別に気にならないという方がいれば別にいいのですが、とても気持ち悪い感じがするんですよね。文章の中に画像。これの対処法をご紹介します。

## shortcodeの使い方
ということでとりあえず使い方の前に、shortcodeってなんやねんというお話から。shortcodeとは、  
{{< blockquote data_by="Shortcodes-Hugo" url="https://gohugo.io/content-management/shortcodes/" >}}
Hugo loves Markdown because of its simple content format, but there are times when Markdown falls short. Often, content authors are forced to add raw HTML (e.g., video &lt;iframe&gt; ’s) to Markdown content. We think this contradicts the beautiful simplicity of Markdown’s syntax. \n Hugo created shortcodes to circumvent these limitations.
{{< /blockquote >}}  

ということらしいです。いや英語わからねぇという人のために翻訳すると

{{< blockquote >}}
Hugoはmarkdownを使ってるけど、iframeとかの生のHTML入れたい時マークダウンの綺麗な形が損なわれるし、不便よな。Hugo動きます。
{{< /blockquote >}}

ということです。(もうこのネタ古いのかな？)生のHTMLを埋め込むのがダサいのでそれの改善策で作られたものみたいですね。これをうまく使って画像を表示しようということです。

## 画像を表示してみた
ということで、実際にコードを書いていきたいと思います。
まずは、Shortcodeを使うために必要なHTMLファイルを作りたいと思います。  
1. まず、layoutsディレクトリ内にshortcodesディレクトリを作成します。  
2. その中にshortcodeの名前にしたいHTMLファイルを作る 例)img.html twitter.htmlなど  
3. コードを書く  
ではどんなコードを書くのか。以下のコードをコピペしちゃってください。  

```html
<img
    src="{{ .Get `src` }}"
    {{ if .Get `alt` }}
        alt="{{ .Get `alt` }}"
    {{ end }}
    {{ if .Get `id` }}
        class="{{ .Get `id` }}"
    {{ end }}
    {{ if .Get `class` }}
        class="{{ .Get `class` }}"
    {{ end }}
/>
```

これで、imgにclassやidをつける事が可能になります。  
では、次にmarkdownにはどのように書くのか、上記の通常使用の場合は以下のコードを書くと実装できます。

```markdown
{{ < img id="" class="" src="" alt="" >}}
```

ここまでフルに入れなくてもいいという場合は

```markdown
{{ < img src="" alt="" >}}
```

こんな感じでいいと思います。ちなみに僕は以下のようにコードを変えています。

```html
<img
    {{ $type := .Get `type` }}
    {{ if eq $type "cfa" }}
        src="https://res.cloudinary.com/saladbowl/image/upload/f_auto/{{ .Get `src` }}"
    {{ else if  eq $type "cf" }}
        src="https://res.cloudinary.com/saladbowl/image/upload/{{ .Get `src` }}"
    {{ else if  eq $type "none" }}
        src="{{ .Get `src` }}"
    {{ else }}
        src="{{ .Get `src` }}"
    {{ end }}
        alt="{{ .Get `alt` }}"
    {{ if .Get `id` }}
        class="{{ .Get `id` }}"
    {{ end }}
    {{ if .Get `class` }}
        class="{{ .Get `class` }}"
    {{ end }}
/>
```

こんな感じにif文を使ってurlを短くする工夫をしています。このブログでははcloudinaryというサービスを使っているのでどうしてもurlが長くなってしまいます。ですので、共通の部分はできるだけ省けるようコードに書いています。

## 応用編 - YouTube埋め込み
という事で、少し応用をしてみたいと思います。  
YouTubeを埋め込んでみましょう。どうするのか、もうお分かりですね。shortcodesディレクトリ内にyoutube.htmlを作成し、中に以下の記述をします。  

```html
<iframe
	width="560"
	height="315"
	src="https://www.youtube.com/embed/{{ .Get `url` }}"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>
```

youtubeのurl (https://youtu.be/yaUxNp-fn-A)をコピーしてきて、 
 
```markdown
{{ < youtube url="yaUxNp-fn-A" >}}
```

こんな感じに記述をします。  
そうすると表示されます！

{{< youtube url="yaUxNp-fn-A" >}}

(昔作っていた、文字PVです。よかったらみてください。)  
もし、cssなど使ってデザインを凝りたい場合は、適宜htmlファイルを変更してくださいね。

{{< link_ogp url="/blog/2020/10/youtube-css/" txt="YouTubeのレスポンシブデザイン対応" >}}

記事も書いているので是非ご覧ください。