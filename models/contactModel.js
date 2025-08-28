const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Conatc name is required"]
    },
    email: {
        type: String,
        required: [true, "Contact email is required"]
    },
    phone: {
        type: String,
        required: [true, "Contact phone number is required"]
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
}, {
    timeStamps: true
})

module.exports = mongoose.model("Contact", contactSchema)