/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SpringMvcTemplate.Controllers;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 *
 * @author anshifafeng
 */
@Controller
public class DefaultController {

    @RequestMapping(value = {"{viewName}"})
    public String defaultWebSite(@PathVariable String viewName) {
        return "/"+viewName;
    }
    

    
    @RequestMapping(value = {"/index{landPageNum:[0-9]+}"})
    public ModelAndView indexWebSite(@PathVariable String landPageNum) {
        Map model = new HashMap();
        model.put("landPageNum", landPageNum);
        ModelAndView ModelAndView1 = new ModelAndView("index",model);
        return ModelAndView1;
    }
}
