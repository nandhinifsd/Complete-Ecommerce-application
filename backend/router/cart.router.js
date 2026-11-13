const express=require("express");
const cartRouter=express.Router();
const cartController=require("../controller/cart.controller");
const authMiddleWare=require("../middleware/auth.middleware");
const upload = require("../middleware/upload");


cartRouter.post("/add",authMiddleWare("user"),upload.single("designImage"),cartController.addToCart);
cartRouter.get("/view",authMiddleWare("user"),cartController.viewCart);
cartRouter.put("/update",authMiddleWare("user"),upload.single("designImage"),cartController.updateCartItem);
cartRouter.delete("/remove/:id",authMiddleWare("user"),cartController.deleteCartItem);
cartRouter.delete("/empty",authMiddleWare("user"),cartController.emptyCart);

module.exports=cartRouter;
