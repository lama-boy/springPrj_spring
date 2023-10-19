window.onload = function() {

	$('#headerImg').on('click',()=>{
		window.location.href = "/";
	})
	$('#sendMail').css('cursor','pointer');
	$('#sendMail').css('border','1px solid black');
	$('#sendMail').css('border-radius','10px');
	$('#sendMail').css('width','80px');
	$('#sendMail').css('padding','5px');
	$('#sendMail').css('margin-bottom','7px');
	$('#sendMail').css('margin-left','10px');
	$('#authmail').css('height','30px');
	$('#authmail').css('border-radius','5px');
	$('#authmail').css('border','1px solid black');
	$('#authmail').css('height','30px');
	$('#sendMail').on('click', () => {
    let email = $('#email').val();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("올바른 이메일 주소 형식이어야 합니다.");
      return;
    }	else {
      console.log(email)
      $.get('/sendMail', { email: email }, data => {
          alert("인증 메일을 발송 했습니다. " + email)
          console.log(data);
          $('#hidden').val(data);
      });
    }
	});
	$('#btnok').css('cursor','pointer');
	$('#btnok').css('border','1px solid black');
	$('#btnok').css('border-radius','10px');
	$('#btnok').css('width','40px');
	$('#btnok').css('margin-top','15px');
	$('#btnok').css('margin-left','15px');
	$('#btnok').css('padding','5px');
	$('#btnok').css('padding-left','10px');
	$('#btnok').on('click',()=>{
		if($('#hidden').val() != $('#authmail').val()){
			alert("인증번호가 잘못되었습니다.");
			return;
		}else{
			$('#hidden').attr('class',"collect");
			alert("인증완료.");
		}
	})

}

function join() {
	var id = document.getElementById("id").value;
	var pw = document.getElementById("pw").value;
	var pwconfirm = document.getElementById("pwconfirm").value;
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var mobile = document.getElementById("mobile").value;
	var iderror = document.getElementById('iderror');
	var registerButton = document.getElementById('register-button');
	
	if (!/^[a-zA-Z0-9]+$/.test(id)) {
		alert("아이디는 영어와 숫자로만 이루어져야 합니다.");
		return;
	}
	
	// 비밀번호에 대한 정규식 체크
	if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
			.test(pw)) {
		alert("비밀번호는 영어 대문자, 소문자, 특수문자, 숫자를 각각 하나 이상씩 사용하는 8자리 이상의 문자열이어야 합니다.");
		return;
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		alert("올바른 이메일 주소 형식이어야 합니다.");
		return;
	}
	if (id === "" || pw === "" || pwconfirm === "" || name === ""
		|| email === "" || mobile === "") {
		alert("필수 항목을 모두 입력하세요.");
		return;
	} else if (pw != pwconfirm) {
		alert("비밀번호가 일치하지 않습니다.");
		return;
	}
	
	if(iderror.style.color == 'red'){
		alert("사용 불가능한 아이디입니다.");
		return;
	}

	if($('#hidden').attr('class') != 'collect'){
		alert('인증번호가 일치하지 않습니다.');
		return;
	}
	

	// 이 부분에서 서버로 가입 요청을 보내는 코드를 작성합니다.
	var formData = {
			userid: id,
			password: pw,
			username: name,
			email: email,
			mobile: mobile
	};
	console.log(formData);
	$.post('/insertUser', formData)
	  .done(function(data) {
		if(data == "true")
	    	location.href = "/";
		else
			alert("사용중인 아이디입니다.");
			return;
	  })
	  .fail(function() {
	    console.log('Request failed.');
	  });
}
