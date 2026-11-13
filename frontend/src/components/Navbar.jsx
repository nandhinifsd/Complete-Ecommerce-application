
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react"; 
import { jwtDecode } from "jwt-decode";

 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Determine the logged-in user's role
  const token = localStorage.getItem("token");

  const decodedToken = token ? jwtDecode(token) : null;

  const role = decodedToken?.role;

  const isAdmin = role === "admin";
  const isUser = role === "user";

  // Set heading dynamically
  const title = isAdmin ? "STAMPORA DASHBOARD" : "STAMPORA";

  // Define navigation links based on role
  const adminLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Customers", path: "/customers" },
    { name: "Orders", path: "/orders" },
  ];

  const userLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "My Orders", path: "/my-orders" },
    { name: "Cart", path: "/cart" }
   
  ];

  const guestLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  // Select links based on role
  const navLinks = isAdmin
    ? adminLinks
    : isUser
    ? userLinks
    : guestLinks;

  // Active link styling
  function getLinkClass(path) {
    const isActive =
      path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(path);

    return isActive
      ? "px-2 py-2 my-2 text-blue-700 border-b-2 border-blue-700"
      : "px-2 py-2 my-2 text-blue-900 hover:text-indigo-600";
  }

  return (
    <nav className="navbar-container flex flex-row w-full h-auto py-2 px-4 bg-gradient-to-r from-cyan-100 via-teal-100 to-yellow-100 justify-between items-center fixed top-0 left-0 z-50">

      {/* Logo and Heading */}
      <div className="heading-container flex flex-row items-center px-2 py-1">
        <img
          className="logo-img"
          src="/icons/logo.png"
          alt="Logo Image"
          width="100px"
          height="50px"
        />

        <h1 className="title-txt hidden lg:flex lg:text-4xl font-serif bg-gradient-to-r from-blue-950 to-indigo-600 bg-clip-text text-transparent py-2 px-1 my-2 mx-3 font-black">
          {title}
        </h1>
      </div>

      {/* Desktop Navigation */}
<div className="link-container hidden md:flex flex-row items-center gap-2 text-xl font-bold font-serif">

  {navLinks.map((link) => (
    <Link
      key={link.path}
      className={getLinkClass(link.path)}
      to={link.path}
    >
      {link.name}
    </Link>
  ))}

  {/* Logout - Only for Admin and Customer */}
  {(isAdmin || isUser) && (
    <Link
      to="/logout"
      className="flex items-center gap-2 px-3 py-2 my-2 text-red-700 hover:text-red-900 hover:bg-red-100 rounded-lg transition"
    >
      <LogOut size={18} />
      Logout
    </Link>
  )}

</div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl bg-transparent p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src="/icons/menu.png"
          alt="Menu"
          height="40px"
          width="40px"
        />
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full md:hidden flex flex-col p-2 bg-gradient-to-r from-cyan-100 via-teal-100 to-yellow-100 shadow-lg">

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block w-full p-3 font-bold font-serif ${getLinkClass(link.path)}`}
            >
              {link.name}
            </Link>
          ))}

          {(isAdmin || isUser) && (
        <Link
                to="/logout"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 p-3 font-bold font-serif text-red-700 hover:bg-red-100 rounded-lg">
        <LogOut size={18} />
        Logout
        </Link>
        )}

        </div>
      )}

    </nav>
  );
};

export default Navbar;
