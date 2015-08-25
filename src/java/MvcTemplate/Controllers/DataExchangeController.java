/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Controllers;

import MvcTemplate.Models.AccountModel;
import MvcTemplate.Models.BusinessLogicModel;
import MvcTemplate.Models.SqlModel;
import MyJavaLibrary.DoFileUpload;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.jdbc.object.SqlCall;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

/**
 *
 * @author anshifafeng
 */
@Controller
@SessionAttributes("session")
@RequestMapping(value = "/DataExchange")
public class DataExchangeController {
    
    AccountModel AccountModel1 = new AccountModel();
    SqlModel SqlModel1 = new SqlModel();
    BusinessLogicModel BusinessLogicModel1 = new BusinessLogicModel();
    DoFileUpload DoFileUpload1 = new DoFileUpload();
    
    @ResponseBody
    @RequestMapping(value = "/GetData/{startTime}/{endTime}/{key}")
    public String getData(@PathVariable String startTime,@PathVariable String endTime,@PathVariable String key, HttpSession session, HttpServletRequest request) {
        String checkResult = AccountModel1.checkLogin(session, request);
        if (checkResult != null) {
            return checkResult;
        }
        
        //此处为具体业务逻辑
        String sqlCommand = BusinessLogicModel1.buildSqlCommand(startTime, endTime, key);
        
        String result = SqlModel1.doSelect(sqlCommand);
        return result;
    }
    
    @ResponseBody
    @RequestMapping(value = "/Upload")    
    public String upload(HttpServletRequest request, HttpServletResponse response,HttpSession session){
        String checkResult = AccountModel1.checkLogin(session, request);
        if (checkResult != null) {
            return checkResult;
        }
        
        
        String fileUploadResult = DoFileUpload1.springMvcFileUpload(request, response, "Upload/");
        if(fileUploadResult==null){
            return "{\"success\":\"true\"}";
        }else{
            return "{\"success\":\"false\"}";
        }
    }
    
}
