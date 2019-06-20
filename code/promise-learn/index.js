const fs = require('fs')
const path = require('path')

// callback  方式获取一个文件的内容
function getFileContent(fileName, callback) {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        callback(
            JSON.parse(data.toString())
        )
    })
}

// callback hell 回调地狱
// todo
getFileContent ('a.json', aData => {
    console.log('this is aData',aData)
    getFileContent ('b.json', bData => {
        console.log('this is bData',bData)
        getFileContent ('c.json', cData => {
            console.log('this is cData', cData)
        })
    })
})

// Promise重构
function promiseFile(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

promiseFile ('a.json').then(aData => {
    console.log('this is a data', aData, aData.next)
    return promiseFile(aData.next)
}).then(bData => {
    console.log('this is b data', bData, bData.next)
    return promiseFile(bData.next)
}).then(cData => {
    console.log('this is c data', cData)
})