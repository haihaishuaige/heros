var http = require('http')
var server = http.createServer()
var fs = require('fs')
var router = require('./router')

//使用express模块
var express = require('express')
var app = express()
//获取模块
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//设置端口
app.listen(4024,()=>{
    console.log('http://127.0.0.1:4024')
})
app.engine('html',require('express-art-template')); 
app.set('view options',{ 
    debug:process.env.NODE_ENV!== 'production'
 });
// server.on('request',(req,res)=>{
//     router(req,res)
// })
app.use(urlencodedParser)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(express.static('public'))
app.use(router)