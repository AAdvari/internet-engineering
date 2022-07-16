const {Schema} = require("mongoose");
const mongoose = require("mongoose");


const MessageSchema = new Schema({
    sender: {type: mongoose.Schema.ObjectId, ref:'User'},
    receiver: {type: mongoose.Schema.ObjectId, ref:'User'},
    content: String,
    date: {type: Date, default: Date.now}
});

const Message = mongoose.model('Message', MessageSchema);

export {Message, MessageSchema};