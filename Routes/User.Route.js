require('dotenv').config()
const express = require('express');
const { UserModel } = require('../Models/User.model');
const bcrypt = require("bcrypt");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");

UserRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        bcrypt.hash(password,8,async(err,secure)=>{
            if(err){
                console.log(err)
            }else{
                let newUser = new UserModel({name,email,password:secure})
                await newUser.save();
                res.status(200).send("User has been created");
            }
        })
    } catch (error) {
        res.status(404).send('something went wrong');
        console.log(error)
    }
});

UserRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id},process.env.key);
                    res.send({"msg":"login successful","token":token})
                }else{
                    res.status(401).send('wrong credentials');
                }
            })
        }else{
            res.status(401).send('wrong credentials')
        }
    } catch (error) {
        res.status(401).send('User Not Fount')
        console.log(error)
    }
})

module.exports={UserRouter};