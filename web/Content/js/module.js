/**
 * description 自定义指令模版
 * author lvyangxu
 * 2015-08-13
 */

var myModule = angular.module("myAngular", ['ui.router']);

/**
 * 自定义指令-登录框
 * mylogin 自定义指令的标签
 * login-url 登录验证地址,可选,有值时请求该地址,未定义时取默认地址
 * transfer-url 登录成功后跳转的地址
 * username-cookie-name cookie-用户名的名称
 * password-cookie-name cookie-密码的名称
 * mvc-client 目标平台,可选值为asp.net和java（默认值为java）,用于确定post传参时的格式及content-type，java必须为a=b&c=d格式且content-type必须为application/x-www-form-urlencoded，asp.net可以使用angular默认的方式
 */
myModule.directive('mylogin', function () {
    var directiveDefinitionObject = {
        template: 
                   "<div class=\"col-lg-offset-4 col-lg-4\" ng-style=\"loginFrame\">" +
                       "<input class=\"col-lg-offset-1 col-lg-10\" ng-style=\"loginInput\" ng-model=\"username\" ng-trim=\"true\" type=\"text\" placeholder=\"请输入帐号\">" +
                       "<input class=\"col-lg-offset-1 col-lg-10\" ng-style=\"loginInput\" ng-model=\"password\" ng-trim=\"true\" type=\"password\" placeholder=\"请输入密码\">" +
                       "<button class=\"btn btn-lg btn-success col-lg-offset-1 col-lg-10\" ng-style=\"loginButton\" ng-click=\"doLogin()\">登录</button>" +
                   "</div>",
        restrict: 'E',
        link: function link(scope, iElement, iAttrs, controller, transcludeFn) {
            scope.loginUrl = iAttrs.loginUrl;
            scope.transferUrl = iAttrs.transferUrl;
            scope.usernameCookieName = iAttrs.usernameCookieName;
            scope.passwordCookieName = iAttrs.passwordCookieName;
            scope.mvcClient = iAttrs.mvcClient;

            //读取cookie，自动填充表单
            if (getCookie(scope.usernameCookieName) != undefined) {
                scope.username = getCookie(scope.usernameCookieName);
            }
            if (getCookie(scope.passwordCookieName) != undefined) {
                scope.password = getCookie(scope.passwordCookieName);
            }
        },
        controller: ("LoginController", ["$scope", "$http", function ($scope, $http) {
            $scope.loginFrame = { "position": "fixed", "top": "30%", "padding-top": "50px", "padding-bottom": "50px", "animation": "mylogin 2s" };
            $scope.loginButton = { "margin-top": "50px","margin-bottom":"20px" };
            $scope.loginInput = { height: "50px", border: "solid", "border-color": "aqua", "margin-top": "20px" };
           
     
            
            $scope.doLogin = function () {
                var url = "DoLogin";
                if ($scope.loginUrl != undefined) {
                    url = $scope.loginUrl;
                }

                var requestData = {username:$scope.username,password:$scope.password};
                var headers = { 'Content-Type': 'application/json'};
                //java web的特殊设置,用于接收post参数
                if($scope.mvcClient!="asp.net"){
                    requestData = "username="+$scope.username+"&password="+$scope.password;
                    headers = { 'Content-Type': 'application/x-www-form-urlencoded'};
                }
                               
                $http({ method: "post", url: url, data: requestData, headers: headers})
                    .success(function (jsonResult) {
                        if (jsonResult.success == "true") {
                            setCookie($scope.usernameCookieName,$scope.username,30);
                            setCookie($scope.passwordCookieName,$scope.password,30);
                            window.location.href = $scope.transferUrl;
                        } else {
                            alert("帐号密码错误");
                        }
                    })
                    .error(function (data) { alert("请求失败") });
            };
        }])
    };
    return directiveDefinitionObject;
});

/**
 * 自定义指令-文件上传简易面板
 * myupload 自定义指令的标签
 * upload-url 上传请求的服务器地址,可选,有值时请求该地址,未定义时取默认地址"../DataExchange/Upload"
 * upload-width 控件的宽度,可选,默认值为300，单位为px
 */
