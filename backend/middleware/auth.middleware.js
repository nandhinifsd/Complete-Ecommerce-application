const jwt=require("jsonwebtoken");
const authMiddleWare=(role=null)=>
{
    return function authorization(req,res,next)
    {
        try{
            const authHeader=req.headers.authorization;
            if(!authHeader || !authHeader.startsWith("Bearer"))
            {
                return res.status(401).json({success:false,message:"Unauthenticated Token / Token not found"})
            }
            const token=authHeader.split(" ")[1];
            const decode=jwt.verify(token,process.env.secret_key);
            //console.log(decode);
            if(role && role!=decode.role)
            {
                return res.status(403).json({success:false, message:"Access Denied for the User"});
            }
            next();
        }
        catch(err)
        {
            return res.status(400).json({success:true,message:"Request contains bad syntax or invalid token"});
        }
    }
}

module.exports=authMiddleWare;