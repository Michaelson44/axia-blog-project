const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "posts"
    },
    commentorId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users"
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: "users"
    }
}, {timestamps: true});

module.exports = mongoose.model("comments", schema);