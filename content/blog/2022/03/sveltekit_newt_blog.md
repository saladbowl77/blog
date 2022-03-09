---
title: SvelteKit + Newt で爆速ブログ開発
slug: SvelteKit_Newt_Blog
date: 2022-03-08T05:07:41.629Z
imgUrl: /images/20220306-shigovhack.png
description: Svelte KitとNewtという新しいCMSを使って爆速でBlogを作成します。
tags:
  - Salad's Memo
  - Svelte Kit
  - Newt
  - CMS
card: summary_large_image
draft: true
---
今回はSvelteKitとNewtを使って30分以内に爆速でブログを開発していきます。

### SvelteKitとは
> SvelteKitは、あらゆる規模のWebアプリケーションを構築するためのフレームワークで、美しい開発体験と柔軟なファイルシステムベースのルーティングが特徴です。
> SvelteKitは、シングルページアプリケーションとは異なり、SEO、プログレッシブエンハンスメント、初期ロード体験に妥協はありません。しかし、従来のサーバーレンダリングのアプリとは異なり、ナビゲーションは瞬時に行われるため、アプリのような感覚で利用することが可能です。

[SvelteKitHP](https://kit.svelte.dev/)より引用し翻訳

### Newtとは
![HPスクリーンショット](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_1.png)
>  「Newt」は、APIベースでコンテンツ管理を行うことができるヘッドレスCMSです。Appを使って柔軟に管理画面を構築していくことによって、より快適で新しいコンテンツ管理体験を実現しています。サービススタート時は無料プランを提供、データ転送量や管理機能を強化した有料プランを準備中です。

[Newtプレスリリース](https://prtimes.jp/main/html/rd/p/000000002.000095676.html)より引用

また無料枠が大きくデータ転送料は100FB/月までで、メンバー数、モデル数(API数)、コンテンツ数共に無制限となっています。メディアは1メディア当たり1メディアあたり50MBまでとのこと。

## Newtの導入
### アカウント登録
[Newt公式サイト](https://www.newt.so/)から登録します。  
右上の無料で始めるボタンを押し メールアドレスとパスワードを登録します。

![登録画面](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_2.png)

入力が完了したらメールが送信されてきます。

![メールアドレス認証](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_3.png)

リンクをクリックしメールアドレスの認証を完了させます。

### 投稿システムの構築
投稿システムは以下の4要素に分かれています。

- スペース
- App
- モデル
- UID

スペースというのはサイトを表します。  
Appというのは投稿の種類を表します。  
モデルというのは投稿の内容を表しています。  
UIDというのは上記の全てに自由に割り当てられるIDです。ただしこれは全てユニーク(重複しない)必要があります。

テキストだけでは分かりにくいと思うので、実際に作ってみていきます。

### スペースの作成
ログイン後現れるボタンから作成します。

![スペースの作成](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_4.png)

新規作成をクリックします。

![スペースの作成](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_5.png)

スペース名には作るサイトの分かりやすい名前をつけてください。  
UIDは自分がわかりやすくかぶらないものを選んでください。

今回はApp名に"テストブログ" 、UIDに"test-blog"とつけました。  
このUIDは変更できません。

### Appの作成
次にAppを作っていきます。  
新規作成を選び作成します。

![App追加](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_6.png)

以下のようなポップアップが出てくるので、Appの名前とそのUIDを入力します。

![App追加](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_7.png)

今回はApp名をBlogにUIDをblogに設定しました。  
このUIDはのちに変更することができます。  
また、Appアイコンには最近はやりの絵文字を使うことができます。

### モデルの作成
次にモデルを新規作成します。  
モデルを追加を押すと以下のようなポップアップができます。

![モデルの新規作成](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_9.png)

モデル名は投稿する形式の名前を、モデルUIDには分かりやすい固有のIDを設定します。  
ラベルについては投稿時に以下の画像のようなページになるのですが、赤枠がラベル、青枠がラベル(複数形)という形になります。今回は両方ともに"投稿"を設定しました。

![ラベル](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_10.png)

(例えばラベルにPostと設定しラベル(複数形)にPostsを設定すれば赤枠内がPost青枠内がPostsのように表示に不自然さがなくなります。)

### フィードの追加
フィードを追加していきます。フィードとは投稿する内容を決めることができます。

![ラベル](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_11.png)

まず最初にタイトルとなるテキストフィードを設定します。これは必須です。  
その後自由にブログに追加したい要素を追加していきます。  
今回は以下のように設定しました。

![設定完了](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_12.png)

### 投稿を追加する
とりあえず一つだけ投稿を追加しておきます。

![トップ画面](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_13.png)

右上の投稿を追加から、追加します。

![ブログ投稿](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_14.png)

あとは先ほど設定した通りに自分の思うがまま文章を入力しましょう。

### Tokenの取得
APIからBlogを取得する場合はTokenを使います。

トップ画面に戻り右上のAPP名(今回はテストブログ)をクリックし

![スペース設定表示](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_15.png)

スペース設定をクリックします。

APIキーをクリックし

![スペース設定表示](/images/SvelteKit_Newt_Blog/SvelteKit_Newt_Blog_16.png)

...をクリックし作成をクリックします。

生成されたトークンは後ほど使うのでコピーして何処かにメモをしておきましょう。

## SvelteKitでの実装
SvelteKitはNodejsが必要です。

### SvelteKitのインストール
npmがインストールされていれば以下のコマンドで一発です。

```shell
npm init svelte@next my-app
cd my-app
npm install
npm run dev
```

とりあえず、テンプレートはdemo appにしておいてください。  
最終的にほぼ全て消されますが...
```shell
? Which Svelte app template? › - Use arrow-keys. Return to submit.
❯   SvelteKit demo app
```

### ブログ一覧の作成(index.svelteの編集)
とりあえずここは記事一覧のページにします。  
なお、デザインに関しては最後にまとめてあるので参考にしたい方はそちらを参考にしてください。

まず記事を取得する方法です。  
ありがたいことにJavaScript SDKが配布されているのでそちらを使用します。

```shell
npm install newt-client-js
```

これで導入は完了です。

それではindex.svelteを編集していきます。  
とりあえず完成形を掲載し部分ごとに解説していきます。

```html
<script>
	import { createClient } from 'newt-client-js';

	const client = createClient({
		spaceUid: 'YOUR_SPACE_UID',
		token: 'YOUR_CDN_API_TOKEN',
		apiType: 'cdn'
	});
	let blogContents = [];
	client
		.getContents({
			appUid: 'YOUR_APP_UID',
			modelUid: 'YOUR_MODEL_UID'
		})
		.then((contents) => {
			blogContents = contents.items;
			console.log(blogContents);
			blogContents = blogContents;
		})
		.catch((err) => console.log(err));
</script>

<svelte:head>
	<title>トップページ - テストブログ</title>
</svelte:head>

<section>
	{#each blogContents as content}
		<li>
			<a href="/blog/{content._id}">
				{content.blogTitle}
			</a>
		</li>
	{/each}
</section>
```

#### script部分の解説
```js
import { createClient } from 'newt-client-js';
```

1行目でSDKをインポートしています。

```js
const client = createClient({
	spaceUid: 'YOUR_SPACE_UID',
	token: 'YOUR_CDN_API_TOKEN',
	apiType: 'cdn'
});
```

次に取得したいスペースの認証をします。

```js
let blogContents = [];
client
	.getContents({
		appUid: 'YOUR_APP_UID',
		modelUid: 'YOUR_MODEL_UID'
	})
	.then((contents) => {
		blogContents = contents.items;
		console.log(blogContents);
	})
	.catch((err) => console.log(err));
```

ここでスペース内のAppのモデルに入っている一覧を取得します。. getContentsのsを忘れずに！
その後通信が成功した場合変数"blogContents"に値が入ります。

#### html部分の解説
```html
{#each blogContents as content}
	<li>
		<a href="/blog/{content._id}">
			{content.blogTitle}
		</a>
	</li>
{/each}
```
ここでは単純にblogContentsに入っている内容を読み込んでループさせています。今回はブログの内容を"blog/id"という形で設定しました。

### ブログ記事ページの作成([_id].svelteの作成)
今回は先述した通りblog/idという形で記事を表示します。  
Svelteでは[_id].svelteといった形で値を受け渡しすることができます。  
今回は簡単にするために"/src/routes/"内にblogというディレクトリを作成し、その中に[_id].svelteを作成します。


```html
<script context="module">
    export async function load({ params }) {
        console.log(params._id)
        // TODOの取得
        return {
            props: { blogID: params._id }
        };
    }
</script>

<script>
    import { createClient } from 'newt-client-js';
    export let blogID;
    let blogContent = {
        "blogTitle" : "",
        "postDatetime" : "",
        "text" : ""
    };
    let blogTags = [];

	const client = createClient({
		spaceUid: 'YOUR_SPACE_UID',
		token: 'YOUR_CDN_API_TOKEN',
		apiType: 'cdn'
	});
	client
		.getContent({
			appUid: 'YOUR_APP_UID',
			modelUid: 'YOUR_MODEL_UID'
            		contentId: blogID
        })
        .then((content) => {
            blogContent = content;
            blogTags = blogContent.tags.split(',');
            blogTags = blogTags;
            console.log(blogContent)
        })
        .catch((err) => console.log(err));
</script>

<svelte:head>
	<title>{blogContent.blogTitle} - テストブログ</title>
	<meta property="og:description" content="{blogContent.summary}" />
</svelte:head>

<div id="blogTitleWrap">
    <h1>{blogContent.blogTitle}</h1>
    <p>{blogContent.postDatetime}</p>

    {#each blogTags as tag}
        #{tag}
    {/each}
</div>


<section>
    {@html blogContent.text}
</section>
```

script の前に```<script context="module">```というものがあります。  
これは[_id]内に当てはまる文字列を取得するするためのコードです。

```js
let blogContent = {
    "blogTitle" : "",
    "postDatetime" : "",
    "text" : ""
};
let blogTags = [];
```

そしてブログのコンテンツなどを入れる変数を宣言しておきます。あらかじめ{}内に書いておくことでUnderfindと表示されることを防ぎます。

中盤のAPIを接続する部分等は基本的に先ほどと同じです。  
しかし先ほどはcontent"s"だったのが今回はcontentになっています。また、新しく取得するcontentのIDも設定しています。

ここで少しポイント。  
タグを作るときに配列を入力するのがフィードの設定になかったのでテキストにしました。それをループさせるために配列に変えるのですが、ただ.split()をするだけではレンダリングがされません。  
そのような時は以下のコードのように同じ変数をもう一度宣言します。  

```js
.then((content) => {
    blogContent = content;
    blogTags = blogContent.tags.split(',');
    blogTags = blogTags;
    console.log(blogContent)
})
```

このようにすることでもう一度レンダリングをすることができます。

```html
<svelte:head>
	<title>{blogContent.blogTitle} - テストブログ</title>
	<meta property="og:description" content="{blogContent.summary}" />
</svelte:head>

<div id="blogTitleWrap">
    <h1>{blogContent.blogTitle}</h1>
    <p>{blogContent.postDatetime}</p>

    {#each blogTags as tag}
        #{tag}
    {/each}
</div>
<section>
    {@html blogContent.text}
</section>
```

ここはAPIから取得してきたデータを入れています。ただそれだけです。  
また、ブログの記事内はHTMLタグで書かれているため、@htmlを頭につけます。こうすることでサニタイズ処理がされなくなります。


## 完成
以上で完成です。お疲れ様でした。  
今回作成したサイトは以下のURLから確認することができます。  
構成はSvelte Kit + Newt + Vercelです。

[デモ](https://newt-blog-test.vercel.app/blog/62271edffa6d8a001832685b)

## CSSコピペ用
```css
html,
body, header, main, footer, section, div,
h1, h2, h3, h4, h5, h6,
p, a,
ul, ol, li {margin: 0; padding: 0; font-family: noto sans jp,sans-serif;}

h1, h2, h3, h4, h5, h6,
p, a {
	line-height: 1.5em;
}

img {
	width: 100%;
	max-width: 600px;
	display: block;
	margin: 0 auto;
}

header, main {
  display: block;
  margin: 0 auto;
  max-width: 900px;
}

header {
  width: 90%;
  padding: 5px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 .5rem 2rem rgba(0,0,0,.12);
}
header h1 {
  font-size: 1.4rem;
}
header h1 a {color: #121212; text-decoration: none;}
main {width: 90%;}

/* index.svelte */
ul li {
  list-style: none;
}
a {
  margin: 12px 0px;
  display: block;
  color: #2580c3;
}

/* [_id].svelte */
div#blogTitleWrap{
    margin: 0px 0 10px 0;
    border-bottom: 1px solid #121212;
    padding: 10px 0;
}

```