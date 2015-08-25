/**
 * description 自定义指令模版
 * author lvyangxu
 * 2015-08-13
 */

var myModule = angular.module("myAngular", []);

/**
 * 自定义指令-登录框 ="asp.net"></mylogin>
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

myModule.animation('.animation-name', function ($inject1, $inject2) {
       return {
         eventName : function(element, done) {
               //code to run the animation
               //once complete, then run done()
               return function cancellationFunction(element) {
                     //code to cancel the animation
                   }
             }
       }
 })

