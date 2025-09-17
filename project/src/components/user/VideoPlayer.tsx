import React from "react";
import { Video } from "../../types/video";

interface VideoPlayerProps {
  video: Video | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  if (!video) {
    return (
      <div className="text-center text-gray-600">
        Select a video to play
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-black rounded-xl overflow-hidden aspect-video">
        <video
          src={video.videoUrl}
          poster={video.thumbnail}
          controls
          autoPlay
          className="w-full h-full object-contain"
        />
      </div>

      <h2 className="text-xl font-bold">{video.title}</h2>
      <p className="text-gray-600">{video.views} views</p>

      <div className="flex items-center space-x-2">
        <img
          src={video.channel.avatar}
          alt={video.channel.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{video.channel.name}</p>
          <p className="text-sm text-gray-500">
            {video.channel.subscribers} subscribers
          </p>
        </div>
      </div>

      <p className="text-gray-700">{video.description}</p>
    </div>
  );
};

export default VideoPlayer;
