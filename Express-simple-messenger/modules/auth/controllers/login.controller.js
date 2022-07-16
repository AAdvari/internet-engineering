import loginService from "../services/login.service";

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const {status, response} = await loginService.login(req.body);
    return res.status(status).send(response);
});


module.exports = router;