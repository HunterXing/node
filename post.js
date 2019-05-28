const http = require('http')
// querystring 模块提供用于解析和格式化 URL 查询字符串的实用工具
const querystring = require('querystring')

const server = http.createServer((req, res) => {

    //  请求的方式
    const method = req.method

    // 获取完整请求url
    const url = req.url

    // url路径
    const path = url.split('?')[0]

    // 解析  get请求的参数  为?后面  所以数组下标为1
    const getParams = querystring.parse(url.split('?')[1])

    // 设置返回的格式  json格式
    res.setHeader('Content-type','application/json')

    // 返回的数据
    const resData = {
        method,
        url,
        path,
        getParams
    }

    // 0.如果是Post请求
    if (method === 'POST'){
       
        // 接收数据
        let postData = ''
        // chunk为一点点数据，逐渐积累
        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            resData.postData = postData
            // 在这里返回 因为是异步
            res.end(
                // 返回json字字符串
                JSON.stringify(resData)
            )
        })
    }

    // 1. 如果是get请求
    if (method === 'GET'){
        // 返回
        res.end(
            // 返回json字字符串
            JSON.stringify(resData)
        )
    }
})
// 监听端口  0.0.0.0可以同局域网访问
server.listen(8000, '0.0.0.0')