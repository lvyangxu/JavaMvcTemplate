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
        template:function(tElement, tAttrs){
            var innerHtml =
                    "<span ng-style=\"uploadFrame\">" +
                        "<button class=\"btn btn-info\" ng-click=\"callSelectButton()\" ng-style=\"uploadDivStyle\">选择上传的文件</button>" +
                        "<div id=\""+tAttrs["uploadid"]+"fileNum\" ng-style=\"uploadDivStyle\">选择的文件数量:</div>" +
                        "<div id=\""+tAttrs["uploadid"]+"fileName\" ng-style=\"uploadDivStyle\">文件名:</div>" +
                        "<div id=\""+tAttrs["uploadid"]+"fileSize\" ng-style=\"uploadDivStyle\">文件大小:</div>" +
                        "<div ng-style=\"uploadDivStyle\">上传进度:{{fileProgress}}</div>" +
                        "<button class=\"btn btn-warning\" ng-click=\"uploadFile()\" ng-style=\"uploadDivStyle\">开始上传</button>" +
                        "<input id=\""+tAttrs["uploadid"]+"selectUploadFile\" style=\"display: none\"  type=\"file\"  multiple=\"multiple\" onchange=\"fileSelected('"+tAttrs["uploadid"]+"')\">" +
                    "</span>";
            return innerHtml;
        },
        restrict: 'E',
        link: function link(scope, iElement, iAttrs, controller, transcludeFn) {
            scope.uploadUrl = iAttrs.uploadUrl;
            scope.uploadWidth = iAttrs.uploadWidth;
            if(scope.uploadWidth==undefined){
                scope.uploadWidth = 300;
            }            
            scope.uploadFrame = {"position": "relative","height": "250px","width":scope.uploadWidth+"px","display": "inline-block"};
        },
        controller: ("UploadController", ["$scope","$element", function ($scope,$element) {
                $scope.callSelectButton = function () {
                    document.getElementById($element.attr("uploadid")+"selectUploadFile").click();
                };
                $scope.uploadDivStyle = {"width": "100%", "margin-top": "10px"};

                $scope.uploadFile = function () {
                    var fd = new FormData();
                    var fileNum = document.getElementById($element.attr("uploadid")+'selectUploadFile').files.length;
                    if (fileNum == 0) {
                        alert("请先选择至少一个文件");
                        return;
                    }
                    for (var i = 0; i < fileNum; i++) {
                        fd.append(i, document.getElementById($element.attr("uploadid")+'selectUploadFile').files[i]);
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
function fileSelected(id) {
    var fileNum = document.getElementById(id+'selectUploadFile').files.length;
    var fileName = "";
    var fileSize = 0;
    for (var i = 0; i < document.getElementById(id+'selectUploadFile').files.length; i++) {
        var file = document.getElementById(id+'selectUploadFile').files[i];
        if (fileSize == 1) {
            fileName = file.name;
        } else {
            fileName = file.name + ";等";
        }
        fileSize = fileSize + file.size;
    }
    $("#"+id+"fileNum").html("选择的文件数量:" + fileNum);
    $("#"+id+"fileName").html("文件名:" + fileName);
    if (fileSize > 1024 * 1024) {
        $("#"+id+"fileSize").html("文件大小:" + (Math.round(fileSize * 100 / (1024 * 1024)) / 100).toString() + 'MB');
    }
    else {
        $("#"+id+"fileSize").html("文件大小:" + (Math.round(fileSize * 100 / 1024) / 100).toString() + 'KB');
    }
};

/**
 * 自定义指令-顶部固定导航栏
 * mynavbar 自定义指令的标签
 * brand 导航栏左侧的文字
 * route-names 导航列表名称,以","分隔
 * route-urls 导航列表指向的链接,以","分隔
 */
myModule.directive('mytopnavbar', function () {
    var directiveDefinitionObject = {
        template:function(tElement, tAttrs){
            var hrefStr =                     "<div class='topNavItem' ng-style='navItem' ng-click='doNav(route)' ng-class='{true:\"topNavActive\"}[route.isActive]' ng-repeat='route in routes' ui-sref='{{route.routeUrl}}'>"+
                        "{{route.routeName}}"+
                    "</div>";
            if(tAttrs["model"]=="href"){
                hrefStr = "<a class='topNavItem' ng-style='navItem' ng-click='doNav(route)' ng-class='{true:\"topNavActive\"}[route.isActive]' ng-repeat='route in routes' href='#{{route.routeUrl}}'>"+
                        "{{route.routeName}}"+
                    "</a>";
            }
            
            return             "<nav ng-style='topNav'>"+
                "<div ng-style='topNavBrand'>{{brand}}</div>"+
                "<div ng-style='navRoute'>"+
                    hrefStr+
                "</div>"+
                "<div ng-style='topNavAccount'>"+
//                    "welcome,karl"+
                "</div>"+
            "</nav>"
            
        },
        restrict: 'E',
        link: function link(scope, iElement, iAttrs, controller, transcludeFn) {
            scope.brand = iAttrs.brand;
            scope.routeUrls = iAttrs.routeUrls.split(',');
            scope.routeNames = iAttrs.routeNames.split(',');     
            scope.routes = new Array();
            for (var i = 0; i < scope.routeUrls.length; i++) {
                if (i == 0) {
                    scope.routes.push({"routeName": scope.routeNames[i],"routeUrl":scope.routeUrls[i], "isActive": true});
                } else {
                    scope.routes.push({"routeName": scope.routeNames[i],"routeUrl":scope.routeUrls[i], "isActive": false});
                }
            }
        },
        controller: ("TopNavController", ["$scope","$state","$element", function ($scope,$state,$element) {
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
                };
                var defaultUiView = $element.attr("route-urls").split(',')[0];
                $state.go(defaultUiView);
            }])
    };
    return directiveDefinitionObject;
});

//myModule.directive('mynavbar', function () {
//    var directiveDefinitionObject = {
//        template:
//            "<mytopnavbar brand={{brand}} route-names={{topNameStr}} route-urls={{topUrlStr}}></mytopnavbar>"+
//            "<myleftnavbar route-names={{leftNameStr}} route-urls={{leftUrlStr}}></myleftnavbar>",
//        restrict: 'E',
//        link: function link(scope, iElement, iAttrs, controller, transcludeFn) {
//            scope.brand = iAttrs.brand;
//            scope.topNameStr = iAttrs.topNameStr;
//            scope.topUrlStr = iAttrs.topUrlStr;
//            scope.leftNameStr = iAttrs.leftNameStr;
//            scope.leftUrlStr = iAttrs.leftUrlStr;     
//        },
//        controller: ("TopNavController", ["$scope", function ($scope) {
//                
//            }])
//    };
//    return directiveDefinitionObject;
//});


function initUiRouter(routeArr) {
    myModule.config(function ($stateProvider, $urlRouterProvider) {
//        $urlRouterProvider.when("", routeArr[0]);
        for (var i = 0; i < routeArr.length; i++) {
            $stateProvider.state(routeArr[i], {
                templateUrl: routeArr[i] + "/Index"
            });
        }
//        for (var i = 0; i < routeChildrenArr.length; i++) {
//            for (var j = 0; j < routeChildrenArr[i].length; j++) {
//                $stateProvider.state(routeArr[i]+"/"+routeChildrenArr[i][j], {
//                    templateUrl: routeArr[i] + "/" + routeChildrenArr[i][j]
//                });
//            }
//        }
        
    });
}

/**
 * 自定义指令-左侧固定导航栏
 * mynavbar 自定义指令的标签
 * route-names 导航列表,以","分隔
 * route-urls 导航列表指向的链接,以","分隔
 */
myModule.directive('myleftnavbar', function () {
    var directiveDefinitionObject = {
        template:
            "<nav ng-style=\"leftNav\">"+ 
                "<div class=\"leftNavItem\" ng-style=\"leftNavRoute\" ng-class='{true:\"leftNavActive\"}[route.isActive]' ui-sref={{route.routeUrl}} ng-repeat=\"route in leftRoutes\">{{route.routeName}}</div>"+                          
            "</nav>",
        restrict: 'E',
        link: function link(scope, iElement, iAttrs, controller, transcludeFn) {
            scope.leftRouteNames = iAttrs.routeNames.split(',');     
            scope.leftRouteUrls = iAttrs.routeUrls.split(',');
            scope.leftRoutes = new Array();
            for (var i = 0; i < scope.routeNames.length; i++) {
                if (i == 0) {
                    scope.leftRoutes.push({"routeName": scope.leftRouteNames[i],"routeUrl":scope.leftRouteUrls[i], "isActive": true});
                } else {
                    scope.leftRoutes.push({"routeName": scope.leftRouteNames[i],"routeUrl":scope.leftRouteUrls[i], "isActive": false});
                }
            }          
        },
        controller: ("LeftNavController", ["$scope", function ($scope) {
                $scope.leftNav = {"position":"fixed","font-size":"150%","width":"200px","height":"100%","top":"50px","background-color":"#fff799","text-align":"center"};
                $scope.leftNavRoute = {"line-height":"50px","margin-top": "0px","margin-bottom": "0px","width":"100%"};
                
                $scope.doNav = function (route) {
                    angular.forEach($scope.leftRoutes, function (eachRoute) {
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

myModule.directive('mytable', function () {
    var directiveDefinitionObject = {
        template: 
                   "<table ng-style=\"tableStyle\" class=\"table\" >" +
                        "<thead><tr><th ng-style=\"tableStyle\" ng-repeat=\"columnName in columnNames\">{{columnName}}</th></tr></thead>"+
                        "<tbody><tr ng-repeat=\"dataRow in dataRows\"><td ng-repeat=\"dataRowElement in dataRow track by $index\">{{dataRowElement}}</td></tr></tbody>"+
                   "</table>",
        restrict: 'E',      
        controller: ("TableController", ["$scope", "$http","$element", function ($scope, $http,$element) {
                
                $scope.doBind = function () {
                    $scope.tableStyle = {"text-align": "center"};
                    var url = $element.attr("url");
                    $scope.dataRows = new Array();
                    $scope.columnNames = $element.attr("columnNames").split(',');
                    var columnIds = $element.attr("columnIds").split(',');
                    var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
                    $http({method: "post", url: url, data: null, headers: headers})
                            .success(function (jsonResult) {
                                for (var i = 0; i < jsonResult.length; i++) {
                                    var dataRow = new Array();
                                    for (var j = 0; j < columnIds.length; j++) {
                                        dataRow.push(jsonResult[i][columnIds[j]]);
                                    }
                                    $scope.dataRows.push(dataRow);
                                }
                            })
                            .error(function (data) {
                                alert("表格数据加载失败")
                            });
                }
                $scope.doBind();
       }])
    };
    return directiveDefinitionObject;
});

//页面布局样式1
myModule.directive('mylayout1', function () {
    var directiveDefinitionObject = {
        template: function(tElement, tAttrs){
            var innerHtml = 
            "<nav class=\"mylayout1\">"+
            "<div class=\"brand\">{{brand}}</div>"+
            "<div class=\"route\">"+
                "<a href=\"{{route.href}}\" ng-click=\"doActive(route)\" ng-repeat='route in routes'><div ng-class='{true:\"activeRoute\"}[route.isActive]'>{{route.name}}</div></a>"+
            "</div>"+
            "</nav>";
            return innerHtml;            
        },
        restrict: 'E',      
        controller: ("MyLayout1Controller", ["$scope","$element", function ($scope,$element) {
                $scope.doActive = function (route) {
                    angular.forEach($scope.routes, function (eachRoute) {
                        if (eachRoute == route) {
                            eachRoute.isActive = true;
                        } else {
                            eachRoute.isActive = false;
                        }
                    });
                }

                $scope.brand = $element.attr("brand");
                var routeNameArr = $element.attr("name").split(',');
                var routeHrefArr = $element.attr("href").split(',');
                $scope.routes = new Array();
                for (var i = 0; i < routeNameArr.length; i++) {
                    var isActive = false;
                    if (i === 0) {
                        isActive = true;
                    }
                    var route = {"name": routeNameArr[i], "href": "#" + routeHrefArr[i], "isActive": isActive};
                    $scope.routes.push(route);
                }
       }])
    };
    return directiveDefinitionObject;
});
