import React from 'react';
import { GraduationCap, Sparkles, Building, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import sbCollegeImg from '../assets/images/college/sb-college.jpg';

export default function About() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Page Header */}
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white py-16 sm:py-20 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-dots-dark opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-academic-600/80 text-white border border-academic-400/40">
              Department of Computer Applications
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              About <span className="text-gradient">MCA Programme</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Master of Computer Applications (MCA) at St. Berchmans College, Changanassery, Kerala.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Factual Information Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-academic-50 text-academic-700 border border-academic-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Programme Inception: 2026
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
              The First MCA Batch at <br />
              <span className="text-gradient">St. Berchmans College</span>
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                The Master of Computer Applications programme at St. Berchmans College, Changanassery, began in <strong>2026</strong>. The <strong>MCA Batch 2026–2028</strong> represents the first batch of the programme.
              </p>
              
              <p>
                The department is headed by <strong>Smitha</strong>, Head of Department. Situated in the historic town of Changanassery, Kerala, St. Berchmans College introduces this postgraduate degree to nurture young scholars in computer applications.
              </p>
            </div>

            {/* Confirmed Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Institution
                </span>
                <p className="text-sm font-bold text-navy-900">St. Berchmans College</p>
                <p className="text-xs text-slate-500">Changanassery, Kerala</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Programme
                </span>
                <p className="text-sm font-bold text-navy-900">Master of Computer Applications (MCA)</p>
                <p className="text-xs text-slate-500">Started in 2026</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Inaugural Batch
                </span>
                <p className="text-sm font-bold text-navy-900">Batch 2026–2028</p>
                <p className="text-xs text-slate-500">First MCA Batch</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Department Head
                </span>
                <p className="text-sm font-bold text-navy-900">Smitha</p>
                <p className="text-xs text-slate-500">Head of Department</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/faculty"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-academic-600 hover:bg-academic-700 transition-colors shadow-sm"
              >
                <span>Department Faculty</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/students"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-navy-900 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>First Batch Students</span>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-navy-950">
              <img 
                src={sbCollegeImg} 
                alt="St. Berchmans College Campus, Changanassery" 
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="p-5 bg-white border-t border-slate-100 text-center">
                <h3 className="font-bold text-navy-900 font-display text-base">
                  St. Berchmans College
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Changanassery, Kottayam, Kerala 686101
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
