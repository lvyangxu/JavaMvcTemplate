/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Controllers;

import MvcTemplate.Global.Global;
import MvcTemplate.Models.SqlModel;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author anshifafeng
 */
@Controller
@RequestMapping("/click")
public class SqlController {
    
    SqlModel StorageModel1 = new SqlModel();
    
    @ResponseBody
    @RequestMapping("/pageBrowse/{agentId:[0-9a-zA-Z]{1,10}}")
    public String pageBrowse(HttpServletRequest request,@PathVariable String agentId) {
        String ip = request.getRemoteAddr();
        int port = request.getRemotePort();
        String url = request.getRequestURI();
        String sqlResult = StorageModel1.storageToMysql(ip, port, agentId, "pagebrowse");
        if (sqlResult != null) {
            Global.errorLogger.info("mysql插入失败:" + sqlResult);
        } else {
            Global.businessLogger.info("mysql插入成功：" + url + ",ip=" + ip + ",port=" + String.valueOf(port));
        }                
        return "";
    }
    
    @ResponseBody
    @RequestMapping("/buttonClick/{agentId:[0-9a-zA-Z]{1,10}}")
    public String buttonClick(HttpServletRequest request, @PathVariable String agentId) {
        String ip = request.getRemoteAddr();
        int port = request.getRemotePort();
        String url = request.getRequestURI();
        String sqlResult = StorageModel1.storageToMysql(ip, port, agentId, "buttonclick");
        if (sqlResult != null) {
            Global.errorLogger.info("mysql插入失败:" + sqlResult);
        } else {
            Global.businessLogger.info("mysql插入成功：" + url + ",ip=" + ip + ",port=" + String.valueOf(port));
        }                

        
        return "";
    }

    @ResponseBody
    @RequestMapping("/elseClick/{agentId:[0-9a-zA-Z]{1,10}}")
    public String elseClick(HttpServletRequest request, @PathVariable String agentId) {
        String ip = request.getRemoteAddr();
        int port = request.getRemotePort();
        String url = request.getRequestURI();                
        String sqlResult = StorageModel1.storageToMysql(ip, port, agentId, "elseclick");
        if (sqlResult != null) {
            Global.errorLogger.info("mysql插入失败:" + sqlResult);
        } else {
            Global.businessLogger.info("mysql插入成功：" + url + ",ip=" + ip + ",port=" + String.valueOf(port));
        }                
        return "";
    }
}
