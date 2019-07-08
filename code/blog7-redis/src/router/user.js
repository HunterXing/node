const {
    login
} = require('../controller/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    const method = req.method
    //登录
    if (method === 'GET' && req.path === '/api/user/login') {
        const {
            username,
            password
        } = req.getParams
        const result = login(username, password)

        return result.then(data => {
            if (data.username) {
                // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                req.session.username = data.username
                req.session.realname = data.realname
                
                // 同步到redis中
                set(req.sessionId, req.session)

                console.log('req.session is:', req.session)
                return new SuccessModel('登陆成功')
            }
            return new ErrorModel('登陆失败')

        })
    }

    // 登录验证的测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        console.log('hi')
        if (req.session.username) {
            return Promise.resolve(new SuccessModel({
                session: req.session
            }, '已经登陆'))
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     console.log('hi')
    //     if (req.cookie.username) {
    //         return Promise.resolve(new SuccessModel({
    //             username: req.cookie.username
    //         }, '已经登陆'))
    //     }
    //     return Promise.resolve(new ErrorModel('尚未登录'))
    // }
}

module.exports = handleUserRouter
