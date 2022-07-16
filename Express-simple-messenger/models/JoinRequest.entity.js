import {Schema} from "mongoose";
import * as mongoose from "mongoose";


const JoinRequestSchema = new Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    group: {type: mongoose.Schema.ObjectId, ref: 'Group'},
    date: {type: Date, default: Date.now}
});

const JoinRequest = mongoose.model('JoinRequest', JoinRequestSchema);
export {JoinRequest, JoinRequestSchema};