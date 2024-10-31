const Model = require("../models/post");

const makePost = async (req, res) => {
    const {creatorId, ...others} = req.body;
    const {id} = req.user;
    const post = new Model({...others, creatorId: id});
    try {
        await post.save();
        res.status(200).json({success: true, message: "post has been made successfully"});
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const updatePost = async (req, res) => {
    const {likes, ...others} = req.body;
    const {id} = req.user;
    try {
        await Model.findByIdAndUpdate(id, {...others}, {new: true});
        res.status(200).json({success: true, message: "post has been updated successfully"});
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const deletePost = async (req, res) => {
    const {id} = req.user;
    try {
        await Model.findByIdAndDelete(id);
        res.clearCookie("token")
            .status(200)
            .json({success: true, message: "user has been deleted"});
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Model.find()
                                .populate({path: "creatorId", select: "username email"});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const getPost = async (req, res) => {
    const {id} = req.query;
    try {
        const post = await Model.findById(id)
                                .populate({path: "creatorId", select: "username email"});
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const likePost = async (req, res) => {
    const {postId} = req.body;
    const {id} = req.user;
    try {
        const post = await Model.findById(postId)
        const gottenLikes = post.likes;
        const check = gottenLikes.includes(id);
        if (!check) {
            gottenLikes.push(id);
        } else {
            const index = gottenLikes.indexOf(id);
            gottenLikes.splice(index, 1);
        }
        await Model.findByIdAndUpdate(postId, {likes: gottenLikes}, {new: true});
        check ? res.status(200).json({success: true, message: "post has been liked"})
            : res.status(200).json({success: true, message: "post has been disliked"});
    } catch(err) {
        res.status(500).json(err.message);
    }
}

module.exports = {makePost, updatePost, deletePost, getPosts, getPost, likePost};