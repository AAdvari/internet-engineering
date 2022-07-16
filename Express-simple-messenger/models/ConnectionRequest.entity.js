import {Schema} from "mongoose";
import * as mongoose from "mongoose";

const ConnectionRequestSchema = new Schema({
    source: {type: mongoose.Schema.ObjectId, ref: 'Group'},
    dest: {type: mongoose.Schema.ObjectId, ref: 'Group'},
    date: {type: Date, default: Date.now}
});
const ConnectionRequest = mongoose.model('ConnectionRequest', ConnectionRequestSchema);
export {ConnectionRequestSchema, ConnectionRequest};

