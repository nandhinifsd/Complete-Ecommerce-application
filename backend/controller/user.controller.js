const userModel=require("../model/user.model");

const getAllUsers = async (req,res)=>
{
    try{
            const users=await userModel.find();
            if(!users || users.length<=0)
            {
                return res.status(404).json({success:false,message:"Users is not found"});
            }
            return res.status(200).json({success:true,message:"Users Details",users});
    }

    catch(err)
    {
        return res.status(500).json({success:false, message:"Users Display Operation failed"})
    }
}
 

module.exports={ getAllUsers }