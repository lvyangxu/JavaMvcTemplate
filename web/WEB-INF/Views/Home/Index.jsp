<%-- 
    Document   : Index
    Created on : 2015-8-28, 10:21:22
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




</style>        
        
    </head>
    <body>
        
<div id="fullpage">
    <div class="section" ng-repeat="section in [1,2,3,4,5]">Some section{{section}}</div>

</div>
    </body>
    
    <script>
 


$(document).ready(function() {
    $('#fullpage').fullpage({
css3:true
    });
});


        </script>
    
</html>
