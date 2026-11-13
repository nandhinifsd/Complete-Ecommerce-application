
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  LockKeyhole,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "../api/apiinstance";
import Navbar from "../components/Navbar";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role:""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const { confirmPassword,...userData } = formData;

      // Connect your backend registration API here.
      console.log("Registration Details:", userData);

    
     const response = await api.post("/auth/register",userData);

      // After successful registration:
     navigate("/login");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
     <>
        <header className="min-w-screen w-full h-auto z-500">
          <Navbar />
        </header>
        <main>
    <div className="min-h-screen bg-gradient-to-r from-cyan-100 via-teal-100 to-yellow-100 flex flex-col items-center justify-center px-4 py-8">

      

      {/* Registration Card */}
      <div className="bg-white/85 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-lg p-6 sm:p-8 border border-white mt-18">

        <div className="text-center mb-6">

          <h2 className="text-2xl font-bold font-serif text-blue-900">
            Create Your Account
          </h2>

          <p className="text-sm text-blue-900 mt-2">
            Join Stampora and discover personalized stamps!
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Full Name
            </label>

            <div className="flex items-center border border-cyan-200 rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-teal-400">

              <User size={18} className="text-blue-900" />

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                autoComplete="name"
                className="w-full p-3 outline-none bg-transparent text-blue-900"
              />

            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Email Address
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
                autoComplete="email"
                className="w-full p-3 outline-none bg-transparent text-blue-900"
              />

            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Phone Number
            </label>

            <div className="flex items-center border border-cyan-200 rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-teal-400">

              <Phone size={18} className="text-blue-900" />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                autoComplete="tel"
                pattern="[0-9]{10}"
                maxLength={10}
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
                placeholder="Create a password"
                required
                minLength={8}
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">
              Confirm Password
            </label>

            <div className="flex items-center border border-cyan-200 rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-teal-400">

              <LockKeyhole size={18} className="text-blue-900" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                className="w-full p-3 outline-none bg-transparent text-blue-900"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="text-blue-900"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>
          </div>

          {/*Role */}

           <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2" 
                htmlFor="role">
                  Role
                </label>
                <div className="flex items-center border border-cyan-200 rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-teal-400">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-3 outline-none bg-white text-blue-900"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                </div>
              </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-sm font-medium text-center">
              {error}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-950 to-indigo-700 text-white font-bold py-3 rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-900 transition duration-300"
          >
            Create My Account
          </button>

        </form>

        {/* Login Navigation */}
        <div className="text-center mt-6">

          <p className="text-sm text-blue-900">
            Already have an account?

            <Link
              to="/login"
              className="ml-1 font-bold text-indigo-700 hover:text-teal-700"
            >
              Login Here
            </Link>
          </p>

        </div>

      </div>

      <p className="text-sm text-blue-900 mt-6">
        © 2026 Stampora. All Rights Reserved.
      </p>

    </div>
    </main>
    </>
  );
};

export default Register;
