const http = require('http')
const queryString = require('querystring')

const server = http.createServer((req, res) => {
    // 获取请求方式
    const method = req.method
    // 获取url
    const url = req.url
    //获取路径
    const path = url.split('?')[0]
    // 获得参数
    const query = queryString.parse(url.split('?')[1])
    // 设置返回格式为json
    res.setHeader('Content-type', 'application/json')
    // 返回的数据
    const resData = {
        method,
        url,
        path,
        query
    }

    // GET 方式
    if (method === 'GET') {
        res.end(
            JSON.stringify(resData)
        )
    }
    // POST方式
    if (method === 'POST') {
        // 接收数据
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
       
        req.on('end', () => {
            resData.postData = postData
            res.end(
                JSON.stringify(resData)
            )
        })
    }
})

server.listen(8000)