const express = require('express')
const {readFile, writeFile, validateUser} = require("./services");


const PORT = 5000
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/users', async (req, res) => {
    const users = await readFile()
    res.json(users)
})

app.post('/users', async (req, res) => {
    const users = await readFile()
    const newUser = req.body

    const errors = validateUser(newUser)
    if (errors.length) return res.status(400).json(errors)

    await writeFile([...users, newUser])
    res.status(201).json(newUser)
})

app.get('/users/:pk', async (req, res) => {
    const users = await readFile()
    const {pk} = req.params
    const user = users[pk]

    if (!user) return res.status(404).json({'error': `user with index ${pk} not found`})
    res.json(user)
})

app.put('/users/:pk', async (req, res) => {
    const users = await readFile()
    const {pk} = req.params
    const user = req.body

    if (users.length <= pk || pk < 0) return res.status(404).json({'error': `user with index ${pk} not found`})
    const errors = validateUser(user)
    if (errors.length) return res.status(400).json(errors)

    users.splice(pk, 1, user)
    await writeFile(users)
    res.json(user)
})

app.delete('/users/:pk', async (req, res) => {
    const users = await readFile()
    const {pk} = req.params

    if (users.length <= pk || pk < 0) return res.status(404).json({'error': `user with index ${pk} not found`})

    users.splice(pk, 1)
    await writeFile(users)
    res.status(204).end()
})


app.listen(PORT, () => {
    console.log(`Server has started on PORT:${PORT}`)
})