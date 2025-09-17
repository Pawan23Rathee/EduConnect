import React, { useState } from 'react';
import CreatorNavbar from './CreatorNavbar';
import CreatorSidebar from './CreatorSidebar';
import Analytics from './Analytics';
import VideoUpload from './VideoUpload';
import AIAssistant from './AIAssistant';
import { BarChart3, Video, Upload, TrendingUp, Users, IndianRupee, Eye, Clock } from 'lucide-react';

interface CreatorDashboardProps {
  onModeSwitch: () => void;
}

const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ onModeSwitch }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <Analytics />;
      case 'upload':
        return <VideoUpload />;
      case 'ai-assistant':
        return <AIAssistant />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CreatorNavbar onModeSwitch={onModeSwitch} />
      
      <div className="flex">
        <CreatorSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 ml-64 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome: React.FC = () => {
  const stats = [
    { label: 'Total Views', value: '1.25M', change: '+12.5%', icon: Eye, color: 'blue' },
    { label: 'Watch Time', value: '8.5K hrs', change: '+8.2%', icon: Clock, color: 'green' },
    { label: 'Subscribers', value: '89K', change: '+15.3%', icon: Users, color: 'purple' },
    { label: 'Revenue', value: '₹45K', change: '+22.1%', icon: IndianRupee, color: 'orange' },
  ];

  const recentVideos = [
    { title: 'भारत में AI का भविष्य', views: 125000, status: 'Published', thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { title: 'Mumbai Street Food Tour', views: 89000, status: 'Published', thumbnail: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { title: 'Tech Startups Guide', views: 45000, status: 'Processing', thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150' },
  ];

  const formatNumber = (num: number) => {
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Creator!</h1>
          <p className="text-lg opacity-90 mb-6">Here's how your channel is performing today</p>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
              📈 Views up 12% this week
            </div>
            <div className="px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
              🤖 3 new AI insights available
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Videos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Videos</h2>
              <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {recentVideos.map((video, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {video.title}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{formatNumber(video.views)} views</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      video.status === 'Published' 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {video.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              🤖 AI Recommendations
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
              <h3 className="font-medium text-indigo-900 dark:text-indigo-300 mb-2">
                Optimal Upload Time
              </h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-400">
                Post your next video at 7 PM IST for 23% better engagement with your Indian audience.
              </p>
            </div>
            
            <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h3 className="font-medium text-green-900 dark:text-green-300 mb-2">
                Content Suggestion
              </h3>
              <p className="text-sm text-green-700 dark:text-green-400">
                AI in Healthcare videos are trending +45%. Consider creating content in this niche.
              </p>
            </div>
            
            <div className="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <h3 className="font-medium text-purple-900 dark:text-purple-300 mb-2">
                Audience Insight
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                68% of your viewers prefer Hindi subtitles. Enable auto-captions for better reach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;