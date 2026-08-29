import React, { useState } from 'react';
import { User, Mail, GraduationCap, Building } from 'lucide-react';

export default function FacultyCard({ faculty }) {
  const [imageError, setImageError] = useState(false);
  const isPlaceholder = faculty.isPlaceholder;

  // Extract initials for fallback avatar
  const getInitials = (name) => {
    if (!name) return 'FC';
    const parts = name.replace(/^(Ms\.|Mr\.|Dr\.|Prof\.)\s*/i, '').trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
      isPlaceholder 
        ? 'bg-slate-50/70 border-dashed border-slate-300' 
        : 'bg-white border-slate-200 shadow-card hover:shadow-card-hover'
    }`}>
      
      {/* Top Section */}
      <div className="pt-6 px-6 pb-5 flex flex-col items-center text-center">
        
        {/* Role Badges */}
        <div className="min-h-[28px] mb-2 flex items-center justify-center">
          {faculty.isHOD ? (
            <span className="px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 border border-amber-300">
              Head of the Department (HOD)
            </span>
          ) : faculty.isTutor ? (
            <span className="px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-academic-100 text-academic-800 border border-academic-300">
              Tutor
            </span>
          ) : (
            <span className="px-3 py-0.5 rounded-full text-[11px] font-medium text-slate-400">
              &nbsp;
            </span>
          )}
        </div>

        {/* Avatar / Photo Container */}
        <div className="relative mb-3.5">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner">
            {faculty.photo && !imageError ? (
              <img 
                src={faculty.photo} 
                alt={faculty.name} 
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-academic-50 to-academic-100 text-academic-800 font-bold font-display text-xl">
                {getInitials(faculty.name)}
              </div>
            )}
          </div>
        </div>

        {/* Faculty Name & Designation */}
        <h3 className={`text-lg font-bold font-display leading-snug ${
          isPlaceholder ? 'text-slate-400' : 'text-navy-900'
        }`}>
          {faculty.name}
        </h3>

        <p className="text-xs font-semibold text-academic-700 mt-1">
          {faculty.designation}
        </p>

        {/* Department & Qualification */}
        <div className="mt-3 space-y-1 w-full pt-3 border-t border-slate-100 text-left">
          {faculty.department && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Building className="w-3.5 h-3.5 text-academic-500 shrink-0" />
              <span className="truncate">{faculty.department}</span>
            </div>
          )}

          {faculty.qualification && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <GraduationCap className="w-3.5 h-3.5 text-academic-500 shrink-0" />
              <span className="truncate font-medium text-slate-700">{faculty.qualification}</span>
            </div>
          )}
        </div>

      </div>

      {/* Footer Info / Email */}
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/60 text-center text-xs">
        {faculty.email ? (
          <a 
            href={`mailto:${faculty.email}`}
            className="inline-flex items-center gap-1.5 text-academic-700 hover:text-academic-900 font-medium transition-colors hover:underline"
            title={`Email ${faculty.name}`}
          >
            <Mail className="w-3.5 h-3.5 shrink-0 text-academic-600" />
            <span className="truncate max-w-[200px]">{faculty.email}</span>
          </a>
        ) : isPlaceholder ? (
          <span className="text-slate-400">Profile will be updated soon</span>
        ) : (
          <span className="text-academic-600 font-medium">St. Berchmans College</span>
        )}
      </div>

    </div>
  );
}
