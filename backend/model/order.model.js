const mongoose=require("mongoose");
const orderItemSchema=mongoose.Schema({

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
const orderSchema=mongoose.Schema({
orderDate:{
    type:Date,
    default:Date.now
},
customerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customers",
    required:true
},
items:{
    type:[orderItemSchema],
    required:true,
    validate:{
        validator:(items)=>items.length>0,
        message:"The Order must have atleast 1 item"
    }
},
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:true

},
totalAmount:{
    type:Number,
    required:true,
    min:0
},
status:{
    type:String,
    enum:["Pending", "Processing", "Completed", "Cancelled", "Delivered"],
    default:"Pending"
},
paymentMode:{
    type:String,
    enum:["UPI","COD","Card","Net Banking"],
    required:true
},
paymentStatus: {
  type: String,
  enum: {
    values: ["While Ordering" , "After Delivery", "Refund Initiated", "Refund Completed"],
    message: "Invalid payment status"
  }
},
refund:{
    type:Boolean,
    default:false
}

});

const orders=mongoose.model("Orders",orderSchema);
module.exports=orders;