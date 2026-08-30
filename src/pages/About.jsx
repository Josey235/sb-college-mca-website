import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import sbCollegeImg from '../assets/images/college/sb-college.jpg';

export default function About() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">

      {/* Page Header */}
      <section className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-7 sm:py-9">
          <div className="max-w-3xl">

            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-px bg-[#c9784a]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
                Department of Computer Applications
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[52px] leading-[0.98] tracking-tight text-stone-900">
              About{' '}
              <span className="text-[#c9784a]">
                MCA Programme
              </span>
            </h1>

            <p className="mt-3 text-sm sm:text-[15px] text-stone-600 leading-relaxed font-sans">
              Master of Computer Applications (MCA) at St. Berchmans College,
              Changanassery, Kerala.
            </p>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10 sm:py-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-12 items-start">

          {/* Left Content */}
          <div className="lg:col-span-7">

            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-[#c9784a]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
                Programme Inception · 2026
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[43px] leading-[1] tracking-tight text-stone-900">
              The First MCA Batch at
              <br />
              <span className="text-[#c9784a]">
                St. Berchmans College
              </span>
            </h2>

            {/* Description */}
            <div className="mt-6 space-y-4 font-sans text-[14px] sm:text-[15px] text-stone-600 leading-6">

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

            {/* Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-7">

              {/* Institution */}
              <div className="rounded-xl border border-stone-200 bg-white px-4 py-3.5">
                <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-stone-400 mb-1.5">
                  Institution
                </span>

                <p className="font-sans text-sm font-semibold text-stone-900">
                  St. Berchmans College
                </p>

                <p className="font-sans text-[11px] text-stone-500 mt-0.5">
                  Changanassery, Kerala
                </p>
              </div>

              {/* Programme */}
              <div className="rounded-xl border border-stone-200 bg-white px-4 py-3.5">
                <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-stone-400 mb-1.5">
                  Programme
                </span>

                <p className="font-sans text-sm font-semibold text-stone-900">
                  Master of Computer Applications (MCA)
                </p>

                <p className="font-sans text-[11px] text-stone-500 mt-0.5">
                  Started in 2026
                </p>
              </div>

              {/* Inaugural Batch */}
              <div className="rounded-xl border border-stone-200 bg-white px-4 py-3.5">
                <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-stone-400 mb-1.5">
                  Inaugural Batch
                </span>

                <p className="font-sans text-sm font-semibold text-stone-900">
                  Batch 2026–2028
                </p>

                <p className="font-sans text-[11px] text-stone-500 mt-0.5">
                  First MCA Batch
                </p>
              </div>

              {/* Department Head */}
              <div className="rounded-xl border border-stone-200 bg-white px-4 py-3.5">
                <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-stone-400 mb-1.5">
                  Department Head
                </span>

                <p className="font-sans text-sm font-semibold text-stone-900">
                  Mrs. Smitha Krishnan
                </p>

                <p className="font-sans text-[11px] text-stone-500 mt-0.5">
                  Head of Department
                </p>
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-3 mt-7">

              <Link
                to="/faculty"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans text-sm font-semibold text-white bg-[#c9784a] hover:bg-[#b96845] transition-colors"
              >
                <span>Department Faculty</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/students"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans text-sm font-semibold text-stone-900 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-colors"
              >
                <span>First Batch Students</span>
              </Link>

            </div>

          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 lg:pt-1">

            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg">

              <img
                src={sbCollegeImg}
                alt="St. Berchmans College Campus, Changanassery"
                className="w-full h-[300px] sm:h-[350px] lg:h-[365px] object-cover"
              />

              <div className="px-5 py-3.5 text-center border-t border-stone-100 bg-white">

                <h3 className="font-sans text-base font-semibold text-stone-900">
                  St. Berchmans College
                </h3>

                <p className="font-sans text-[11px] text-stone-500 mt-0.5">
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