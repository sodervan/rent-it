import React, { useState, useEffect } from "react";
import { Play, X, Volume2, VolumeX } from "lucide-react";

const VideoModal = ({ videos, open, onClose }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Handle modal visibility with animation
  useEffect(() => {
    if (open) {
      // Small delay to trigger animation
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [open]);

  // Handle modal close after animation
  const handleTransitionEnd = () => {
    if (!isVisible) {
      setSelectedVideo(null);
      setIsPlaying(false);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (!open) {
      setSelectedVideo(null);
      setIsPlaying(false);
      setLoading(true);
    }
  }, [open]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    setLoading(true);
  };

  const handleCloseVideo = (e) => {
    e.stopPropagation();
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const handleVideoLoad = () => {
    setLoading(false);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[50000] transition-all duration-300 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0"}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div
        className={`relative w-full h-full transform transition-transform duration-300 ease-in-out
          ${isVisible ? "scale-100" : "scale-95"}`}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
          <h2 className="text-white text-xl font-semibold">
            {selectedVideo ? "Now Playing" : "Video Gallery"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Main Content */}
        <div className="h-full flex items-center justify-center p-4">
          {selectedVideo ? (
            // Video Player
            <div
              className={`relative w-full max-w-6xl aspect-video transform transition-all duration-300 ease-in-out
                ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
              <video
                key={selectedVideo.videoUrl}
                src={selectedVideo.videoUrl}
                className="w-full h-full rounded-lg shadow-2xl"
                controls
                autoPlay
                muted={isMuted}
                onLoadedData={handleVideoLoad}
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6 text-white" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-white" />
                  )}
                </button>
                <button
                  onClick={handleCloseVideo}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          ) : (
            // Video Grid
            <div
              className={`w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr transform transition-all duration-300 ease-in-out
                ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
              {videos.map((video, index) => (
                <div
                  key={index}
                  onClick={() => handleVideoClick(video)}
                  className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-900 aspect-video"
                >
                  <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    muted
                    playsInline
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2">
                        <Play className="w-6 h-6 text-white" />
                        <span className="text-white text-sm font-medium">
                          Play Video
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
