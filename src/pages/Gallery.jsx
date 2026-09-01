import React from 'react';
import { Images } from 'lucide-react';
import sbCollegeImg from '../assets/images/college/sb-college.jpg';

export default function Gallery() {
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

        {/* Subtle Tech Grid */}
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
              Visual Archives
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
              Department{' '}
              <span className="text-[#C96F45]">
                Gallery
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Photographs of St. Berchmans College and Department of
              Computer Applications.
            </p>

          </div>

        </div>
      </div>


      {/* =========================================================
          GALLERY CONTENT
      ========================================================= */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Prominent Real Campus Image */}
        <div
          className="
            bg-white
            rounded-3xl
            p-6
            border border-slate-200
            shadow-card
          "
        >

          <div
            className="
              rounded-2xl
              overflow-hidden
              shadow-sm
              bg-[#14110F]
              border border-slate-200
            "
          >
            <img
              src={sbCollegeImg}
              alt="St. Berchmans College Campus, Changanassery"
              className="
                w-full
                h-80 sm:h-96
                object-cover
                object-center
              "
            />
          </div>

          <div className="mt-4 text-center">

            <h3 className="text-lg font-bold text-[#14110F] font-display">
              St. Berchmans College Campus
            </h3>

            <p className="text-xs text-slate-500 mt-0.5">
              Changanassery, Kottayam District, Kerala 686101
            </p>

          </div>

        </div>


        {/* Empty State Notice */}
        <div
          className="
            bg-white
            rounded-3xl
            p-8
            border border-slate-200
            shadow-card
            text-center
            space-y-4
          "
        >

          <div
            className="
              w-12 h-12
              rounded-2xl
              bg-[#C96F45]/10
              text-[#C96F45]
              mx-auto
              flex items-center justify-center
              border border-[#C96F45]/20
            "
          >
            <Images className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">

            <h2
              className="
                text-xl sm:text-2xl
                font-bold
                text-[#14110F]
                font-display
              "
            >
              MCA Gallery Will Be Updated Soon
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Photographs of departmental activities, lab sessions, and
              student moments for the inaugural{' '}
              <strong>Batch 2026–2028</strong> will be added here.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}