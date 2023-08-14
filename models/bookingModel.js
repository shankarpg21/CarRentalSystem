const mongoose=require('mongoose');

const bookingSchema=mongoose.Schema({
    email:{
        type:String,
        required:{true:"Username is mandatory"},
    },
    carnumber:{
        type:Number,
        required:{true:"Please mention your booked car number"},
        unique:{true:"Carnumber already exists"}
    },
    Date:{
        type:String,
        required:{true:"Date is mandatory"},
    },
    Days:{
        type:Number,
        required:{true:"Mention number of days you booked"}
    },
    Amount:{
        type:Number
    },
    msg:{
        type:String
    }
},
    {timestamps:true}
)

module.exports=mongoose.model("bookings",bookingSchema);