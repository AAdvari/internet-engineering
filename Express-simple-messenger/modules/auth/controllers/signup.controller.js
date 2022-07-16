import signupService from "../services/signup.service";

const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const {status, response} = await signupService.signup(req.body);
    return res.status(status).send(response);
});


module.exports = router;