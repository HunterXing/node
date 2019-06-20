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

module.exports = {
    getList,
    getDetail
}