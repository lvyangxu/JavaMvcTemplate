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


    .b{
        background-image: url("../Content/images/favicon.ico");
        background-size: 100% 100%;
    }

</style>        
        
    </head>
    <body>
        <div class="b" id="0">
        </div>    
        <div class="b" id="1">
        </div>
        <div class="b" id="2">
        </div>
        <div class="b" id="3">
        </div>        

    </body>
    
    <script>
    disableAutoScrolling();
$(".b").height($(window).height());
window.onscroll = function(){
    var location = document.body.scrollTop;
    var i = parseInt($(window).height()/location);
    i = i +1 ;
//    window.location.href = "#"+i;
    
        
}
        </script>
    
</html>
