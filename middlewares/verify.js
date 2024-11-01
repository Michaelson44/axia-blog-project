const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    const {token} = req.cookies;
    jwt.verify(token, process.env.secret, (err, info) => {
        if (err) {
            return res.status(500).json(err.message);
        }
        req.user = info;
        next();
    })
}

const verifyAndAuth = (req, res, next) => {
    verify(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === "superAdmin") {
            next();
        } else {
            return res.status(402).json({error: "you are not authorized to do that"})
        }
    });
}

const verifyAdmin = (req, res, next) => {
    verify(req, res, () => {
        if (req.user.role === "superAdmin") {
            next();
        } else {
            res.status(402).json({error: "You are not allowed to do that"});
        }
    })
}

module.exports = {verify, verifyAndAuth, verifyAdmin};