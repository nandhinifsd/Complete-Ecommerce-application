const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const userModel=require("../model/user.model");

const registerUser= async (req,res)=>
{
    try{
           const { username,email,phone,password,role }=req.body;
           console.log(req.body);
           if(! username || !email || !phone || !password || !role)
           {
            return res.status(400).json({success:false, message:"User Data Missing"});
           }
           const userNameCheck=await userModel.findOne({ username });
           const emailCheck=await userModel.findOne({ email });
           if(userNameCheck)
           {
                res.status(404).json({success: false, message: "Username already exists"});
           }
           if(emailCheck)
           {
            res.status(404).json({success:false, message:"Email already Exists"})
           }
           const hashed_pwd = await bcrypt.hash(password,10);
           const newUser = await userModel.create({ username,email,phone,password:hashed_pwd,role })

           return res.status(201).json({success:true,message:"New User Registration successful"});


    }
    catch(err)
    {
        return res.status(500).json({ success: false, message: "New user registration unsuccessful" });
    }
    
}


const loginUser = async (req,res)=>
{
    try{
            const { email, password }=req.body;
            const user= await userModel.findOne({ email });
            if(!user)
            {
                return res.status(404).json({success:false,message:"Incorrect Email Id and Password"});
            }
           const passwordMatch=await bcrypt.compare(password,user.password);
           console.log(passwordMatch);
           
           if(!passwordMatch)
           {
                return res.status(401).json({success:false,message:"Incorrect Email Id and Password"});
           }
           //create a token after username and password match
           const token =jwt.sign({ userid:user._id,username:user.username,role:user.role }, 
            process.env.secret_key, 
            {expiresIn : "24hr"});

            return res.status(200).json({success:true,message:"Login Successful",token});
        }
    catch(err)
    {
            return res.status(500).json({success:false,message:"login failed"})
    }
}

module.exports={ registerUser, loginUser }