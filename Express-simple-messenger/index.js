import routes from "./startup/routes";
import config from './startup/config';
import db from './startup/database';

const express = require('express');
const app = express();

config();
routes(app);
db();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;