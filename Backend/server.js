// All The Imports----------------------------------------------
const express = require("express")
const app = express()
const server = require("http").Server(app)
const cors = require("cors")

//All the middlewire----------------------------------------------
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//starting the server----------------------------------------------
server.listen(3001,()=>{console.log("Server is listening at 3001 port.")})

//auth routes
const auth = require("./router/auth");
app.use("/auth",auth);