import React, { useState, useRef, useEffect, useContext } from "react";
import { X, Upload, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import modelData from "../assets/3D_Model.json";
import { toast } from "react-toastify";
import { ShopContext } from "../content/ShopContext";
import axios from "axios";


const ShowTableModel = ({d3sides}) => {
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
    <div className="flex h-[300px] w-[300px] pt-16">
        <div className="w-full h-24 relative">
            {/* Main design area */}
      <div className="flex-1 flex flex-col w-full">
        <div className="relative flex-1 flex border-red pl-0">
          {/* 3D Design canvas */}
          <div className="flex-1 bg-transparent flex px-10 pt-24 justify-center items-center">
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

export default ShowTableModel;

// import React, { useState, useRef, useEffect, useContext } from "react";
// import { X, Upload, RotateCcw, Plus, Trash2 } from "lucide-react";
// import { useNavigate } from 'react-router-dom';
// import modelData from "../assets/3D_Model.json";
// import { toast } from "react-toastify";
// import { ShopContext } from "../content/ShopContext";
// import axios from "axios";


// const ShowTableModel = ({d3sides}) => {
//   // console.log(d3sides,"fff")
//   const navigate = useNavigate();
//   const [images, setImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [rotation, setRotation] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
// //   const [sides, setSides] = useState(d3sides);
//   const [sides, setSides] = useState( [{ id: "front", name: "Front Side", color: "#d4b895", image: null, width:"27",height:"2", up:"0",right:"0", forward:"14"  },
//   { id: "back", name: "Back Side", color: "#d4b895", image: null , width:"27",height:"2", up:"0",right:"0", forward:"0"   },
//   { id: "left", name: "Left Side", color: "#d4b895", image: null , width:"14",height:"2", up:"0",right:"0", forward:"0"   },
//   { id: "right", name: "Right Side", color: "#d4b895", image: null , width:"14",height:"2", up:"0",right:"0", forward:"13"   },
//   { id: "top", name: "Top Side", color: "#d4b895", image: null , width:"27",height:"2", up:"0",right:"0", forward:"14"   },
//   { id: "bottom", name: "Bottom Side", color: "#d4b895", image: null , width:"27",height:"2", up:"0",right:"0", forward:"14"   },
//   { id: "topfront", name: "Top Front Side", color: "#d4b895", image: null , width:"27",height:"2", up:"0",right:"0", forward:"14"   },
//   { id: "topback", name: "Top Back Side", color: "#d4b895", image: null , width:"27",height:"2", up:"0",right:"0", forward:"14"   },
//   { id: "fr", name: "Front off Right Side", color: "#d4b895", image: null , width:"2",height:"15", up:"0",right:"25", forward:"13.9"   },
//   { id: "br", name: "Back off Right Side", color: "#d4b895", image: null , width:"2",height:"15", up:"0",right:"0", forward:"0"   },
//   { id: "rr", name: "Right off Right Side", color: "#d4b895", image: null , width:"2",height:"15", up:"0",right:"-2", forward:"27"   },
//   { id: "lr", name: "Left off Right Side", color: "#d4b895", image: null , width:"2",height:"15", up:"0",right:"12", forward:"0"   },
//   { id: "fl", name: "Front off Left Side", color: "#d4b895", image: null , width:"2",height:"15", up:"0",right:"0", forward:"13.9"   },
//   { id: "bl", name: "Back off Left Side", color: "#d4b895", image: null , width:"2",height:"15", up:"0",right:"25", forward:"0"   },
//   { id: "rl", name: "Right off Left Side", color: "#d4b895", image: null , width:"2",height:"15", up:"0",right:"-14", forward:"27"   },
//   { id: "ll", name: "Left off Left Side", color: "#d4b895", image: null , width:"2",height:"15", up:"0",right:"0", forward:"0"   },
// ]);
//   const {backendUrl,token,userContextData} = useContext(ShopContext)
//   const [eml, setEml] = useState("");

//     const [activeSide, setActiveSide] = useState("front");
//   const fileInputRef = useRef(null);
//   const cubeRef = useRef(null);

//   // Handle mouse rotation for the cube
//   const handleMouseDown = (e) => {
//     // Only enable dragging when clicking directly on the cube
//     if (e.target.closest(".cube-container")) {
//       setIsDragging(true);
//       setDragStart({
//         x: e.clientX,
//         y: e.clientY
//       });
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const deltaX = e.clientX - dragStart.x; // Track horizontal movement
  
//       setRotation((prev) => ({
//         x: 0, // Lock X-axis (No up-down rotation)
//         y: prev.y + deltaX * 0.5, // Rotate along Y-axis only
//       }));
  
//       setDragStart({
//         x: e.clientX,
//         y: e.clientY,
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };
//   // Add and remove event listeners
//   useEffect(() => {
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
    
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging, dragStart]);


