import React, { useState } from "react";
import UserMode from "./pages/UserMode";
import CreatorMode from "./pages/CreatorMode";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [isCreator, setIsCreator] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isCreator={isCreator} />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar isCreator={isCreator} setIsCreator={setIsCreator} />

        {/* Page */}
        <div className="p-4">
          {isCreator ? <CreatorMode /> : <UserMode />}
        </div>
      </div>
    </div>
  );
}
