var obj={
	reject:  document.getElementsByClassName('reject')[0],
	load:  document.getElementsByClassName('load')[0],
	rejectLine:  document.getElementsByClassName('rejectLine')[0],
	loadLine:  document.getElementsByClassName('loadLine')[0],
	rejecting: document.getElementsByClassName('rejecting')[0],
	loading: document.getElementsByClassName('loading')[0],
	te1: document.getElementsByClassName('te')[0],
	pa1: document.getElementsByClassName('pa')[0],
	te2: document.getElementsByClassName('te')[1],
	pa2: document.getElementsByClassName('pa')[1],
	textStart: document.getElementsByClassName('textStart')[0],
	passStart: document.getElementsByClassName('passStart')[0],
	buttonOne: document.getElementsByClassName('buttonOne')[0],
	buttonTwo: document.getElementsByClassName('buttonTwo')[0],
	remember: document.getElementById('remember'),
	remember1: document.getElementById('remember1'),
	wrapper: document.getElementsByClassName('wrapper')[0],
	rejectFunction: function(){
		 var that=this;
         that.reject.onmouseenter=function(){
			 that.reject.style.color='skyblue';
			 that.rejectLine.style.backgroundColor='skyblue';
			 that.load.style.color='#000';
			 that.loadLine.style.backgroundColor='#e8ebed';
			 that.rejecting.style.opacity=1;
			 that.rejecting.style.zIndex=1;
			 that.loading.style.opacity=0;
			 that.loading.style.zIndex=0;
			 that.te2.value="请输入用户名";
			 that.pa2.placeholder="请输入密码";
			 that.pa2.value="";
			 //让input框失去焦点
			 that.te2.blur();
			 that.pa2.blur();
			 that.te2.style.color='#e8ebed';
			 that.pa2.style.color='#e8ebed';
		 }
	},
	rejectInput: function(){
		var that=this;
		that.te1.onfocus=function(){
			if(that.te1.value=='请输入用户名'){
				that.te1.value='';
				that.te1.style.color='#000';
		    }
		}
		that.te1.onblur=function(){
			if(that.te1.value==''){
				that.textStart.innerText="*";
				that.textStart.style.color='red';
				that.te1.value='请输入用户名';
				that.te1.style.color='#e8ebed';
			}
			else if(that.te1.value!=''){
				that.textStart.innerText="√";
				that.textStart.style.color='green';
			}
		}
		that.pa1.onfocus=function(){
			if(that.pa1.placeholder=='请输入密码'){
				that.pa1.placeholder='';
				that.pa1.style.color='#000';
				that.passStart.innerText="*";
				that.passStart.style.color='red';
		    }
		}
		that.pa1.onblur=function(){
			if(that.pa1.placeholder==''){
				that.pa1.placeholder='请输入密码';
			}
			else if(that.pa1.value.length>=6&&that.pa1.value.length<16){
				that.passStart.innerText="√";
				that.passStart.style.color='green';
			}
			else{
				that.passStart.innerText="*";
				that.passStart.style.color='red';
			}
		}
	},
	loadInput: function(){
		var that=this;
		that.te2.onfocus=function(){
			if(that.te2.value=='请输入用户名'){
				that.te2.value='';
				that.te2.style.color='#000';
		    }
		}
		that.te2.onblur=function(){
			if(that.te2.value==''){
				that.te2.value='请输入用户名';
				that.te2.style.color='#e8ebed';
			}
		}
		that.pa2.onfocus=function(){
			if(that.pa2.placeholder=='请输入密码'){
				that.pa2.placeholder='';
				that.pa2.style.color='#000';
		    }
		}
		that.pa2.onblur=function(){
			if(that.pa2.placeholder==''){
				that.pa2.placeholder='请输入密码';
			}
		}
	},
	loadFunction: function(){
		var that=this;
		that.load.onmouseenter=function(){
			that.load.style.color='skyblue';
			that.loadLine.style.backgroundColor='skyblue';
			that.reject.style.color='#000';
			that.rejectLine.style.backgroundColor='#e8ebed';
			that.loading.style.opacity=1;
			that.loading.style.zIndex=1;
			that.rejecting.style.opacity=0;
			that.rejecting.style.zIndex=0;
			that.te1.value="请输入用户名";
			that.pa1.value="";
			that.pa1.playholder="请输入密码";
			that.te1.blur();
			that.pa1.blur();
			that.te1.style.color='#e8ebed';
			that.pa1.style.color='#e8ebed';
		    that.textStart.innerText="*";
			that.passStart.innerText="*";
			that.textStart.style.color='red';
			that.passStart.style.color='red';
			that.remember.checked=false;
			that.remember1.checked=false;
		}
	},
	//注册界面的确定按钮    ----->post
	rejectButton: function(){
		var that=this;
		var str="";
		that.buttonOne.onclick=function(){
			if(that.textStart.innerText=="√"&&that.passStart.innerText=="√"){
				var url="http://localhost:8079/blog/reg";
				str="userName="+that.te1.value+"&"+"password="+that.pa1.value;
				var xhr=new XMLHttpRequest();
				xhr.onreadystatechange=function(){
					if(xhr.status==200&&xhr.readyState==4){
						//json字符串转对象
						var json=JSON.parse(xhr.responseText);
						if(json.status){
							alert(json.msg);
						}else{
							alert("失败"+",   "+json.msg);
						}
					}
				}
				xhr.open('post',url,true);
				//这句话特别重要!!!
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
				xhr.send(str);
			}
		}
	},
	//登录界面的确定按钮     ---->get
    loadButton: function(){
    	var that=this;
		function addButtonTwoAjax(){
			   var url="http://localhost:8079/blog/load";
			   var flag;
			   url+="?userName="+that.te2.value+"&password="+that.pa2.value+"&check="+that.remember.checked+"&check1="+that.remember1.checked;
			   var xhr=new XMLHttpRequest();
			   xhr.onreadystatechange=function(){
					if(xhr.status==200&&xhr.readyState==4){
						var json=JSON.parse(xhr.responseText);
						//对于JSON字符串的处理。
						if(json.status){
							window.location.href="../index/index.html";
							window.localStorage.setItem('userId',`${json.userId}`);
							window.localStorage.setItem('userName',json.userName);
						}else{
							alert("失败"+",   "+json.msg);
						}
					}
				}
				xhr.open('get',url,true);
				//支持cookie跨域 3
				xhr.withCredentials = true;
				xhr.send(null);
		}
    	that.buttonTwo.addEventListener('click',addButtonTwoAjax);
    }
}
function main(){
	obj.rejectFunction();
	obj.loadFunction();
	obj.rejectInput();
	obj.loadInput();
	obj.rejectButton();
	obj.loadButton();
}
main();
