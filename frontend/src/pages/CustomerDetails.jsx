import React from 'react';
import { useState, useEffect } from 'react';
import api from '../api/apiinstance';
import { useParams,Link } from 'react-router-dom';

const CustomerDetails = () => {
    const { id } =useParams();
    const [customer,setCustomer]=useState();
    const [orders, setOrders]=useState([]);
     const [products, setProducts] = useState([]);
    
  // Determine the logged-in user's role
      const token = localStorage.getItem("token");

       const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
      async function getCustomerDetails()
    {
        try  
      {
     const customerresponse = await api.get(`customers/view/${id}`,axiosConfig);
     setCustomer(customerresponse.data.customer);
     console.log("Customer Details loaded successfully")
      }
      catch(err)
      {
        console.log(err);
      }
    }

    async function getOrders()
    {
          try  
      {
     const orderresponse = await api.get(`/orders/viewbycustomer/${id}`,axiosConfig);
     setOrders(orderresponse.data.orders);
     console.log("Customer Orders loaded successfully")
      }
      catch(err)
      {
        console.log(err);
      }

    }
 async  function getProducts()
        {
      try  
      {
     const response = await api.get("/products/view");
     setProducts(response.data.products);
     console.log("Products loaded successfully")
      }
      catch(err)
      {
        console.log(err);
      }
  }

    const processingOrders = orders.filter(
  order => order.status === "processing"
);
const cancelledOrders = orders.filter(
  order => order.status === "cancelled"
);
const completedOrders = orders.filter(
  order => order.status === "completed"
);

// Convert relative image paths into complete URLs
const imgURl="http://localhost:6500/";
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${imgURl}${imagePath.replace(/^\/+/, "")}`;
  };
   
useEffect(()=>
{
getCustomerDetails();
  getOrders();
  getProducts();
},[id]);
    
  return (
    <>
    {customer && (

    <div className="font-serif font-black  text-blue-900 m-2  p-8 ">
    <Link to="/customers" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-md text-white rounded-lg hover:bg-blue-700 transition">
  ← Back to Customers</Link><span><h1 className="text-2xl lg:text-4xl lg:m-8 text-center"> Customer Details</h1></span>
        <div className='flex flex-col lg:flex-row lg:gap-1 gap-10 w-full p-2 m-1 lg:m-4  justify-around'>

        <div className="w-full lg:w-1/2 shadow-lg rounded-lg h-auto customer-card p-2 font-serif font-normal text-blue-900 text-left bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100 flex flex-col">
        <h1 className="text-sm lg:text-xl p-2 m-1">Name: {customer.name}</h1>
        <h2 className="text-sm lg:text-xl p-2 m-1">Phone: {customer.phone}</h2>
        <h2 className="text-sm lg:text-xl p-2 m-1">Email: {customer.email}</h2>
        <h2 className="text-sm lg:text-xl p-2 m-1">Address: </h2>
        {customer.address.split(",").map((line)=>
        (<p className='text-sm lg:text-lg p-2 m-1'>{line.trim()}</p>))}
        </div>
        <div className="logs-cards w-auto flex flex-row flex-wrap flex-shrink lg:flex-col justify-center gap-8">
        <div className="flex flex-row gap-8 flex-shrink">   
        <div className="order-count-logs  px-11 py-8 lg:px-14 flex flex-col justify-center items-center text-white bg-blue-600   h-auto rounded-lg shadow-lg">
        
            <h1 className="text-sm lg:text-2xl font-semibold">Orders<br/></h1>
            <p className="text-md lg:text-7xl font-black">{orders.length}</p>
        
         </div>
          <div className="order-count-logs  p-8 flex flex-col justify-center items-center text-white bg-green-300 h-auto  rounded-lg shadow-lg">
        
            <h1 className="text-sm lg:text-2xl font-semibold">Completed <br/></h1>
            <p className="text-md lg:text-7xl font-black">{completedOrders.length}</p>
        
         </div>
       </div> 
       <div className="flex flex-row gap-8 flex-shrink">
          <div className="order-count-logs  p-8 flex flex-col justify-center items-center text-white bg-yellow-300  h-auto rounded-lg shadow-lg">
        
            <h1 className="text-sm lg:text-2xl font-semibold">Processing<br/></h1>
            <p className="text-md lg:text-7xl font-black">{processingOrders.length}</p>
        
         </div>

          <div className="order-count-logs  px-9 py-8 lg:px-10 flex flex-col justify-center items-center text-white bg-red-500  h-auto rounded-lg shadow-lg">

        
            <h1 className="text-sm lg:text-2xl font-semibold">Cancelled <br/></h1>
            <p className="text-md lg:text-7xl font-black">{cancelledOrders.length}</p>
        
         </div>
        
        </div></div>

        </div>
        <div className="order-cards m-1 p-1 lg:m-4 lg:p-2 gap-2 grid grid-col-1 sm: grid-col-2 md: grid-col-3 lg:grid-col-4 w-full">
            

  <h2 className="text-xl lg:text-3xl font-bold mb-4"> Orders</h2>

  <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 m-8">
    {orders.map((order) => {
      let bgColor = "";
      if (order.status.toLowerCase() === "completed") {
        bgColor = "bg-green-300";
      } 
      else if (order.status.toLowerCase() === "cancelled") {
        bgColor = "bg-red-500";
      } 
      else if (order.status.toLowerCase() === "processing" || "pending") {
        bgColor = "bg-yellow-300";
      }
     // const product = products.filter(product => product.id === order.items.productId);
      return (
        
        <div key={order._id} className={`${bgColor} text-start p-4 flex flex-col md:flex-row justify-between rounded-xl shadow-lg 
        text-white text-lg font-normal`}>
         <div className="text-start p-4">
          <h3 className="font-bold text-lg">
            Order ID: {order._id}
          </h3>
          <p>
           Order Date: {new Date(order.orderDate).toLocaleDateString()}
          </p>
            {   
                order.items.map((item) => {
                const product = products.find( product => product._id === item.productId);
                return (
                  <div className="flex flex-row">
                        <div key={item.productId}  className="justify-center items-center me-10 ">

                                <p>Product Name: {product?.name}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ₹{item.price}</p>
                                </div>
                                <div className="justify-center items-center ">
          <img
            src={getImageUrl(item.designImage)} alt={`Design for ${order._id}`} className="w-32 h-32 object-contain mt-3 rounded-lg shadow-lg"
          /></div>
                         
                         </div>
                          );
            })}
          <p className="font-bold mt-2">
            Status: {order.status}
          </p></div>
        
          
        </div>
      );
    })}

  </div>

</div>





            
            </div> 
   
    )  }
    </> );
}

export default CustomerDetails;
