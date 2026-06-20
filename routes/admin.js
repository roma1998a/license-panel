const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ADMIN_USER = "admin";
const ADMIN_PASS = "123456";

// login
router.post('/login', (req,res)=>{
    const {username,password} = req.body;

    if(username !== ADMIN_USER || password !== ADMIN_PASS){
        return res.json({success:false,message:"Wrong login"});
    }

    const token = jwt.sign({user:username}, "secret123");
    res.json({success:true,token});
});

module.exports = router;
