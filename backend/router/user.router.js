const express=require("express");
const userRouter=express.Router();
const userSecurity=require("../security/user.security");
const userController=require("../controller/user.controller");
const authMiddleWare=require("../middleware/auth.middleware");

userRouter.post("/register",userSecurity.registerUser);
userRouter.post("/login",userSecurity.loginUser);

userRouter.get("/view",authMiddleWare("admin"),userController.getAllUsers);


module.exports=userRouter;