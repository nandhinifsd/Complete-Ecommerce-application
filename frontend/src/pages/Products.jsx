import React from 'react';
import { useState } from 'react';
import { Link,Outlet,useLocation } from 'react-router-dom';
import ApplyFilter from '../components/ApplyFilter';
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import api from '../api/apiinstance';
import { jwtDecode } from 'jwt-decode';


const Products = () => {
    const [sideBar, setSideBar]=useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [productPage,setProductPage]=useState(true);
     const [products, setProducts] = useState([]);
     //const API ="http://localhost:3000/products";
    //const API="https://striking-comfort-production-2d21.up.railway.app/products";
    const API="https://react-stampore-project-crudoperations.onrender.com/products";
    
     const location=useLocation();
{/* States to apply filters*/}
const [selectedCatagory, setSelectedCatagory] = useState("");
const [selectedBrands, setSelectedBrands] = useState([]);
const [selectedShapes, setSelectedShapes] = useState([]);
const [maxPrice, setMaxPrice] = useState(4000);
const [sortOrder, setSortOrder] = useState("");

 // Determine the logged-in user's role
  const token = localStorage.getItem("token");

  const decodedToken = token ? jwtDecode(token) : null;

  const role = decodedToken?.role;

  const isAdmin = role === "admin";
  const isUser = role === "user";
  const showSidebar = isAdmin || isUser;

{/* GET PRODUCTS*/ }
     async  function getProducts()
        {
      try  
      {
     const response = await api.get("/products/view");
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
  useEffect(()=>{
    getProducts();
    SideBar();
     
  },[location.pathname] );
  function SideBar()
  {
     if((location.pathname.includes("/products/add"))||(location.pathname.includes("/products/edit")))
      {
         setProductPage(false);
      }
      else
      {
        setProductPage(true);
      }
  }

  
  return (
 <>
        <header className="min-w-screen w-full h-auto z-500">
          <Navbar />
        </header>
        <main>
    <div className='products-container relative w-screen min-h-screen bg-white lg:flex flex-row mt-30'>
        {
            showSidebar && !sideBar &&(
            <button className='lg:hidden text-2xl bg-transparent ms-0 ps-0 pt-1 pb-1' onClick={()=>setSideBar(true)} >
                    <img className='sidebar-open' src='\icons\sidebar-open.png' height='50px' width='50px'></img>
        </button>
 ) }
    {showSidebar && ( 
      <div className='side-bar hidden lg:flex flex-col w-[20%] min-h-screen m-1 p-2 font-serif text-blue-900 border-e-2 border-blue-900'>
       {/* <Link to="/products/add" className="text-xl font-bold p-2 m-1 hover:border-b-2 border-blue-900 hover:shadow-lg hover:rounded-lg focus:border-b-2 border-blue-900" 
        onClick={()=>setProductPage(false)}>Add New Product</Link>
        <Link to="/products"  className="text-xl font-bold p-2 m-1 hover:border-b-2 border-blue-900 hover:shadow-lg hover:rounded-lg focus:border-b-2 border-blue-900">View Products</Link>
      </div>*/}
      {isAdmin && productPage && (
      <button className= 'm-1 p-1 block w-full link-btn  bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900'
          onClick={()=>setProductPage(false)}>
         <Link to="/products/add" className="text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900" >
         Add New Product</Link></button>
    )}
      {
        productPage && (
            <div>
                
          <button  className= ' m-1 p-2 block w-full link-btn  bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900' 
        onClick={()=>setShowFilters(!showFilters)}>Apply Filters</button>

           { showFilters && (
            <div className="w-full m-1 p-1 h-screen overflow-y-auto">
                <ApplyFilter  selectedBrands={selectedBrands}
                              setSelectedBrands={setSelectedBrands}
                              selectedShapes={selectedShapes}
                              setSelectedShapes={setSelectedShapes}
                              selectedCatagory={selectedCatagory}
                              setSelectedCatagory={setSelectedCatagory}
                              maxPrice={maxPrice}
                              setMaxPrice={setMaxPrice}
                              sortOrder={sortOrder}
                              setSortOrder={setSortOrder}/>
            </div>
         ) }
         </div>
         )
      }
     {
       !productPage && (
        <div>
            <button className= 'm-1 p-1 block w-full link-btn  bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900'
          onClick={()=>setProductPage(true)}>
         <Link to="/products" className="text-xl font-bold p-2 m-1">
         View Products</Link>
         </button>
         </div>
        )   
    }
      </div>
    )}
      <div className='products-display w-full lg:flex flex-col w-[80%] h-[100%] m-1 p-4 z-0 text-xl font-bold'>
            <Outlet  context={{ getProducts,selectedBrands,selectedCatagory,selectedShapes,maxPrice,sortOrder,setProducts,products }} />
        </div>
    
    {
        ((sideBar)&&(productPage)) && (
        <div className='sidebar-visible w-full sm:w-1/2 fixed top-[12%] left-0 bg-white h-screen p-2 flex flex-col font-serif text-blue-900 z-50'>
            <button className='lg:hidden text-2xl bg-transparent ms-0 ps-0 pt-1 pb-1' onClick={()=>setSideBar(false)} >
                    <img className='sidebar-open' src='\icons\sidebar-close.png' height='50px' width='50px'></img>
        </button>
         <button className= 'm-1 p-1 block w-full link-btn  bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900'
          onClick={()=>{setProductPage(false);
            setSideBar(false);
          }}>
            <Link to="/products/add" className="text-xl font-bold p-2 m-1">Add New Product</Link>
         </button>
          <button  className= ' m-1 p-1 block w-full link-btn  bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900' 
        onClick={()=>setShowFilters(!showFilters)}>Apply Filters</button>
        {
            showFilters &&
            <div className="w-full m-1 p-1 h-screen overflow-y-auto">
                <ApplyFilter selectedBrands={selectedBrands}
                              setSelectedBrands={setSelectedBrands}
                              selectedShapes={selectedShapes}
                              setSelectedShapes={setSelectedShapes}
                              selectedCataory={selectedCatagory}
                              setSelectedCatagory={setSelectedCatagory}
                              maxPrice={maxPrice}
                              setMaxPrice={setMaxPrice}
                              sortOrder={sortOrder}
                              setSortOrder={setSortOrder}/>
            </div>
        }
        
        </div>)
    }
     {
        ((sideBar)&&(!productPage)) &&(
        <div className='sidebar-visible w-full sm:w-1/2 fixed top-[12%] left-0 bg-white h-screen p-2 flex flex-col font-serif text-blue-900 z-50'>
            <button className='lg:hidden text-2xl bg-transparent ms-0 ps-0 pt-1 pb-1' onClick={()=>setSideBar(false)} >
                    <img className='sidebar-open' src='\icons\sidebar-close.png' height='50px' width='50px'></img>
        </button>
        <button className= 'm-1 p-1 block w-full link-btn bg-transparent text-xl font-bold p-2 m-1  focus:border-b-2 border-blue-900'
         onClick={()=>{setProductPage(true);
            setSideBar(false);}
         }>
         <Link to="/products" className="text-xl font-bold p-2 m-1 flex-grow">View Products</Link>
         </button>
       
        </div>
        )
    }
    </div>
    </main>
    <Footer />
    </>
  );
}

export default Products;
