import React from 'react';
import { Code, Sparkles, Layers, Info } from 'lucide-react';

export default function Projects() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white py-16 sm:py-20 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-dots-dark opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-academic-600/80 text-white border border-academic-400/40">
              Department Projects
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              Student <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Software engineering, research applications, and technical prototypes by the MCA Batch 2026–2028.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Placeholder Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-academic-50 text-academic-600 mx-auto flex items-center justify-center border border-academic-100">
            <Code className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
              Projects Will Be Added Soon
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
              The MCA programme at St. Berchmans College commenced in 2026. Student projects, capstones, and software showcases for the <strong>MCA Batch 2026–2028</strong> will be documented and featured here as the semester progresses.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-xs text-slate-500">
            <span>First MCA Batch (2026–2028) • St. Berchmans College, Changanassery</span>
          </div>
        </div>

      </div>

    </div>
  );
}
