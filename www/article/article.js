class Load{
	constructor(){
	   this.articleContent=document.getElementsByClassName('articleContent')[0];
	   this.articleTitle=document.getElementsByClassName('articleTitle')[0];
	   this.artId=null;
	   this.articleSpan=document.getElementsByClassName('articleSpan')[0];
	   this.tapPraiseImg=document.getElementsByClassName('tapPraiseImg')[0];
	   this.img=document.getElementsByClassName('tapPraiseImg')[0].getElementsByTagName('img')[0];
	   this.praiseCount=document.getElementsByClassName('praiseCount')[0];
	   this.writeDate=document.getElementsByClassName('writeDate')[0];
	   this.readTime=document.getElementsByClassName('readTime')[0];
	   this.articleIt=document.getElementsByClassName('articleIt')[0];
	   this.articleOne=document.getElementsByClassName('articleOne')[0];
	   this.articleTime=document.getElementsByClassName('articleTime')[0];
	   this.userId=null;
	   this.imgSrc="";
	   this.mark=null;
	}
	tap(){
		var self=this;
		this.articleSpan.onclick=function(){
			new Promise(function(resolve,reject){
				var url=`http://localhost:8081/blog/article?count=${self.praiseCount.innerText}&artId=${self.artId}`;
				var xhr=new XMLHttpRequest();
				xhr.onreadystatechange=()=>{
					if(xhr.status==200&&xhr.readyState==4){
						console.log("success");
					}
				}
				xhr.open('GET',url,true);
				xhr.send(null);
				resolve();
			}).then(
			   new Promise(function(resol,rej){
				   var url=`http://localhost:8081/blog/praiseUser`;
				   let id=window.localStorage.getItem('userId');
				   let name=window.localStorage.getItem('userName');
				   let date=new Date();
				   const year=date.getFullYear();
				   const month=date.getMonth()+1;
				   const day=date.getDate();
				   let time=`${year}-${month}-${day}`;	
				   let str=`userImage=${self.imgSrc}&userName=${name}&mainTitle=${self.articleTitle.innerText}&artId=${self.artId}&praiseTime=${time}&linkId=${self.userId}&userId=${id}&mark=${self.mark}`;
				   var xhr=new XMLHttpRequest();
				   xhr.onreadystatechange=()=>{
				   	if(xhr.status==200&&xhr.readyState==4){
				   		console.log("success");
				   	}
				   }
				   xhr.open('POST',url,true);
				  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
				   xhr.send(str);
				   resol();
			   }).then(function(){
				window.history.back();
			}))
		}
	}
	ajaxPraise(){
		var self=this;
		if(self.tapPraiseImg.style.borderColor=="rgb(204, 204, 204)"){
			self.img.src="../../style/点赞%20(1).png";
			self.tapPraiseImg.style.borderColor="#f40";
			let f=parseInt(self.praiseCount.innerText);
			self.praiseCount.innerText=f+1;
			self.mark=1;
		}else{
			self.img.src="../../style/点赞%20(3).png";
			self.tapPraiseImg.style.borderColor="rgb(204, 204, 204)";
		    let f=parseInt(self.praiseCount.innerText);
		    self.praiseCount.innerText=f-1;
			self.mark=0;
		}
	}
	tapPraise(){
		var self=this;
		this.tapPraiseImg.addEventListener('click',this.ajaxPraise.bind(this));
	}
	switchTime(timer,choose){
		var date=new Date(timer);
		const year=date.getFullYear();
		const month=date.getMonth();
		const day=date.getDate();
		if(choose==1){
		  return `${year}-${month}-${day}`;	
		}else{
			return `${year}年${month}月${day}日`;
		}
	}
	switchAge(timer){
		const time=new Date(timer);
		const year=time.getFullYear();
		const month=time.getMonth()+1;
		const day=time.getDate();
		const hour=time.getHours();
		const minute=time.getMinutes();
		const time1=new Date();
		const year1=time1.getFullYear();
		const month1=time1.getMonth()+1;
		const day1=time1.getDate();
		const hour1=time1.getHours();
		const minute1=time1.getMinutes();
		if(year1-year){
			return `${year1-year}年`;
		}else if(month1-month){
			return `${month1-month}月`;
		}else if(day1-day){
			return `${day1-day}天`;
		}else if(hour1-hour){
			return `${hour1-hour}小时`;
		}else if(minute1-minute){
			return `${minute1-minute}分钟`;
		}
	}
	articleRender(data){
		let n=data.res[0];
		this.articleTitle.innerText=n.mainTitle;
		let time=this.switchTime(n.postTime,2);
		this.writeDate.innerText=time;
		this.readTime.innerText=n.readTime;
		this.userId=n.userId;
		var img=document.createElement('img');
		img.src=n.ownerImage;
		this.imgSrc=n.ownerImage;
		this.articleIt.appendChild(img);
		let span=document.createElement('span');
		span.innerText=n.ownerName;
		let span1=document.createElement('span1');
		let age=this.switchAge(n.ownerAge);
		span1.innerText=`码龄${age}`;
		this.articleOne.appendChild(span);
		this.articleOne.appendChild(span1);
		this.praiseCount.innerText=n.ownerPraise;
		this.articleContent.innerText=n.content;
		let date1=this.switchTime(n.postTime,1);
		this.articleTime.innerText=`文章最后发布于 ${date1}`;
		if(n.mark==1){
			this.img.src="../../style/点赞%20(1).png";
			this.tapPraiseImg.style.borderColor="#f40";
			this.mark=1;
		}else{
			this.img.src="../../style/点赞%20(3).png";
			this.tapPraiseImg.style.borderColor="rgb(204, 204, 204)";
			this.mark=0;
		}
	}
	loading(){
		var self=this;
		window.onload=()=>{
			var x=location.href.indexOf('=');
			var f=location.href.indexOf('&');
			var n;
			if(f!=-1){
				n=location.href.substr(x+1,f-1);
				self.tapPraiseImg.style.display="none";
			}else{
				n=location.href.substr(x+1,location.length);
			}
			self.artId=n;
			console.log(n);
			var id=window.localStorage.getItem("userId");
			var xhr=new XMLHttpRequest();
			var url=`http://localhost:8081/blog/article?artId=${n}&userId=${id}`;
			xhr.onreadystatechange=()=>{
				if(xhr.status==200&&xhr.readyState==4){
					var json=JSON.parse(xhr.responseText);
					self.articleRender(json);
				}
			}
			xhr.open('GET',url,true);
			xhr.send(null);
			let i=window.localStorage.getItem(`${self.artId}`);
			if(i=='1'){
				this.img.src="../../style/点赞%20(1).png";
				this.tapPraiseImg.style.borderColor="#f40";
				let f=parseInt(this.praiseCount.innerText);
				this.praiseCount.innerText=f+1;
			}
		}
	}
}
function main(){
	var load=new Load();
	load.loading();
	load.tap();
	load.tapPraise();
};
main();