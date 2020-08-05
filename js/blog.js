function getCSVFile() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
    createArray(xhr.responseText);
    };
    xhr.open("get", "/blog/data.csv", true);
    xhr.send(null);
}
getCSVFile();
function createXMLHttpRequest() {
    var XMLhttpObject = null;
    XMLhttpObject = new XMLHttpRequest();
    return XMLhttpObject;
}
var bl = document.getElementById("blog_list");
function createArray(csvData) {
    var tempArray = csvData.split("\n");
    var csvArray = new Array();
    for(var i = 0; i<tempArray.length;i++){
    csvArray[i] = tempArray[i].split(",");
    }
    for(var i = 1; i<tempArray.length;i++){
      const csv_dataArray = csvArray[i];
      var bl_e = document.createElement('a');
      bl_e.className = 'blog_link';
      bl_e.href = csv_dataArray[2];
      bl.appendChild(bl_e);
      var blogHTML = `<img src="${csv_dataArray[2]}img/thumbnail.png" alt="${csv_dataArray[1]}のサムネイル"><h3>${csv_dataArray[1]}</h3><p class="date">${csv_dataArray[3]}</p>`
      bl_e.insertAdjacentHTML('afterbegin', blogHTML);
    }
}