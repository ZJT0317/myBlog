class Load{
	constructor() {
	    this.sexImg=document.getElementsByClassName('sexImg')[0];
	    this.titleDiv=document.getElementsByClassName('titleDiv')[0];
	    this.mineName=document.getElementsByClassName('mineName')[0];
	    this.sexImg=document.getElementsByClassName('sexImg')[0];
	    this.mineFocusMath=document.getElementsByClassName('mineFocusMath')[0];
		this.mineFansMath=document.getElementsByClassName('mineFansMath')[0];
	    this.mineOwnInterOne=document.getElementsByClassName('mineOwnInterOne')[0];
	}
	render(data){
		this.mineName.innerText=data.userName;
		this.mineOwnInterOne.src=data.userImage;
		this.mineFocusMath.innerText=data.userFocus;
		this.mineFansMath.innerText=data.userFans;
		var a=data.userSex;
		if(a=='男'){
			this.sexImg.src="../../style/男.png";
		}else if(a=='女'){
			this.sexImg.src="../../style/女.png";
		}else{
			this.sexImg.src="../../style/性别未知.png";
		}
	}
	sexChange(){
		var self=this;
		window.onload=()=>{
			var id=window.localStorage.getItem('userId');
			var xhr=new XMLHttpRequest();
			var url=`http://localhost:8083/blog/mine?userId=${id}`;
			xhr.onreadystatechange=()=>{
				if(xhr.status==200&&xhr.readyState==4){
					var json=JSON.parse(xhr.responseText);
					self.render(json.res);
				}
			}
			xhr.open('GET',url,true);
			xhr.send(null);
		}
	}
	tapQuit(){
		this.titleDiv.onclick=()=>{
			window.localStorage.clear();
		}
	}
}
function main(){
	var load=new Load();
	load.sexChange();
	load.tapQuit();
}
main();