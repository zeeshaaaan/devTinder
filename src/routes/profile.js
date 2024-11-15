const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const { validateEditProfileData } = require("../utils/validation")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    } catch (err) {
        res.status(400).send("err:" + err.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit request");  
        }
        else{
            const loggedInUser=req.user
            Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
            await loggedInUser.save()
            res.json({
                message:`${loggedInUser.firstName}, Your profile updated successfully!!`,
                data: loggedInUser
            })
        }
    } catch (err) {
        res.status(400).send("err:" + err.message)
    }
})


module.exports = profileRouter