//   return (
//     <div className="flex h-[300px] w-[300px] pt-16">
//         <div className="w-full h-24 relative">
//             {/* Main design area */}
//       <div className="flex-1 flex flex-col  w-full ">
//         {/* <div className="p-4 border-b w-full bg-white shadow-sm ">
//           <h1 className="text-xl font-bold">3D Jute Bag Designer</h1>
//         </div> */}

//         <div className="relative flex-1 flex  border-red pl-6">
//           {/* 3D Design canvas */}
//           <div className="flex-1  bg-transparent flex px-24 pt-24 justify-center items-center">
//             <div className="relative" style={{ perspective: "1800px" }}>
//               <div
//                 ref={cubeRef}
//                 className="relative pb-24  cube-container " // cube-container remover for rotation
//                 style={{
//                     transformStyle: "preserve-3d",
//                     transform: `rotateY(${rotation.y}deg)`, // Only Y-axis rotation applied
//                     transition: isDragging ? "none" : "transform 0.5s ease",
//                     cursor: isDragging ? "grabbing" : "grab"
//                   }}
                  
//                 onMouseDown={handleMouseDown}
//               >
//                 {/* Front face */}
//                 <div
//                   className="absolute w-48 h-80 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "front")?.color,
//                     transform: `translateY(${0}rem) translateZ(${6}rem) translateX(0rem)`,
//                     width:`8rem`,
//                     height:`1rem`,
//                     backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "front")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "front")?.image}
//                       alt="front"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Front
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* Back face */}
//                 <div
//                   className="absolute w-64 h-80 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "back")?.color,
//                     transform: `rotateY(180deg)  translateY(${0}rem) translateZ(${0}rem) translateX(${0}rem)`,
//                     width:`8rem`,
//                     height:`1rem`,
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "back")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "back")?.image}
//                       alt="back"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Back
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* Left face */}
//                 <div
//                   className="absolute w-8 h-80 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "left")?.color,
//                     // transform: "translateX(0rem) rotateY(-90deg)",
//                     transform: `rotateY(-90deg)  translateY(${0}rem) translateZ(${0}rem) translateX(${0}rem)`,
//                     width:`6rem`,
//                     height:`1rem`,
//                     transformOrigin: "left center",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "left")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "left")?.image}
//                       alt="left"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Left
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* Right face */}
//                 <div
//                   className="absolute w-64 h-80 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "right")?.color,
//                     // transform: "translateX(1rem) rotateY(90deg)",
//                     transform: `rotateY(90deg)  translateY(${0}rem) translateZ(${2}rem) translateX(${0}rem)`,
//                     width:`6rem`,
//                     height:`1rem`,
//                     transformOrigin: "right center",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "right")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "right")?.image}
//                       alt="right"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Right
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* Top face */}
//                 <div
//                   className="absolute w-64 h-32 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "top")?.color,
//                     // transform: "translateY(-0rem) rotateX(90deg)",
//                     transform: `rotateX(90deg) rotateZ(360deg)   translateY(0rem) translateZ(0rem) translateX(0rem)`,
//                     width:`4rem`,
//                     height:`6rem`,
//                     transformOrigin: "center top",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "top")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "top")?.image}
//                       alt="top"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Top
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* Bottom face */}
//                 <div
//                   className="absolute w-64 h-32 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "bottom")
//                       ?.color,
//                     // transform: "translateY(12rem) rotateX(-90deg)",
//                     transform: `rotateX(-90deg) rotateZ(-360deg)  translateY(0rem) translateZ(-5rem) translateX(0rem)`,
//                     width:`4rem`,
//                     height:`6rem`,
//                     transformOrigin: "center bottom",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "bottom")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "bottom")?.image}
//                       alt="bottom"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                   </div>
//                 </div>

