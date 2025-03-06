import React, { useState, useRef, useEffect, useContext } from "react";
import { X, Upload, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import modelData from "../assets/3D_Model.json";
import { toast } from "react-toastify";
import { ShopContext } from "../content/ShopContext";
import axios from "axios";


const Showtableorders = ({d3sides}) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [sides, setSides] = useState(d3sides);
  const {backendUrl,token,userContextData} = useContext(ShopContext)
  const [eml, setEml] = useState("");

  const [activeSide, setActiveSide] = useState("front");
  const fileInputRef = useRef(null);
  const cubeRef = useRef(null);

  // Unified handler for mouse and touch start events
  const handleDragStart = (e) => {
    // Prevent default to stop scrolling/selection during drag
    e.preventDefault();
    
    // Get the correct coordinates based on event type
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    // Only enable dragging when clicking/touching directly on the cube
    if (e.target.closest(".cube-container")) {
      setIsDragging(true);
      setDragStart({
        x: clientX,
        y: clientY
      });
    }
  };

  // Unified handler for mouse and touch move events
  const handleDragMove = (e) => {
    // Prevent default to stop scrolling/selection during drag
    e.preventDefault();

    // Get the correct coordinates based on event type
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    if (isDragging) {
      const deltaX = clientX - dragStart.x; // Track horizontal movement
  
      setRotation((prev) => ({
        x: 0, // Lock X-axis (No up-down rotation)
        y: prev.y + deltaX * 0.5, // Rotate along Y-axis only
      }));
  
      setDragStart({
        x: clientX,
        y: clientY,
      });
    }
  };

  // Unified handler for mouse and touch end events
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners for both mouse and touch events
  useEffect(() => {
    // Mouse events
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    
    // Touch events
    document.addEventListener("touchmove", handleDragMove, { passive: false });
    document.addEventListener("touchend", handleDragEnd);
    document.addEventListener("touchcancel", handleDragEnd);
    
    return () => {
      // Remove mouse events
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      
      // Remove touch events
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
      document.removeEventListener("touchcancel", handleDragEnd);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="flex h-[150px] w-[150px] ">
        <div className="w-full h-24 relative">
            {/* Main design area */}
      <div className="flex-1 flex flex-col  w-full ">
        <div className="relative flex-1 flex  border-red ">
          {/* 3D Design canvas */}
          <div className="flex-1  bg-transparent flex">
            <div className="relative" style={{ perspective: "1800px" }}>
              <div
                ref={cubeRef}
                className="relative pb-24 cube-container" 
                style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotation.y}deg)`, // Only Y-axis rotation applied
                    transition: isDragging ? "none" : "transform 0.5s ease",
                    cursor: isDragging ? "grabbing" : "grab"
                  }}
                  
                // Add both mouse and touch event handlers
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
              >
                {/* ... rest of the cube rendering code remains the same ... */}
                {/* Front face */}
                <div
                  className="absolute w-48 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "front")?.color,
                    transform: `translateY(3rem) translateZ(${5}rem) translateX(3rem)`,
                    width:`4rem`,
                    height:`5rem`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "front")?.image && (
                    <img
                      src={sides.find((s) => s.id === "front")?.image}
                      alt="front"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                </div>

                {/* Back face */}
                <div
                  className="absolute w-64 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "back")?.color,
                    transform: `rotateY(180deg)  translateY(${3}rem) translateZ(${-2}rem) translateX(${-3}rem)`,
                    width:`4rem`,
                    height:`5rem`,
                    // backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "back")?.image && (
                    <img
                      src={sides.find((s) => s.id === "back")?.image}
                      alt="back"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Back
                    </span> */}
                  </div>
                </div>

                {/* Left face */}
                <div
                  className="absolute w-8 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "left")?.color,
                    // transform: "translateX(3rem) rotateY(-90deg)",
                    transform: `rotateY(-90deg)  translateY(${3}rem) translateZ(${-3}rem) translateX(${2}rem)`,
                    width:`3rem`,
                    height:`5rem`,
                    transformOrigin: "left center",
                    // backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "left")?.image && (
                    <img
                      src={sides.find((s) => s.id === "left")?.image}
                      alt="left"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Left
                    </span> */}
                  </div>
                </div>

                {/* Right face */}
                <div
                  className="absolute w-64 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "right")?.color,
                    // transform: "translateX(6rem) rotateY(90deg)",
                    transform: `rotateY(90deg)  translateY(${3}rem) translateZ(${4}rem) translateX(${-2}rem)`,
                    width:`3rem`,
                    height:`5rem`,
                    transformOrigin: "right center",
                    // backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "right")?.image && (
                    <img
                      src={sides.find((s) => s.id === "right")?.image}
                      alt="right"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Right
                    </span> */}
                  </div>
                </div>

                {/* Top face */}
                <div
                  className="absolute w-64 h-32 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "top")?.color,
                    // transform: "translateY(-0rem) rotateX(90deg)",
                    transform: `rotateX(90deg) rotateZ(360deg)   translateY(${4}rem) translateZ(${-3}rem) translateX(${0}rem)`,
                    width:`4rem`,
                    height:`3rem`,
                    transformOrigin: "center top",
                    // backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "top")?.image && (
                    <img
                      src={sides.find((s) => s.id === "top")?.image}
                      alt="top"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Top
                    </span> */}
                  </div>
                </div>

                {/* Bottom face */}
                <div
                  className="absolute w-64 h-32 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "bottom")
                      ?.color,
                    // transform: "translateY(12rem) rotateX(-90deg)",
                    transform: `rotateX(-90deg) rotateZ(-360deg)  translateY(-2rem) translateZ(${5}rem) translateX(3rem)`,
                    width:`4rem`,
                    height:`3rem`,
                    transformOrigin: "center bottom",
                    // backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "bottom")?.image && (
                    <img
                      src={sides.find((s) => s.id === "bottom")?.image}
                      alt="bottom"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Bottom
                    </span> */}
                  </div>
                </div>

                {/* top back */}
                <div
                  className="absolute w-64 h-2 border-2 rounded-4xl"
                  style={{
                    // transform:
                    //   "rotateX(0deg) rotateY(180deg) translateZ(-0rem) translateY(-8.5rem) translateX(3rem)",
                    // height: "9rem",
                    // width: "16rem",
                    transform: `rotateX(0deg) rotateY(180deg) rotateZ(360deg)   translateY(0.5rem) translateZ(-2rem) translateX(-3rem)`,
                    width:`4rem`,
                    height:`3rem`,
                    borderTop: `0.4rem solid ${
                      sides.find((s) => s.id === "topback")?.color
                    }`,
                    borderLeft: `0.4rem solid ${
                      sides.find((s) => s.id === "topback")?.color
                    }`,
                    borderRight: `0.4rem solid ${
                      sides.find((s) => s.id === "topback")?.color
                    }`,
                    borderBottom: `0.4rem solid transparent`,
                    transformOrigin: "center top",
                    borderRadius: "50% 50% 50% 0 / 100% 100% 0 0",
                    perspective: "800px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* {sides.find((s) => s.id === "topback")?.image && (
                    <img
                      src={sides.find((s) => s.id === "topback")?.image?.url}
                      alt="topback"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-t-full"
                      style={{ borderRadius: "50% 50% 50% 0 / 100% 100% 0 0" }}
                    />
                  )} */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Top Back
                    </span> */}
                  </div>
                </div>

                {/* top front     */}
                <div
                  className="absolute w-64 h-2 border-2 rounded-4xl"
                  style={{
                    // transform:
                    //   "rotateX(0deg) rotateY(0deg) translateZ(6rem) translateY(-8.5rem) translateX(3rem)",
                    // height: "9rem",
                    // width: "16rem",
                    transform: `rotateX(0deg) rotateY(360deg) rotateZ(360deg)   translateY(0.5rem) translateZ(5rem) translateX(3rem)`,
                    width:`4rem`,
                    height:`3rem`,
                    borderTop: `0.4rem solid ${
                      sides.find((s) => s.id === "topfront")?.color
                    }`,
                    borderLeft: `0.4rem solid ${
                      sides.find((s) => s.id === "topfront")?.color
                    }`,
                    borderRight: `0.4rem solid ${
                      sides.find((s) => s.id === "topfront")?.color
                    }`,
                    borderBottom: `0.4rem solid transparent`,
                    transformOrigin: "center top",
                    borderRadius: "50% 50% 50% 0 / 100% 100% 0 0",
                    perspective: "800px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* {sides.find((s) => s.id === "topfront")?.image && (
                    <img
                      src={sides.find((s) => s.id === "topfront")?.image?.url}
                      alt="topfront"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-t-full"
                      style={{ borderRadius: "50% 50% 50% 0 / 100% 100% 0 0" }}
                    />
                  )} */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Top Front
                    </span> */}
                  </div>
                </div>

                {/* Rest of the cube faces... (kept the same as in the original code) */}
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>
  );
};

export default Showtableorders;