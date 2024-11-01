const { makeComment, getComment, getSingleComment, likeComment, deleteComment } = require("../controllers/comment");
const {verify, verifyAndAuth} = require("../middlewares/verify")

const router = require("express").Router();

router.post("/api/comment", verify, makeComment);
router.get("/api/comment", getComment);
router.get("/api/comment", getSingleComment);
router.post("/api/like-comment", verify, likeComment);
router.delete("/api/delete-comment/:id", verify, deleteComment);

module.exports = router;