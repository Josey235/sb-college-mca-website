import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import sbCollegeImg from '../assets/images/college/sb-college.jpg';

export default function About() {
  return (
    <div className="bg-[#f8f9f8] min-h-screen">

      {/* =========================================================
          HERO HEADER
      ========================================================= */}
      <PageHero
        badge="Department of Computer Applications"
        title="About"
        highlight="MCA Programme"
        description="Master of Computer Applications (MCA) at St. Berchmans College, Changanassery, Kerala."
      />


      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <main className="mx-auto max-w-7xl px-6 py-10 sm:py-12 lg:px-8">

        <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-12 lg:gap-12">

          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
          <div className="lg:col-span-7">

            {/* Section Label */}
            <div className="mb-4 flex items-center gap-3">

              <span className="h-px w-10 bg-[#C9784A]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
                Programme Inception · 2026
              </span>

            </div>


            {/* Heading */}
            <h2 className="font-serif text-3xl leading-[1] tracking-tight text-stone-900 sm:text-4xl lg:text-[43px]">

              The First MCA Batch at
              <br />

              <span className="text-[#C9784A]">
                St. Berchmans College
              </span>

            </h2>


            {/* Description */}
            <div className="mt-6 space-y-4 font-sans text-[14px] leading-6 text-stone-600 sm:text-[15px]">

              <p>
                The Master of Computer Applications programme at{' '}
                <strong className="font-semibold text-stone-900">
                  St. Berchmans College, Changanassery
                </strong>
                , began in{' '}
                <strong className="font-semibold text-stone-900">
                  2026
                </strong>
                . The{' '}
                <strong className="font-semibold text-stone-900">
                  MCA Batch 2026–2028
                </strong>{' '}
                represents the first batch of the programme.
              </p>

              <p>
                The department is headed by{' '}
                <strong className="font-semibold text-stone-900">
                  Ms. Smitha Krishnan
                </strong>
                , Head of Department. Situated in the historic town of
                Changanassery, Kerala, St. Berchmans College introduces this
                postgraduate degree to nurture young scholars in computer
                applications.
              </p>

            </div>


            {/* ===================================================
                INFORMATION CARDS
            =================================================== */}
            <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">

              {/* Institution */}
              <div className="rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all duration-300 hover:border-[#C9784A]/40 hover:shadow-sm">

                <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.17em] text-stone-400">
                  Institution
                </span>

                <p className="font-sans text-sm font-semibold text-stone-900">
                  St. Berchmans College
                </p>

                <p className="mt-0.5 font-sans text-[11px] text-stone-500">
                  Changanassery, Kerala
                </p>

              </div>


              {/* Programme */}
              <div className="rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all duration-300 hover:border-[#C9784A]/40 hover:shadow-sm">

                <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.17em] text-stone-400">
                  Programme
                </span>

                <p className="font-sans text-sm font-semibold text-stone-900">
                  Master of Computer Applications (MCA)
                </p>

                <p className="mt-0.5 font-sans text-[11px] text-stone-500">
                  Started in 2026
                </p>

              </div>


              {/* Inaugural Batch */}
              <div className="rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all duration-300 hover:border-[#C9784A]/40 hover:shadow-sm">

                <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.17em] text-stone-400">
                  Inaugural Batch
                </span>

                <p className="font-sans text-sm font-semibold text-stone-900">
                  Batch 2026–2028
                </p>

                <p className="mt-0.5 font-sans text-[11px] text-stone-500">
                  First MCA Batch
                </p>

              </div>


              {/* Department Head */}
              <div className="rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all duration-300 hover:border-[#C9784A]/40 hover:shadow-sm">

                <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.17em] text-stone-400">
                  Department Head
                </span>

                <p className="font-sans text-sm font-semibold text-stone-900">
                  Mrs. Smitha Krishnan
                </p>

                <p className="mt-0.5 font-sans text-[11px] text-stone-500">
                  Head of Department
                </p>

              </div>

            </div>


            {/* ===================================================
                NAVIGATION BUTTONS
            =================================================== */}
            <div className="mt-7 flex flex-wrap gap-3">

              <Link
                to="/faculty"
                className="inline-flex items-center gap-2 rounded-lg bg-[#C9784A] px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#B96845]"
              >
                <span>Department Faculty</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/students"
                className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-5 py-2.5 font-sans text-sm font-semibold text-stone-900 transition-colors hover:border-stone-300 hover:bg-stone-50"
              >
                <span>First Batch Students</span>
              </Link>

            </div>

          </div>


          {/* =====================================================
              RIGHT IMAGE
          ===================================================== */}
          <div className="lg:col-span-5 lg:pt-1">

            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg">

              <img
                src={sbCollegeImg}
                alt="St. Berchmans College Campus, Changanassery"
                className="h-[300px] w-full object-cover sm:h-[350px] lg:h-[365px]"
              />

              <div className="border-t border-stone-100 bg-white px-5 py-3.5 text-center">

                <h3 className="font-sans text-base font-semibold text-stone-900">
                  St. Berchmans College
                </h3>

                <p className="mt-0.5 font-sans text-[11px] text-stone-500">
                  Changanassery, Kottayam, Kerala 686101
                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}