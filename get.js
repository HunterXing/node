const http = require('http')
// querystring 模块提供用于解析和格式化 URL 查询字符串的实用工具
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    // 请求的方式
    console.log(req.method)
    // 获取完整请求url
    const url = req.url
    // 解析  get请求的参数  为?后面  所以数组下标为1
    req.query = querystring.parse(url.split('?')[1])
    // 返回
    res.end(
        // 返回json字字符串
        JSON.stringify(req.query)
    )
})
// 监听的端口号
server.listen(8000)