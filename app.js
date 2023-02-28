const fs = require('node:fs')
const path = require("node:path");


const workDir = 'papka'
const names = ['First', 'Second', 'Third', 'Fourth', 'Fifth']

fs.mkdir(path.join(__dirname, workDir), (err) => {
    if (err) throw new Error(err.message)
})

names.forEach(name => {
    fs.mkdir(path.join(__dirname, workDir, `Dir-${name}`), (err) => {
        if (err) throw new Error(err.message)
    })
    fs.writeFile(path.join(__dirname, workDir, `File-${name}`), 'Hello World', (err) => {
        if (err) throw new Error(err.message)
    })
})

fs.readdir(path.join(__dirname, workDir), (err, files) => {
    files.forEach(file => {
        fs.stat(path.join(__dirname, workDir, file), (err, stats) => {
            if (err) throw new Error(err.message)

            if (stats.isFile()) return console.log(`FILE: ${file}`)
            if (stats.isDirectory()) return console.log(`FOLDER: ${file}`)
        })
    })
})