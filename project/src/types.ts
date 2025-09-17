// Type definitions for the video platform
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  uploadDate: string;
  channel: {
    id: string;
    name: string;
    avatar: string;
    subscribers: number;
    verified: boolean;
  };
  category: string;
  tags: string[];
  aiGenerated: {
    mood: string;
    suggestions: string[];
  };
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

export interface CreatorVideo extends Video {
  status: 'published' | 'draft' | 'processing';
  analytics: {
    watchTime: number;
    retention: number;
    clickThroughRate: number;
    engagement: number;
  };
  aiInsights: {
    suggestions: string[];
    optimizationTips: string[];
    trendsAlignment: string[];
  };
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
}

export interface AIChat {
  id: string;
  message: string;
  response: string;
  timestamp: string;
  type: 'question' | 'suggestion' | 'analysis';
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  url?: string;
  thumbnail?: string;   // ✅ optional
  createdAt?: string;
  updatedAt?: string;
}
