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
    <div className="rounded-2xl border bg-white border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden p-5 hover:-translate-y-1">

      {/* Top Header */}
      <div>

        <div className="flex items-start gap-4">

          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">

            {photoUrl ? (
              <img
                src={photoUrl}
                alt={student.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <User className="w-8 h-8 text-slate-300" />
            )}

          </div>

          {/* Student Information */}
          <div className="flex-1 min-w-0">

            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-academic-50 text-academic-700 border border-academic-200 inline-block mb-1">
              MCA Batch {student.batch || '2026–2028'}
            </span>

            <h3 className="text-base font-bold font-display truncate text-navy-900">
              {student.name}
            </h3>

            <p className="text-[11px] text-slate-500">
              {student.roll_number || 'MCA Scholar'}
            </p>

          </div>

        </div>

        {/* Short Information */}
        <div className="mt-4 text-xs text-slate-500">

          {bio ? (
            <p className="text-slate-600 line-clamp-2">
              {bio}
            </p>
          ) : (
            <p className="text-slate-600">
              Postgraduate Scholar at St. Berchmans College
            </p>
          )}

        </div>

      </div>

      {/* Card Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">

        {/* Social Links */}
        <div className="flex items-center gap-2">

          {student.linkedin_url && (
            <a
              href={student.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${student.name} on LinkedIn`}
              title="LinkedIn"
              className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 flex items-center justify-center transition-all duration-200 hover:bg-academic-50 hover:border-academic-200 hover:text-academic-600 hover:-translate-y-0.5"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}

          {student.github_url && (
            <a
              href={student.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${student.name} on GitHub`}
              title="GitHub"
              className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 flex items-center justify-center transition-all duration-200 hover:bg-navy-50 hover:border-navy-200 hover:text-navy-900 hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {!student.linkedin_url && !student.github_url && (
            <span className="text-[11px] text-slate-400">
              {student.roll_number || 'MCA Scholar'}
            </span>
          )}

        </div>

        {/* Profile Link */}
        <Link
          to={`/students/${student.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-academic-600 hover:text-academic-700 transition-colors"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

      </div>

    </div>
  );
}