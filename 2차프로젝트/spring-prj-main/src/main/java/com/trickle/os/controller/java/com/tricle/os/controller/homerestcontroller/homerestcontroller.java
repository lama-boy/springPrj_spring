package com.trickle.os.controller.java.com.tricle.os.controller.homerestcontroller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.trickle.os.service.UserService;
import com.trickle.os.vo.UserVo;

@RestController
@SessionAttributes("user")
public class homerestcontroller {

	public static final String OS_HOST = "http://192.168.0.213:8092/os";

	@Autowired
	private UserService userService;


	 @RequestMapping("/getAgreeForm")
	 public List<Map<String, String>> agreeForm(){
	 //List<String> list = userService.getAgreeForm();
		 List<Map<String, String>> list = new ArrayList<>();

	        Map<String, String> item1 = new HashMap<>();
	        item1.put("header", "약관에 동의합니다.");
	        item1.put("body", "약관이에요");
	        list.add(item1);

	        Map<String, String> item2 = new HashMap<>();
	        item2.put("header", "약관에 동의합니다.");
	        item2.put("body", "약관이에요2");
	        list.add(item2);

	        Map<String, String> item3 = new HashMap<>();
	        item3.put("header", "약관에 동의합니다.");
	        item3.put("body", "약관이에요3");
	        list.add(item3);
	        
	        return list; 
	 }

	 @RequestMapping("/insertUser")
	 public String insertUser(UserVo vo) {
		 return userService.insertUser(vo);
	 }
	 
	 @RequestMapping("/accountCheck")
	 public String accountCheck(UserVo user, Model model, HttpSession session) {
		 System.out.println(user);
		 boolean bool = userService.authUser(user);
		 System.out.println(bool);
		 if(bool){
		 	session.setAttribute("userid", user.getUserid());	
		 	session.setAttribute("nickname", user.getNickname());	
		}
		 return String.valueOf(bool);
	 }
	 

	 @RequestMapping("/getUserInfo")
	 public UserVo getUserInfo(HttpServletRequest request){
		HttpSession session = request.getSession();
		System.out.println("session " + session.getAttribute("userid"));
		UserVo vo = userService.getUserInfo(String.valueOf(session.getAttribute("userid")));
		System.out.println(vo);
		return vo;
	 }

	 @RequestMapping("/getProfileImg")
	 	public String getProfileImg(HttpServletRequest request){
			HttpSession session = request.getSession();
			String userid = String.valueOf(session.getAttribute("userid"));
			System.out.println(userid);
			String image = userService.getProfileImg(userid);
			System.out.println("아아");
			return image;
	}

	 @RequestMapping("/defaultProfileImg")
	 	public String defaultProfileImg(HttpServletRequest request){
			HttpSession session = request.getSession();
			String userid = String.valueOf(session.getAttribute("userid"));
			String image = userService.getDefaultProfileImg(userid);
			return image;
	}

	@RequestMapping("/updateProfile")
	public void updateProfile(String nickname, String userid, MultipartFile profileimage){
		UserVo vo = new UserVo();
		vo.setUserid(userid);
		vo.setNickname(nickname);
		try {
			byte[] byteArray = profileimage.getBytes();
			vo.setProfileimage(byteArray);
		} catch (IOException e) {
			e.printStackTrace();
		} 
		System.out.println(vo.getProfileimage());
		System.out.println(vo.getUserid());
		System.out.println(vo.getNickname());
		userService.updateProfile(vo);
	}

		/*
		 * @RequestMapping("/myProfile") public ModelAndView
		 * myProfile(HttpServletRequest request) { HttpSession session =
		 * request.getSession(); ModelAndView mv = new
		 * ModelAndView("redirect:/static/html/myProfile.html");
		 * if(session.getAttribute("userid") != null) {
		 * mv.addObject(session.getAttribute("userid")); } return mv; }
		 */

	@RequestMapping(value="/getPagingItems", produces = "text/plain; charset=utf8")
	@ResponseBody
	public String getItems(String path, long rowCount, long maxPage, long nowPage) {
		RestTemplate restTemplate = new RestTemplate();
		System.out.println(nowPage);
		System.out.println(rowCount);
		System.out.println(path);
		System.out.println(maxPage);
		String url = OS_HOST+"/getItems?path="+path+"&rowCount="+rowCount+"&maxPage="+maxPage+"&nowPage="+nowPage;
		return restTemplate.getForObject(url, String.class);
	}
	
	@RequestMapping(value="/getMenus", produces = "text/plain; charset=utf8")
	@ResponseBody
	public String getMenus() {
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate.getForObject(OS_HOST+"/getMenus", String.class);
	
	}

	@RequestMapping("/sendMail")
	public String sendMail(@RequestParam("email") String email){
		System.out.println(email);
		String randomkey = userService.randomkey(email);

		return randomkey;
	}

}