myModule.directive('myupload', function () {
    var directiveDefinitionObject = {
        template:
                    "<span ng-style=\"uploadFrame\">" +
                        "<button class=\"btn btn-info\" ng-click=\"callSelectButton()\" ng-style=\"uploadDivStyle\">选择上传的文件</button>" +
                        "<div id=\"fileNum\" ng-style=\"uploadDivStyle\">选择的文件数量:</div>" +
                        "<div id=\"fileName\" ng-style=\"uploadDivStyle\">文件名:</div>" +
                        "<div id=\"fileSize\" ng-style=\"uploadDivStyle\">文件大小:</div>" +
                        "<div ng-style=\"uploadDivStyle\">上传进度:{{fileProgress}}</div>" +
                        "<button class=\"btn btn-warning\" ng-click=\"uploadFile()\" ng-style=\"uploadDivStyle\">开始上传</button>" +
                        "<input id=\"selectUploadFile\" style=\"display: none\"  type=\"file\"  multiple=\"multiple\" onchange=\"fileSelected()\">" +
                    "</span>",
        restrict: 'E',
        link: function link(scope, iElement, iAttrs, controller, transcludeFn) {
            scope.uploadUrl = iAttrs.uploadUrl;
            scope.uploadWidth = iAttrs.uploadWidth;
            if(scope.uploadWidth==undefined){
                scope.uploadWidth = 300;
            }            
            scope.uploadFrame = {"position": "relative","height": "250px","width":scope.uploadWidth+"px","display": "inline-block"};
        },
        controller: ("UploadController", ["$scope", function ($scope) {
                $scope.callSelectButton = function () {
                    document.getElementById("selectUploadFile").click();
                };
                $scope.uploadDivStyle = {"width": "100%", "margin-top": "10px"};

                $scope.uploadFile = function () {
                    var fd = new FormData();
                    var fileNum = document.getElementById('selectUploadFile').files.length;
                    if (fileNum == 0) {
                        alert("请先选择至少一个文件");
                        return;
                    }
                    for (var i = 0; i < fileNum; i++) {
                        fd.append(i, document.getElementById('selectUploadFile').files[i]);
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", $scope.uploadProgress, false);
                    xhr.addEventListener("load", $scope.uploadComplete, false);
                    xhr.addEventListener("error", $scope.uploadFailed, false);
                    xhr.addEventListener("abort", $scope.uploadCanceled, false);
                    if ($scope.uploadUrl == undefined) {
                        $scope.uploadUrl = "../DataExchange/Upload";
                    }
                    xhr.open("POST", $scope.uploadUrl);
                    xhr.send(fd);
                };

                $scope.uploadProgress = function (evt) {
                    $scope.$apply(function () {
                        if (evt.lengthComputable) {
                            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                            $scope.fileProgress = percentComplete + "%";
                        }
                    });
                };

                $scope.uploadComplete = function (evt) {
                    var jsonObject = stringToJsonObject(evt.target.responseText);
                    if (jsonObject.success == "true") {
                        alert("上传成功");
                    } else {
                        alert("上传失败，服务器出现异常");
                    }
                };

                $scope.uploadFailed = function (evt) {
                    alert("上传失败");
                };

                $scope.uploadCanceled = function (evt) {
                    alert("上传操作已被用户或浏览器取消");
                };
            }])
    };
    return directiveDefinitionObject;
});

//选取文件后的逻辑，angular中未找到对应onchange的事件，只能用js来实现
function fileSelected() {
    var fileNum = document.getElementById('selectUploadFile').files.length;
    var fileName = "";
    var fileSize = 0;
    for (var i = 0; i < document.getElementById('selectUploadFile').files.length; i++) {
        var file = document.getElementById('selectUploadFile').files[i];
        if (fileSize == 1) {
            fileName = file.name;
        } else {
            fileName = file.name + ";等";
        }
        fileSize = fileSize + file.size;
    }
    $("#fileNum").html("选择的文件数量:" + fileNum);
    $("#fileName").html("文件名:" + fileName);
    if (fileSize > 1024 * 1024) {
        $("#fileSize").html("文件大小:" + (Math.round(fileSize * 100 / (1024 * 1024)) / 100).toString() + 'MB');
    }
    else {
        $("#fileSize").html("文件大小:" + (Math.round(fileSize * 100 / 1024) / 100).toString() + 'KB');
    }
};

/**
 * 自定义指令-顶部固定导航栏
 * mynavbar 自定义指令的标签
 * route-names 导航列表,以","分隔
 */
myModule.directive('mytopnavbar', function () {
    var directiveDefinitionObject = {
        template:
            "<nav ng-style='topNav'>"+
                "<div ng-style='topNavBrand'>RadiumGames Business Information System</div>"+
                "<div ng-style='navRoute'>"+
                    "<div class='topNavItem' ng-style='navItem' ng-click='doNav(route)' ng-class='{true:\"topNavActive\"}[route.isActive]' ng-repeat='route in routes' ui-sref='{{route.routeName}}'>"+
                        "{{route.routeName}}"+
                    "</div>"+
                "</div>"+
                "<div ng-style='topNavAccount'>"+
                    "welcome,karl"+
                "</div>"+
            "</nav>",
        restrict: 'E',
        link: function link(scope, iElement, iAttrs, controller, transcludeFn) {
            scope.routeNames = iAttrs.routeNames.split(',');     
            scope.routes = new Array();
            for (var i = 0; i < scope.routeNames.length; i++) {
                if (i == 0) {
                    scope.routes.push({"routeName": scope.routeNames[i], "isActive": true});
                } else {
                    scope.routes.push({"routeName": scope.routeNames[i], "isActive": false});
                }
            }
        },
        controller: ("TopNavController", ["$scope", function ($scope) {
                $scope.topNav = {"position":"fixed","width":"100%","height":"50px","background-color":"#31b0d5","color": "white","line-height":"50px"};
                $scope.topNavBrand = {"font-size":"120%","font-weight":"bold","padding-left":"10px","float":"left"};
                $scope.navRoute={"height":"50px","text-align":"center"};
                $scope.navItem={"float":"left","color":"white","font-size": "150%", "padding-left": "3%","padding-right":"3%"};
                $scope.topNavAccount={"float":"right","padding-right":"20px"};
                
                $scope.doNav = function (route) {
                    angular.forEach($scope.routes, function (eachRoute) {
                        if (eachRoute == route) {
                            eachRoute.isActive = true;
                        } else {
                            eachRoute.isActive = false;
                        }
                    });
                }
                
            }])
    };
    return directiveDefinitionObject;
});

function initUiRouter(routeArr,routeChildrenArr) {
    myModule.config(function ($stateProvider, $urlRouterProvider) {
        for (var i = 0; i < routeArr.length; i++) {
            $stateProvider.state(routeArr[i], {
                templateUrl: routeArr[i] + "/" + routeChildrenArr[i][0]
            });
        }
    });
}

/**
 * 自定义指令-左侧固定导航栏
 * mynavbar 自定义指令的标签
 * route-names 导航列表,以","分隔
 */
myModule.directive('myleftnavbar', function () {
    var directiveDefinitionObject = {
        template:
            "<nav ng-style=\"leftNav\">"+ 
                "<a class=\"leftNavItem\" ng-style=\"leftNavRoute\" href={{leftNavItem.href}} ng-repeat=\"leftNavItem in leftNavItems\">{{leftNavItem.name}}</a>"+                          
            "</nav>",
        restrict: 'E',
        link: function link(scope, iElement, iAttrs, controller, transcludeFn) {
            scope.routeNames = iAttrs.routeNames.split(',');     
            scope.routes = new Array();
            for (var i = 0; i < scope.routeNames.length; i++) {
                if (i == 0) {
                    scope.routes.push({"routeName": scope.routeNames[i], "isActive": true});
                } else {
                    scope.routes.push({"routeName": scope.routeNames[i], "isActive": false});
                }
            }          
        },
        controller: ("LeftNavController", ["$scope", function ($scope) {
                $scope.leftNav = {"position":"fixed","font-size":"150%","width":"200px","height":"100%","top":"50px","background-color":"#f5f6f7","text-align":"center"};
                $scope.leftNavRoute = {"line-height":"50px","margin-top": "0px","margin-bottom": "0px"};
                
                $scope.doNav = function (route) {
                    angular.forEach($scope.routes, function (eachRoute) {
                        if (eachRoute == route) {
                            eachRoute.isActive = true;
                        } else {
                            eachRoute.isActive = false;
                        }
                    });
                }
                
            }])
    };
    return directiveDefinitionObject;
});