
import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AdminProtectedRoute from "./components/AdminProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import PlaceOrder from "./pages/PlaceOrder";
import Cart from "./pages/Cart";
import CheckOutForm from "./pages/CheckOutform";
import MyOrders from "./pages/MyOrders";

import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

import Addform from "./components/Addform";
import ViewProducts from "./components/ViewProducts";
import CustomerDetails from "./pages/CustomerDetails";
import OrderDetails from "./pages/OrderDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";
import  Logout  from "./pages/Logout";

import "./App.css";

function App() {

  return (
    <div className="min-h-screen flex flex-col">

      

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />}>
            <Route index element={<ViewProducts />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          {/* ADMIN PROTECTED ROUTES */}
          <Route element={<AdminProtectedRoute />}>

            <Route path="/products/add" element={<Products />}>
              <Route index element={<Addform />} />
            </Route>

            <Route path="/products/edit/:id" element={<Products />}>
              <Route index element={<Addform />} />
            </Route>

            <Route path="/customers" element={<Customers />} />

            <Route
              path="/customers/details/:id"
              element={<CustomerDetails />}
            />

            <Route path="/orders" element={<Orders />} />

            <Route
              path="/orders/details/:id"
              element={<OrderDetails />}
            />

          </Route>


          {/* CUSTOMER PROTECTED ROUTES */}
          <Route element={<UserProtectedRoute />}>

            {/* Add customer pages here */}

            
            <Route path="/products/placeorder/:id" element={<PlaceOrder />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/checkout" element={<CheckOutForm />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/my-orders/details/:id" element={<OrderDetails />} />
            
            

          </Route>


          {/* LOGOUT */}
          <Route
            path="/logout"
            element={<Logout />}
          />


          {/* INVALID ROUTES */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      

   

    </div>
  );
}

export default App;
