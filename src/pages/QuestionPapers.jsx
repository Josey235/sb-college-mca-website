import React, { useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  FileText,
  ExternalLink,
  GraduationCap,
} from 'lucide-react';

import PageHero from '../components/PageHero';
import { questionPapersData, getPaperUrl } from '../data/questionPapers';

/* ─────────────────────────────────────────────
   Helper: extract a clean label from a PDF filename.
   Strips the leading code (e.g. "MCA1SPC 2024 JAN ") and ".pdf"
──────────────────────────────────────────────── */
function cleanPaperLabel(fileName) {
  // Remove .pdf extension
  let name = fileName.replace(/\.pdf$/i, '');
  // Remove leading MCA code token (e.g. "MCA1SPC ", "MCA2DSBDA ")
  name = name.replace(/^MCA\d+[A-Z]+ /i, '');
  // Title-case
  return name
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/* ─────────────────────────────────────────────
   Subject Card — collapsible list of PDFs
──────────────────────────────────────────────── */
function SubjectCard({ subject, semKey }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-[#d3cbc0] bg-white shadow-[0_2px_10px_rgba(72,61,49,0.06)] transition-shadow hover:shadow-[0_4px_18px_rgba(72,61,49,0.11)]">

      {/* Subject header — clickable to expand */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-[#faf8f4]"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#f1ede7] text-[#C9784A]">
            <BookOpen className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-[#40382f] text-sm sm:text-base leading-tight">
              {subject.displayName}
            </p>
            <p className="text-xs text-[#9a8676] mt-0.5">
              {subject.papers.length} question paper{subject.papers.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <span className={`flex-shrink-0 text-[#C9784A] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>

      {/* PDF list */}
      {open && (
        <div className="border-t border-[#ede6dd] divide-y divide-[#f3ede6]">
          {subject.papers.map((fileName, idx) => {
            const url = getPaperUrl(semKey, subject.folderName, fileName);
            const label = cleanPaperLabel(fileName);

            return (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 text-sm text-[#40382f] transition-colors hover:bg-[#fdf9f6] group"
              >
                <FileText className="h-4 w-4 flex-shrink-0 text-[#C9784A] opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="flex-1 min-w-0 truncate">{label}</span>
                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-[#C9784A] opacity-0 group-hover:opacity-80 transition-opacity" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Semester Tab Button
──────────────────────────────────────────────── */
function SemTab({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200
        ${
          isActive
            ? 'bg-[#C9784A] text-white shadow-md shadow-[#C9784A]/30'
            : 'bg-[#f1ede7] text-[#5c4f3e] hover:bg-[#ebe5dc] border border-[#d3cbc0]'
        }
      `}
    >
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main Page
──────────────────────────────────────────────── */
export default function QuestionPapers() {
  const [activeSemIndex, setActiveSemIndex] = useState(0);

  const activeSemData = questionPapersData[activeSemIndex];

  return (
    <div className="min-h-screen pb-24">

      {/* ═══ HERO ═══ */}
      <PageHero
        badge="MCA Academics"
        title="Previous Year"
        highlight="Question Papers"
        description="Browse and download previous year question papers for MCA Semester 1, 2, and 3 at St. Berchmans College, Changanassery."
      />

      {/* ═══ CONTENT ═══ */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">

        <div className="space-y-8">

          {/* ── Semester Tabs ── */}
          <div>
            <div className="mb-2 flex items-center gap-2 text-[#796b5c]">
              <GraduationCap className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Select Semester</span>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {questionPapersData.map((semData, idx) => (
                <SemTab
                  key={semData.semKey}
                  label={semData.sem}
                  isActive={activeSemIndex === idx}
                  onClick={() => setActiveSemIndex(idx)}
                />
              ))}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="h-px bg-gradient-to-r from-[#d3cbc0] via-[#C9784A]/30 to-transparent" />

          {/* ── Active Semester Content ── */}
          <section>

            {/* Heading */}
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#14110F] text-[#E08A5B]">
                <ChevronRight className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-extrabold text-[#40382f] sm:text-2xl">
                  {activeSemData.sem} — Question Papers
                </h2>
                <p className="text-xs text-[#796b5c] mt-0.5">
                  {activeSemData.subjects.length} subject{activeSemData.subjects.length !== 1 ? 's' : ''} 
                </p>
              </div>
            </div>

            {/* Subject cards */}
            <div className="space-y-3">
              {activeSemData.subjects.map((subject) => (
                <SubjectCard
                  key={subject.folderName}
                  subject={subject}
                  semKey={activeSemData.semKey}
                />
              ))}
            </div>

          </section>

          {/* ── Info note ── */}
          <div className="rounded-xl border border-[#d3cbc0] bg-[#faf8f4] px-5 py-4 flex items-start gap-3">
            <FileText className="h-4 w-4 mt-0.5 text-[#C9784A] flex-shrink-0" />
            <p className="text-xs text-[#796b5c] leading-relaxed">
              
        These are official question papers from previous university examinations.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

