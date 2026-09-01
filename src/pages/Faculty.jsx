import React from 'react';
import FacultyCard from '../components/FacultyCard';
import { facultyMembers } from '../data/faculty';
import { Info } from 'lucide-react';

export default function Faculty() {
  return (
    <div className="space-y-16 pb-20">

      {/* Hero Header */}
      <div
        className="text-white py-16 sm:py-20 relative overflow-hidden border-b border-[#25201D]"
        style={{
          backgroundColor: '#14110F',
          backgroundImage: `
            linear-gradient(
              rgba(255, 255, 255, 0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '58px 58px',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl space-y-3">

            {/* Badge */}
            <span className="inline-flex px-3.5 py-1 rounded-full text-xs font-semibold bg-[#C96F45]/80 text-white border border-[#E08A5B]/40">
              Department Mentors
            </span>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              Faculty{' '}
              <span className="text-[#C96F45]">
                Directory
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Faculty members of the Department of Computer Applications (MCA),
              St. Berchmans College, Changanassery.
            </p>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Notice Box */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

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