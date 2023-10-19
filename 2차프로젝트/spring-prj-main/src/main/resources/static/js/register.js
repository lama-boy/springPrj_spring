window.onload = function() {
	
	$('#imgsrc').css('cursor','pointer');
	$('#imgsrc').on('click', () => {
		window.location.href = "/";
	})
	
	// cont 채우기
	createCont();
	// "checkAll" 체크박스의 변경 이벤트 핸들러
	$('#checkAll').change(function() {
		// 모든 "checkbox" 클래스를 가진 요소들의 체크 상태를 "checkAll" 체크박스와 동일하게 설정
		$('.checkbox').prop('checked', $(this).prop('checked'));
	});
	// "checkbox" 클래스를 가진 요소의 변경 이벤트 핸들러
	$('.checkbox').change(function() {
		// 모든 "checkbox" 클래스를 가진 요소들이 체크되어 있는지 확인
		var allChecked = $('.checkbox:checked').length === $('.checkbox').length;
		// "checkAll" 체크박스의 체크 상태를 모든 "checkbox" 요소들의 체크 여부에 따라 설정
		$('#checkAll').prop('checked', allChecked);
	});
	


}


function createCont() {
	$.get('/getAgreeForm', function(data) {
		console.log(data);
		data.forEach(e => {
			let agreementDiv = new AgreementDiv();
			let header = '<input type="checkbox" class="checkbox childs"><p class="agree_header">' + e.header + '</p>';
			if (e.body != null) {
				let body = e.body;
				agreementDiv.addCont(header, body);
			}
		});
	}).fail(function() {
		console.log('Request failed.');
	});
}	

class AgreementDiv {
	constructor() {
		this.div = $('<div class="agreementDiv">');
		$('#container').append(this.div);
		
	}
	
	addCont(header, body) {
		console.log('실행됨');
		console.log($('#container'));
		let headerDiv = $('<div class="headerDiv">');
		let bodyDiv = $('<textarea>', {
			readonly: 'readonly',
			class : 'textBox'
		});
		this.div.append(headerDiv);
		headerDiv.html(header);
		headerDiv.css('display', 'flex');
		if (body != null) {
			bodyDiv.val(body);
			this.div.append(bodyDiv);
		}
	}
}

function btnCancel(){
	location.href = "/";
}
function btnOk(){
	var checkboxes = $('.checkbox');
	var checkedCount = 0;

	checkboxes.each(function() {
  	if ($(this).prop('checked')) {
	    checkedCount++;
  	}
	});

	if (checkedCount >= 3 || $('#checkAll').prop('checked')) {
  		location.href = "/registerForm";
	} else {
  		alert('약관에 동의하지 않으셨습니다.');
  		return;
	}
}