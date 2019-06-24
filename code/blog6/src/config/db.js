const env = process.env.NODE_ENV // 环境参数

console.log(env)

let MYSQL_CONF

// 开发环境
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'xingheng',
        password: '123456',
        port: '3306',
        database: 'db_myblog'
    }
}

// 生产环境
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'xingheng',
        password: '123456',
        port: '3306',
        database: 'db_myblog'
    }
}

module.exports = {
    MYSQL_CONF
}