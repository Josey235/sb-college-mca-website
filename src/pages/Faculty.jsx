import React from 'react';
import FacultyCard from '../components/FacultyCard';
import { facultyMembers } from '../data/faculty';
import { GraduationCap, Info } from 'lucide-react';

export default function Faculty() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white py-16 sm:py-20 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-dots-dark opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-academic-600/80 text-white border border-academic-400/40">
              Department Mentors
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              Faculty <span className="text-gradient">Directory</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Faculty members of the Department of Computer Applications (MCA), St. Berchmans College, Changanassery.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Notice Box */}
        <div className="p-4 rounded-2xl bg-academic-50 border border-academic-200 text-xs sm:text-sm text-academic-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-academic-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-navy-900">Department Leadership</p>
            <p className="text-slate-600 mt-0.5">
              The MCA Department is headed by <strong>Mrs. Smitha Krishnan</strong>, Assistant Professor &amp; Head of the Department.
            </p>
          </div>
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {facultyMembers.map((faculty) => (
            <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
        </div>

      </div>

    </div>
  );
}
