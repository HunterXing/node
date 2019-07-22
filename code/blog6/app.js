const querystring = require('querystring')

const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    // 这是一种时间格式
    console.log('d.toGMTString is:', d.toGMTString())
    return d.toGMTString()
}


// session 数据
const SESSION_DATA = {}
debugger;

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
    const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2;k3=v3;
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1]
        req.cookie[key] = value
    });
    console.log('req.cookie is:', req.cookie)

    // 解析 session
    let needSetCookie = false
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {} 
        }
        req.session = SESSION_DATA[userId]
    } else {
        needSetCookie = true
        // userId = Date.now() + Math.random()
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]
    console.log('session:::', req.session)


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
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
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
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
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