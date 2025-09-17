import React, { useState } from 'react';
import { Upload, Film, Wand2, Eye, Tag, FileText, Image, Sparkles } from 'lucide-react';

const VideoUpload: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDetails, setVideoDetails] = useState({
    title: '',
    description: '',
    tags: '',
    category: 'technology',
    visibility: 'public',
    thumbnail: null as File | null
  });

  // AI-generated suggestions
  const [aiSuggestions, setAiSuggestions] = useState({
    titles: [
      'भारत में AI का भविष्य - Complete Guide 2024',
      'Future of Artificial Intelligence in India',
      'AI Revolution: How India is Leading the Change'
    ],
    descriptions: [
      'Discover how AI is transforming India across healthcare, education, and business sectors. Get insights into the latest trends and opportunities.',
      'A comprehensive look at India\'s AI journey, featuring expert interviews and real-world applications that are changing millions of lives.',
      'From startups to government initiatives, explore how artificial intelligence is reshaping India\'s digital landscape.'
    ],
    tags: ['AI', 'India', 'Technology', 'Future', 'Digital India', 'Machine Learning', 'Innovation'],
    thumbnails: [
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400'
    ]
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const generateAISuggestions = () => {
    // Simulate AI processing
    console.log('Generating AI suggestions for:', videoFile?.name);
    // In a real app, this would call an AI service
  };

  const applySuggestion = (type: string, suggestion: string) => {
    if (type === 'title') {
      setVideoDetails(prev => ({ ...prev, title: suggestion }));
    } else if (type === 'description') {
      setVideoDetails(prev => ({ ...prev, description: suggestion }));
    } else if (type === 'tags') {
      setVideoDetails(prev => ({ ...prev, tags: suggestion }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Video</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Upload your content and let AI help optimize it for your Indian audience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Upload Video File
              </h2>
              
              {!videoFile ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors duration-200">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Drop your video here
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Or click to browse files
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    <Film className="w-5 h-5 mr-2" />
                    Choose File
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    MP4, MOV, AVI up to 2GB
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Film className="w-8 h-8 text-indigo-500" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {videoFile.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Uploading...</span>
                        <span className="text-gray-600 dark:text-gray-400">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {uploadProgress === 100 && !isUploading && (
                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                      <div className="w-5 h-5 bg-green-600 dark:bg-green-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="font-medium">Upload complete!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Video Details Form */}
          {videoFile && uploadProgress === 100 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Video Details
                  </h2>
                  <button
                    onClick={generateAISuggestions}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>AI Enhance</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <textarea
                      value={videoDetails.title}
                      onChange={(e) => setVideoDetails(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter your video title..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      rows={2}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {100 - videoDetails.title.length} characters remaining
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={videoDetails.description}
                      onChange={(e) => setVideoDetails(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Tell viewers about your video..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      rows={6}
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={videoDetails.tags}
                      onChange={(e) => setVideoDetails(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="Add tags separated by commas..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  {/* Category and Visibility */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={videoDetails.category}
                        onChange={(e) => setVideoDetails(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="technology">Technology</option>
                        <option value="education">Education</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="music">Music</option>
                        <option value="sports">Sports</option>
                        <option value="news">News</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Visibility
                      </label>
                      <select
                        value={videoDetails.visibility}
                        onChange={(e) => setVideoDetails(prev => ({ ...prev, visibility: e.target.value }))}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="public">Public</option>
                        <option value="unlisted">Unlisted</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>

                  {/* Publish Button */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      Save as Draft
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105">
                      Publish Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Suggestions Sidebar */}
        <div className="space-y-6">
          {/* AI Title Suggestions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
                AI Title Suggestions
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {aiSuggestions.titles.map((title, index) => (
                <button
                  key={index}
                  onClick={() => applySuggestion('title', title)}
                  className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {title}
                    </p>
                    <FileText className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 flex-shrink-0 ml-2" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Thumbnail Suggestions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                <Image className="w-5 h-5 text-purple-500 mr-2" />
                AI Thumbnail Ideas
              </h3>
            </div>
            <div className="p-4 grid grid-cols-1 gap-3">
              {aiSuggestions.thumbnails.map((thumbnail, index) => (
                <button
                  key={index}
                  className="relative group overflow-hidden rounded-lg"
                >
                  <img
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-colors duration-200 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Tag Suggestions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                <Tag className="w-5 h-5 text-purple-500 mr-2" />
                Trending Tags
              </h3>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.tags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => applySuggestion('tags', videoDetails.tags ? `${videoDetails.tags}, ${tag}` : tag)}
                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-900/40 transition-colors duration-200"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;