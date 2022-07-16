import authMiddleware from "../../../middleware/auth.middleware";
import connectionService from "../services/connection.service";

const express = require('express');
const router = express.Router();


router.post('/', authMiddleware, async (req, res) => {
    const {status, response} = await connectionService.connectionRequest(req.body);
    return res.status(status).send(response);
});

router.get('/', authMiddleware, async (req, res)=> {
    const {status, response} = await connectionService.getConnectionRequests(req.body.userId);
    return res.status(status).send(response);
});

router.post('/accept', authMiddleware, async (req, res) => {
    const {status, response} = await connectionService.acceptConnectionRequest(req.body);
    return res.status(status).send(response);
});

module.exports = router;