const Model = require("../models/comment");
const postModel = require("../models/post");

const makeComment = async (req, res) => {
    const {comment, postId} = req.body;
    const {id} = req.user;
    try {
        const post = await postModel.findById(postId);
        if (!post) {
            return res.stauts(405).json({success: false, error: "something went wrong"});
        }
        const newComment = new Model({comment, postId, commentorId: id})
        const savedComment = await newComment.save();
        // modify post comment field
        await postModel.findByIdAndUpdate(postId, {$push: {comment: savedComment.id}});
        res.status(200).json({success: true, message: "comment has been made"});
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const getComment = async (req, res) => {
    try {
        const allComments = await Model.find().populate({path: "commentorId", select: "username email"})
                                                .populate({path: "postId", select: "title description"});
        res.status(200).json(allComments);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const getSingleComment = async (req, res) => {
    const {id} = req.query;
    try{ 
        const comment = await Model.findById(id);
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const likeComment = async (req, res) => {
    const {commentId} = req.body;
    const {id} = req.user;
    try {
        const comment = await Model.findById(commentId);
        if (!comment) {
            return res.status(404).json({success: false, error: "comment not found"});
        }
        // check if userId 
        const commentLikes = comment.likes;
        const checkId = commentLikes.includes(id);
        if (!checkId) {
            commentLikes.push(id)
        } else {
            const index = commentLikes.indexOf(id);
            commentLikes.splice(index, 1);
        }
        await Model.findByIdAndUpdate(commentId, {likes: commentLikes}, {new: true});
        checkId ? res.status(200).json({success: true, message: "comment has been liked"})
            : res.status(200).json({success: true, message: "comment has been disliked"});
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = {makeComment, getComment, getSingleComment, likeComment};