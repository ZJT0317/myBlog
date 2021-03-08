class Title{
	constructor() {
	    this.titleSpan=document.getElementsByClassName('wrapper')[0].getElementsByTagName('span');
	}
	tap(){
		var that=this;
		var len=that.titleSpan.length;
		for(let i=0;i<len;++i){
			this.titleSpan[i].onclick=()=>{
				for(let j=0;j<len;++j){
					if(this.titleSpan[j].className=='red'){
						this.titleSpan[j].className='';
					}
				}
				this.titleSpan[i].className='red';
			}
		}
	}
}
function main(){
	let title=new Title();
	title.tap();
}
main();