import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

export default function UserMode() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Example backend call
    fetch("http://localhost:5000/api/videos")
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white">
        <h2 className="text-2xl font-bold">नमस्ते! Welcome to VideoIndia</h2>
        <p className="mt-2">
          Discover amazing content powered by AI, tailored for India
        </p>
      </div>

      {/* Recommended Section */}
      <h3 className="text-lg font-semibold">Recommended for You</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </div>
    </div>
  );
}
