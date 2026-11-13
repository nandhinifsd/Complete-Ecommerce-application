const productModel=require("../model/product.model")

const getProductDetails= async (req,res) =>
{
    try{
        const products= await productModel.find();
        if(!products || products.length<=0)
        {
            return res.status(404).json({success:false,message:"Products is empty"})
        }
        //console.log(products);
        return res.status(200).json({success:true,message:"Products loaded successfully",products});

    }
    catch(err)
    {
        return res.status(500).json({success:false,message:"Products loading unsuccessful"});
    }
}
const addProduct = async (req,res) =>
{
    try{
                const { name, catagory,brand,shape,dimension,price,isDiscounted,discount,productImage,sealImage } = req.body;

        if( !name || !catagory || !brand || !shape || !dimension || !price || !productImage || !sealImage )
        {
            return res.status(400).json({success:false,message:"Product Details Missing"});
        }
        const productExists=await productModel.findOne({name});
        if(productExists)
        {
            
            return res.status(404).json({success:false,message:"Product already Exists"})
        }
        if(isDiscounted)
        {
            const addProduct=await productModel.create({name,catagory,brand,shape,dimension,price,isDiscounted,discount,productImage,sealImage });
        }
        const addProduct=await productModel.create({name,catagory,brand,shape,dimension,price,productImage,sealImage });
        return res.status(200).json({success:true,message:"Product Added Successfully"});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({success:false,message:"New Product Addition  unsuccessful"});
    }   
}

const getProductDetailsbyId = async ( req,res ) =>
{
    try{
        const productid=req.params.id;
        const product= await productModel.findById( productid );
        if(!product || product =={})
        {
            return res.status(404).json({success:false, message:"Product not found"});
        }
        return res.status(200).json({success:true, message:`Product found with ${productid}`, product})
    }
    catch(err)
    {
        return res.status(500).json({success:false,message:"Error occured while product fetching"});
    }
}

const sortProducts = async (req,res) =>
{
    try{
        let type;
        if(req.params.value=="price low to high")
            {
                 type=1
            } 
        else if(req.params.value=="price high to low")
        {
             type=-1
        }
        else
        {
            return res.status(404).json({success:false,message:"Not a valid sort operation"});
        }
        const products= await productModel.find().sort({ price: type });

         if(!products || products.length<=0)
        {
            return res.status(404).json({success:false,message:"Products is empty"})
        }
          return res.status(200).json({success: true,
            message:`Products Sorted from Price ${req.params.value}`,products
        });

    }
    catch(err)
    {
        return res.status(500).json({ success:false, message:`Price based sorting failed` })
    }
}



const filterProducts = async (req, res) => {
    try {
        const { catagory, brand,shape,maxPrice } =req.query;
       // const catagory=req.params.catagory;

        let filter={}

        
        //catagory filter
        if(catagory)
        {
            filter.catagory= catagory ;
        }


        if (brand) {
            const brands=brand.split(",");
            filter.brand={ $in: brands };
        }

        if(shape)
        {
            const shapes=shape.split(",");
            filter.shape={ $in : shapes };

        }

        // Maximum price filter
        if (maxPrice !== undefined) {

            const price = Number(maxPrice);

            if (Number.isNaN(price) || price < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide a valid price"
                });
            }

            filter.price = { $lte: price };
        }

        const products= await productModel.find(filter);

         if(!products || products.length<=0)
        {
            return res.status(404).json({success:false,message:"Products is empty"})
        }
        //console.log(products);
        return res.status(200).json({success:true,message:"Products loaded successfully",products});

           

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "Filter operation unsuccessful"
        });
    }
};
const updateProduct = async( req, res ) =>
{
    try{
        const productid=req.params.id;
        //const { name, catagory,brand,shape,dimension,price,productImage,sealImage } = req.body;
        const product=await productModel.findByIdAndUpdate(productid,req.body, { new:true });
        if(!product || product=={} )
        {
            return res.status(404).json({success:false,message:`Product with ${productid} is not found`});
        }
        return res.status(200).json({success:true, message:`Product with ${productid} updated successfully`});
    }
    catch(err)
    {
        return res.status(500).json({ success:false, message:"Update operation unsuccessful" });
    }
}

const deleteProduct =async(req,res) =>
{
    try{
        const productid=req.params.id;
        const product = await productModel.findByIdAndDelete(productid);
         if(!product || product=={} )
        {
            return res.status(404).json({success:false,message:`Product with ${productid} is not found`});
        }
         return res.status(200).json({success:true, message:`Product Details with ${productid} deleted`});
    
    }
    catch(err)
    {
        return res.status(500).json({ success:false, message:"Delete operation unsuccessful" });
    }
    }

module.exports={ getProductDetails, addProduct, sortProducts,
    getProductDetailsbyId, filterProducts,updateProduct,deleteProduct }