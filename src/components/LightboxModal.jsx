import React, { useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Download 
} from 'lucide-react';

export default function LightboxModal({ 
  images, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev 
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (currentIndex === null || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 backdrop-blur-xl p-4 sm:p-6 animate-fadeIn select-none"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-academic-600/80 text-white border border-academic-400/40">
            {currentImage.category}
          </span>
          <span className="text-xs text-slate-300 font-mono">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors border border-slate-700 shadow"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-slate-800/80 hover:bg-academic-600 text-white transition-all duration-200 border border-slate-700 shadow-lg hover:scale-110"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-slate-800/80 hover:bg-academic-600 text-white transition-all duration-200 border border-slate-700 shadow-lg hover:scale-110"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Stage */}
      <div 
        className="relative max-w-5xl max-h-[80vh] flex flex-col items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={currentImage.image} 
          alt={currentImage.title}
          className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-slate-800"
        />

        {/* Caption */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <h3 className="text-base sm:text-lg font-bold text-white font-display">
            {currentImage.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            {currentImage.description}
          </p>
        </div>
      </div>

    </div>
  );
}

