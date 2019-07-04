package com.ydtf.soam.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import springfox.documentation.annotations.ApiIgnore;

@Controller
@ApiIgnore
public class PageController {

	@RequestMapping(value = "/api", method = RequestMethod.GET)
	public String api( Model model ) {
			return "redirect:/swagger-ui.html";
	}

}
