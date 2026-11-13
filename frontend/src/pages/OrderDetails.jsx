
import React, { useState, useEffect } from "react";
import api from "../api/apiinstance";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Pencil } from "lucide-react";
import { Check } from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();

  const [customer, setCustomer] = useState({});
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");
  const [paymentmode, setPaymentmode] = useState("");
  const [updateCustomerEmail, setUpdateCustomerEmail] = useState(false);
  const [updateCustomerAddress,setUpdateCustomerAddress]=useState(false);
  const [email,setEmail]=useState("");
  const [address,setAddress]=useState("");

  // Determine the logged-in user's role
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const role = decodedToken?.role;

  const isAdmin = role === "admin";
  const isUser = role === "user";

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const imageURl="http://localhost:6500/";

  // Convert relative image paths into complete URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${imageURl}${imagePath.replace(/^\/+/, "")}`;
  };

  // Get order details
  async function getOrderDetails() {
    try {
      console.log(id);

      const orderresponse = await api.get(
        `/orders/view/${id}`,
        axiosConfig
      );

      const fetchedOrder = orderresponse.data.order;

      setOrder(fetchedOrder);
      setStatus(fetchedOrder.status);
      setPayment(fetchedOrder.paymentStatus);
      setPaymentmode(fetchedOrder.paymentMode);

      console.log(fetchedOrder);
      console.log("Order Details loaded successfully");

      await getCustomerInfo(fetchedOrder.customerId);
    } catch (err) {
      console.log(err);
    }
  }

  // Get customer information
  async function getCustomerInfo(customerid) {
    try {
      const customerresponse = await api.get(
        `/customers/view/${customerid}`,
        axiosConfig
      );

      setCustomer(customerresponse.data.customer);

      console.log(customerresponse.data.customer);
      console.log("Customer Details loaded successfully");
    } catch (err) {
      console.log(err);
    }
  }

  // Get products
  async function getProducts() {
    try {
      const response = await api.get("/products/view");

      setProducts(response.data.products);

      console.log("Products loaded successfully");
    } catch (err) {
      console.log(err);
    }
  }

  // Update order
  async function updateOrder() {
    try {
      const response = await api.put(
        `/orders/update/${id}`,
        {
          status: status,
          paymentStatus: payment,
          paymentMode: paymentmode,
        },
        axiosConfig
      );

      setOrder(response.data.order);

      alert("Order updated successfully!");
      //Refresh Order Details
      await getOrderDetails();
    } catch (err) {
      console.log(err);
      alert("Failed to update order.");
    }
  }

  // Cancel order
  async function cancelOrder() {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      const response = await api.put(
        `/orders/cancel/${id}`,
        {},
        axiosConfig
      );

      alert("Order cancelled successfully!");

      // Refresh order details
      await getOrderDetails();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message || "Failed to cancel order."
      );
    }
  }

  // Your original updateCustomerInfo function retained unchanged
  async function updateCustomerInfo() {
    const confirmCancel = window.confirm(
      "Are you sure you want to update this customer?"
    );

    if (!confirmCancel) return;

    try {
      if(email!="" && updateCustomerEmail)
      {
      const response = await api.put(
        `/customers/update/${customer._id}`,
        {email:email},
        axiosConfig
      );

      alert("Customer Updated successfully!");
    }

    if(address!="" && updateCustomerAddress)
      {
      const response = await api.put(
        `/customers/update/${customer._id}`,
        {address:address},
        axiosConfig
      );

      alert("Customer Updated successfully!");
    }

      // Refresh customer details
      await getCustomerInfo(customer._id);
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message || "Failed to cancel order."
      );
    }
  }

  useEffect(() => {
    getOrderDetails();
    getProducts();
  }, [id]);

  return (
    <>
      {order?._id && (
        <div className="font-serif font-black text-blue-900 m-2 p-8">

          {/* Back button and heading */}
          <div className="flex flex-col">
            <Link
              to="/orders"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-md text-white rounded-lg hover:bg-blue-700 transition w-fit"
            >
              ← Back to Orders
            </Link>

            <h1 className="text-2xl lg:text-4xl lg:m-8 text-center">
              Order Details
            </h1>
          </div>

          {/* Order ID and Date */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-evenly">

            <div className="flex items-center gap-4">
              <p className="text-md text-gray-500">
                Order ID:
              </p>

              <span className="text-md font-bold text-blue-900">
                {order._id}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-md text-gray-500">
                Order Date:
              </p>

              <span className="text-md font-bold text-blue-900">
                {new Date(order.orderDate).toLocaleDateString()}
              </span>
            </div>

          </div>

          {/* Order Items */}
          <div className="p-6 mt-6 flex flex-col items-center justify-center">

            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Order Items
            </h2>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-blue-900 my-5 p-3">

                <thead className="bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100 text-center lg:text-xl text-xs p-1 lg:p-8 h-[30px]">
                  <tr>
                    <th className="p-4">Product Description</th>
                    <th className="p-4">Product Image</th>
                    <th className="p-4">Design Image & Instructions</th>
                    <th className="p-4">Quantity & Color</th>
                    <th className="p-4">Price / Per Item</th>
                    <th className="p-4">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items?.map((item, index) => {

                    const productId =
                      typeof item.productId === "object"
                        ? item.productId?._id
                        : item.productId;

                    const product = products.find(
                      (p) => String(p._id) === String(productId)
                    );

                    return (
                      <tr
                        key={item._id || `${productId}-${index}`}
                        className="border-b hover:bg-gray-50"
                      >

                        <td className="p-4">
                          {productId}
                          <br />
                          {product?.brand || "Unknown Brand"}
                          <br />
                          {product?.catagory || "Unknown Category"}
                          <br />
                          {product?.name || "Unknown Product Name"}
                          <br />
                          {product?.shape || "Unknown Shape"}
                          <br />
                          {product?.dimension || "Unknown Dimension"}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center justify-center">
                            <img
                              src={product?.productImage}
                              alt="Product"
                              className="h-20 w-20 object-contain"
                            />
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-col items-center justify-center">
                            <img
                              src={getImageUrl(item.designImage)}
                              alt="Design"
                              className="h-20 w-20 object-contain"
                            />

                            <p className="p-4 text-sm">
                              Instructions: {item.instructions}
                            </p>
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          <p>Quantity: {item.quantity}</p>
                          <p>Ink color: {item.color}</p>
                        </td>

                        <td className="p-4 text-right">
                          ₹{item.price}
                        </td>

                        <td className="p-4 text-right font-semibold">
                          ₹{item.price * item.quantity}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

                <tfoot>
                  <tr className="bg-gray-100">
                    <td
                      colSpan={5}
                      className="p-3 text-right font-bold"
                    >
                      Total Amount
                    </td>

                    <td className="p-3 text-right font-bold text-blue-900">
                      ₹{order.totalAmount}
                    </td>
                  </tr>
                </tfoot>

              </table>
            </div>

            {/* Customer Information */}
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Customer Info
            </h2>

            <div className="w-full flex flex-row justify-evenly p-4">

              <div className="w-full lg:w-1/2 shadow-lg rounded-lg h-auto customer-card p-2 font-serif font-normal text-blue-900 text-left bg-gradient-to-r from-cyan-100 to-teal-100 to-yellow-100 flex flex-col">

                <h1 className="text-sm lg:text-xl p-2 m-1">
                  Name: {customer?.name}
                </h1>

                <h2 className="text-sm lg:text-xl p-2 m-1">
                  Phone: {customer?.phone}
                </h2>

                {/* Email and Edit button */}
                <div className="flex items-center justify-between w-full p-2">

                  { !updateCustomerEmail && (
                    <>
                    <h2 className="text-sm lg:text-xl">
                    Email: {customer?.email}
                  </h2> 
                  <button
                    type="button"
                    className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={()=>setUpdateCustomerEmail(true)}
                  >
                    <Pencil size={14} />
                  </button>
                  </>
                )}
                  { updateCustomerEmail && (
                  <>
                  <label className="text-sm lg:text-xl">
                    Email: </label> 
                    <input 
                    type="email" 
                    className="w-full p-3 border border-2 border-blue-300 bg-white rounded-lg outline-none 
                              focus:ring-2 focus:ring-blue-400 resize-none" 
                    value={email} 
                    placeholder="Enter your email" 
                    onChange={(e)=>setEmail(e.target.value)}/>
                  

                  <button
                    type="button"
                    className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={()=>{
                      updateCustomerInfo();
                      setUpdateCustomerEmail(false)}}
                  >
                    <Check size={14} />
                  </button>
                    </>) }
                </div>

                {/* Address and Edit button */}
                <div className="flex items-center justify-between w-full p-2">
                       

                  { !updateCustomerAddress && (
                    <>
                  <h2 className="text-sm lg:text-xl">
                    Address: {customer?.address}
                  </h2>
                
                  <button
                    type="button"
                    className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={()=>setUpdateCustomerAddress(true)}
                  >
                    <Pencil size={14} />
                  </button>
      
                
                    </>
                  )}
                  
                  { updateCustomerAddress && (
                  <>
                  <label className="text-sm lg:text-xl">
                    Address: </label> 
                    <textarea
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Enter your address..."
                              rows={4}
                              className="w-full p-3 border border-2 bg-white border-blue-300 rounded-lg outline-none 
                              focus:ring-2 focus:ring-blue-400 resize-none"
                    />

                    <button
                    type="button"
                    className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={()=>{
                      updateCustomerInfo();
                      setUpdateCustomerAddress(false)}}
                  >
                    <Check size={14} />
                  </button>
                    </>) }

                </div>

              </div>
            </div>

            {/* Admin: Update Order Status and Payment */}
            {isAdmin && (
              <div className="w-full bg-white rounded-xl shadow-sm p-6">

                <h2 className="text-xl font-bold text-blue-900 mb-5">
                  Update Order
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  {/* Order Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Order Status
                    </label>

                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Payment Status
                    </label>

                    <select
                      value={payment}
                      onChange={(e) => setPayment(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="After Delivery">
                        After Delivery
                      </option>

                      <option value="While Ordering">
                        While Ordering
                      </option>

                      <option value="Refund Initiated">
                        Refund Initiated
                      </option>

                      <option value="Refund Completed">
                        Refund Completed
                      </option>
                    </select>
                  </div>

                  {/* Payment Mode */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Payment Mode
                    </label>

                    <select
                      value={paymentmode}
                      onChange={(e) => setPaymentmode(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="COD">Cash On Delivery</option>
                      <option value="UPI">UPI Payment</option>
                      <option value="Net Banking">Net Banking</option>
                      <option value="Card">Card</option>
                    </select>
                  </div>

                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={updateOrder}
                    className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Update Order
                  </button>
                </div>

              </div>
            )}

            {/* User: Cancel Order */}
            {isUser &&
              order.status !== "Cancelled" &&
              order.status !== "Delivered" && (

                <div className="w-full bg-white rounded-xl shadow-sm p-6 mt-6">

                  <h2 className="text-xl font-bold text-blue-900 mb-4">
                    Cancel Order
                  </h2>

                  <p className="text-gray-600 mb-4">
                    If you no longer need this order, you can cancel it here.
                  </p>

                  <div className="flex flex-row justify-end">
                    <button
                      type="button"
                      onClick={cancelOrder}
                      className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                    >
                      Cancel Order
                    </button>
                  </div>

                </div>
              )}

          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
