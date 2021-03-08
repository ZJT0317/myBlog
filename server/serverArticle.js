const express=require('express');
const bodyParser=require('body-parser');
const expressStatic=require('express-static');
const mysql=require('mysql');
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'jinting0317',
	port:'3306',
	database:'test'
})
connection.connect(function(err){
	if(err){
		console.log("连接失败");
		console.log(err);
	}else{
		console.log("连接成功");
	}
})
function select(ele,choose){
	var p=new Promise(function(resolve,reject){
		var sql='SELECT userId,mainTitle,content,postTime,readTime,ownerName,ownerImage,ownerAge,ownerPraise FROM articlegroup WHERE artId=?';
		var f=[];
		f.push(ele);
		connection.query(sql,f,function(err,result){
			if(err){
				console.log('[SELECT ERR-]',err);
			}else{
				var dataString=JSON.stringify(result);
				var data=JSON.parse(dataString);
				resolve(data);
			}
		})
	})
	return p;
}
function updata(...str){
	var p=new Promise(function(resolve,reject){
		var sql='UPDATE articlegroup SET ownerPraise=? WHERE artId=?';
		var f=[...str];
		connection.query(sql,f,function(err,result){
			if(err){
				console.log('[UADATE ERROR-]',err);
			}else{
				var dataString=JSON.stringify(result);
				var data=JSON.parse(dataString);
				resolve();
			}
		})
	})
	return p;
}
function selectArt(artId,userId){
	var p=new Promise(function(resolve,reject){
		var sql='SELECT * FROM praisegroup WHERE artId=? AND userId=?';
		var f=[artId,userId];
		console.log(f);
		connection.query(sql,f,function(err,result){
			if(err){
				console.log('[SELECT ERR-]',err);
			}else{
				console.log('result:',result);
				resolve(result);
			}
		})
	})
	return p;
}
function insert(...str){
	var p=new Promise(function(resolve,reject){
		var add='INSERT INTO praisegroup(id,userImage,userName,mainTitle,artId,praiseTime,linkId,userId) VALUES(0,?,?,?,?,?,?,?)';
		var f=[...str];
		connection.query(add,f,function(err,result){
			if(err){
				console.log('[INSERT ERROR]-',err);
			}else{
				resolve();
			}
		})
	})
	return p;
}
function deleteArt(artId,userId){
	var p=new Promise(function(resolve,reject){
		var del='DELETE FROM praisegroup WHERE artId=? AND userId=?';
		var f=[artId,userId];
		console.log('DELETE Data:',artId,userId);
		connection.query(del,f,function(err,result){
			if(err){
				console.log('[DELETE ERROR]-',err);
			}else{
				resolve();
			}
		})
	})
	return p;
}
//GET
var server=express();
server.use("*",function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials",true);
	next();
})
server.use('/blog/article',function(req,res){
	var m=req.query["artId"];
	var a=req.query["count"];
	var userId=req.query["userId"];
	if(a==undefined){
		let n=select(m);
		n.then(function(data){
			let f=selectArt(m,userId);
			f.then(function(data1){
				console.log('data1:',data1);
				if(JSON.stringify(data1)==JSON.stringify([])){
					data[0].mark=0;
				}else{
					data[0].mark=1;
				}
				console.log('data[0].mark:',data[0].mark);
				res.send({
					"status":1,
					"res":data
				})
			})
		})
	}else{
		let n=updata(a,m);
		n.then(function(){
			res.send({
				"status":1
			})
		})
	}
})
//POST
server.use(bodyParser.urlencoded({
	extended:true
}))
server.use('/blog/praiseUser',function(req,res){
	let userImage=req.body["userImage"];
	let userName=req.body["userName"];
	let mainTitle=req.body["mainTitle"];
	let artId=req.body["artId"];
	let praiseTime=req.body["praiseTime"];
	let linkId=req.body["linkId"];
	let userId=req.body["userId"];
	var mark=req.body["mark"];
	console.log('mark',mark);
	console.log('artId',artId);
	let m=selectArt(artId,userId);
	m.then(function(data){
		//添加数据,如果表中没有这一数据并且mark=1那么添加!!!
		if(JSON.stringify(data)==JSON.stringify([])&&mark==1){
			insert(userImage,userName,mainTitle,artId,praiseTime,linkId,userId);
		}else if(JSON.stringify(data)!=JSON.stringify([])&&mark==0){
			//删除数据,如果表中有这一数据并且mark=0那么删除!!!
			console.log('delete');
			deleteArt(artId,userId);
		}
	})
})
server.listen(8081);