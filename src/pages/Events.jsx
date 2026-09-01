import React from 'react';
import { Calendar } from 'lucide-react';

export default function Events() {
  return (
    <div className="space-y-16 pb-20">

      {/* =========================================================
          HERO HEADER
      ========================================================= */}
      <div
        className="
          bg-[#14110F]
          text-white
          py-16 sm:py-20
          relative
          overflow-hidden
          border-b border-[#211C19]
        "
      >

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255, 255, 255, 0.18) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.18) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '58px 58px',
          }}
        />

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl space-y-3">

            {/* Badge */}
            <span
              className="
                inline-flex
                px-3.5 py-1
                rounded-full
                text-xs
                font-semibold
                bg-[#C96F45]/20
                text-[#E08A5B]
                border border-[#C96F45]/40
              "
            >
              Department Engagements
            </span>

            {/* Heading */}
            <h1
              className="
                text-3xl
                sm:text-5xl
                font-extrabold
                font-display
                leading-tight
              "
            >
              MCA{' '}
              <span className="text-[#C96F45]">
                Events
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Seminars, technical sessions, and departmental activities at
              St. Berchmans College.
            </p>

          </div>

        </div>
      </div>


      {/* =========================================================
          EVENTS CONTENT
      ========================================================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Empty State Card */}
        <div
          className="
            bg-white
            rounded-3xl
            p-8 sm:p-12
            border border-slate-200
            shadow-card
            text-center
            space-y-6
          "
        >

          {/* Icon */}
          <div
            className="
              w-16 h-16
              rounded-2xl
              bg-[#C96F45]/10
              text-[#C96F45]
              mx-auto
              flex items-center justify-center
              border border-[#C96F45]/20
            "
          >
            <Calendar className="w-8 h-8" />
          </div>


          {/* Text */}
          <div className="space-y-2">

            <h2
              className="
                text-2xl
                sm:text-3xl
                font-extrabold
                text-[#14110F]
                font-display
              "
            >
              No MCA Events Have Been Added Yet
            </h2>

            <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
              The MCA programme at St. Berchmans College began in 2026.
              Upcoming technical events, guest lectures, and student
              activities for the inaugural{' '}
              <strong>Batch 2026–2028</strong> will be announced here.
            </p>

          </div>


          {/* Information Footer */}
          <div
            className="
              p-4
              rounded-2xl
              bg-[#F7F4F1]
              border border-[#E5DED8]
              max-w-md
              mx-auto
              text-xs
              text-slate-500
            "
          >
            <span>
              St. Berchmans College, Changanassery • First MCA Batch
              (2026–2028)
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}