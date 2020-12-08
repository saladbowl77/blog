---
title: NowPlayingをPythonでTweetする
slug: NowPlaying2Twitter_Python
date: 2020-12-08T08:07:57+09:00
description: YouTubeの埋め込みどうするんだっけってなった時見返す用のノート
tags:
  - Python
  - API
  - 音楽
  - Salad's Memo
card: summary_large_image
---
## 前置き
どうも、この前学校で体脂肪率測ったら6.8%だったけどこれがどうなのかよくわからないさらだぼぉるです。  
みなさん音楽って聞きますか？僕は音楽大好きですね。大体毎日1~2時間以上は聞きますね(学生なので聞く時間がないとか言えない)プログラミングしているときとか音楽は離せないという方も多いのではないでしょうか。  
そんな音楽ですが、Twitterなどで#NowPlayingというハッシュタグがあるのはご存知でしょうか?今聴いている曲を#をつけてツイートするというものなのですが、いちいちツイートするのめんどくないですか？何か作業しているのに#NowPlayingするためだけにTwitterに移動して投稿して、、、ということで、(Spotifyで)音楽を聴いているときに#NowPlayingをツイートしてくれる仕組みをPythonで作りました。

## spotipy と tweepy
ということで今回はspotifyの情報を取得したいのでspotipyを使ってデータを取得したいと思います。Tweetにはtweepyを使って簡単に実装しました。

今回使うPythonライブラリの一覧です。事前にインストールを済ませておいてください。

- dotenv ```pip install python-dotenv```
- spotipy ``` pip install spotipy```
- tweepy ```pip install tweepy```

まぁPythonを常用している人は何に使うのかは大体予想できると思いますが、使いながら説明していきたいと思います。

## NowPlayingの取得
とりあえずまず、Spotifyの現在再生している音楽を取得しないと話が始まりません。早速コードを書いていきましょう。
まず、SpotifyのDevelperサイトにアクセスしてCLIENT IDとCLIENT SECRET IDを取得します。
サイトにアクセスして、(過去に作ったのがあるので、一つありますが本来なら追加ボタンしかないはずです)MyNewAppをクリック

{{< img src="v1607381431/now%20playing%20tweet%20/Spotify1_uzpyx2" alt="SpotifyのDasbBoardページ" type="cfqa" >}}

アプリの名前と、説明を書いてCREATE

{{< img src="v1607381442/now%20playing%20tweet%20/Spotify2_fpj3j8" alt="SpotifyCreateAPP" type="cfqa" >}}

すると画像のようにClient ID が生成されます。(その下にあるボタンを押すとSecret IDが表示されます)

{{< img src="v1607381429/now%20playing%20tweet%20/Spotify3_ufoqnu" alt="ClientID生成成功" type="cfqa" >}}


### とりあえずコード書き書き
では実際にデータを取得していきましょう。


```python:.env
SPOTIFY_CLIENT_ID = XXXXXXXXXXXXXXXXXXXXXX
SPOTIFY_CLIENT_SECRET = XXXXXXXXXXXXXXXXXXXXXX
```

```python:main.py
from dotenv import load_dotenv
import os
import spotipy
import spotipy.util as util

#環境変数の設定
load_dotenv(verbose=True)
s_client_id = os.environ.get("SPOTIFY_CLIENT_ID")
s_client_secret = os.environ.get("SPOTIFY_CLIENT_SECRET")

#下に詳細
token = util.prompt_for_user_token(username="詳しくは↓", scope='user-read-currently-playing', client_id=s_client_id, client_secret=s_client_secret, redirect_uri="http://example.com")
spotify = spotipy.Spotify(auth=token)
current_track = spotify.current_user_playing_track()
print(current_track)
```

これでとりあえず、実行できます。```username```に関してですが、表示されている名前では通らないことがあります。SpotifyのHPのアカウントページから確認してください。

{{< img src="v1607381391/now%20playing%20tweet%20/Spotify4_gelrbf" alt="Spotifyのユーザー名画面" type="cfqa" >}}

(この画像のユーザー名をコピペしてください)

初回はwebページが開くのでそのページのURLをコピーしてください、
{{< img src="v1607382049/now%20playing%20tweet%20/Spotify5_gr8yhe" alt="Spotifyのアカウント確認画面" type="cfqa" >}}

### コードを詳しく解説

