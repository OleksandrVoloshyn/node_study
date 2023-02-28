const fs = require('node:fs')
const path = require("path");


const boysData = [
    {name: "Sasha", gender: "male"},
    {name: "Olya", gender: "female"},
    {name: "Masha", gender: "female"},
]

const girlsData = [
    {name: "Akakiy", gender: "male"},
    {name: "Lana", gender: "female"},
    {name: "Kokos", gender: "male"},
]


const createDir = (name) => {
    fs.mkdir(path.join(__dirname, name), (err) => {
        if (err) throw new Error(err.message)
    })
}

createDir('boys')
createDir('girls')


const writeFile = (data, dirName) => {
    data.forEach(value => {
        fs.writeFile(path.join(__dirname, dirName, `${value.name}.json`), JSON.stringify(value), (err) => {
            if (err) throw new Error(err.message)
        })
    })
}

writeFile(boysData, 'boys')
writeFile(girlsData, 'girls')


const normalizeFolders = (readFrom, gender, writeTo) => {
    fs.readdir(path.join(__dirname, readFrom), {withFileTypes: true}, (err, files) => {
        if (err) throw new Error(err.message)

        files.forEach(file => {
            fs.readFile(path.join(__dirname, readFrom, file.name), (err, data) => {
                if (err) throw new Error(err.message)

                const user = JSON.parse(data.toString())
                if (user.gender === gender) {
                    fs.rename(
                        path.join(__dirname, readFrom, file.name),
                        path.join(__dirname, writeTo, file.name), (err) => {
                            if (err) throw new Error(err.message)
                        })
                }
            })
        })
    })
}

normalizeFolders('boys', 'female', 'girls')
normalizeFolders('girls', 'male', 'boys')
