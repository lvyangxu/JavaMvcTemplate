/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Controllers;

import MvcTemplate.Models.AccountModel;
import MvcTemplate.Models.BusinessLogicModel;
import MvcTemplate.Models.SqlModel;
import javax.servlet.http.HttpServletRequest;
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
    
    @ResponseBody
    @RequestMapping(value = "/getData/{startTime}/{endTime}/{key}")
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
    
}
