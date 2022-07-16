const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost:27017/messenger')
        .then(() => winston.info('Connected to MongoDB...'))
        .catch( () => winston.info('Connection to MongoDB failed!'));

}