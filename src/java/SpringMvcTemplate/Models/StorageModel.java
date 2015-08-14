/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SpringMvcTemplate.Models;

import MyJavaLibrary.DoMysql;
import SpringMvcTemplate.Global.Global;

/**
 *
 * @author anshifafeng
 */
public class StorageModel {
    
    DoMysql DoMysql1 = new DoMysql();
    
    public String storageToMysql(String ip,int port,String agentId,String type){
        String sqlCommand = "insert into "+type+" set ip='"+ip+"',port="+String.valueOf(port)+",agentid='"+agentId+"',time=now()";
        String alterResult = DoMysql1.doMysqlAlter(Global.mysqlConnectionClass1, sqlCommand);
        return alterResult;
    }
    
}
