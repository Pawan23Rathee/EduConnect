// src/components/Navbar.jsx
import React, { useState } from "react";
import Button from "./ui/Button";

export default function Navbar({ isCreator, setIsCreator }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menu = isCreator
    ? [
        { label: "Dashboard", icon: "📊" },
        { label: "Content", icon: "🎥" },
        { label: "Analytics", icon: "📈" },
        { label: "Monetization", icon: "💰" },
      ]
    : [
        { label: "Home", icon: "🏠" },
        { label: "Trending", icon: "🔥" },
        { label: "Subscriptions", icon: "📺" },
      ];

  const handleLogin = () => {
    // Dummy login (baad me backend se connect karenge)
    setIsLoggedIn(true);
    alert("✅ Logged in successfully!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsCreator(false); // logout hote hi creator mode se nikal do
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow">
      <h1 className="text-xl font-bold text-red-500">VideoIndia</h1>

      <ul className="hidden md:flex items-center gap-6">
        {menu.map((item, idx) => (
          <li key={idx} className="cursor-pointer hover:text-blue-600">
            {item.icon} {item.label}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {/* Mode Switch Buttons */}
        <Button
          variant={isCreator ? "outline" : "default"}
          onClick={() => setIsCreator(false)}
        >
          User Mode
        </Button>

        <Button
          variant={isCreator ? "default" : "outline"}
          onClick={() => {
            if (isLoggedIn) {
              setIsCreator(true);
            } else {
              alert("⚠️ Please login to access Creator Mode!");
            }
          }}
        >
          Creator Mode
        </Button>

        {/* Auth Buttons */}
        {isLoggedIn ? (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="default" onClick={handleLogin}>
              Signup
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
