/**
 * description 通信处理模型
 * author lvyangxu
 * 2015-08-21
 */

//使用jquery执行ajax请求,参数依次为url网址（不能跨域）,http请求类型get或post,超时时间（秒）,请求的js对象,成功获取返回后的回调(参数为一个string),请求失败后的回调(参数为一个string)
function doAjaxInJquery(url, httpRequestType, requestTimeOutSecond, requestParaData, successCallback, failureCallback) {
    var request = $.ajax({
        type: httpRequestType,
        url: url,
        cache: false,
        timeout: requestTimeOutSecond * 1000,//超时时间
        data: requestParaData,
        dataType: "text"
    }).done(function (data) {
        successCallback(data);
    }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
        failureCallback(textStatus);
    });
    return request;
};

//初始化websocket连接
function initWebSocket(receiveMessageCallback) {
    //拼接websocket的访问地址
    var baseUrl = window.location.href;
    baseUrl = baseUrl.replace(/http:/g, "ws:");
    var arr = baseUrl.split('/');
    arr[arr.length - 1] = "";
    arr[arr.length - 2] = "";
    var websocketUrl = "";
    for (var i = 0; i < arr.length - 2; i++) {
        websocketUrl = websocketUrl + arr[i] + "/";
    }
    websocketUrl = websocketUrl + "WebSocket";
    var webSocket = new WebSocket(websocketUrl);
    webSocket.onerror = function (event) {
        console.log("websocket发生异常:"+event);
    };

    webSocket.onopen = function (event) {
        console.log("websocket已连接");
        isNeedReconnect = false;
        receiveMessageCallback(event);
    };
      
    webSocket.onmessage = function (event) {
    //    receiveMessageCallback(event);
      console.log(event.data);  
    };
    
     webSocket.onclose= function (event) {
        console.log("websocket已关闭:"+event);
        isNeedReconnect = true;
    };

    return webSocket;
}

var isNeedReconnect = false;

//
function sendMessageByWebSocket(webSocket,receiveMessageCallback,message) {
    
    if (isNeedReconnect) {
        console.log(webSocket);
        console.log("断线重连");
        webSocket = initWebSocket(function(){
            webSocket.send(message);
            console.log(webSocket.readyState);
        });        
    } else{
   
    webSocket.send(message);
    }
}     