import React, { useState, useEffect } from "react";

const InventoryPredictionForm = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    materialCost: 0,
    laborCost: 0,
    electricityCost: 0,
    machineryCost: 0,
    otherCost: 0,
    height: 0,
    width: 0,
    weight: 0,
    timeline: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Load existing data from localStorage on component mount
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("predictionData")) || [];
    setDataList(existingData);
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = { ...formData, images };

    if (isEditing) {
      // Update existing data
      const updatedData = dataList.map((item, index) =>
        index === editIndex ? submissionData : item
      );
      setDataList(updatedData);
      localStorage.setItem("predictionData", JSON.stringify(updatedData));
      setIsEditing(false);
      setEditIndex(null);
      alert("Data updated successfully!");
    } else {
      // Add new data
      const updatedData = [...dataList, submissionData];
      setDataList(updatedData);
      localStorage.setItem("predictionData", JSON.stringify(updatedData));
      alert("Data added successfully!");
    }

    // Reset form
    setFormData({
      itemName: "",
      materialCost: 0,
      laborCost: 0,
      electricityCost: 0,
      machineryCost: 0,
      otherCost: 0,
      height: 0,
      width: 0,
      weight: 0,
      timeline: "",
      description: "",
    });
    setImages([]);
  };

  // Handle Edit
  const handleEdit = (index) => {
    const dataToEdit = dataList[index];
    setFormData(dataToEdit);
    setImages(dataToEdit.images || []);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-28">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-4">
          Inventory Prediction Form
        </h1>
        <p className="text-gray-600 text-center mb-8">
          {isEditing ? "Edit details" : "Add details for predicting inventory pricing."}
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Item Name */}
          <div>
            <label className="block font-semibold mb-2">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Enter item name"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Cost Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Material Cost</label>
              <input
                type="number"
                name="materialCost"
                value={formData.materialCost}
                onChange={handleChange}
                placeholder="Enter material cost"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Labor Cost</label>
              <input
                type="number"
                name="laborCost"
                value={formData.laborCost}
                onChange={handleChange}
                placeholder="Enter labor cost"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-2">Electricity Cost</label>
              <input
                type="number"
                name="electricityCost"
                value={formData.electricityCost}
                onChange={handleChange}
                placeholder="Enter electricity cost"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Machinery Cost</label>
              <input
                type="number"
                name="machineryCost"
                value={formData.machineryCost}
                onChange={handleChange}
                placeholder="Enter machinery cost"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Other Cost</label>
              <input
                type="number"
                name="otherCost"
                value={formData.otherCost}
                onChange={handleChange}
                placeholder="Enter other cost"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-2">Height</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Enter height"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Width</label>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                placeholder="Enter width"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Weight</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block font-semibold mb-2">Timeline</label>
            <input
              type="date"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-md p-2"
              rows="4"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {images.length > 0 && (
              <p className="text-green-600 mt-2">
                {images.length} image(s) selected.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {isEditing ? "Update Data" : "Add Data"}
            </button>
          </div>
        </form>

        {/* List of Saved Entries */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Saved Entries</h2>
          <ul className="space-y-4">
            {dataList.map((data, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{data.itemName}</p>
                  <p className="text-gray-600 text-sm">{data.description}</p>
                </div>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InventoryPredictionForm;
