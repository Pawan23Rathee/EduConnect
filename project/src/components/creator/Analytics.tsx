import React from 'react';
import { Eye, Clock, ThumbsUp, MessageCircle, TrendingUp, Users, IndianRupee } from 'lucide-react';
import LoadingSkeleton from '../shared/LoadingSkeleton';

interface AnalyticsProps {
  loading?: boolean;
}

const Analytics: React.FC<AnalyticsProps> = ({ loading = false }) => {
  const analyticsData = {
    overview: {
      totalViews: 1250000,
      watchTime: 8500,
      subscribers: 89000,
      revenue: 45000
    },
    recentPerformance: [
      { metric: 'Views', value: '125K', change: '+12.5%', trend: 'up' },
      { metric: 'Watch Time', value: '8.5K hrs', change: '+8.2%', trend: 'up' },
      { metric: 'Engagement', value: '7.3%', change: '-2.1%', trend: 'down' },
      { metric: 'CTR', value: '12.8%', change: '+3.4%', trend: 'up' },
    ]
  };

  const topVideos = [
    { title: 'भारत में AI का भविष्य', views: 245000, engagement: 8.5, thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { title: 'Mumbai Street Food Tour', views: 189000, engagement: 7.2, thumbnail: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=150' },
    { title: 'Tech Startups in India', views: 156000, engagement: 6.8, thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150' },
  ];

  const aiInsights = [
    {
      type: 'optimization',
      title: 'Upload Time Optimization',
      description: 'Your videos perform 23% better when posted at 7 PM IST',
      impact: 'High'
    },
    {
      type: 'content',
      title: 'Content Suggestion',
      description: 'AI videos are trending +45% in your niche. Consider creating more tech content.',
      impact: 'Medium'
    },
    {
      type: 'audience',
      title: 'Audience Insight',
      description: '68% of your viewers are from metros. Tailor content for urban audience.',
      impact: 'High'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (loading) {
    return <LoadingSkeleton type="analytics" />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your channel's performance and get AI-powered insights
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.totalViews)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Watch Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.watchTime)}h
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Subscribers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(analyticsData.overview.subscribers)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹{formatNumber(analyticsData.overview.revenue)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <IndianRupee className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Performance</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Last 28 days</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analyticsData.recentPerformance.map((item, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.metric}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{item.value}</p>
                <div className={`flex items-center justify-center space-x-1 mt-1 ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${item.trend === 'down' ? 'transform rotate-180' : ''}`} />
                  <span className="text-sm font-medium">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performing Videos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Performing Videos</h2>
          </div>
          <div className="p-6 space-y-4">
            {topVideos.map((video, index) => (
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
                    <span>{video.engagement}% engagement</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              🤖 AI Insights
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {insight.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    insight.impact === 'High' 
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {insight.impact}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;