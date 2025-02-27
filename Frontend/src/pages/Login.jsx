import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ShopContext } from "../content/ShopContext";

const Login = () => {
  
  const [currentState, setCurrentState] = useState("Login"); // Track current state (Login or Sign Up)
  const {token, setToken, navigate , backendUrl, setRegistrationType,setUserType,userType} = useContext(ShopContext)
  
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (currentState === "Login") {
        const response = await axios.post(backendUrl+"/api/user/login",{email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('userTypeData',response.data.userTypeData)
          setUserType(response.data.userTypeData)
          // navigate(`/${localStorage.getItem("userTypeData")}-dashboard`)
        }else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(()=>{
    if(token){
      setUserType(localStorage.getItem("userTypeData"))
      navigate(`/${localStorage.getItem("userTypeData")}-dashboard`)
          console.log(userType)
    }
  },[token])

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-42 lg:px-8">
      {/* Registration Type Selector */}
      {currentState === "Sign Up"  && (
        <div className="flex flex-col items-center gap-4 text-gray-700">
          <h2 className="text-2xl font-bold">Choose Registration Type</h2>
          {/* <div className="sm:flex gap-4">
            <button
              onClick={() => setRegistrationType("Home Decor")}
              className="bg-blue-500 text-white sm:px-16 sm:py-20 text-3xl rounded-md"
            >
              Home Decor
            </button>
            <button
              onClick={() => setRegistrationType("Industry")}
              className="bg-green-500 text-white sm:px-16 sm:py-20 text-3xl rounded-md"
            >
              Industry
            </button>
            <button
              onClick={() => setRegistrationType("Consultant")}
              className="bg-yellow-500 text-white sm:px-16 sm:py-20 text-3xl rounded-md"
            >
              Consultant
            </button>
          </div> */}
          <div className="flex sm:flex-row flex-col gap-4">
            <Link to="/homeowner-registration"
              onClick={() => {setRegistrationType("Home Decor");}}
              className="bg-blue-500 text-white px-16 py-12 text-2xl rounded-md"
            >
              Home Decor
            </Link>
            
            <Link to="/consultant-registration"
              onClick={() => setRegistrationType("Consultant")}
              className="bg-yellow-500 text-white px-16 py-12 text-2xl rounded-md"
            >
              Consultant
            </Link>
            <Link to="/industry"
              onClick={() => setRegistrationType("Industry")}
              className="bg-green-500 text-white px-16 py-12 text-2xl rounded-md"
            >
              Industry
            </Link>
          </div>
        </div>
      )}

      {/* Login/Registration Form */}
      { currentState === "Login" ? (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-700"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">{currentState}</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          {/* Name field for Sign Up */}
          {/* {currentState === "Sign Up" && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Name"
              required
            />
          )} */}

          {/* Input fields common to both Login and Sign Up */}
          {/* <input
            onChange={(e) => setMobileNo(e.target.value)}
            value={mobileNo}
            type="number"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Mobile No."
            required
          /> */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Password"
            required
          />

          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer">Forgot your password?</p>
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => {
                  setCurrentState("Login");
                  setRegistrationType(""); // Reset registration type
                }}
                className="cursor-pointer"
              >
                Login
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white font-light px-8 py-2 mt-8"
          >
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default Login;
