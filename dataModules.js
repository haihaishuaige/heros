var fs = require('fs')
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'heros'
})
// connection.connect();
//获取index动态数据资源
exports.getIndexStatic = (callback) => {
    var sql = 'select * from herosData where isDeleted=0';
    connection.query(sql, (err, result) => {
        if (err) callback(err)
        else {
            callback(null, {
                heros: result
            })
        }
    })
}
//add页面读取json文件的数据
exports.getAddStatic = (dataObj, callback) => {
    var sql = `insert into herosData values(null,'${dataObj.name}','${dataObj.gender}','${dataObj.img}',default)`
    connection.query(sql, (err, result) => {
        if (err) callback(err)
        else {
            callback(null)
        }
    })
}
//编辑页面动态获取当前数据
exports.getEditText = (id, callback) => {
    var sql = `select * from herosData where id =${id} `
    connection.query(sql, (err, result) => {
        if (err) callback(err)
        else {
            callback(null, {
                data: result
            })
        }
    })
}
//完成编辑更新功能
exports.editTextUpdate = (fields, callback) => {
    var sql = `update herosData set ? where id = ?`
    connection.query(sql, [fields, fields.id], (err, result) => {
        if (err) {
            var editValue = {
                code: '-1',
                msg: '修改失败'
            }
            callback(editValue)
        } else {
            if (result.affectedRows != 0) {
                var editValue = {
                    code: '200',
                    msg: '修改成功'
                }
                callback(null, editValue)
            }
        }
    })
}
//删除数据
exports.delText = (id, callback) => {
    var sql = `update herosData set isDeleted=1 where id = ?`
    connection.query(sql, [id], (err, result) => {
        if (err) {
            var delValue = {
                code: '-1',
                msg: '删除失败'
            }
            callback(delValue)
        } else {
            if (result.affectedRows != 0) {
                var delValue = {
                    code: '200',
                    msg: '删除成功'
                }
                callback(null, delValue)
            }
        }
    })
}