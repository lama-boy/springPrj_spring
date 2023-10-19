package com.trickle.os.service;

import java.util.List;
import java.util.Random;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.trickle.os.dao.UserDao;
import com.trickle.os.vo.UserVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserDao userDao;
	private final JavaMailSender javaMailSender;
//	private final LoginDao loginDao;
	
	public List<UserVo> getUsers() {

		return userDao.getUsers();
	}


	public UserVo getUserInfo(String userid) {
		
		return userDao.getUserInfo(userid);
	}

	public void updateProfile(UserVo vo) {
		userDao.updateProfile(vo);
	}

	public String insertUser(UserVo vo){
		return userDao.insertUser(vo);
	}
	public boolean authUser(UserVo vo){
		return userDao.authUser(vo);
	}

	public String updateUser(UserVo vo){
		return userDao.updateUser(vo);
	}

	public String getProfileImg(String userid){
		return userDao.getProfileImg(userid);
	}
	public String getDefaultProfileImg(String userid){
		return userDao.getDefaultProfileImg(userid);
	}

	//mail 관련
	public String randomkey(String email){
		System.out.println("서비스실행됨");
		String randomkey = makeRandomKey();
		sendMessage(email, randomkey);
		return randomkey;
	}



	private String makeRandomKey(){
		String randomkey = "";
		Random random = new Random();

        for (int i = 0; i < 4; i++) {
            int randomNumber = random.nextInt(9) + 1;
			randomkey += String.valueOf(randomNumber);
        }
		return randomkey;
    }

	private void sendMessage(String email,String randomkey){
		
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		try{
			// 1. 메일 수신자 설정
			simpleMailMessage.setTo(email);
	
	
			// 2. 메일 제목 설정
			simpleMailMessage.setSubject("인증번호발송");
	
			// 3. 메일 내용 설정
			simpleMailMessage.setText(randomkey);
	
			// 4. 메일 전송
			javaMailSender.send(simpleMailMessage);
			} catch(Exception e){
				e.printStackTrace();
			}
	}
}