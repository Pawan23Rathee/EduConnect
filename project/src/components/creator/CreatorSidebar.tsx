import React from 'react';
import { 
  LayoutDashboard, 
  Video, 
  BarChart3, 
  MessageCircle, 
  DollarSign, 
  Upload, 
  Settings,
  Bot,
  TrendingUp,
  Users
} from 'lucide-react';

interface CreatorSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CreatorSidebar: React.FC<CreatorSidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'comments', label: 'Comments', icon: MessageCircle },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'monetization', label: 'Monetization', icon: DollarSign },
  ];

  const aiItems = [
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'trends', label: 'Trending Topics', icon: TrendingUp },
    { id: 'audience', label: 'Audience Insights', icon: Users },
  ];

  const renderMenuItem = (item: any) => (
    <button
      key={item.id}
      onClick={() => onTabChange(item.id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        activeTab === item.id
          ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
        activeTab === item.id
          ? 'text-indigo-600 dark:text-indigo-400'
          : 'text-gray-500 dark:text-gray-400'
      }`} />
      <span className="font-medium">{item.label}</span>
    </button>
  );

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40">
      <div className="p-4 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          {menuItems.map((item) => renderMenuItem(item))}
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* AI Tools */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-4">
            🤖 AI Tools
          </h3>
          <div className="space-y-1">
            {aiItems.map((item) => renderMenuItem(item))}
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Settings */}
        <div className="space-y-1">
          {renderMenuItem({ id: 'settings', label: 'Settings', icon: Settings })}
        </div>

        {/* Creator tip */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Bot className="w-5 h-5 text-indigo-500" />
            <h4 className="font-semibold text-gray-900 dark:text-white">AI Tip</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Upload consistently at 7 PM IST for 23% better engagement with your Indian audience.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default CreatorSidebar;