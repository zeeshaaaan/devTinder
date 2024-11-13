const User = require("../models/user")
const jwt = require("jsonwebtoken")

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies; // get the token
        if (!token) { //checking token 
            throw new Error("Invalid Token");
        }
        const decodeObj = await jwt.verify(token, "DEVTinder@$123") //validating the token
        const { _id } = decodeObj //Logged in user id is
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User does not exist");
        }
        req.user = user
        next();
    }
    catch (error) {
        res.status(400).send("err:" + error.message)
    }
}

module.exports = { userAuth }