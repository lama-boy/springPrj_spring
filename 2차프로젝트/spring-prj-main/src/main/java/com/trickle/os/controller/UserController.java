package com.trickle.os.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.trickle.os.service.UserService;
import com.trickle.os.vo.UserVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
	
	@GetMapping("/")
    public String signUpForm(Model model) {
		model.addAttribute("user", userService.getUsers());
    	return "/pages/never";
    }
	
//    public List<UserVo> getUsers() {
//		return userDao.getUsers();
//    }
	@GetMapping("/user/list")
	@ResponseBody
	public List<UserVo> getUsers() {
		return userService.getUsers();
	}

	@RequestMapping("/login") 
	public String login() {
		
		return "pages/login";
	}	

	@RequestMapping("/search") 
	public ModelAndView search(@RequestParam String keyword) {
		ModelAndView mv = new ModelAndView("pages/search");
		
		return mv;
	}	


	@RequestMapping("/register")
	public ModelAndView register() {

		ModelAndView mv = new ModelAndView();
		
		
		mv.setViewName("pages/register");

		return mv;
	}

	@RequestMapping("/registerForm")
	public ModelAndView registerForm() {

		ModelAndView mv = new ModelAndView();

		mv.setViewName("pages/registerForm");

		return mv;

	}
	
	@RequestMapping("/blog")
	public ModelAndView blog() {
		ModelAndView mv = new ModelAndView("pages/blogHome");
		Map<String, Object> map = new HashMap<>();
		return mv;
	}
	
	
	@RequestMapping("/mypage")
	public ModelAndView mypage(HttpServletRequest request) {
		HttpSession session = request.getSession();
		UserVo vo = userService.getUserInfo(String.valueOf(session.getAttribute("userid")));
		System.out.println(session.getAttribute("userid"));
		System.out.println("mypage session");
		ModelAndView mv = new ModelAndView("pages/mypage");
		mv.addObject("vo", vo);
		
		
		return mv;
	}
	
	
	// 수정관련
	@RequestMapping("/profileUpdate")
	public ModelAndView profileUpdate(HttpServletRequest request, UserVo vo ) {
		HttpSession session = request.getSession();
		String userid = String.valueOf(session.getAttribute("userid"));
		
		vo = userService.getUserInfo(userid);
		
		ModelAndView mv = new ModelAndView("pages/profileUpdate");
		mv.addObject("vo", vo);
		return mv;
	}
	
	
	@RequestMapping("/updateInfo")
	public ModelAndView updateInfo(HttpServletRequest request) {
		HttpSession session = request.getSession();
		String userid = String.valueOf(session.getAttribute("userid"));
		UserVo vo = userService.getUserInfo(userid);
		
		
		ModelAndView mv = new ModelAndView("pages/updateInfo");
		mv.addObject("vo", vo);
		
		return mv;
	}

	@RequestMapping("/updateUserInfo")
	public String updateUserInfo() {
		return "pages/mypage";
	}
	

	@RequestMapping("/updateForm")
	public String updateForm(){
		return "pages/updateForm";
	}

	@RequestMapping("/logout")
	public String logout(HttpSession session){
		session.invalidate();
		return "redirect:/";
	}
}