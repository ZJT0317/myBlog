const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const expressStatic=require('express-static');
var server=express();
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'jinting0317',
	port:'3306',
	database:'test'
})
connection.connect(function(err){
	if(err){
		console.log('连接失败');
		console.log(err);
	}else{
		console.log('连接成功');
	}
})
function select(f){
	var p=new Promise(function(resolve,reject){
		var sql;
		if(f[6]=='2'){
			sql='SELECT artId,mainTitle,subhead,ownerImage,ownerName,postTime FROM '+f;
		}else{
			sql='SELECT artId,mainTitle,subhead FROM '+f;
		}
		connection.query(sql,function(err,result){
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
//解决跨域问题!!!
server.use('*',function(req,res,next){
	res.header("Access-Control-Allow-Origin",req.headers.origin);
	res.header("Access-Control-Allow-Headers","Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials",true);
	next();
})
//GET请求
server.use('/blog/index',function(req,res){
	var m1=select('banner1Group');
	m1.then(function(data1){
		var m2=select('banner2Group');
		m2.then(function(data2){
			var m3=select('banner3Group');
			m3.then(function(data3){
				res.send({
					"status":1,
					"res":{
						"art1":data1,
						"art2":data2,
						"art3":data3
					}
				})
			},function(){res.send({"status":0})})
		},function(){ res.send({"status":0})})
	},function(){
		res.send({"status":0})
	})
})
server.listen(8080);