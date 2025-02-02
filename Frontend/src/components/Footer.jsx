import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaPinterest, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    { title: "ONLINE SHOP", items: ["Bed", "Bath", "Ready Made Curtains", "Cushions", "Gifting", "Home Decor Accessories", "Offers"] },
    { title: "DISCOVER", items: ["Curtains", "Upholstery", "Blinds", "Wallpaper", "Sunbrella"] },
    { title: "CORPORATE", items: ["About Us", "Leadership", "Milestones", "Style Expert", "Blog", "Store Locator", "Media", "Legal Policy", "Careers", "News & Events", "Franchise Enquiry", "Sustainability"] },
    { title: "CUSTOMER SERVICE", items: ["FAQs", "Exchange Policy", "Store Locator", "Track My Order", "Privacy Policy", "Cancellation Policy", "Sitemap"] },
    { title: "GET IN TOUCH", items: ["Live Chat", "Whatsapp Chat", "Leave Us a Feedback", "Request an Appointment"], extraContent: "CALL US\n1800 267 9008 (TOLL FREE)" },
    { title: "ABOUT", items: ["Company Info", "Sustainability", "Press Releases"] },
  ];

  return (
    <footer className="bg-[#b5a892] text-white py-8 px-8">
      <div className="container mx-auto">
        {/* Sections */}
        {sections.map((section, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              className="w-full text-left py-4 flex justify-between items-center"
              onClick={() => toggleSection(section.title)}
            >
              <span className="font-bold">{section.title}</span>
              <span>{openSections[section.title] ? "-" : "+"}</span>
            </button>
            {openSections[section.title] && (
              <ul className="space-y-2 pl-4 text-sm">
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
                {section.extraContent && <p className="mt-4">{section.extraContent}</p>}
              </ul>
            )}
          </div>
        ))}

        {/* Subscribe Section */}
        <div className="mt-8">
          <button
            className="w-full text-left py-4 flex justify-between items-center border-b border-gray-300"
            onClick={() => toggleSection("SUBSCRIBE")}
          >
            <span className="font-bold">SUBSCRIBE TO OUR LATEST EMAILERS</span>
            <span>{openSections["SUBSCRIBE"] ? "-" : "+"}</span>
          </button>
          {openSections["SUBSCRIBE"] && (
            <div className="flex flex-col space-y-4 mt-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2 rounded-md text-black"
              />
              <button className="bg-black text-white px-6 py-2 rounded-md self-start">JOIN</button>
            </div>
          )}
        </div>

        {/* Social Media */}
        <div className="flex justify-between items-center mt-8 text-sm">
          <p>COPYRIGHT 2025 D'DECOR</p>
          <div className="flex space-x-4">
            <FaFacebook />
            <FaInstagram />
            <FaPinterest />
            <FaYoutube />
            <FaLinkedin />
          </div>
        </div>

        {/* Help Button */}
        {/* <div className="fixed bottom-4 right-4 bg-gray-800 text-white rounded-full px-4 py-2 flex items-center">
          <span className="mr-2">?</span> Help
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
