const env = process.env.NODE_ENV // 环境参数

console.log(env)

let MYSQL_CONF
let REDIS_CONF
// 开发环境
if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'xingheng',
        password: '123456',
        port: '3306',
        database: 'db_myblog'
    }
    // redis 配置
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
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
    },
    // redis 配置
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}