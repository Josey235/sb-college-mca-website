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
        bg-[#14110F]
        text-white
        py-16 sm:py-20
        relative
        overflow-hidden
        border-b border-[#211C19]
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

      {/* Soft orange glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(201, 111, 69, 0.055), transparent 65%)',
        }}
      />

      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl space-y-3">

          {/* Badge */}
          <span
            className="
              inline-flex
              px-3.5 py-1
              rounded-full
              text-xs
              font-semibold
              bg-[#C96F45]/20
              text-[#E08A5B]
              border border-[#C96F45]/40
            "
          >
            {badge}
          </span>

          {/* Heading */}
          <h1
            className="
              text-3xl
              sm:text-5xl
              font-extrabold
              font-display
              leading-tight
            "
          >
            {title}{' '}

            <span className="text-[#C96F45]">
              {highlight}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {description}
          </p>

        </div>
      </div>

    </div>
  );
}