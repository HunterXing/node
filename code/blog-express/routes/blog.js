var express = require('express');
var router = express.Router();

// 博客列表
router.get('/list', function(req, res, next) {

    // 原生写法
    // let blogData = {
    //     errno: 0,
    //     data: [1,2,3]
    // }
    // res.end(
    //     JSON.stringify(blogData)
    // )

    // 分装好的json
    res.json({
        errno: 0,
        data: [1,2,3]
    })
});

// 博客详情
router.get('/detail', function(req, res, next) {
    res.json({
        errno: 0,
        data: 'ok'
    })
});

module.exports = router;
