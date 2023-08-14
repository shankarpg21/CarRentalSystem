const bookings=require("../models/bookingModel");
const asyncHandler=require('express-async-handler');
const admin=require("../models/adminModel");
const Cars=require("../models/carModel");

const login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400).send("All fields are mandatory");
    }
    const alldata=await admin.findOne({email});
    console.log(alldata);
    if(alldata && alldata.password==password){
        res.status(200).json({alldata});
    }
    else{
        res.status(401).send("Invalid credentials")
    }
     
});

const addcar=asyncHandler(async(req,res)=>{
    const {carnumber,carname,Mode,Status,Amount,Date}=req.body;
    console.log(carname+" "+carnumber+" "+Mode+" "+Status+" "+Amount+" "+Date);
    if(!carnumber||!carname||!Mode||!Status||!Amount||!Date){
        res.status(400).send("All fields are mandatory");
    }
    const newCar=await Cars.create({carnumber,carname,Mode,Status,Amount,Date})
    res.status(201).send("Car added successfully");
})

const deleteCar=asyncHandler(async(req,res)=>{
    const carnumber=await Cars.findOne({"carnumber":req.params.carnumber});
    if(!carnumber){
        return res.status(404).send("Details not found")
    }
    await Cars.deleteOne({"carnumber":req.params.carnumber});
    await bookings.updateOne({"carnumber":req.params.carnumber},{$set:{"msg":"Car is not available amount will be refunded"}});
    res.status(200).send("Car details deleted");
})

const getCar=asyncHandler(async(req,res)=>{
    const reqcar=await Cars.findOne({"carnumber":req.params.carnumber});
    if(!reqcar){
        return res.status(404).send("Details not found")
    }
    res.status(200).json(reqcar);
})

const getCars=asyncHandler(async(req,res)=>{
    const reqcars=await Cars.find({});
    if(!reqcars){
        res.status(404).send("Details not found")
    }
    res.status(200).json(reqcars);
})

const updateCar=asyncHandler(async(req,res)=>{
    const reqcar=await Cars.findOne({"carnumber":req.params.carnumber});    
    const {carnumber,carname,Mode,Status,Amount,Date}=req.body;
    await Cars.updateOne({"carnumber":carnumber},{$set:{"carname":carname,"Mode":Mode,"Status":Status,"Amount":Amount,"Date":Date}})
    const updatedCar=await Cars.findOne({"carnumber":req.params.carnumber})
    res.status(200).json(updatedCar)
})

module.exports={login,addcar,getCar,getCars,updateCar,deleteCar};