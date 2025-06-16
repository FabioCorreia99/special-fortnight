const express = require('express');
const app = express();
app.use(express.json());

let users = [];

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
    };

    if (!newUser.name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    users.push(newUser);
    res.status(201).json(newUser);
});

app.resetUsers = () => {
    users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ]; // Reset to initial state
};


module.exports = app;