const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please enter a user name"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    } 

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)