window.onload = function() {
	$('img').on('click', ()=>{
		window.location.href = "/";
	})
	
}


function btnOk() {
	var id = document.getElementById("id").value;
	var pw = document.getElementById("pw").value;

	if (id === "") {
		alert("아이디를 입력하세요.");
		return;
	} else if (pw === "") {
		alert("비밀번호를 입력하세요.");
		return;
	}

	/*if (iderror.style.color === "red") {
		alert("사용 불가능한 아이디입니다.");
		return;
	}*/

	// 이 부분에서 서버로 가입 요청을 보내는 코드를 작성합니다.
	var formData = $("form").serializeArray();
	console.log(formData);
	
	var formDatas = {
		userid: id,
		password: pw
	};
	console.log(formDatas);

	$.post('/accountCheck', formDatas).done(bool => {
		if (bool == "true")
			location.href = "/";
		else
			alert('아이디나 비밀번호가 일치하지 않습니다.');
			return;
	}).fail(function() {
		console.log('Request failed.');
	});
}
