const jwt=require("jsonwebtoken");
const cartModel=require("../model/cart.model");
const orderController=require("../controller/order.controller");
//const productController =require("../controller/product.controller");
const addToCart= async(req,res) =>{
    try{
         const decode=orderController.decodeToken(req);
         //let items=[];
         const { productId, quantity,color,price,instructions } =req.body;
         
         if(!productId || !quantity || !color || !price  )
         {
             return res.status(404).json({success:false, message: "Product Details Missing"});
         }
         //const designImage = req.file;
         // Validate uploaded image
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please Upload Your Design Image"
            });
        }
        const designImage=req.file.path;

        let cart = await cartModel.findOne({
            userId: decode.userid
        });


        let newItem = {
            productId,
            quantity: Number(quantity),
            color:color,
            price: Number(price),
            designImage: designImage || null,
            instructions: instructions || ""
        };

        if(cart)
        {
               const existingItem = cart.items.find(item =>
                item.productId.toString() === productId.toString() &&
                item.color === color &&
                item.designImage === designImage &&
                item.instructions === (instructions || "")
            );

            if (existingItem) {

                // Increase existing product quantity
                existingItem.quantity += Number(quantity);

            } else {

                // Add new product to existing cart
                cart.items.push(newItem);

            }

            // Save updated cart
            await cart.save();
        }
        else{

            
          cart = await cartModel.create( {userId:decode.userid, items:[newItem] } );
        }
          

         return res.status(201).json({success: true,message: "Product Added to Cart Successfully",cart});

    }
    catch(err)
    {
        console.error("Add to Cart Error", err);
        return res.status(500).json({success:false,message:"Error Occured while Adding Product to Cart"})
    }
}


const viewCart= async (req,res) =>
{
    try{
             // Decode JWT to identify logged-in user
        const decode = orderController.decodeToken(req);

        // Find cart belonging to the user
        const cart = await cartModel.findOne({
            userId: decode.userid
        }).populate("items.productId");

        // Check whether cart exists
        if (!cart || cart.items.length==0) {
            return res.status(404).json({
                success: false,
                message: "Cart is Empty"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart Details Retrieved Successfully",
            cart
        });

    }
    catch(err)
    {
        console.log("View Cart Error:", err);
        return res.status(500).json({success:false,message:"Error Occured while retriving Cart"})
    
    }
}



const updateCartItem = async (req, res) => {
    try {
        const decode = orderController.decodeToken(req);

        const { itemId,color, quantity,instructions } = req.body;
       

        if (!itemId) {
            return res.status(400).json({
                success: false,
                message: "itemId is required"
            });
        }
        // Find user's cart
        const cart = await cartModel.findOne({
            userId: decode.userid
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            });
        }

        // Find the product inside cart
        const existingItem = cart.items.id(itemId);

        if (!existingItem) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found in Cart"
            });
        }

        // Update quantity
        //existingItem.quantity = Number(quantity) || existingItem.quantity;
        //existingItem.color=color || existingItem.color;
        //existingItem.instructions=instructions || existingItem.instructions;
        //existingItem.designImage=designImage || existingItem.designImage;

        if (quantity !== undefined ) 
        {
                    const qty = Number(quantity);

        if (!Number.isFinite(qty) || qty <= 0) {
                return res.status(400).json({
            success: false,
            message: "Invalid Quantity"
        });
    }

    existingItem.quantity = qty;
}

// Update colour
if (color) {
    existingItem.color = color;
}

// Update instructions
if (instructions !== undefined) 
{
    existingItem.instructions = instructions;
}

// Update design image
if (req.file) {
    existingItem.designImage = req.file.path;
}

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart Updated Successfully",
            cart
        });

    }
    catch (err) {
        console.log("Update Cart Error:", err);

        return res.status(500).json({
            success: false,
            message: "Error Occurred while Updating Cart"
        });
    }
};


const deleteCartItem = async (req,res)=>
{
    try{
             // Get logged-in user's ID from JWT
        const decode = orderController.decodeToken(req);

        // Get product ID from URL parameters
        const  productId  = req.params.id;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is Required"
            });
        }

        // Find the cart belonging to the logged-in user
        const cart = await cartModel.findOne({
            userId: decode.userid
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            });
        }

        // Check whether the product exists in the cart
        const existingItem = cart.items.find(
            item => item.productId.toString() === productId
        );

        if (!existingItem) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found in Cart"
            });
        }

        // Remove the particular product from items array
        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        // Save updated cart
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product Removed from Cart Successfully",
            cart
        });
    }
    catch(err)
    {
        console.log("Update Cart Error:", err);

        return res.status(500).json({
            success: false,
            message: "Error Occurred while Removing Product from  Cart"
        });
    }
}

const emptyCart = async (req, res) => {
    try {
        // Decode JWT to identify logged-in user
        const decode = orderController.decodeToken(req);

        // Find the user's cart
        const cart = await cartModel.findOne({
            userId: decode.userid
        });

        // Check whether cart exists
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            });
        }

        // Check whether cart is already empty
        if (cart.items.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Cart is Already Empty"
            });
        }

        // Remove all items from cart
        cart.items = [];

        // Save updated cart
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart Emptied Successfully",
            cart
        });

    }
    catch (err) {
        console.log("Empty Cart Error:", err);

        return res.status(500).json({
            success: false,
            message: "Error Occurred while Emptying Cart"
        });
    }
};



module.exports={ addToCart,viewCart,
    updateCartItem,deleteCartItem,emptyCart
}