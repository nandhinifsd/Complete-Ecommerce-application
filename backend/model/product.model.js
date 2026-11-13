const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
        
    },
    catagory:{
        type:String,
        required:true
        
    },
    brand:{
        type:String,
        required:true
    },
    shape:{
        type:String,
        required:true
    },
    dimension:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isDiscounted:{
        type:Boolean
    },
    discount:{
        type:Number
    },
    productImage:{
        type:String,
        required:true
    },
    sealImage:{
        type:String,
        required:true
    }
});

const products=mongoose.model("Products",productSchema);
module.exports=products;