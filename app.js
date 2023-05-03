// -- MODULES --
// const {sayHello} = require('./helper')
//
// sayHello()

// -- GLOBAL VARIABLES --
// console.log(__dirname)
// console.log(__filename)
// console.log(process.cwd())

// -- PATH --
// const path = require('node:path')
//
// const joinedPath = path.join(__dirname, 'test')
// const joinedPath = path.normalize('//test/////')
// const joinedPath = path.resolve('test')
// console.log(joinedPath)

// -- OS --
// const os = require('os')
//
// console.log(os.arch());
// console.log(os.cpus());

// -- FS --
// const fs = require('node:fs')
// const path = require('node:path')
//
// fs.writeFile(path.join('test.txt'), 'Hello World', (err) => {
//     if (err) throw new Error(err.message)
// })
//
// fs.readFile(path.join(__dirname, 'target'), (err, data) => {
//     if (err) throw new Error(err.message)
//     console.log(data)
// })
//
// fs.appendFile(path.join('target'), '\nNew ', (err)=>{
//     if (err) throw new Error(err.message)
// })
//
//  -- clear
// fs.truncate(path.join('target'), (err) => {
//     if (err) throw new Error(err.message)
// })
//
// -- remove
// fs.unlink(path.join('target'), (err) => {
//     if (err) throw new Error(err.message)
// })
//
// fs.readdir(path.join('test'), (err, data) => {
//     if (err) throw new Error(err.message)
//     console.log(data)
// })
//
// fs.readdir(path.join('test'), {withFileTypes: true}, (err, data) => {
//     if (err) throw new Error(err.message)
//     data.forEach(file => {
//         file.isFile()
//     })
// })
//
// fs.stat(path.join('test'), (err, stats) => {
//     if (err) throw new Error(err.message)
//     console.log(stats.isDirectory())
//     console.log(stats.isFile())
// })
//
// fs.mkdir(path.join('test'), (err) => {
//     if (err) throw new Error(err.message)
// })
