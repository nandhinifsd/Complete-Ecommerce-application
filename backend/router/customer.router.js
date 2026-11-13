const express=require("express");
const customerRouter=express.Router();
const customerController=require("../controller/customer.controller");
const authMiddleWare=require("../middleware/auth.middleware");

customerRouter.get("/view",authMiddleWare("admin"),customerController.getAllCustomers);
customerRouter.get("/view/:id",authMiddleWare(),customerController.getCustomerById);
customerRouter.put("/update/:id",authMiddleWare(),customerController.updateCustomerInfo);

module.exports=customerRouter;