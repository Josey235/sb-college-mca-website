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
    <article
      className="
        group relative overflow-hidden rounded-3xl
        border border-[#d3cbc0]
        bg-[#f1ede7]
        shadow-[0_8px_30px_rgba(72,61,49,0.10)]
        transition-all duration-500
        hover:-translate-y-2
        hover:shadow-[0_20px_45px_rgba(72,61,49,0.17)]
      "
    >

      {/* Photo Area */}
      <div className="relative h-[390px] overflow-hidden bg-[#ded7cd]">

        {/* Student Photo */}
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={student.name}
            className="
              absolute inset-0 h-full w-full
              object-cover object-top
              transition-transform duration-700 ease-out
              group-hover:scale-[1.035]
            "
            loading="lazy"
          />
        ) : (
          <div
            className="
              absolute inset-0
              flex items-center justify-center
              bg-[#ded7cd]
            "
          >
            <div
              className="
                flex h-28 w-28 items-center justify-center
                rounded-full
                bg-[#f1ede7]/90
                shadow-sm
              "
            >
              <User className="h-14 w-14 text-[#9a8d7e]" />
            </div>
          </div>
        )}

        {/* Subtle Brown-Beige Photo Tint */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-[#766653]/[0.12]
            mix-blend-multiply
          "
        />

        {/* Soft Paper-Tone Highlight */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-br
            from-[#eee9e1]/25
            via-transparent
            to-[#625342]/[0.07]
          "
        />

        {/* Very Subtle Top Lighting */}
        <div
          className="
            absolute inset-x-0 top-0 h-24
            bg-gradient-to-b
            from-[#4f4438]/10
            to-transparent
          "
        />

        {/* Main Parchment Fade */}
        <div
          className="
            absolute inset-x-0 bottom-0 h-[42%]
            bg-gradient-to-t
            from-[#f1ede7]
            via-[#f1ede7]/90
            via-[#f1ede7]/55
            to-transparent
          "
        />

        {/* Lower Smoke Layer - Left */}
        <div
          className="
            absolute -left-12 bottom-2
            h-28 w-48
            rounded-full
            bg-[#f1ede7]/90
            blur-3xl
          "
        />

        {/* Lower Smoke Layer - Center */}
        <div
          className="
            absolute left-1/4 bottom-0
            h-32 w-56
            rounded-full
            bg-[#f1ede7]/95
            blur-3xl
          "
        />

        {/* Lower Smoke Layer - Right */}
        <div
          className="
            absolute -right-12 bottom-2
            h-28 w-48
            rounded-full
            bg-[#f1ede7]/90
            blur-3xl
          "
        />

        {/* Soft Final Fade Into Card */}
        <div
          className="
            absolute inset-x-0 bottom-0 h-24
            bg-gradient-to-t
            from-[#f1ede7]
            via-[#f1ede7]/70
            to-transparent
          "
        />

      </div>

      {/* Student Information */}
      <div className="relative -mt-16 px-6 pb-6 text-center">

        {/* Batch */}
        <span
          className="
            relative z-10
            inline-flex rounded-full
            border border-[#cfc2b2]
            bg-[#e9e3da]
            px-3 py-1
            text-[10px] font-bold uppercase tracking-wider
            text-[#8d7258]
            shadow-sm
          "
        >
          MCA Batch {student.batch || '2026–2028'}
        </span>

        {/* Name */}
        <h3
          className="
            relative z-10 mt-3 truncate
            font-display text-xl font-bold
            text-[#40382f]
          "
        >
          {student.name}
        </h3>

        {/* Roll Number */}
        <p className="mt-1 text-xs font-medium text-[#987a5f]">
          {student.roll_number || 'MCA Scholar'}
        </p>

        {/* Bio */}
        <p
          className="
            mx-auto mt-3 min-h-[40px] max-w-[280px]
            text-xs leading-relaxed
            text-[#756b60]
            line-clamp-2
          "
        >
          {bio || 'Postgraduate Scholar at St. Berchmans College'}
        </p>

        {/* Social Links */}
        <div className="mt-5 flex items-center justify-center gap-3">

          {/* LinkedIn */}
          {student.linkedin_url && (
            <a
              href={student.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${student.name} on LinkedIn`}
              title="LinkedIn"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-[#d2c8bb]
                bg-[#f8f5f0]
                text-[#5d554c]
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[#9b8066]
                hover:bg-[#e7dfd4]
                hover:text-[#80664d]
                hover:shadow-md
              "
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}

          {/* GitHub */}
          {student.github_url && (
            <a
              href={student.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${student.name} on GitHub`}
              title="GitHub"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-[#d2c8bb]
                bg-[#f8f5f0]
                text-[#5d554c]
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[#9b8066]
                hover:bg-[#e7dfd4]
                hover:text-[#40382f]
                hover:shadow-md
              "
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          {/* No Social Profiles */}
          {!student.linkedin_url && !student.github_url && (
            <span className="text-[11px] text-[#94897c]">
              No social profiles
            </span>
          )}

        </div>

        {/* Profile Link */}
        <Link
          to={`/students/${student.id}`}
          className="
            mx-auto mt-5
            inline-flex items-center gap-1.5
            text-xs font-bold
            text-[#987a5f]
            transition-all duration-300
            hover:gap-2.5
            hover:text-[#795d45]
          "
        >
          <span>View Profile</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

      </div>
    </article>
  );
}