import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { BACKEND_URL, STREAM_URL } from "../config";
import { BACKEND_URL, STREAM_URL } from "../config";


export default function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/videos`)
      .then((res) => res.json())
      .then((all) => {
        const found = all.find((v) => v.id === id);
        setVideo(found || null);
      })
      .catch((err) => console.error("Error fetching video", err));
  }, [id]);

  if (!video) return <p className="p-6">Video not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <video controls width="640" className="mb-4">
        <source src={`${STREAM_URL}/videos/${video.filename}`} type="video/mp4" />
      </video>
      <p>Uploaded on: {new Date(video.createdAt).toLocaleString()}</p>
    </div>
  );
}
