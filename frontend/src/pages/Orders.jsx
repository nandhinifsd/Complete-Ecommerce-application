import React, { useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import api from '../api/apiinstance';

const Orders = () => {
    const [orders, setOrders]=useState([]);
 // const OrderAPI="https://striking-comfort-production-2d21.up.railway.app/orders";
 //const OrderAPI="https://react-stampore-project-crudoperations.onrender.com/orders";
    const navigate=useNavigate();

    // Determine the logged-in user's role
      const token = localStorage.getItem("token");

       const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
useEffect(()=>
{
  getOrders();
   alert("Click on the Orders row to know more details")
},[]);
async function getOrders()
{
    try  
      {
     const response = await api.get("/orders/viewall",axiosConfig);
     setOrders(response.data.orders);
     console.log("Orders loaded successfully")
      }
      catch(err)
      {
        console.log(err);
      }
  }

  function getStatusDesign(status) {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-700 hover:bg-green-200 rounded-lg shadow-lg";

        case "processing":
            return "bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg shadow-lg";

        case "cancelled":
            return "bg-red-100 text-red-700 hover:bg-red-200 rounded-lg shadow-lg";

        default:
            return "bg-white  hover:bg-gray-100 rounded-lg shadow-lg";
    }
}

  return (
     <>
     <header className="min-w-screen w-full h-auto z-500">
              <Navbar />
            </header>
    <main>
    <div className="flex flex-col items-center justify-center mt-30">
      <h1 className="font-serif font-black text-xl lg:text-4xl text-blue-900 mt-3 text-center">Order Information</h1>
      <table className="w-full text-blue-900 my-5 p-3">
        <thead className=" bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100 text-center lg:text-xl text-xs p-1 lg:p-8 h-[30px] w-full">
        <tr>
          <th className="p-4">Order Date</th>
          <th className="p-4">Order Status</th>
          <th className="p-4">Total Amount</th> 
          <th className="p-4">Payment Status</th> 
          <th className="p-4">Payment Mode</th> 
        </tr>
        </thead>
        <tbody>
          { orders.map((order)=>(
              <tr key={order._id} 
              className= "odd:bg-white even:bg-yellow-50 group relative hover:bg-teal-50 cursor-pointer" 
              onClick={()=>navigate(`/orders/details/${order._id}`)}>
                <td className="p-4 font-normal hover:font-semibold text-center">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="p-4 font-normal hover:font-semibold text-center"><p className={`${getStatusDesign(order.status)} my-1 px-4 py-2 font-normal hover:font-semibold `}>{order.status}</p></td>
                <td className="p-4 font-normal hover:font-semibold text-center">{order.totalAmount}</td>
                <td className="p-4 font-normal hover:font-semibold text-center ">{order.paymentStatus}</td>
                <td className="p-4 font-normal hover:font-semibold text-center">{order.paymentMode}</td>
                 <div className=" hidden group-hover:block absolute right-4 top-1/2-translate-y-1/2
        bg-white border border-gray-300 rounded-md shadow-md px-3 py-2 text-sm text-gray-700">
                        Click here to know more about {order._id}
                      </div>
              </tr> 
              ))}
        </tbody>
      </table>
    </div>
     </main>
    <Footer />
    </>
  );
}

export default Orders;
