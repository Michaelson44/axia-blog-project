const Model = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    // get password to hash
    const {password, ...others} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (!hashedPassword) {
        return res.status(401).json({error: "invalid password parameter"})
    };
    // create new user in db
    const user = new Model({password: hashedPassword, ...others});
    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    // check if user exist 
    try {
        const user = await Model.findOne({email});
        if (!user) {
            return res.status(404).json({error: "user not found"});
        }
        // then check if password matches
        const verify = bcrypt.compareSync(password, user.password);
        if (!verify) {
            return res.status(401).json({error: "invalid parameter"})
        }
        // encrypt sensitive information
        const userInfo = {id: user.id, role: user.role};
        const token = jwt.sign(userInfo, process.env.secret);
        res.cookie("token", token)
            .status(200)
            .json({success: true, message: "user has been logged in"});
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const oauth = async (req, res) => {
    const {username, email, gender} = req.body;
    try {
        // check if user has cred account
        const user = await Model.findOne({email});
        if (user && user.credentialsAccount) {
            return res.status(402).json({error: "invalid parameter"})
        }
        // logging oauth user
        if (user) {
            const info = {id: user.id, role: user.role};
            const token = jwt.sign(info, process.env.secret);
            res.cookie("token", token)
                .status(200)
                .json({success: true, message: "user has been logged in"})
        }
        // registering new user
        const newUser = new Model({username, email, gender, credentialsAccount: false});
        const savedUser = await newUser.save();
        const info = {id: savedUser.id, role: savedUser.role};
        const token = jwt.sign(info, process.env.secret);
        res.cookie("token", token)
            .status(200)
            .json({success: true, message: "user has been created"})
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = {register, login, oauth, logOut};