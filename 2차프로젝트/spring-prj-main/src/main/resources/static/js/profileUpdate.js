window.onload = function() {
	inNav_ul($('#nav_ul'));
	console.log($('#nav_ul'));

	$('#btnDelete').css('cursor', 'pointer');
	$('#btnDelete').on('click', () => {
		$.get('/defaultProfileImg', data => {
			$('#imgThumb').attr('src', 'data:image/png;base64,' + data);
		});
	})
	//let tag2 = $('#imgThumb');
	// setProfile(tag1, tag2);
	$.get('/getProfileImg', data => {
		if (data != 'Crw=') {
			console.log("if실행됨");
			$('#imgThumb').attr('src', 'data:image/png;base64,' + data);
		}
		else {
			$('#imgThumb').attr('src', 'https://static.nid.naver.com/images/web/user/default.png?type=s160');
		}
	});

	$.get('/getUserInfo', data => {
		console.log(data.nickname)
		if (data.nickname != null)
			$('.inpNickname').val(data.nickname);
	});

	// 프로필
	$('#change-image-button, .btn_file, .profile_photo').on('click', () => openFileInput());
	document.getElementById("file-input").addEventListener("change", function() {
		var files = this.files;
		// 선택된 파일들을 처리하고 원하는 작업을 수행합니다.
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			console.log("첨부된 파일: ", file);

			// 이미지 파일인지 확인합니다.
			if (file.type.startsWith("image/")) {
				// 파일을 읽기 위한 FileReader 객체 생성
				var reader = new FileReader();

				// 파일 읽기가 완료되었을 때 실행되는 이벤트 핸들러
				reader.onload = function(e) {
					// 이미지 미리보기를 위해 이미지 요소에 파일 내용을 설정합니다.
					var imgPreview = document.getElementById("imgThumb");
					imgPreview.src = e.target.result;
				};
				// 파일을 읽습니다.
				reader.readAsDataURL(file);
			} else {
				alert("해당 파일은 이미지 파일이 아닙니다.");
				return;
			}
		}
	});

	$('#btnConfirm').on('click', () => confirm());

}

// function ajax(){
//   let url = "/pages/getUserInfo";
//   $.get('url', data => {
//     if(data != null) 
//       $('#imgThumb').attr('src', 'data:image/png;base64,' + blobToBase64(data));
//   });

//}


//제출
function confirm() {
	// 주어진 데이터
	const base64DataURI = $('#imgThumb').attr('src');
	const base64String = base64DataURI.split(",")[1];
	const blob = base64ToBlob(base64String, "image/png");


	// byteArray를 서버로 전송하거나 필요한 처리를 수행합니다.
	$.get('/getUserInfo', data => {
		const formData = new FormData();
		formData.append('profileimage', blob);
		formData.append('nickname', $('#inpNickname').val());
		formData.append('userid', data.userid);
		console.log(formData);
		$.ajax({
			url: '/updateProfile',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function(response) {
				alert("적용되었습니다.");
				location.href = "/profileUpdate";
			},
			error: function(xhr, status, error) {
				console.log(error);
			}
		});
	});
};


// nav
function inNav_ul(navUl) {
	navUl.append(makeUlItem("내프로필", "profileUpdate"));
	navUl.append(makeUlItem("정보수정", "updateInfo"));
	console.log("-----------------");
	console.log(navUl);
}

function makeUlItem(navName, aName) {
	var html = "<li><a href='http://localhost:9090//" + aName + "'>" + navName + "</a></li>";

	return html;
}

// 프로필
function openFileInput() {
	document.getElementById("file-input").click();
}



function base64ToBlob(base64String, type) {
	// base64 문자열을 디코딩하여 바이너리 데이터를 가져옵니다.
	const byteCharacters = atob(base64String);

	// 바이너리 데이터를 ArrayBuffer로 변환합니다.
	const arrayBuffer = new ArrayBuffer(byteCharacters.length);
	const byteArray = new Uint8Array(arrayBuffer);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteArray[i] = byteCharacters.charCodeAt(i);
	}
	// ArrayBuffer를 Blob으로 변환하여 반환합니다.
	return new Blob([arrayBuffer], { type });
}

function blobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const arrayBuffer = reader.result;
			const uint8Array = new Uint8Array(arrayBuffer);
			let binary = '';
			for (let i = 0; i < uint8Array.length; i++) {
				binary += String.fromCharCode(uint8Array[i]);
			}
			const base64String = window.btoa(binary);
			resolve(base64String);
		};
		reader.onerror = reject;
		reader.readAsArrayBuffer(blob);
	});
}
