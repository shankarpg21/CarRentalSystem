const mongoose=require('mongoose');

const conn=async()=>{
    try{
        const connect=await mongoose.connect(process.env.mongo_url)
        console.log("Connection established to database");
    }
    catch(e){
        console.log(e);
    }
}

module.exports=conn;