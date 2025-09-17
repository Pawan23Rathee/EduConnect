import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Music, 
  Film, 
  Gamepad2, 
  Newspaper, 
  Trophy, 
  Sparkles,
  Heart,
  Clock,
  ThumbsUp,
  Settings,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, selectedCategory, onCategorySelect }) => {
  const navigate = useNavigate(); // ← added

  const mainItems = [
    { id: 'home', label: 'Home', icon: Home, route: '/home' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, route: '/trending' },
    { id: 'music', label: 'Music', icon: Music, route: '/music' },
    { id: 'movies', label: 'Movies', icon: Film, route: '/movies' },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2, route: '/gaming' },
    { id: 'news', label: 'News', icon: Newspaper, route: '/news' },
    { id: 'sports', label: 'Sports', icon: Trophy, route: '/sports' },
  ];

  const aiItems = [
    { id: 'ai-picks', label: 'AI Picks for You', icon: Sparkles, route: '/ai-picks' },
    { id: 'mood-based', label: 'Mood-based Videos', icon: Heart, route: '/mood' },
  ];

  const libraryItems = [
    { id: 'watch-later', label: 'Watch Later', icon: Clock, route: '/watch-later' },
    { id: 'liked-videos', label: 'Liked Videos', icon: ThumbsUp, route: '/liked-videos' },
  ];

  const settingsItems = [
    { id: 'settings', label: 'Settings', icon: Settings, route: '/settings' },
    { id: 'help', label: 'Help', icon: HelpCircle, route: '/help' },
  ];

  const handleClick = (item: any) => {
    onCategorySelect(item.id); // still update selected state
    if (item.route) navigate(item.route); // ← navigate to route
  };

  const renderMenuItem = (item: any) => (
    <button
      key={item.id}
      onClick={() => handleClick(item)}
      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
        selectedCategory === item.id
          ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <item.icon className="w-5 h-5 flex-shrink-0" />
      <span className={`font-medium ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {item.label}
      </span>
    </button>
  );

  return (
    <aside className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-16 lg:w-64'
    } fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40`}>
      <div className="p-4 space-y-6">
        <div className="space-y-1">
          {mainItems.map((item) => renderMenuItem(item))}
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        <div className="space-y-3">
          <h3 className={`text-sm font-semibold text-gray-500 dark:text-gray-400 px-4 ${
            isOpen ? 'block' : 'hidden lg:block'
          }`}>🤖 AI-Powered</h3>
          <div className="space-y-1">
            {aiItems.map((item) => renderMenuItem(item))}
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        <div className="space-y-3">
          <h3 className={`text-sm font-semibold text-gray-500 dark:text-gray-400 px-4 ${
            isOpen ? 'block' : 'hidden lg:block'
          }`}>Library</h3>
          <div className="space-y-1">
            {libraryItems.map((item) => renderMenuItem(item))}
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        <div className="space-y-1">
          {settingsItems.map((item) => renderMenuItem(item))}
        </div>

        {/* Mood Prompt Section */}
        <div className={`bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 ${
          isOpen ? 'block' : 'hidden lg:block'
        }`}>
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Mood Prompt</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            How are you feeling today?
          </p>
          <div className="space-y-2">
            {['😊 Happy', '😌 Relaxed', '🎯 Focused', '🎉 Excited'].map((mood) => (
              <button
                key={mood}
                onClick={() => handleClick({ id: `mood-${mood.split(' ')[1].toLowerCase()}`, route: `/mood/${mood.split(' ')[1].toLowerCase()}` })}
                className="w-full text-left px-3 py-2 text-sm bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <div className={`text-xs text-gray-500 dark:text-gray-400 px-4 pb-4 ${
          isOpen ? 'block' : 'hidden lg:block'
        }`}>
          <p>© 2024 VideoIndia</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
