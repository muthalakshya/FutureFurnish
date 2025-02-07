"use client";

import { useState } from "react";

// Mock order details (for testing purposes)
const orderDetails = {
  orderId: "123456789",
  currentStatus: "Out for Delivery",
  shippingStatus: [
    { step: "Order Placed", value: "order_placed" },
    { step: "Order Confirmed", value: "order_confirmed" },
    { step: "Shipped", value: "shipped" },
    { step: "Out for Delivery", value: "out_for_delivery" },
    { step: "Delivered", value: "delivered" },
  ],
};

export default function IndustryUpdateStatus() {
  const [details, setDetails] = useState(orderDetails);
  const [selectedStatus, setSelectedStatus] = useState(details.currentStatus);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSaveStatus = () => {
    // Mock API Call (replace with actual API logic)
    console.log(`Updated status: ${selectedStatus}`);
    setDetails({ ...details, currentStatus: selectedStatus });
    alert(`Order status updated to: ${selectedStatus}`);
  };

  return (
    <div className="py-30 px-4 sm:px-10 lg:px-40 w-full justify-center ">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">
          Update Order Delivery Status
        </h1>
        <div className="mb-6">
          <p className="text-sm sm:text-base font-medium text-gray-700">
            Order ID: <span className="text-gray-900">{details.orderId}</span>
          </p>
          <p className="text-sm sm:text-base font-medium text-gray-700 mt-2">
            Current Status:{" "}
            <span className="text-gray-900">{details.currentStatus}</span>
          </p>
        </div>
        <div className="mt-6">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Update Status
          </label>
          <select
            id="status"
            value={selectedStatus}
            onChange={handleStatusChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {details.shippingStatus.map((status) => (
              <option key={status.value} value={status.step}>
                {status.step}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <button
            onClick={handleSaveStatus}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Status
          </button>
        </div>
      </div>
    </div>
  );
}
