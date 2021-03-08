class Back{
    constructor() {
        this.triangle=document.getElementsByClassName('triangle')[0];
	}
	back(){
	   var that=this;
	   that.triangle.onclick=()=>{
		  window.history.go(-1);
	   }
	}
}
class MineCate{
	constructor(){
		this.mineCateError=document.getElementsByClassName('mineCateError')[0];
	    this.mineDiv=document.getElementsByClassName('mineDiv');
	    this.mineCate1=document.getElementsByClassName('mineCate1')[0];
		this.moreDiv=document.getElementsByClassName('mineCate1')[0].getElementsByTagName('div');
	    this.len=this.mineDiv.length;
		this.len1=this.moreDiv.length;
	}
	//当我们点击我的时，我的元素有一个取消,mineCate1中增加这个元素
	//增加的这个元素点击它同样也会有一个效果--->点击这个元素时
	//mineCate1中减少一个元素,mineCateError却增加一个元素。
	cancelElmMine(i){
		//2
		var that=this;
		let div=document.createElement('div');
		let f1=document.getElementsByClassName('mineCate1')[0].getElementsByTagName('div').length;
		div.onclick=function(){ that.cancelEleMore(f1); };
		let span1=document.createElement('span');
		span1.innerText=that.mineDiv[i].getElementsByTagName('span')[0].innerText;
		let span2=document.createElement('span');
		span2.setAttribute('class','error error1');
		span2.innerText='+';
		div.appendChild(span1);
		div.appendChild(span2);
		that.mineCate1.appendChild(div);
		that.mineDiv[i].style.display="none";
	}
	mineclick(){
		var that=this;
		for(let i=0;i<that.len;++i){
			that.mineDiv[i].onclick=()=>{
				that.cancelElmMine(i);
			}
		}
	}
	cancelEleMore(i){
		var that=this;
		let div=document.createElement('div');
		div.setAttribute('class','mineDiv');
		let f2=document.getElementsByClassName('mineDiv').length;
		// console.log(f1);  --->2
		div.onclick=function(){ that.cancelElmMine(f2); };   
		let span1=document.createElement('span');
		span1.innerText=that.moreDiv[i].getElementsByTagName('span')[0].innerText;
		let span2=document.createElement('span');
		span2.setAttribute('class','error');
		span2.innerText='x';
		div.appendChild(span1);
		div.appendChild(span2);
		that.mineCateError.appendChild(div);
		that.moreDiv[i].style.display="none";
	}
	moreclick(){
		var that=this;
		for(let i=0;i<that.len1;++i){
			that.moreDiv[i].onclick=()=>{
				that.cancelEleMore(i);
			}
		}
	}
}
function main(){
	var back=new Back();
	back.back();
	var mineCate=new MineCate();
	mineCate.mineclick();
	mineCate.moreclick();
}
main();