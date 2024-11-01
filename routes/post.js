const router = require("express").Router();

const { verify } = require("../middlewares/verify");
const { verifyAndAuth } = require("../middlewares/verify");
const { makePost, updatePost, getPosts, likePost, getPost } = require("../controllers/post");

router.post("/api/post", verify, makePost);
router.put("/api/post", verify, updatePost);
router.get("/api/posts", getPosts);
router.get("/api/post", getPost);
router.delete("/api/post", verify, getPosts);
router.post("/api/like-post", verify, likePost);

module.exports = router;