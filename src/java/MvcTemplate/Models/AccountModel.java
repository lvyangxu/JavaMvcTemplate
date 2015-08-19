/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Models;

import MvcTemplate.Global.Global;
import MyJavaLibrary.DoDataTranslation;
import MyJavaLibrary.DoServletContext;
import MyJavaLibrary.DoXml;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author anshifafeng
 */
public class AccountModel {
    
    DoDataTranslation DoDataTranslation1 = new DoDataTranslation();
    DoXml DoXml1 = new DoXml();
    DoServletContext DoServletContext1 = new DoServletContext();
    
    /**
     * 登录
     * @param username 用户名
     * @param password 密码
     * @return 成功返回null,失败返回异常信息
     */
    public String doLogin(String username, String password) {
        if (username.equals(Global.usernameConfig) && password.equals(Global.passwordConfig)) {
            return null;
        } else {
            return "errorAccount";
        }
    }
    
    /**
     * 检查session是否失效,失效后自动执行重新登录
     * @param session HttpSession对象
     * @param request HttpServletRequest对象
     * @return 成功返回null,登录出现异常返回relogin
     */
    public String checkLogin(HttpSession session, HttpServletRequest request) {
        if (session.getAttribute("username") == null) {
            String account = DoServletContext1.getCookie(request, Global.usernameCookieNameConfig);
            account = DoDataTranslation1.base64Decode(account);
            String password = DoServletContext1.getCookie(request, Global.passwordCookieNameConfig);
            password = DoDataTranslation1.base64Decode(password);
            String loginResult = doLogin(account, password);
            if (loginResult != null) {
                return "relogin";
            }
        }
        return null;
    }
}
