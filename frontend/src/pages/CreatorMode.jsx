import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";

export default function CreatorMode() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Example backend call
    fetch("http://localhost:5000/api/creator/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
        <h2 className="text-2xl font-bold">Welcome back, Creator!</h2>
        <p className="mt-2">Here’s how your channel is performing today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} stat={stat} />
        ))}
      </div>
    </div>
  );
}
