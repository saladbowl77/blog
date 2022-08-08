---
title: Firefoxのアドオン作ってみた→Firefox派生に組み込んでみた。
slug: firefox-addon
date: 2022-08-08T08:53:20.242Z
imgUrl: /images/default.png
description: Firefoxのアドオンを作って実際に組み込んでみた。
tags:
  - Firefox
  - salad's memo
card: summary
---
時は2022年。URLとサイトのタイトル取得に悩んでいる学生がいた...

学生「いちいちサイトのタイトル取得するのにデベロッパーツールでtitleタグとってurl取得するのめんどくさいな...」  
？？「そなた、Firefox使っておるのならアドオンを作るのじゃ」  
学生「あ、アドオン!?ところであなたは...」  
？？「名乗るほどのものでもない。ほれ、このサイトを参考にしながら作ってみるのじゃ」

ということで、アドオンを作っていきます。  
アドオンを作る際は最低以下のものが必要になります。

- manifest.json
- JavaScriptファイル

以上です。簡単でしょ?

そして今回は以下のファイル構成で作成します。
```bash
copyUrl
- manifest.json
- include.js
```

## JavaScriptコードを書いてくよ

コード書いていきます。
```js
browser.menus.create({
    id: "cp_title_url",
    title: "Copy of Site Title and URL",
    contexts: ["all"]
})

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text)
        console.log('コピーしました')
    } catch (error) {
        console.log((error && error.message) || 'コピーに失敗しました')
    }
}

browser.menus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == 'cp_title_url') copyToClipboard(tab.title + " / " + tab.url);
});
```

簡単に解説していきます。

`browser.menus.create`で右クリック時に出てくるメニューに追加することができます。  

`copyToClipboard()`はクリップボードコピー用の関数です。  
navigator.clipboard.writeText()で実際にクリップボードにコピーすることができます。  

`browser.menus.onClicked.addListene`これは右クリックメニューがクリックされた時のイベントハンドラです。  
info.menuItemIdでどれがクリックされたかを確認しています。

## manifest.json
とてもハマります。  
さらにしっかりと権限を設定しないとJavaScriptが動かなくなります。

```json
{
	"manifest_version": 2,
	"name": "アドオン名",
	"description": "アドオンの説明",
	"version": "1.0",
	"icons": {
		本当はアイコン設定したほうがいいんだけども今回は作るのめんどくさいので割愛
	},
	"applications": {
		"gecko": {
			"id": "hogehoge@example.com"
		}
	},
	"permissions": [
        	"<all_urls>",
		"clipboardWrite",
		"menus",
        	"tabs"
	],
	"background": {
		"scripts": [
			"include.js"
		]
	},
	"content_scripts": [
		{
			"matches": [
				"http://*/*",
				"https://*/*"
			]
		}
	]
}
```

一番大切なのは、`permissions`ここです。  
ここでしっかりと権限を与えないと使えません。しっかり`clipboardWrite`(クリップボードへのコピー)、`menus `(右クリックメニュー )、`tabs `(タブ情報へのアクセス権限)を与えてください。

## 実際に動作確認してみる。
実際に動作確認してみます。  

[Debugging - Runtime / this-firefox](about:debugging#/runtime/this-firefox)

Firefoxでここにアクセスしてください。一時的なアドオンを追加するをクリックし追加してください。
これで正しくできていればURLとtitleが取得できるはずです。

## 休憩
学生「うわあ。すごい。これでコピペが楽になる。神様ありがとう!!」  
？？「わしは神様などではない。ただの一般人だ」  
学生「神様、それはそうと毎回一時的なアドオンに追加するのめんどくさいよ。どうせなら僕だけのブラウザ作りたい!!!」  
？？「面倒なやつだな。仕方ない、firefox本体に組み込む方法を教えてやろう。」  
学生「やったー。僕Floorp使ってるんだけどFloorpでできたらいいな!!」  
？？「ちょうど良い。日本の学生が作っているのもあって親近感も湧くじゃろ。ほれ、やり方だ」

## Floorpに組み込んでみる
### まずはビルドしてみる
厄介なことを言い出した学生さんですね....  
実際に組み込んでみましょう。

まずFloorpのビルドしてみます。

[Floorp-Projects/Floorp](https://github.com/Floorp-Projects/Floorp)

こちらからFloorpをCloneしてきてください。  
そしてこのページ通りにビルドしてください。

[Floorp/workflow.md at upstream_102.0.1esr · Floorp-Projects/Floorp · GitHub](https://github.com/Floorp-Projects/Floorp/blob/upstream_102.0.1esr/.github/workflow.md)

### 実際に組み込んでみる
実際に組み込んでみます。以下のディレクトリに先ほど作ったcopyUrlのディレクトリをぶち込みます。

`Floorp/browser/extensions/`

そして新しく`moz.build`というファイルを生成します。僕も書き方はよく分からないので他のものと照らし合わせながら作りました。

```build
DEFINES["MOZ_APP_VERSION"] = CONFIG["MOZ_APP_VERSION"]
DEFINES["MOZ_APP_MAXVERSION"] = CONFIG["MOZ_APP_MAXVERSION"]


FINAL_TARGET_FILES.features["hogehoge@example.com"] += [
    "include.js",
    "manifest.json",
]

with Files("**"):
    BUG_COMPONENT = ("Firefox", "copyUrl")
```

とりあえずこんな感じで書きました。

保存してビルドします。

`much run`したら組み込まれたFloorpができるはずです。


## まとめ
学生「うをおおおおお。できたああ。これで楽になる。ありがとう仙人!!」  
？？「だからわしは神様でも仙人でもないと言っとるじゃろ」  
学生「Floorpすごいなぁ。こんなの作ってみたいし、中の人と話してみたいなぁ」  
？？「そんな時は、[Ablaze Community](https://discord.com/invite/NCYYwx2Enn)に入ってみるのじゃ。開発者の人が話してたりするぞ。」  
学生「え!入ってみます!!!」


ということで今回はアドオンを作ってFloorpに組み込んでみました。  
意外にも簡単にできたのでカスタマイズしたい人ぜひ取り組んでみては?