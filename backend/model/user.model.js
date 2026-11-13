const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
username:{
type:String,
required:true,
unique:true,
trim:true
},
email:{
type:String,
required:true,
unique:true,
trim:true,
lowercase:true
},
phone:{
type:Number,
required:true,
trim:true
},
password:   {
type:String,
required:true,
},
role: {
    type:String,
    required:true,
    lowercase:true,
    enum:["admin","user"]
}
});

const users=mongoose.model("Users",userSchema);
module.exports=users;