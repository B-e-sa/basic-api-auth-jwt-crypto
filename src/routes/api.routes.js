const jwt = require("jsonwebtoken");
const config = require('../config');
const users = require('../utils/users');
const express = require('express');
const routes = express.Router();

routes.get(`/getUsers`, (_req, res) => {

    res.status(200).send(users);

})

routes.post(`/getToken`, (req, res) => {

    const { username, password } = req.body;

    const searchedUser = users.find(user => user.username === username)

    if (!searchedUser)
        return res.status(400).send("User not found, if you want to register, go to /api/v1/register");

    if (searchedUser.password !== password)
        return res.status(400).send("Invalid password");

    const newToken = jwt.sign({ username, ...config.salt }, config.key)

    res.send(newToken);

});

routes.post(`/register`, (req, res) => {

    const { username, password } = req.body;

    const newToken = jwt.sign({ username, ...config.salt }, config.key);

    const newUser = {
        id: users[users.length - 1].id,
        username: username,
        password: password,
        jwt: newToken
    }

    users.push(newUser);

    res.status(200).send(newUser.jwt);

});


module.exports = routes;