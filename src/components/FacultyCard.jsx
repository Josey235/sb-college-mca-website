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
            border-[#d3cbc0]
            bg-[#f1ede7]
          `
          : `
            border-[#d3cbc0]
            bg-[#f1ede7]
            shadow-[0_8px_30px_rgba(72,61,49,0.10)]
            hover:shadow-[0_22px_50px_rgba(72,61,49,0.17)]
          `
      }`}
    >
      {/* =========================================================
          PHOTO SECTION
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
              bg-[#ded7cd]
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
                bg-[#f1ede7]
              "
            >
              <span
                className="
                  font-display
                  text-3xl
                  font-bold
                  text-[#6f6254]
                "
              >
                {getInitials(faculty.name)}
              </span>
            </div>
          </div>
        )}

        {/* =====================================================
            VERY SUBTLE PHOTO TONE
        ===================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[#766653]/[0.02]
            mix-blend-multiply
          "
        />

        {/* =====================================================
            CLEAN PHOTO → PAPER FADE

            No blurred cloud effects.
            The real torn-paper PNG handles the edge.
        ===================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-[32%]
            bg-gradient-to-t
            from-[#f1ede7]
            via-[#f1ede7]/55
            to-transparent
          "
        />
      </div>

      {/* =========================================================
          PAPER INFORMATION SECTION
      ========================================================= */}
      <div
        className="
          relative
          z-10
          bg-[#f1ede7]
          px-5
          pb-5
          pt-[31px]
        "
      >
        {/* =====================================================
            REAL TORN PAPER PNG
        ===================================================== */}
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
            SOFT PAPER BLEND

            This only blends the lower part of the PNG.
            It does NOT create a cloud effect.
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
            via-[#f1ede7]/45
            to-[#f1ede7]
          "
        />

        {/* =====================================================
            FACULTY INFORMATION
        ===================================================== */}
        <div className="relative z-30 text-center">

          {/* ===================================================
              ROLE BADGE
          =================================================== */}
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

          {/* ===================================================
              NAME
          =================================================== */}
          <h3
            className={`mt-2 font-display text-lg font-bold leading-snug ${
              isPlaceholder
                ? 'text-[#9a8d7e]'
                : 'text-[#40382f]'
            }`}
          >
            {faculty.name}
          </h3>

          {/* ===================================================
              DESIGNATION
          =================================================== */}
          <p
            className="
              mt-1
              text-xs
              font-semibold
              text-[#a0643c]
            "
          >
            {faculty.designation}
          </p>

          {/* ===================================================
              DEPARTMENT + QUALIFICATION
          =================================================== */}
          <div
            className="
              mt-3
              space-y-1.5
              border-t
              border-[#ddd4c8]
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
                  text-[#756b60]
                "
              >
                <Building
                  className="
                    h-3.5
                    w-3.5
                    shrink-0
                    text-[#c2764d]
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
                  text-[#756b60]
                "
              >
                <GraduationCap
                  className="
                    h-3.5
                    w-3.5
                    shrink-0
                    text-[#c2764d]
                  "
                />

                <span
                  className="
                    truncate
                    font-medium
                    text-[#5f574f]
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
          border-[#ddd4c8]
          bg-[#ebe5dc]
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
              text-[#a0643c]
              transition-colors
              hover:text-[#79543c]
              hover:underline
            "
            title={`Email ${faculty.name}`}
          >
            <Mail
              className="
                h-3.5
                w-3.5
                shrink-0
                text-[#c2764d]
              "
            />

            <span className="max-w-[200px] truncate">
              {faculty.email}
            </span>
          </a>
        ) : isPlaceholder ? (
          <span className="text-[#9a8d7e]">
            Profile will be updated soon
          </span>
        ) : (
          <span className="font-medium text-[#a0643c]">
            St. Berchmans College
          </span>
        )}
      </div>
    </article>
  );
}