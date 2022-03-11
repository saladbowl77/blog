---
title: UbuntuにPillowをインストールする方法
slug: Ubuntu-install-pillow
imgUrl: /images/default.png
description: UbuntuにPillowをインストールする方法を紹介します。
tags:
  - Ubuntu
  - python3
  - python
  - Pillow
card: summary
---
UbuntuにPillowをインストールする方法。

### 筆者環境

OS : Ubuntu 20.04.4 LTS  
PC : Radxa Rock3A

### 結論

```shell
apt update
apt install python3-pip -y
apt install libjpeg8-dev zlib1g-dev libtiff-dev libfreetype6 libfreetype6-dev libwebp-dev libopenjp2-7-dev libopenjp2-7-dev -y

pip3 install pillow --global-option="build_ext" --global-option="--enable-zlib" --global-option="--enable-jpeg" --global-option="--enable-tiff" --global-option="--enable-freetype" --global-option="--enable-webp" --global-option="--enable-webpmux" --global-option="--enable-jpeg2000"
```

参考 : [muratgozel/install_pillow.sh](https://gist.github.com/muratgozel/fdb854885d6a300004430239dd1f5cfb)

### 推奨されない方法

```shell
sudo apt install python-pil # for python 2.X
or 
sudo apt install python3-pil # for python 3.X including python3.6

sudo apt install python3-pil.imagetk
```
Pillowのバージョンが古く、

```python
hoge.text(anchor='mm')
```

`anchor`が使えなかった。