import React from "react";

export default function VideoCard({ video }) {
  return (
    <div className="bg-white rounded-xl shadow p-3">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="rounded-lg"
      />
      <h4 className="mt-2 font-medium">{video.title}</h4>
      <p className="text-sm text-gray-500">
        {video.channel} • {video.views}
      </p>
    </div>
  );
}
