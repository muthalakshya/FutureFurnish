import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../content/ShopContext";

const IndustryForm = () => {
  const {token, setToken, navigate , backendUrl, setRegistrationType,setUserType} = useContext(ShopContext)

  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    businessType: "",
    others: "",
    message: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Save to local storage
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const submissionData = {
      userType: "industry", // Specify user type
      fullName: formData.fullName,
      businessName: formData.businessName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      businessType: formData.businessType,
      addressDetails: {
        streetAddress: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zipCode,
      },
      message: formData.additionalDetails,
    };
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, submissionData);
      
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('userTypeData',"industry")
        setUserType("industry")
        toast.success("Registration successful!");
        setFormData({
          fullName: "",
          businessName: "",
          phoneNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zipCode: "",
          businessType: "",
          others: "",
          message: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
    localStorage.setItem("registrationData", JSON.stringify(submissionData));
  };

  useEffect(()=>{
    if(token){
      navigate("/industry-dashboard")
    }
  },[token])

  return (
    <div className="min-h-screen flex py-24 items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center mb-4">
          Register Your Business
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Please provide all required details to register your business with us.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Business Owner */}
          <div>
            <label className="block font-semibold mb-2">
              Business Owner <span className="text-red-500">*</span>
            </label>

            <div>
            {/* <label className="block font-semibold mb-2">Full Name</label> */}
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
          </div>
          

          {/* Business Name */}
          <div>
            <label className="block font-semibold mb-2">
              Business Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter your business name"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Contact Number */}
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

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ex: myname@example.com"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
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
              <label className="block font-semibold mb-2">
                Confirm Password
              </label>
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
          {/* Address */}
          <div>
            <label className="block font-semibold mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              placeholder="Street Address"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
              required
            />
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Street Address Line 2"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-1/2 border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State / Province"
                className="w-1/2 border border-gray-300 rounded-md p-2"
              />
            </div>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Postal / Zip Code"
              className="w-full border border-gray-300 rounded-md p-2 mt-2"
            />
          </div>

          {/* Type of Business */}
          <div>
            <label className="block font-semibold mb-2">
              Type of Business <span className="text-red-500">*</span>
            </label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="" disabled>
                Please Select
              </option>
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="services">Services</option>
            </select>
          </div>

          {/* Others */}
          <div>
            <label className="block font-semibold mb-2">
              Others <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="others"
              value={formData.others}
              onChange={handleChange}
              placeholder="Enter other details"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter any additional information"
              className="w-full border border-gray-300 rounded-md p-2"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndustryForm;
