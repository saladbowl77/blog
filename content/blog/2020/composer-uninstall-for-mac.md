---
title: "[Mac向け]Composerをアンインストールする方法"
date: 2020-08-16T17:19:40+09:00
draft: false
tags: ["composer"]
description : "Composerを一回消してリセットしたい！そんな時どうすればいいのかmac向けに解説"
card : "summary_large_image"
---
## はじめに
今回はMacユーザー向けのComposerをアンインストールする方法を簡潔に紹介したいと思います。
## 方法
1. composerの入っているディレクトリを見つける
2. ディレクトリを削除する
3. 関連のファイルを一掃する
### composerの入っているディレクトリを見つける
composerの入っているディレクトリを見つけるにはとりあえず
```bash
which composer
```
とターミナルに打ち込みます。ターミナルは
```
アプリケーション -> ユーティリティー -> ターミナル.app
```
にあります。
そうして調べると
```bash
/usr/local/bin/composer
```
のようにディレクトリが出てくると思います。基本的にここにデータが保存されていると思います。
その入っている一つ前のディレクトリ。上の状況で言うと ```bin``` にあたるところへ移動します。
移動するには ```cd``` コマンドを使います。
```bash
cd /usr/local/bin
```
これで移動は完了です。
### ディレクトリを削除する
ディレクトリを削除するには本当に一発です。
```cd``` を使って移動した後に以下のコードを実行します
```bash
rm -r composer
```
これでcomposerのファイルを削除できました。
### 関連のファイルを一掃する
関連のファイルを削除します。Usersのところにあるデータを消します。
```bash
cd /Users/YourName
```
YourNameの部分には自分のユーザー名を入力してください。
移動をしたら試しにファイルがあるか確認してみましょう。```ls```を使うことでそのディレクトリに入っている物の一覧を出すことができます。
```bash
ls
-実行結果-
Applications	Library		Public
Desktop		Movies
Documents			Music
Downloads		Pictures
```
このように表示されると思います。一見何もないように見えます。ではオプションをつけて実行してみましょう。
```bash
ls -a
-実行結果-
.			.local			.zsh_history
..			.mono			Applications
.CFUserTextEncoding	.ms_openjdk_config	Desktop
.composer		.npm			Documents
.DS_Store	.nuget			Downloads
.IdentityService			.nuuid.ini		Library
.Trash		.oracle_jre_usage	Movies
.atom			.putty			Music
.bash_profile		.pyenv			Pictures
.config			.rbenv			Public
.cups			.ssh
.gem			.templateengine
.gitconfig		.vscode
```
こんな感じで最初に.(ドット)がついたファイルがたくさん出てくると思います。(人によって内容は違います)このドットから始まるものは知ってる人も多いと思いますが隠しファイルと呼ばれるもので一般には見えないファイルとなっています。この中に.composerと言うものがあると思いますのでそれを削除します。
先ほどと同じように```rm```を使います。
```bash
rm -r .composer
```
これでデータの削除は完了です！
お疲れ様でした
## まとめ
今回はcomposerの削除方法を書きました。簡単だったと思います。
そもそもそんな場面はないかもしれませんが誰かのお役に立てたなら幸いです。
それではさようならー
