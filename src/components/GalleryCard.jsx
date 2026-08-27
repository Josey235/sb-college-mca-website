import React from 'react';
import { Maximize2 } from 'lucide-react';

export default function GalleryCard({ item, onOpen }) {
  return (
    <div 
      className="group relative rounded-2xl overflow-hidden bg-navy-950 border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer h-64 sm:h-72"
      onClick={() => onOpen(item)}
    >
      {/* Gallery Image */}
      <img 
        src={item.image} 
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        loading="lazy"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Top Category Badge */}
      <div className="absolute top-3 left-3">
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-navy-900/90 text-academic-300 border border-academic-500/30 backdrop-blur-md">
          {item.category}
        </span>
      </div>

      {/* Zoom Icon Button on Hover */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 rounded-full bg-academic-600/90 text-white flex items-center justify-center shadow-lg backdrop-blur-md">
          <Maximize2 className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Title & Description */}
      <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <h4 className="text-sm sm:text-base font-bold text-white font-display line-clamp-1 group-hover:text-academic-300 transition-colors">
          {item.title}
        </h4>
        <p className="text-xs text-slate-300 mt-1 line-clamp-2 opacity-90">
          {item.description}
        </p>
      </div>

    </div>
  );
}

