import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import sbCollegeImg from '../assets/images/college/sb-college.jpg';

export default function About() {
  return (
    <div className="min-h-screen pb-20">

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

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#796b5c]
                "
              >
                Programme Inception · 2026
              </span>

            </div>


            {/* Heading */}
            <h2
              className="
                font-serif
                text-3xl
                leading-[1]
                tracking-tight
                text-[#40382f]
                sm:text-4xl
                lg:text-[43px]
              "
            >
              The First MCA Batch at
              <br />

              <span className="text-[#C9784A]">
                St. Berchmans College
              </span>
            </h2>


            {/* Description */}
            <div
              className="
                mt-6
                space-y-4
                font-sans
                text-[14px]
                leading-6
                text-[#796b5c]
                sm:text-[15px]
              "
            >

              <p>
                The Master of Computer Applications programme at{' '}
                <strong className="font-semibold text-[#40382f]">
                  St. Berchmans College, Changanassery
                </strong>
                , began in{' '}
                <strong className="font-semibold text-[#40382f]">
                  2026
                </strong>
                . The{' '}
                <strong className="font-semibold text-[#40382f]">
                  MCA Batch 2026–2028
                </strong>{' '}
                represents the first batch of the programme.
              </p>

              <p>
                The department is headed by{' '}
                <strong className="font-semibold text-[#40382f]">
                  Mrs. Smitha Krishnan
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
              <div
                className="
                  rounded-xl
                  border border-[#d3cbc0]
                  bg-[#f1ede7]
                  px-4 py-3.5
                  shadow-[0_4px_18px_rgba(72,61,49,0.04)]
                  transition-all
                  duration-300
                  hover:border-[#C9784A]/40
                  hover:shadow-[0_8px_24px_rgba(72,61,49,0.08)]
                "
              >
                <span
                  className="
                    mb-1.5
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.17em]
                    text-[#9a8875]
                  "
                >
                  Institution
                </span>

                <p className="font-sans text-sm font-semibold text-[#40382f]">
                  St. Berchmans College
                </p>

                <p className="mt-0.5 font-sans text-[11px] text-[#796b5c]">
                  Changanassery, Kerala
                </p>
              </div>


              {/* Programme */}
              <div
                className="
                  rounded-xl
                  border border-[#d3cbc0]
                  bg-[#f1ede7]
                  px-4 py-3.5
                  shadow-[0_4px_18px_rgba(72,61,49,0.04)]
                  transition-all
                  duration-300
                  hover:border-[#C9784A]/40
                  hover:shadow-[0_8px_24px_rgba(72,61,49,0.08)]
                "
              >
                <span
                  className="
                    mb-1.5
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.17em]
                    text-[#9a8875]
                  "
                >
                  Programme
                </span>

                <p className="font-sans text-sm font-semibold text-[#40382f]">
                  Master of Computer Applications (MCA)
                </p>

                <p className="mt-0.5 font-sans text-[11px] text-[#796b5c]">
                  Started in 2026
                </p>
              </div>


              {/* Inaugural Batch */}
              <div
                className="
                  rounded-xl
                  border border-[#d3cbc0]
                  bg-[#f1ede7]
                  px-4 py-3.5
                  shadow-[0_4px_18px_rgba(72,61,49,0.04)]
                  transition-all
                  duration-300
                  hover:border-[#C9784A]/40
                  hover:shadow-[0_8px_24px_rgba(72,61,49,0.08)]
                "
              >
                <span
                  className="
                    mb-1.5
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.17em]
                    text-[#9a8875]
                  "
                >
                  Inaugural Batch
                </span>

                <p className="font-sans text-sm font-semibold text-[#40382f]">
                  Batch 2026–2028
                </p>

                <p className="mt-0.5 font-sans text-[11px] text-[#796b5c]">
                  First MCA Batch
                </p>
              </div>


              {/* Department Head */}
              <div
                className="
                  rounded-xl
                  border border-[#d3cbc0]
                  bg-[#f1ede7]
                  px-4 py-3.5
                  shadow-[0_4px_18px_rgba(72,61,49,0.04)]
                  transition-all
                  duration-300
                  hover:border-[#C9784A]/40
                  hover:shadow-[0_8px_24px_rgba(72,61,49,0.08)]
                "
              >
                <span
                  className="
                    mb-1.5
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.17em]
                    text-[#9a8875]
                  "
                >
                  Department Head
                </span>

                <p className="font-sans text-sm font-semibold text-[#40382f]">
                  Mrs. Smitha Krishnan
                </p>

                <p className="mt-0.5 font-sans text-[11px] text-[#796b5c]">
                  Head of Department
                </p>
              </div>

            </div>


            {/* ===================================================
                NAVIGATION BUTTONS
            =================================================== */}
            <div className="mt-7 flex flex-wrap gap-3">

              {/* Faculty */}
              <Link
                to="/faculty"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-[#C9784A]
                  px-5
                  py-2.5
                  font-sans
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#B96845]
                  hover:shadow-md
                "
              >
                <span>Department Faculty</span>

                <ArrowRight className="h-4 w-4" />
              </Link>


              {/* Students */}
              <Link
                to="/students"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border border-[#d3cbc0]
                  bg-[#f1ede7]
                  px-5
                  py-2.5
                  font-sans
                  text-sm
                  font-semibold
                  text-[#40382f]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#c9784d]/40
                  hover:bg-[#ebe5dc]
                "
              >
                <span>First Batch Students</span>
              </Link>

            </div>

          </div>


          {/* =====================================================
              RIGHT IMAGE
          ===================================================== */}
          <div className="lg:col-span-5 lg:pt-1">

            <div
              className="
                overflow-hidden
                rounded-2xl
                border border-[#d3cbc0]
                bg-[#f1ede7]
                shadow-[0_12px_35px_rgba(72,61,49,0.10)]
              "
            >

              <img
                src={sbCollegeImg}
                alt="St. Berchmans College Campus, Changanassery"
                className="
                  h-[300px]
                  w-full
                  object-cover
                  sm:h-[350px]
                  lg:h-[365px]
                "
              />

              <div
                className="
                  border-t border-[#d3cbc0]
                  bg-[#f1ede7]
                  px-5
                  py-3.5
                  text-center
                "
              >

                <h3 className="font-sans text-base font-semibold text-[#40382f]">
                  St. Berchmans College
                </h3>

                <p className="mt-0.5 font-sans text-[11px] text-[#796b5c]">
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