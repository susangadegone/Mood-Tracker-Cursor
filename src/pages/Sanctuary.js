import React, { useState, useEffect } from 'react';
import { Plus, Play, Trash2, X, Music } from 'lucide-react';
import { getMediaLibrary, saveVideo, deleteVideo, updateVideoPlayCount } from '../utils/storage';

const Sanctuary = () => {
  const [library, setLibrary] = useState({ videos: [], categories: [] });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState('');
  const [newVideoNotes, setNewVideoNotes] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const data = getMediaLibrary();
    setLibrary(data);
    if (data.categories.length > 0) {
      setNewVideoCategory(data.categories[0].id);
    }
  }, []);

  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAddVideo = async () => {
    const youtubeId = extractYouTubeId(newVideoUrl);
    
    if (!youtubeId) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    const newVideo = {
      youtubeId,
      title: `Video ${library.videos.length + 1}`,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`,
      category: newVideoCategory,
      notes: newVideoNotes,
    };

    const saved = saveVideo(newVideo);
    setLibrary(prev => ({
      ...prev,
      videos: [...prev.videos, saved]
    }));

    setNewVideoUrl('');
    setNewVideoNotes('');
    setShowAddModal(false);
  };

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
    setShowPlayer(true);
    updateVideoPlayCount(video.id);
  };

  const handleDeleteVideo = (videoId) => {
    if (window.confirm('Remove this video from your sanctuary?')) {
      deleteVideo(videoId);
      setLibrary(prev => ({
        ...prev,
        videos: prev.videos.filter(v => v.id !== videoId)
      }));
    }
  };

  const filteredVideos = filterCategory === 'all' 
    ? library.videos 
    : library.videos.filter(v => v.category === filterCategory);

  const getCategoryName = (catId) => {
    const cat = library.categories.find(c => c.id === catId);
    return cat ? cat.name : catId;
  };

  return (
    <div className="min-h-screen px-4 py-8 pb-28 relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 fade-in">
          <div className="flex-shrink-0 w-11 h-11 bg-primary-600 rounded-xl flex items-center justify-center">
            <Music className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-sage-900 tracking-tight">My Sanctuary</h1>
            <p className="text-sm text-sage-600">Your personal comfort content library</p>
          </div>
        </div>

        {/* Add Content Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Content</span>
        </button>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-6 py-3 rounded-spa text-sm font-semibold transition-all duration-300 ${
              filterCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-sage-300 text-sage-600 hover:bg-sage-50'
            }`}
          >
            All
          </button>
          {library.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-6 py-3 rounded-spa text-sm font-semibold transition-all duration-300 ${
                filterCategory === cat.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-sage-300 text-sage-600 hover:bg-sage-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="card text-center py-12">
            <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No content yet</h3>
            <p className="text-text-secondary mb-6">Start building your sanctuary by adding videos that bring you comfort</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>Add Your First Video</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video) => (
              <div key={video.id} className="card p-0 overflow-hidden group">
                <div className="relative aspect-video bg-gray-200 cursor-pointer" onClick={() => handlePlayVideo(video)}>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="text-xs bg-black bg-opacity-75 text-white px-2 py-1 rounded">
                      {getCategoryName(video.category)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-text-primary text-sm mb-1 line-clamp-2">{video.title}</h3>
                  <p className="text-xs text-text-secondary mb-3">{getCategoryName(video.category)}</p>
                  {video.notes && (
                    <p className="text-xs text-text-secondary mb-3 line-clamp-2">{video.notes}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">Played {video.playCount || 0} times</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteVideo(video.id);
                      }}
                      className="p-1 text-text-secondary hover:text-danger transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Video Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-spa-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Add Content</h2>
                <button onClick={() => setShowAddModal(false)} className="text-text-secondary hover:text-text-primary">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="text"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="input-field"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-text-secondary mt-1">Paste a YouTube video link</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Category
                  </label>
                  <select
                    value={newVideoCategory}
                    onChange={(e) => setNewVideoCategory(e.target.value)}
                    className="input-field"
                  >
                    {library.categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={newVideoNotes}
                    onChange={(e) => setNewVideoNotes(e.target.value)}
                    className="input-field h-20 resize-none"
                    placeholder="Why is this video meaningful to you?"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleAddVideo}
                    className="flex-1 btn-primary"
                  >
                    Add Video
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        {showPlayer && selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-spa-lg p-4 max-w-4xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">{selectedVideo.title}</h2>
                <button 
                  onClick={() => {
                    setShowPlayer(false);
                    setSelectedVideo(null);
                  }} 
                  className="text-text-secondary hover:text-text-primary"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="aspect-video bg-black rounded-spa overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {selectedVideo.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-spa">
                  <p className="text-sm text-text-primary">{selectedVideo.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sanctuary;

