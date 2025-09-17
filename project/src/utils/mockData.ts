import { Video, CreatorVideo, Comment, AIChat } from '../types';

// Mock data for demonstration purposes
export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'भारत में AI का भविष्य - Future of AI in India',
    description: 'Exploring the revolutionary impact of AI technology in India',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '12:34',
    views: 125000,
    likes: 3400,
    dislikes: 120,
    uploadDate: '2024-01-15',
    channel: {
      id: 'ch1',
      name: 'Tech India Hub',
      avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150',
      subscribers: 890000,
      verified: true
    },
    category: 'Technology',
    tags: ['AI', 'India', 'Technology', 'Future'],
    aiGenerated: {
      mood: 'Educational',
      suggestions: ['Watch next: ML in Healthcare', 'Related: Digital India']
    }
  },
  {
    id: '2',
    title: 'Mumbai Street Food Tour 2024',
    description: 'Best street food spots in Mumbai you must try',
    thumbnail: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '18:45',
    views: 89000,
    likes: 2800,
    dislikes: 45,
    uploadDate: '2024-01-12',
    channel: {
      id: 'ch2',
      name: 'Foodie Explorer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      subscribers: 456000,
      verified: true
    },
    category: 'Food & Travel',
    tags: ['Mumbai', 'Street Food', 'Travel', 'India'],
    aiGenerated: {
      mood: 'Entertaining',
      suggestions: ['Try: Delhi Food Guide', 'Similar: Indian Cuisine']
    }
  },
  {
    id: '3',
    title: 'Cricket World Cup 2024 Highlights',
    description: 'Best moments from the recent cricket matches',
    thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '25:12',
    views: 234000,
    likes: 8900,
    dislikes: 234,
    uploadDate: '2024-01-10',
    channel: {
      id: 'ch3',
      name: 'Sports Central India',
      avatar: 'https://images.pexels.com/photos/1374059/pexels-photo-1374059.jpeg?auto=compress&cs=tinysrgb&w=150',
      subscribers: 1200000,
      verified: true
    },
    category: 'Sports',
    tags: ['Cricket', 'Sports', 'India', 'Highlights'],
    aiGenerated: {
      mood: 'Exciting',
      suggestions: ['Next: IPL Updates', 'Related: Football Highlights']
    }
  }
];

export const mockCreatorVideos: CreatorVideo[] = [
  {
    ...mockVideos[0],
    status: 'published',
    analytics: {
      watchTime: 8.5,
      retention: 75,
      clickThroughRate: 12.3,
      engagement: 8.7
    },
    aiInsights: {
      suggestions: ['Add more visual elements', 'Include Hindi subtitles', 'Optimize thumbnail for mobile'],
      optimizationTips: ['Post at 7 PM IST for better reach', 'Use trending hashtags'],
      trendsAlignment: ['AI trend is growing by 23%', 'Educational content performs well']
    }
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Priya Sharma',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'Great explanation! AI will definitely transform India.',
    timestamp: '2 hours ago',
    likes: 24,
    replies: []
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Rahul Kumar',
    userAvatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'Very informative video. Looking forward to more content on this topic.',
    timestamp: '4 hours ago',
    likes: 18,
    replies: []
  }
];

export const mockAIChats: AIChat[] = [
  {
    id: '1',
    message: 'How can I improve my video engagement?',
    response: 'Based on your analytics, I suggest: 1) Add interactive polls, 2) Respond to comments within 2 hours, 3) Create compelling thumbnails with bright colors, 4) Post consistently at 7 PM IST when your audience is most active.',
    timestamp: '2024-01-15 14:30',
    type: 'suggestion'
  },
  {
    id: '2',
    message: 'What trending topics should I cover?',
    response: 'Currently trending in India: AI in Healthcare (↑45%), Sustainable Technology (↑32%), Digital Banking (↑28%). These align well with your tech-focused audience.',
    timestamp: '2024-01-15 12:15',
    type: 'analysis'
  }
];

// API simulation functions
export const fetchVideos = async (): Promise<Video[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return mockVideos;
};

export const fetchComments = async (videoId: string): Promise<Comment[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockComments;
};

export const searchVideos = async (query: string): Promise<Video[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockVideos.filter(video => 
    video.title.toLowerCase().includes(query.toLowerCase()) ||
    video.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};