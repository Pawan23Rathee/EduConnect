import React from "react";

export default function Button({ children, onClick, variant = "default" }) {
  const base = "px-4 py-2 rounded-lg font-medium transition";
  const styles = {
    default: "bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white hover:bg-blue-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}
