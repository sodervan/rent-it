import { Loader2, Zap } from "lucide-react";

// Option 1: Minimalist Spinner
const FullscreenLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-60 z-[9999] backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader2
          className="text-white animate-spin"
          size={64}
          strokeWidth={2}
        />
        {/*<p className="text-white text-lg font-medium tracking-wide">*/}
        {/*  Loading...*/}
        {/*</p>*/}
      </div>
    </div>
  );
};

// Option 2: Branded Loader with Progress Indication
const BrandedFullscreenLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primaryPurple to-purple-600 z-[9999]">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <Zap
            className="text-white animate-pulse"
            size={80}
            strokeWidth={1.5}
          />
          <div className="absolute inset-0 animate-ping bg-white/30 rounded-full"></div>
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-white">RentIT</h2>
          <p className="text-white/80 tracking-wide">
            Preparing your experience...
          </p>
        </div>
        <div className="w-48 h-1 bg-white/30 overflow-hidden">
          <div className="h-full bg-white animate-progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

// Option 3: Minimalist Dots Loader
const DotsLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] backdrop-blur-sm">
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
        <span className="text-white ml-2 tracking-wide">Loading</span>
      </div>
    </div>
  );
};

// Optional: Add custom Tailwind animation for progress bar
const tailwindConfig = {
  theme: {
    extend: {
      animation: {
        "progress-bar":
          "progressBar 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        progressBar: {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(0)" },
        },
      },
    },
  },
};

export { FullscreenLoader, BrandedFullscreenLoader, DotsLoader };
