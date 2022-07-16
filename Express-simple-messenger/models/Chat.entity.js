import mongoose, {Schema} from 'mongoose'


const ChatSchema = new Schema({
    p1: { type: mongoose.Schema.ObjectId, ref: 'User'},
    p2: { type: mongoose.Schema.ObjectId, ref: 'User'},
    messages: [{ type: mongoose.Schema.ObjectId, ref: 'Message'}],
    date: {type: Date, default: Date.now}
});

const Chat = mongoose.model('Chat', ChatSchema);
export {Chat, ChatSchema};