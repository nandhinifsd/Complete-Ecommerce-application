
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import api from "../api/apiinstance";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
const Login = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setError("");
    try {
      // Connect your login/register API here.

    
        console.log("Login Data:", formData);
        const response = await api.post("/auth/login", formData);
            const token = response.data.token;
            localStorage.setItem("token", token);
      
        const decodetoken = jwtDecode(token);
      // Navigate after successful authentication.
       if (decodetoken.role == "admin")
            {
                navigate("/");

            }
            else
            {
                navigate("/home");

            }
       
            }
     catch (error) {
      console.error("Authentication error:", error);
      setError(response.err || "Incorrect UserName and Password ")
    }
  };

  return (
    <>
    <header className="min-w-screen w-full h-auto z-500">
      <Navbar />
    </header>
    <main>
    <div className="min-h-screen bg-gradient-to-r from-cyan-100 via-teal-100 to-yellow-100 flex flex-col items-center justify-center px-4 py-8">

     

      {/* Login Card */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8 border border-white">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold font-serif text-blue-900">
             Log into Your Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Email
            </label>

            <div className="flex items-center border border-cyan-200 rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-teal-400">
              <Mail size={18} className="text-blue-900" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full p-3 outline-none bg-transparent text-blue-900"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Password
            </label>

            <div className="flex items-center border border-cyan-200 rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-teal-400">
              <LockKeyhole size={18} className="text-blue-900" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full p-3 outline-none bg-transparent text-blue-900"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-blue-900"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-900 font-semibold hover:text-teal-700"
              >
                Forgot Password?
              </Link>
            </div>
           {error && (
            <p className="text-red-600 text-sm font-medium text-center">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-950 to-indigo-700 text-white font-bold py-3 rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-900 transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-blue-900 mt-8">
          New to Stampora? 
           <Link
                        
                        to="/register"
                        className="block w-full p-3 font-bold font-serif">
                        Register Here
                      </Link>

        </p>

      </div>

      <p className="text-sm text-blue-900 mt-6">
        © 2026 Stampora. All Rights Reserved.
      </p>

    </div>
    </main>
    </>
  );
};

export default Login;
