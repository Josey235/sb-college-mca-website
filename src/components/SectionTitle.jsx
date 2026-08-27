import React from 'react';

export default function SectionTitle({
  badge,
  title,
  highlightText,
  subtitle,
  center = true,
  dark = false,
  className = ""
}) {
  return (
    <div className={`mb-12 ${center ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${
          dark 
            ? 'bg-academic-950/60 text-academic-300 border-academic-500/30' 
            : 'bg-academic-50 text-academic-700 border-academic-200 shadow-sm'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-academic-500 animate-pulse"></span>
          {badge}
        </div>
      )}

      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight ${
        dark ? 'text-white' : 'text-navy-900'
      }`}>
        {title}{' '}
        {highlightText && (
          <span className="text-gradient">
            {highlightText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${
          dark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}

      <div className={`h-1 w-16 bg-gradient-to-r from-academic-600 to-cyan-400 rounded-full mt-5 ${
        center ? 'mx-auto' : ''
      }`} />
    </div>
  );
}

