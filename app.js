const http = require('http')

// 请求  响应
const server = http.createServer((req, res) => {
    res.end('hello world')
})

// 监听端口
server.listen(8000)