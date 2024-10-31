const userModel = require("../../todoList/model/user");
const Model = require("../models/user");
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const user = await Model.find();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const updateUser = async (req, res) => {
    const {password, ...others} = req.body;
    const {id} = req.user;
    try {
        const user = await Model.findById(id);
        if (!user) {
            return res.status(404).json({error: "something went wrong"});
        }
        // updating if user checks
        await Model.findByIdAndUpdate(id, {...others}, {new: true});
        res.status(200).json({success: true, message: "user profile updated"});
    } catch (err) {
        res.status(500).json(err.message);
    }
}

const updatePassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const {id} = req.user;
    try {
        const user = await Model.findById(id);
        const verify = bcrypt.compareSync(oldPassword, user.password);
        if (!verify) {
            return res.status(401).json({error: "password does not match"});
        }
        // update if preceeding condition checks
        await Model.findByIdAndUpdate(id, {password: newPassword}, {new: true});
        res.status(200).json({success: true, message: "password upated"});
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const updateRole = async (req, res) => {
    const {role} = req.user;
    if (role !== "superAdmin" && role !== "Admin") {
        return res.status(402).json({succes: false, error: "you are not allowed to do that"});
    }
    try {
        await Model.findByIdAndUpdate(id, {role: "Admin"}, {new: true});
        return res.status(200).json({success: true, message: "role updated"});
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.query;
    try {
        // user validation
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({success: false, error: "user does not exist"});
        }
        await userModel.findByIdAndDelete(id);
        res.clearCookie("token")
            .status(200).json({success: true, message: "user has been deleted"});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}

module.exports = {getUsers, updateUser, updatePassword, updateRole, deleteUser};