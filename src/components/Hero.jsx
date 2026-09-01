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
    <section className="hero-texture relative overflow-hidden border-b border-stone-100">

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
              <div>

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

              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}
              <p className="mt-3 max-w-xl text-[13px] sm:text-[14px] leading-[1.55] text-stone-500">

                The Master of Computer Applications (MCA) programme at
                St. Berchmans College, Changanassery commenced in 2026. The
                inaugural{' '}

                <strong className="text-stone-700">
                  MCA Batch 2026–2028
                </strong>{' '}

                marks the beginning of an exciting chapter in postgraduate
                computing education at SB College.

              </p>

              {/* =================================================
                  CALL TO ACTION BUTTONS
              ================================================== */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">

                {/* Meet Students */}
                <Link
                  to="/students"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-md bg-[#c9784d] text-white text-[13px] font-semibold hover:bg-[#b96843] transition-all duration-200 shadow-sm hover:shadow-md"
                >

                  <Users className="w-4 h-4" />

                  <span>
                    Meet Our Students
                  </span>

                  <ArrowRight className="w-4 h-4" />

                </Link>

                {/* Explore Programme */}
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-md border border-[#d89a7a] bg-white/90 text-[#b96843] text-[13px] font-semibold hover:bg-[#fdf4ef] transition-all duration-200"
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
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-stone-500">

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

              {/* =================================================
                  ASYMMETRIC IMAGE FRAME
              ================================================== */}
              <div className="relative h-full min-h-[320px] lg:min-h-[465px] overflow-hidden lg:[clip-path:polygon(25%_0,100%_0,100%_88%,84%_100%,18%_100%,0%_45%)]">

                <img
                  src={sbCollegeImg}
                  alt="St. Berchmans College Campus, Changanassery"
                  className="w-full h-full object-cover object-center"
                />

                {/* Very subtle fade only at the image edge */}
                <div className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#faf8f5]/30 to-transparent" />

              </div>
            </div>
          </div>

        </div>

        {/* =========================================================
            FEATURE STRIP
        ========================================================== */}
        <div className="relative -mt-1 lg:-mt-5 pb-5 lg:pb-6 z-20">

          <div className="bg-white/95 backdrop-blur-sm border border-stone-200 shadow-[0_10px_30px_rgba(45,39,35,0.06)] rounded-xl">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

              {/* =================================================
                  QUALITY EDUCATION
              ================================================== */}
              <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 lg:py-4 border-b sm:border-r lg:border-b-0 border-stone-200">

                <div className="w-9 h-9 shrink-0 rounded-full bg-[#fdf1eb] text-[#c9784d] flex items-center justify-center">
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

              {/* =================================================
                  PRACTICAL LEARNING
              ================================================== */}
              <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 lg:py-4 lg:border-r border-b sm:border-b-0 border-stone-200">

                <div className="w-9 h-9 shrink-0 rounded-full bg-[#fdf1eb] text-[#c9784d] flex items-center justify-center">
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

              {/* =================================================
                  EXPERT FACULTY
              ================================================== */}
              <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 lg:py-4 border-b sm:border-r lg:border-b-0 border-stone-200">

                <div className="w-9 h-9 shrink-0 rounded-full bg-[#fdf1eb] text-[#c9784d] flex items-center justify-center">
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

              {/* =================================================
                  BRIGHT FUTURE
              ================================================== */}
              <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 lg:py-4">

                <div className="w-9 h-9 shrink-0 rounded-full bg-[#fdf1eb] text-[#c9784d] flex items-center justify-center">
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