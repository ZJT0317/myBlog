const express=require('express');
const  bodyParser=require('body-parser');
const expressStatic=require('express-static');
const mysql=require('mysql');
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'jinting0317',
	port:3306,
	database:'test',
})
connection.connect(function(err){
	if(err){
		console.log('连接失败');
		console.log(err);
	}else{
		console.log("连接成功");
	}
})
function select(n){
	var p=new Promise(function(resolve,reject){
	    var sql='SELECT userImage,userName,userSex,userFocus,userFans FROM bloguser WHERE userId=?';
	    var f=[];
	    f.push(n);
	    connection.query(sql,f,function(err,result){
	         if(err){
	    		 console.log("[SELECT ERROR-]",err);
	    	 }else{
	    		 var dataString=JSON.stringify(result[0]);
	    		 var data=JSON.parse(dataString);
	    		 resolve(data);
	    	 }
	    })	
	})
	return p;
}
function selectOwn(n){
	var p=new Promise(function(resolve,reject){
	    var sql='SELECT userImage,userName,userSex,userAge,userIntroduce,userFocus,userFans,blog,luntan,blink FROM bloguser WHERE userId=?';
	    var f=[];
	    f.push(n);
	    connection.query(sql,f,function(err,result){
	         if(err){
	    		 console.log("[SELECT ERROR-]",err);
	    	 }else{
	    		 var dataString=JSON.stringify(result[0]);
	    		 var data=JSON.parse(dataString);
	    		 resolve(data);
	    	 }
	    })	
	})
	return p;
}
function selectArticle(n,choose){
	var p=new Promise(function(resolve,reject){
		var sql;
		if(choose==1){
			sql='SELECT artId,mainTitle,subhead,postTime FROM banner1group WHERE userId=?';
		}else if(choose==2){
			sql='SELECT artId,mainTitle,subhead,postTime FROM banner2group WHERE userId=?';
		}else{
			sql='SELECT artId,mainTitle,subhead,postTime FROM banner3group WHERE userId=?';
		}
	    f=[n];
	    connection.query(sql,f,function(err,result){
	         if(err){
	    		 console.log("[SELECT ERROR-]",err);
	    	 }else{
	    		 var dataString=JSON.stringify(result);
	    		 var data=JSON.parse(dataString);
	    		 resolve(data);
	    	 }
	    })	
	})
	return p;
}
function selectMine(n){
	var p=new Promise(function(resolve,reject){
		var sql='SELECT userImage,userName,userSex,userArea,userIntroduce FROM bloguser WHERE userId=?';
		var f=[];
		f.push(n);
		connection.query(sql,f,function(err,result){
		     if(err){
				 console.log("[SELECT ERROR-]",err);
			 }else{
				 var dataString=JSON.stringify(result[0]);
				 var data=JSON.parse(dataString);
				 console.log(data);
				 resolve(data);
			 }
		})	
	})
	return p;
}
function updataAll(...str){
	var p=new Promise(function(resolve,reject){
		var sql='UPDATE bloguser SET userArea=?,userSex=?,userIntroduce=? WHERE userId=?';
		var f=[...str];
		connection.query(sql,f,function(err,result){
			if(err){
				console.log('[UPDATE All ERROR-]',err);
			}else{
				var dataString=JSON.stringify(result);
				var data=JSON.parse(dataString);
				resolve();
			}
		})
	})
	return p;
}
var server=express();
server.use('*',function(req,res,next){
	res.header("Access-Control-Allow-Origin",req.headers.origin);
	res.header("Access-Control-Allow-Headers","Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials",true);
	next();
})
server.use(bodyParser.urlencoded({
	extended:false
}))
server.use('/blog/mine',function(req,res){
	var m=req.query["userId"];
	var n=select(m);
	n.then(function(data){
		res.send({
			"status":1,
			"res":data
		})
	},function(){
		res.send({"status":0});
	})
})
server.use('/blog/mine2',function(req,res){
	var m=req.query["userId"];
	var n1=selectOwn(m);
	n1.then(function(data1){
		let n2=selectArticle(m,1);
		n2.then(function(data2){
			let n3=selectArticle(m,2);
			n3.then(function(data3){
				let n4=selectArticle(m,3);
				n4.then(function(data4){
					data1.article=[...data2,...data3,...data4];
					res.send({
						"status":1,
						"res":data1
					})
				})
			})
		},function(){ res.send({"status":0,"msg":"找文章有误"})});
	},function(){
		res.send({"status":0,"msg":"查询有误"});
	})
})
server.use('/blog/mine3',function(req,res){
	var m=req.query["userId"];
	var n1=selectMine(m);
	n1.then(function(data1){
		res.send({
			"status":1,
			"res":data1
		})
	})
})
server.use('/blog/mine4',function(req,res){
	var data=req.body;
	var m=updataAll(data.area,data.sex,data.intro,data.userId);
	m.then(function(){
		res.send({
			"status":1
		})
	},function(){
		res.send({"status":0})
	})
})
server.listen(8083);