import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">Hospital Medication Manager</h1>
        <p className="text-gray-700 text-center mb-6">
          Manage patient medication times, roles, and approvals with a professional dashboard.
        </p>
        <button className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Login</button>
      </div>
    </div>
  );
}
