import React from 'react';
import FacultyCard from '../components/FacultyCard';
import { facultyMembers } from '../data/faculty';
import { Info } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function Faculty() {
  return (
    <div className="space-y-16 pb-20">

      {/* =========================================================
          HERO HEADER
      ========================================================= */}
      <PageHero
        badge="Department Mentors"
        title="Faculty"
        highlight="Directory"
        description="Faculty members of the Department of Computer Applications (MCA), St. Berchmans College, Changanassery."
      />


      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Department Leadership Notice */}
        <div className="p-4 rounded-2xl bg-academic-50 border border-academic-200 text-xs sm:text-sm text-academic-900 flex items-start gap-3">

          <Info className="w-5 h-5 text-academic-600 shrink-0 mt-0.5" />

          <div>
            <p className="font-semibold text-navy-900">
              Department Leadership
            </p>

            <p className="text-slate-600 mt-0.5">
              The MCA Department is headed by{' '}
              <strong>Mrs. Smitha Krishnan</strong>, Assistant Professor &amp;
              Head of the Department.
            </p>
          </div>

        </div>


        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">

          {facultyMembers.map((faculty) => (
            <FacultyCard
              key={faculty.id}
              faculty={faculty}
            />
          ))}

        </div>

      </div>

    </div>
  );
}