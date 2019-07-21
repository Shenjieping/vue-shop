const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// 引入文件模块
const fs = require('fs')
// 引入处理路径的模块
const path = require('path')
// const env = process.env.NODE_ENV || 'development'
// let DB_URL = 'mongodb://imooc_manager:27017/book'
// if (env === 'development') {
//      DB_URL = 'mongodb://localhost:27017/book'
// }
// 解析表单数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 引入 路由模块
var booksRouter = require('./routes/books')
var usersRouter = require('./routes/users')
var recordRouter = require('./routes/records')
var wishRouter = require('./routes/wishes')

app.use('/book', booksRouter)
app.use('/user', usersRouter)
app.use('/record', recordRouter)
app.use('/wish', wishRouter)

// // 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
// app.use(express.static(path.resolve(__dirname, '../dist')))
// // 因为是单页应用 所有请求都走/dist/index.html
// app.get('*', function (req, res) {
//     const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//     res.send(html)
// })

app.listen(3008, function () {
    console.log('server connect, listening at http://localhost:3008')
})
