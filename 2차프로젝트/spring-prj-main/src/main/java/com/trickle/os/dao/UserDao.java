package com.trickle.os.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;
import java.util.Base64;

import com.trickle.os.vo.UserVo;

@Repository
public class UserDao {
	
	private final SqlSession sqlSession;
	
	public UserDao(SqlSessionFactory sqlSessionFactory) {
		this.sqlSession = new SqlSessionTemplate(sqlSessionFactory);
	}
	public List<UserVo> getUsers() {
		return sqlSession.selectList("UserMapper.getUsers");
	}
	public UserVo getUserInfo(String userid) {
		System.out.println(userid);
		return sqlSession.selectOne("UserMapper.getUserInfoById", userid);
	}
	public UserVo getUserInfo(UserVo vo) {
		return sqlSession.selectOne("UserMapper.getUserInfo", vo);
	}
	public void updateProfile(UserVo vo) {
		sqlSession.update("UserMapper.updateProfile", vo);
	}
	
	public String insertUser(UserVo vo) {
		String bool = "false";
		String id = vo.getUserid();
		if(sqlSession.selectOne("UserMapper.userIdCheck",id) == null){
			bool = "true";
		}
		if(bool.equals("true")){
			sqlSession.insert("UserMapper.userInsert",vo);
		}

		return bool;
	}
	public boolean authUser(UserVo vo){
		if(sqlSession.selectOne("UserMapper.authUser", vo) != null){
			return true;
		}else{
			return false;
		}
	}
	
	public String updateUser(UserVo vo){
		String bool = "false";
		UserVo newvo = sqlSession.selectOne("UserMapper.authUser", vo);
		if(newvo == null){
			bool = "true";
			sqlSession.update("updateUserINfo",vo);
		}

		return bool;
	}

	public String getProfileImg(String userid){
		byte[] bytearr = sqlSession.selectOne("UserMapper.profileImg",userid);
		if(bytearr == null || bytearr.length == 0) return null;
		String profileImg = byteToBase64(bytearr);
		return profileImg;
	}

	public String getDefaultProfileImg(String userid){
		byte[] bytearr = sqlSession.selectOne("UserMapper.defaultImg",userid);
		String profileImg = byteToBase64(bytearr);
		System.out.println("daoooooooooooooooo");
		System.out.println(profileImg);
		return profileImg;
	}

	private String byteToBase64(byte[] byteArr) {
		String base64String = Base64.getEncoder().encodeToString(byteArr);
		return base64String;
	}


}
