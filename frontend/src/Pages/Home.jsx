import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/videos`)
      .then((res) => res.json())
      .then(setVideos)
      .catch((err) => console.error("Error fetching videos", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Video Library</h1>
      {videos.length === 0 && <p>No videos uploaded yet.</p>}
      <ul className="space-y-2">
        {videos.map((v) => (
          <li key={v.id}>
            <Link to={`/video/${v.id}`} className="text-blue-500 underline">
              {v.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
