const serverHandle = (req, res) => {
    // 设置json返回格式
    res.setHeader('Content-type','application/json')

    // 返回的数据
    const resData = {
        name: 'xingheng222',
        age: 21,
        env: process.env.NODE_ENV
    }

    res.end(
        JSON.stringify(resData)
    )
}
module.exports = serverHandle