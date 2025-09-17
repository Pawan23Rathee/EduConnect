import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import VideoGrid from "./VideoGrid";
import VideoPlayer from "./VideoPlayer";
import { Video } from "../../types";

interface UserHomeProps {
  onModeSwitch: () => void;
}

const UserHome: React.FC<UserHomeProps> = ({ onModeSwitch }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentVideo(null);
    setSidebarOpen(false); // close sidebar on mobile
  };

  if (currentVideo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar onMenuClick={toggleSidebar} onModeSwitch={onModeSwitch} isCreatorMode={false} />
        <VideoPlayer video={currentVideo} onBack={() => setCurrentVideo(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onMenuClick={toggleSidebar} onModeSwitch={onModeSwitch} isCreatorMode={false} />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        <main className="flex-1 transition-all duration-300 ml-0 lg:ml-64 p-6">
          {/* Welcome banner */}
          {selectedCategory === "home" && (
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">नमस्ते! Welcome to VideoIndia</h1>
                <p className="text-lg mb-6 opacity-90">
                  Discover amazing content powered by AI, tailored for India
                </p>
              </div>
            </div>
          )}

          {/* Video Grid */}
          <VideoGrid
            category={selectedCategory}
            onVideoSelect={setCurrentVideo}
          />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default UserHome;
