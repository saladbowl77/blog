var xhrh = new XMLHttpRequest(),
  method = "GET",
  url = "/common.html";
var xhrf = new XMLHttpRequest(),
  method = "GET",
  url = "/common.html";
var header = document.getElementsByTagName("header")[0];
var footer = document.getElementsByTagName("footer")[0];

xhrh.responseType="document";//XMLとして扱いたいので一応記述
xhrh.open(method, url, true);
xhrh.onreadystatechange = function () {
  if(xhrh.readyState === 4 && xhrh.status === 200) {
    var restxt=xhrh.responseXML;//重要
    var int=restxt.getElementsByTagName("header")[0];//読み込まれるセレクタを指定
    header.innerHTML=int.outerHTML;//完了
  }
};
xhrh.send();

xhrf.responseType="document";//XMLとして扱いたいので一応記述
xhrf.open(method, url, true);
xhrf.onreadystatechange = function () {
  if(xhrf.readyState === 4 && xhrf.status === 200) {
    var restxt=xhrf.responseXML;//重要
    var int=restxt.getElementsByTagName("footer")[0];//読み込まれるセレクタを指定
    footer.innerHTML=int.outerHTML;//完了
  }
};
xhrf.send();