```python
token = util.prompt_for_user_token(
	username="HOGEHOGE",  #ユーザーネームを送信
	scope='user-read-currently-playing', #socope(どんな情報を得るか)の設定
	client_id=s_client_id, #Client IDの送信
	client_secret=s_client_secret, #Secret Client IDの送信
	redirect_uri="http://example.com" #リダイレクト先のURLを指定
)
spotify = spotipy.Spotify(auth=token) #tokenの認証
current_track = spotify.current_user_playing_track() #再生中の楽曲情報取得
print(current_track) #再生中の楽曲情報表示
```

```current_track```の中身についてはSpotifyのページ[Get the User's Currently Playing Track](https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/)に書いてあります。

## Tweeeeeeeet
では、現在再生中の楽曲は取得できたのでTweetをするコードを書いていきましょう。そのためにTwitterのAPIキーを取得する必要があります。

ではコード取得できたので.envとmain.pyに追記していきます。

```.env
TWITTER_APIKEY ="XXXXXXXXXXXXXXXXXXXXXX"
TWITTER_SECRET_APIKEY="XXXXXXXXXXXXXXXXXXXXXX"
TWITTER_ACCESSTOKEN="XXXXXXXXXXXXXXXXXXXXXX"
TWITTER_SECRET_ACCESSTOKEN ="XXXXXXXXXXXXXXXXXXXXXX"
```

```python:main.py
import tweepy
```

```python:main.py
t_api_key = os.environ["TWITTER_APIKEY"]
t_api_skey = os.environ["TWITTER_SECRET_APIKEY"]
t_token = os.environ["TWITTER_ACCESSTOKEN"]
t_s_token = os.environ["TWITTER_SECRET_ACCESSTOKEN"]
auth = tweepy.OAuthHandler(t_api_key, t_api_skey)
auth.set_access_token(t_token, t_s_token)
api = tweepy.API(auth)
```

```python:main.py
tweet = '曲名:' + current_track['item']['name']+'\n'\
            +'アーティスト:' + current_track['item']['artists'][0]['name']+'\n'\
            +'Spotify:' + current_track['item']['external_urls']['spotify']+'\n'\
            +'#NowPlaying'
api.update_status(tweet)
```

これでTweetができるはずです。
では一度全文を書いておきます。

```.env
SPOTIFY_CLIENT_ID = XXXXXXXXXXXXXXXXXXXXXX
SPOTIFY_CLIENT_SECRET = XXXXXXXXXXXXXXXXXXXXXX
TWITTER_APIKEY ="XXXXXXXXXXXXXXXXXXXXXX"
TWITTER_SECRET_APIKEY="XXXXXXXXXXXXXXXXXXXXXX"
TWITTER_ACCESSTOKEN="XXXXXXXXXXXXXXXXXXXXXX"
TWITTER_SECRET_ACCESSTOKEN ="XXXXXXXXXXXXXXXXXXXXXX"
```

```python:main.py
from dotenv import load_dotenv
import os
import spotipy
import spotipy.util as util
import tweepy

#環境変数の設定
load_dotenv(verbose=True)
s_client_id = os.environ.get("SPOTIFY_CLIENT_ID")
s_client_secret = os.environ.get("SPOTIFY_CLIENT_SECRET")
t_api_key = os.environ["TWITTER_APIKEY"]
t_api_skey = os.environ["TWITTER_SECRET_APIKEY"]
t_token = os.environ["TWITTER_ACCESSTOKEN"]
t_s_token = os.environ["TWITTER_SECRET_ACCESSTOKEN"]
auth = tweepy.OAuthHandler(t_api_key, t_api_skey)
auth.set_access_token(t_token, t_s_token)
api = tweepy.API(auth)

#取得＆Tweet
token = util.prompt_for_user_token(username="詳しくは↓", scope='user-read-currently-playing', client_id=s_client_id, client_secret=s_client_secret, redirect_uri="http://example.com")
spotify = spotipy.Spotify(auth=token)
current_track = spotify.current_user_playing_track()
print(current_track)
tweet = '曲名:' + current_track['item']['name']+'\n'\
            +'アーティスト:' + current_track['item']['artists'][0]['name']+'\n'\
            +'Spotify:' + current_track['item']['external_urls']['spotify']+'\n'\
            +'#NowPlaying'
api.update_status(tweet)
```
ツイートできましたか？  
これでよき#NowPlayingLifeをお過ごしください！  
以上さらだぼぉるでした。

## 参考
[TweepyでTwitterに投稿する](https://qiita.com/pontyo4/items/da8ba576c6281d67c0c7)