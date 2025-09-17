import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import Navbar from "./components/user/Navbar";
import UserHome from "./components/user/UserHome";
import CreatorDashboard from "./components/creator/CreatorDashboard";
import LoginPage from "./Page/LoginPage";
import SignupPage from "./Page/SignupPage";

const App: React.FC = () => {
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const toggleMode = () => setIsCreatorMode(!isCreatorMode);

  return (
    <ThemeProvider>
      


      

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                isCreatorMode ? (
                  <CreatorDashboard onModeSwitch={toggleMode} />
                ) : (
                  <UserHome onModeSwitch={toggleMode} />
                )
              ) : (
                <UserHome onModeSwitch={toggleMode} />
              )
            }
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
