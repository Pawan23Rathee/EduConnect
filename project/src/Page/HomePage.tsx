import React, { useEffect, useState } from "react";
import { Video } from "../types";

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/videos/home");
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) return <p className="p-6">Loading videos...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white dark:bg-gray-800 rounded shadow p-2"
            >
              {video.thumbnail ? (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              ) : (
                <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded mb-2">
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    No Thumbnail
                  </span>
                </div>
              )}
              <h2 className="font-semibold text-lg">{video.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {video.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
