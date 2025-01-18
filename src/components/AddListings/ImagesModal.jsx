import React, { useState, useEffect, useMemo } from "react";
import { X, ZoomIn, Download, ChevronLeft, ChevronRight } from "lucide-react";

const ImageModal = ({ images, open, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Extract unique categories from images
  const categories = useMemo(() => {
    const uniqueTags = new Set(images.map((image) => image.tag?.name));
    return ["all", ...Array.from(uniqueTags)];
  }, [images]);

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") return images;
    return images.filter((image) => image.tag?.name === selectedCategory);
  }, [images, selectedCategory]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [open]);

  const handleTransitionEnd = () => {
    if (!isVisible) {
      setSelectedImage(null);
      setIsZoomed(false);
      setLoading(true);
    }
  };

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setLoading(true);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const nextIndex = (selectedIndex + 1) % filteredImages.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
    setLoading(true);
    setIsZoomed(false);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    const prevIndex =
      selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1;
    setSelectedIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
    setLoading(true);
    setIsZoomed(false);
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
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
        <div className="absolute top-0 left-0 right-0 z-50 flex flex-col gap-4 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-xl font-semibold">
              {selectedImage
                ? `Image ${selectedIndex + 1} of ${filteredImages.length}`
                : "Image Gallery"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Category Filter */}
          {!selectedImage && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap
                    ${
                      selectedCategory === category
                        ? "bg-white text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="h-full flex items-center justify-center p-4">
          {selectedImage ? (
            // Image Viewer
            <div
              className={`relative w-full h-full flex items-center justify-center transform transition-all duration-300 ease-in-out
                ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
              <img
                src={selectedImage?.cloudinaryUrl}
                alt={selectedImage?.alt || `Image ${selectedIndex + 1}`}
                className={`max-h-full max-w-full object-contain transition-transform duration-300 cursor-zoom-in
                  ${isZoomed ? "scale-150" : "scale-100"}`}
                onLoad={handleImageLoad}
                onClick={toggleZoom}
              />

              {/* Navigation Controls */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Image Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={toggleZoom}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <ZoomIn className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() =>
                    window.open(selectedImage.cloudinaryUrl, "_blank")
                  }
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <Download className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          ) : (
            // Image Grid
            <div
              className={`w-full max-w-7xl pt-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr transform transition-all duration-300 ease-in-out
                ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleImageClick(image, index)}
                  className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-900 aspect-square"
                >
                  <img
                    src={image?.cloudinaryUrl}
                    alt={image?.alt || `Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2">
                        <ZoomIn className="w-6 h-6 text-white" />
                        <span className="text-white text-sm font-medium">
                          View Image
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

export default ImageModal;
