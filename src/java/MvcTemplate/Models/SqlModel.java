/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Models;

import MyJavaLibrary.DoMysql;
import MvcTemplate.Global.Global;
import MyJavaLibrary.DoDataTranslation;
import java.sql.ResultSet;

/**
 *
 * @author anshifafeng
 */
public class SqlModel {
    
    DoMysql DoMysql1 = new DoMysql();
    DoDataTranslation DoDataTranslation1 = new DoDataTranslation();
    
    /**
     * sql更新模型
     * @param sqlCommand
     * @return 
     */
    public boolean doUpdate(String sqlCommand){
        boolean alterResult = DoMysql1.doMysqlAlter(Global.mysqlClass1, sqlCommand);
        return alterResult;    
    }

    /**
     * sql查询模型
     * @param sqlCommand
     * @return
     */
    public String doSelect(String sqlCommand) {
        String result = DoMysql1.doMysqlSelectToJson(Global.mysqlClass1, sqlCommand);
        return result;
    }
    
}
