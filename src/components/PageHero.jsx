import React from 'react';

export default function PageHero({
  badge,
  title,
  highlight,
  description,
}) {
  return (
    <div
      className="
        relative
        overflow-hidden
        border-b
        border-[#211C19]
        bg-[#14110F]
        py-9
        sm:py-11
      "
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(255, 255, 255, 0.07) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.07) 1px,
            transparent 1px
          ),
          linear-gradient(
            rgba(255, 255, 255, 0.018) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.018) 1px,
            transparent 1px
          )
        `,
        backgroundSize: `
          74px 74px,
          74px 74px,
          148px 148px,
          148px 148px
        `,
      }}
    >
      {/* =====================================================
          SOFT ORANGE GLOW
      ===================================================== */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
        "
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(201, 111, 69, 0.055), transparent 65%)',
        }}
      />

      {/* =====================================================
          SUBTLE DARK OVERLAY
      ===================================================== */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          bg-black/10
        "
      />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}
      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div className="max-w-3xl space-y-2.5">

          {/* =================================================
              BADGE
          ================================================= */}
          <span
            className="
              inline-flex
              rounded-full
              border
              border-[#C96F45]/40
              bg-[#C96F45]/20
              px-3.5
              py-1
              text-xs
              font-semibold
              text-[#E08A5B]
            "
          >
            {badge}
          </span>

          {/* =================================================
              HEADING

              Explicit text-white prevents global heading
              styles from changing the title color.
          ================================================= */}
          <h1
            className="
              text-3xl
              font-extrabold
              leading-tight
              font-display
              text-white
              sm:text-5xl
            "
          >
            {title}{' '}

            <span className="text-[#C96F45]">
              {highlight}
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}
          <p
            className="
              text-sm
              leading-relaxed
              text-slate-300
              sm:text-base
            "
          >
            {description}
          </p>

        </div>
      </div>
    </div>
  );
}