/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Models;

import MyJavaLibrary.DoCode;
import MyJavaLibrary.DoXml;
import java.util.List;

/**
 *
 * @author anshifafeng
 */
public class AccountModel {
    
    DoCode DoCode1 = new DoCode();
    DoXml DoXml1 = new DoXml();
    
    /**
     * 登录
     * @param username 用户名
     * @param password 密码
     * @return 成功返回null,失败返回异常信息
     */
    public String doLogin(String username,String password){
         String[] nodeNameArr = new String[]{"username","password"};
         String xmlPath = System.getProperty("webAppMvcRootDir");
         Object[] readResult = DoXml1.readFirstNodeValueByNodeName(xmlPath+"/WEB-INF/MyConfig/loginAccount.xml", nodeNameArr);
        if (readResult[1] != null) {
            return (String)readResult[1];
        } else {
            List<String> nodeValueList = (List<String>) readResult[0];
            String usernameConfig = nodeValueList.get(0);
            String passwordConfig = nodeValueList.get(1);
            if (username.equals(usernameConfig) && password.equals(passwordConfig)) {
                return null;
            } else {
                return "errorAccount";
            }        
        }
         
    }
}
