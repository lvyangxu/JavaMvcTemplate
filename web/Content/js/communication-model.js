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
 * websocket对象封装，参数分别为服务器地址、用户名、密码、打开websocket后的回调、接收消息后的回调
 */
function MyWebsocket(url,username,password,openCallback,receiveMessageCallback){
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
    this.receiveMessageCallback = receiveMessageCallback;
    this.websocketEventHandler(webSocket,openCallback);    
    this.webSocket = webSocket;
    this.username = username;
    this.password = password;
    
    //向服务器端发送登录消息确定身份
    this.login();
    
}

//websocket事件处理handler
MyWebsocket.prototype.websocketEventHandler = function(webSocket,openCallback){
    var myWebsocket = this;
    webSocket.onerror = function (event) {
        console.log("websocket发生异常:"+event);
    };
    webSocket.onopen = function (event) {
        console.log("websocket已连接");
        openCallback(myWebsocket);
    };
      
    webSocket.onmessage = function (event) {
        myWebsocket.receiveMessageCallback(event.data);
    };
    
     webSocket.onclose= function (event) {
        console.log("websocket已关闭:"+event.code);
    };    
}

//断线重连
MyWebsocket.prototype.reconnect = function(openCallback,receiveMessageCallback){
    var webSocket = new WebSocket(this.url);
    this.websocketEventHandler(webSocket,openCallback,receiveMessageCallback);
    this.webSocket = webSocket;  
}

//登录
MyWebsocket.prototype.login =function() {
    if (this.webSocket.readyState != 1) {
        //websocket连上再发送消息
        this.reconnect(function(myWebsocket){
            myWebsocket.webSocket.send(myMessageEncode(myWebsocket.username,myWebsocket.password,"login",""));
        },this.receiveMessageCallback);              
    } else {
        this.webSocket.send(myMessageEncode(this.username,this.password,"login",""));
    }
}

///发送消息,参数分别为接收消息后的回调
MyWebsocket.prototype.sendMessage =function(message) {
    if (this.webSocket.readyState != 1) {
        console.log("websocket失效,尝试重连");
        var webSocket = this.webSocket;
        //确保在新的websocket重连上再发送消息
        this.reconnect(function(myWebsocket){
            myWebsocket.webSocket.send(myMessageEncode(myWebsocket.username,myWebsocket.password,"content",message));
        },this.receiveMessageCallback);              
    } else {
        this.webSocket.send(myMessageEncode(this.username,this.password,"content",message));
    }
}     

