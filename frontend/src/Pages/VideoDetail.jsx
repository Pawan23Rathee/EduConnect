import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL, STREAM_URL } from "../config";

export default function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/videos`)
      .then((res) => res.json())
      .then((all) => {
        const found = all.find((v) => v.id === id);
        if (!found) {
          setError("Video not found");
        }
        setVideo(found || null);
      })
      .catch((err) => {
        console.error("Error fetching video", err);
        setError("Failed to load videos");
      });
  }, [id]);

  if (error) return <p className="p-6">{error}</p>;
  if (!video) return <p className="p-6">Loading...</p>;

  const videoUrl = `${STREAM_URL}/videos/${video.filename}`;
  console.log("Video URL:", videoUrl); // Debug

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <video controls width="640" className="mb-4">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <p>Uploaded on: {new Date(video.createdAt).toLocaleString()}</p>
    </div>
  );
}