// {/* fl */}
// <div
//                   className="absolute w-8 h-64 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "fl")?.color,
//                     // transform: "translateZ(13.99rem) ",
//                     transform: `translateY(${0}rem) translateZ(${5.99}rem) translateX(${0}rem)`,
//                     width:`1rem`,
//                     height:`4rem`,
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "fl")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "fl")?.image?.url}
//                       alt="fl"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       fl
//                     </span>
//                   </div> */}
//                 </div>
// {/* fr */}
//                 <div
//                   className="absolute w-8 h-64 border-2 border-slate-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "fr")?.color,
//                     // transform: "translateZ(13.99rem) translatex(25rem)",
//                     transform: `translateY(0rem) translateZ(5.99rem) translateX(7rem)`,
//                     width:`1rem`,
//                     height:`4rem`,
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "fr")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "fr")?.image?.url}
//                       alt="fr"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       fr
//                     </span>
//                   </div> */}
//                 </div>
// {/* br */}
//                 <div
//                   className="absolute w-8 h-64 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "br")?.color,
//                     // transform: "translateZ(0rem) rotateY(-180deg)",
//                     transform: `translateY(0rem) translateZ(0rem) translateX(0rem)`,
//                     width:`1rem`,
//                     height:`4rem`,
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "br")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "br")?.image?.url}
//                       alt="br"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       br
//                     </span> */}
//                   </div>
//                 </div>

//                 {/*bl  */}
//                 <div
//                   className="absolute w-8 h-64 border-2 border-slate-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "bl")?.color,
//                     // transform: "translatex(25rem) rotateY(-180deg)",
//                     transform: `translateY(0rem) translateZ(0rem) translateX(7rem)`,
//                     width:`1rem`,
//                     height:`4rem`,
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "bl")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "bl")?.image?.url}
//                       alt="bl"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       bl
//                     </span> */}
//                   </div>
//                 </div>

// {/* ll */}
//                 <div
//                   className="absolute w-4 h-64 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "ll")?.color,
//                     // transform: "translateX(0rem) rotateY(-90deg)",
//                     // width: "2rem",
//                     transform: `rotateY(-90deg) translateY(0rem) translateZ(0rem) translateX(0rem)`,
//                     width:`1rem`,
//                     height:`4rem`,
//                     transformOrigin: "left center",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "ll")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "ll")?.image?.url}
//                       alt="ll"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       ll
//                     </span>
//                   </div> */}
//                 </div>
// {/* lr */}
//                 <div
//                   className="absolute w-4 h-64 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "lr")?.color,
//                     // transform: "translatez(12rem) rotateY(-90deg)",
//                     // width: "2rem",
//                     transform: `rotateY(-90deg) translateY(0rem) translateZ(-0.01rem) translateX(4.99rem)`,
//                     width:`1rem`,
//                     height:`4rem`,
//                     transformOrigin: "left center",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "lr")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "lr")?.image?.url}
//                       alt="lr"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       lr
//                     </span>
//                   </div> */}
//                 </div>

// {/* rr */}
//                 <div
//                   className="absolute w-4 h-64 border-2 border-slate-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "rr")?.color,
//                     // transform: "translateX(27rem) rotateY(-270deg) translateX(-2rem)",
//                     // width: "2rem",
//                     transform: ` rotateY(-270deg)  translateY(0rem) translateZ(8rem) translateX(-1rem)`,
//                     width:`1rem`,
//                     height:`4rem`,
//                     transformOrigin: "left center",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "rr")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "rr")?.image?.url}
//                       alt="rr"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       rr
//                     </span>
//                   </div> */}
//                 </div>

