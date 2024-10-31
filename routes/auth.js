const router = require("express").Router();
const { register, oauth, login, logOut } = require("../controllers/auth");

router.post("/api/register", register);
router.post("/api/login", login);
router.post("/api/oauth", oauth);
router.post("/api/logout", logOut);


module.exports = router;