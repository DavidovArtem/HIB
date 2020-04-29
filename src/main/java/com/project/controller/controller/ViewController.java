package com.project.controller.controller;


import com.project.service.abstraction.FormLoginErrorMessageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;


@Controller
@AllArgsConstructor
public class ViewController {

    FormLoginErrorMessageService messageService;

    @GetMapping({"/home", "/profile/**", "/category/**", "/shopping-cart"})
    public String getHomePage() {
        return "/user/user";
    }

    @GetMapping("/")
    public String redirectToHome() {
        return "redirect:/home";
    }

    @GetMapping("/page/{id}")
    public ModelAndView getPage(@PathVariable("id") long id, ModelAndView modelAndView) {
        modelAndView.addObject("book", id);
        modelAndView.setViewName("/user/user");
        return modelAndView;
    }

    @GetMapping("/translate")
    public String getTranslatePage() {
        return "translate";
    }

    @GetMapping("/search")
    public ModelAndView getSearchResultPage(@RequestParam("request") String req, ModelAndView modelAndView) {
        modelAndView.addObject("request", req);
        modelAndView.setViewName("search");
        return modelAndView;
    }

}

