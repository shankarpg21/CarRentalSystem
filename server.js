const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const port=process.env.PORT;
const userManager=require('./routes/userRoutes')
const adminManager=require('./routes/adminRoutes')
const conn = require('./config/db');
conn();

app.use(express.json())
app.use("/api/users",userManager)  
app.use("/api/admin",adminManager)
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})