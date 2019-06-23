const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel  } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.getParams.id || ''
    //获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.getParams.author || ''
        const keyword = req.getParams.keyword || ''

        const listData = getList(author, keyword)

        return new SuccessModel(listData, '请求博客列表成功')

    }

    //获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        

        const data = getDetail(id)
        return new SuccessModel(data, '获取博客详情成功')
    }

    //新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const blogData = req.body
        const data = newBlog(req.body)
        return new SuccessModel(data, '新建博客成功')
    }

    //更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel(result, '更新博客成功')
        }

    }
    //删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id)
        if (result) {
            return new SuccessModel(result, '删除博客成功')
        }
    }
}

module.exports = handleBlogRouter