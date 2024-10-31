const router = require("express").Router();
const {getUsers, updateUser, updatePassword, updateRole, deleteUser} = require("../controllers/user");
const { verifyAndAuth, verifyAdmin } = require("../middlewares/verify");

router.get("/api/user", getUsers);
router.put("/api/user", verifyAndAuth, updateUser)
router.put("/api/user", verifyAndAuth, updatePassword)
router.put("/api/user-role", verifyAdmin, updateRole)
router.delete("/api/delete-user", verifyAdmin, deleteUser)

module.exports = router;