const mongoose=require("mongoose");
const customerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    }
});

const customers=mongoose.model("Customers",customerSchema);
module.exports=customers;