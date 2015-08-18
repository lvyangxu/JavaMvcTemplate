/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Models;

import MyJavaLibrary.DoMysql;
import MvcTemplate.Global.Global;
import java.util.List;

/**
 *
 * @author anshifafeng
 */
public class GetDataModel {
    
    DoMysql DoMysql1 = new DoMysql();
    
    public List<List<String>> getData(String startTime,String endTime,String type){
        String sqlCommand = "select count(ip),count(distinct ip),count(distinct ip+\":\"+port),date(time),agentid from "+type+" where date(time)>='"+startTime+"' and date(time)<='"+endTime+"' group by date(time),agentid";
        Object[] selectResult = DoMysql1.doMysqlSelect(Global.mysqlConnectionClass1, sqlCommand);
        if (selectResult[1] != null) {
            Global.errorLogger.info("mysql查询失败:" + sqlCommand);
            return null;
        }
        List<List<String>> result = (List<List<String>>)selectResult[0];
        return result;
    }
    
}
