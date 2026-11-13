import React, { useEffect,useState } from 'react';
import api from '../api/apiinstance';
import Productcard from './Productcard';
import { useOutletContext,useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ViewProducts = () => {

  const [msg,setMsg] = useState("");

  const token = localStorage.getItem("token");
  
    const decodedToken = token ? jwtDecode(token) : null;
  
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
 
  const { getProducts,selectedBrands,selectedCatagory,selectedShapes,maxPrice,sortOrder,setProducts,products } = useOutletContext();
  const navigate=useNavigate();


{/*Update Product details */}
async function editProducts(id) {
  navigate(`/products/edit/${id}`,axiosConfig);  
  }
  {/*Delete Products*/}
   async function deleteProducts(id) {
    console.log("entering delete Products function")
    setMsg("");
      try{
        confirm(`Do you want to delete the product with ${id}`);
          await api.delete(`/products/delete/${id}`,axiosConfig);
          setMsg(" Product Deleted Successfully");
      }
      catch(err)
      {
        console.log(err);
      }
     
      getProducts();
      setMsg("");
    }
/*//Catagory filter
const catagoryMatchProducts = products.filter((product) => 
      ((selectedCatagory === "" )|| (product.catagory === selectedCatagory)));
//brand filter
const brandMatchProducts = catagoryMatchProducts.filter((product) => 
    ((selectedBrands.length === 0 )|| (selectedBrands.includes(product.brand))));
//shape filter
const shapeMatchProducts = brandMatchProducts.filter((product) => 
   ((selectedShapes.length === 0) ||(selectedShapes.includes(product.shape))));
//
const MatchedProducts = shapeMatchProducts.filter((product) => (product.price <= maxPrice)); 
  console.log(catagoryMatchProducts);
console.log(brandMatchProducts);
console.log(shapeMatchProducts);
if (sortOrder === "price high to low") 
  MatchedProducts.sort((a, b) => b.price - a.price);
if(sortOrder==="price low to high") 
  MatchedProducts.sort((a, b) => a.price - b.price);
*/
async function filterProducts()
{
  console.log("entering filter operation")
  try{
    let params={};
    if(selectedCatagory)
    {
      params.catagory=selectedCatagory
    }
    if(selectedBrands.length>0)
    {
      params.brand=selectedBrands.join(",");
    }
    if(selectedShapes.length>0)
    {
      params.shape=selectedShapes.join(",")
    }
  if(maxPrice !=0)
  {
    params.maxPrice=maxPrice;
  }

      const response=await api.get("/products/filter",{ params});
       console.log("API response:", response.data);
    console.log("Is response an array:", Array.isArray(response.data));
     setProducts(response.data.products);
     console.log("Products loaded successfully")
  }
  catch(err)
  {
    console.log(err);
  }
}

async function sortProducts()
{
  try{
      if(sortOrder)
      {
        const response=await api.get(`/products/sort/${sortOrder}`);
       console.log("API response:", response.data);
    console.log("Is response an array:", Array.isArray(response.data));
     setProducts(response.data.products);
     console.log("Products sorted successfully")
      }
  }
  catch(err)
  {
    console.log(err);
  }
}

useEffect(() => {
    filterProducts();
}, [selectedCatagory, selectedBrands, selectedShapes, maxPrice]);
useEffect(()=> {
 sortProducts();},[sortOrder]);
  
  return (
    <div>
      <p className="font-serif text-blue-700 text-l font-bold m-2 p-1">{msg}</p>
       <h1 className='font-serif text-blue-900 text-2xl font-bold m-2 p-1'>Our Products</h1>
       <div className="flex-grow">
        <div className='products-display grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
         {  products.map((product)=>(
                  <Productcard key={product._id}
                              product={product}
                              onDelete={deleteProducts}
                              onEdit={editProducts}/>
        ) )}
         </div>
         </div>
    </div>
  );
}

export default ViewProducts;
