import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Users,
  Code2,
  UserRound,
  TrendingUp
} from 'lucide-react';
import sbCollegeImg from '../assets/images/college/sb-college.jpg';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-[#d8cdbc]"
      style={{
        backgroundColor: '#E4DACC',
        backgroundImage: `
          radial-gradient(
            circle at 18% 35%,
            rgba(255,255,255,0.38),
            transparent 45%
          ),
          radial-gradient(
            circle at 45% 50%,
            rgba(255,255,255,0.16),
            transparent 48%
          ),
          linear-gradient(
            120deg,
            rgba(255,255,255,0.18),
            rgba(228,218,204,0.08) 70%,
            rgba(228,218,204,0) 100%
          )
        `,
      }}
    >

      {/* =========================================================
          SOFT LEFT-SIDE ATMOSPHERIC OVERLAYS
          These stay behind the image.
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-[-180px]
          w-[650px]
          h-[600px]
          rounded-full
          bg-white/[0.18]
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-[20%]
          top-1/2
          -translate-y-1/2
          w-[550px]
          h-[500px]
          rounded-full
          bg-white/[0.12]
          blur-[110px]
        "
      />

      {/* =========================================================
          MAIN HERO
      ========================================================== */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[455px] lg:min-h-[465px]">

          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <div className="lg:col-span-7 flex items-center py-8 sm:py-9 lg:py-10 relative z-10">

            <div className="w-full max-w-2xl">

              {/* Batch Label */}
              <div className="mb-4">
                <div className="inline-flex items-center gap-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">

                  <span className="w-10 h-px bg-[#c9784d]" />

                  <span>
                    First MCA Batch 2026–2028
                  </span>

                </div>
              </div>

              {/* =================================================
                  MAIN HEADING
              ================================================== */}

              <h1 className="font-serif text-[3.2rem] sm:text-[3.45rem] lg:text-[3.75rem] leading-[0.91] tracking-[-0.045em] text-stone-900">

                <span className="block">
                  Master of
                </span>

                <span className="block text-[#c9784d]">
                  Computer
                </span>

                <span className="block text-[#c9784d]">
                  Applications
                </span>

              </h1>

              {/* Divider */}
              <div className="w-11 h-px bg-[#c9784d] mt-5 mb-3" />

              {/* Subtitle */}
              <p className="font-serif text-base sm:text-lg text-stone-600 leading-relaxed">
                Where our first MCA journey begins.
              </p>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <p className="mt-3 max-w-xl text-[13px] sm:text-[14px] leading-[1.55] text-stone-600">

                The Master of Computer Applications (MCA) programme at
                St. Berchmans College, Changanassery commenced in 2026. The
                inaugural{' '}

                <strong className="text-stone-800">
                  MCA Batch 2026–2028
                </strong>{' '}

                marks the beginning of an exciting chapter in postgraduate
                computing education at SB College.

              </p>

              {/* =================================================
                  CALL TO ACTION BUTTONS
              ================================================== */}

              <div className="mt-5 flex flex-col sm:flex-row gap-3">

                <Link
                  to="/students"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2.5
                    px-5
                    py-3
                    rounded-md
                    bg-[#c9784d]
                    text-white
                    text-[13px]
                    font-semibold
                    hover:bg-[#b96843]
                    transition-all
                    duration-200
                    shadow-sm
                    hover:shadow-md
                  "
                >
                  <Users className="w-4 h-4" />

                  <span>
                    Meet Our Students
                  </span>

                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/about"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2.5
                    px-5
                    py-3
                    rounded-md
                    border
                    border-[#d3a88d]
                    bg-[#f8f3ec]/90
                    text-[#b96843]
                    text-[13px]
                    font-semibold
                    hover:bg-[#fffaf5]
                    transition-all
                    duration-200
                  "
                >
                  <BookOpen className="w-4 h-4" />

                  <span>
                    Explore MCA Programme
                  </span>
                </Link>

              </div>

              {/* =================================================
                  BATCH INFORMATION
              ================================================== */}

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-stone-600">

                <span className="flex items-center gap-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9784d]" />

                  Inaugural Batch: 2026–2028

                </span>

                <span className="flex items-center gap-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />

                  Changanassery, Kerala

                </span>

              </div>

            </div>
          </div>

          {/* =====================================================
              RIGHT COLLEGE IMAGE
          ====================================================== */}

          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-0 z-10">

            <div className="absolute inset-0 lg:-right-12 xl:-right-16">

              <div
                className="
                  relative
                  h-full
                  min-h-[320px]
                  lg:min-h-[465px]
                  overflow-hidden
                  lg:[clip-path:polygon(25%_0,100%_0,100%_88%,84%_100%,18%_100%,0%_45%)]
                "
              >

                {/* =================================================
                    NATURAL COLLEGE IMAGE
                    No beige overlay over the photo.
                ================================================== */}

                <img
                  src={sbCollegeImg}
                  alt="St. Berchmans College Campus, Changanassery"
                  className="
                    w-full
                    h-full
                    object-cover
                    object-center
                  "
                />

                {/* =================================================
                    FADE ONLY AT LEFT EDGE OF IMAGE
                ================================================== */}

                <div
                  className="
                    absolute
                    inset-y-0
                    left-0
                    w-[27%]
                    pointer-events-none
                  "
                  style={{
                    background: `
                      linear-gradient(
                        to right,
                        rgba(228,218,204,0.92) 0%,
                        rgba(228,218,204,0.62) 25%,
                        rgba(228,218,204,0.25) 55%,
                        transparent 100%
                      )
                    `,
                  }}
                />

                {/* Very soft white transition at the extreme edge */}
                <div
                  className="
                    absolute
                    inset-y-0
                    left-0
                    w-[12%]
                    pointer-events-none
                    bg-gradient-to-r
                    from-white/[0.10]
                    to-transparent
                  "
                />

              </div>

            </div>

          </div>

        </div>

        {/* =========================================================
            FEATURE STRIP
        ========================================================== */}

        <div className="relative -mt-1 lg:-mt-5 pb-5 lg:pb-6 z-20">

          <div
            className="
              bg-[#f8f5ef]/95
              backdrop-blur-sm
              border
              border-[#d8cfc2]
              shadow-[0_10px_30px_rgba(80,65,48,0.10)]
              rounded-xl
            "
          >

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

              {/* Quality Education */}
              <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 lg:py-4 border-b sm:border-r lg:border-b-0 border-[#ddd4c8]">

                <div className="w-9 h-9 shrink-0 rounded-full bg-[#f6e9de] text-[#c9784d] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-stone-800">
                    Quality Education
                  </h3>

                  <p className="text-[10px] text-stone-500 mt-0.5">
                    Industry-aligned curriculum
                  </p>
                </div>

              </div>

              {/* Practical Learning */}
              <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 lg:py-4 lg:border-r border-b sm:border-b-0 border-[#ddd4c8]">

                <div className="w-9 h-9 shrink-0 rounded-full bg-[#f6e9de] text-[#c9784d] flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-stone-800">
                    Practical Learning
                  </h3>

                  <p className="text-[10px] text-stone-500 mt-0.5">
                    Hands-on experience
                  </p>
                </div>

              </div>

              {/* Expert Faculty */}
              <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 lg:py-4 border-b sm:border-r lg:border-b-0 border-[#ddd4c8]">

                <div className="w-9 h-9 shrink-0 rounded-full bg-[#f6e9de] text-[#c9784d] flex items-center justify-center">
                  <UserRound className="w-4 h-4" />
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-stone-800">
                    Expert Faculty
                  </h3>

                  <p className="text-[10px] text-stone-500 mt-0.5">
                    Guiding your future
                  </p>
                </div>

              </div>

              {/* Bright Future */}
              <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 lg:py-4">

                <div className="w-9 h-9 shrink-0 rounded-full bg-[#f6e9de] text-[#c9784d] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>

                <div>
                  <h3 className="text-[11px] font-bold text-stone-800">
                    Bright Future
                  </h3>

                  <p className="text-[10px] text-stone-500 mt-0.5">
                    Limitless opportunities
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}