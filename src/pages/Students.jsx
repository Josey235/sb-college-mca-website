import React from 'react';
import StudentCard from '../components/StudentCard';
import { studentsList } from '../data/students';
import { Sparkles, Info } from 'lucide-react';

export default function Students() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white py-16 sm:py-20 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-dots-dark opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-academic-600/80 text-white border border-academic-400/40">
                Department Directory
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Batch 2026–2028
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              MCA <span className="text-gradient">Students</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Inaugural cohort of the Master of Computer Applications programme at St. Berchmans College, Changanassery (Batch 2026–2028).
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Info Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">First MCA Batch (2026–2028)</p>
            <p className="text-amber-800 mt-0.5">
              Currently showing enrolled scholars from the first MCA batch. Additional student profiles will be updated here.
            </p>
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentsList.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

      </div>

    </div>
  );
}
