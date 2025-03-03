import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Download, Save, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import domtoimage from "dom-to-image";

const ModelViewer = () => {
  const [modelData, setModelData] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isCapturing, setIsCapturing] = useState(false);
  const cubeRef = useRef(null);
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  // Constants for movement constraints
  const BOUNDARY_SIZE = 250;

  useEffect(() => {
    // Load model data from localStorage
    const savedModel = localStorage.getItem("3dModelData");
    if (savedModel) {
      try {
        setModelData(JSON.parse(savedModel));
      } catch (e) {
        console.error("Error parsing saved model data:", e);
      }
    }
  }, []);

  // Handle mouse rotation for the cube
  const handleMouseDown = (e) => {
    if (e.target.closest(".cube-container")) {
      setDragStart({
        x: e.clientX,
        y: e.clientY
      });
      
      if (isMoving) {
        setIsDragging(false);
      } else {
        setIsDragging(true);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      // Handle rotation
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
    } else if (isMoving) {
      // Handle movement within boundaries
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setPosition(prev => {
        // Calculate new position with strict boundary constraints
        const modelWidth = 64; // Width in pixels (8rem = ~64px)
        const modelHeight = 80; // Height in pixels (10rem = ~80px)
        
        // Calculate maximum allowed movement in each direction
        const maxX = (BOUNDARY_SIZE / 2) - (modelWidth / 2);
        const maxY = (BOUNDARY_SIZE / 2) - (modelHeight / 2);
        
        // Ensure movement stays within calculated boundaries
        const newX = Math.max(-maxX, Math.min(maxX, prev.x + deltaX));
        const newY = Math.max(-maxY, Math.min(maxY, prev.y + deltaY));
        
        return { x: newX, y: newY };
      });
      
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
  }, [isDragging, isMoving, dragStart]);

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

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  const toggleMoveMode = () => {
    setIsMoving(!isMoving);
    setIsDragging(false);
  };

  // Helper function to determine the view name from rotation
  const getViewNameFromRotation = (rot) => {
    // Normalize rotation values to be between 0 and 360
    const normalizeAngle = (angle) => {
      // Convert to positive angles in the range [0, 360)
      angle = angle % 360;
      if (angle < 0) angle += 360;
      return angle;
    };

    const x = normalizeAngle(rot.x);
    const y = normalizeAngle(rot.y);
    
    // Check for top and bottom views first (these depend primarily on x rotation)
    if (x >= 60 && x <= 120) return 'top';
    if (x >= 240 && x <= 300) return 'bottom';
    
    // Then check for the other views (dependent on y rotation)
    if ((y >= 315 || y < 45)) return 'front';
    if (y >= 45 && y < 135) return 'right';
    if (y >= 135 && y < 225) return 'back';
    if (y >= 225 && y < 315) return 'left';
    
    // Default to 'custom' if no standard view matches
    return 'custom';
  };

  // Function to capture single view
  const captureView = async (viewRotation) => {
    return new Promise((resolve) => {
      // Set the rotation for this view
      setRotation(viewRotation);
      
      // Wait for the rotation transition to complete before capturing
      setTimeout(() => {
        if (!viewerRef.current) {
          resolve(null);
          return;
        }
        
        // Use dom-to-image to create a JPEG representation
        domtoimage.toJpeg(viewerRef.current, { 
          quality: 0.9,
          bgcolor: '#ffffff',
          height: viewerRef.current.clientHeight,
          width: viewerRef.current.clientWidth,
          style: {
            'background-color': '#ffffff'
          }
        })
        .then(function (dataUrl) {
          resolve(dataUrl);
        })
        .catch(function (error) {
          console.error('Error generating JPG:', error);
          resolve(null);
        });
      }, 600); // Wait for transition (0.5s) to complete
    });
  };

  // Function to save single view as JPG
  const saveAsJPG = async () => {
    // Get the correct orientation name based on current rotation
    const currentView = getViewNameFromRotation(rotation);
    const jpgUrl = await captureView(rotation);
    
    if (!jpgUrl) {
      alert('Failed to generate JPG. Try using a different browser.');
      return;
    }
    
    // Download the JPG with the correct view name
    const downloadLink = document.createElement('a');
    downloadLink.href = jpgUrl;
    downloadLink.download = `3d-model-${currentView}.jpg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Function to save all views
  const saveAllViews = async () => {
    if (isCapturing) return;
    setIsCapturing(true);
    
    // Store original position and rotation
    const originalRotation = { ...rotation };
    const originalPosition = { ...position };
    
    // Define standard views with their correct rotations and view names
    const standardViews = [
      { rotation: { x: 0, y: 0 }, name: 'front' },
      { rotation: { x: 0, y: 180 }, name: 'back' },
      { rotation: { x: 0, y: 90 }, name: 'right' },
      { rotation: { x: 0, y: 270 }, name: 'left' },  // Changed from -90 to 270 for consistency
      { rotation: { x: 90, y: 0 }, name: 'top' },
      { rotation: { x: 270, y: 0 }, name: 'bottom' } // Changed from -90 to 270 for consistency
    ];
    
    // Center the model for consistent views
    resetPosition();
    
    // Capture each view
    for (const view of standardViews) {
      const jpgUrl = await captureView(view.rotation);
      if (jpgUrl) {
        // Download the file with appropriate name
        const downloadLink = document.createElement('a');
        downloadLink.href = jpgUrl;
        downloadLink.download = `3d-model-${view.name}.jpg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Wait a bit between downloads to avoid browser throttling
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    // Restore original position and rotation
    setRotation(originalRotation);
    setPosition(originalPosition);
    
    setIsCapturing(false);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          rotateLeft();
          break;
        case 'ArrowRight':
          rotateRight();
          break;
        case 'ArrowUp':
          rotateUp();
          break;
        case 'ArrowDown':
          rotateDown();
          break;
        case 'r':
        case 'R':
          resetRotation();
          break;
        case 'm':
        case 'M':
          toggleMoveMode();
          break;
        case 'c':
        case 'C':
          resetPosition();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [rotation, position, isMoving]);

  if (!modelData) {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <div className="text-xl mb-4">No model data found</div>
        <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded flex items-center">
          <ArrowLeft className="mr-2" size={16} />
          Back to Designer
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 pt-20">
      <div className="p-4 border-b bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold">3D Model Viewer</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={saveAsJPG}
            className="bg-green-500 text-white py-2 px-4 rounded flex items-center"
            disabled={isCapturing}
          >
            <Download className="mr-2" size={16} />
            Save Current View
          </button>
          <button 
            onClick={saveAllViews}
            className="bg-purple-500 text-white py-2 px-4 rounded flex items-center"
            disabled={isCapturing}
          >
            <Save className="mr-2" size={16} />
            {isCapturing ? "Capturing..." : "Save All Views"}
          </button>
          <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded flex items-center">
            <ArrowLeft className="mr-2" size={16} />
            Back to Designer
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* 3D Viewer */}
        <div className="flex-1 flex justify-center items-center" ref={viewerRef}>
          {/* Boundary container */}
          <div 
            ref={containerRef}
            className="relative  flex justify-center items-center"
            style={{ width: `${BOUNDARY_SIZE}px`, height: `${BOUNDARY_SIZE}px` }}
          >
            <div className="relative" style={{ perspective: "1200px" }}>
              <div
                ref={cubeRef}
                className="relative w-64 h-80 cube-container"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate(${position.x}px, ${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transition: isDragging || isMoving ? "none" : "transform 0.5s ease",
                  cursor: isMoving ? "move" : isDragging ? "grabbing" : "grab"
                }}
                onMouseDown={handleMouseDown}
              >
                {modelData.map((side) => {
                  // Skip sides that don't have specific transformations
                  if (!side.id) return null;

                  let transform = "";
                  let borderStyles = {};

                  // Apply the appropriate transformation based on side ID
                  switch (side.id) {
                    case "front":
                      transform = `translateY(${side.up}rem) translateZ(${side.forward}rem) translateX(${side.right}rem)`;
                      break;
                    case "back":
                      transform = `rotateY(180deg) translateY(${side.up}rem) translateZ(${side.forward}rem) translateX(${side.right}rem)`;
                      break;
                    case "left":
                      transform = `rotateY(-90deg) translateY(${side.up}rem) translateZ(${side.forward}rem) translateX(${side.right}rem)`;
                      break;
                    case "right":
                      transform = `rotateY(90deg) translateY(${side.up}rem) translateZ(${side.forward}rem) translateX(${side.right}rem)`;
                      break;
                    case "top":
                      transform = `rotateX(90deg) rotateZ(360deg) translateY(${side.up}rem) translateZ(${side.forward}rem) translateX(${side.right}rem)`;
                      break;
                    case "bottom":
                      transform = `rotateX(-90deg) rotateZ(-360deg) translateY(${side.up}rem) translateZ(${side.forward}rem) translateX(${side.right}rem)`;
                      break;
                    case "topback":
                      transform = `rotateX(0deg) rotateY(180deg) rotateZ(360deg) translateY(${side.up}rem) translateZ(${side.forward}rem) translateX(${side.right}rem)`;
                      borderStyles = {
                        borderTop: `0.4rem solid ${side.color}`,
                        borderLeft: `0.4rem solid ${side.color}`,
                        borderRight: `0.4rem solid ${side.color}`,
                        borderBottom: `0.4rem solid transparent`,
                        borderRadius: "50% 50% 50% 0 / 100% 100% 0 0",
                        perspective: "800px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                      };
                      break;
                    case "topfront":
                      transform = `rotateX(0deg) rotateY(360deg) rotateZ(360deg) translateY(${side.up}rem) translateZ(${side.forward}rem) translateX(${side.right}rem)`;
                      borderStyles = {
                        borderTop: `0.4rem solid ${side.color}`,
                        borderLeft: `0.4rem solid ${side.color}`,
                        borderRight: `0.4rem solid ${side.color}`,
                        borderBottom: `0.4rem solid transparent`,
                        borderRadius: "50% 50% 50% 0 / 100% 100% 0 0",
                        perspective: "800px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                      };
                      break;
                    default:
                      // Handle custom sides
                      break;
                  }

                  const isCurvedTop = side.id === "topfront" || side.id === "topback";

                  return (
                    <div
                      key={side.id}
                      className={`absolute border-2 border-gray-400 ${isCurvedTop ? 'rounded-4xl' : ''}`}
                      style={{
                        backgroundColor: side.color,
                        transform,
                        width: `${side.width}rem`,
                        height: `${side.height}rem`,
                        transformOrigin: 
                          side.id === "left" ? "left center" :
                          side.id === "right" ? "right center" :
                          side.id === "top" ? "center top" :
                          side.id === "bottom" ? "center bottom" : "center center",
                        ...borderStyles
                      }}
                    >
                      {side.image && (
                        <div 
                          className={`absolute inset-0 w-full h-full bg-no-repeat bg-center bg-contain mix-blend-multiply ${isCurvedTop ? 'rounded-t-full' : ''}`} 
                          style={{ 
                            backgroundImage: `url(data:image/jpeg;base64,${side.image.dataUrl})`,
                            borderRadius: isCurvedTop ? "50% 50% 50% 0 / 100% 100% 0 0" : "0"
                          }}
                        ></div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          {side.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="w-full md:w-64 p-4 bg-white border-l border-gray-200 flex flex-col gap-4">
          <div className="text-lg font-medium mb-2">Controls</div>
          
          {/* Rotation Controls */}
          <div className="border rounded p-3">
            <h3 className="font-medium mb-2">Rotation</h3>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <button 
                onClick={rotateLeft}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded flex items-center justify-center"
              >
                <RotateCw className="transform rotate-90" size={18} />
              </button>
              <button 
                onClick={rotateUp}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded flex items-center justify-center"
              >
                <RotateCw className="transform rotate-180" size={18} />
              </button>
              <button 
                onClick={rotateRight}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded flex items-center justify-center"
              >
                <RotateCw className="transform -rotate-90" size={18} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div></div>
              <button 
                onClick={rotateDown}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded flex items-center justify-center"
              >
                <RotateCw size={18} />
              </button>
              <div></div>
            </div>
            <button 
              onClick={resetRotation}
              className="w-full bg-blue-100 hover:bg-blue-200 p-2 rounded mt-2"
            >
              Reset Rotation
            </button>
          </div>
          
          {/* Movement Controls */}
          <div className="border rounded p-3">
            <h3 className="font-medium mb-2">Movement</h3>
            <button 
              onClick={toggleMoveMode}
              className={`w-full p-2 rounded mb-2 ${isMoving ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {isMoving ? "Moving Mode: ON" : "Moving Mode: OFF"}
            </button>
            <button 
              onClick={resetPosition}
              className="w-full bg-blue-100 hover:bg-blue-200 p-2 rounded"
              disabled={!isMoving}
            >
              Center Model
            </button>
          </div>
          
          {/* Keyboard Shortcuts */}
          <div className="border rounded p-3">
            <h3 className="font-medium mb-2">Keyboard Shortcuts</h3>
            <ul className="text-sm">
              <li className="mb-1">← → ↑ ↓ : Rotate model</li>
              <li className="mb-1">R : Reset rotation</li>
              <li className="mb-1">M : Toggle movement mode</li>
              <li className="mb-1">C : Center model</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;