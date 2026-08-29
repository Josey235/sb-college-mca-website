import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  BookOpen, Calendar, Download, ExternalLink,
  ChevronRight, FlaskConical, Award, Layers, Lightbulb, FileText
} from 'lucide-react';
import {
  timetableInfo,
  semestersData,
  electivesData,
  creditSummary,
  SYLLABUS_PDF_URL
} from '../data/academics';

/* ─────────────────────────────────────────────
   MagneticButton – subtle cursor-follow, 2-4px
   Disabled automatically on touch/coarse devices
──────────────────────────────────────────────── */
function MagneticButton({ children, className = '', href, download, target, rel, onClick }) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const isTouch = useRef(
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
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

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const animate = () => {
      currentX.current += (targetX - currentX.current) * 0.2;
      currentY.current += (targetY - currentY.current) * 0.2;
      if (ref.current) {
        ref.current.style.transform = `translate(${currentX.current.toFixed(2)}px, ${currentY.current.toFixed(2)}px)`;
      }
      if (Math.abs(targetX - currentX.current) > 0.01 || Math.abs(targetY - currentY.current) > 0.01) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isTouch.current || !ref.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const resetAnimate = () => {
      currentX.current += (0 - currentX.current) * 0.15;
      currentY.current += (0 - currentY.current) * 0.15;
      if (ref.current) {
        ref.current.style.transform = `translate(${currentX.current.toFixed(2)}px, ${currentY.current.toFixed(2)}px)`;
      }
      if (Math.abs(currentX.current) > 0.01 || Math.abs(currentY.current) > 0.01) {
        rafRef.current = requestAnimationFrame(resetAnimate);
      } else if (ref.current) {
        ref.current.style.transform = 'translate(0px, 0px)';
      }
    };
    rafRef.current = requestAnimationFrame(resetAnimate);
  }, []);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const commonProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className,
    style: { willChange: 'transform', transition: 'box-shadow 0.2s ease' }
  };

  if (href) {
    return (
      <a href={href} download={download} target={target} rel={rel} {...commonProps}>
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
   Type badge colour helper
──────────────────────────────────────────────── */
function TypeBadge({ type }) {
  const map = {
    Theory: 'bg-navy-100 text-navy-800',
    Lab: 'bg-amber-100 text-amber-800',
    Elective: 'bg-purple-100 text-purple-700',
    Project: 'bg-green-100 text-green-800',
    Seminar: 'bg-blue-100 text-blue-800',
    Viva: 'bg-rose-100 text-rose-800',
    'Practical / Training': 'bg-orange-100 text-orange-800',
    'Theory / Practical': 'bg-teal-100 text-teal-800',
  };
  const cls = map[type] || 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${cls}`}>
      {type}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Main Academics Page
──────────────────────────────────────────────── */
export default function Academics() {
  const [activeSem, setActiveSem] = useState(0);

  return (
    <div className="space-y-16 pb-24">

      {/* ── Hero Header ── */}
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white py-16 sm:py-20 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-dots-dark opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-academic-600/80 text-white border border-academic-400/40">
              MCA Curriculum
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              Curriculum &amp; <span className="text-gradient">Academics</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Master of Computer Applications programme at St. Berchmans College, Changanassery (Batch 2026–2028).
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* ── Quick Actions (Download / View) ── */}
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <MagneticButton
            href={SYLLABUS_PDF_URL}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-academic-600 hover:bg-academic-700 border border-academic-500 shadow-md hover:shadow-lg transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Complete Syllabus
          </MagneticButton>

          <MagneticButton
            href={SYLLABUS_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-navy-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm hover:shadow-md transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-academic-600" />
            View Syllabus
          </MagneticButton>
        </div>

        {/* ═══════════════════════════════════════
            A. MCA TIMETABLE
        ═══════════════════════════════════════ */}
        <section>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <Calendar className="w-5 h-5 text-academic-600" />
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-navy-900">
                {timetableInfo.title}
              </h2>
            </div>
            <p className="text-sm text-slate-500 ml-8">{timetableInfo.batch} — {timetableInfo.description}</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
            {/* Horizontal scroll wrapper for mobile */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider w-16 border-r border-navy-700">
                      Day
                    </th>
                    {timetableInfo.columns.map((col) => (
                      <th key={col.id} className="px-3 py-3 text-center font-bold text-xs uppercase tracking-wider border-r border-navy-700 last:border-r-0">
                        <div>{col.label}</div>
                        <div className="text-navy-300 font-normal text-[10px] mt-0.5 normal-case tracking-normal">{col.time}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetableInfo.schedule.map((row, ri) => (
                    <tr
                      key={row.day}
                      className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}
                    >
                      <td className="px-4 py-3 font-extrabold text-navy-900 text-sm border-r border-slate-200 whitespace-nowrap">
                        {row.day}
                      </td>
                      {row.periods.map((p, pi) => (
                        <td
                          key={pi}
                          className={`px-2 py-2.5 text-center border-r border-slate-200 last:border-r-0 ${
                            p.isLab
                              ? 'bg-amber-50'
                              : ''
                          }`}
                        >
                          {p.isLab ? (
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-extrabold text-[11px] uppercase tracking-wide">
                                {p.subject}
                              </span>
                              {p.faculty && (
                                <span className="text-[10px] text-amber-700 font-semibold">({p.faculty})</span>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="font-semibold text-navy-800 text-[12px]">{p.subject}</span>
                              {p.faculty && (
                                <span className="text-[10px] text-slate-500">({p.faculty})</span>
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
            <div className="border-t border-slate-200 bg-slate-50 px-4 sm:px-6 py-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block w-3 h-3 rounded-sm bg-amber-200 border border-amber-300"></span>
                <span className="text-[11px] text-slate-500 font-medium">Highlighted cells = Lab sessions</span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Faculty Legend</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-1.5">
                {timetableInfo.legend.map((l) => (
                  <div key={l.code} className="flex items-start gap-2 text-[11px]">
                    <span className="font-extrabold text-navy-800 shrink-0 w-14">{l.code}</span>
                    <span className="text-slate-600">{l.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            B & C. SYLLABUS + SEMESTER-WISE SUBJECTS
        ═══════════════════════════════════════ */}
        <section>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <BookOpen className="w-5 h-5 text-academic-600" />
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-navy-900">
                MCA Syllabus
              </h2>
            </div>
            <p className="text-sm text-slate-500 ml-8">
              Course Structure &amp; Syllabus — 2-Year Regular MCA Programme (Batch 2026–2028)
            </p>
          </div>

          {/* Semester Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {semestersData.map((sem, idx) => (
              <button
                key={sem.semNumber}
                onClick={() => setActiveSem(idx)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                  activeSem === idx
                    ? 'bg-academic-600 text-white border-academic-600 shadow-md'
                    : 'bg-white text-navy-800 border-slate-200 hover:border-academic-300 hover:bg-academic-50'
                }`}
              >
                {sem.semester}
                <span className={`ml-2 text-[11px] font-bold ${activeSem === idx ? 'text-white/80' : 'text-academic-600'}`}>
                  {sem.totalCredits} Cr
                </span>
              </button>
            ))}
          </div>

          {/* Active Semester Details */}
          {semestersData.map((sem, idx) => (
            <div key={sem.semNumber} className={idx === activeSem ? 'block' : 'hidden'}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
                <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                  <div>
                    <h3 className="font-extrabold text-navy-900 font-display text-lg">{sem.semester}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{sem.description}</p>
                  </div>
                  <div className="shrink-0 px-4 py-2 rounded-xl bg-academic-600 text-white text-center">
                    <div className="text-xl font-extrabold leading-none">{sem.totalCredits}</div>
                    <div className="text-[10px] uppercase tracking-wider mt-0.5 text-white/80">Credits</div>
                  </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                        <th className="px-5 py-3 text-left font-bold">Course Code</th>
                        <th className="px-5 py-3 text-left font-bold">Subject</th>
                        <th className="px-5 py-3 text-center font-bold">Type</th>
                        <th className="px-5 py-3 text-center font-bold">Hrs/Wk</th>
                        <th className="px-5 py-3 text-center font-bold">Credits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sem.courses.map((course) => (
                        <tr key={course.code} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-5 py-3.5 font-mono text-xs text-academic-700 font-bold whitespace-nowrap">
                            {course.code}
                          </td>
                          <td className="px-5 py-3.5 text-navy-800 font-medium leading-snug">
                            {course.title}
                          </td>
                          <td className="px-5 py-3.5 text-center">
                            <TypeBadge type={course.type} />
                          </td>
                          <td className="px-5 py-3.5 text-center text-slate-600 font-semibold">
                            {typeof course.hours === 'number' ? `${course.hours}h` : course.hours}
                          </td>
                          <td className="px-5 py-3.5 text-center">
                            <span className="inline-block w-8 h-8 rounded-full bg-academic-50 border border-academic-200 text-academic-800 font-extrabold text-sm leading-8">
                              {course.credits}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-navy-900 text-white">
                        <td colSpan={4} className="px-5 py-3 font-bold text-sm">
                          Total Credits — {sem.semester}
                        </td>
                        <td className="px-5 py-3 text-center font-extrabold text-lg">
                          {sem.totalCredits}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden divide-y divide-slate-100">
                  {sem.courses.map((course) => (
                    <div key={course.code} className="px-4 py-4 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-[11px] text-academic-700 font-bold">{course.code}</span>
                        <span className="shrink-0 w-7 h-7 rounded-full bg-academic-50 border border-academic-200 text-academic-800 font-extrabold text-sm flex items-center justify-center">
                          {course.credits}
                        </span>
                      </div>
                      <p className="text-navy-800 font-semibold text-sm leading-snug">{course.title}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <TypeBadge type={course.type} />
                        <span>{typeof course.hours === 'number' ? `${course.hours}h/wk` : course.hours}</span>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-3 bg-navy-900 text-white flex justify-between font-bold text-sm">
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
            <Award className="w-5 h-5 text-academic-600" />
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-navy-900">
              Credit Summary
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {creditSummary.breakdown.map((item, i) => (
                <div
                  key={item.semester}
                  className={`px-6 py-6 text-center border-b lg:border-b-0 ${
                    i < creditSummary.breakdown.length - 1
                      ? 'sm:border-r border-slate-200'
                      : ''
                  } border-slate-200`}
                >
                  <div className="text-3xl font-extrabold text-academic-600 font-display leading-none">
                    {item.credits}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">credits</div>
                  <div className="font-semibold text-navy-900 mt-2 text-sm">{item.semester}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.label}</div>
                </div>
              ))}
            </div>
            {/* Grand Total */}
            <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white px-6 py-5 text-center border-t border-navy-800">
              <div className="text-4xl sm:text-5xl font-extrabold font-display leading-none text-white">
                {creditSummary.total}
              </div>
              <div className="text-sm text-slate-300 mt-2 font-semibold uppercase tracking-wider">
                Total Programme Credits
              </div>
              <div className="text-xs text-slate-400 mt-1">2-Year Regular MCA (4 Semesters)</div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            E. ELECTIVES
        ═══════════════════════════════════════ */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-academic-600" />
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-navy-900">
              Elective Courses
            </h2>
          </div>
          <p className="text-sm text-slate-500 mb-6 -mt-2">
            Students choose one subject each from Group A (MCA ET 303) and Group B (MCA ET 304) in Semester III.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Group A */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
              <div className="px-5 py-4 bg-purple-50 border-b border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-500">Semester III</span>
                    <h3 className="font-extrabold text-navy-900 font-display mt-0.5">{electivesData.groupA.groupTitle}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{electivesData.groupA.code}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center font-extrabold font-display">
                    {electivesData.groupA.credits}
                    <span className="text-[9px] ml-0.5">Cr</span>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {electivesData.groupA.courses.map((c) => (
                  <div key={c.code} className="px-5 py-3.5 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                    <ChevronRight className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <span className="font-mono text-[10px] text-slate-400">{c.code}</span>
                      <p className="text-sm font-semibold text-navy-800 mt-0.5 leading-snug">{c.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Group B */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
              <div className="px-5 py-4 bg-green-50 border-b border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-green-600">Semester III</span>
                    <h3 className="font-extrabold text-navy-900 font-display mt-0.5">{electivesData.groupB.groupTitle}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{electivesData.groupB.code}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-green-100 border border-green-200 text-green-700 flex items-center justify-center font-extrabold font-display">
                    {electivesData.groupB.credits}
                    <span className="text-[9px] ml-0.5">Cr</span>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {electivesData.groupB.courses.map((c) => (
                  <div key={c.code} className="px-5 py-3.5 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                    <ChevronRight className="w-4 h-4 text-green-500 shrink-0" />
                    <div>
                      <span className="font-mono text-[10px] text-slate-400">{c.code}</span>
                      <p className="text-sm font-semibold text-navy-800 mt-0.5 leading-snug">{c.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            F. DOWNLOAD SYLLABUS BANNER
        ═══════════════════════════════════════ */}
        <section>
          <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row items-center gap-6 border border-navy-800 shadow-card text-white">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <FileText className="w-7 h-7 text-academic-300" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-extrabold font-display">Complete Syllabus Document</h3>
              <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                The official 2-year Regular MCA scheme and detailed course syllabus for all four semesters is available for download.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <MagneticButton
                href={SYLLABUS_PDF_URL}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-academic-600 hover:bg-academic-500 border border-academic-400 transition-colors cursor-pointer shadow-lg"
              >
                <Download className="w-4 h-4" />
                Download Syllabus
              </MagneticButton>
              <MagneticButton
                href={SYLLABUS_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                View Online
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* ── Footer Note ── */}
        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-200">
          St. Berchmans College, Changanassery &bull; Department of Computer Applications (MCA) &bull; First Batch (2026–2028)
        </div>

      </div>
    </div>
  );
}

