import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  ChevronRight,
  Award,
  Lightbulb,
  FileText
} from 'lucide-react';

import {
  timetableInfo,
  semestersData,
  electivesData,
  creditSummary,
  SYLLABUS_PDF_URL
} from '../data/academics';


/* ─────────────────────────────────────────────
   Magnetic Button
──────────────────────────────────────────────── */

function MagneticButton({
  children,
  className = '',
  href,
  download,
  target,
  rel,
  onClick
}) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const isTouch = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches
  );

  const handleMouseMove = useCallback((e) => {
    if (isTouch.current || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    const targetX = dx * 3;
    const targetY = dy * 3;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const animate = () => {
      currentX.current +=
        (targetX - currentX.current) * 0.2;

      currentY.current +=
        (targetY - currentY.current) * 0.2;

      if (ref.current) {
        ref.current.style.transform =
          `translate(${currentX.current.toFixed(2)}px, ${currentY.current.toFixed(2)}px)`;
      }

      if (
        Math.abs(targetX - currentX.current) > 0.01 ||
        Math.abs(targetY - currentY.current) > 0.01
      ) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isTouch.current || !ref.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const resetAnimate = () => {
      currentX.current +=
        (0 - currentX.current) * 0.15;

      currentY.current +=
        (0 - currentY.current) * 0.15;

      if (ref.current) {
        ref.current.style.transform =
          `translate(${currentX.current.toFixed(2)}px, ${currentY.current.toFixed(2)}px)`;
      }

      if (
        Math.abs(currentX.current) > 0.01 ||
        Math.abs(currentY.current) > 0.01
      ) {
        rafRef.current =
          requestAnimationFrame(resetAnimate);
      } else if (ref.current) {
        ref.current.style.transform =
          'translate(0px, 0px)';
      }
    };

    rafRef.current =
      requestAnimationFrame(resetAnimate);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const commonProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className,
    style: {
      willChange: 'transform',
      transition: 'box-shadow 0.2s ease'
    }
  };

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} {...commonProps}>
      {children}
    </button>
  );
}


/* ─────────────────────────────────────────────
   Type Badge
──────────────────────────────────────────────── */

