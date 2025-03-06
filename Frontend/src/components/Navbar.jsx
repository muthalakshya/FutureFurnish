import React, { useContext, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { IoLogInSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../content/ShopContext";
import Logo from "../assets/Logo.png";
import { assets } from "../assets copy/assets";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(""); 
  const { toggleCart, getCartCount, token, setToken,setUserType,setCartItems } = useContext(ShopContext);
  const navigate = useNavigate(); 

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setMobileMenuOpen(false); 
  };

  const logout = () => {
    getCartCount(0)
    setCartItems(0)
    localStorage.removeItem("token");
    localStorage.removeItem("predictionData");
    localStorage.removeItem("totalValue");
    localStorage.removeItem("totalOrders");
    localStorage.removeItem("save3d");
    localStorage.removeItem("windowRef");
    localStorage.removeItem("userTypeData");
    setToken("");
    setUserType("");
    navigate("/login");
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setActiveButton("shop");
    } else {
      const active = path.split("/")[1];
      setActiveButton(active);
    }
  }, [location.pathname]);

  return (
    <nav className="bg-[#f1f9eb] w-full fixed z-10 border-b shadow-md">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <img className="w-32" src={Logo} alt="Logo" onClick={()=>navigate("/")} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-bold">
        <Link
              key={"shop"}
              to={`/`}
              onClick={() => handleButtonClick("shop")}
              className={`${
                activeButton === "shop" ? "bg-gray-800 text-white" : "text-black"
              } px-3 py-2 hover:bg-black rounded-lg hover:text-white`}
            >
              {"shop".charAt(0).toUpperCase() + "shop".slice(1)}
            </Link>
          {[ "about", "home-decor", "consultants", "industry"].map((item) => (
            <Link
              key={item}
              to={`/${item}`}
              onClick={() => handleButtonClick(item)}
              className={`${
                activeButton === item ? "bg-gray-800 text-white" : "text-black"
              } px-3 py-2 hover:bg-black rounded-lg hover:text-white`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}

          {!token ? (
            <Link
              to="/login"
              onClick={() => handleButtonClick("login")}
              className={`${
                activeButton === "login" ? "bg-gray-800 text-white" : "text-black"
              } px-3 py-2 hover:bg-black rounded-lg hover:text-white`}
            >
              <IoLogInSharp className="w-full h-7 text-amber-400 px-2 cursor-pointer" />
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <img
                onClick={() => setActiveButton("search")}
                src={assets.search_icon}
                className="w-5 cursor-pointer"
                alt="Search"
              />
              <div className="group relative">
                <img
                  onClick={() => navigate("/profile")}
                  className="w-5 cursor-pointer"
                  src={assets.profile_icon}
                  alt="Profile"
                />
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                    <p className="cursor-pointer hover:text-black" onClick={()=>navigate("/profile")}>My Profile</p>
                    <p onClick={() => navigate("/order-history")} className="cursor-pointer hover:text-black">
                      Orders
                    </p>
                    <p onClick={logout} className="cursor-pointer hover:text-black">
                      Logout
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/cart" className="relative">
                <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
                <p className="absolute top-[12px] right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                  {getCartCount()}
                </p>
              </Link>
              <img
                onClick={toggleMobileMenu}
                src={assets.menu_icon}
                className="w-5 cursor-pointer sm:hidden"
                alt="Menu"
              />
            </div>
          )}
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
        <div className="md:hidden bg-white shadow-md absolute w-full left-0 top-16 z-10">
          <div className="flex flex-col space-y-4 px-4 py-4">
          <Link
                key={"shop"}
                to={`/`}
                onClick={() => handleButtonClick("shop")}
                className={`${
                  activeButton === "shop" ? "bg-gray-800 text-white" : "text-gray-600"
                }  font-medium px-4 py-2 rounded-lg`}
              >
                {"shop".charAt(0).toUpperCase() + "shop".slice(1)}
              </Link>
            {[ "about", "home-decor", "consultants", "industry"].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                onClick={() => handleButtonClick(item)}
                className={`${
                  activeButton === item ? "bg-gray-800 text-white" : "text-gray-600"
                }  font-medium px-4 py-2 rounded-lg`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
            {!token ? (
              <Link
                to="/login"
                onClick={() => handleButtonClick("login")}
                className="text-gray-600  font-medium px-4 py-2 rounded-lg"
              >
                Login
              </Link>
            ) : (
              <>
                <p onClick={() => {navigate("/profile");handleButtonClick("profile")}} 
                className={`${
                  activeButton === "profile" ? "bg-gray-800 text-white" : "text-gray-600"
                }  font-medium px-4 py-2 rounded-lg`}
                >
                  My Profile
                </p>
                <p onClick={() => {navigate("/cart");handleButtonClick("cart")}} 
                className={`${
                  activeButton === "cart" ? "bg-gray-800 text-white" : "text-gray-600"
                }  font-medium px-4 py-2 rounded-lg`}
                >
                  Cart
                </p>
                <p onClick={() => {navigate("/order-history");handleButtonClick("order-history")}} 
                className={`${
                  activeButton === "order-history" ? "bg-gray-800 text-white" : "text-gray-600"
                }  font-medium px-4 py-2 rounded-lg`}
                >
                  Orders
                </p>
                <p onClick={logout} 
                  className="text-gray-600  font-medium px-4 py-2 rounded-lg"
                >
                  Logout
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
