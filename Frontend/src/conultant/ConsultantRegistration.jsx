import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../content/ShopContext";

const ConsultantRegistration = () => {
  const {token, setToken, navigate , backendUrl, setRegistrationType} = useContext(ShopContext)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    expertise: [],
    yearsOfExperience: "",
    linkedInProfile: "",
    introduction: "",
    resume: null,
  });

  const [expertiseOptions] = useState([
    "Software Development",
    "Data Science",
    "AI/ML",
    "Cybersecurity",
    "Project Management",
    "Business Analysis",
    "Marketing Strategy",
    "Finance and Accounting",
    "Legal Advisory",
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExpertiseChange = (e) => {
    const { value, checked } = e.target;
    const updatedExpertise = checked
      ? [...formData.expertise, value]
      : formData.expertise.filter((expertise) => expertise !== value);
    setFormData({ ...formData, expertise: updatedExpertise });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
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
      introduction: formData.introduction,
    };

    // const submissionData = new FormData();
    // submissionData.append("userType", "consultant");
    // submissionData.append("fullName", formData.fullName);
    // submissionData.append("email", formData.email);
    // submissionData.append("phoneNumber", formData.phoneNumber);
    // submissionData.append("password", formData.password);
    // submissionData.append("expertise", JSON.stringify(formData.expertise));
    // submissionData.append("yearsOfExperience", formData.yearsOfExperience);
    // submissionData.append("linkedInProfile", formData.linkedInProfile);
    // submissionData.append("introduction", formData.introduction);
    if (formData.linkedInProfile) {
      submissionData["linkedInProfile"]= formData.linkedInProfile;
    }
    if (formData.resume) {
      submissionData["resume"]= formData.resume;
    }
    if (formData.yearsOfExperience) {
      submissionData["yearsOfExperience"]= Number(formData.yearsOfExperience);
    }

    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, submissionData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Registration successful!");
        setToken(response.data.token)
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          expertise: [],
          yearsOfExperience: "",
          linkedInProfile: "",
          introduction: "",
          resume: null,
        });
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
      navigate("/consultant-dashboard");
    }
  },[token])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-24">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-4">
          Consultant Registration & Onboarding
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Join our network of professionals.
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

          {/* Expertise */}
          <div>
            <label className="block font-semibold mb-2">Areas of Expertise</label>
            <div className="grid grid-cols-3 gap-2">
              {expertiseOptions.map((option, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.expertise.includes(option)}
                    onChange={handleExpertiseChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block font-semibold mb-2">Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              placeholder="Enter your experience in years"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label className="block font-semibold mb-2">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedInProfile"
              value={formData.linkedInProfile}
              onChange={handleChange}
              placeholder="Enter your LinkedIn profile URL"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Introduction */}
          <div>
            <label className="block font-semibold mb-2">Introduction</label>
            <textarea
              name="introduction"
              value={formData.introduction}
              onChange={handleChange}
              placeholder="Briefly introduce yourself"
              className="w-full border border-gray-300 rounded-md p-2"
              rows="4"
            ></textarea>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block font-semibold mb-2">Upload Resume</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2"
              accept=".pdf,.doc,.docx"
            />
            {formData.resume && (
              <p className="text-green-600 mt-2">
                {formData.resume.name} selected.
              </p>
            )}
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

export default ConsultantRegistration;
