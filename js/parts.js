var xhrh = new XMLHttpRequest(),
  method = "GET",
  url = "/common.html";
var xhrb = new XMLHttpRequest(),
  method = "GET",
  url = "/common.html";
var xhrf = new XMLHttpRequest(),
  method = "GET",
  url = "/common.html";
var header = document.getElementsByTagName("header")[0];
var bottom_menu_wrap = document.getElementById("bottom_menu_wrap");
var footer = document.getElementsByTagName("footer")[0];
xhrh.responseType="document";
xhrh.open(method, url, true);
xhrh.onreadystatechange = function () {
  if(xhrh.readyState === 4 && xhrh.status === 200) {
    var restxt=xhrh.responseXML;
    var int=restxt.getElementsByTagName("header")[0];
    header.innerHTML=int.outerHTML;
  }
};
xhrh.send();
xhrb.responseType="document";
xhrb.open(method, url, true);
xhrb.onreadystatechange = function () {
  if(xhrb.readyState === 4 && xhrb.status === 200) {
    var restxt=xhrb.responseXML;
    var int=restxt.getElementById("bottom_menu");
    footer.innerHTML=int.outerHTML;
  }
};
xhrb.send();
xhrf.responseType="document";
xhrf.open(method, url, true);
xhrf.onreadystatechange = function () {
  if(xhrf.readyState === 4 && xhrf.status === 200) {
    var restxt=xhrf.responseXML;
    var int=restxt.getElementsByTagName("footer")[0];
    footer.innerHTML=int.outerHTML;
  }
};
xhrf.send();
