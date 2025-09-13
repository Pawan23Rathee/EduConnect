import React from "react";

export default function StatCard({ stat }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-gray-500">{stat.label}</p>
      <h3 className="text-xl font-bold">{stat.value}</h3>
      <span className="text-green-500 text-sm">{stat.change}</span>
    </div>
  );
}
