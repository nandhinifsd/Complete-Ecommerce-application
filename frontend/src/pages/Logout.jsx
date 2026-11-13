
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Home, ArrowLeft } from "lucide-react";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication data.
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-100 via-teal-100 to-yellow-100 flex flex-col items-center justify-center px-4">

      

        

      {/* Logout Card */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-md p-8 text-center border border-white">

        <div className="flex justify-center mb-5">
          <div className="bg-cyan-100 p-5 rounded-full">
            <LogOut size={42} className="text-blue-900" />
          </div>
        </div>

        <h2 className="text-2xl font-bold font-serif text-blue-900 mb-3">
          Leaving Stampora?
        </h2>

        <p className="text-blue-900 text-sm leading-6 mb-8">
          Are you sure you want to log out of your account?
          Your favourite stamps will be waiting for you when you return!
        </p>

        <div className="flex flex-col gap-3">

          <button
            onClick={handleLogout}
            className="w-full flex justify-center items-center gap-2 bg-blue-950 text-white font-bold py-3 rounded-lg hover:bg-indigo-800 transition duration-300"
          >
            <LogOut size={18} />
            Yes, Logout
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full flex justify-center items-center gap-2 border-2 border-blue-900 text-blue-900 font-bold py-3 rounded-lg hover:bg-cyan-100 transition duration-300"
          >
            <Home size={18} />
            Back to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-900 hover:text-indigo-700 flex justify-center items-center gap-1 mt-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

        </div>
      </div>

      <p className="text-sm text-blue-900 mt-8">
        Thank you for choosing Stampora!
      </p>

    </div>
  );
};

export default Logout;