import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("predictionData")) || []
  );
  const navigate = useNavigate();

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("predictionData", JSON.stringify(updatedProducts));
  };

  const handleEdit = (index) => {
    navigate(`/inventory-management-form/${index}`, { state: { ...products[index], index } });
  };

  const handleAdd = () => {
    navigate("/inventory-management-form");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Manage Products
        </h1>
        <button
          onClick={handleAdd}
          className="mb-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
        >
          Add Product
        </button>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Material Cost</th>
              <th className="border px-4 py-2">Timeline</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{product.itemName}</td>
                <td className="border px-4 py-2">{product.materialCost}</td>
                <td className="border px-4 py-2">{product.timeline}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
