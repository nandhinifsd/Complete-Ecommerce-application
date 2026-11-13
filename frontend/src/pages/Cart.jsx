
import React, { useEffect, useState } from "react";
import api from "../api/apiinstance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"
const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [editingItem, setEditingItem] = useState(null);
const [newColor, setNewColor] = useState("");
const [newDesign, setNewDesign] = useState(null);
const [newInstructions, setNewInstructions] = useState("");

    const token = localStorage.getItem("token");

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

      const navigate=useNavigate();
    const fetchCart = async () => {
        try {
            const response = await api.get("/cart/view", axiosConfig);

            setCartItems(response.data.cart.items);
        }
        catch (err) {
            console.log("View Cart Error:", err);

            setMessage(
                err.response?.data?.message || "Unable to retrieve cart"
            );
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading Cart...</p>;
    }

    if (cartItems.length === 0) {
        return (
          <>
          <header>
            <Navbar />
          </header>
          <main>
            <div className="text-center mt-30">
                <h2 className="text-2xl font-bold text-blue-900">
                    Your Cart is Empty
                </h2>
                <p className="text-gray-500 mt-2">
                    Add some customized stamps to your cart!
                </p>
            </div>
            </main>
            <Footer />
            </>

        );
    }



const updateQuantity = async (itemId, quantity) => {
    try {
        const response = await api.put(
            "/cart/update",
            {
                itemId,
                quantity
            },
            axiosConfig
        );

        setCartItems(response.data.cart.items);
        //Refresh cart
        fetchCart();


    } catch (err) {
        console.log("Quantity Update Error:", err);
        setMessage(
            err.response?.data?.message || "Unable to update quantity"
        );
    }
};

const grandTotal = cartItems.reduce(
    (total, item) =>
        total + Number(item.price) * Number(item.quantity),
    0
);
const updateCustomization = async (itemId) => {
    try {
        const formData = new FormData();

        formData.append("itemId", itemId);
        formData.append("color", newColor);
        formData.append("instructions", newInstructions);

        if (newDesign) {
            formData.append("designImage", newDesign);
        }

        const response = await api.put(
            "/cart/update",
            formData,
            axiosConfig
        );

        setCartItems(response.data.cart.items);
        setEditingItem(null);
        setNewDesign(null);

        setMessage("Customization Updated Successfully");
         //Refresh cart
        fetchCart();

    } catch (err) {
        console.log("Customization Update Error:", err);
        setMessage(
            err.response?.data?.message || "Unable to update customization"
        );
    }
};
    return (
      <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="min-h-screen bg-gradient-to-r from-cyan-50 to-teal-50 p-10 mt-20">

            <h1 className="text-3xl font-bold text-blue-900 mb-8">
                Shopping Cart
            </h1>

            {message && (
                <p className="text-red-600 mb-4">{message}</p>
            )}

            <div className="space-y-5">

                {cartItems.map((item) => (

                    <div
                        key={item._id || item.productId._id}
                        className="bg-white rounded-xl shadow-md p-5 flex gap-6"
                    >

                        <img
                            src={item.productId.productImage}
                            alt={item.productId.name}
                            className="w-32 h-32 object-contain rounded-lg"
                        />

                        <div className="flex-1">

                            <h2 className="text-xl font-semibold text-blue-900">
                                {item.productId.name}
                            </h2>

                            <p className="text-gray-600 mt-2">
                                Ink Color: {item.color}
                            </p>

                            
                          <div className="flex items-center gap-3 mt-3">
                          <button
                         onClick={() => updateQuantity(item._id, Number(item.quantity) - 1)}
                          disabled={Number(item.quantity) <= 1}
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40"
                          >
                           -
                          </button>

                          <span className="font-semibold">
                           {item.quantity}
                            </span>

                            <button
                                    onClick={() => updateQuantity(item._id, Number(item.quantity) + 1)}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                              >
        +
                            </button>
                            </div>


                            <p className="font-semibold mt-2">
                                ₹{item.price}
                            </p>

                            <p className="text-gray-700">
                                Subtotal: ₹{item.price * Number(item.quantity)}
                            </p>

                            {item.instructions && (
                                <p className="text-gray-500 mt-2">
                                    Instructions: {item.instructions}
                                </p>
                            )}

                        </div>

                        <div className="flex flex-col items-center gap-3">

                            <img
                                src={item.designImage}
                                alt="Customer Design"
                                className="w-24 h-24 object-contain border rounded-lg"
                            />

                            <p className="text-sm text-gray-500">
                                Your Design
                            </p>

                             <button
                                     onClick={() => {
                                                       setEditingItem(item._id);
                                                      setNewColor(item.color);
                                                      setNewInstructions(item.instructions || "");
                                                      setNewDesign(null);
                                                    }}
                                                    className="bg-blue-900 text-white px-4 py-2 rounded-lg"
                                                    >
                                                Edit Customization
                            </button>

                        </div>
                        {editingItem === item._id && (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">

        <label className="block font-semibold mb-2">
            Change Ink Color
        </label>

        <select
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="border p-2 rounded w-full mb-3"
        >
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Violet">Violet</option>
            <option value="Black">Black</option>
            <option value="Green">Green</option>
        </select>

        <label className="block font-semibold mb-2">
            Upload New Design
        </label>

        <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewDesign(e.target.files[0])}
            className="mb-3"
        />

        <label className="block font-semibold mb-2">
            Instructions
        </label>

        <textarea
            value={newInstructions}
            onChange={(e) => setNewInstructions(e.target.value)}
            className="border p-2 rounded w-full mb-3"
        />

        <button
            onClick={() => updateCustomization(item._id)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg"
        >
            Save Changes
        </button>

        <button
            onClick={() => setEditingItem(null)}
            className="ml-2 bg-gray-300 px-4 py-2 rounded-lg"
        >
            Cancel
        </button>

    </div>
)}
                           
                        </div>

                ))}

            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mt-8">
    <h2 className="text-xl font-bold text-blue-900">
        Order Summary
    </h2>

    <p className="mt-3">
        Grand Total: ₹{grandTotal}
    </p>

    <button className="bg-blue-900 text-white px-6 py-3 rounded-lg mt-4" onClick={()=>navigate("/cart/checkout")}>
        Proceed to Checkout
    </button>
</div>

        </div>
        </main>
        <Footer />
        </>
    );
};

export default Cart;
