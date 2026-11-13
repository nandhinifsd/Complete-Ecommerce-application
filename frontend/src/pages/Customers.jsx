import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from '../api/apiinstance';
import { jwtDecode } from 'jwt-decode';
const Customers = () => {
  const [customers, setCustomers]=useState([]);
 // const customerAPI="https://striking-comfort-production-2d21.up.railway.app/customers";
 //  const customerAPI="https://react-stampore-project-crudoperations.onrender.com/customers"
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
  getCustomers();
  alert("Click on the customer row to know more details")
},[]);
async function getCustomers()
{
    try  
      {
     const response = await api.get("/customers/view",axiosConfig);
     setCustomers(response.data.customers);
     console.log("Customers loaded successfully")
      }
      catch(err)
      {
        console.log(err);
      }
  }


  return (
    <>
     <header className="min-w-screen w-full h-auto z-500">
              <Navbar />
            </header>
    <main>
      <h1 className="font-serif font-black text-xl lg:text-4xl text-blue-900 mt-30 text-center">Customer Information</h1>
      <table className="w-full text-blue-900 my-5 p-3">

        <thead className=" bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100 text-center lg:text-xl text-xs p-1 lg:p-8 h-[30px] w-full">

        <tr>
          <th className="p-4">Customer Name</th>
          <th className="p-4">Customer Phone Number</th>
          <th className="p-4"> Customer Email ID</th> 
        </tr>
        </thead>
        <tbody>
          { customers.map((customer)=>(
              <tr key={customer.id} 
              className= "odd:bg-white even:bg-yellow-50 group relative hover:bg-teal-50 cursor-pointer" 
              onClick={()=>navigate(`/customers/details/${customer._id}`)}>
                <td className="p-4 font-normal hover:font-semibold text-center">{customer.name}</td>
                <td className="p-4 font-normal hover:font-semibold text-center">{customer.phone}</td>
                <td className="p-4 font-normal hover:font-semibold text-center">{customer.email}</td>
                
                      <div className=" hidden group-hover:block absolute right-4 top-1/2-translate-y-1/2
        bg-white border border-gray-300 rounded-md shadow-md px-3 py-2 text-sm text-gray-700">
                        Click here to know more about {customer.name}
                      </div>
                
              </tr> 
              ))}
        </tbody>
      </table>
    </main>
    <Footer />
    </>
  );
}

export default Customers;
