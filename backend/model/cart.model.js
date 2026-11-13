const mongoose=require("mongoose");
const ItemSchema=mongoose.Schema({

        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            min:1
        },
        color: {
                type: String,
                enum: ["Red", "Blue", "Violet", "Black", "Green"],
                required: true
        },
        price:{
            type:Number,
            required:true,
            min:0
        },
        designImage:
        {
            type:String,
            
            default: null
        },
        instructions: {
                    type: String,
                    default: ""
        }

});
const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
        unique: true
    
    },
    items:{
    type:[ItemSchema],
    required:true
    }
})

const cart=mongoose.model("Cart",cartSchema);
module.exports=cart;