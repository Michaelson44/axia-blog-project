const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Basic"
    },
    credentialsAccount: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model("users", schema);