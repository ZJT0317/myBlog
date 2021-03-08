class Load{
	constructor() {
	    this.sexImg=document.getElementsByClassName('ownPageSex')[0].getElementsByTagName('img')[0];
	    this.intro=document.getElementsByClassName('intro')[0];
		this.art=[];
		this.ownPageMyImg=document.getElementsByClassName('ownPageMyImg')[0];
		this.mineId=document.getElementsByClassName('mineId')[0];
		this.ownerName=document.getElementsByClassName('ownerName')[0];
		this.ownPageImg=document.getElementsByClassName('ownPageSex')[0].getElementsByTagName('img')[0];
	    this.ownFocus=document.getElementsByClassName('ownFocus')[0];
		this.ownFans=document.getElementsByClassName('ownFans')[0];
		this.ownPageDiv=document.getElementsByClassName('ownPageMyage')[0].getElementsByTagName('div')[0];
		this.intro=document.getElementsByClassName('intro')[0];
		this.BlogCount=document.getElementsByClassName('BlogCount')[0];
		this.myBlogCount=document.getElementsByClassName('myBlogCount')[0];
		this.Blink=document.getElementsByClassName('Blink')[0];
		this.BlogContextWrapper=document.getElementsByClassName('BlogContextWrapper')[0];
	 }
	 switchTime(timer){
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
	 		return `码龄${year1-year}年`;
	 	}else if(month1-month){
	 		return `码龄${month1-month}月`;
	 	}else if(day1-day){
	 		return `码龄${day1-day}天`;
	 	}else if(hour1-hour){
	 		return `码龄${hour1-hour}小时`;
	 	}else if(minute1-minute){
	 		return `码龄${minute1-minute}分钟`;
	 	}
	 }
	 switchDate(timer1){
		 const time=new Date(timer1);
		 const year=time.getFullYear();
		 const month=time.getMonth()+1;
		 const day=time.getDate();
		 return `${year}年${month}月${day}日`;
	 }
	render(data,id){
		this.ownPageMyImg.src=data.userImage;
		this.mineId.innerText=`qq_${id}`;
		this.ownerName.innerText=data.userName;
		var a=data.userSex;
		if(a=='男'){
			this.ownPageImg.src="../../style/男.png";
		}else if(a=='女'){
			this.ownPageImg.src="../../style/女.png";
		}else{
			this.ownPageImg.src="../../style/性别未知.png";
		}
		this.ownFocus.innerText=data.userFocus;
		this.ownFans.innerText=data.userFans;
		var str=this.switchTime(data.userAge);
		this.ownPageDiv.innerText=str;
		this.intro.innerText=data.userIntroduce;
		this.BlogCount.innerText=data.userFocus;
		this.myBlogCount.innerText=data.userFans;
		this.Blink.innerText=data.userFans;
		let len=data.article.length;
		for(let i=0;i<len;++i){
			let div=document.createElement('div');
			div.setAttribute('class',"ownPageContext");
			let a=document.createElement('a');
			a.setAttribute('class',"BlogContextMsg");
			a.href=`../article/article.html?artId=${data.article[i].artId}`;
			let div1=document.createElement('div');
			div1.setAttribute('class',"BlogDate");
			let img=document.createElement('img');
			img.src=data.userImage;
			let div2=document.createElement('div');
			let str=this.switchDate(data.article[i].postTime);
			div2.innerText=`${str}   发布了博客`;
			let div3=document.createElement('div');
			let div4=document.createElement('div');
			div4.setAttribute('class',"BlogContextBig");
			div4.innerText=data.article[i].mainTitle;
			let div5=document.createElement('div');
			div5.setAttribute('class',"BlogDescription");
			div5.innerText=data.article[i].subhead;
			div3.appendChild(div4);
			div3.appendChild(div5);
			div1.appendChild(img);
			div1.appendChild(div2);
			a.appendChild(div1);
			a.appendChild(div3);
			if(i==len-1){
				let divNew=document.createElement('div');
				divNew.setAttribute('class',"BlogContextNew");
				divNew.innerText="最新动态";
				div.appendChild(divNew);
			}
			div.appendChild(a);
			this.BlogContextWrapper.insertBefore(div,this.BlogContextWrapper.firstElementChild);
		}
	}
	sexChange(){
		var self=this;
		var id=window.localStorage.getItem('userId');
		window.onload=()=>{
			var url=`http://localhost:8083/blog/mine2?userId=${id}`;
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=()=>{
				if(xhr.status==200&&xhr.readyState==4){
					var json=JSON.parse(xhr.responseText);
					self.render(json.res,id);
				}
			}
			xhr.open('GET',url,true);
			xhr.send(null);
		}
	}
}
function main(){
	var load=new Load();
	load.sexChange();
}
main();