// {/* rl */}
//                 <div
//                   className="absolute w-4 h-64 border-2 border-slate-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "rl")?.color,
//                     // transform: "translateX(27rem) translateY(0rem) translateZ(14rem)  rotateY(-270deg)",
//                     // width: "2rem",
//                     transform: ` rotateY(-270deg)  translateY(0rem) translateZ(8rem) translateX(-6rem)`,
//                     width:`1rem`,
//                     height:`4rem`,
//                     transformOrigin: "left center",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "rl")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "rl")?.image?.url}
//                       alt="rl"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       rl
//                     </span>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//         </div>

      

//     </div>
//   );
// };

// export default ShowTableModel;
// import { X, Upload, RotateCcw, Plus, Trash2 } from "lucide-react";
// import { useNavigate } from 'react-router-dom';
// import modelData from "../assets/3D_Model.json";
// import { toast } from "react-toastify";
// import { ShopContext } from "../content/ShopContext";
// import axios from "axios";


// const PageDesign = () => {
//   const navigate = useNavigate();
//   const [images, setImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [rotation, setRotation] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [sides, setSides] = useState([]);
//   const {backendUrl,token,userContextData} = useContext(ShopContext)
//   const [eml, setEml] = useState("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/api/user/user-profile`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.data.success) {
//           setEml(response.data.user.email);
//           console.log(eml);
//         } else {
//           console.error(response.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     if (token) fetchUserData();
//   }, [token, backendUrl]);

//   useEffect(()=>{
//     const getSlides = async ()=>{
//       try {
//         if(!token){
//           return null
//         }
//         const response = await axios.post(backendUrl+'/api/user3d/fetch-jute-bags',{email:eml})
//         console.log(response.data.juteBags[0].sides)
//         if(response.data.success){
//           console.log("first")
//           setSides(response.data.juteBags[0].sides)
//           console.log(sides,"cc")
//         }
//       } catch (error) {
//         console.log(error)
//         toast.error(error.message)
//       }
//     }
//     getSlides()
//   },[eml])

//   // useEffect(() => {
//   //   const getSlides = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         backendUrl+'/api/user3d/fetch-jute-bags',
//   //         {
//   //           params: { email: eml },
//   //           headers: { Authorization: `Bearer ${token}` },
//   //         }
//   //       );
        
//   //       console.log("Fetched slides:", response.data);
//   //       setSides(response.data);
//   //     } catch (error) {
//   //       console.error("Error fetching slides:", error);
//   //     }
//   //   };

//   //   if (eml) {
//   //     getSlides();
//   //   }
//   // }, [token, eml]);
//   const [activeSide, setActiveSide] = useState("front");
//   const fileInputRef = useRef(null);
//   const cubeRef = useRef(null);

//   // Handle mouse rotation for the cube
//   const handleMouseDown = (e) => {
//     // Only enable dragging when clicking directly on the cube
//     if (e.target.closest(".cube-container")) {
//       setIsDragging(true);
//       setDragStart({
//         x: e.clientX,
//         y: e.clientY
//       });
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const deltaX = e.clientX - dragStart.x; // Track horizontal movement
  
//       setRotation((prev) => ({
//         x: 0, // Lock X-axis (No up-down rotation)
//         y: prev.y + deltaX * 0.5, // Rotate along Y-axis only
//       }));
  
//       setDragStart({
//         x: e.clientX,
//         y: e.clientY,
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };
//   // Add and remove event listeners
//   useEffect(() => {
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
    
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging, dragStart]);


//   return (
//     <div className="flex h-[400px] w-[400px] bg-gray-100 pt-16">
//         <div className="w-full h-24 relative">
//             {/* Main design area */}
//       <div className="flex-1 flex flex-col  w-full ">
//         {/* <div className="p-4 border-b w-full bg-white shadow-sm ">
//           <h1 className="text-xl font-bold">3D Jute Bag Designer</h1>
//         </div> */}

