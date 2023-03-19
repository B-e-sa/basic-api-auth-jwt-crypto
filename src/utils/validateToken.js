const users = require("./users");
const jwt = require('jsonwebtoken');
const config = require('../config');

const validateToken = (req, res, next) => {

    // header example: Bearer djwajd8v9ajwb8mu19238193ubj1
    const authHeader = req.headers.authorization;

    // split header and get only the token
    const headerToken = authHeader.split(' ')[1];

    const path = req.path.split('/')

    const apiPath = path[path.length - 1];

    if (!authHeader)
        return res.status(403).send("Unauthorized access, if you need a new token, go to /api/v1/getToken");

    // you don't need a token to register or create/refresh your current one
    if (apiPath === 'register' || apiPath === 'getToken')
        return next();

    /*
    * after all these checks, the only error that can occur
    * is a malformed token
    */

    try {

        if (users.find(user => user.jwt === headerToken))
            return next();
        else
            return res.status(400).send("User not found, if you want to register, go to /register");

    } catch (e) {

        res.status(403).send("Malformed token, you can refresh you current one on /api/v1/getToken, if the error persists, contact our support")

    }


};

module.exports = validateToken;