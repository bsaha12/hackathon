const express=require("express");
const {UserModal}=require('../model/users.model')

const userRoutes=express.Router();
userRoutes.use(express.json());

userRoutes.get('/',async(req,res)=>{
    try{
        const users=await UserModal.find();
        res.status(200).json({users});
    }catch(err){
        res.status(500).json({error:err});
    }
})

userRoutes.post('/register',(req,res)=>{
    const {userName,userEmail,password}=req.body;
    try{}catch(err){}
})

module.exports={userRoutes};