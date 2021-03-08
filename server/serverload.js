const express=require('express');
const expressStatic=require('express-static');
const bodyParser=require('body-parser');
const session=require('express-session');
const cookieParser=require('cookie-parser');
//数据库连接
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
		console.log('连接失败');
		console.log(err);
	}else{
		console.log('连接成功');
	}
})
function select(name){
	var p=new Promise(function(resolve,reject){
		var sql='SELECT userId,userName,password FROM blogUser WHERE userName=?';
		var f=[];
		f.push(name);
		connection.query(sql,f,function(err,result){
			if(err){
				console.log('[SELECT ERROR]-',err.message);
			}else{
				var dataString=JSON.stringify(result);
				var data=JSON.parse(dataString);
				resolve(data[0]);
			}
		})
	})
	return p;
}
function insert(arr){
	var addsql='INSERT INTO blogUser(userId,userName,password) VALUES(0,?,?)';
	var addsqlStr=arr;
	//arr=['name','pass'];
	connection.query(addsql,addsqlStr,function(err,reslut){
		if(err){
			console.log('[INSERT INTO]-',err.message);
		}else{
			console.log('INSERT is success');
		}
	})
}
//关于注册--->POST
var server=express();
server.use(bodyParser.urlencoded({
	extended:false
}))
//解决跨域
server.use('*',function(req,res,next){
	res.header("Access-Control-Allow-Origin",req.headers.origin);
	res.header("Access-Control-Allow-Headers","Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials",true);
	next();
})
server.use('/blog/reg',function(req,res,next){
	var POST=req.body;
	var arr=[];
	var test=select(POST.userName);
	test.then(function(data){
		users=data;
		console.log('注册用户信息为:',users);
		if(users==undefined){
			arr.push(POST.userName);
			arr.push(POST.password);
			insert(arr);
			res.send({
                status:1,
                msg:"注册成功"})
	    }else{
		    res.send({
				status:0,
				msg:"用户名已经存在"
			});
		}
	})
})
//关于登录--->GET
server.use('/blog/load',function(req,res){
	var name=req.query['userName'];
	var pass=req.query['password'];
	var check=req.query['check'];
	var check1=req.query['check1'];
	var test=select(name);
	var users;
	test.then(function(data){
		users=data;
		if(users==undefined){
			res.send({status:0,msg:"该用户不存在"});
		}else if(users['password']!=pass){
			res.send({status:0,msg:"用户名或者密码错误"});
		}else{
			res.send({status:1,userId:users.userId,
			userName:name,msg:"登录成功"});
		}
	})
})
server.use(expressStatic('../../blog/www/load'));
server.listen(8079);
