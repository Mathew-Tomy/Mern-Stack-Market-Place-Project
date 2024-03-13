const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    conversation: [{
        userId: { // Represents the sender or the user associated with the message
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String,
            trim: true
        }
    }]
});

module.exports = mongoose.model('Message', MessageSchema);
