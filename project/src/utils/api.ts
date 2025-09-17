// src/utils/api.ts
import axios from "axios";
import { Video } from "../types/video"; // ✅ make sure you have Video type defined

const API = axios.create({
  baseURL: "http://localhost:4000/api", // change when deployed
});

// attach JWT if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// --- Auth APIs ---
export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const signup = (data: { name: string; email: string; password: string }) =>
  API.post("/auth/signup", data);

// --- Video APIs ---
export const uploadVideo = (formData: FormData) =>
  API.post("/videos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Map s3Url → videoUrl
export const getVideos = async (): Promise<Video[]> => {
  const { data } = await API.get("/videos");
  return data.map((video: any) => ({
    ...video,
    videoUrl: video.s3Url,
  }));
};

// ✅ Map s3Url → videoUrl for single video
export const getVideoById = async (id: string): Promise<Video> => {
  const { data } = await API.get(`/videos/${id}`);
  return {
    ...data,
    videoUrl: data.s3Url,
  };
};

export const likeVideo = (id: string) => API.post(`/videos/${id}/like`);

export const commentOnVideo = (id: string, text: string) =>
  API.post(`/videos/${id}/comments`, { text });
