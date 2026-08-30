import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  ArrowRight,
  Linkedin,
  Github
} from 'lucide-react';

export default function StudentCard({ student }) {
  const photoUrl = student.photo_url;
  const bio = student.bio;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(15,23,42,0.14)]">

      {/* Photo Area */}
      <div className="relative h-[390px] overflow-hidden bg-slate-100">

        {/* Student Photo */}
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={student.name}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/80 shadow-sm">
              <User className="h-14 w-14 text-slate-300" />
            </div>
          </div>
        )}

        {/* Very subtle top lighting */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />

        {/* Main Smoke / Fog Fade */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-white via-white/90 via-white/55 to-transparent" />

        {/* Lower Smoke Layer - Left */}
        <div className="absolute -left-12 bottom-2 h-28 w-48 rounded-full bg-white/85 blur-3xl" />

        {/* Lower Smoke Layer - Center */}
        <div className="absolute left-1/4 bottom-0 h-32 w-56 rounded-full bg-white/90 blur-3xl" />

        {/* Lower Smoke Layer - Right */}
        <div className="absolute -right-12 bottom-2 h-28 w-48 rounded-full bg-white/85 blur-3xl" />

        {/* Soft final fade into card */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/65 to-transparent" />

      </div>

      {/* Student Information */}
      <div className="relative -mt-16 px-6 pb-6 text-center">

        {/* Batch */}
        <span className="relative z-10 inline-flex rounded-full border border-[#f0c8b5] bg-[#fff7f2] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#c9784d] shadow-sm">
          MCA Batch {student.batch || '2026–2028'}
        </span>

        {/* Name */}
        <h3 className="relative z-10 mt-3 truncate font-display text-xl font-bold text-navy-900">
          {student.name}
        </h3>

        {/* Roll Number */}
        <p className="mt-1 text-xs font-medium text-[#c9784d]">
          {student.roll_number || 'MCA Scholar'}
        </p>

        {/* Bio */}
        <p className="mx-auto mt-3 min-h-[40px] max-w-[280px] text-xs leading-relaxed text-slate-500 line-clamp-2">
          {bio || 'Postgraduate Scholar at St. Berchmans College'}
        </p>

        {/* Social Links */}
        <div className="mt-5 flex items-center justify-center gap-3">

          {student.linkedin_url && (
            <a
              href={student.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${student.name} on LinkedIn`}
              title="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9784d] hover:bg-[#fff7f2] hover:text-[#c9784d] hover:shadow-md"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}

          {student.github_url && (
            <a
              href={student.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${student.name} on GitHub`}
              title="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:bg-slate-50 hover:text-navy-900 hover:shadow-md"
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          {!student.linkedin_url && !student.github_url && (
            <span className="text-[11px] text-slate-400">
              No social profiles
            </span>
          )}

        </div>

        {/* Profile Link */}
        <Link
          to={`/students/${student.id}`}
          className="mx-auto mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#c9784d] transition-all duration-300 hover:gap-2.5 hover:text-[#b7633a]"
        >
          <span>View Profile</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

      </div>
    </article>
  );
}