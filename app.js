const express = require('express');

const app = express();
const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const users = [
    { name: 'sasha', age: 19 },
    { name: 'max', age: 29 },
    { name: 'ina', age: 39 },
]

app.get('/users', (req, res) => {
    res.status(200).json(users)
});

app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    res.status(200).json(users[+userId])
});

app.post('/users', (req, res) => {
    const data = req.body;

    users.push(data)
    res.status(201).json({
        message: 'User Created'
    })
})

app.put('/users/userId', (req, res) => {
    const { userId } = req.params;
    const updatedUser = req.body;

    users[+userId] = updatedUser;
    res.json(users[+userId])
})

app.delete('/users/userId', (req, res) => {
    const {userId} = req.params;
    users.splice(+userId, 1)
    res.status(204)
})

app.listen(PORT, () => {
    console.log('Server has started on port ' + PORT)
});