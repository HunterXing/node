const querystring = require('querystring')

const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')

// 用于处理 postData
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // console.log(req.method)
        // console.log(req.headers['content-type'])
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置json返回格式
    res.setHeader('Content-type', 'application/json')

    // 获取 url和 path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析get参数
    req.getParams = querystring.parse(url.split('?')[1])



    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''  // k1=v1;k2=v2;k3=v3;
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1]
        req.cookie[key] = value
    });
    console.log('req.cookie is:',req.cookie)

    // 处理postData
    getPostData(req).then(postData => {
        req.body = postData
        // 处理blog 和user 路由
        // const blogData = handleBlogRouter(req, res)
        // blogResult.then(blogData => {
        //     if (blogData) {
        //         res.end(
        //             JSON.stringify(blogData)
        //         )
        //         return
        //     }
        // })

        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (blogData) {
                    res.end(
                        JSON.stringify(blogData)
                    )
                }
            })
            return
        }
        // const userData = handleUserRouter(req, res)
        // if (userData) {
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (userData) {
                    res.end(
                        JSON.stringify(userData)
                    )
                }
            })
            return
        }

        // 未命中路由 返回404
        res.writeHeader(404, {
            "Content-type": "text/plain"
        })
        res.write("404 NOTFOUNT \n")
    })
}

module.exports = serverHandle