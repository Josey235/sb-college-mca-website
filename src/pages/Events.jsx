import React from 'react';
import { Calendar } from 'lucide-react';

export default function Events() {
  const academicSchedule = [
    {
      slNo: 1,
      activity: 'Commencement of Classes',
      date: '1 September 2026',
    },
    {
      slNo: 2,
      activity: 'Course Orientation & Introduction',
      date: '2–3 September 2026',
    },
    {
      slNo: 3,
      activity: 'First Internal Examination',
      date: '5–9 October 2026',
      highlight: true,
    },
    {
      slNo: 4,
      activity: 'Assignment / Seminar / Lab Activities',
      date: 'Throughout October–November 2026',
    },
    {
      slNo: 5,
      activity: 'Second Internal Examination',
      date: '9–13 November 2026',
      highlight: true,
    },
    {
      slNo: 6,
      activity: 'Completion of Syllabus',
      date: '23–27 November 2026',
    },
    {
      slNo: 7,
      activity: 'Model Examination',
      date: '30 November – 1 December 2026',
    },
    {
      slNo: 8,
      activity: 'Semester Examination',
      date: 'From 7 December 2026',
      highlight: true,
    },
    {
      slNo: 9,
      activity: 'Lab Examination',
      date: 'As per Examination Schedule',
    },
  ];

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
        }}
      >

        {/* Soft Glow Over Grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(201, 111, 69, 0.055), transparent 65%)',
          }}
        />

        {/* Subtle Dark Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/10" />

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
                font-serif
                text-4xl
                leading-none
                text-white
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
          ACADEMIC SCHEDULE
      ========================================================= */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-8">

          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C9784D]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#796B5C]">
              Academic Calendar
            </span>
          </div>

          <h2
            className="
              font-serif
              text-4xl
              leading-none
              text-[#2B2721]
              sm:text-5xl
            "
          >
            Academic{' '}
            <span className="text-[#C9784D]">
              Schedule
            </span>
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#796B5C] sm:text-base">
            First MCA Batch (2026–2028) — Proposed academic activities and
            examination schedule for the first semester.
          </p>

        </div>


        {/* =========================================================
            SCHEDULE TABLE
        ========================================================= */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            border border-[#D5C8B8]
            bg-[#F8F5F0]
            shadow-[0_10px_35px_rgba(41,37,36,0.06)]
          "
        >

          {/* Table Wrapper */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] border-collapse text-sm">

              {/* Table Header */}
              <thead>
                <tr className="bg-[#14110F] text-white">

                  <th
                    className="
                      w-[90px]
                      border-r border-white/10
                      px-4
                      py-4
                      text-center
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                    "
                  >
                    Sl. No.
                  </th>

                  <th
                    className="
                      border-r border-white/10
                      px-5
                      py-4
                      text-left
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                    "
                  >
                    Activity
                  </th>

                  <th
                    className="
                      px-5
                      py-4
                      text-center
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                    "
                  >
                    Proposed Date / Period
                  </th>

                </tr>
              </thead>


              {/* Table Body */}
              <tbody>

                {academicSchedule.map((item, index) => (
                  <tr
                    key={item.slNo}
                    className={`
                      border-b border-[#D5C8B8]
                      last:border-b-0
                      ${
                        index % 2 === 0
                          ? 'bg-[#FAF8F5]'
                          : 'bg-[#F0ECE6]'
                      }
                      transition-colors
                      hover:bg-[#F3E5D8]
                    `}
                  >

                    {/* Serial Number */}
                    <td
                      className={`
                        border-r border-[#D5C8B8]
                        px-4
                        py-4
                        text-center
                        align-middle
                        text-[#40382F]
                        ${
                          item.highlight
                            ? 'font-bold'
                            : 'font-normal'
                        }
                      `}
                    >
                      {item.slNo}
                    </td>


                    {/* Activity */}
                    <td
                      className={`
                        border-r border-[#D5C8B8]
                        px-5
                        py-4
                        align-middle
                        text-[#40382F]
                        ${
                          item.highlight
                            ? 'font-bold'
                            : 'font-normal'
                        }
                      `}
                    >
                      {item.activity}
                    </td>


                    {/* Date / Period */}
                    <td
                      className={`
                        px-5
                        py-4
                        text-center
                        align-middle
                        text-[#40382F]
                        ${
                          item.highlight
                            ? 'font-bold'
                            : 'font-normal'
                        }
                      `}
                    >
                      {item.date}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* Schedule Note */}
        <p className="mt-4 text-xs leading-relaxed text-[#8A7B6B]">
          * All dates are proposed and may be subject to change as per the
          official academic and examination schedule.
        </p>


        {/* =========================================================
            EVENTS CONTENT
        ========================================================= */}
        <div className="mt-16">

          {/* Section Heading */}
          <div className="mb-8">

            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9784D]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#796B5C]">
                Department Activities
              </span>
            </div>

            <h2
              className="
                font-serif
                text-3xl
                leading-none
                text-[#2B2721]
                sm:text-4xl
              "
            >
              Upcoming{' '}
              <span className="text-[#C9784D]">
                Events
              </span>
            </h2>

          </div>


          {/* Empty State Card */}
          <div
            className="
              space-y-6
              rounded-3xl
              border border-slate-200
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
                border border-[#C96F45]/20
                bg-[#C96F45]/10
                text-[#C96F45]
              "
            >
              <Calendar className="h-8 w-8" />
            </div>


            {/* Text */}
            <div className="space-y-2">

              <h3
                className="
                  font-serif
                  text-2xl
                  text-[#14110F]
                  sm:text-3xl
                "
              >
                No MCA Events Have Been Added Yet
              </h3>

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

        </div>

      </main>

    </div>
  );
}