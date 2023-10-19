window.onload = function() {
  $('#myProfileBtn')[0].addEventListener('click', e => btnClicked());
  $('iframe').on('click', outsideClickHandler);
}

function btnClicked() {
  let a = '<iframe src="http://localhost:9090/myProfile" style="background: transparent; overflow: hidden; scrollbar-width: none; -ms-overflow-style: none;"></iframe>';
  $('#profile_header').html(a);
}

function outsideClickHandler(event) {
	if (!$('iframe').is(event.target) && !$('iframe').has(event.target).length) {
		$('iframe').remove();
		console.log("클릭됨");
	}
}