import React, { useState} from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Productcard = ({product,onDelete,onEdit}) => {

  // Determine the logged-in user's role
  const token = localStorage.getItem("token");

  const decodedToken = token ? jwtDecode(token) : null;


const role = decodedToken?.role;
const isAdmin = role === "admin";
const navigate=useNavigate();
  const [currentImage, setCurrentImage]=useState(product.productImage);
  function changeImage()
  {
    if (currentImage==product.productImage)
    setCurrentImage(product.sealImage);
  else
    setCurrentImage(product.productImage);
  }

  const handleOrder = () => {
  if (!decodedToken || role !== "user") {
    alert("Login to Order");
    navigate("/login");
    return;
  }

  navigate(`/products/placeorder/${product._id}`);
};
function getDiscountedprice(price,discount)
{
  return price-price*(discount/100);
}
  return (
    <div className=' rounded-lg shadow-lg m-1 p-4 w-full max-w-[400px] h-[600px] bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100'>
         <div className="bg-white/30 backdrop-blur-md grid grid-rows-[auto_1fr_auto_auto_auto] m-1 p-3 h-[auto] rounded-lg shadow-lg">
      <div className='flex justify-center items-center w-full h-64'>
        <img className='product-image rounded-lg shadow-lg w-full h-full m-1 object-contain' src={currentImage} alt={product.name} width="200px" height="200px" 
        onClick={()=>{changeImage();}} />
      </div>
      <div className='product-title font-serif font-bold text-blue-900 text-2xl m-1 p-2'><h1>{product.name}</h1></div>
      <div className='product-dimension font-serif font-semibold text-blue-900 text-xl m-1 p-1'><h1>{product.dimension}</h1></div>
      
      {product.isDiscounted &&
      <>
      <div className='product-price font-serif font-bold text-red-900 text-2xl m-1 p-1 flex flex-row '><h1 className='line-through'>&#8377;{product.price}</h1>
      <span className='product-discount font-serif font-bold text-black-700 text-sm m-1 p-1'>{product.discount}%</span>
      <span className='product-price font-serif font-bold text-red-900 text-2xl m-1 p-1 '><h1>&#8377;{getDiscountedprice(product.price,product.discount)}</h1></span></div>
      </>
      }
      {!product.isDiscounted &&
      
      <div className='product-price font-serif font-bold text-red-900 text-2xl m-1 p-1'><h1>&#8377;{product.price}</h1></div>
   
      }
      <div className='flex flex-row'>
        {isAdmin ? (
        <>
            <button onClick={() => onEdit(product._id)} className="bg-blue-900 text-white font-serif font-bold p-2 m-4 rounded-lg hover:shadow-lg hover:bg-green-700">Update</button>
            <button onClick={() => onDelete(product._id)} className="bg-blue-900 text-white font-serif font-bold p-2 m-4 rounded-lg hover:shadow-lg hover:bg-red-500">Delete</button>
  </>
) : (
  <button onClick={handleOrder} className="bg-blue-900 text-white font-serif font-bold p-2 m-4 rounded-lg hover:shadow-lg hover:bg-green-700">Click to Order</button>
)}
      
      </div>
    </div>
    
    </div>
  );
}

export default Productcard;
