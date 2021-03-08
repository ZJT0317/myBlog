class Add{
	constructor(){
		this.add=document.getElementsByClassName('add')[0];	
	    this.addShow=document.getElementsByClassName('addShow')[0];
	    this.bigContent=document.getElementsByClassName('bigContent')[0];
	}
	addAdd(){
		var that=this;
		that.add.onclick=()=>{
			if(that.addShow.style.display=="inline-block"){
				that.addShow.style.display="none";
			}else if(that.addShow.style.display=="none"){
				that.addShow.style.display="inline-block";
			}
		}
	}
	addScroll(){
		var that=this;
		that.bigContent.onmousewheel=()=>{
			that.addShow.style.display="none";
		}
	}
}
class Search{
	constructor(){
		this.inputWord=document.getElementsByClassName('inputWord')[0];
	}
	Input(){
		var that=this;
		that.inputWord.onfocus=()=>{
			location.href="../search/search.html";
		}
	}
}
class PicMoving{
	constructor(){
		this.picContent=document.getElementsByClassName('picContent')[0];
	    this.wordContent=document.getElementsByClassName('wordContent')[0],
		this.spot=document.getElementsByClassName('spot')[0].getElementsByTagName('span');
		this.pic=document.getElementsByClassName('pic')[0];
		this.timer=0;
		this.timer1=0;
	}
	move(Next){
		var that=this;
		var f=document.documentElement.clientWidth;
		clearInterval(that.timer);
		//如果从3到1那么当前应该是第0张。
		if((that.picContent.offsetLeft==(-3)*f)&&Next==1){
			// that.picContent.offsetLeft=0;  //这句话会报错，为什么?
			that.picContent.style.left="0px";
			that.wordContent.style.left="0px";
		}
		//从1到2,left有-100变到-200速度需要相减。
		var nextDis=Next*(-1)*(document.documentElement.clientWidth);
		if(nextDis!=that.picContent.offsetLeft){
			var speed=that.picContent.offsetLeft>nextDis?-10:10;
			that.timer=setInterval(function(){
				that.picContent.style.left=that.picContent.offsetLeft+speed+'px';
				that.wordContent.style.left=that.picContent.offsetLeft+speed+'px';
				if(Math.abs(that.picContent.offsetLeft-nextDis)<10){
					that.picContent.style.left=nextDis+'px';
					that.wordContent.style.left=nextDis+'px';
					clearInterval(that.timer);
				}
			},10)
		}
	}
	auto(){
		var that=this;
		var f=document.documentElement.clientWidth;
		//遗漏点
		var next=Math.abs(Math.ceil(that.picContent.offsetLeft/f))+1;
		//遗漏点
		if(next==4){
			next=1;
		}
		var len=that.spot.length;
		that.timer1=setInterval(function(){
			that.move(next);
			for(var j=0;j<len;++j){
				if(that.spot[j].className=="on"){
					that.spot[j].className="";
					break;
				}
			}
			that.spot[next-1].className="on";
			next+=1;
			if(next>=4){
				next=1;
			}
		},2500)
	}
	leave(){
		var that=this;
		that.pic.onmouseout=function(){
			clearInterval(that.timer1);
			that.auto();
		}
	}
	tapSpot(){
		var that=this;
		var len=that.spot.length;
		for(let i=0;i<len;++i){
			that.spot[i].onclick=function(){
				clearInterval(that.timer1);
				for(var j=0;j<len;++j){
					if(that.spot[j].className=="on"){
						that.spot[j].className="";
						break;
					}
				}
				that.spot[i].className="on";
				//遗漏点 i=0;
				that.move(i+1);
			}
		}
	}
}
class Scroll{
	constructor(){
	    this.showBlogList=document.getElementsByClassName('showBlogList')[0];
	    this.index=0;
		this.flag=false;
		this.timer=0;
		this.titleSpan=document.getElementsByClassName('title')[0].getElementsByTagName('span');
		this.bigContent=document.getElementsByClassName('bigContent')[0];
		this.showBlogList=document.getElementsByClassName('showBlogList')[0];
		this.addShow=document.getElementsByClassName('addShow')[0];
		this.userWrapperTwo=document.getElementsByClassName('userWrapperTwo')[0];
	    this.content=document.getElementsByClassName('contentMe')[0];
	    this.focus=document.getElementsByClassName('focus');
	}
	move(){
		//向上拨动时,index由1-->2,top值有6-->0
		clearInterval(this.timer);
		for(let j=0;j<3;++j){
			this.titleSpan[j].className="";
		}
		this.titleSpan[this.index].className="change";
		this.flag=true;
		var len=window.innerWidth/100;
		var tar=-this.index*100*len;
		//this.showBlogList.offsetLeft=0,tar=-100vh时,向右边滑,speed<0;
		var speed=this.showBlogList.offsetLeft>tar?-10:10;
		this.timer=setInterval(()=>{
			this.showBlogList.style.left=this.showBlogList.offsetLeft+speed+'px';
			if(Math.abs(this.showBlogList.offsetLeft-tar)<10){
				this.showBlogList.style.left=tar+'px';
				this.flag=false;
				clearInterval(this.timer);
			}
		},10)
	}
	blogListMoving(e){
		if(e.deltaX!=-0&&this.flag==false){
			if(e.deltaX>0){
				this.index++;
				if(this.index==3){
					this.index=2;
				}else{
					this.move();
				}
			}else{
				this.index--;
				if(this.index==-1){
					this.index=0;
				}else{
					this.move();
				}
			}
		}
	}
	tap(){
		var that=this;
		var len=that.titleSpan.length;
	    for(let i=0;i<len;++i){
			that.titleSpan[i].onclick=()=>{
				that.addShow.style.display="none";
				this.index=i;
				this.move();
			}
		}
	}
	webScroll(){
		var len=window.innerWidth/100;
		this.showBlogList.onmousewheel=(e)=>{
			this.blogListMoving(e);
		}
		var that=this;
		this.userWrapperTwo.onmousewheel=()=>{
			this.showBlogList.onmousewheel=null;
		}
		this.content.onmousewheel=()=>{
			this.showBlogList.onmousewheel=(e)=>{
				this.blogListMoving(e);
			};
		}
	}
	Focus(){
		for(let i=0;i<this.focus.length;++i){
			this.focus[i].onclick=()=>{
				if(this.focus[i].innerText=="关注"){
					this.focus[i].innerText="已关注";
					this.focus[i].style.color="#ccc";
				}else{
					this.focus[i].innerText="关注";
					this.focus[i].style.color="#f40";
				}
			}
		}
	}
}
class Load{
	constructor(){
		this.json=null;
		this.art1=null;
		this.art2=null;
		this.art3=null;
		this.content1=document.getElementsByClassName('content1')[0];
		this.contentMe=document.getElementsByClassName('contentMe')[0];
		this.contentWeb=document.getElementsByClassName('contentWeb')[0];
	}
	switchTime(timer){
		const time=new Date(timer);
		const year=time.getFullYear();
		const month=time.getMonth()+1;
		const day=time.getDate();
		const hour=time.getHours();
		const minute=time.getMinutes();
		const second=time.getSeconds();
		const time1=new Date();
		const year1=time1.getFullYear();
		const month1=time1.getMonth()+1;
		const day1=time1.getDate();
		const hour1=time1.getHours();
		const minute1=time1.getMinutes();
		const second1=time1.getSeconds();
		if(year1-year){
			return `${year1-year}年前`;
		}else if(month1-month){
			return `${month1-month}月前`;
		}else if(day1-day){
			return `${day1-day}天前`;
		}else if(hour1-hour){
			return `${hour1-hour}小时前`;
		}else if(minute1-minute){
			return `${minute1-minute}分钟前`;
		}else if(second1-second){
			return `${second1-second}秒前`;
		}
	}
	loading(){
		var self=this;
		window.onload=function(){
			var xhr=new XMLHttpRequest();
			var url="http://localhost:8080/blog/index";
			xhr.onreadystatechange=function(){
				if(xhr.status==200&&xhr.readyState==4){
					//变为object类型
					self.json=JSON.parse(xhr.responseText);
					self.aHref();
				}
			}
			xhr.open('GET',url,true);
			xhr.send(null);
		}
	}
	aHref(){
		this.art1=this.json.res.art1;
		this.art2=this.json.res.art2;
		this.art3=this.json.res.art3;
		for(let i=0;i<this.art1.length;++i){
			var a=document.createElement('a');
			a.href=`../article/article.html?artId=${this.art1[i].artId}`;
			var li=document.createElement('li');
			li.setAttribute('class','contentChild');
			var div=document.createElement('div');
			div.setAttribute('class','contentBigTitle');
			div.innerText=this.art1[i].mainTitle;
			var div1=document.createElement('div');
			div1.innerText=this.art1[i].subhead;
			li.appendChild(div);
			li.appendChild(div1);
			a.appendChild(li);
			this.content1.appendChild(a);
		}
		for(let i=0;i<this.art2.length;++i){
			var a=document.createElement('a');
			a.href=`../article/article.html?artId=${this.art2[i].artId}`;
			var li=document.createElement('li');
			li.setAttribute('class',"contentChild");
			var div=document.createElement('div');
			div.setAttribute('class',"author");
			var div1=document.createElement('div');
			div1.setAttribute('class',"divImage");
			div1.style.backgroundImage=`url(${this.art2[i].ownerImage})`;
			var span1=document.createElement('span');
			span1.innerText=this.art2[i].ownerName;
			var span2=document.createElement('span');
			var str=this.switchTime(this.art2[i].postTime);
			span2.innerText=str;
			var span3=document.createElement('span');
			span3.innerText="发布了博客";
			div.appendChild(div1);
			div.appendChild(span1);
			div.appendChild(span2);
			div.appendChild(span3);
			li.appendChild(div);
			var div2=document.createElement('div');
			div2.innerText=this.art2[i].mainTitle;
			div2.setAttribute('class',"contentBigTitle");
			var div3=document.createElement('div');
			div3.innerText=this.art2[i].subhead;
			li.appendChild(div2);
			li.appendChild(div3);
			a.appendChild(li);
			this.contentMe.appendChild(a);
		}
		for(let i=0;i<this.art3.length;++i){
			var a=document.createElement('a');
			a.href=`../article/article.html?artId=${this.art3[i].artId}`;
			var li=document.createElement('li');
			li.setAttribute('class','contentChild1');
			var div=document.createElement('div');
			div.setAttribute('class','contentBigTitle');
			div.innerText=this.art3[i].mainTitle;
			var div1=document.createElement('div');
			div1.innerText=this.art3[i].subhead;
			li.appendChild(div);
			li.appendChild(div1);
			a.appendChild(li);
			this.contentWeb.appendChild(a);
		}
	}
}
function main(){
	var picMoving=new PicMoving();
	picMoving.auto();
	picMoving.tapSpot();
	picMoving.leave();
	var search=new Search();
	search.Input();
	var add=new Add();
	add.addAdd();
	add.addScroll();
	var scroll=new Scroll();
	scroll.webScroll();
	scroll.tap();
	scroll.Focus();
	var load=new Load();
	load.loading();
}
main();