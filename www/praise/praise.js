class Load{
	constructor() {
	    this.body=document.getElementsByTagName('body')[0];
	}
	switchTime(time){
		let timer=new Date(time);
		let year=timer.getFullYear();
		let month=timer.getMonth()+1;
		let day=timer.getDate();
		return `${year}-${month}-${day}`;
	}
	render(data){
		for(let i=0;i<data.length;++i){
			let div=document.createElement('div');
			div.setAttribute('class',"bannerWrapper");
			let div1=document.createElement('div');
			div1.setAttribute('class',"bannerImg");
			let img=document.createElement('img');
			img.src=data[i].userImage;
			div1.appendChild(img);
			let div2=document.createElement('div');
			div2.setAttribute('class',"bannerContent");
			let div21=document.createElement('div');
			div21.setAttribute('class',"nickNameDiv");
			let span=document.createElement('span');
			span.setAttribute('class',"nickName");
			span.innerText=data[i].userName;
			let span1=document.createElement('span');
			span1.innerText="   点赞了你的博文";
			div21.appendChild(span);
			div21.appendChild(span1);
			let a=document.createElement('a');
			a.setAttribute('class',"csdn");
			a.href=`../article/article.html?artId=${data[i].artId}&mark=1`;
			let divA1=document.createElement('div');
			divA1.setAttribute('class',"csdnLogo");
			let img1=document.createElement('img');
			img1.src="../../style/csdn.png";
			divA1.appendChild(img1);
			a.appendChild(divA1);
			let divA2=document.createElement('div');
			divA2.setAttribute('class',"csdnTitle");
			divA2.innerText=data[i].mainTitle;
			a.appendChild(divA2);
			let divEnd=document.createElement('div');
			divEnd.setAttribute('class',"date");
			divEnd.innerText=this.switchTime(data[i].praiseTime);
			div2.appendChild(div21);
			div2.appendChild(a);
			div2.appendChild(divEnd);
			div.appendChild(div1);
			div.appendChild(div2);
			this.body.appendChild(div);
		}
	}
	loading(){
		var self=this;
		window.onload=()=>{
			var xhr=new XMLHttpRequest();
			let id=window.localStorage.getItem("userId");
			let url=`http://localhost:8082/blog/praise?userId=${id}`;
			xhr.onreadystatechange=()=>{
				if(xhr.status==200&&xhr.readyState==4){
					let json=JSON.parse(xhr.responseText);
					self.render(json.res);
				}
			}
			xhr.open('GET',url,true);
			xhr.send(null);
		}
	}
	init(){
		this.loading();
	}
}
function main(){
	let load=new Load();
	load.init();
}
main();