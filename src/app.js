const express = require("express")

const app = express();  



app.use("/abcd",(req,res)=>{
    res.send("abcdedd")
})

app.use((req,res)=>{
    res.send("Hello")
})

app.listen(3000,()=>{
    console.log("Server Listening...");
    
})