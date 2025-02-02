import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { IoLogInSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ShopContext } from "../content/ShopContext";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(""); // Track which button is active
  const { toggleCart } = useContext(ShopContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <nav className="bg-white w-full fixed z-10 border-b shadow-md">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="w-32"
            src={Logo}
            // src="https://cdn.ddecor.com/static/version1737628305/frontend/Ddecor/nextgen/en_US/images/logo.svg"
            alt="Logo"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-bold">
          <Link
            to="/"
            onClick={() => handleButtonClick("shop")}
            className={`${
              activeButton === "shop"
                ? "bg-gray-800 text-white"
                : "text-black"
            } px-3 py-2 hover:bg-black rounded-lg hover:text-white`}
          >
            Shop
          </Link>
          <Link
            to="/about"
            onClick={() => handleButtonClick("about")}
            className={`${
              activeButton === "about"
                ? "bg-gray-800 text-white"
                : "text-black"
            } px-3 py-2 hover:bg-black rounded-lg hover:text-white`}
          >
            About
          </Link>
          <Link
            to="/home-decor"
            onClick={() => handleButtonClick("home-decor")}
            className={`${
              activeButton === "home-decor"
                ? "bg-gray-800 text-white"
                : "text-black"
            } px-3 py-2 hover:bg-black rounded-lg hover:text-white`}
          >
            Home Decor
          </Link>
          <Link
            to="/consultants"
            onClick={() => handleButtonClick("consultants")}
            className={`${
              activeButton === "consultants"
                ? "bg-gray-800 text-white"
                : "text-black"
            } px-3 py-2 hover:bg-black rounded-lg hover:text-white`}
          >
            Consultants
          </Link>
          <Link
            to="/industry"
            onClick={() => handleButtonClick("industry")}
            className={`${
              activeButton === "industry"
                ? "bg-gray-800 text-white"
                : "text-black"
            } px-3 py-2 hover:bg-black rounded-lg hover:text-white`}
          >
            Industry
          </Link>
          <Link to={"/cart"} 
            onClick={() => {handleButtonClick("cart"); toggleCart}}
            className={`${
              activeButton === "cart"
                ? "bg-gray-800 text-white"
                : "text-black"
            } px-3 py-2 hover:bg-black rounded-lg hover:text-white`}>
            <FaShoppingCart className="w-full h-7 text-amber-400 px-2 cursor-pointer" />
          </Link>
            <Link to="/login" 
              onClick={() => handleButtonClick("login")}
              className={`${
                activeButton === "login"
                  ? "bg-gray-800 text-white"
                  : "text-black"
              } px-3 py-2 hover:bg-black rounded-lg hover:text-white`}
            >
              <IoLogInSharp className="w-full h-7 text-amber-400 px-2 cursor-pointer" />
            </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white  shadow-md">
          <div className="flex justify-between px-8 py-4">
            <div className="py-2" onClick={toggleCart}>
              
              <Link to="/cart" onClick={toggleMobileMenu}>
                <FaShoppingCart className="w-8 h-8 text-black cursor-pointer" />
              </Link>
            </div>
            <div className="py-2">
              <Link to="/login" onClick={toggleMobileMenu}>
                <IoLogInSharp className="w-8 h-8 text-black cursor-pointer" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-4 px-4 py-4" onClick={toggleMobileMenu}>
            <Link
              to="/"
              onClick={() => handleButtonClick("shop")}
              className={`${
                activeButton === "shop"
                  ? "bg-gray-800 text-white"
                  : "text-gray-600"
              } hover:text-gray-800 font-medium px-4 py-2 rounded-lg`}
            >
              Shop
            </Link>
            <Link
              to="/about"
              onClick={() => handleButtonClick("about")}
              className={`${
                activeButton === "about"
                  ? "bg-gray-800 text-white"
                  : "text-gray-600"
              } hover:text-gray-800 font-medium px-4 py-2 rounded-lg`}
            >
              About
            </Link>
            <Link
              to="/home-decor"
              onClick={() => handleButtonClick("home-decor")}
              className={`${
                activeButton === "home-decor"
                  ? "bg-gray-800 text-white"
                  : "text-gray-600"
              } hover:text-gray-800 font-medium px-4 py-2 rounded-lg`}
            >
              Home Decor
            </Link>
            <Link
              to="/consultants"
              onClick={() => handleButtonClick("consultants")}
              className={`${
                activeButton === "consultants"
                  ? "bg-gray-800 text-white"
                  : "text-gray-600"
              } hover:text-gray-800 font-medium px-4 py-2 rounded-lg`}
            >
              Consultants
            </Link>
            <Link
              to="/industry"
              onClick={() => handleButtonClick("industry")}
              className={`${
                activeButton === "industry"
                  ? "bg-gray-800 text-white"
                  : "text-gray-600"
              } hover:text-gray-800 font-medium px-4 py-2 rounded-lg`}
            >
              Industry
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
