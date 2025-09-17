import React from "react";
import { Video } from "../../types/video";

interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onSelect }) => {
  return (
    <div
      className="cursor-pointer rounded-lg shadow-md hover:shadow-lg transition p-2"
      onClick={() => onSelect(video)}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="mt-2 font-semibold text-gray-800 line-clamp-2">
        {video.title}
      </h3>
      <p className="text-sm text-gray-600">{video.channel.name}</p>
      <p className="text-xs text-gray-500">{video.views} views</p>
    </div>
  );
};

export default VideoCard;
