const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'xingheng',
    password: '123456',
    port: '3306',
    database: 'db_myblog'
})

// 开始连接
con.connect()

// 执行 sql 语句
const sql = `select * from tb_blogs`
con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

// 关闭连接
con.end()