class ownerBook{
	constructor(){
	    this.rightParentSex=document.getElementsByClassName('rightParentSex')[0];
	    this.chooseSex=document.getElementsByClassName('chooseSex')[0];
		this.chooseArea=document.getElementsByClassName('chooseArea')[0];
	    this.ownIt=document.getElementsByClassName('ownIt')[0];
		this.articleLess=document.getElementsByClassName('articleLess')[0];
	    this.cancelSex=document.getElementsByClassName('cancelSex')[0];
	    this.sex=document.getElementsByClassName('sex');
		this.ownSex=document.getElementsByClassName('ownSex')[0];
	    this.rightParentArea=document.getElementsByClassName('rightParentArea')[0];
	    this.AreaWrapper=document.getElementsByClassName('AreaWrapper')[0];
		this.AreaProvience=document.getElementsByClassName('AreaProvience')[0];
		this.AreaShi=document.getElementsByClassName('AreaShi')[0];
		this.submit=document.getElementsByClassName('submit')[0];
		this.AreaCountry=document.getElementsByClassName('AreaCountry')[0];
		this.ownArea=document.getElementsByClassName('ownArea')[0];
		this.rightParentArea=document.getElementsByClassName('rightParentArea')[0];
		this.success=document.getElementsByClassName('success')[0];
		this.areaFail=document.getElementsByClassName('areaFail')[0];
		this.intro=document.getElementsByClassName('intro')[0];
		this.input=document.getElementsByClassName('intro')[0].getElementsByTagName('input')[0];
		this.acceptintro=document.getElementsByClassName('acceptintro')[0];
		this.rightParentIntro=document.getElementsByClassName('rightParentIntro')[0];
		this.ownIntro=document.getElementsByClassName('ownIntro')[0];
		this.cancelIntro=document.getElementsByClassName('cancelIntro')[0];
		this.ownImg=document.getElementsByClassName('ownImg')[0];
		this.articleSpan=document.getElementsByClassName('articleSpan')[0];
		this.index=0;
		this.index1=0;
		this.flag=false;
		this.flag1=false;
		this.timer=0;
		this.timer1=0;
		this.oldTop=0;
		this.redFlag=true;
		this.firstIndex=false;
		this.endIndex=false;
		this.sizeShi=this.AreaShi.children.length;
		this.shiMap=[
		["?????????","??????","??????","?????????","?????????","?????????","?????????","?????????","????????????","??????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","??????",
		"?????????","??????","?????????","?????????","?????????","?????????","?????????","?????????","??????","??????","??????","??????","??????"],
		["?????????","?????????","?????????","?????????","?????????","?????????","?????????","????????????","?????????","????????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????"],
		["?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","?????????","????????????","?????????","?????????","??????"]]
	};
	renderSexContent(){
		this.chooseSex.style.display='none';
		this.articleLess.style.opacity=1;
		this.ownIt.style.opacity=1;
	}
	tapSex(){
		 this.rightParentSex.onclick=()=>{
			 if(this.chooseArea.style.display=='block'){
			 	this.chooseArea.style.display='none';
			 	this.ownIt.style.opacity=1;
				this.articleLess.style.opacity=1;
			 }else if( this.chooseSex.style.display=='block'){
				 this.chooseSex.style.display='none';
				 this.ownIt.style.opacity=1;
				 this.articleLess.style.opacity=1;
			 }else{
				 if(this.chooseSex.style.display=='none'){
					 this.chooseSex.style.display='block';
					 this.articleLess.style.opacity=0.4;
					 this.ownIt.style.opacity=0.4;
				 }else{this.renderSexContent();}
			 }
		 }
	}
	tapSexCancel(){
		window.onscroll=()=>{
			if(this.chooseSex.style.display=='block'){
				this.renderSexContent();
			}
		}
		this.cancelSex.onclick=()=>{this.renderSexContent();}
	}
	renderSex(){
		for(let i=0;i<this.sex.length;++i){
			this.sex[i].onclick=()=>{
				this.ownSex.innerText=this.sex[i].innerText;
				window.localStorage.setItem('sex',this.sex[i].innerText);
				this.success.style.display='block';
				setTimeout(()=>{
					this.success.style.display='none';
				},1200)
				this.renderSexContent();
			}
		}
	}
	move(){
		//???????????????,index???1-->2,top??????6-->0
		clearInterval(this.timer);
		this.flag=true;
		var len=window.innerHeight/100;
		var tar=(12-this.index*6)*len;
		var speed=this.AreaProvience.offsetTop>tar?-10:10;
		this.timer=setInterval(()=>{
			this.AreaProvience.style.top=this.AreaProvience.offsetTop+speed+'px';
			if(Math.abs(this.AreaProvience.offsetTop-tar)<10){
				this.AreaProvience.style.top=tar+'px';
				this.flag=false;
				clearInterval(this.timer);
			}
		},1000/10)
	}
	scrollArea(){
		//index=0???-->top:12vh;
		//index=1--->top:6vh;
		//index=2--->top:0vh;
		//index=3--->top:-6vh;
		var len=window.innerHeight/100;
		var self=this;
		this.AreaProvience.onmousewheel=(e)=>{
			var e=e||window.event;
			this.redFlag=false;
			if(e.wheelDelta>0){
				if(this.flag==false){
					this.index++;
					if(this.index==35){
						this.index=34;
						this.endIndex=true;
					}
					else if(this.index<35){
						this.move();
						this.firstIndex=false;
						this.endIndex=false;
					}
				}
			}else if(e.wheelDelta<0){
				if(this.flag==false){
					this.index--;
					if(this.index==-1){
						this.index=0;
						this.firstIndex=true;
					}
					else if(this.index>-1){
						this.move();
						this.firstIndex=false;
						this.endIndex=false;
					}
				}
			}
		}
	}
	move1(){
		//???????????????,index???1-->2,top??????6-->0
		clearInterval(this.timer1);
		this.flag1=true;
		var len=window.innerHeight/100;
		var tar=(12-this.index1*6)*len;
		var speed=this.AreaShi.offsetTop>tar?-10:10;
		this.timer1=setInterval(()=>{
			this.AreaShi.style.top=this.AreaShi.offsetTop+speed+'px';
			if(Math.abs(this.AreaShi.offsetTop-tar)<10){
				this.AreaShi.style.top=tar+'px';
				this.flag1=false;
				clearInterval(this.timer1);
			}
		},1000/10)
	}
	scrollShi(){
		var len=window.innerHeight/100;
		var self=this;
		this.AreaShi.onmousewheel=(e)=>{
			var e=e||window.event;
			if(e.wheelDelta>0){
				if(this.flag1==false){
					this.index1++;
					if(this.index1==this.sizeShi){
						this.index1=this.sizeShi-1;
					}
					else if(this.index1<this.sizeShi){
						this.move1();
					}
				}
			}else if(e.wheelDelta<0){
				if(this.flag1==false){
					this.index1--;
					if(this.index1==-1){
						this.index1=0;
					}
					else if(this.index1>-1){
						this.move1();
					}
				}
			}
		}
	}
	testScroll(){
		var self=this;
		var time;
		var len=window.innerHeight/100;
		time=setInterval(()=>{
				//?????????????????????????????????10?????????top???10?????????top?????????
				if(self.oldTop==self.AreaProvience.offsetTop){
					if(self.redFlag==false&&(self.firstIndex==false||self.endIndex==false)){
						let f=self.shiMap[(self.index%3)].length;
						self.sizeShi=f;
						self.AreaShi.innerHTML="";
						for(let i=0;i<f;++i){
							let li=document.createElement('li');
							li.innerText=self.shiMap[(self.index%3)][i];
							self.AreaShi.appendChild(li);
						}
						self.AreaShi.style.top=`${12*len}px`;
						self.redFlag=true;
						self.firstIndex=true;
						self.endIndex=true;
					}
				}
			    self.oldTop=self.AreaProvience.offsetTop;
		},1000);
	}
	tapArea(){
		var len=window.innerHeight/100;
		this.rightParentArea.onclick=()=>{
			if(this.chooseSex.style.display=='block'){
				this.chooseSex.style.display='none';
				this.ownIt.style.opacity=1;
				this.articleLess.style.opacity=1;
			}else if(this.intro.style.display=='block'){
				this.intro.style.display='none';
				this.ownIt.style.opacity=1;
				this.articleLess.style.opacity=1;
			}else{
				if(this.chooseArea.style.display=='block'){
					this.chooseArea.style.display='none';
					this.ownIt.style.opacity=1;
					this.articleLess.style.opacity=1;
				}else{
					this.chooseArea.style.display='block';
					this.ownIt.style.opacity=0.4;
					this.articleLess.style.opacity=0.4;
					this.AreaShi.style.top=`${12*len}px`;
					this.AreaShi.innerHTML="<li>?????????</li>";
					this.AreaProvience.style.top=`${12*len}px`;
					this.index1=0;
					this.index=0;
				}
			}
		}
	}
	submitArea(){
		this.submit.onclick=()=>{
			if(this.index!=0){
				let pro=this.AreaProvience.children[this.index].innerText;
				let coun=this.AreaCountry.children[0].innerText;
				if(this.index1!=0){
					let shi=this.AreaShi.children[this.index1].innerText;
					this.ownArea.innerText=`${coun} ${pro} ${shi}`;
				}else{
					this.ownArea.innerText=`${coun} ${pro}`;
				}
				window.localStorage.setItem('area',this.ownArea.innerText);
			    this.success.style.display='block';
				setTimeout(()=>{
					this.success.style.display='none';
				},1200)
			}else{
				this.areaFail.style.display='block';
				setTimeout(()=>{
					this.areaFail.style.display='none';
				},1200)
			}
			this.chooseArea.style.display='none';
			this.ownIt.style.opacity=1;
			this.articleLess.style.opacity=1;
		}
	}
	renderAll(data){
			this.ownSex.innerText=data.userSex;
			this.ownArea.innerText=data.userArea;
		    this.ownIntro.innerText=data.userIntroduce;	
			this.ownImg.style.backgroundImage=`url(${data.userImage})`
	}
	load(){
		var self=this;
		window.onload=()=>{
			let id=window.localStorage.getItem('userId');
			let url=`http://localhost:8083/blog/mine3?userId=${id}`;
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=()=>{
				if(xhr.status==200&&xhr.readyState==4){
					let json=JSON.parse(xhr.responseText);
			        self.renderAll(json.res);
				}
			}
			xhr.open('GET',url,true);
			xhr.send(null);
		}
	}
	tapInt(){
		this.rightParentIntro.onclick=()=>{
			this.input.value="";
			if(this.chooseSex.style.display=='block'){
				this.chooseSex.style.display='none';
				this.ownIt.style.opacity=1;
				this.articleLess.style.opacity=1;
			}else if(this.chooseArea.style.display=='block'){
				this.chooseArea.style.display='none';
				this.ownIt.style.opacity=1;
				this.articleLess.style.opacity=1;
			}else{
				if(this.intro.style.display=='block'){
					this.intro.style.display='none';
					this.ownIt.style.opacity=1;
					this.articleLess.style.opacity=1;
				}else{
					this.intro.style.display='block';
					this.ownIt.style.opacity=0.4;
					this.articleLess.style.opacity=0.4;
				}
			}
		}
	}
	tapIntChoose(){
		this.acceptintro.onclick=()=>{
			this.ownIntro.innerText=`${this.input.value}`;
			window.localStorage.setItem('introduce',`${this.input.value}`);
			this.intro.style.display='none';
			this.ownIt.style.opacity=1;
			this.articleLess.style.opacity=1;
		}
		this.cancelIntro.onclick=()=>{
			this.intro.style.display='none';
			this.ownIt.style.opacity=1;
			this.articleLess.style.opacity=1;
		}
	}
	quit(){
		var self=this;
		this.articleSpan.onclick=()=>{
			new Promise(function(resolve,reject){
				let xhr=new XMLHttpRequest();
				let id=window.localStorage.getItem('userId');
				let url="http://localhost:8083/blog/mine4";
				let str=`userId=${id}&sex=${self.ownSex.innerText}&area=${self.ownArea.innerText}&intro=${self.ownIntro.innerText}`;
				xhr.onreadystatechange=()=>{
					console.log(xhr.status,xhr.readyState);
					if(xhr.status==200&&xhr.readyState==4){
						let json=JSON.parse(xhr.responseText);
						console.log(json);
					}
				}
				xhr.open('post',url,true);
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
				xhr.send(str);
				resolve();
			}).then(function(){
				self.articleSpan.href="../owerPage/owerPage.html";
			})
		}
	}
	init(){
		this.tapSex();
		this.tapSexCancel();
		this.renderSex();
		this.scrollArea();
		this.testScroll();
		this.scrollShi();
		this.submitArea();
		this.tapArea();
		this.load();
		this.tapInt();
		this.tapIntChoose();
		this.quit();
	}
}
function main(){
	var ownerbook=new ownerBook();
	ownerbook.init();
}
main();