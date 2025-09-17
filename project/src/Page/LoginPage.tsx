import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/user/Navbar";
import Sidebar from "../components/user/Sidebar";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("home");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // LoginPage.tsx
const res = await fetch("http://localhost:4000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});


      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          onModeSwitch={() => {}}
          isCreatorMode={false}
        />

        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <form
            onSubmit={handleLogin}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-80"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              Login
            </h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
