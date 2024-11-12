const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
const { ValidateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt")
app.use(express.json())


app.post("/signup", async (req, res) => {
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
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Email id is not present");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            res.send("Login success!!")
        }
        else {
            throw new Error("Password not Valid");

        }
    } catch (err) {
        res.status(400).send("err:" + err.message)
    }
})

app.get("/user", async (req, res) => {
    const userMail = req.body.emaiId
    try {
        const user = await User.find({ emaiId: userMail });
        if (user.length === 0) {
            res.status(404).send("User not found")
        }
        else {
            res.send(user);
        }
    } catch {
        res.status(400).send("err:" + err.message)
    }
})

app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch {
        res.status(400).send("err:" + err.message)
    }
})

app.delete("/deleteUser", async (req, res) => {
    const userId = req.body.userId
    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("DELETED")
    }
    catch (err) {
        res.status(400).send("err:" + err.message)
    }
})


app.patch("/updateUser/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body

    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true
        })
        res.send("user data updated succefully!!!")
    }
    catch (err) {
        res.status(400).send("err:" + err.message)
    }
})




connectDB().then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
        console.log("Server Listening...");
    })
}).catch((err) => {
    console.error("ERRRRRR");

})



