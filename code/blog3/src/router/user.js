const handleUserRouter = (req, res) => {
    const method = req.method


     //登录
     if (method === 'POST' && req.path === '/api/user/login') {
        return {
            meg: '这是登录的接口'
        }
    }

  
}

module.exports = handleUserRouter