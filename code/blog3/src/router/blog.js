const { getList, getDetail } = require('../controller/blog')
const { SuccssModel, ErrorModel  } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method

    //获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.getParams.author || ''
        const keyword = req.getParams.keyword || ''

        const listData = getList(keyword, keyword)

        return new SuccssModel(listData, '请求博客列表成功')

    }

    //获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.getParams.id || ''

        const data = getDetail(id)
        return new SuccssModel(data, '获取博客详情成功')
    }

    //新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        return {
            meg: '这是新建博客的接口'
        }
    }
    //更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            meg: '这是更新博客的接口'
        }
    }
    //删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        return {
            meg: '这是删除博客的接口'
        }
    }
}

module.exports = handleBlogRouter