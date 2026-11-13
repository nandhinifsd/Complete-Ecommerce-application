const mongoose=require("mongoose");
async function dbConnect()
{
    try{
        await mongoose.connect(process.env.db_uri);
        console.log("db connected successfully");
    }
    catch(err)
    {
        console.error("Db connection err: ",err.message);
        //process.exit(1);
        throw err;
    }
};

module.exports=dbConnect;