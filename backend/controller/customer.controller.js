const customerModel=require("../model/customer.model");

const getAllCustomers = async (req,res) =>
{
    try{
        const customers= await customerModel.find();
                if(!customers || customers.length<=0)
                {
                    return res.status(404).json({success:false,message:"Customers is empty"})
                }
                //console.log(customers);
                return res.status(200).json({success:true,message:"Customers loaded successfully",customers});
        
    }
    catch(err)
    {
            return res.status(500).json({success:false,message:"Customers loading unsuccessful"});
    }
}

const getCustomerById = async (req,res) =>
{
    try{
        const customerid=req.params.id;
        const customer= await customerModel.findById( customerid );
        if(!customer || customer =={})
        {
            return res.status(404).json({success:false, message:"Customer not found"});
        }
        return res.status(200).json({success:true, message:`Customer found with ${customerid}`, customer})
    }
    catch(err)
    {
        return res.status(500).json({success:false,message:"Error occured while customer fetching"});
    }

    }

async function addCustomer(customerDetails) {
    try {
        //const { name, email, phone, address } = req.body;

        if (!customerDetails.name || !customerDetails.email || !customerDetails.phone || !customerDetails.address) {
            throw new Error.json({
                success: false,
                message: "Please provide all customer details"
            });
        }

        // Check whether customer already exists
       let customer = await customerModel.findOne({ phone:customerDetails.phone });

    if(!customer)
    {
        customer= await customerModel.create(customerDetails);
        
    }
    if(customer.name!=customerDetails.name)
    {
        customer.name=customerDetails.name;
        customer.email=customerDetails.email;
        customer.address=customerDetails.address;
    }
    return customer._id;
    } catch (err) {
        console.log("Add customer error:", err);

       
        
    }
};

async function updateCustomerInfo(req,res)
{
    try{
        const customerid= req.params.id;
        const { email, address } =req.body;
       
        
         const customer=await customerModel.findByIdAndUpdate(customerid,req.body, { new:true });
        
        
        if(!customer || customer=={} )
        {
            return res.status(404).json({success:false,message:`Customer with ${customerid} is not found`});
        }
        return res.status(200).json({success:true, message:`Customer with ${customerid} updated successfully`});
    
    }
    catch(err)
    {
        return res.status(500).json({success:false,message:"Error occured while updating Customer"});
    }
}




module.exports={ getAllCustomers, getCustomerById, addCustomer, updateCustomerInfo };