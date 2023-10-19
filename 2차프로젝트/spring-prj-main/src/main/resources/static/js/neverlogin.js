window.onload = function() {
	document.querySelectorAll('.input_row').forEach(e => {
		//setFocus(e);
		e.addEventListener('click',function(){
			setFocus(e);
		})
	});
	
	
}

function setFocus( btn ){
	if(btn != document.activeElement){
		if(document.querySelector('.focus') != null){
			document.querySelector('.focus').classList.remove('focus');
		}
		btn.classList.add('focus');
	}else if(btn == document.activeElement){
	}
}

