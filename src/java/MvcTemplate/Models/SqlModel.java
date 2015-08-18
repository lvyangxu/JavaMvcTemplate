/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Models;

import MyJavaLibrary.DoMysql;
import MvcTemplate.Global.Global;

/**
 *
 * @author anshifafeng
 */
public class SqlModel {
    
    DoMysql DoMysql1 = new DoMysql();
    
    /**
     * sql更新模型
     * @param sqlCommand
     * @return 
     */
    public String doUpdate(String sqlCommand){
        String alterResult = DoMysql1.doMysqlAlter(Global.mysqlConnectionClass1, sqlCommand);
        return alterResult;    
    }

    /**
     * sql查询模型
     * @param sqlCommand
     * @return
     */
    public Object[] doSelect(String sqlCommand) {
        Object[] alterResult = DoMysql1.doMysqlSelect(Global.mysqlConnectionClass1, sqlCommand);
        return alterResult;
    }
    
}
