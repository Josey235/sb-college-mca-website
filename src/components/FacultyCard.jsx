import React, { useState } from 'react';
import { User, Mail, GraduationCap, Building } from 'lucide-react';

export default function FacultyCard({ faculty }) {
  const [imageError, setImageError] = useState(false);

  const isPlaceholder = faculty.isPlaceholder;

  // Extract initials for fallback avatar
  const getInitials = (name) => {
    if (!name) return 'FC';

    const parts = name
      .replace(/^(Ms\.|Mr\.|Dr\.|Prof\.)\s*/i, '')
      .trim()
      .split(' ');

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }

    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${
        isPlaceholder
          ? 'border-dashed border-slate-300 bg-slate-50/70'
          : 'border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.14)]'
      }`}
    >
      {/* ================= PHOTO AREA ================= */}
      <div className="relative h-[390px] overflow-hidden bg-slate-100">

        {faculty.photo && !imageError ? (
          <img
            src={faculty.photo}
            alt={faculty.name}
            onError={() => setImageError(true)}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-academic-50 to-academic-100">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/80 shadow-sm">
              <span className="font-display text-4xl font-bold text-academic-800">
                {getInitials(faculty.name)}
              </span>
            </div>
          </div>
        )}

        {/* Subtle top lighting */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-white via-white/90 via-white/55 to-transparent" />

        {/* Smoke / Fog Layers */}
        <div className="absolute -left-12 bottom-2 h-28 w-48 rounded-full bg-white/85 blur-3xl" />

        <div className="absolute bottom-0 left-1/4 h-32 w-56 rounded-full bg-white/90 blur-3xl" />

        <div className="absolute -right-12 bottom-2 h-28 w-48 rounded-full bg-white/85 blur-3xl" />

        {/* Final fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/65 to-transparent" />

      </div>

      {/* ================= FACULTY INFORMATION ================= */}
      <div className="relative -mt-16 px-6 pb-6 text-center">

        {/* Role Badge */}
        <div className="relative z-10 mb-2 flex min-h-[28px] items-center justify-center">

          {faculty.isHOD ? (
            <span className="inline-flex rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-800 shadow-sm">
              Head of the Department
            </span>
          ) : faculty.isTutor ? (
            <span className="inline-flex rounded-full border border-academic-300 bg-academic-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-academic-800 shadow-sm">
              Tutor
            </span>
          ) : (
            <span className="inline-flex rounded-full border border-transparent px-3 py-1 text-[10px] font-medium text-transparent">
              &nbsp;
            </span>
          )}

        </div>

        {/* Faculty Name */}
        <h3
          className={`relative z-10 mt-3 font-display text-xl font-bold leading-snug ${
            isPlaceholder ? 'text-slate-400' : 'text-navy-900'
          }`}
        >
          {faculty.name}
        </h3>

        {/* Designation */}
        <p className="mt-1 text-xs font-semibold text-academic-700">
          {faculty.designation}
        </p>

        {/* Department & Qualification */}
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-left">

          {faculty.department && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Building className="h-3.5 w-3.5 shrink-0 text-academic-500" />

              <span className="truncate">
                {faculty.department}
              </span>
            </div>
          )}

          {faculty.qualification && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <GraduationCap className="h-3.5 w-3.5 shrink-0 text-academic-500" />

              <span className="truncate font-medium text-slate-700">
                {faculty.qualification}
              </span>
            </div>
          )}

        </div>

      </div>

      {/* ================= FOOTER / EMAIL ================= */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-6 py-3 text-center text-xs">

        {faculty.email ? (
          <a
            href={`mailto:${faculty.email}`}
            className="inline-flex items-center gap-1.5 font-medium text-academic-700 transition-colors hover:text-academic-900 hover:underline"
            title={`Email ${faculty.name}`}
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-academic-600" />

            <span className="max-w-[200px] truncate">
              {faculty.email}
            </span>
          </a>
        ) : isPlaceholder ? (
          <span className="text-slate-400">
            Profile will be updated soon
          </span>
        ) : (
          <span className="font-medium text-academic-600">
            St. Berchmans College
          </span>
        )}

      </div>
    </article>
  );
}