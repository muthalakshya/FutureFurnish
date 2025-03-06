import React, { useState, useRef, useEffect, useContext } from "react";
import { X, Upload, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import modelData from "../assets/3D_Model.json";
import { toast } from "react-toastify";
import { ShopContext } from "../content/ShopContext";
import axios from "axios";


const ShowModelonorders = ({d3sides}) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [sides, setSides] = useState( d3sides);
  const {backendUrl,token,userContextData} = useContext(ShopContext)
  const [eml, setEml] = useState("");
  const [activeSide, setActiveSide] = useState("front");
  const fileInputRef = useRef(null);
  const cubeRef = useRef(null);

  // Handle mouse rotation for the cube
  const handleMouseDown = (e) => {
    // Only enable dragging when clicking directly on the cube
    if (e.target.closest(".cube-container")) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x; // Track horizontal movement
  
      setRotation((prev) => ({
        x: 0, // Lock X-axis (No up-down rotation)
        y: prev.y + deltaX * 0.5, // Rotate along Y-axis only
      }));
  
      setDragStart({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    if (e.target.closest(".cube-container")) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      e.preventDefault(); // Prevent scrolling while rotating
      const deltaX = e.touches[0].clientX - dragStart.x;

      setRotation((prev) => ({
        x: 0, // Lock X-axis (No up-down rotation)
        y: prev.y + deltaX * 0.5, // Rotate along Y-axis only
      }));

      setDragStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragStart]);


  return (
    <div className="flex h-[100px] w-[150px] pt-2">
        <div className="w-full h-24 relative">
            {/* Main design area */}
      <div className="flex-1 flex flex-col w-full">
        <div className="relative flex-1 flex border-red pl-0">
          {/* 3D Design canvas */}
          <div className="flex-1 bg-transparent flex px-10  justify-center items-center">
            <div className="relative" style={{ perspective: "2000px" }}>
              <div
                ref={cubeRef}
                className="relative pb-24 cube-container"
                style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotation.y}deg)`, // Only Y-axis rotation applied
                    transition: isDragging ? "none" : "transform 0.5s ease",
                    cursor: isDragging ? "grabbing" : "grab"
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                {/* Front face */}
                <div
                  className="absolute w-48 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "front")?.color,
                    transform: `translateY(${0}rem) translateZ(${6}rem) translateX(-4rem)`,
                    width:`8rem`,
                    height:`1rem`,
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
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  </div>
                </div>

                {/* Back face */}
                <div
                  className="absolute w-64 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "back")?.color,
                    transform: `rotateY(180deg)  translateY(${0}rem) translateZ(${0}rem) translateX(${4}rem)`,
                    width:`8rem`,
                    height:`1rem`,
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
                  </div>
                </div>

                {/* Left face */}
                <div
                  className="absolute w-8 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "left")?.color,
                    transform: `rotateY(-90deg)  translateY(${0}rem) translateZ(${4}rem) translateX(${0}rem)`,
                    width:`6rem`,
                    height:`1rem`,
                    transformOrigin: "left center",
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
                  </div>
                </div>

                {/* Right face */}
                <div
                  className="absolute w-64 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "right")?.color,
                    transform: `rotateY(90deg)  translateY(${0}rem) translateZ(${-2}rem) translateX(${0}rem)`,
                    width:`6rem`,
                    height:`1rem`,
                    transformOrigin: "right center",
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
                  </div>
                </div>

                {/* Top face */}
                <div
                  className="absolute w-64 h-32 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "top")?.color,
                    transform: `rotateX(90deg) rotateZ(360deg)   translateY(0rem) translateZ(0rem) translateX(-4rem)`,
                    width:`4rem`,
                    height:`6rem`,
                    transformOrigin: "center top",
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
                  </div>
                </div>

                {/* Bottom face */}
                <div
                  className="absolute w-64 h-32 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "bottom")?.color,
                    transform: `rotateX(-90deg) rotateZ(-360deg)  translateY(0rem) translateZ(-5rem) translateX(-4rem)`,
                    width:`4rem`,
                    height:`6rem`,
                    transformOrigin: "center bottom",
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
                  </div>
                </div>

                {/* fl */}
                <div
                  className="absolute w-8 h-64 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "fl")?.color,
                    transform: `translateY(${0}rem) translateZ(${5.99}rem) translateX(${-4}rem)`,
                    width:`1rem`,
                    height:`4rem`,
                  }}
                >
                  {sides.find((s) => s.id === "fl")?.image && (
                    <img
                      src={sides.find((s) => s.id === "fl")?.image}
                      alt="fl"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                </div>
                
                {/* fr */}
                <div
                  className="absolute w-8 h-64 border-2 border-slate-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "fr")?.color,
                    transform: `translateY(0rem) translateZ(5.99rem) translateX(3rem)`,
                    width:`1rem`,
                    height:`4rem`,
                  }}
                >
                  {sides.find((s) => s.id === "fr")?.image && (
                    <img
                      src={sides.find((s) => s.id === "fr")?.image}
                      alt="fr"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                </div>
                
                {/* br */}
                <div
                  className="absolute w-8 h-64 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "br")?.color,
                    transform: `translateY(0rem) translateZ(0rem) translateX(-4rem)`,
                    width:`1rem`,
                    height:`4rem`,
                  }}
                >
                  {sides.find((s) => s.id === "br")?.image && (
                    <img
                      src={sides.find((s) => s.id === "br")?.image}
                      alt="br"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  </div>
                </div>

                {/* bl */}
                <div
                  className="absolute w-8 h-64 border-2 border-slate-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "bl")?.color,
                    transform: `translateY(0rem) translateZ(0rem) translateX(3rem)`,
                    width:`1rem`,
                    height:`4rem`,
                  }}
                >
                  {sides.find((s) => s.id === "bl")?.image && (
                    <img
                      src={sides.find((s) => s.id === "bl")?.image}
                      alt="bl"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  </div>
                </div>

                {/* ll */}
                <div
                  className="absolute w-4 h-64 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "ll")?.color,
                    transform: `rotateY(-90deg) translateY(0rem) translateZ(4rem) translateX(0rem)`,
                    width:`1rem`,
                    height:`4rem`,
                    transformOrigin: "left center",
                  }}
                >
                  {sides.find((s) => s.id === "ll")?.image && (
                    <img
                      src={sides.find((s) => s.id === "ll")?.image}
                      alt="ll"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                </div>
                
                {/* lr */}
                <div
                  className="absolute w-4 h-64 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "lr")?.color,
                    transform: `rotateY(-90deg) translateY(0rem) translateZ(3.99rem) translateX(4.99rem)`,
                    width:`1rem`,
                    height:`4rem`,
                    transformOrigin: "left center",
                  }}
                >
                  {sides.find((s) => s.id === "lr")?.image && (
                    <img
                      src={sides.find((s) => s.id === "lr")?.image}
                      alt="lr"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                </div>

                {/* rr */}
                <div
                  className="absolute w-4 h-64 border-2 border-slate-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "rr")?.color,
                    transform: ` rotateY(-270deg) translateY(0rem) translateZ(4rem) translateX(-1rem)`,
                    width:`1rem`,
                    height:`4rem`,
                    transformOrigin: "left center",
                  }}
                >
                  {sides.find((s) => s.id === "rr")?.image && (
                    <img
                      src={sides.find((s) => s.id === "rr")?.image}
                      alt="rr"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                </div>

                {/* rl */}
                <div
                  className="absolute w-4 h-64 border-2 border-slate-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "rl")?.color,
                    transform: ` rotateY(-270deg) translateY(0rem) translateZ(4rem) translateX(-6rem)`,
                    width:`1rem`,
                    height:`4rem`,
                    transformOrigin: "left center",
                  }}
                >
                  {sides.find((s) => s.id === "rl")?.image && (
                    <img
                      src={sides.find((s) => s.id === "rl")?.image}
                      alt="rl"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ShowModelonorders;