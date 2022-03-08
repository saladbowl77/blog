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
---
今回はSvelteKitとNewtを使って30分以内に爆速でブログを開発していきます。

### SvelteKitとは
> SvelteKitは、あらゆる規模のWebアプリケーションを構築するためのフレームワークで、美しい開発体験と柔軟なファイルシステムベースのルーティングが特徴です。
> SvelteKitは、シングルページアプリケーションとは異なり、SEO、プログレッシブエンハンスメント、初期ロード体験に妥協はありません。しかし、従来のサーバーレンダリングのアプリとは異なり、ナビゲーションは瞬時に行われるため、アプリのような感覚で利用することが可能です。

[SvelteKitHP(https://kit.svelte.dev/)より引用し翻訳](https://kit.svelte.dev/)

### Newtとは
![HPスクリーンショット](/images/SvelteKit_Newt_Blog_1.png)
> 「Newt」は、APIベースでコンテンツ管理を行うことができるヘッドレスCMSです。Appを使って柔軟に管理画面を構築していくことによって、より快適で新しいコンテンツ管理体験を実現しています。サービススタート時は無料プランを提供、データ転送量や管理機能を強化した有料プランを準備中です。

[Newtプレスリリースより引用](https://prtimes.jp/main/html/rd/p/000000002.000095676.html)

## Newtの導入
### アカウント登録
[Newt公式サイト](https://www.newt.so/)から登録します。  
右上の無料で始めるボタンを押し メールアドレスとパスワードを登録します。

![登録画面](/images/SvelteKit_Newt_Blog_2.png)

入力が完了したらメールが送信されてきます。

![メールアドレス認証](/images/SvelteKit_Newt_Blog_3.png)

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

![スペースの作成](/images/SvelteKit_Newt_Blog_4.png)

新規作成をクリックします。

![スペースの作成](/images/SvelteKit_Newt_Blog_5.png)

スペース名には作るサイトの分かりやすい名前をつけてください。  
UIDは自分がわかりやすくかぶらないものを選んでください。

今回はApp名に"テストブログ" 、UIDに"test-blog"とつけました。  
このUIDは変更できません。

### Appの作成
次にAppを作っていきます。  
新規作成を選び作成します。

![App追加](/images/SvelteKit_Newt_Blog_6.png)

以下のようなポップアップが出てくるので、Appの名前とそのUIDを入力します。

![App追加](/images/SvelteKit_Newt_Blog_7.png)

今回はApp名をBlogにUIDをblogに設定しました。  
このUIDはのちに変更することができます。  
また、Appアイコンには最近はやりの絵文字を使うことができます。

### モデルの作成
次にモデルを新規作成します。  
モデルを追加を押すと以下のようなポップアップができます。

![モデルの新規作成](/images/SvelteKit_Newt_Blog_9.png)

モデル名は投稿する形式の名前を、モデルUIDには分かりやすい固有のIDを設定します。  
ラベルについては投稿時に以下の画像のようなページになるのですが、赤枠がラベル、青枠がラベル(複数形)という形になります。今回は両方ともに"投稿"を設定しました。

![ラベル](/images/SvelteKit_Newt_Blog_10.png)

(例えばラベルにPostと設定しラベル(複数形)にPostsを設定すれば赤枠内がPost青枠内がPostsのように表示に不自然さがなくなります。)

### フィードの追加
フィードを追加していきます。フィードとは投稿する内容を決めることができます。

![ラベル](/images/SvelteKit_Newt_Blog_11.png)

まず最初にタイトルとなるテキストフィードを設定します。これは必須です。  
その後自由にブログに追加したい要素を追加していきます。  
今回は以下のように設定しました。

![設定完了](/images/SvelteKit_Newt_Blog_12.png)

### 投稿を追加する
とりあえず一つだけ投稿を追加しておきます。

![トップ画面](/images/SvelteKit_Newt_Blog_13.png)

右上の投稿を追加から、追加します。

![ブログ投稿](/images/SvelteKit_Newt_Blog_14.png)

あとは先ほど設定した通りに自分の思うがまま文章を入力しましょう。

### Tokenの取得
APIからBlogを取得する場合はTokenを使います。

トップ画面に戻り右上のAPP名(今回はテストブログ)をクリックし

![スペース設定表示](/images/SvelteKit_Newt_Blog_15.png)

スペース設定をクリックします。

APIキーをクリックし

![スペース設定表示](/images/SvelteKit_Newt_Blog_16.png)

...をクリックし作成をクリックします。

生成されたトークンは後ほど使うのでコピーして何処かにメモをしておきましょう。