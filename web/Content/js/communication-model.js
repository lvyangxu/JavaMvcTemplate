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
};
