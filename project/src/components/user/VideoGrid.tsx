// src/components/user/VideoGrid.tsx
import React from "react";
import { Video } from "../../types";

interface VideoGridProps {
  category: string;
  onVideoSelect: (video: Video) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ category, onVideoSelect }) => {
  const videos: Video[] = [
    { id: "1", title: "Video 1", url: "https://example.com/video1.mp4" },
    { id: "2", title: "Video 2", url: "https://example.com/video2.mp4" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <div
          key={video.id}
          className="cursor-pointer"
          onClick={() => onVideoSelect(video)}
        >
          <img
            src={video.thumbnail || "https://via.placeholder.com/320x180"}
            alt={video.title}
            className="w-full h-auto rounded-lg"
          />
          <h3 className="mt-2 text-sm font-medium">{video.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
