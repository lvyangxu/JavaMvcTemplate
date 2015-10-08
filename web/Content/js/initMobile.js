/**
 * description 引用框架中的css和js,为了加快响应速度,不引用angular
 * author lvyangxu
 * 2015-08-02
 */

//设置相对路径
var relativePath = "Content/";

//引用css
function cssRefernce(cssPathArr) {
    var result = "";
    for (var i = 0; i < cssPathArr.length; i++) {
        var cssPath = cssPathArr[i];
        result = result + "<link rel=\"stylesheet\" href=\"" + relativePath + "css/" + cssPath + "\">";
    }    
    return result;
}

//引用js
function jsRefernce(jsPathArr) {
    var result = "";
    for (var i = 0; i < jsPathArr.length; i++) {
        var jsPath = jsPathArr[i];
        result = result + "<script src=\"" + relativePath +"js/"+ jsPath + "\"></script>";
    }
    return result;
}

var myCssPathArr = ["bootstrap.min.css", "bootstrap-theme.min.css","owl.carousel.css","owl.theme.css"];
var cssString = cssRefernce(myCssPathArr);

var myJsPathArr = ["jquery-2.1.4.min.js", "bootstrap.min.js", "data-model.js", "image-model.js", "communication-model.js","owl.carousel.js"];
var jsString = jsRefernce(myJsPathArr);

//输出所有引用的内容
document.write(cssString + jsString);