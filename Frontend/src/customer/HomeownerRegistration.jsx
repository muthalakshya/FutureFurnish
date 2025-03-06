import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../content/ShopContext";

const HomeownerRegistration = () => {
  const {token, setToken, navigate , backendUrl, setRegistrationType,setUserType} = useContext(ShopContext)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    additionalDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const submissionData = {
      userType: "customer", // Specify user type
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      address: {
        streetAddress: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zipCode,
      },
      additionalDetails: formData.additionalDetails,
    };

    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, submissionData);
      
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token);
        setRegistrationType("customer");
        setUserType("customer")
        localStorage.setItem('userTypeData',"customer")
        toast.success("Registration successful!");
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          additionalDetails: "",
        });
        navigate('/customer-dashboard')
      window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/customer-dashboard')
      // window.location.reload();
    }
  },[token])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-24">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-4">
          Homeowner Registration & Onboarding
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Register to get home maintenance & renovation services.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Password and Confirm Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          {/* Address Fields */}
          <div>
            <label className="block font-semibold mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street Address"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          {/* Property Type */}
          {/* <div>
            <label className="block font-semibold mb-2">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Property Type</option>
              {propertyTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div> */}

          {/* Home Size */}
          {/* <div>
            <label className="block font-semibold mb-2">Home Size (sq. ft.)</label>
            <input
              type="number"
              name="homeSize"
              value={formData.homeSize}
              onChange={handleChange}
              placeholder="Enter size in square feet"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div> */}

          {/* Preferred Services */}
          {/* <div>
            <label className="block font-semibold mb-2">Preferred Services</label>
            <div className="grid grid-cols-3 gap-2">
              {serviceOptions.map((option, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.preferredServices.includes(option)}
                    onChange={handleServiceChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div> */}

          {/* Additional Details */}
          <div>
            <label className="block font-semibold mb-2">Additional Details</label>
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              placeholder="Any special requirements?"
              className="w-full border border-gray-300 rounded-md p-2"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeownerRegistration;
