package com.trickle.os.vo;

import lombok.*;

@Getter
@Setter
@ToString
public class UserVo {
	private String userid;
	private String password;
	private String username;
	private String email;
	private String indate;
	private String mobile;
	private String nickname;
	private byte[] profileimage;
}
