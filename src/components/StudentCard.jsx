import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  ArrowRight,
  Linkedin,
  Github,
} from 'lucide-react';

import tornPaper from '../assets/torn-paper-top.png';

export default function StudentCard({ student }) {
  const photoUrl = student.photo_url;
  const bio = student.bio;

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#d3cbc0]
        bg-[#f1ede7]
        shadow-[0_8px_30px_rgba(72,61,49,0.10)]
        transition-all
        duration-500
        ease-out
        hover:-translate-y-2
        hover:shadow-[0_22px_50px_rgba(72,61,49,0.17)]
      "
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
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={student.name}
            loading="lazy"
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
              <User className="h-12 w-12 text-[#9a8d7e]" />
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

            This prevents a hard image-to-paper transition.
        ===================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-[38%]
            bg-gradient-to-t
            from-[#f1ede7]
            via-[#f1ede7]/70
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
            bg-[#f1ede7]/50
            blur-2xl
          "
        />

        {/* Uneven middle fade */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-[-15px]
            left-[28%]
            h-28
            w-[44%]
            rounded-full
            bg-[#f1ede7]/35
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
            bg-[#f1ede7]/50
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
          bg-[#f1ede7]
          px-5
          pb-5
          pt-[31px]
          text-center
        "
      >
        {/* =====================================================
            REAL TORN PAPER IMAGE

            The PNG is intentionally wider than the card so
            there can be no visible side edge.
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
            PAPER BLEND

            This is the important fix.

            A very soft paper-colored gradient sits over the
            bottom of the PNG. It hides the rectangular lower
            boundary while leaving the torn edge untouched.
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
            via-[#f1ede7]/55
            to-[#f1ede7]
          "
        />

        {/* =====================================================
            CONTENT
        ===================================================== */}
        <div className="relative z-30">

          {/* Batch */}
          <span
            className="
              inline-flex
              rounded-full
              border
              border-[#cfc2b2]
              bg-[#e9e3da]
              px-3
              py-1
              text-[9px]
              font-bold
              uppercase
              tracking-wider
              text-[#8d7258]
              shadow-sm
            "
          >
            MCA Batch {student.batch || '2026–2028'}
          </span>

          {/* Name */}
          <h3
            className="
              mt-2.5
              truncate
              font-display
              text-lg
              font-bold
              text-[#40382f]
            "
          >
            {student.name}
          </h3>

          {/* Roll */}
          <p
            className="
              mt-1
              text-[11px]
              font-medium
              text-[#987a5f]
            "
          >
            {student.roll_number || 'MCA Scholar'}
          </p>

          {/* Bio */}
          <p
            className="
              mx-auto
              mt-2
              min-h-[34px]
              max-w-[260px]
              text-[11px]
              leading-relaxed
              text-[#756b60]
              line-clamp-2
            "
          >
            {bio || 'Postgraduate Scholar at St. Berchmans College'}
          </p>

          {/* Social links */}
          {(student.linkedin_url || student.github_url) && (
            <div
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-2.5
              "
            >
              {student.linkedin_url && (
                <a
                  href={student.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${student.name} on LinkedIn`}
                  title="LinkedIn"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#d2c8bb]
                    bg-[#f8f5f0]
                    text-[#5d554c]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#9b8066]
                    hover:bg-[#e7dfd4]
                    hover:text-[#80664d]
                    hover:shadow-md
                  "
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              )}

              {student.github_url && (
                <a
                  href={student.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${student.name} on GitHub`}
                  title="GitHub"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#d2c8bb]
                    bg-[#f8f5f0]
                    text-[#5d554c]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#9b8066]
                    hover:bg-[#e7dfd4]
                    hover:text-[#40382f]
                    hover:shadow-md
                  "
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}

          {/* Profile */}
          <Link
            to={`/students/${student.id}`}
            className="
              mx-auto
              mt-4
              inline-flex
              items-center
              gap-1.5
              text-[11px]
              font-bold
              text-[#987a5f]
              transition-all
              duration-300
              hover:gap-2.5
              hover:text-[#795d45]
            "
          >
            <span>View Profile</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}