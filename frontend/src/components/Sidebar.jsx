import React from "react";

export default function Sidebar({ isCreator }) {
  const userMenu = [
    { label: "Home", icon: "🏠" },
    { label: "Trending", icon: "🔥" },
    { label: "Subscriptions", icon: "📺" },
  ];

  const creatorMenu = [
    { label: "Dashboard", icon: "📊" },
    { label: "Content", icon: "🎥" },
    { label: "Analytics", icon: "📈" },
    { label: "Monetization", icon: "💰" },
  ];

  const menu = isCreator ? creatorMenu : userMenu;

  return (
    <div className="w-56 bg-white shadow-md p-4 hidden md:block">
      <h2 className="font-bold text-lg mb-4">
        {isCreator ? "Creator Studio" : "Explore"}
      </h2>
      <ul className="space-y-2">
        {menu.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
