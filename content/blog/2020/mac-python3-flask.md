---
title: "Macでpip installしたのにimportできない対処法"
date: 2020-09-12T15:12:32+09:00
draft: false
tags: ["Python", "Python3", "Flask"]
description : "macを使っているときにpip installしてあるのにimportできなかったのでその対処法をまとめました"
card : "summary"
---
## はじめに
どうもさらだです。とても久しぶりの投稿になりました。今回はmacでpython3を使っているときに少し手間取ったことを書きたいと思います。

僕の環境は以下の通りです
```bash
python3.8.2 (Homebrewでインストール)
MacBookAir 2020
```

で、実行してエラーが出たコードがこちらです。
```python3
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    name = "Hello World"
    return name

@app.route('/good')
def good():
    name = "Good"
    return name

if __name__ == "__main__":
    app.run(debug=True)
```

エラー内容

```bash
myname@MacBook-Air test % python3 server.py
Traceback (most recent call last):
  File "/Users/myname/Desktop/test/server.py", line 1, in <module>
    from flask import Flask
ModuleNotFoundError: No module named 'flask'
```

このように「Flaskが見つからないよー！」っていうエラーが発生します。もちろんpip installでインストール済みです。念のためもう一度インストールすると、
```bash
Defaulting to user installation because normal site-packages is not writeable
Requirement already satisfied: flask in /Users/myname/Library/Python/2.7/lib/python/site-packages (1.1.2)
```
と、なりalreadyなのですでにインストールされています。

ここでもう上級者の人は分かったのではないでしょうか。よくみてみてください。インストール先が
```bash
/Users/myname/Library/Python/2.7/lib/python/site-packages (1.1.2)
```
となっています。

そうです。2.7 = Macのデフォルトのものに入っていたのです！

**これは事件です**

ではどうすればいいのか。
ネットで調べて出てきたのがこちら！
```bash
python3 --m pip install flask
```
実行しました！
すると、、、、
```python3
ERROR: Could not install packages due to an EnvironmentError: [Errno 13] Permission denied: '/Library/Python/3.8'
Consider using the `--user` option or check the permissions.
```
エラーが発生！(ネットの情報って信用したらダメだね)

まぁしっかり対処法が書いてます。
最後の文
```bash
Consider using the `--user` option or check the permissions.
```
オプションで--userをつけろって言ってはります。
実行しました。
```bash
python3 -m pip install flask --user
Collecting flask
  Using cached https://files.pythonhosted.org/packages/f2/28/2a03252dfb9ebf377f40fba6a7841b47083260bf8bd8e737b0c6952df83f/Flask-1.1.2-py2.py3-none-any.whl
Collecting itsdangerous>=0.24 (from flask)
  Using cached https://files.pythonhosted.org/packages/76/ae/44b03b253d6fade317f32c24d100b3b35c2239807046a4c953c7b89fa49e/itsdangerous-1.1.0-py2.py3-none-any.whl
Collecting Jinja2>=2.10.1 (from flask)
  Using cached https://files.pythonhosted.org/packages/30/9e/f663a2aa66a09d838042ae1a2c5659828bb9b41ea3a6efa20a20fd92b121/Jinja2-2.11.2-py2.py3-none-any.whl
Collecting click>=5.1 (from flask)
  Using cached https://files.pythonhosted.org/packages/d2/3d/fa76db83bf75c4f8d338c2fd15c8d33fdd7ad23a9b5e57eb6c5de26b430e/click-7.1.2-py2.py3-none-any.whl
Collecting Werkzeug>=0.15 (from flask)
  Using cached https://files.pythonhosted.org/packages/cc/94/5f7079a0e00bd6863ef8f1da638721e9da21e5bacee597595b318f71d62e/Werkzeug-1.0.1-py2.py3-none-any.whl
Collecting MarkupSafe>=0.23 (from Jinja2>=2.10.1->flask)
  Using cached https://files.pythonhosted.org/packages/0c/12/37f68957526d1ec0883b521934b4e1b8ff3dd8e4fab858a5bf3e487bcee9/MarkupSafe-1.1.1-cp38-cp38-macosx_10_9_x86_64.whl
Installing collected packages: itsdangerous, MarkupSafe, Jinja2, click, Werkzeug, flask
  WARNING: The script flask is installed in '/Users/myname/Library/Python/3.8/bin' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
Successfully installed Jinja2-2.11.2 MarkupSafe-1.1.1 Werkzeug-1.0.1 click-7.1.2 flask-1.1.2 itsdangerous-1.1.0
WARNING: You are using pip version 19.2.3, however version 20.2.3 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
```

できました！
やったね！

## まとめ
結論 : python3にpip install するときはとりあえず、
```bash
python3 -m pip install <インストールしたいもの> --user
```
をしたら解決！
