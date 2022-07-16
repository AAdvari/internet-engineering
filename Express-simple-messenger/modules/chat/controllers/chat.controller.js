import chatService from "../services/chat.service";
const express = require('express');
import auth from "../../../middleware/auth.middleware";
const router = express.Router();


router.post('/:user_id', auth, async (req, res) => {
    const {status, response} = await chatService.sendMessage(req.body.userId, req.params.user_id, req.body.message);
    return res.status(status).send(response);
});

router.get('/:user_id', auth, async (req, res)=> {
    const {status, response} = await chatService.getChat(req.body.userId, req.params.user_id);
    return res.status(status).send(response);
});

router.get('/', auth, async (req, res)=> {
    const {status, response} = await chatService.getAllChats(req.body.userId);
    return res.status(status).send(response);
});


module.exports = router;