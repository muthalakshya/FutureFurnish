"use client";

import { useState } from "react";

// Mock data for returns and refunds
const mockReturnsData = [
  {
    id: 1,
    orderId: "ORD123456",
    product: "Throwback Hip Bag",
    reason: "Defective product",
    status: "Processing",
    requestedBy: "Consumer",
  },
  {
    id: 2,
    orderId: "ORD123457",
    product: "Medium Stuff Satchel",
    reason: "Not as described",
    status: "Approved",
    requestedBy: "Consultant",
  },
];

export default function ReturnsRefunds() {
  const [returnsData, setReturnsData] = useState(mockReturnsData);
  const [role, setRole] = useState("Consumer"); // Can be 'Industry', 'Consultant', or 'Consumer'

  // Update return/refund status (Industry Only)
  const handleStatusUpdate = (id, newStatus) => {
    const updatedReturns = returnsData.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setReturnsData(updatedReturns);
    alert(`Status updated to "${newStatus}" for Return ID: ${id}`);
  };

  return (
    <div className="py-24 px-4 sm:px-10 lg:px-40 w-full justify-center">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">
          Returns & Refunds Management
        </h1>

        {/* Role Selector */}
        <div className="mb-6">
          <label
            htmlFor="roleSelector"
            className="block text-sm font-medium text-gray-700"
          >
            Select Role
          </label>
          <select
            id="roleSelector"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="Consumer">Consumer</option>
            <option value="Consultant">Consultant</option>
            <option value="Industry">Industry</option>
          </select>
        </div>

        {/* Table for Returns & Refunds */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-900 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-900 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-900 uppercase tracking-wider"
                >
                  Reason
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-900 uppercase tracking-wider"
                >
                  Status
                </th>
                {role === "Industry" && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-900 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {returnsData.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.status}
                  </td>
                  {role === "Industry" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusUpdate(item.id, e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
