# myBlog
这是一个博客项目
##### 一.登录注册

1)前端:blog/www/load/load.html

描述:博客登录或者博客注册页面

2)后台

方法:登录用GET，注册用POST

url:```localhost:8080/blog/reg```

```localhost:8080/blog/load```

参数:

userName:"xxxxx"   //用户名称,字符串类型，唯一标识

password:"xxxxxx"   //用户密码

返回数据:

```json
//登录成功
{
    "status":1,
    "msg":"ok"
}
//登录失败
{
    "status":0,
    "msg":"false"
}
//注册成功
{
    "status":1,
    "userId":"xxxxx"
}
//注册失败
{
    "status":0,
    "msg":"false"
}
```



##### 二.主页

1)前端:blog/www/index/index.html

描述:博客主页可以进入消息页面，进入搜索页面，进入分类页面。主页展示推荐文章，动态文章，前端文章。

2)后台

方法:GET

url:```localhost:8080/blog/index```

参数:无

返回数据:

```json
{
    "status":1,
     "res":{
             //推荐文章
             "art1":[
                 {
                       "artId":'a0',                                  //文章id
				       "mainTitle":"檀 优秀写人作文800字",            //文章主标题
				       "subhead":"初次结识檀，是在江南。她素喜采茶"      //文章副标题
                 }
             ],
             //动态文章
             "art2":[
                 {
                     "artId":'b0',
				     "mainTitle":"七里香",
				     "subTitle":"溪水急著要流向海洋 浪潮却渴望重回土地"
                 }
              ],
             //前端文章
             "art3":[
                 {
                     "artId":'c0',
				     "mainTitle":"从前慢",
				     "subTitle":"记得早先少年时\n大家诚诚恳恳\n说一句 是一句"
                 }
              ],
        }
}
```

##### 三.文章页面

1)前端

描述:从文章简介处可以进入文章详情

2)后台

方法:GET

url:```localhost:8080/blog/article```

参数:诸如id='a0'

返回数据:

```json
{   
    "status":1,
    "res":{
         "userId":111,                                  //用户id
         "mainTitle":"檀 优秀写人作文800字",                  //文章主标题
         "content":"xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",         //文章正文
         "postTime":"xxxx-xx-xx",                            //发布文章的时间,string型
         "readTime":1,                                    //阅读文章的时间,int型,单位分钟
         "ownerImage":'xxxx',                               //用户图片
         "ownerName":'xxxxx',                               //用户昵称
         "ownerAge":xxxx-xx-xx,                                //用户码龄
         "ownerPraise":2                                    //文章赞数
    }
}
```



##### 四.消息页面的点赞页面

###### 界面1：文章的点赞

1)前端

描述:每个用户只能点赞一次，如果该文章已经被点赞过再次点击赞后将取消点赞，点赞次数减一。一旦点赞那么就发送数据给后台

2)后台

方法:POST

url:```localhost:8080/blog/praise```

参数: 

artId:"xxxx",

返回数据:

```json
{
    "status":1,
    "msg":"ok"
}
```

###### 界面2：点赞文章显示页面

1)前端

描述:显示其他用户点赞的自己博客的历史记录

2)后台

方法：GET

url:```localhost:8080/blog/showPraise```

参数:userId:"qq_1"

返回数据:

```json
{
    "status":1,
    "res":[
        {
            "userImage":"xxxx",             //用户图片
            "userName":"xxxxx",             //用户昵称
            "artId":"a0",                      //文章id
            "mainTitle":"xxxx",             //文章主标题
            "praiseTime":111111111111       //点赞的时间,int型，单位s
        },{
            "userImage":"xxxx",
            "userName":"xxxxx",
            "artId":"b1",
            "mainTitle":"xxxx",
            "praiseTime":111111111111 //int型，单位s
        }
    ]
}
```



##### 五.消息页面的粉丝页面

1)前端

描述:每个粉丝信息中与关注人标记在一起。

2)后台

方法:POST

url: ```localhost:8080/blog/fans```

参数:userId="xxxx"

返回数据:

```json
{
    "status":1,
    "res":{
        "fansGroup":[{
            "userId":"xxxx",
            "userName":"xxxx",
            "userImage":"xxxxx",
            "userIntroduce":"xxxxx",
            "focus":1
        },{
            "userId":"xxxx",
            "userName":"xxxx",
            "userImage":"xxxxx",
            "userIntroduce":"xxxxx",
            "focus":0
        }
        ]
    }
}
```



##### 六.消息页面的关注页面

1)前端

描述:每个粉丝信息中与关注人标记在一起。

2)后台

方法:POST

url: ```localhost:8080/blog/focus```

参数:userId="xxxx"

返回数据:

```json
{
    "status":1,
    "res":{
        "fansGroup":[{
            "userId":"xxxx",
            "userName":"xxxx",
            "userImage":"xxxxx",
            "userIntroduce":"xxxxx",
            "focus":1
        },{
            "userId":"xxxx",
            "userName":"xxxx",
            "userImage":"xxxxx",
            "userIntroduce":"xxxxx",
            "focus":0
        }
        ]
    }
}
```



##### 七.用户界面

###### 界面1

1)前端

2)后台

方法:GET

url:```localhost:8080/blog/mine```

参数:userId=xxxx

返回数据:

```json
{
    "status":1,
    "res":{
        "userImage":"xxxxx",
        "userName":"xxxx",
        "userFocus":3,
        "userFans":2
    }
}
```

###### 界面2

1)前端

2)后台

方法:GET

url:```localhost:8080/blog/mine2```

参数:userId="xxx"

返回数据:

```json
{
    "status":1,
    "res":{
        "userName":"xxxx",
        "userImage":"xxxx",
        "userSex":"女",
        "userFoucs":3,
        "userFans":2,
        "userIntrudoce":"xxxx",
        "blog":0,
        "luntan":0,
        "blink":2,
        "article":[
            {
                 "artId":"d1",
                 "mainTitle":"檀 优秀写人作文800字",
	             "subhead":"初次结识檀，是在江南。她素喜采茶",
                 "postTime":xxxx-xx-xx,    
            },{
                
                 "artId":"d2",
                 "mainTitle":"檀 优秀写人作文800字",
	             "subhead":"初次结识檀，是在江南。她素喜采茶",
                 "postTime":xxxx-xx-xx,    
            }
        ]
    }
}
```

###### 界面三

1)前端

2)后台：如果发生了数据更改那么就要post，若无就不需要post

方法:POST

url:```localhost:8080/blog/mine3```

参数:userSex="男"

userArea="中国 天津 和平区"

返回数据:

```json
{
    "status":1,
    "msg":"ok"
}
```
