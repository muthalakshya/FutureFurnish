import React, { useState, useRef, useEffect, useContext } from "react";
import { X, Upload, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import modelData from "../assets/3D_Model.json";
import { toast } from "react-toastify";
import { ShopContext } from "../content/ShopContext";
import axios from "axios";


// const ShowModel = ({d3sides}) => {
//   // console.log(d3sides,"fff")
//   const navigate = useNavigate();
//   const [images, setImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [rotation, setRotation] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [sides, setSides] = useState(d3sides);
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
//                     transform: `translateY(${0}rem) translateZ(${5}rem) translateX(0rem)`,
//                     width:`6rem`,
//                     height:`8rem`,
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
//                     transform: `rotateY(180deg)  translateY(${0}rem) translateZ(${-2}rem) translateX(${0}rem)`,
//                     width:`6rem`,
//                     height:`8rem`,
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
//                     transform: `rotateY(-90deg)  translateY(${0}rem) translateZ(${0}rem) translateX(${2}rem)`,
//                     width:`3rem`,
//                     height:`8rem`,
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
//                     // transform: "translateX(8rem) rotateY(90deg)",
//                     transform: `rotateY(90deg)  translateY(${0}rem) translateZ(${3}rem) translateX(${-2}rem)`,
//                     width:`3rem`,
//                     height:`8rem`,
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
//                     transform: `rotateX(90deg) rotateZ(360deg)   translateY(${2}rem) translateZ(${0}rem) translateX(${0}rem)`,
//                     width:`6rem`,
//                     height:`3rem`,
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
//                     transform: `rotateX(-90deg) rotateZ(-360deg)  translateY(-2rem) translateZ(${5}rem) translateX(0rem)`,
//                     width:`6rem`,
//                     height:`3rem`,
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
//                     transform: `rotateX(0deg) rotateY(180deg) rotateZ(360deg)   translateY(-3.6rem) translateZ(-2rem) translateX(0rem)`,
//                     width:`6rem`,
//                     height:`4rem`,
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
//                   {/* {sides.find((s) => s.id === "topback")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "topback")?.image?.url}
//                       alt="topback"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-t-full"
//                       style={{ borderRadius: "50% 50% 50% 0 / 100% 100% 0 0" }}
//                     />
//                   )} */}
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
//                     //   "rotateX(0deg) rotateY(0deg) translateZ(8rem) translateY(-8.5rem) translateX(0rem)",
//                     // height: "9rem",
//                     // width: "16rem",
//                     transform: `rotateX(0deg) rotateY(360deg) rotateZ(360deg)   translateY(-3.6rem) translateZ(5rem) translateX(0rem)`,
//                     width:`6rem`,
//                     height:`4rem`,
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
//                   {/* {sides.find((s) => s.id === "topfront")?.image && (
//                     <img
//                       src={sides.find((s) => s.id === "topfront")?.image?.url}
//                       alt="topfront"
//                       className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-t-full"
//                       style={{ borderRadius: "50% 50% 50% 0 / 100% 100% 0 0" }}
//                     />
//                   )} */}
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

// export default ShowModel;


const ShowModel = ({d3sides}) => {
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
    <div className="flex h-[300px] w-[300px] pt-16">
        <div className="w-full h-24 relative">
            {/* Main design area */}
      <div className="flex-1 flex flex-col  w-full ">
        <div className="relative flex-1 flex  border-red ">
          {/* 3D Design canvas */}
          <div className="flex-1  bg-transparent flex px-24 pt-24 justify-center">
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
                    transform: `translateY(${0}rem) translateZ(${5}rem) translateX(0rem)`,
                    width:`6rem`,
                    height:`8rem`,
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
                    transform: `rotateY(180deg)  translateY(${0}rem) translateZ(${-2}rem) translateX(${0}rem)`,
                    width:`6rem`,
                    height:`8rem`,
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
                    // transform: "translateX(0rem) rotateY(-90deg)",
                    transform: `rotateY(-90deg)  translateY(${0}rem) translateZ(${0}rem) translateX(${2}rem)`,
                    width:`3rem`,
                    height:`8rem`,
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
                    // transform: "translateX(8rem) rotateY(90deg)",
                    transform: `rotateY(90deg)  translateY(${0}rem) translateZ(${3}rem) translateX(${-2}rem)`,
                    width:`3rem`,
                    height:`8rem`,
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
                    transform: `rotateX(90deg) rotateZ(360deg)   translateY(${2}rem) translateZ(${0}rem) translateX(${0}rem)`,
                    width:`6rem`,
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
                    transform: `rotateX(-90deg) rotateZ(-360deg)  translateY(-2rem) translateZ(${5}rem) translateX(0rem)`,
                    width:`6rem`,
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
                    //   "rotateX(0deg) rotateY(180deg) translateZ(-0rem) translateY(-8.5rem) translateX(0rem)",
                    // height: "9rem",
                    // width: "16rem",
                    transform: `rotateX(0deg) rotateY(180deg) rotateZ(360deg)   translateY(-3.6rem) translateZ(-2rem) translateX(0rem)`,
                    width:`6rem`,
                    height:`4rem`,
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
                    //   "rotateX(0deg) rotateY(0deg) translateZ(8rem) translateY(-8.5rem) translateX(0rem)",
                    // height: "9rem",
                    // width: "16rem",
                    transform: `rotateX(0deg) rotateY(360deg) rotateZ(360deg)   translateY(-3.6rem) translateZ(5rem) translateX(0rem)`,
                    width:`6rem`,
                    height:`4rem`,
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

export default ShowModel;


// import React, { useState, useRef, useEffect, useContext } from "react";
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
//                     // transform: "translateX(8rem) rotateY(90deg)",
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
//                     //   "rotateX(0deg) rotateY(0deg) translateZ(8rem) translateY(-8.5rem) translateX(0rem)",
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