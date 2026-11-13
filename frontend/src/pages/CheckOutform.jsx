
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiinstance"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CheckoutForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        pincode: "",
        paymentMode: "COD"
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const token = localStorage.getItem("token");

            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            // Determine payment status
            const paymentStatus =
                formData.paymentMode === "COD"
                    ? "After Delivery"
                    : "While Ordering";

            const orderData = {
                customerDetails: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: `${formData.address}-${formData.pincode}`
                    
                },
                paymentMode: formData.paymentMode,
                paymentStatus
            };

            const response = await api.post(
                "/orders/create",
                orderData,
                axiosConfig
            );

            if (response.data.success) {
                setMessage("Order placed successfully!");

                alert("Order placed successfully!");

                navigate("/myorders");
            }

        } catch (err) {
            console.log("Checkout error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to place your order"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <header>
            <Navbar />
        </header>
        <main>
        <div className="min-h-screen bg-gradient-to-r from-cyan-50 to-teal-50 py-10 px-4 mt-20">

            <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-blue-900 text-center mb-2">
                    Checkout
                </h1>

                <p className="text-gray-500 text-center mb-8">
                    Enter your delivery details to place your order.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Customer Name */}
                    <div>
                        <label className="block text-blue-900 font-medium mb-2">
                            Customer Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-blue-900 font-medium mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-blue-900 font-medium mb-2">
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit phone number"
                            pattern="[0-9]{10}"
                            maxLength="10"
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                        />
                    </div>

                    {/* Shipping Address */}
                    <div>
                        <label className="block text-blue-900 font-medium mb-2">
                            Shipping Address
                        </label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your complete shipping address"
                            rows="3"
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                        />
                    </div>

                    {/* Pincode */}
                    <div>
                        <label className="block text-blue-900 font-medium mb-2">
                            Pincode
                        </label>

                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="6-digit pincode"
                            pattern="[0-9]{6}"
                            maxLength="6"
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                        />
                    </div>

                    {/* Payment Mode */}
                    <div>
                        <label className="block text-blue-900 font-medium mb-2">
                            Payment Mode
                        </label>

                        <select
                            name="paymentMode"
                            value={formData.paymentMode}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-3 bg-white focus:ring-2 focus:ring-cyan-400 outline-none"
                        >
                            <option value="COD">
                                Cash on Delivery
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Card">
                                Debit / Credit Card
                            </option>

                            <option value="Net Banking">
                                Net Banking
                            </option>
                        </select>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-600 text-center">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-cyan-700 hover:to-teal-700 disabled:opacity-50"
                    >
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>

                </form>
            </div>
        </div>
        </main>
        <Footer />
        </>
    );
};

export default CheckoutForm;

