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
function select(n,choose){
	var p=new Promise(function(resolve,reject){
		var j;
		if(choose==1){
			j="fansgroup ";
		}else{
			j="focusgroup";
		}
		var sql=`SELECT userId,userName,userIntroduce,userImage,focus FROM ${j} WHERE linkId=?`;
		var f=[];
		f.push(n);
		connection.query(sql,f,function(err,result){
			if(err){
				console.log('[SELECT ERROR-]',err);
			}else{
				var dataString=JSON.stringify(result);
				var data=JSON.parse(dataString);
				resolve(data);
			}
		})
	})
	return p;
}
function selectPraise(str){
	var p=new Promise(function(resolve,reject){
		var sql='SELECT userImage,userName,artId,mainTitle,praiseTime FROM praisegroup WHERE linkId=?';
		var f=[str];
		connection.query(sql,f,function(err,result){
			if(err){
				console.log('[SELECT ERROR-]',err);
			}else{
				let dataString=JSON.stringify(result);
				let data=JSON.parse(dataString);
				resolve(data);
			}
		})
	})
	return p;
}
function updata(focus,focusUser,id,choose){
	var p=new Promise(function(resolve,reject){
		if(focus!=undefined){
			var j;
			if(choose==1){
				j="fansgroup";
			}else{
			    j="focusgroup";
		    }
			let str="";
			for(let index in focus,focusUser) {  
			       str+=`WHEN ${focusUser[index]} THEN ${focus[index]} `;
			};  
			let sql=`UPDATE ${j} SET focus=CASE userId `;
			//将数组格式[1,2,3]变成1,2,3
			let s=focusUser+[];
			sql=sql+str+"END WHERE userId IN "+"("+s+")"+" AND linkId="+id;
			connection.query(sql,function(err,result){
				if(err){
					console.log('[UPDATE ERROR-]',err);
				}
			})
		}
		resolve();
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
server.use('/blog/fans',function(req,res){
	let id=req.query["userId"];
	let n=select(id,1);
	n.then(function(data){
		res.send({
			"status":1,
			"res":data
		})
	})
})
server.use('/blog/focus',function(req,res){
	let id=req.query["userId"];
	let n=select(id,2);
	n.then(function(data){
		res.send({
			"status":1,
			"res":data
		})
	})
})
server.use('/blog/praise',function(req,res){
	let id=req.query["userId"];
	var n=selectPraise(id);
	n.then(function(data){
		res.send({
			"status":1,
			"res":data
		})
	})
})
server.use(bodyParser.json({
	limit:'1mb'
}));
server.use(bodyParser.urlencoded({
	extended:true
}))
server.use('/blog/fansTap',function(req,res){
	let data=req.body;
	let id=data.userId;
	let focus=data.fans;
	let focusUser=data.focusUser;
	let n=updata(focus,focusUser,id,1);
	n.then(function(){
		res.send({
			"status":1
		})
	})
})
server.use('/blog/focusTap',function(req,res){
	let data=req.body;
	let id=data.userId;
	let focus=data.fans;
	let focusUser=data.focusUser;
	let n=updata(focus,focusUser,id,2);
	n.then(function(){
		res.send({
			"status":1
		})
	})
})
server.listen(8082);