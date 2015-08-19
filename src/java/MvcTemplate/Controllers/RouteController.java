/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author anshifafeng
 */
@Controller
public class RouteController {

    @RequestMapping(value = {"{controller}/{action}"})
    public String defaultWebSite(@PathVariable String controller,@PathVariable String action) {
        return "/"+controller+"/"+action;
    }

}
