/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Global;

import MyJavaLibrary.DoLog4j;
import MyJavaLibrary.DoMysql;
import MyJavaLibrary.DoXml;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.websocket.Session;
import org.apache.log4j.Logger;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.ContextStartedEvent;
import org.springframework.context.event.ContextStoppedEvent;

/**
 *
 * @author anshifafeng
 */
public class Global implements ApplicationListener<ApplicationEvent> {

    @Override
    public void onApplicationEvent(ApplicationEvent e) {
        if (e instanceof ContextStartedEvent) {
            applicationStartOrRefresh();
            if (systemLogger != null) {
                systemLogger.info("应用已开始");
            }             
        } else if (e instanceof ContextRefreshedEvent) {
            applicationStartOrRefresh();
            if (systemLogger != null) {
                systemLogger.info("应用已刷新");
            }             
        } else if (e instanceof ContextStoppedEvent) {
            if (systemLogger != null) {
                systemLogger.info("应用已暂停");
            } 
        } else if (e instanceof ContextClosedEvent) {
            if (systemLogger != null) {
                systemLogger.info("应用已关闭");
            }
        }
    }

    DoMysql DoMysql1 = new DoMysql();
    DoLog4j DoLog4j1 = new DoLog4j();
    DoXml DoXml1 = new DoXml();
    public static Logger systemLogger = null, databaseLogger = null, errorLogger = null, businessLogger = null;
    public static DoMysql.mysqlClass mysqlClass1;
    public static String webAppRootKey = "MvcRootDir";
    public static String usernameConfig = null, passwordConfig = null, usernameCookieNameConfig = null, passwordCookieNameConfig = null;
    public static Map<String,Session> websocketSessionMap = new HashMap();

    private void applicationStartOrRefresh(){
        
        //初始化log4j
        List<Logger> LoggerList = DoLog4j1.initLog4jByMultipleAppenderXml(webAppRootKey);
        systemLogger = LoggerList.get(0);
        databaseLogger = LoggerList.get(1);
        errorLogger = LoggerList.get(2);
        businessLogger = LoggerList.get(3);                  
            
        //初始化mysql  
        mysqlClass1 = DoMysql1.initMysqlByDefaultXml(System.getProperty(webAppRootKey)+"/WEB-INF/MyConfig/mysql.xml");
        if(mysqlClass1.getExceptionString()!=null){ 
            errorLogger.info("mysql初始化失败:" + mysqlClass1.getExceptionString());
        }        
        
        //读取帐号信息
        String[] nodeNameArr = new String[]{"username","password","usernameCookieName","passwordCookieName"};
        Object[] readResult = DoXml1.readFirstNodeValueByNodeName(System.getProperty(webAppRootKey)+"/WEB-INF/MyConfig/loginAccount.xml", nodeNameArr);
        if (readResult[1] != null) {
            errorLogger.info("帐号信息读取失败:" + (String) readResult[1]);
        }else{
            List<String> nodeValueList = (List<String>) readResult[0];
            usernameConfig = nodeValueList.get(0);
            passwordConfig = nodeValueList.get(1);
            usernameCookieNameConfig = nodeValueList.get(2);
            passwordCookieNameConfig = nodeValueList.get(3);
        }
        
        
    }
    

}
