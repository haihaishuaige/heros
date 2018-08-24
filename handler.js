var fs = require('fs')
var formidable = require('formidable')
var path = require('path')
var modules = require('./dataModules')
var queryString = require('querystring');
var myurl = require('url')
var template = require('art-template')
//加载index结构
exports.getIndexStatic = (req, res) => {
    modules.getIndexStatic((err, data) => {
        if (err) res.end('err')
        else {      
            // var html = template(__dirname + '/views/index.html', data)
            // res.end(html)
            res.render(__dirname + '/views/index.html', data)
        }
    })
}
//加载css和图片
exports.getIndexImg = (req, res) => {
    fs.readFile(__dirname + req.url, (err, data) => {
        if (err) res.end('err')
        else {
            res.end(data)
        }
    })
}
//加载add页面
exports.getAddStatic = (req, res) => {
    fs.readFile(__dirname + '/views/add.html', (err, data) => {
        if (err) res.end('err')
        else {
            res.end(data)
        } 
    })
}
//实时图片展示
exports.getAddImg = (req, res) => {
    //创建对象
    var form = new formidable.IncomingForm()
    //设置编码
    form.encoding = 'utf-8'
    //文件上传存放的地址
    form.uploadDir = __dirname + "/public/images";
    //保存原来的文件拓展名
    form.keepExtensions = true; 
    form.parse(req, function (err, fields, files) {
        // console.log(files);   上传文件的具体信息
        var imgPath = path.basename(files.img.path)
     
        if (err) {
            var imgValue = {
                code: '-1',
                msg: '发送失败',
                data: ''
            }
            res.end(JSON.stringify(imgValue))
        } else {
            var imgValue = {
                code: '200',
                msg: '发送成功',
                data: imgPath
            }
            res.end(JSON.stringify(imgValue))
        }
    });
}
//add页面新增功能
exports.AddStatic = (req, res) => { 
    modules.getAddStatic(req.body, (err) => {
        if (err) {
            var addValue = {
                code: '-1',
                msg: '新增失败'
            }
            res.end(JSON.stringify(addValue))
        } else {
            var addValue = {
                code: '200',
                msg: '新增成功'
            }
            res.end(JSON.stringify(addValue))
        }
    })
    //接收前台发送过来的数据
    // var str = '';
    // //chunk是每一个数据  要定义一个空字符串来拼接
    // req.on('data', (chunk) => {
    //     str += chunk;
    // })
    // //end是接受结束后触发的事件
    // req.on('end', () => {
    //     // console.log(str);
    //     var dataObj = queryString.parse(str.toString());
    //     //拿到的为一个对象，读取json文件的数据，把这个对象添加进去
       

    // })

}
//编辑页面数据展示
exports.getEditStatic = (req, res) => {
    //接收发送过来的id
    var parseObj = myurl.parse(req.url, true);
    var id = parseObj.query.id;
    modules.getEditText(id, (err, data) => {
        if (err) res.end('err')
        else {      
            // var html = template(__dirname + '/views/edit.html', data)
            // res.end(html)
            res.render(__dirname + '/views/edit.html', data)
        }
    })
}
//编辑页面数据更新
exports.editText = (req, res) => {
     //  找到符合的id
     modules.editTextUpdate(req.body,(err,data)=>{
        if(err)res.end('err')
        else{             
            res.end(JSON.stringify(data))
        }
    })
    // var form = new formidable.IncomingForm()
    // form.encoding = 'utf-8'
    // form.parse(req, function (err, fields, files) {
    //     if(err)res.end('err')
    //     else{
           
    //     }
    // });
}
//点击删除按钮
exports.delClick=(req,res)=>{
    var id = myurl.parse(req.url, true).query.id;
    modules.delText(id,(err,data)=>{
        if(err)res.end('err')
        else{   
            res.end(JSON.stringify(data))  
        }
    })
    
}