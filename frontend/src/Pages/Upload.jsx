import { useState } from "react";
import { BACKEND_URL } from "../config";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", file);

    try {
      const res = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      const data = await res.json();
      setStatus(`Uploaded successfully: ${data.title}`);
      setTitle("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("Upload failed.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload a Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
