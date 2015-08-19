package MvcTemplate.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import MvcTemplate.Models.AccountModel;
import MyJavaLibrary.DoServletContext;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author anshifafeng
 */
@Controller
@SessionAttributes("session")
@RequestMapping(value = "/Account")
public class AccountController {
    
    AccountModel AccountModel1 = new AccountModel();
    DoServletContext DoServletContext1 = new DoServletContext();
    
    @ResponseBody
    @RequestMapping(value="/DoLogin")
    public String doLogin(HttpServletRequest request,HttpSession session){
        String result = null;
        String username = DoServletContext1.getRequestPara(request, "username");
        String password = DoServletContext1.getRequestPara(request, "password");
        String loginResult = AccountModel1.doLogin(username, password);
        if (loginResult == null) {
            session.setAttribute("username", username);
            result = "{\"success\":\"true\",\"message\":\"\"}";
        } else {
            result = "{\"success\":\"false\",\"message\":\"errorAccount\"}";
        }
        return result;


    }
    
    @RequestMapping(value="/DoLogout")
    public String doLogout(HttpSession session){          
        session.setAttribute("username", null);
        return "login"; 
    }
    
}
