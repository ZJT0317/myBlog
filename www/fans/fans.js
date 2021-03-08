class Focus{
	constructor() {
	    this.fansFocus=null;
	    this.warning=document.getElementsByClassName('warning')[0];
		this.fansNavigate=document.getElementsByClassName('fansNavigate')[0];
		this.timer=null;
		this.body=document.getElementsByTagName('body')[0];
		this.fansBorder=[];
		this.focusUser=[];
	}
	tap(){
		this.fansFocus=document.getElementsByClassName('fansFocus');
		var len=this.fansFocus.length;
		for(let i=0;i<len;++i){
			this.fansFocus[i].firstElementChild.onclick=()=>{
				let text=this.fansFocus[i].firstElementChild.innerText;
				this.warning.style.display='inline';
				if(text=='已关注'){
					this.fansFocus[i].firstElementChild.className='focus';
					this.fansFocus[i].firstElementChild.innerText='关注';
				    this.warning.innerText='取消关注成功';
					this.fansBorder[i]=0;
				}else{
					this.fansFocus[i].firstElementChild.className='readyFocus';
					this.fansFocus[i].firstElementChild.innerText='已关注';
					this.warning.innerText='关注成功';
					this.fansBorder[i]=1;
				}
				clearTimeout(this.timer);
				var that=this;
				this.timer=setTimeout(function(){
						that.warning.style.display='none';
				},1700);
			}
		}
	}
	navigate(){
		this.fansNavigate.onclick=()=>{
			var self=this;
			new Promise(function(resolve,reject){
				var xhr=new XMLHttpRequest();
				let id=window.localStorage.getItem("userId");
				let url="http://localhost:8082/blog/fansTap";
				let str={
					userId:id,
					fans:self.fansBorder,
					focusUser:self.focusUser
				}
				console.log(str);
				xhr.onreadystatechange=()=>{
					if(xhr.status==200&&xhr.readyState==4){
						console.log('success');
					}
				}
				xhr.open('POST',url,true);
				xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
				xhr.send(JSON.stringify(str));
				resolve();
			}).then(function(){
				self.fansBorder=[];
				self.focusUser=[];
				window.history.back();
			})
		}
	}
	render(data){
		let len=data.length;
		for(let i=0;i<len;++i){
			let div=document.createElement('div');
			div.setAttribute('class',"wrapper");
			let div1=document.createElement('div');
			div1.setAttribute('class',"fansImage");
			let img=document.createElement('img');
			img.src=data[i].userImage;
			div1.appendChild(img);
			let div2=document.createElement('div');
			div2.setAttribute('class',"fansContent");
			let div3=document.createElement('div');
			let span=document.createElement('span');
			span.setAttribute('class',"nickName");
			span.innerText=data[i].userName;
			let span1=document.createElement('span');
			span1.innerText="    关注了你";
			div3.appendChild(span);
			div3.appendChild(span1);
			let div4=document.createElement('div');
			div4.innerText=data[i].userIntroduce;
			div2.appendChild(div3);
			div2.appendChild(div4);
			let div5=document.createElement('div');
			div5.setAttribute('class',"fansFocus");
			let div6=document.createElement('div');
			if(data[i].focus==0){
				div6.setAttribute('class',"focus");
				div6.innerText="关注";
				this.fansBorder.push(0);
			}else{
				div6.setAttribute('class',"readyFocus");
				div6.innerText="已关注";
				this.fansBorder.push(1);
			}
			div5.appendChild(div6);
			div.appendChild(div1);
			div.appendChild(div2);
			div.appendChild(div5);
			this.body.appendChild(div);
			this.focusUser.push(data[i].userId);
		}
	}
	load(){
		var self=this;
		window.onload=()=>{
			let id=window.localStorage.getItem("userId");
			let xhr=new XMLHttpRequest();
			let url=`http://localhost:8082/blog/fans?userId=${id}`;
			xhr.onreadystatechange=()=>{
				if(xhr.status==200&&xhr.readyState==4){
					let json=JSON.parse(xhr.responseText);
			        self.render(json.res);
					self.tap();
				}
			}
			xhr.open('GET',url,true);
			xhr.send(null);
		}
	}
}
function main(){
	let focus=new Focus();
	focus.navigate();
	focus.load();
}
main();