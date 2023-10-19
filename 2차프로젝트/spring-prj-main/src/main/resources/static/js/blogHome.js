window.onload = function(){
	//blog login
	// hotTopic 관련
	// hotTopic Header
	
	// hotTopic body
	let hotTopicCont = document.querySelector('#hotTopicContWrapper');
	hotTopicCont.style.width = "100%";
	hotTopicCont.style.height = "270px";
	let data = [];
	let maxRow = 0;
	/*putItems(hotTopicCont , data, 3);*/
	
	// hotTopic 배치
	let hotTopicRowDiv = [];
	const col = 3;
	class hotTopicContDiv{
		constructor(i){
			this.div = $('<div class = "item-div"></div>');
			$('hotTopicContWrapper').append(this.div);
			hotTopicRowDiv.push(this.div);
		}
		
		addData(data){
			const div = $("<div class = 'data-div'>");
			data.forEach(e => {
				div.text('<div class = "data-title">' + e.title + '</div>');
				div.text('<div class = "data-writer">' + e.writer + '</div>');
				div.text('<div class = "data-cont">' + e.cont + '</div>');
			})
			this.div.append(div);
		}
	}
	//<style> .data-title { font-weight : bold; display : none; width : 300px; float:left;}
	//		  .data-writer{ // 내용}
	//		  .data-cont  { // 내용}
	//<style>
	let divIdx = 0;
	
	for (var i = 0; i < data.length; i++) {
		addData(data[i]);
	}
	
	// blog 게시물 (leftBody)
	$('#leftBody').css('width', '100%');
	$('#leftBody').css('height', '750px');
	$('#leftBody').css('overflow', 'hidden');
	tagForOverFlow($('#leftBody')[0] , 750 ,3 , data , "blogPosts");
	let dataLength = data.length;
	//펼쳐보기
	$('#itemsBtn').on('click', function(){
		dataLength -= 3;
		btnClick($('#leftBody')[0].style.height , dataLength);
	});

	let currentDiv = document.querySelector('.rowDiv0');
	$('.toggle_btn').each(function(index, element) {
		element.addEventListener('click', function(event) {
			swapDiv(event, currentDiv, $('.hotTopicCont'), maxRow);
		});
	});
	
	

	
	
}

function move(d){
	items[divIdx].div.css("display","none");
	divIdx += d;
	if(divIdx<0) divIdx = items.length - 1;
	if(divIdx >= items.length) divIdx = 0;
	items[divIdx].div.css('display','block');
}




/*for (var i = 0; i < data.length; i++) {
	rowDivs.push(new RowDiv(i, data[i]));
}
rowDivs.forEach(e => $('.rowDiv').html(DataDiv.div))*/





function btnClick(height, dataLength) {
	  if (dataLength < 1) {
	    return;
	  }
	  let currentHeight = parseInt(height); // height 값을 숫자로 변환
	  if (dataLength < 3) {
	    let lastItemHeight = dataLength * 250;
	    $('#leftBody').css('height', currentHeight + lastItemHeight + 'px');
	  } else if (dataLength >= 3) {
	    $('#leftBody').css('height', currentHeight + 750 + 'px');
	  }
	}
// lefetBody 관련 method 3개
function gridSection( width, height, sectionName ){
	let sectionWrapper = document.createElement('div');
	sectionWrapper.classList.add(sectionName + "_wrapper");
	sectionWrapper.style.width = width;
	sectionWrapper.style.height = height;
	
	return sectionWrapper;
}





//blog 게시물 넣기
//오버플로우 히든이 적용된 태그를 매개변수로 줘야됨.
function tagForOverFlow(tag , height ,rowNum, data, name){
	//display none
	data.forEach( (e , idx) =>{
		let div = document.createElement('div');
		div.classList.add(name + "_" + idx);
		div.style.width = '100%';
		div.innerHTML = blogItems(data[idx]);
		let tagstyle = getComputedStyle(tag);
		div.style.height = height / rowNum + 'px';
		tag.appendChild(div);
	})
}

function blogItems(data){
	items = '';
/*	items += '<p>' + data.title +'</p>';
	items += '<p>' + data.writer +'</p>';
	items += '<div>' + data.cont +'</div>';*/
	items += '<p>' + 'aa' +'</p>';
	items += '<p>' + 'aa' +'</p>';
	items += '<div>' + 'aa' +'</div>';
	return items;
}




/*
<style>
.item-div{
  outline: 1px solid;
  display: none;
  width:300px;
  float: left;
}

.data-div{
  float:left;
  width:100px;
  text-align: center;
}

</style>
<body>
  <div id="div1"></div>
  <button onclick=move(-1)>←</button>
  <button onclick=move(+1)>→</button>
</body>

<script src="https://code.jquery.com/jquery-3.6.0.js"></script>

<script>
  let items = [];
  const col = 3;
  // class ItemDiv {
  //   constructor(i){
  //     this.div = $("<div class='item-div'></div>");
  //     $("#div1").append(this.div);
  //   }

  //   addData(data){
  //     const div = $("<div class='data-div'>");
  //     div.text(data);
  //     this.div.append(div);
  //   }
  // }
  
  let divIdx = 0;


  for (let i = 0; i < 9; i++) {
    const item = {
      addData:(data)=>{
        const div = $("<div class='data-div'>");
        div.text(data);
        item.div.append(div);
      }
    };

    item.div = $("<div class='item-div'>");
    $("#div1").append(item.div);
    items.push(item);
    item.addData(i*3+1)
    item.addData(i*3+2)
    item.addData(i*3+3)
  }

  items[0].div.css("display","block");

  function move(d){
    items[divIdx].div.css("display","none");
    divIdx += d;
    if(divIdx<0) divIdx = items.length-1;
    if(divIdx>=items.length) divIdx = 0;
    items[divIdx].div.css("display","block");
  }
</script>
*/