//         <div className="relative flex-1 flex  border-red ">
//           {/* 3D Design canvas */}
//           <div className="flex-1  bg-transparent flex px-24 pt-24 justify-center">
//             <div className="relative" style={{ perspective: "1800px" }}>
//               <div
//                 ref={cubeRef}
//                 className="relative pb-24  cube-container " // cube-container remover for rotation
//                 style={{
//                     transformStyle: "preserve-3d",
//                     transform: `rotateY(${rotation.y}deg)`, // Only Y-axis rotation applied
//                     transition: isDragging ? "none" : "transform 0.5s ease",
//                     cursor: isDragging ? "grabbing" : "grab"
//                   }}
                  
//                 onMouseDown={handleMouseDown}
//               >
//                 {/* Front face */}
//                 <div
//                   className="absolute w-48 h-80 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "front")?.color,
//                     transform: `translateY(${sides.find((s) => s.id === "front")?.up}rem) translateZ(${sides.find((s) => s.id === "front")?.forward}rem) translateX(${sides.find((s) => s.id === "front")?.right}rem)`,
//                     width:`${sides.find((s) => s.id === "front")?.width}rem`,
//                     height:`${sides.find((s) => s.id === "front")?.height}rem`,
//                     backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "front")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "front")?.image?.url}
//                       alt="front"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Front
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* Back face */}
//                 <div
//                   className="absolute w-64 h-80 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "back")?.color,
//                     transform: `rotateY(180deg)  translateY(${sides.find((s) => s.id === "back")?.up}rem) translateZ(${sides.find((s) => s.id === "back")?.forward}rem) translateX(${sides.find((s) => s.id === "back")?.right}rem)`,
//                     width:`${sides.find((s) => s.id === "back")?.width}rem`,
//                     height:`${sides.find((s) => s.id === "back")?.height}rem`,
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "back")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "back")?.image?.url}
//                       alt="back"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Back
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* Left face */}
//                 <div
//                   className="absolute w-8 h-80 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "left")?.color,
//                     // transform: "translateX(0rem) rotateY(-90deg)",
//                     transform: `rotateY(-90deg)  translateY(${sides.find((s) => s.id === "left")?.up}rem) translateZ(${sides.find((s) => s.id === "left")?.forward}rem) translateX(${sides.find((s) => s.id === "left")?.right}rem)`,
//                     width:`${sides.find((s) => s.id === "left")?.width}rem`,
//                     height:`${sides.find((s) => s.id === "left")?.height}rem`,
//                     transformOrigin: "left center",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "left")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "left")?.image?.url}
//                       alt="left"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Left
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* Right face */}
//                 <div
//                   className="absolute w-64 h-80 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "right")?.color,
//                     // transform: "translateX(1rem) rotateY(90deg)",
//                     transform: `rotateY(90deg)  translateY(${sides.find((s) => s.id === "right")?.up}rem) translateZ(${sides.find((s) => s.id === "right")?.forward}rem) translateX(${sides.find((s) => s.id === "right")?.right}rem)`,
//                     width:`${sides.find((s) => s.id === "right")?.width}rem`,
//                     height:`${sides.find((s) => s.id === "right")?.height}rem`,
//                     transformOrigin: "right center",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "right")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "right")?.image?.url}
//                       alt="right"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Right
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* Top face */}
//                 <div
//                   className="absolute w-64 h-32 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "top")?.color,
//                     // transform: "translateY(-0rem) rotateX(90deg)",
//                     transform: `rotateX(90deg) rotateZ(360deg)   translateY(${sides.find((s) => s.id === "top")?.up}rem) translateZ(${sides.find((s) => s.id === "top")?.forward}rem) translateX(${sides.find((s) => s.id === "top")?.right}rem)`,
//                     width:`${sides.find((s) => s.id === "top")?.width}rem`,
//                     height:`${sides.find((s) => s.id === "top")?.height}rem`,
//                     transformOrigin: "center top",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "top")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "top")?.image?.url}
//                       alt="top"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Top
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* Bottom face */}
//                 <div
//                   className="absolute w-64 h-32 border-2 border-gray-400"
//                   style={{
//                     backgroundColor: sides.find((s) => s.id === "bottom")
//                       ?.color,
//                     // transform: "translateY(12rem) rotateX(-90deg)",
//                     transform: `rotateX(-90deg) rotateZ(-360deg)  translateY(${sides.find((s) => s.id === "bottom")?.up}rem) translateZ(${sides.find((s) => s.id === "bottom")?.forward}rem) translateX(${sides.find((s) => s.id === "bottom")?.right}rem)`,
//                     width:`${sides.find((s) => s.id === "bottom")?.width}rem`,
//                     height:`${sides.find((s) => s.id === "bottom")?.height}rem`,
//                     transformOrigin: "center bottom",
//                     // backfaceVisibility: "hidden",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "bottom")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "bottom")?.image?.url}
//                       alt="bottom"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Bottom
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* top back */}
//                 <div
//                   className="absolute w-64 h-2 border-2 rounded-4xl"
//                   style={{
//                     // transform:
//                     //   "rotateX(0deg) rotateY(180deg) translateZ(-0rem) translateY(-8.5rem) translateX(0rem)",
//                     // height: "9rem",
//                     // width: "16rem",
//                     transform: `rotateX(0deg) rotateY(180deg) rotateZ(360deg)   translateY(${sides.find((s) => s.id === "topback")?.up}rem) translateZ(${sides.find((s) => s.id === "topback")?.forward}rem) translateX(${sides.find((s) => s.id === "topback")?.right}rem)`,
//                     width:`${sides.find((s) => s.id === "topback")?.width}rem`,
//                     height:`${sides.find((s) => s.id === "topback")?.height}rem`,
//                     borderTop: `0.4rem solid ${
//                       sides.find((s) => s.id === "topback")?.color
//                     }`,
//                     borderLeft: `0.4rem solid ${
//                       sides.find((s) => s.id === "topback")?.color
//                     }`,
//                     borderRight: `0.4rem solid ${
//                       sides.find((s) => s.id === "topback")?.color
//                     }`,
//                     borderBottom: `0.4rem solid transparent`,
//                     transformOrigin: "center top",
//                     borderRadius: "50% 50% 50% 0 / 100% 100% 0 0",
//                     perspective: "800px",
//                     boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "topback")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "topback")?.image?.url}
//                       alt="topback"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-t-full"
//                       style={{ borderRadius: "50% 50% 50% 0 / 100% 100% 0 0" }}
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Top Back
//                     </span> */}
//                   </div>
//                 </div>

