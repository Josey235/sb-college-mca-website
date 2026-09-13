import React, { useState } from 'react';
import {
  Mail,
  GraduationCap,
  Building,
} from 'lucide-react';

import tornPaper from '../assets/torn-paper-top.png';

export default function FacultyCard({ faculty }) {
  const [imageError, setImageError] = useState(false);

  const isPlaceholder = faculty.isPlaceholder;

  const roleText =
    typeof faculty.role === 'string'
      ? faculty.role.trim()
      : '';

  const normalizedRole = roleText.toLowerCase();

  const isDirector =
    normalizedRole === 'director' ||
    normalizedRole.includes('director');

  const getInitials = (name) => {
    if (!name) return 'FC';

    const parts = name
      .replace(/^(Ms\.|Mr\.|Dr\.|Prof\.|Mrs\.)\s*/i, '')
      .trim()
      .split(' ');

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }

    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <article
      className={`group relative overflow-hidden rounded-[28px] border transition-all duration-500 ease-out hover:-translate-y-2 ${
        isPlaceholder
          ? `
            border-dashed
            border-slate-300
            bg-slate-50/70
          `
          : `
            border-slate-200
            bg-white
            shadow-[0_8px_30px_rgba(15,23,42,0.08)]
            hover:shadow-[0_22px_50px_rgba(15,23,42,0.14)]
          `
      }`}
    >
      {/* =========================================================
          PHOTO
      ========================================================= */}
      <div
        className="
          relative
          h-[300px]
          overflow-hidden
          bg-[#ded7cd]
        "
      >
        {faculty.photo && !imageError ? (
          <img
            src={faculty.photo}
            alt={faculty.name}
            onError={() => setImageError(true)}
            className="
              absolute
              inset-0
              block
              h-full
              w-full
              object-cover
              object-top
              transform-gpu
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.025]
            "
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-academic-50
              to-academic-100
            "
          >
            <div
              className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                bg-white
              "
            >
              <span
                className="
                  font-display
                  text-3xl
                  font-bold
                  text-academic-800
                "
              >
                {getInitials(faculty.name)}
              </span>
            </div>
          </div>
        )}

        {/* Subtle image tone */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[#766653]/[0.025]
            mix-blend-multiply
          "
        />

        {/* =====================================================
            BROAD PHOTO FADE
        ===================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-[38%]
            bg-gradient-to-t
            from-white
            via-white/70
            to-transparent
          "
        />

        {/* Uneven left fade */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-[-12px]
            left-[-10%]
            h-24
            w-[48%]
            rounded-full
            bg-white/50
            blur-2xl
          "
        />

        {/* Uneven center fade */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-[-15px]
            left-[28%]
            h-28
            w-[44%]
            rounded-full
            bg-white/35
            blur-3xl
          "
        />

        {/* Uneven right fade */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-[-12px]
            right-[-10%]
            h-24
            w-[48%]
            rounded-full
            bg-white/50
            blur-2xl
          "
        />
      </div>

      {/* =========================================================
          PAPER SECTION
      ========================================================= */}
      <div
        className="
          relative
          z-10
          bg-white
          px-5
          pb-5
          pt-[31px]
        "
      >
        {/* Real torn paper */}
        <img
          src={tornPaper}
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[-2%]
            top-[-39px]
            z-20
            block
            h-[68px]
            w-[104%]
            max-w-none
            select-none
          "
        />

        {/* =====================================================
            PAPER BLEND

            Hides the rectangular bottom boundary of the PNG.
        ===================================================== */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-[15px]
            z-[25]
            h-[18px]
            bg-gradient-to-b
            from-transparent
            via-white/55
            to-white
          "
        />

        {/* =====================================================
            FACULTY CONTENT
        ===================================================== */}
        <div className="relative z-30 text-center">

          {/* Role */}
          <div
            className="
              mb-1.5
              flex
              min-h-[26px]
              items-center
              justify-center
            "
          >
            {isDirector ? (
              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-[#b8a58f]
                  bg-[#e9e1d6]
                  px-3
                  py-1
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-wider
                  text-[#6f5b47]
                  shadow-sm
                "
              >
                Director
              </span>
            ) : faculty.isHOD ? (
              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-amber-300
                  bg-amber-100
                  px-3
                  py-1
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-wider
                  text-amber-800
                  shadow-sm
                "
              >
                Head of the Department
              </span>
            ) : faculty.isTutor ? (
              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-academic-300
                  bg-academic-100
                  px-3
                  py-1
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-wider
                  text-academic-800
                  shadow-sm
                "
              >
                Mentor
              </span>
            ) : (
              <span
                className="
                  inline-flex
                  px-3
                  py-1
                  text-[10px]
                  text-transparent
                "
              >
                &nbsp;
              </span>
            )}
          </div>

          {/* Name */}
          <h3
            className={`mt-2 font-display text-lg font-bold leading-snug ${
              isPlaceholder
                ? 'text-slate-400'
                : 'text-navy-900'
            }`}
          >
            {faculty.name}
          </h3>

          {/* Designation */}
          <p
            className="
              mt-1
              text-xs
              font-semibold
              text-academic-700
            "
          >
            {faculty.designation}
          </p>

          {/* Department + Qualification */}
          <div
            className="
              mt-3
              space-y-1.5
              border-t
              border-slate-100
              pt-3
              text-left
            "
          >
            {faculty.department && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-600
                "
              >
                <Building
                  className="
                    h-3.5
                    w-3.5
                    shrink-0
                    text-academic-500
                  "
                />

                <span className="truncate">
                  {faculty.department}
                </span>
              </div>
            )}

            {faculty.qualification && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-600
                "
              >
                <GraduationCap
                  className="
                    h-3.5
                    w-3.5
                    shrink-0
                    text-academic-500
                  "
                />

                <span
                  className="
                    truncate
                    font-medium
                    text-slate-700
                  "
                >
                  {faculty.qualification}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================
          EMAIL FOOTER
      ========================================================= */}
      <div
        className="
          border-t
          border-slate-100
          bg-slate-50/60
          px-5
          py-2.5
          text-center
          text-xs
        "
      >
        {faculty.email ? (
          <a
            href={`mailto:${faculty.email}`}
            className="
              inline-flex
              items-center
              gap-1.5
              font-medium
              text-academic-700
              transition-colors
              hover:text-academic-900
              hover:underline
            "
            title={`Email ${faculty.name}`}
          >
            <Mail
              className="
                h-3.5
                w-3.5
                shrink-0
                text-academic-600
              "
            />

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