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
    <mylogin transfer-url="../" username-cookie-name="mvcTemplateUsername" password-cookie-name="mvcTemplatePassword" mvc-client="asp.net"></mylogin>
</body>
</html>

