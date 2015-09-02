<%-- 
    Document   : Manage
    Created on : 2015-8-28, 13:47:26
    Author     : anshifafeng
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="icon" href="../Content/images/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="../Content/images/favicon.ico" type="image/x-icon" />
        <script src="../Content/js/init.js"></script>        
    </head>
    <body>
        <h1>Hello World!</h1>
        <input id="message">
        <button onclick="send()">发送消息</button>
        
        
        
        
        <script>
            
        initWebSocket(function(){
            
        },function(result){
            console.log(result);
        });
  
        function send(){
            sendMessageByWebSocket(function(result){
                console.log(result);
            },$("#message").val());
        }   
        

            
            </script>
        

        
        
    </body>
</html>
