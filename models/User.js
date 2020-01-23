const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    uid: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordDigest: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = { User: mongoose.model('User', UserSchema), UserSchema, };