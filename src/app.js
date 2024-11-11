const express = require("express")
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")
app.use(express.json())


app.post("/signup", async (req, res) => {
    //create a new instance of user model.
    const user = new User(req.body)
    try {
        await user.save();
        res.send("User added!")
    } catch {
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



