import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    permissions: { type: String },
    since: { type: Date, default: Date.now },
    lastPermissions: { type: Date, default: Date.now },
});

mongoose.models = {};

const User = mongoose.model('User', user);

export default User;