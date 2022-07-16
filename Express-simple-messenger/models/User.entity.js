import mongoose, {Schema} from 'mongoose'

const UserSchema = new Schema( {
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    group: {type: mongoose.Schema.ObjectId, ref: 'Group'},
    date: {type: Date, default: Date.now},
    joinRequests: [{type: mongoose.Schema.ObjectId, ref:'JoinRequest'}],
    messages: [{type: mongoose.Schema.ObjectId, ref:'Message'}]
});

const User = mongoose.model('User', UserSchema);
export {User, UserSchema};