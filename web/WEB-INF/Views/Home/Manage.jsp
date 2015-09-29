<%-- 
    Document   : Manage
    Created on : 2015-9-29, 16:26:54
    Author     : anshifafeng
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="myAngular">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <link rel="icon" href="../Content/images/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="../Content/images/favicon.ico" type="image/x-icon" />
        <script src="../Content/js/init.js"></script>       
        
        <style>          
            
            
  
            
            .content{
                padding-top: 50px;
            }
            
            .content>nav>section{
                height: 2000px;
            }
            
            </style>
        
    </head>
    <body>
        
        
            <mytopnavbar route-names="Operation,Market,Financing"></mytopnavbar>


            <div class="content">
                <section ui-view="leftNav"></section>
                <section ui-view="content"></section>
            </div>
        <script>

           var arr = [
               ["DAU-User","DNU-User","EDAU-User","Paid-User-Login","Daily-Paid-Times","Daily-Paid-User","Pay-Rate","Daily-Income","ARPU","ARPPU","Daily-Active-User-Average-Gold","Daily-Active-Paid-User-Average-Gold"],
               ["MarketIndex"],
               ["FinancingIndex"]
           ];
           initUiRouter(["Operation","Market","Financing"],arr);  
    
              
              


            
            </script>
        

        
        
    </body>
</html>


