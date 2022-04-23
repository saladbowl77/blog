---
title: arm64のubuntuにchromium, chromedriverを入れる方法
slug: arm64-install-chromium-chromedriver
date: 2022-04-23T02:58:47.911Z
imgUrl: /images/default.png
description: "arm64系(RK3568)のsocでchromedriverを使おうとしたら戸惑ったのでメモ。  "
tags:
  - chromedriver
  - arm64
  - python
  - ubuntu
  - chromium
card: summary
---
arm64系(RK3568)のsocでchromedriverを使おうとしたら戸惑ったのでメモ。  
実機がないので試してないが、同じ手順でarm64以外のamd64,armhf,i386系でもできると思われる。(依存関係については実機がないので未検証。)

## 各種ダウンロード
[開発リポジトリ](https://launchpad.net/~canonical-chromium-builds/+archive/ubuntu/stage/+packages)から以下の項目をwgetでダウンロードします。

```
chromium-browser_***.*.****.***-0ubuntu0.18.04.1_amd64.deb
chromium-chromedriver_***.*.****.***-0ubuntu0.18.04.1_amd64.deb
chromium-codecs-ffmpeg_***.*.****.***-0ubuntu0.18.04.1_amd64.deb
chromium-codecs-ffmpeg-extra_***.*.****.***-0ubuntu0.18.04.1_amd64.deb

(***.*.****.***はバージョンになるので各自先程のページから最新版をダウンロードしてください。
```

### ダウンロードURLの探し方。
![arm64-1](/blog/2022/04/arm64-1-min.png)

最新バージョンのリンクをクリックすると下にダラダラと展開される。

![arm64-1](/blog/2022/04/arm64-2-min.png)

その中からarm64のリンクを見つけクリックする。  

![arm64-1](/blog/2022/04/arm64-3-min.png)

※画像にも書いたが最新版が当日であったり前日の場合amdはビルドされているがそのほかはビルドされてなかったりする。その場合は数日ビルドされるのを待つのが吉。

## インストール作業
まず依存関係のインストールをする。

```shell
sudo apt install libgbm1 libnspr4 libnss3 xdg-utils libwayland-server0
```

次に先程wgetでダウンロードした各項目をインストールする。  
ここでは必ず以下の順番でインストールするように。最初のffmpegに関しては順番はどちらでもいいが依存関係があるので、必ず、ffmpeg→browser→chromedriverの順番でするように。

```shell
sudo dpkg -i chromium-codecs-ffmpeg_***.*.****.***-0ubuntu0.18.04.1_amd64.deb
sudo dpkg -i chromium-codecs-ffmpeg-extra_***.*.****.***-0ubuntu0.18.04.1_amd64.deb
sudo dpkg -i chromium-browser_***.*.****.***-0ubuntu0.18.04.1_amd64.deb
sudo dpkg -i chromium-chromedriver_***.*.****.***-0ubuntu0.18.04.1_amd64.deb
```

### 実行log例
```shell
$ sudo apt install xdg-utils libgbm1 libnspr4 libnss3 libwayland-server0
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Recommended packages:
  libfile-mimeinfo-perl libnet-dbus-perl libx11-protocol-perl x11-utils x11-xserver-utils
The following NEW packages will be installed:
  libgbm1 libnspr4 libnss3 libwayland-server0 xdg-utils
0 upgraded, 5 newly installed, 0 to remove and 2 not upgraded.
1 not fully installed or removed.
Need to get 1398 kB of archives.
After this operation, 4633 kB of additional disk space will be used.
Get:1 http://ports.ubuntu.com/ubuntu-ports focal/main arm64 libwayland-server0 arm64 1.18.0-1 [30.4 kB]
Get:2 http://ports.ubuntu.com/ubuntu-ports focal-security/main arm64 libgbm1 arm64 21.2.6-0ubuntu0.1~20.04.2 [27.9 kB]
Get:3 http://ports.ubuntu.com/ubuntu-ports focal/main arm64 libnspr4 arm64 2:4.25-1 [99.5 kB]
Get:4 http://ports.ubuntu.com/ubuntu-ports focal-security/main arm64 libnss3 arm64 2:3.49.1-1ubuntu1.6 [1179 kB]
Get:5 http://ports.ubuntu.com/ubuntu-ports focal-security/main arm64 xdg-utils all 1.1.3-2ubuntu1.20.04.2 [61.4 kB]
Fetched 1398 kB in 2s (562 kB/s)
debconf: delaying package configuration, since apt-utils is not installed
Selecting previously unselected package libwayland-server0:arm64.
(Reading database ... 60597 files and directories currently installed.)
Preparing to unpack .../libwayland-server0_1.18.0-1_arm64.deb ...
Unpacking libwayland-server0:arm64 (1.18.0-1) ...
Selecting previously unselected package libgbm1:arm64.
Preparing to unpack .../libgbm1_21.2.6-0ubuntu0.1~20.04.2_arm64.deb ...
Unpacking libgbm1:arm64 (21.2.6-0ubuntu0.1~20.04.2) ...
Selecting previously unselected package libnspr4:arm64.
Preparing to unpack .../libnspr4_2%3a4.25-1_arm64.deb ...
Unpacking libnspr4:arm64 (2:4.25-1) ...
Selecting previously unselected package libnss3:arm64.
Preparing to unpack .../libnss3_2%3a3.49.1-1ubuntu1.6_arm64.deb ...
Unpacking libnss3:arm64 (2:3.49.1-1ubuntu1.6) ...
Selecting previously unselected package xdg-utils.
Preparing to unpack .../xdg-utils_1.1.3-2ubuntu1.20.04.2_all.deb ...
Unpacking xdg-utils (1.1.3-2ubuntu1.20.04.2) ...
Setting up libwayland-server0:arm64 (1.18.0-1) ...
Setting up libgbm1:arm64 (21.2.6-0ubuntu0.1~20.04.2) ...
Setting up libnspr4:arm64 (2:4.25-1) ...
Setting up xdg-utils (1.1.3-2ubuntu1.20.04.2) ...
Setting up libnss3:arm64 (2:3.49.1-1ubuntu1.6) ...
Setting up chromium-browser (100.0.4896.127-0ubuntu0.18.04.1) ...
Processing triggers for libc-bin (2.31-0ubuntu9.7) ...

$ sudo dpkg -i chromium-codecs-ffmpeg_100.0.4896.127-0ubuntu0.18.04.1_arm64.deb
Selecting previously unselected package chromium-codecs-ffmpeg.
(Reading database ... 60250 files and directories currently installed.)
Preparing to unpack chromium-codecs-ffmpeg_100.0.4896.127-0ubuntu0.18.04.1_arm64.deb ...
Unpacking chromium-codecs-ffmpeg (100.0.4896.127-0ubuntu0.18.04.1) ...
Setting up chromium-codecs-ffmpeg (100.0.4896.127-0ubuntu0.18.04.1) ...

$ sudo dpkg -i chromium-codecs-ffmpeg-extra_100.0.4896.127-0ubuntu0.18.04.1_arm64.deb
Selecting previously unselected package chromium-codecs-ffmpeg-extra.
dpkg: considering removing chromium-codecs-ffmpeg in favour of chromium-codecs-ffmpeg-extra ...
dpkg: yes, will remove chromium-codecs-ffmpeg in favour of chromium-codecs-ffmpeg-extra
(Reading database ... 60256 files and directories currently installed.)
Preparing to unpack chromium-codecs-ffmpeg-extra_100.0.4896.127-0ubuntu0.18.04.1_arm64.deb ...
Unpacking chromium-codecs-ffmpeg-extra (100.0.4896.127-0ubuntu0.18.04.1) ...
Setting up chromium-codecs-ffmpeg-extra (100.0.4896.127-0ubuntu0.18.04.1) ...

$ sudo dpkg -i chromium-browser_100.0.4896.127-0ubuntu0.18.04.1_arm64.deb
(Reading database ... 60667 files and directories currently installed.)
Preparing to unpack chromium-browser_100.0.4896.127-0ubuntu0.18.04.1_arm64.deb ...
Unpacking chromium-browser (100.0.4896.127-0ubuntu0.18.04.1) over (100.0.4896.127-0ubuntu0.18.04.1) ...
Setting up chromium-browser (100.0.4896.127-0ubuntu0.18.04.1) ...
Processing triggers for libc-bin (2.31-0ubuntu9.7) ...
Processing triggers for mime-support (3.64ubuntu1) ...
Processing triggers for hicolor-icon-theme (0.17-2) ...

$ sudo dpkg -i chromium-chromedriver_100.0.4896.127-0ubuntu0.18.04.1_arm64.deb
Selecting previously unselected package chromium-chromedriver.
(Reading database ... 60667 files and directories currently installed.)
Preparing to unpack chromium-chromedriver_100.0.4896.127-0ubuntu0.18.04.1_arm64.deb ...
Unpacking chromium-chromedriver (100.0.4896.127-0ubuntu0.18.04.1) ...
Setting up chromium-chromedriver (100.0.4896.127-0ubuntu0.18.04.1) ...
```

chromedriverがインストールされたかについては`ls /usr/lib/chromium-browser/chromedriver`で確認できる。

## 実行テスト。
今回はpython3で実行テストをしてみる。  
https://example.comのhtmlとスクリーンショットを生成する。  
コードは以下の通り。

```python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
options = Options()
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)
driver.get('https://example.com')
driver.set_window_size(900, 500)
driver.save_screenshot('screenshot.png')
html = driver.page_source
print(html)
driver.quit()
```

また前提としてseleniumをインストールする必要がある。
インストールしていない場合は、以下のコマンドでインストールする必要がある。

```shell
pip3 install selenium
```

## ハマるポイント
```shell
sudo apt install chromium-browser
```
はするな。バージョンがあってないとうまくできなかったりするのでめんどくさいため、先程の手順でインストールするのが吉。

## よくしそうなエラー
```shell
$ sudo dpkg -i chromium-browser_***.*.****.***-0ubuntu0.18.04.1_arm64.deb
Selecting previously unselected package chromium-browser.
(Reading database ... 60256 files and directories currently installed.)
Preparing to unpack chromium-browser_***.*.****.***-0ubuntu0.18.04.1_arm64.deb ...
Unpacking chromium-browser (***.*.****.***-0ubuntu0.18.04.1) ...
dpkg: dependency problems prevent configuration of chromium-browser:
 chromium-browser depends on libgbm1 (>= 17.1.0~rc2); however:
  Package libgbm1 is not installed.
 chromium-browser depends on libnspr4 (>= 2:4.9-2~); however:
  Package libnspr4 is not installed.
 chromium-browser depends on libnss3 (>= 2:3.22); however:
  Package libnss3 is not installed.
 chromium-browser depends on xdg-utils; however:
  Package xdg-utils is not installed.

dpkg: error processing package chromium-browser (--install):
 dependency problems - leaving unconfigured
Processing triggers for libc-bin (2.31-0ubuntu9.7) ...
Processing triggers for mime-support (3.64ubuntu1) ...
Processing triggers for hicolor-icon-theme (0.17-2) ...
Errors were encountered while processing:
 chromium-browser
```

依存関係がインストールされていないことによるエラー。

足りないからと言って、一つ一つ

```shell
sudo apt install libgbm1
etc...
````

とすると、それらの中での依存関係で以下のエラーが出る。

```shell
$ sudo apt install libgbm1
Reading package lists... Done
Building dependency tree       
Reading state information... Done
You might want to run 'apt --fix-broken install' to correct these.
The following packages have unmet dependencies:
 chromium-browser : Depends: libnspr4 (>= 2:4.9-2~) but it is not going to be installed
                    Depends: libnss3 (>= 2:3.22) but it is not going to be installed
                    Depends: xdg-utils but it is not going to be installed
                    Recommends: chromium-browser-l10n but it is not going to be installed
 libgbm1 : Depends: libwayland-server0 (>= 1.15.0) but it is not going to be installed
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
```

一つ一つインストールせずに一気にインストールするといける。

```shell
sudo apt install libgbm1 libnspr4 libnss3 xdg-utils libwayland-server0
```