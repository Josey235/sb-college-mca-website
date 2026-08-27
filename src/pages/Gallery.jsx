import React from 'react';
import { Images, Sparkles } from 'lucide-react';
import sbCollegeImg from '../assets/images/college/sb-college.jpg';

export default function Gallery() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white py-16 sm:py-20 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-dots-dark opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-academic-600/80 text-white border border-academic-400/40">
              Visual Archives
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              Department <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Photographs of St. Berchmans College and Department of Computer Applications.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Prominent Real Campus Image */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
          <div className="rounded-2xl overflow-hidden shadow-sm bg-navy-950 border border-slate-200">
            <img 
              src={sbCollegeImg} 
              alt="St. Berchmans College Campus, Changanassery" 
              className="w-full h-80 sm:h-96 object-cover object-center"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-bold text-navy-900 font-display">
              St. Berchmans College Campus
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Changanassery, Kottayam District, Kerala 686101
            </p>
          </div>
        </div>

        {/* Empty State Notice */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-academic-50 text-academic-600 mx-auto flex items-center justify-center border border-academic-100">
            <Images className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-navy-900 font-display">
              MCA Gallery Will Be Updated Soon
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Photographs of departmental activities, lab sessions, and student moments for the inaugural <strong>Batch 2026–2028</strong> will be added here.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
