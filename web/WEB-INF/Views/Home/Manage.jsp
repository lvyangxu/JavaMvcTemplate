<%-- 
    Document   : Manage
    Created on : 2015-8-28, 13:47:26
    Author     : anshifafeng
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="myAngular">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="icon" href="../Content/images/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="../Content/images/favicon.ico" type="image/x-icon" />
        <script src="../Content/js/init.js"></script>       
        
        <style>
            
            /*顶部导航栏*/
            .top-nav{
                position: fixed;
                width: 100%;
                height: 50px;
                background-color:#3b291f;
                line-height: 30px;
                color: white;
            }
            
            /*顶部导航栏*/
            .top-nav>.nav-brand{
                font-size: 120%;
                font-weight: bold;
                padding-left: 10px;
                float: left;              
                padding-top: 10px;       
            }
            
            .top-nav>.nav-account{
                float: right;
                padding-right: 20px;
            }
           
            .top-nav>ul>li>a{
                color: white;
                font-size: 150%;
            }
            
            .top-nav>ul{
                list-style: none;                 
                width: 100%;
                padding-left: 35%;
                margin:0 auto;
 
            }
            
            .top-nav li{
                float: left;
       
                padding-top: 10px;
                padding-left: 5%;
                color:  #ffeac0;
            }
            
            .left-nav{
                position: fixed;
                font-size: 150%; 
                width: 200px;
                height: 100%;
                top:50px;
                background-color: #f5f6f7;
                text-align: center;
            }

            .left-nav>a>div{
                line-height: 50px;
                margin-top: 0px;
                margin-bottom: 0px;               
            }
            .left-nav>a>div:hover{
                background-color: #868687;
                line-height:55px;
                transition:line-height 0.5s,background-color 0.5s; 
                transition-timing-function: ease-in;
            }             
            
            .content{
                padding-top: 50px;
                padding-left: 200px;
            }
            
            .content>nav>section{
                height: 2000px;
            }
            
            </style>
        
    </head>
    <body>
        
        <div ng-controller="MyLayoutController">
            <nav class="top-nav">
                <div class="nav-brand">RadiumGames Business Information System</div>
                <ul>                
                    <li ng-repeat="topNavItem in topNavItems"><a ng-click="doTab(topNavItem)" href={{topNavItem.href}} ng-bind="topNavItem.name"></a></li>          
                </ul>
                <div class="nav-account">

                    welcome,karl
                </div>
            </nav>

            <nav class="left-nav"> 
                <a href={{leftNavItem.href}} ng-repeat="leftNavItem in leftNavItems"><div>{{leftNavItem.name}}</div></a>                         
            </nav>


            <div class="content">
                <nav id="div-operation" ng-show="topNavItems[0].tabVisiable">
                    <section id="1">
                        11111            
                    </section>
                    <section id="2">
                        2222            
                    </section>        
                    <section id="3">
                        3333            
                    </section>
                </nav>
                <nav id="div-market" ng-show="topNavItems[1].tabVisiable">aaa</nav>
                <nav id="div-financing" ng-show="topNavItems[2].tabVisiable">bbbb</nav>

            </div>
        <script>

              myModule.controller('MyLayoutController',['$scope',function($scope){                      
                      
                      $scope.topNavItems = [
                          {href:'#div-operation',name:'operation',leftNavItems:[{href:'#1',name:'operation'},{href:'#2',name:'market'},{href:'#3',name:'financing'}],tabVisiable:false},
                          {href:'#div-market',name:'market',leftNavItems:[{href:'#2',name:'market'}],tabVisiable:false},
                          {href:'#div-financing',name:'financing',leftNavItems:[{href:'#3',name:'financing'}],tabVisiable:false}
                      ];   
                      
                      //模拟tab功能
                      $scope.doTab = function(clickNavItem){
                          angular.forEach($scope.topNavItems,function(navItem){
                              if(clickNavItem == navItem){
                                  navItem.tabVisiable = true;
                              }else{
                                  navItem.tabVisiable = false;
                              }
                          }); 
                          
                      }
              }]);



            
            </script>
        

        
        
    </body>
</html>
