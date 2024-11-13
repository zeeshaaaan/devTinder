const express = require("express");
const authRouter = express.Router();

const User = require("../models/user")
const { ValidateSignUpData } = require("../utils/validation")
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
    try {
        ValidateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        await user.save();
        res.send("User added!")
    } catch (err) {
        res.status(400).send("err:" + err.message)
    }
});


authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Email id is not present");
        }
        //const isPasswordValid = await bcrypt.compare(password, user.password) --> OR
        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {
            // const token = await jwt.sign({ _id: user._id }, "DEVTinder@$123", {
            //     expiresIn: "1d"
            // }) ----> OR
            const token = await user.getJWT()
            res.cookie("token", token)
            res.send("Login success!!")
        }
        else {
            throw new Error("Password not Valid");

        }
    } catch (err) {
        res.status(400).send("err:" + err.message)
    }
})

module.exports=authRouter