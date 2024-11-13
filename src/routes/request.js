const express = require("express");
const requestRouter = express.Router();

// const User = require("./models/user")
// const { ValidateSignUpData } = require("./utils/validation")
// const bcrypt = require("bcrypt");
// const cookieParser = require("cookie-parser")
// const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user.firstName + " Send a connection req")
    } catch (err) {
        res.status(400).send("err:" + err.message)
    }
})

module.exports=requestRouter