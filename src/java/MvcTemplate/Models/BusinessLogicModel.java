/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Models;

/**
 *
 * @author anshifafeng
 */
public class BusinessLogicModel {
    
    /**
     * 根据参数构建具体的业务逻辑
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @param key 业务逻辑的标识
     * @return 返回mysql执行的完整语句
     */
    public String buildSqlCommand(String startTime, String endTime, String key) {
        String sqlCommand = "";
        switch (key) {
            //在此增加具体业务逻辑
            case "test":
                sqlCommand = "select * from test where date(inserttime)>=\""+startTime+"\" and date(inserttime)<=\""+endTime+"\"";
                break;
        }
        return sqlCommand;
    }
    
}
