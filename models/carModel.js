const mongoose=require('mongoose')

const carSchema=mongoose.Schema({
    carnumber:{
        type:Number,
        unique:[true,"Carnumber already exists"],
        required:{true:"Enter the car number"}
    },
    carname:{
        type:String,
        required:{true:"Please add car name"}
    },
    Mode:{
        type:String,
        required:{true:"Please mention A/C or Non A/C"}
    },
    Status:{
        type:String,
        required:{true:"Enter the car booked or not booked"}
    },
    Amount:{
        type:Number,
        required:{true:"Enter the amount per day"}
    },
    Date:{
        type:String,
        required:{true:"Please mention available date"}
    }
})

module.exports=mongoose.model("Cars",carSchema)