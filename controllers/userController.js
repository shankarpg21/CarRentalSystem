const User=require('../models/userModel')
const Cars=require('../models/carModel')
const bookings=require('../models/bookingModel')
const bcrypt=require('bcrypt')
const asyncHandler=require('express-async-handler');
const jwt=require("jsonwebtoken");

const register=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).send("All fields are mandatory");
    }
    const userAvailable=await User.findOne({email})
    if(userAvailable){
        return res.status(400).send("Email already exists");
    }
    const hashedpw=await bcrypt.hash(password,10);
    const user=await User.create({email,password:hashedpw});
    if(user){
        return res.status(201).json({email:user.email});
    }
    else{
        return res.status(400).send("User data is not valid");
    }
})

const login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).send("All fields are mandatory");
    }
    const user=await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user._id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
        return res.status(200).json({accessToken});
    }
    else{
        return res.status(401).send("Invalid credentials")
    }
    
});

const viewcars=asyncHandler(async(req,res)=>{
    const flag=await Cars.find({"Date":req.params.date});
    if(flag)
    {
        return res.status(200).send({flag})
    }
    else{
        return res.status(400).send("No cars available at this time");
    }
})

const carbooking=asyncHandler(async(req,res)=>{
    const {email,carnumber,Date,Days}=req.body;
    const flag=await Cars.findOne({"carnumber":carnumber})
    const {Amount,Status}=flag;
    if(Status=="Booked"){
        return res.status(400).send("Car already booked");
    }
    const amt=Days*Amount;
    const msg="Car is ready to pick";
    const newBook=await bookings.create({"email":email,"carnumber":carnumber,"Date":Date,"Days":Days,"Amount":amt,"msg":msg})
    await Cars.updateOne({"carnumber":carnumber},{$set:{"Status":"Booked"}});
    res.status(201).json({newBook});
});

const mybookings=asyncHandler(async(req,res)=>{
    const view=await bookings.find({username:req.params.username});
    res.status(201).json({view});
})

const returncar=asyncHandler(async(req,res)=>{
    const num=await Cars.update({carnumber:req.params.carnumber},{$set:{Status:"Not Booked"}});
    res.status(202).send("Car returned by customer");
})

module.exports={register,login,carbooking,mybookings,viewcars,returncar};

