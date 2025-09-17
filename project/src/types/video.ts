// src/types/video.ts

export interface Video {
  _id: string;          // database id
  title: string;        // video title
  description: string;  // description
  videoUrl: string;     // actual video file ka URL (AWS S3 ya backend)
  thumbnailUrl: string; // thumbnail image ka URL
  views: number;        // views count
  createdAt: string;    // upload date
  uploader: {
    _id: string;
    name: string;
    avatarUrl?: string;
  };
}
