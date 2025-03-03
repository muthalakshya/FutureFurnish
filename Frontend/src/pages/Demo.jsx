import React, { useState } from "react";
import "./Cuboid.css";

const faces = ["front", "back", "top", "bottom", "left", "right"];

const Cuboid = ({ images, setImages, rotation, setRotation }) => {
  const handleMouseDown = (e) => {
    let startX = e.clientX;
    let startY = e.clientY;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setRotation((prev) => ({
        x: prev.x + deltaY * 0.5,
        y: prev.y + deltaX * 0.5,
      }));
      startX = e.clientX;
      startY = e.clientY;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="scene">
      <div
        className="cuboid"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        onMouseDown={handleMouseDown}
      >
        {faces.map((face) => (
          <div
            key={face}
            className={`face ${face}`}
            style={{ backgroundImage: `url(${images[face]})`, backgroundSize: "cover" }}
          />
        ))}
      </div>
    </div>
  );
};

const Demo = () => {
  const [images, setImages] = useState({
    front: "front.jpg", 
    back: "back.jpg",
    top: "top.jpg",
    bottom: "bottom.jpg",
    left: "left.jpg",
    right: "right.jpg",
  });

  const [rotation, setRotation] = useState({ x: -30, y: 45 });

  return (
    <div className="p-48">
        <Cuboid images={images} setImages={setImages} rotation={rotation} setRotation={setRotation} />
    </div>
  );
};

export default Demo;
