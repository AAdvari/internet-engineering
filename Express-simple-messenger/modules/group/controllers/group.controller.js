import authMiddleware from "../../../middleware/auth.middleware";
import groupService from "../services/group.service";

const express = require('express');
const router = express.Router();


router.post('/', authMiddleware, async (req, res)=> {
    const {status, response} = await groupService.createGroup(req.body);
    return res.status(status).send(response);
});


router.get('/', async (req, res) =>{
    const {status, response} = await groupService.getAllGroups();
    return res.status(status).send(response);
});


router.get('/my', authMiddleware, async (req, res)=> {
    const {status, response} = await groupService.getGroupById(req.body.userId);
    return res.status(status).send(response);
});


module.exports = router;