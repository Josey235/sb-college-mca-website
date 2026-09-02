import React from 'react';
import { Calendar } from 'lucide-react';

export default function Events() {
  return (
    <div className="space-y-16 pb-20">

      {/* =========================================================
          HERO HEADER
      ========================================================= */}
      <section
        className="
          relative
          overflow-hidden
          border-b border-[#24201d]
          bg-[#14110F]
          py-16
          text-white
          sm:py-20
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255, 255, 255, 0.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              rgba(255, 255, 255, 0.018) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.018) 1px,
              transparent 1px
            )
          `,
          backgroundSize: `
            74px 74px,
            74px 74px,
            148px 148px,
            148px 148px
          `,
          backgroundPosition: `
            0 0,
            0 0,
            0 0,
            0 0
          `,
        }}
      >

        {/* Soft Glow Over Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(201, 111, 69, 0.055), transparent 65%)',
          }}
        />

        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl space-y-3">

            {/* Badge */}
            <span
              className="
                inline-flex
                rounded-full
                border border-[#C96F45]/40
                bg-[#C96F45]/20
                px-3.5
                py-1
                text-xs
                font-semibold
                text-[#E08A5B]
              "
            >
              Department Engagements
            </span>

            {/* Heading */}
            <h1
              className="
                font-display
                text-3xl
                font-extrabold
                leading-tight
                sm:text-5xl
              "
            >
              MCA{' '}
              <span className="text-[#C96F45]">
                Events
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Seminars, technical sessions, and departmental activities at
              St. Berchmans College.
            </p>

          </div>

        </div>
      </section>


      {/* =========================================================
          EVENTS CONTENT
      ========================================================= */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Empty State Card */}
        <div
          className="
            space-y-6
            rounded-3xl
            border border-slate-200
            bg-white
            p-8
            text-center
            shadow-card
            sm:p-12
          "
        >

          {/* Icon */}
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border border-[#C96F45]/20
              bg-[#C96F45]/10
              text-[#C96F45]
            "
          >
            <Calendar className="h-8 w-8" />
          </div>


          {/* Text */}
          <div className="space-y-2">

            <h2
              className="
                font-display
                text-2xl
                font-extrabold
                text-[#14110F]
                sm:text-3xl
              "
            >
              No MCA Events Have Been Added Yet
            </h2>

            <p className="mx-auto max-w-lg text-sm leading-relaxed text-slate-600">
              The MCA programme at St. Berchmans College began in 2026.
              Upcoming technical events, guest lectures, and student
              activities for the inaugural{' '}
              <strong>Batch 2026–2028</strong> will be announced here.
            </p>

          </div>


          {/* Information Footer */}
          <div
            className="
              mx-auto
              max-w-md
              rounded-2xl
              border border-[#E5DED8]
              bg-[#F7F4F1]
              p-4
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

      </main>

    </div>
  );
}