const { makeComment, getComment, getSingleComment, likeComment } = require("../controllers/comment");
const {verify} = require("../middlewares/verify")

const router = require("express").Router();

router.post("/api/comment", verify, makeComment);
router.get("/api/comment", getComment);
router.get("/api/comment", getSingleComment);
router.post("/api/like-comment", verify, likeComment);

module.exports = router;