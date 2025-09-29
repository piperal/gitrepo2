const express = require('express')
const app = express()
const port = 5014

app.get("/", (req,res)=>{
    res.send("Hello")

})

app.listen(port,()=>{
    console.log("Server running on " + port)
})