//                 {/* top front     */}
//                 <div
//                   className="absolute w-64 h-2 border-2 rounded-4xl"
//                   style={{
//                     // transform:
//                     //   "rotateX(0deg) rotateY(0deg) translateZ(1rem) translateY(-8.5rem) translateX(0rem)",
//                     // height: "9rem",
//                     // width: "16rem",
//                     transform: `rotateX(0deg) rotateY(360deg) rotateZ(360deg)   translateY(${sides.find((s) => s.id === "topfront")?.up}rem) translateZ(${sides.find((s) => s.id === "topfront")?.forward}rem) translateX(${sides.find((s) => s.id === "topfront")?.right}rem)`,
//                     width:`${sides.find((s) => s.id === "topfront")?.width}rem`,
//                     height:`${sides.find((s) => s.id === "topfront")?.height}rem`,
//                     borderTop: `0.4rem solid ${
//                       sides.find((s) => s.id === "topfront")?.color
//                     }`,
//                     borderLeft: `0.4rem solid ${
//                       sides.find((s) => s.id === "topfront")?.color
//                     }`,
//                     borderRight: `0.4rem solid ${
//                       sides.find((s) => s.id === "topfront")?.color
//                     }`,
//                     borderBottom: `0.4rem solid transparent`,
//                     transformOrigin: "center top",
//                     borderRadius: "50% 50% 50% 0 / 100% 100% 0 0",
//                     perspective: "800px",
//                     boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//                   }}
//                 >
//                   {sides.find((s) => s.id === "topfront")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "topfront")?.image?.url}
//                       alt="topfront"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-t-full"
//                       style={{ borderRadius: "50% 50% 50% 0 / 100% 100% 0 0" }}
//                     />
//                   )}
//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     {/* <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                       Top Front
//                     </span> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//         </div>

      

//     </div>
//   );
// };

// export default PageDesign;