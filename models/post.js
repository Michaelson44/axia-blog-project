const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users"
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: "users"
    },
    comment: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: "comments"
    }
}, {timestamps: true});

module.exports = mongoose.model("posts", schema);