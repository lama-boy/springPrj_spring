window.onload = function() {
	
	//login 부분
	$("#login").load("/include/includeLogin.html");
	
	
	//Shopping 관련
	let shop           = document.querySelector('#shop');
	let currentShopPageNum = 1;

	let shopCurrPage = document.querySelector('.shop.currentPage');
	shopCurrPage.innerHTML = currentShopPageNum;
	let shopPageDiv = document.createElement('div');
	let shopWrapper = document.querySelector('#shop_wrap');
	let shopPageButtons = document.querySelectorAll('.shop');
	shopPageButtons.forEach(e => console.log(e));
	shopPageButtons.forEach(e => {
		e.addEventListener('click', b =>{
			shopPageClick(e);
		})
	})
	addShoppingItems(shop);
	//news 관련
	let news_container = document.querySelector('#news_container');
	
	//theme 관련
	let theme          = document.querySelector('#theme_container');
	
	
	gridInfo(shop);
	
	//nav에 추가
	let navList = document.querySelector('#navList');
	addNavItems(navList);
	
	//theme 관련
	
	//themeHeader
	class themeHeader{
		constructor(category){
			this.div = $('<div class = "theme_catagory>');
			$('#theme_header').append(this.div);
		}
		addHeaderCont(data){
			const div = $('<div class = "themeHeaderCont>');
			div.text( data ); //data는 api에서 불러온 data 의 카테고리여야됨
			this.div.append(div);
		}
	}
	
	let data = ['a','a','a','a','a','a','a','a'];
	for (var i = 0; i < data.length; i++) {
		themeHeader.addHeaderCont('<a href = "">' + data[i].catergory + '</a>');
	}
	
	//themeBody
	
	class themeBody{
		constructor(cont)
		{
			
		}
	}
	
	/*
	 * ajax(news_container); ajax(shop_wrap,currentShopPageNum); ajax(theme);
	 */
	
}

// section을 만들고, 해당 섹션을 어떤 방식으로 배치할지.
// 숫자는 열을 뜻함. 현재요소의 width값을 상위요소 width/숫자 의 값으로.
// height 의 경우 한 칸의 높이.
function gridSection( width, height, colNum, sectionName){
	let sectionWrapper = document.createElement('div');
	sectionWrapper.classList.add(sectionName + "_wrapper");
	sectionWrapper.style.width = width;
	sectionWrapper.style.height = height;
	
	let sectionItmes = document.createElement('div');
	sectionItem.classList.add(sectionName + "_items");
	sectionItem.style.width = width / colNum;
	sectionItem.style.height = height / colNum;
	
	sectionItem.appendChild(sectionWrapper);
	
	return sectionWrapper;
}


//shopping
function shopPageClick( btn ){
	console.log(btn.id);
	console.log(btn.className);
	let shopCurrPage = document.querySelector('.shop.currentPage');
	let totalShopPageNum = 10;
	if(btn.id == "shopPrevPage" && currentShopPageNum > 1){
		currentShopPageNum --;
	}else if(btn.id == "shopNextPage" && currentShopPageNum < totalShopPageNum){
		currentShopPageNum ++;
	}
	shopCurrPage.innerHTML = currentShopPageNum;
}


function gridInfo(shop){
	for (var i = 0; i < 9; i++) {
		console.log("실행됨");
		const div = document.createElement("div");
		div.setAttribute("class","shop_div");
		shop.appendChild(div);
	}
}


function shopwrapdisplay(parsedData,shop ){ 
	let shopdiv = document.querySelectorAll('.shop_div');
	shopdiv.forEach(function(e, index) {
		e.appendChild(createNewsImageDiv(parsedData[index]));
	});

}

//news관련
function  createFirstNewsImage( data ,news_container ) {
	console.log(news_container);
	data.forEach(e => console.log(e));
	data.forEach(e =>{ 
		news_container.innerHTML = createImageDiv(e);
	});
}


//theme관련


// ajax
function ajax( tag , currentShopPageNum ){

	let url = '';
	if(tag.id == 'news_container'){
		url = '/Data/' + tag.id;
	}
	if(tag.id == 'shop'){
		url = '/Data/' + tag.id + "/" + currentShopPageNum;
	}
	if(tag.id == 'theme_container'){
		url = '/Data/' + tag.id;
	}

	fetch(url)
	.then(response => response.json())
	.then(data => {
		// news일때
		let parsedData = JSON.parse( data );
		if(tag.id == "news_container"){
			createFirstNewsImage(parsedData,tag);
		} 
		
		// shop일때		
		if (tag.id == "shop"){
			shopwrapdisplay(parsedData, tag );
			totalShopPageNum = "a";
		}
		
		if (tag.id == "theme"){
			
		}
	})
	.catch(error => { 
		console.log(error);
		alert('오류발생:' + error);
	})
}


//navItems를 넣을 ajax
function addNavItems( tag ){
	let url = '/Data/DataList';

	fetch(url)
	.then(response => response.json())
	.then( data => {
		data.forEach( e => {
			let div = document.createElement("div");
			let ahref = document.createElement('a');
			tag.appendChild(div);
			div.appendChild(ahref);
			ahref.innerHTML = e.name;
			div.setAttribute('class','nav_items');
			ahref.setAttribute('href',"http://192.168.0.213:8092/page/" +  e.id );
			//<a href="#">${e.name}</a>
			
			tag.appendChild(div);
			
		})

	})
	.catch(error => {
		console.log(error);
		alert("오류");
	});
}

function addShoppingItems( tag ){
	let data1;
	fetch("/Data/Items")
	.then(response => response.json())
	.then( items => {
		console.log(items);
	})
	.catch(error => {
		console.log(error);
		alert("오류");
	});
}


function createNewsContainerImageDiv({title, image, content}) {
	const newsContainerImageDiv = document.createElement('div');
	newsContainerImageDiv.classList.add('image-div');
	newsContainerImageDiv.setAttribute('id','news_container')

	const newsContainerimageElement = document.createElement('img');
	newsContainerimageElement.src = image;
	newsContainerimageDiv.appendChild(newsContainerimageElement);

	newsContainerImageDiv.style.border ="1px solid";
	newsContainerImageDiv.style.width ="200px";
	newsContainerImageDiv.style.height ="200px";

	return newsContainerImageDiv;
}






