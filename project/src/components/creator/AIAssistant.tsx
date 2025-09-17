import React, { useState } from 'react';
import { Bot, Send, Lightbulb, TrendingUp, Users } from 'lucide-react';
import { mockAIChats } from '../../utils/mockData';
import { AIChat } from '../../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<AIChat[]>(mockAIChats);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "How can I improve my video engagement?",
    "What are the trending topics in India?",
    "When is the best time to upload?",
    "How to optimize for mobile viewers?",
    "What tags should I use for tech videos?",
    "How to increase watch time?"
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = newMessage;
    setNewMessage('');
    setIsTyping(true);

    // Add user message
    const newUserMessage: AIChat = {
      id: Date.now().toString(),
      message: userMessage,
      response: '',
      timestamp: new Date().toISOString(),
      type: 'question'
    };

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      const aiMessage: AIChat = {
        id: (Date.now() + 1).toString(),
        message: userMessage,
        response: aiResponse,
        timestamp: new Date().toISOString(),
        type: 'suggestion'
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (question: string): string => {
    const responses: { [key: string]: string } = {
      'engagement': 'Based on your analytics, I recommend: 1) Ask questions in your videos to encourage comments, 2) Use Indian cultural references your audience relates to, 3) Reply to comments within 2-3 hours, 4) Create polls and community posts, 5) Add subtitles in Hindi and English.',
      'trending': 'Current trending topics in Indian tech space: AI in Agriculture (↑67%), Digital Banking Security (↑45%), EdTech Solutions (↑38%), Smart City Initiatives (↑29%). These align well with your content style.',
      'upload time': 'For Indian audiences, optimal upload times are: 6-8 PM IST (peak engagement), especially Tuesday-Thursday. Your analytics show 34% higher engagement during these windows.',
      'mobile': 'Mobile optimization tips: 1) Use vertical thumbnails for mobile feeds, 2) Keep titles under 60 characters, 3) Add captions for mobile users, 4) Optimize for 4G speeds, 5) Use larger text and clear visuals.',
      'tags': 'Recommended tags for tech content in India: #TechIndia, #DigitalIndia, #AIInnovation, #TechTrends, #IndianTech, #Startups, #Innovation, #FutureTech. Mix English and Hindi tags for broader reach.',
      'watch time': 'To increase watch time: 1) Hook viewers in first 15 seconds, 2) Use pattern interrupts every 30-45 seconds, 3) Create chapter timestamps, 4) End with cliffhangers for series content, 5) Use Indian storytelling techniques.'
    };

    const lowerQuestion = question.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }

    return "I'd be happy to help you grow your channel! Based on your content and Indian audience, I can provide specific recommendations for engagement, timing, content strategy, and optimization. What specific aspect would you like to focus on?";
  };

  const handleQuickQuestion = (question: string) => {
    setNewMessage(question);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Get personalized recommendations to grow your channel in India
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">VideoIndia AI</h3>
                <p className="text-sm text-green-600 dark:text-green-400">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Welcome message */}
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-gray-900 dark:text-white">
                      नमस्ते! I'm your AI assistant specialized in helping Indian creators grow their channels. 
                      Ask me anything about content strategy, optimization, or audience engagement!
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              {messages.map((chat) => (
                <div key={chat.id} className="space-y-3">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-indigo-600 text-white rounded-lg p-3 max-w-xs lg:max-w-md">
                      <p>{chat.message}</p>
                    </div>
                  </div>
                  
                  {/* AI response */}
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-gray-900 dark:text-white whitespace-pre-line">
                          {chat.response}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask me anything about growing your channel..."
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isTyping}
                  className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                Quick Questions
              </h3>
            </div>
            <div className="p-4 space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left p-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                Today's Insights
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  📈 Peak Time Alert
                </p>
                <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                  Upload in next 2 hours for optimal reach
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  🎯 Content Tip
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                  AI tech content is trending +45% in India
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                  👥 Audience Update
                </p>
                <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">
                  68% of viewers prefer Hindi subtitles
                </p>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                <Users className="w-5 h-5 text-indigo-500 mr-2" />
                Quick Stats
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                <span className="font-medium text-gray-900 dark:text-white">+12.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Engagement</span>
                <span className="font-medium text-gray-900 dark:text-white">8.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Watch Time</span>
                <span className="font-medium text-gray-900 dark:text-white">7.2 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;