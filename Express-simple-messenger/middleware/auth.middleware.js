const jwt = require('jsonwebtoken');
const envVars = require('dotenv').config().parsed;

const auth = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token)
        return res.status(401).send('Access Denied');
    if (token.includes('Bearer '))
        token = token.replace('Bearer ', '');

    try {
        req.body.userId = jwt.verify(token, envVars.JWT_PRIVATE_KEY).userId;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

export default auth;