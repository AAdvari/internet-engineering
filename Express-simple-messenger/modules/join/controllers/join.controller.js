import joinService from "../services/join.service";
const express = require('express');
import auth from '../../../middleware/auth.middleware';
const router = express.Router();


router.get('/', auth,  async (req,res)  => {
    const {status, response} = await joinService.getAllJoinRequests(req.body.userId);
    return res.status(status).send(response);
});

router.get('/group', auth, async (req, res) => {
    const {status, response} = await joinService.getOwnersJoinRequests(req.body.userId);
    return res.status(status).send(response);
});

router.post('/', auth, async (req, res) => {
    const {status, response} = await joinService.createJoinRequest(req.body);
    return res.status(status).send(response);
});

router.post('/accept', auth, async (req, res) => {
    const {status, response} = await joinService.acceptJoinRequest(req.body);
    return res.status(status).send(response);
});


module.exports = router;