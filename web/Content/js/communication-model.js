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


/*
 * websocket对象封装
 */
function MyWebsocket(url,openCallback,receiveMessageCallback){
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
    websocketUrl = websocketUrl + url;      
    this.url = websocketUrl;
             
    //初始化websocket连接
    var webSocket = new WebSocket(this.url);
    websocketEventHandler(webSocket,openCallback,receiveMessageCallback);
    
    this.webSocket = webSocket;
}

//websocket事件处理handler
function websocketEventHandler(webSocket,openCallback,receiveMessageCallback){
    webSocket.onerror = function (event) {
        console.log("websocket发生异常:"+event);
    };
    webSocket.onopen = function (event) {
        console.log("websocket已连接");
        openCallback(webSocket);
    };
      
    webSocket.onmessage = function (event) {
        receiveMessageCallback(event.data);
    };
    
     webSocket.onclose= function (event) {
        console.log("websocket已关闭:"+event.code);
    };    
}

//断线重连
MyWebsocket.prototype.reconnect = function(openCallback,receiveMessageCallback){
    var webSocket = new WebSocket(this.url);
    websocketEventHandler(webSocket,openCallback,receiveMessageCallback);
    this.webSocket = webSocket;  
}

//发送消息
MyWebsocket.prototype.login =function(receiveMessageCallback,message) {
    if (this.webSocket.readyState != 1) {
        console.log("websocket失效,已重新连接");
        var webSocket = this.webSocket;
        //确保在新的websocket重连上再发送消息
        this.reconnect(function(webSocket){
            webSocket.send(myMessageEncode("login",message));
        },receiveMessageCallback);              
    } else {
        this.webSocket.send(myMessageEncode("login",message));
    }
}

//发送消息
MyWebsocket.prototype.sendMessage =function(receiveMessageCallback,message) {
    if (this.webSocket.readyState != 1) {
        console.log("websocket失效,已重新连接");
        var webSocket = this.webSocket;
        //确保在新的websocket重连上再发送消息
        this.reconnect(function(webSocket){
            webSocket.send(myMessageEncode("content",message));
        },receiveMessageCallback);              
    } else {
        this.webSocket.send(myMessageEncode("content",message));
    }
}     

