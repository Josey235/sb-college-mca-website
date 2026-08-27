import React from 'react';
import { BookOpen, Calendar, Clock, Info, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Academics() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white py-16 sm:py-20 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-dots-dark opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-academic-600/80 text-white border border-academic-400/40">
              MCA Curriculum
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              Curriculum & <span className="text-gradient">Academics</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Master of Computer Applications programme at St. Berchmans College, Changanassery (Batch 2026–2028).
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Placeholder Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-academic-50 text-academic-600 mx-auto flex items-center justify-center border border-academic-100">
            <BookOpen className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
              Academic Information Will Be Updated Soon
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
              The official course curriculum, semester subjects, syllabus guidelines, and timetable for the <strong>MCA Batch 2026–2028</strong> will be published here.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left pt-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <FileText className="w-5 h-5 text-academic-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-navy-900">Syllabus & Subjects</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Semester course structures will be posted here.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-academic-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-navy-900">Academic Schedule</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Timetables and internal dates will be updated.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
            <span>St. Berchmans College, Changanassery • First MCA Batch (2026–2028)</span>
          </div>
        </div>

      </div>

    </div>
  );
}
