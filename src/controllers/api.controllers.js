const jwt = require("jsonwebtoken");
const config = require('../config');
const users = require('../utils/users');

const getUsers = (_req, res) => {

    res.status(200).send(users);

}

const getToken = (req, res) => {
    const { username, password } = req.body;

    const searchedUser = users.find(user => user.username === username)

    if (!searchedUser)
        return res.status(400).send("User not found, if you want to register, go to /api/v1/register");

    if (searchedUser.password !== password)
        return res.status(400).send("Invalid password");

    const newToken = jwt.sign({ username, ...config.salt }, config.key)

    res.send(newToken);
}

const register = (req, res) => {

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

}

module.exports = { getUsers, getToken, register }