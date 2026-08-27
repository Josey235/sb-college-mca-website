import React from 'react';
import { User, Mail, GraduationCap } from 'lucide-react';

export default function FacultyCard({ faculty }) {
  const isPlaceholder = faculty.isPlaceholder;

  return (
    <div className={`rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden ${
      isPlaceholder 
        ? 'bg-slate-50/70 border-dashed border-slate-300' 
        : 'bg-white border-slate-200 shadow-card hover:shadow-card-hover'
    }`}>
      
      {/* Top Section */}
      <div className="pt-6 px-6 pb-4 flex flex-col items-center text-center">
        
        {faculty.isHOD && (
          <span className="mb-3 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 border border-amber-300">
            Head of Department
          </span>
        )}

        {/* Avatar / Photo Container */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner">
            {faculty.photo ? (
              <img 
                src={faculty.photo} 
                alt={faculty.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-slate-300" />
            )}
          </div>
        </div>

        {/* Faculty Name & Designation */}
        <h3 className={`text-lg font-bold font-display ${
          isPlaceholder ? 'text-slate-400' : 'text-navy-900'
        }`}>
          {faculty.name}
        </h3>

        <p className="text-xs font-semibold text-academic-700 mt-1">
          {faculty.designation}
        </p>

        <p className="text-[11px] text-slate-400 mt-1">
          Department of Computer Applications (MCA)
        </p>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-3 border-t border-slate-100 bg-white/60 text-center text-xs text-slate-400">
        {isPlaceholder ? (
          <span>Profile will be updated soon</span>
        ) : (
          <span className="text-academic-600 font-medium">St. Berchmans College</span>
        )}
      </div>

    </div>
  );
}
