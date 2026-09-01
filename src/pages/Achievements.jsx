import React from 'react';
import { Award, Sparkles } from 'lucide-react';

export default function Achievements() {
  return (
    <div className="space-y-16 pb-20">

      {/* Hero Header */}
      <div
        className="
          bg-[#14110F]
          text-white
          py-16
          sm:py-20
          relative
          overflow-hidden
          border-b
          border-navy-800
        "
        style={{
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
          backgroundSize: '74px 74px',
        }}
      >

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl space-y-3">

            <span
              className="
                px-3.5
                py-1
                rounded-full
                text-xs
                font-semibold
                bg-[#c9784d]
                text-white
                border
                border-[#c9784d]/60
              "
            >
              Department Milestones
            </span>

            <h1
              className="
                text-3xl
                sm:text-5xl
                font-extrabold
                font-display
                leading-tight
              "
            >
              Department{' '}
              <span className="text-[#c9784d]">
                Achievements
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Milestones and accolades of the MCA Department at St. Berchmans College.
            </p>

          </div>

        </div>
      </div>


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Empty State Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card text-center space-y-6">

          <div className="w-16 h-16 rounded-2xl bg-academic-50 text-academic-600 mx-auto flex items-center justify-center border border-academic-100">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">

            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
              No Achievements Have Been Added Yet
            </h2>

            <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
              The MCA programme was newly started in 2026. Student awards,
              research publications, hackathon participations, and departmental
              milestones for the{' '}
              <strong>MCA Batch 2026–2028</strong> will be highlighted here.
            </p>

          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-xs text-slate-500">
            <span>
              First MCA Batch (2026–2028) • St. Berchmans College, Changanassery
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}