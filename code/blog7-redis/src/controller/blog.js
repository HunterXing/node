const { exec } = require ('../db/mysql')
// 得到博客列表
const getList = (author, keyword) => {
    let sql = `select * from tb_blogs where state=1 `
    if (author) {
        sql += `and author = '${author}' `
    }

    if (keyword) {
        sql += `and title = '${keyword}' `
    }

    sql += ` order by createtime desc;`

    //返回promise
    return exec(sql)
}

// 得到博客详情
const getDetail = (id) => {
    let sql = `select * from tb_blogs where id = '${id}' `

    return exec(sql).then( rows => {
        return rows[0]
    })
}

// 新建博客
const newBlog = (blogData ={}) => {
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()
    const state = 1

    let sql = 
    `
    insert into tb_blogs 
    (
        title, 
        content, 
        createtime, 
        author, 
        state
    )
    values 
    (
        '${title}',
        '${content}',
        '${createTime}',
        '${author}',
        ${state}
    );
    `
    console.log(sql)
    return exec(sql).then(insertData => {
        console.log(insertData)
        return {
            id: insertData.insertId
        }
    })
}


// 更新博客
const updateBlog = (id, blogData ={}) => {
    const title = blogData.title
    const content = blogData.content
    let sql = 

    `
        update tb_blogs set title = '${title}',
        content = '${content}' 
        where id = '${id}'
        
    `
    console.log(sql)

    return exec(sql).then( updateData => {
        console.log(updateData)
        if (updateData.affectDataRows > 0) {
            return true
        }
        return false
    })
}


// 删除博客
const delBlog = (id, author) => {
    let sql = 
    `
        update tb_blogs set state = 0 
        where id = '${id}' 
        and author = '${author}'
        
    `
    console.log(sql)

    return exec(sql).then( delData => {
        console.log(delData)
        if (delData.affectDataRows > 0) {
            return true
        } 
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}