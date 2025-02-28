import React, { useState, useRef } from "react";
import { X, Upload, RotateCcw, Plus, Trash2 } from "lucide-react";

const PageDesign = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [sides, setSides] = useState([
    { id: "front", name: "Front Side", color: "#d4b895", image: null },
    { id: "back", name: "Back Side", color: "#d4b895", image: null },
    { id: "left", name: "Left Side", color: "#d4b895", image: null },
    { id: "right", name: "Right Side", color: "#d4b895", image: null },
    { id: "top", name: "Top Side", color: "#d4b895", image: null },
    { id: "bottom", name: "Bottom Side", color: "#d4b895", image: null },
    { id: "topfront", name: "Top Front Side", color: "#d4b895", image: null },
    { id: "topback", name: "Top Back Side", color: "#d4b895", image: null },
  ]);
  const [activeSide, setActiveSide] = useState("front");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setImages([...images, ...newImages]);
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
    <div className="flex h-screen bg-gray-100 pt-16  mb-72">
      {/* Left sidebar for image uploading and selection */}
      <div className="w-64 bg-white shadow-md flex flex-col">
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
        <div className="p-4 border-b bg-white shadow-sm">
          <h1 className="text-xl font-bold">3D Jute Bag Designer</h1>
        </div>

        <div className="flex-1 flex">
          {/* 3D Design canvas */}
          <div className="flex-1 p-8 bg-transparent flex justify-center items-center">
            <div className="relative" style={{ perspective: "1200px" }}>
              <div
                className="relative w-64 h-80"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {/* Front face */}
                <div
                  className="absolute w-64 h-80 border-2 border-gray-400"
                  style={{
                    backgroundColor: sides.find((s) => s.id === "front")?.color,
                    transform: "translateZ(8rem)",
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
                    transform: "translateZ(-0rem) rotateY(180deg)",
                    backfaceVisibility: "hidden",
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
                    transform: "translateX(0rem) rotateY(-90deg)",
                    width: "8rem",
                    transformOrigin: "left center",
                    backfaceVisibility: "hidden",
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
                    transform: "translateX(8rem) rotateY(90deg)",
                    width: "8rem",
                    transformOrigin: "right center",
                    backfaceVisibility: "hidden",
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
                    transform: "translateY(-0rem) rotateX(90deg)",
                    height: "8rem",
                    transformOrigin: "center top",
                    backfaceVisibility: "hidden",
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
                    transform: "translateY(12rem) rotateX(-90deg)",
                    height: "8rem",
                    transformOrigin: "center bottom",
                    backfaceVisibility: "hidden",
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

                

                <div
                  className="absolute w-64 h-2 border-2 rounded-4xl"
                  style={{
                    // backgroundImage: `url(
                    //     '${sides.find(s => s.id === 'top')?.image?.url}'
                    // )`,
                    // backgroundColor: sides.find(s => s.id === 'right')?.color,
                    transform:
                      "rotateX(0deg) rotateY(180deg) translateZ(-0rem) translateY(-8.5rem) translateX(0rem)",
                    height: "9rem",
                    width: "16rem",
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
                  {/* {sides.find((s) => s.id === "top")?.image && (
        <img
          src={sides.find((s) => s.id === "top")?.image?.url}
          alt="top"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-2xl"
        />
      )} */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Top Back
                    </span>
                  </div>
                </div>

                <div
                  className="absolute w-64 h-2 border-2 rounded-4xl"
                  style={{
                    // backgroundImage: `url(
                    //     '${sides.find(s => s.id === 'top')?.image?.url}'
                    // )`,
                    // backgroundColor: sides.find(s => s.id === 'right')?.color,
                    transform:
                      "rotateX(0deg) rotateY(0deg) translateZ(8rem) translateY(-8.5rem) translateX(0rem)",
                    height: "9rem",
                    width: "16rem",
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
                  {/* {sides.find((s) => s.id === "top")?.image && (
        <img
          src={sides.find((s) => s.id === "top")?.image?.url}
          alt="top"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-2xl"
        />
      )} */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Top Front
                    </span>
                  </div>
                </div>

                {/* <div
      className="relative w-64 h-32 border-2 rounded-4xl"
      style={{
        background: "none",
        width: "16rem",
        height: "6rem",
        borderRadius: "50% 50% 50% 0 / 100% 100% 0 0",
        transform: "translateY(-6rem) translateZ(8rem)",
        position: "relative",
        borderTop: `1rem solid red`,
        borderLeft: `1rem solid red`,
        borderRight: `1rem solid red`,
      }}
    >
      {sides.find((s) => s.id === "top")?.image?.url && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${sides.find((s) => s.id === "top")?.image?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            
            maskImage: "radial-gradient(disk, rgba(0,0,0,0) 90%, rgba(0,0,0,1) 50%)",
            WebkitMaskImage: "radial-gradient(disk, rgba(0,0,0,0) 90%, rgba(0,0,0,1) 50%)",
          }}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          Top
        </span>
      </div>
    </div> */}
              </div>
            </div>
          </div>

          {/* Controls panel */}
          <div className="w-72 bg-white shadow-md p-4 flex flex-col mb-24">
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
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Bag Sides</h3>
                <button
                  className="bg-blue-500 text-white p-1 rounded flex items-center text-sm"
                  onClick={addNewSide}
                >
                  <Plus size={16} />
                </button>
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
