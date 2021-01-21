---
title: いろんなdo whileを比較してみた!
slug: do-while
date: 2021-01-17T10:00:00+09:00
draft: false
description: いろんな言語のdo while文にあたるものを書いてみました!
tags:
  - Salad's Memo
card: summary_large_image
---
こんにちは。さらだぼぉるです。  
先日学校の課題でCのdo whileをしたのですが、「そういえば、do whileってあんま使わんな」と思ったので僕がいつも使っている言語でdo while文を書いてみようと言う記事です。(新年最初の記事がこんなのでいいのか...)

- c  
- JavaScript  
- PHP  
- python  
- Go  

内容としては、0~10の数値を表示させ10の時だけ10だよ!と言う表示をするプログラムを作ります。

## do whileがあるもの
### C
```c
int i = 0;
do{
	printf("%d\n",i);
	i++;
}while (i < 10);
printf("10だよ!\n");
```
参考 [do-while ステートメント (C) | Microsoft Docs](https://docs.microsoft.com/ja-jp/cpp/c-language/do-while-statement-c?view=msvc-160)

### JavaScript
```javascript
let i = 0;
do {
	console.log(i)
	i = i + 1;
} while (i < 10);
```
参考 [do...while - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/do...while)

### PHP
```php
$i = 0;
do {
    echo $i;
} while ($i < 10);
echo "10だよ!";
```
参考 [PHP: do-while - Manual](https://www.php.net/manual/ja/control-structures.do.while.php)

## do whileがないもの
### Python
```python
i = 0
while i < 10:
	print(i)
	i += 1
else:
	print("10だよ!")
```
参考 [8. 複合文 (compound statement) — Python 3.9.1 ドキュメント](https://docs.python.org/ja/3/reference/compound_stmts.html#while)

### Go
```go
i := 0
for i > 10 {
    fmt.Printf("%d\n", i)
    i++
}
fmt.Printf("10だよ!")
```
参考 [Go言語 - forループによる繰り返し処理 - 覚えたら書く](https://blog.y-yuki.net/entry/2017/05/06/000000)

また他の言語をやり出したら追記します。


続き:[正直..do whileっている?](https://blog.saladbowl.work/blog/2021/01/need-do-while-q/)

