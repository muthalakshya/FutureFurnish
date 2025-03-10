import React, { useState, useRef, useEffect, useContext } from "react";
import { X, Upload, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { ShopContext } from "../content/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PageDesign = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const { token, backendUrl, save3d, setSave3d } = useContext(ShopContext);
  const [sides, setSides] = useState([
    { id: "front", name: "Front Side", color: "#d4b895", image: null, width:"6",height:"8", up:"0",right:"0", forward:"5" },
    { id: "back", name: "Back Side", color: "#d4b895", image: null, width:"6",height:"8", up:"0",right:"0", forward:"-2" },
    { id: "left", name: "Left Side", color: "#d4b895", image: null, width:"3",height:"8", up:"0",right:"2", forward:"0" },
    { id: "right", name: "Right Side", color: "#d4b895", image: null, width:"3",height:"8", up:"0",right:"-2", forward:"3" },
    { id: "top", name: "Top Side", color: "#d4b895", image: null, width:"6",height:"3", up:"2",right:"0", forward:"0" },
    { id: "bottom", name: "Bottom Side", color: "#d4b895", image: null, width:"6",height:"3", up:"-2",right:"0", forward:"5" },
    { id: "topfront", name: "Top Front Side", color: "#d4b895", image: null, width:"6",height:"4", up:"-3.6",right:"0", forward:"5" },
    { id: "topback", name: "Top Back Side", color: "#d4b895", image: null, width:"6",height:"4", up:"-3.6",right:"0", forward:"-2" },
  ]);
  const [activeSide, setActiveSide] = useState("front");
  const fileInputRef = useRef(null);
  const cubeRef = useRef(null);

  const download3DModel = () => {
    // Create a copy of sides with base64 image data
    const sidesWithImageData = sides.map(side => {
      if (side.image) {
        // Get the image data
        const img = new Image();
        img.src = side.image.url;
        
        // Create a canvas to convert the image to base64
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Get base64 data URL
        const dataUrl = canvas.toDataURL('image/jpeg').split(',')[1];
        
        // Return the side with embedded image data
        return {
          ...side,
          image: {
            ...side.image,
            dataUrl
          }
        };
      }
      return side;
    });
    
    // Save to localStorage for the viewer page
    localStorage.setItem('3dModelData', JSON.stringify(sidesWithImageData));
    
    // Also download as JSON file
    const modelData = JSON.stringify(sidesWithImageData, null, 2);
    const blob = new Blob([modelData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "3D_Model.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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

  const handleSubmit = async () => {
    try {
      const resp = await axios.get(`${backendUrl}/api/user/user-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (resp.data.success) {
        const userId = resp.data.user._id;
        const email = resp.data.user.email;
        const payload = { userId, email, sides };
        localStorage.setItem("save3d", "true");
        localStorage.setItem("save3dJutedata", JSON.stringify(payload));

        if (window.opener && !window.opener.closed) {
          window.opener.postMessage({ type: "DESIGN_SAVED", success: true }, "*");
        }
        
        // Close this window after a brief delay
        setTimeout(() => {
          window.close();
        }, 1000);
  
        // const response = await fetch(`${backendUrl}/api/user3d/add-jute-bag`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Authorization": `Bearer ${token}`
        //   },
        //   body: JSON.stringify(payload),
        // });
  
        // const data = await response.json();
  
        // if (response.ok) {
        //   toast.success("Jute Bag stored successfully!");
          
        //   // Use localStorage to communicate with parent window
        //   localStorage.setItem("save3d", "true");
        //   localStorage.setItem("save3dJutedata", JSON.stringify(payload));
          
        //   // Try to notify parent window directly if possible
        //   if (window.opener && !window.opener.closed) {
        //     window.opener.postMessage({ type: "DESIGN_SAVED", success: true }, "*");
        //   }
          
        //   // Close this window after a brief delay
        //   setTimeout(() => {
        //     window.close();
        //   }, 1000);
        // } else {
        //   toast.error(`Failed to store Jute Bag: ${data.error}`);
        // }
      } else {
        console.error(resp.data.message);
        toast.error("Failed to verify user profile.");
      }
    } catch (error) {
      console.error("Error storing Jute Bag:", error);
      toast.error("Something went wrong while storing Jute Bag.");
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setRotation(prev => ({
        x: prev.x + deltaY * 0.5,
        y: prev.y + deltaX * 0.5
      }));
      
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  // Auto-focus on the selected side
  useEffect(() => {
    if (activeSide) {
      switch (activeSide) {
        case "front":
          setRotation({ x: 0, y: 0 });
          break;
        case "back":
          setRotation({ x: 0, y: 180 });
          break;
        case "left":
          setRotation({ x: 0, y: 90 });
          break;
        case "right":
          setRotation({ x: 0, y: -90 });
          break;
        case "top":
          setRotation({ x: -90, y: 0 });
          break;
        case "bottom":
          setRotation({ x: 90, y: 0 });
          break;
        case "topfront":
          setRotation({ x: -45, y: 0 });
          break;
        case "topback":
          setRotation({ x: -45, y: 180 });
          break;
        default:
          // For custom sides, don't change the rotation
          break;
      }
    }
  }, [activeSide]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
  
    // Convert Blob/File to Base64
    const convertBlobToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result); // Get Base64 string
        reader.onerror = (error) => reject(error);
      });
    };
  
    try {
      // Convert all images to base64
      const newImages = await Promise.all(
        files.map(async (file) => ({
          id: Date.now() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          base64: await convertBlobToBase64(file), // Await the base64 conversion
          url: URL.createObjectURL(file), // Temporary URL for preview
        }))
      );
  
      // Update state
      setImages((prevImages) => [...prevImages, ...newImages]);
  
      console.log("Uploaded Images:", newImages);
    } catch (error) {
      console.error("Error converting images:", error);
    }
  };
  

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
    setSides(
      sides.map((side) =>
        side.image && side.image.id === id ? { ...side, image: null } : side
      )
    );
  };

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const applyImageToSide = () => {
    if (!selectedImage || !activeSide) return;

    setSides(
      sides.map((side) =>
        side.id === activeSide ? { ...side, image: selectedImage } : side
      )
    );
  };

  const changeSideColor = (sideId, color) => {
    setSides(
      sides.map((side) =>
        side.id === sideId ? { ...side, color: color } : side
      )
    );
  };
  const changeSideWidth = (sideId, color) => {
    setSides(
      sides.map((side) =>
        side.id === sideId ? { ...side, width: color } : side
      )
    );
  };

  const changeSideHeight = (sideId, color) => {
    setSides(
      sides.map((side) =>
        side.id === sideId ? { ...side, height: color } : side
      )
    );
  };

  const changeSideUp = (sideId, color) => {
    setSides(
      sides.map((side) =>
        side.id === sideId ? { ...side, up: color } : side
      )
    );
  };

  const changeSideRi = (sideId, color) => {
    setSides(
      sides.map((side) =>
        side.id === sideId ? { ...side, right: color } : side
      )
    );
  };

  const changeSideFord = (sideId, color) => {
    setSides(
      sides.map((side) =>
        side.id === sideId ? { ...side, forward: color } : side
      )
    );
  };


  const changeActiveSide = (sideId) => {
    setActiveSide(sideId);
  };

  const addNewSide = () => {
    const newSideId = `custom-${Date.now()}`;
    setSides([
      ...sides,
      {
        id: newSideId,
        name: `Custom Side ${sides.length - 5}`,
        color: "#d4b895",
        image: null,
      },
    ]);
  };

  const removeSide = (sideId) => {
    // Don't allow removing the 6 default sides
    if (
      [
        "front",
        "back",
        "left",
        "right",
        "top",
        "bottom",
        "topback",
        "topfront",
      ].includes(sideId)
    )
      return;

    setSides(sides.filter((side) => side.id !== sideId));

    // If we removed the active side, set front as active
    if (activeSide === sideId) {
      setActiveSide("front");
    }
  };

  const rotateLeft = () => {
    setRotation({ ...rotation, y: rotation.y - 45 });
  };

  const rotateRight = () => {
    setRotation({ ...rotation, y: rotation.y + 45 });
  };

  const rotateUp = () => {
    setRotation({ ...rotation, x: rotation.x - 45 });
  };

  const rotateDown = () => {
    setRotation({ ...rotation, x: rotation.x + 45 });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };



  return (
    <div className="flex h-screen bg-gray-100 pt-16 mb-0">
      {/* Left sidebar for image uploading and selection */}
      <div className="w-80 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Image Library</h2>
          <button
            className="w-full mt-2 bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center"
            onClick={() => fileInputRef.current.click()}
          >
            <Upload size={16} className="mr-2" />
            Upload Images
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {images.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No images uploaded yet
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`relative border rounded cursor-pointer overflow-hidden ${
                    selectedImage && selectedImage.id === image.id
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => selectImage(image)}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-24 object-cover"
                  />
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main design area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white shadow-sm flex justify-between">
          <h1 className="text-xl font-bold">3D Jute Bag Designer</h1>
          <div className="">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              onClick={handleSubmit}
            >
              Submit & Continue
            </button>
          </div>
        </div>

        <div className="relative flex-1 flex h-80 border-red">
          {/* 3D Design canvas */}
          <div className="flex-1 pt-48 bg-transparent flex justify-center items-center ">
            <div className="relative" style={{ perspective: "1200px" }}>
              <div
                ref={cubeRef}
                className="relative w-64 h-80 cube-container z-10"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transition: isDragging ? "none" : "transform 0.5s ease",
                  cursor: isDragging ? "grabbing" : "grab"
                }}
                onMouseDown={handleMouseDown}
              >
                {/* Front face */}
                <div
                  className="absolute w-48 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "front")?.color,
                    transform: `translateY(${sides.find((s) => s.id === "front")?.up}rem) translateZ(${sides.find((s) => s.id === "front")?.forward}rem) translateX(${sides.find((s) => s.id === "front")?.right}rem)`,
                    width:`${sides.find((s) => s.id === "front")?.width}rem`,
                    height:`${sides.find((s) => s.id === "front")?.height}rem`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "front")?.image && (
                    <img
                      src={sides.find((s) => s.id === "front")?.image?.url}
                      alt="front"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Front
                    </span>
                  </div>
                </div>

                {/* Back face */}
                <div
                  className="absolute w-64 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "back")?.color,
                    transform: `rotateY(180deg)  translateY(${sides.find((s) => s.id === "back")?.up}rem) translateZ(${sides.find((s) => s.id === "back")?.forward}rem) translateX(${sides.find((s) => s.id === "back")?.right}rem)`,
                    width:`${sides.find((s) => s.id === "back")?.width}rem`,
                    height:`${sides.find((s) => s.id === "back")?.height}rem`,
                    // backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "back")?.image && (
                    <img
                      src={sides.find((s) => s.id === "back")?.image?.url}
                      alt="back"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Back
                    </span>
                  </div>
                </div>

                {/* Left face */}
                <div
                  className="absolute w-8 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "left")?.color,
                    // transform: "translateX(0rem) rotateY(-90deg)",
                    transform: `rotateY(-90deg)  translateY(${sides.find((s) => s.id === "left")?.up}rem) translateZ(${sides.find((s) => s.id === "left")?.forward}rem) translateX(${sides.find((s) => s.id === "left")?.right}rem)`,
                    width:`${sides.find((s) => s.id === "left")?.width}rem`,
                    height:`${sides.find((s) => s.id === "left")?.height}rem`,
                    transformOrigin: "left center",
                    // backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "left")?.image && (
                    <img
                      src={sides.find((s) => s.id === "left")?.image?.url}
                      alt="left"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Left
                    </span>
                  </div>
                </div>

                {/* Right face */}
                <div
                  className="absolute w-64 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "right")?.color,
                    // transform: "translateX(8rem) rotateY(90deg)",
                    transform: `rotateY(90deg)  translateY(${sides.find((s) => s.id === "right")?.up}rem) translateZ(${sides.find((s) => s.id === "right")?.forward}rem) translateX(${sides.find((s) => s.id === "right")?.right}rem)`,
                    width:`${sides.find((s) => s.id === "right")?.width}rem`,
                    height:`${sides.find((s) => s.id === "right")?.height}rem`,
                    transformOrigin: "right center",
                    // backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "right")?.image && (
                    <img
                      src={sides.find((s) => s.id === "right")?.image?.url}
                      alt="right"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Right
                    </span>
                  </div>
                </div>

                {/* Top face */}
                <div
                  className="absolute w-64 h-32 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "top")?.color,
                    // transform: "translateY(-0rem) rotateX(90deg)",
                    transform: `rotateX(90deg) rotateZ(360deg)   translateY(${sides.find((s) => s.id === "top")?.up}rem) translateZ(${sides.find((s) => s.id === "top")?.forward}rem) translateX(${sides.find((s) => s.id === "top")?.right}rem)`,
                    width:`${sides.find((s) => s.id === "top")?.width}rem`,
                    height:`${sides.find((s) => s.id === "top")?.height}rem`,
                    transformOrigin: "center top",
                    // backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "top")?.image && (
                    <img
                      src={sides.find((s) => s.id === "top")?.image?.url}
                      alt="top"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Top
                    </span>
                  </div>
                </div>

                {/* Bottom face */}
                <div
                  className="absolute w-64 h-32 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "bottom")
                      ?.color,
                    // transform: "translateY(12rem) rotateX(-90deg)",
                    transform: `rotateX(-90deg) rotateZ(-360deg)  translateY(${sides.find((s) => s.id === "bottom")?.up}rem) translateZ(${sides.find((s) => s.id === "bottom")?.forward}rem) translateX(${sides.find((s) => s.id === "bottom")?.right}rem)`,
                    width:`${sides.find((s) => s.id === "bottom")?.width}rem`,
                    height:`${sides.find((s) => s.id === "bottom")?.height}rem`,
                    transformOrigin: "center bottom",
                    // backfaceVisibility: "hidden",
                  }}
                >
                  {sides.find((s) => s.id === "bottom")?.image && (
                    <img
                      src={sides.find((s) => s.id === "bottom")?.image?.url}
                      alt="bottom"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Bottom
                    </span>
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
                    transform: `rotateX(0deg) rotateY(180deg) rotateZ(360deg)   translateY(${sides.find((s) => s.id === "topback")?.up}rem) translateZ(${sides.find((s) => s.id === "topback")?.forward}rem) translateX(${sides.find((s) => s.id === "topback")?.right}rem)`,
                    width:`${sides.find((s) => s.id === "topback")?.width}rem`,
                    height:`${sides.find((s) => s.id === "topback")?.height}rem`,
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
                  {sides.find((s) => s.id === "topback")?.image && (
                    <img
                      src={sides.find((s) => s.id === "topback")?.image?.url}
                      alt="topback"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-t-full"
                      style={{ borderRadius: "50% 50% 50% 0 / 100% 100% 0 0" }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Top Back
                    </span>
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
                    transform: `rotateX(0deg) rotateY(360deg) rotateZ(360deg)   translateY(${sides.find((s) => s.id === "topfront")?.up}rem) translateZ(${sides.find((s) => s.id === "topfront")?.forward}rem) translateX(${sides.find((s) => s.id === "topfront")?.right}rem)`,
                    width:`${sides.find((s) => s.id === "topfront")?.width}rem`,
                    height:`${sides.find((s) => s.id === "topfront")?.height}rem`,
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
                  {sides.find((s) => s.id === "topfront")?.image && (
                    <img
                      src={sides.find((s) => s.id === "topfront")?.image?.url}
                      alt="topfront"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-t-full"
                      style={{ borderRadius: "50% 50% 50% 0 / 100% 100% 0 0" }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Top Front
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls panel */}
          <div className="w-80 h-full bg-white shadow-md p-4 flex flex-col mb-24 overflow-auto">
            <div className="mb-6">
              <h3 className="font-medium mb-2">3D Rotation</h3>
              <div className="flex justify-center gap-2 mb-2">
                <button className="bg-gray-200 p-2 rounded" onClick={rotateUp}>
                  ↑
                </button>
              </div>
              <div className="flex justify-center gap-6">
                <button
                  className="bg-gray-200 p-2 rounded"
                  onClick={rotateLeft}
                >
                  ←
                </button>
                <button
                  className="bg-gray-200 p-2 rounded flex items-center"
                  onClick={resetRotation}
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  className="bg-gray-200 p-2 rounded"
                  onClick={rotateRight}
                >
                  →
                </button>
              </div>
              <div className="flex justify-center gap-2 mt-2">
                <button
                  className="bg-gray-200 p-2 rounded"
                  onClick={rotateDown}
                >
                  ↓
                </button>
              </div>
              <div className="text-xs text-gray-500 text-center mt-2">
                Pro Tip: Click and drag on the bag to rotate
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Bag Sides</h3>
                {/* <button
                  className="bg-blue-500 text-white p-1 rounded flex items-center text-sm"
                  onClick={addNewSide}
                >
                  <Plus size={16} />
                </button> */}
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
                {sides.map((side) => (
                  <div
                    key={side.id}
                    className={`flex items-center p-2 rounded cursor-pointer ${
                      activeSide === side.id
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => changeActiveSide(side.id)}
                  >
                    <div
                      className="w-4 h-4 rounded mr-2"
                      style={{ backgroundColor: side.color }}
                    ></div>
                    <span className="flex-1 text-sm">{side.name}</span>
                    {![
                      "front",
                      "back",
                      "left",
                      "right",
                      "top",
                      "bottom",
                      "topback",
                      "topfront",
                    ].includes(side.id) && (
                      <button
                        className="text-red-500 p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSide(side.id);
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Size Properties</h3>
              <div className="space-y-3">
                <div>
                  {/* <label className="block text-sm mb-1">Front & Back Size</label> */}
                  <div className="flex">
                    <p>Width</p>
                    <input
                      type="number"
                      value={
                        sides.find((s) => s.id === activeSide)?.width ||
                        8
                      }
                      onChange={(e) =>
                        changeSideWidth(activeSide, e.target.value)
                      }
                      className="flex-1 ml-2 border rounded px-2"
                    />
                    
                  </div>
                  <div className="flex mt-2">
                    <p>Height</p>
                  <input
                      type="number"
                      value={
                        sides.find((s) => s.id === activeSide)?.height ||
                        8
                      }
                      onChange={(e) =>
                        changeSideHeight(activeSide, e.target.value)
                      }
                      className="flex-1 ml-2 border rounded px-2"
                    />
                  </div>
                  <div className="flex mt-2">
                  <p>Up & Down</p>
                    <input
                      type="number"
                      value={
                        sides.find((s) => s.id === activeSide)?.up ||
                        8
                      }
                      onChange={(e) =>
                        changeSideUp(activeSide, e.target.value)
                      }
                      className=" w-16 px-2 ml-2 border rounded mr-2"
                    />
                    
                  </div>
                  <div className="flex mt-2">
                  <p>Right & left</p>
                    <input
                      type="number"
                      value={
                        sides.find((s) => s.id === activeSide)?.right ||
                        8
                      }
                      onChange={(e) =>
                        changeSideRi(activeSide, e.target.value)
                      }
                      className=" w-16 px-2 ml-2 border rounded mr-2"
                    />
                  </div>
                  <div className="flex mt-2">
                  <p>Forward  & Reverse</p>
                    <input
                      type="number"
                      value={
                        sides.find((s) => s.id === activeSide)?.forward ||
                        8
                      }
                      onChange={(e) =>
                        changeSideFord(activeSide, e.target.value)
                      }
                      className=" w-16 px-2 ml-2 border rounded mr-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Active Side Properties</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Color</label>
                  <div className="flex">
                    <input
                      type="color"
                      value={
                        sides.find((s) => s.id === activeSide)?.color ||
                        "#d4b895"
                      }
                      onChange={(e) =>
                        changeSideColor(activeSide, e.target.value)
                      }
                      className="w-10 h-10 cursor-pointer border rounded"
                    />
                    <input
                      type="text"
                      value={
                        sides.find((s) => s.id === activeSide)?.color ||
                        "#d4b895"
                      }
                      onChange={(e) =>
                        changeSideColor(activeSide, e.target.value)
                      }
                      className="flex-1 ml-2 border rounded px-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            

            <div className="mb-6">
              <h3 className="font-medium mb-2">Apply Selected Image</h3>
              <div className="flex flex-col items-center">
                {selectedImage ? (
                  <div className="relative w-40 h-40 mb-3 border rounded overflow-hidden">
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-40 mb-3 border rounded flex items-center justify-center text-gray-400">
                    No image selected
                  </div>
                )}
                <button
                  className={`w-full py-2 px-4 rounded ${
                    selectedImage
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  onClick={applyImageToSide}
                  disabled={!selectedImage}
                >
                  Apply to {sides.find((s) => s.id === activeSide)?.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      

    </div>
  );
};

export default PageDesign;