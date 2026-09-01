import React from 'react';
import { Code, Sparkles, Layers, Info } from 'lucide-react';

export default function Projects() {
  return (
    <div className="space-y-16 pb-20">

      {/* =========================================================
          HERO HEADER
      ========================================================= */}
      <section
        className="relative py-16 sm:py-20 text-white overflow-hidden border-b border-white/10"
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

        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl space-y-3">

            {/* Badge */}
            <span className="inline-flex px-3.5 py-1 rounded-full text-xs font-semibold bg-[#C96F45]/80 text-white border border-[#C96F45]/40">
              Department Projects
            </span>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              Student{' '}
              <span
                className="bg-gradient-to-r from-[#C96F45] to-[#E08A5B] bg-clip-text text-transparent"
              >
                Projects
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Software engineering, research applications, and technical
              prototypes by the MCA Batch 2026–2028.
            </p>

          </div>

        </div>
      </section>


      {/* =========================================================
          PROJECT CONTENT
      ========================================================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Placeholder Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-[0_10px_35px_rgba(41,37,36,0.07)] text-center space-y-6">

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#fff7f2] text-[#C96F45] mx-auto flex items-center justify-center border border-[#f0c8b5]">
            <Code className="w-8 h-8" />
          </div>

          {/* Text */}
          <div className="space-y-2">

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
              Projects Will Be Added Soon
            </h2>

            <p className="text-stone-600 text-sm max-w-lg mx-auto leading-relaxed">
              The MCA programme at St. Berchmans College commenced in 2026.
              Student projects, capstones, and software showcases for the{' '}
              <strong className="text-stone-900">
                MCA Batch 2026–2028
              </strong>{' '}
              will be documented and featured here as the semester progresses.
            </p>

          </div>

          {/* Batch Information */}
          <div className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200 max-w-md mx-auto text-xs text-stone-500">
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