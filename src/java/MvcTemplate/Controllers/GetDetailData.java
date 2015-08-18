/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Controllers;

import MvcTemplate.Models.GetDataModel;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
@RequestMapping("/GetDetailData")
@SessionAttributes("session")
public class GetDetailData {
    
    GetDataModel GetDataModel1 = new GetDataModel();
    
    @ResponseBody
    @RequestMapping("/{startTime}/{endTime}/{tableId}")
    public String GetDetailData(@PathVariable String startTime,@PathVariable String endTime,@PathVariable String tableId,HttpSession session,HttpServletRequest request){
        
        if(session.getAttribute("username")==null){
            return "relogin";
        }
        
        List<List<String>> result = new ArrayList<>();
        StringBuilder StringBuilder1 = new StringBuilder();
        String table = "";
        switch(tableId){
            case "data1":
                table = "pagebrowse";
                break;
            case "data2":
                table = "buttonclick";
                break;
            case "data3":
                table = "elseclick";
                break;                
                
        }
        
        
        
        result = GetDataModel1.getData(startTime, endTime, table);
        if (result == null) {
            return "[]";
        }
        StringBuilder1.append("[");
        for (int i = 0; i < result.size(); i++) {
            StringBuilder1.append("{\"id\":\"").append(result.get(i).get(3)).append("\",\"num1\":\"").append(result.get(i).get(0)).append("\",\"num2\":\"").append(result.get(i).get(1)).append("\",\"num3\":\"").append(result.get(i).get(2)).append("\",\"agentid\":\""+result.get(i).get(4)+"\"}");
            StringBuilder1.append(",");
        }
        
        //移除最后的逗号
        if (StringBuilder1.length() >= 1 && StringBuilder1.substring(StringBuilder1.length() - 1).equals(",")) {
            StringBuilder1 = StringBuilder1.deleteCharAt(StringBuilder1.length() - 1);
        };
        StringBuilder1.append("]");
        return StringBuilder1.toString();
    
    }
}
