/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Global;

import MyJavaLibrary.DoLog4j;
import MyJavaLibrary.DoMysql;
import java.util.List;
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
    public static Logger systemLogger = null, databaseLogger = null, errorLogger = null, businessLogger = null;
    public static DoMysql.mysqlClass mysqlClass1;

    private void applicationStartOrRefresh(){
        //初始化log4j
        List<Logger> LoggerList = DoLog4j1.initLog4jByMultipleAppenderXml("webAppMvcRootDir");
        systemLogger = LoggerList.get(0);
        databaseLogger = LoggerList.get(1);
        errorLogger = LoggerList.get(2);
        businessLogger = LoggerList.get(3);                  
           
        //初始化mysql  
        mysqlClass1 = DoMysql1.initMysqlByDefaultXml(System.getProperty("webAppMvcRootDir")+"/WEB-INF/MyConfig/mysql.xml");
        if(mysqlClass1.getExceptionString()!=null){ 
            errorLogger.info("mysql初始化失败:" + mysqlClass1.getExceptionString());
        }        
    }
    

}
