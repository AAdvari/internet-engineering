import {Schema} from "mongoose";
import * as mongoose from "mongoose";

const GroupSchema = new Schema({
    admin: { type: mongoose.Schema.ObjectId, ref:'User'},
    name: String,
    description: String,
    members: [{type: mongoose.Schema.ObjectId, ref:'User'}],
    date: {type: Date, default: Date.now},
    connected: [{ type: mongoose.Schema.ObjectId, ref: 'Group'}],
    connectionRequests: [{ type: mongoose.Schema.ObjectId, ref: 'ConnectionRequest'}],
    joinRequests: [{ type: mongoose.Schema.ObjectId, ref: 'JoinRequest'}],

});
const Group = mongoose.model('Group', GroupSchema);
export {Group, GroupSchema};

