const express=require("express");
const productRouter=express.Router();
const productController=require("../controller/product.controller");
const authMiddleWare=require("../middleware/auth.middleware");

productRouter.get("/view",productController.getProductDetails);

productRouter.get("/sort/:value",productController.sortProducts);
//productRouter.get("/filter/:catagory",productController.filterProducts);
productRouter.get("/filter",productController.filterProducts);
productRouter.get("/view/:id",authMiddleWare(),productController.getProductDetailsbyId);

productRouter.post("/save", authMiddleWare("admin"),productController.addProduct);
productRouter.put("/update/:id",authMiddleWare("admin"),productController.updateProduct);
productRouter.delete("/delete/:id",authMiddleWare("admin"),productController.deleteProduct);

module.exports=productRouter;

