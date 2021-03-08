class Back{
    constructor() {
        this.triangle=document.getElementsByClassName('triangle')[0];
        this.inputWord=document.getElementsByClassName('inputWord')[0];
	}
	back(){
	   var that=this;
	   that.triangle.onclick=()=>{
		  window.history.go(-1);
	   }
	}
	showBlur(){
		this.inputWord.focus();
	}
}
class Search{
	constructor(){
		this.add=document.getElementsByClassName('add')[0];
	    this.historyWrapper=document.getElementsByClassName('historyWrapper')[0];
	    this.inputWord=document.getElementsByClassName('inputWord')[0];
		this.clearAll=document.getElementsByClassName('clearAll')[0];
		this.error=document.getElementsByClassName('error');
		this.len=0;
	}
	storage(f){
		let str=window.localStorage.getItem('search')||"";
		//将" 0, 1, 2"——>[' 0',' 1',' 2']
		if(str!=""){
			str=str.split(",");
		}else{
			str=[];
		}
		str.push(f);
		str=str.join(",");
		window.localStorage.setItem('search',str);
	}
	deleteStorage(f){
		let str=window.localStorage.getItem('search');
		//将" 0, 1, 2"——>[' 0',' 1',' 2']
		str=str.split(",");
		str.splice(str.indexOf(f),1);
		str=str.join(",");
		window.localStorage.setItem('search',str);
	}
	addSearchHistory(choose){
		let div=document.createElement('div');
		div.setAttribute('class','historyContent');
		let span1=document.createElement('span');
		span1.setAttribute('class','spanImg');
		div.appendChild(span1);
		let span2=document.createElement('span');
		if(choose==1){
			span2.innerText=" "+this.inputWord.value;
		}else{
			span2.innerText=arguments[1];
		}
		div.appendChild(span2);
		if(choose==1){
			this.storage(span2.innerText);
		}
		let span3=document.createElement('span');
		span3.setAttribute('class','error');
		div.appendChild(span3);
		this.historyWrapper.appendChild(div);
		span3.onclick=()=>{
			console.log(span3.parentNode);
			span3.parentNode.style.display='none';
			this.deleteStorage(span2.innerText);
		}
		this.len++;
	}
	tapSearch(){
		this.add.onclick=()=>{
			this.addSearchHistory(1);
		}
	}
	tapClear(){
		this.clearAll.onclick=()=>{
			this.historyWrapper.innerHTML="";
		}
	}
	load(){
		var self=this;
		window.onload=()=>{
			let text=window.localStorage.getItem('search');
			if(text!=null&&text!=""){
				let str=text.split(",");
				for(let j=0;j<str.length;++j){
					this.addSearchHistory(2,str[j]);
				}
			}
		}
	}
}
function main(){
	var back=new Back();
	back.back();
	back.showBlur();
	var search=new Search();
	search.tapSearch();
	search.tapClear();
	search.load();
}
main();