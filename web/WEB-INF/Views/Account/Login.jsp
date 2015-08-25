<%-- 
    Document   : login
    Created on : 2015-8-18, 16:11:53
    Author     : anshifafeng
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app='myAngular'>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>请登录</title>
    <link rel="icon" href="../Content/images/favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="../Content/images/favicon.ico" type="image/x-icon" />
    <script src="../Content/js/init.js"></script>
</head>
<body class="loginBody">
    <mylogin transfer-url="../" username-cookie-name="mvcTemplateUsername" password-cookie-name="mvcTemplatePassword" mvc-client="java"></mylogin>   

    
    

    <span style="position: relative;height: 200px;width: 400px;display: inline-block;border:solid;border-color: yellowgreen" ng-controller="UploadController">
        <button class="btn btn-info" ng-click="callSelectButton()" style="top:15%;height: 30%;left:25%;position: absolute;width: 50%;">选择上传的文件</button>         
        <div>选择的文件数量:{{fileNum}}</div>
        <div id="fileName">文件名:{{fileName}}</div>
        <div id="fileSize">文件大小:{{fileSize}}</div>
        <div id="fileType">文件类型:{{fileType}}</div> 
        <div id="progressNumber"></div>  
        <button class="btn btn-warning" ng-click="uploadFile()" style="top:55%;height: 30%;left:25%;position: absolute;width: 50%;">开始上传</button>
        <input id="fileToUpload"  type="file" name="fileToUpload"  multiple="multiple" ng-blur="fileSelected()" ng-mouseup="fileSelected()">
    </span>





    
    <script>
        
        
        myModule.controller('UploadController', ['$scope', function($scope) {
           
            
            $scope.callSelectButton = function (){
                document.getElementById("fileToUpload").click();
                
                $scope.fileSelected();
            };
            
            
            $scope.fileSelected = function() {
                
                
            var file = document.getElementById('fileToUpload').files[0];
            $scope.fileNum = document.getElementById('fileToUpload').files.length;
                if (file) {
                    $scope.fileSelect = file.name;
                $scope.fileSize = 0;
                if (file.size > 1024 * 1024){
                    $scope.fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
                }
                else{
                    $scope.fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
                }  
                $scope.fileType= file.type;
                
                }
                
            };
            
            $scope.uploadFile = function(){
            var fd = new FormData();
            
            if($scope.fileNum==0){
                alert("请先选择至少一个文件");
                return;
            }
            alert($scope.fileNum);
            for(var i=0;i<$scope.fileNum;i++){
                fd.append("fileToUpload", document.getElementById('fileToUpload').files[i]);
            }
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", $scope.uploadProgress, false);
            xhr.addEventListener("load", $scope.uploadComplete, false);
            xhr.addEventListener("error", $scope.uploadFailed, false);
            xhr.addEventListener("abort", $scope.uploadCanceled, false);
            xhr.open("POST", "../DataExchange/Upload");
            xhr.send(fd);
        }
 
        $scope.uploadProgress =function(evt) {
            if (evt.lengthComputable) {
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
            }
            else {
                document.getElementById('progressNumber').innerHTML = 'unable to compute';
            }
        }
 
        $scope.uploadComplete = function(evt) {
            /* This event is raised when the server send back a response */
            alert(evt.target.responseText);
        }
 
        $scope.uploadFailed = function(evt) {
            alert("There was an error attempting to upload the file.");
        }
 
        $scope.uploadCanceled = function(evt) {
            alert("The upload has been canceled by the user or the browser dropped the connection.");
        }    
            
        }]);
        

 

    </script>
    
</body>
</html>


