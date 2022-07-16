const express = require('express');
const loginController = require("../modules/auth/controllers/login.controller");
const signupController = require("../modules/auth/controllers/signup.controller");
const groupController = require("../modules/group/controllers/group.controller");
const joinController = require("../modules/join/controllers/join.controller");
const connectionController = require("../modules/connection/controllers/connection.controller");
const chatController = require("../modules/chat/controllers/chat.controller");

export default function (app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(process.env.API_PREFIX + '/auth/login', loginController);
    app.use(process.env.API_PREFIX + '/auth/signup', signupController);
    app.use(process.env.API_PREFIX + '/groups', groupController);
    app.use(process.env.API_PREFIX + '/join_requests', joinController);
    app.use(process.env.API_PREFIX + '/connection_requests', connectionController);
    app.use(process.env.API_PREFIX + '/chats', chatController);
}