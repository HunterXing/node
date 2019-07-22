const http = require('http')

http.createServer((req,res) => {
    res.setHeader('Content-type', 'application/json')
    res.end(
        JSON.stringify({
            errno: 0,
            msg: 'pm2 test start'
        })
    )
}).listen(8081)