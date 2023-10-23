const express = require("express")
const router = express.Router()

//login
router.post("/login", async (req,res)=>{
    console.log(req.body);
    return res.status(200).json({"Status":"Success"})
})

//signup
router.post("/signup", async (req,res)=>{
    console.log(req.body);
    return res.status(200).json({"Status":"Success"})
})


module.exports = router