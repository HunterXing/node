// 得到博客列表
const getList = (author, keyword) => {
    return [
        {
            id:1,
            title: '标题A',
            author: 'hunter'
        },
        {
            id:2,
            title: '标题B',
            author: 'xing'
        },
    ]
}
// 得到博客详情
const getDetail = (id) => {
    return [
        {
            id:1,
            title: '标题A',
            author: 'hunter'
        }
    ]
}

// 新建博客
const newBlog = (blogData ={}) => {
    console.log(blogData)
    return {
        id: 3,
        blogData: blogData
    }
}

// 更新博客
const updateBlog = (id, blogData ={}) => {
    console.log(blogData, id)
    // return {
    //     id: id,
    //     blogData: blogData
    // }
    return true
}


// 删除博客
const delBlog = (id) => {
    console.log(id)
    // return {
    //     id: id,
    //     blogData: blogData
    // }
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}