function TypeBadge({ type }) {
  const map = {
    Theory: 'bg-stone-100 text-stone-700',
    Lab: 'bg-[#F7E6DD] text-[#9B4E2D]',
    Elective: 'bg-[#F1E5DE] text-[#8F4B2E]',
    Project: 'bg-emerald-50 text-emerald-700',
    Seminar: 'bg-blue-50 text-blue-700',
    Viva: 'bg-rose-50 text-rose-700',
    'Practical / Training':
      'bg-orange-50 text-orange-700',
    'Theory / Practical':
      'bg-teal-50 text-teal-700'
  };

  const cls =
    map[type] || 'bg-stone-100 text-stone-700';

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${cls}`}
    >
      {type}
    </span>
  );
}


/* ─────────────────────────────────────────────
   Academics Page
──────────────────────────────────────────────── */

export default function Academics() {
  const [activeSem, setActiveSem] = useState(0);

  return (
    <div className="bg-[#f8f9f8] min-h-screen pb-24">

      {/* ═══════════════════════════════════════
          HERO HEADER
      ═══════════════════════════════════════ */}

      <section
        className="relative overflow-hidden border-b border-[#24201d] bg-[#14110F] py-16 text-white sm:py-20"
        style={{
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
          backgroundSize: '74px 74px'
        }}
      >

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl space-y-3">

            {/* Badge */}
            <span className="inline-flex rounded-full border border-[#E08A5B]/40 bg-[#C96F45]/80 px-3.5 py-1 text-xs font-semibold text-white">
              MCA Curriculum
            </span>

            {/* Heading */}
            <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-5xl">
              Curriculum &amp;{' '}
              <span className="text-[#C9784A]">
                Academics
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Master of Computer Applications programme at
              St. Berchmans College, Changanassery
              (Batch 2026–2028).
            </p>

          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════ */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">

        <div className="space-y-16">


          {/* ═══════════════════════════════════════
              QUICK ACTIONS
          ═══════════════════════════════════════ */}

          <div className="flex flex-wrap justify-center gap-3 sm:justify-start">

            <MagneticButton
              href={SYLLABUS_PDF_URL}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#C9784A] bg-[#C9784A] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#B96845]"
            >
              <Download className="h-4 w-4" />
              Download Complete Syllabus
            </MagneticButton>

            <MagneticButton
              href={SYLLABUS_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition-colors hover:border-stone-300 hover:bg-stone-50"
            >
              <ExternalLink className="h-4 w-4 text-[#C9784A]" />
              View Syllabus
            </MagneticButton>

          </div>


          {/* ═══════════════════════════════════════
              A. MCA TIMETABLE
          ═══════════════════════════════════════ */}

          <section>

            <div className="mb-6">

              <div className="mb-1 flex items-center gap-3">

                <Calendar className="h-5 w-5 text-[#C9784A]" />

                <h2 className="font-display text-2xl font-extrabold text-stone-900 sm:text-3xl">
                  {timetableInfo.title}
                </h2>

              </div>

              <p className="ml-8 text-sm text-stone-500">
                {timetableInfo.batch} — {timetableInfo.description}
              </p>

            </div>


            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[640px] border-collapse text-sm">

                  <thead>

                    <tr className="bg-[#14110F] text-white">

                      <th className="w-16 border-r border-[#332E2A] px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                        Day
                      </th>

                      {timetableInfo.columns.map((col) => (

                        <th
                          key={col.id}
                          className="border-r border-[#332E2A] px-3 py-3 text-center text-xs font-bold uppercase tracking-wider last:border-r-0"
                        >

                          <div>{col.label}</div>

                          <div className="mt-0.5 text-[10px] font-normal normal-case tracking-normal text-stone-400">
                            {col.time}
                          </div>

                        </th>

                      ))}

                    </tr>

                  </thead>


                  <tbody>

                    {timetableInfo.schedule.map((row, ri) => (

                      <tr
                        key={row.day}
                        className={
                          ri % 2 === 0
                            ? 'bg-white'
                            : 'bg-stone-50/70'
                        }
                      >

                        <td className="whitespace-nowrap border-r border-stone-200 px-4 py-3 text-sm font-extrabold text-stone-900">
                          {row.day}
                        </td>


                        {row.periods.map((p, pi) => (

                          <td
                            key={pi}
                            className={`border-r border-stone-200 px-2 py-2.5 text-center last:border-r-0 ${
                              p.isLab
                                ? 'bg-[#F7E6DD]'
                                : ''
                            }`}
                          >

                            {p.isLab ? (

                              <div className="flex flex-col items-center gap-0.5">

                                <span className="inline-block rounded-md bg-[#E8C9B8] px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-[#7D3F25]">
                                  {p.subject}
                                </span>

                                {p.faculty && (
                                  <span className="text-[10px] font-semibold text-[#9B5A3B]">
                                    ({p.faculty})
                                  </span>
                                )}

                              </div>

                            ) : (

                              <div className="flex flex-col items-center gap-0.5">

                                <span className="text-[12px] font-semibold text-stone-800">
                                  {p.subject}
                                </span>

                                {p.faculty && (
                                  <span className="text-[10px] text-stone-500">
                                    ({p.faculty})
                                  </span>
                                )}

                              </div>

                            )}

                          </td>

                        ))}

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>


              {/* Legend */}

              <div className="border-t border-stone-200 bg-stone-50 px-4 py-4 sm:px-6">

                <div className="mb-3 flex items-center gap-2">

                  <span className="inline-block h-3 w-3 rounded-sm border border-[#D9A98F] bg-[#E8C9B8]" />

                  <span className="text-[11px] font-medium text-stone-500">
                    Highlighted cells = Lab sessions
                  </span>

                </div>

                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Faculty Legend
                </p>

                <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                  {timetableInfo.legend.map((l) => (

                    <div
                      key={l.code}
                      className="flex items-start gap-2 text-[11px]"
                    >

                      <span className="w-14 shrink-0 font-extrabold text-stone-800">
                        {l.code}
                      </span>

                      <span className="text-stone-600">
                        {l.name}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* ═══════════════════════════════════════
              B & C. SYLLABUS
          ═══════════════════════════════════════ */}

          <section>

            <div className="mb-6">

              <div className="mb-1 flex items-center gap-3">

                <BookOpen className="h-5 w-5 text-[#C9784A]" />

                <h2 className="font-display text-2xl font-extrabold text-stone-900 sm:text-3xl">
                  MCA Syllabus
                </h2>

              </div>

              <p className="ml-8 text-sm text-stone-500">
                Course Structure &amp; Syllabus — 2-Year Regular MCA Programme
                (Batch 2026–2028)
              </p>

            </div>


            {/* Semester Tabs */}

            <div className="mb-6 flex flex-wrap gap-2">

              {semestersData.map((sem, idx) => (

                <button
                  key={sem.semNumber}
                  onClick={() => setActiveSem(idx)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    activeSem === idx
                      ? 'border-[#C9784A] bg-[#C9784A] text-white shadow-md'
                      : 'border-stone-200 bg-white text-stone-800 hover:border-[#C9784A]/50 hover:bg-[#FBF4F0]'
                  }`}
                >

                  {sem.semester}

                  <span
                    className={`ml-2 text-[11px] font-bold ${
                      activeSem === idx
                        ? 'text-white/80'
                        : 'text-[#C9784A]'
                    }`}
                  >
                    {sem.totalCredits} Cr
                  </span>

                </button>

              ))}

            </div>


            {/* Active Semester */}

            {semestersData.map((sem, idx) => (

              <div
                key={sem.semNumber}
                className={
                  idx === activeSem
                    ? 'block'
                    : 'hidden'
                }
              >

                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">


                  {/* Semester Header */}

                  <div className="flex flex-col justify-between gap-2 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-white px-5 py-4 sm:flex-row sm:items-center sm:px-6">

                    <div>

                      <h3 className="font-display text-lg font-extrabold text-stone-900">
                        {sem.semester}
                      </h3>

                      <p className="mt-0.5 text-xs text-stone-500">
                        {sem.description}
                      </p>

                    </div>


                    <div className="shrink-0 rounded-xl bg-[#C9784A] px-4 py-2 text-center text-white">

                      <div className="text-xl font-extrabold leading-none">
                        {sem.totalCredits}
                      </div>

                      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/80">
                        Credits
                      </div>

                    </div>

                  </div>


                  {/* Desktop Table */}

                  <div className="hidden overflow-x-auto sm:block">

                    <table className="w-full text-sm">

                      <thead>

                        <tr className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">

                          <th className="px-5 py-3 text-left font-bold">
                            Course Code
                          </th>

                          <th className="px-5 py-3 text-left font-bold">
                            Subject
                          </th>

                          <th className="px-5 py-3 text-center font-bold">
                            Type
                          </th>

                          <th className="px-5 py-3 text-center font-bold">
                            Hrs/Wk
                          </th>

                          <th className="px-5 py-3 text-center font-bold">
                            Credits
                          </th>

                        </tr>

                      </thead>


                      <tbody className="divide-y divide-stone-100">

                        {sem.courses.map((course) => (

                          <tr
                            key={course.code}
                            className="transition-colors hover:bg-[#FCF7F4]"
                          >

                            <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-bold text-[#B96845]">
                              {course.code}
                            </td>

                            <td className="px-5 py-3.5 font-medium leading-snug text-stone-800">
                              {course.title}
                            </td>

                            <td className="px-5 py-3.5 text-center">
                              <TypeBadge type={course.type} />
                            </td>

                            <td className="px-5 py-3.5 text-center font-semibold text-stone-600">
                              {typeof course.hours === 'number'
                                ? `${course.hours}h`
                                : course.hours}
                            </td>

                            <td className="px-5 py-3.5 text-center">

                              <span className="inline-block h-8 w-8 rounded-full border border-[#E4BDA8] bg-[#FBF1EC] text-sm font-extrabold leading-8 text-[#9B4E2D]">
                                {course.credits}
                              </span>

                            </td>

                          </tr>

                        ))}

                      </tbody>


                      <tfoot>

                        <tr className="bg-[#14110F] text-white">

                          <td
                            colSpan={4}
                            className="px-5 py-3 text-sm font-bold"
                          >
                            Total Credits — {sem.semester}
                          </td>

                          <td className="px-5 py-3 text-center text-lg font-extrabold">
                            {sem.totalCredits}
                          </td>

                        </tr>

                      </tfoot>

                    </table>

                  </div>


                  {/* Mobile Cards */}

                  <div className="divide-y divide-stone-100 sm:hidden">

                    {sem.courses.map((course) => (

                      <div
                        key={course.code}
                        className="space-y-1.5 px-4 py-4"
                      >

                        <div className="flex items-start justify-between gap-2">

                          <span className="font-mono text-[11px] font-bold text-[#B96845]">
                            {course.code}
                          </span>

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E4BDA8] bg-[#FBF1EC] text-sm font-extrabold text-[#9B4E2D]">
                            {course.credits}
                          </span>

                        </div>

                        <p className="text-sm font-semibold leading-snug text-stone-800">
                          {course.title}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-stone-500">

                          <TypeBadge type={course.type} />

                          <span>
                            {typeof course.hours === 'number'
                              ? `${course.hours}h/wk`
                              : course.hours}
                          </span>

                        </div>

                      </div>

                    ))}

                    <div className="flex justify-between bg-[#14110F] px-4 py-3 text-sm font-bold text-white">

                      <span>Total Credits</span>

                      <span>{sem.totalCredits}</span>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </section>


          {/* ═══════════════════════════════════════
              D. CREDIT SUMMARY
          ═══════════════════════════════════════ */}

          <section>

            <div className="mb-6 flex items-center gap-3">

              <Award className="h-5 w-5 text-[#C9784A]" />

              <h2 className="font-display text-2xl font-extrabold text-stone-900 sm:text-3xl">
                Credit Summary
              </h2>

            </div>


            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

                {creditSummary.breakdown.map((item, i) => (

                  <div
                    key={item.semester}
                    className={`border-stone-200 px-6 py-6 text-center ${
                      i < creditSummary.breakdown.length - 1
                        ? 'border-b sm:border-r lg:border-b-0'
                        : 'border-b-0'
                    }`}
                  >

                    <div className="font-display text-3xl font-extrabold leading-none text-[#C9784A]">
                      {item.credits}
                    </div>

                    <div className="mt-1 text-[10px] uppercase tracking-wider text-stone-400">
                      credits
                    </div>

                    <div className="mt-2 text-sm font-semibold text-stone-900">
                      {item.semester}
                    </div>

                    <div className="mt-0.5 text-[11px] leading-snug text-stone-500">
                      {item.label}
                    </div>

                  </div>

                ))}

              </div>


              {/* Grand Total */}

              <div className="border-t border-[#24201d] bg-[#14110F] px-6 py-5 text-center text-white">

                <div className="font-display text-4xl font-extrabold leading-none sm:text-5xl">
                  {creditSummary.total}
                </div>

                <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-stone-300">
                  Total Programme Credits
                </div>

                <div className="mt-1 text-xs text-stone-500">
                  2-Year Regular MCA (4 Semesters)
                </div>

              </div>

            </div>

          </section>


          {/* ═══════════════════════════════════════
              E. ELECTIVES
          ═══════════════════════════════════════ */}

          <section>

            <div className="mb-2 flex items-center gap-3">

              <Lightbulb className="h-5 w-5 text-[#C9784A]" />

              <h2 className="font-display text-2xl font-extrabold text-stone-900 sm:text-3xl">
                Elective Courses
              </h2>

            </div>

            <p className="mb-6 text-sm text-stone-500">
              Students choose one subject each from Group A (MCA ET 303)
              and Group B (MCA ET 304) in Semester III.
            </p>


            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


              {/* Group A */}

              <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">

                <div className="border-b border-[#EAD6CA] bg-[#FBF1EC] px-5 py-4">

                  <div className="flex items-center justify-between">

                    <div>

                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#B96845]">
                        Semester III
                      </span>

                      <h3 className="mt-0.5 font-display font-extrabold text-stone-900">
                        {electivesData.groupA.groupTitle}
                      </h3>

                      <p className="mt-0.5 font-mono text-xs text-stone-500">
                        {electivesData.groupA.code}
                      </p>

                    </div>


                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E4BDA8] bg-[#F1DED2] font-display font-extrabold text-[#8F4B2E]">

                      {electivesData.groupA.credits}

                      <span className="ml-0.5 text-[9px]">
                        Cr
                      </span>

                    </div>

                  </div>

                </div>


                <div className="divide-y divide-stone-100">

                  {electivesData.groupA.courses.map((c) => (

                    <div
                      key={c.code}
                      className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-[#FCF7F4]"
                    >

                      <ChevronRight className="h-4 w-4 shrink-0 text-[#C9784A]" />

                      <div>

                        <span className="font-mono text-[10px] text-stone-400">
                          {c.code}
                        </span>

                        <p className="mt-0.5 text-sm font-semibold leading-snug text-stone-800">
                          {c.title}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* Group B */}

              <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">

                <div className="border-b border-[#D7E3D8] bg-[#F1F6F1] px-5 py-4">

                  <div className="flex items-center justify-between">

                    <div>

                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                        Semester III
                      </span>

                      <h3 className="mt-0.5 font-display font-extrabold text-stone-900">
                        {electivesData.groupB.groupTitle}
                      </h3>

                      <p className="mt-0.5 font-mono text-xs text-stone-500">
                        {electivesData.groupB.code}
                      </p>

                    </div>


                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#BFD2C1] bg-[#DCE9DD] font-display font-extrabold text-emerald-700">

                      {electivesData.groupB.credits}

                      <span className="ml-0.5 text-[9px]">
                        Cr
                      </span>

                    </div>

                  </div>

                </div>


                <div className="divide-y divide-stone-100">

                  {electivesData.groupB.courses.map((c) => (

                    <div
                      key={c.code}
                      className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-stone-50"
                    >

                      <ChevronRight className="h-4 w-4 shrink-0 text-emerald-600" />

                      <div>

                        <span className="font-mono text-[10px] text-stone-400">
                          {c.code}
                        </span>

                        <p className="mt-0.5 text-sm font-semibold leading-snug text-stone-800">
                          {c.title}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </section>


          {/* ═══════════════════════════════════════
              F. DOWNLOAD SYLLABUS
          ═══════════════════════════════════════ */}

          <section>

            <div className="flex flex-col items-center gap-6 rounded-2xl border border-[#24201d] bg-[#14110F] px-6 py-8 text-white shadow-sm sm:flex-row sm:px-10 sm:py-10">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">

                <FileText className="h-7 w-7 text-[#E08A5B]" />

              </div>


              <div className="flex-1 text-center sm:text-left">

                <h3 className="font-display text-xl font-extrabold">
                  Complete Syllabus Document
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-stone-300">
                  The official 2-year Regular MCA scheme and detailed
                  course syllabus for all four semesters is available
                  for download.
                </p>

              </div>


              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">

                <MagneticButton
                  href={SYLLABUS_PDF_URL}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#C9784A] bg-[#C9784A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B96845]"
                >
                  <Download className="h-4 w-4" />
                  Download Syllabus
                </MagneticButton>


                <MagneticButton
                  href={SYLLABUS_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Online
                </MagneticButton>

              </div>

            </div>

          </section>


          {/* ═══════════════════════════════════════
              FOOTER NOTE
          ═══════════════════════════════════════ */}

          <div className="border-t border-stone-200 pt-4 text-center text-xs text-stone-400">

            St. Berchmans College, Changanassery
            &bull; Department of Computer Applications (MCA)
            &bull; First Batch (2026–2028)

          </div>


        </div>

      </main>

    </div>
  );
}