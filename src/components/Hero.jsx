import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, Sparkles, BookOpen, Users } from 'lucide-react';
import sbCollegeImg from '../assets/images/college/sb-college.jpg';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-navy-800">
      
      {/* Background Decorative Tech Grid */}
      <div className="absolute inset-0 bg-dots-dark opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-academic-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Required Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-academic-500/20 text-academic-300 border border-academic-400/30">
                <GraduationCap className="w-3.5 h-3.5 text-academic-300" />
                St. Berchmans College, Changanassery
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                FIRST MCA BATCH (2026–2028)
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-tight text-white">
                MASTER OF <br />
                <span className="text-gradient">COMPUTER APPLICATIONS</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-academic-200 font-medium tracking-wide">
                Where our first MCA journey begins.
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              The Master of Computer Applications (MCA) programme at St. Berchmans College, Changanassery commenced in 2026. The inaugural <strong>MCA Batch 2026–2028</strong> marks the beginning of an exciting chapter in postgraduate computing education at SB College.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/students"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-navy-950 bg-white hover:bg-slate-100 transition-all duration-200 shadow-md hover:shadow-lg active:scale-98"
              >
                <Users className="w-4 h-4 text-academic-600" />
                <span>Meet Our Students</span>
                <ArrowRight className="w-4 h-4 text-navy-900" />
              </Link>

              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-200 hover:text-white bg-navy-800/90 hover:bg-navy-700/90 border border-navy-700 transition-all duration-200"
              >
                <BookOpen className="w-4 h-4 text-academic-400" />
                <span>Explore MCA Programme</span>
              </Link>
            </div>

            {/* Batch Info Pill */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Inaugural Batch: 2026–2028</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-academic-400"></span>
                <span>Changanassery, Kerala</span>
              </span>
            </div>

          </div>

          {/* Right Column: Local College Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-academic-500/30 to-amber-500/20 blur-xl opacity-70"></div>

              {/* College Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/90 bg-navy-950">
                <img 
                  src={sbCollegeImg} 
                  alt="St. Berchmans College Campus, Changanassery"
                  className="w-full h-72 sm:h-96 object-cover object-center"
                />
                
                {/* Overlay Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-academic-600 text-white w-fit shadow">
                    SB College Campus
                  </span>
                  <h2 className="text-base sm:text-lg font-bold font-display mt-1 text-white">
                    St. Berchmans College
                  </h2>
                  <p className="text-xs text-slate-300">
                    Changanassery, Kottayam, Kerala
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
