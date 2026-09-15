import React from 'react';
import { Code } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function Projects() {
  return (
    <div className="space-y-16 pb-20">

      {/* =========================================================
          HERO HEADER
      ========================================================= */}
      <PageHero
        badge="Department Projects"
        title="Student"
        highlight="Projects"
        description="Software engineering, research applications, and technical prototypes by the MCA Batch 2026–2028."
      />


      {/* =========================================================
          PROJECT CONTENT
      ========================================================= */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Placeholder Card */}
        <div
          className="
            space-y-6
            rounded-3xl
            border
            border-stone-200
            bg-white
            p-8
            text-center
            shadow-[0_10px_35px_rgba(41,37,36,0.07)]
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
              border
              border-[#f0c8b5]
              bg-[#fff7f2]
              text-[#C96F45]
            "
          >
            <Code className="h-8 w-8" />
          </div>


          {/* Text */}
          <div className="space-y-2">

            <h2
              className="
                font-serif
                text-2xl
                text-stone-900
                sm:text-3xl
              "
            >
              Projects Will Be Added Soon
            </h2>

            <p
              className="
                mx-auto
                max-w-lg
                text-sm
                leading-relaxed
                text-stone-600
              "
            >
              The MCA programme at St. Berchmans College commenced in 2026.
              Student projects, capstones, and software showcases for the{' '}
              <strong className="text-stone-900">
                MCA Batch 2026–2028
              </strong>{' '}
              will be documented and featured here as the semester progresses.
            </p>

          </div>


          {/* Batch Information */}
          <div
            className="
              mx-auto
              max-w-md
              rounded-2xl
              border
              border-stone-200
              bg-[#faf8f5]
              p-4
              text-xs
              text-stone-500
            "
          >
            <span>
              First MCA Batch (2026–2028) • St. Berchmans College,
              Changanassery
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}