import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Trophy
} from 'lucide-react';

export default function EventCard({ event, isPast = false, onRegister }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      
      {/* Event Banner */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-navy-950">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${
            isPast 
              ? 'bg-navy-900/90 text-slate-300 border-slate-700' 
              : 'bg-academic-600/95 text-white border-academic-400/40 shadow-sm'
          }`}>
            {event.category}
          </span>
        </div>

        {/* Date Stamp Top Right */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-navy-950/85 text-academic-300 border border-navy-700 backdrop-blur-md flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-academic-400" />
            {event.date}
          </span>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-navy-900 font-display group-hover:text-academic-600 transition-colors">
            {event.title}
          </h3>

          {/* Time & Venue */}
          <div className="mt-3 space-y-1.5 text-xs text-slate-500">
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-academic-500 shrink-0" />
                <span>{event.time}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-academic-500 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {event.description}
          </p>

          {/* Highlights / Stats */}
          {event.highlights && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {event.highlights.slice(0, 3).map((item, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-academic-50 text-academic-700 border border-academic-100"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          )}

          {isPast && event.stats && (
            <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
              <span className="text-academic-600 font-bold">Impact: </span>
              {event.stats}
            </div>
          )}

          {isPast && event.winner && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-700 font-medium">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{event.winner}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          {!isPast && event.registrationOpen ? (
            <button
              onClick={() => onRegister && onRegister(event)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-academic-600 hover:bg-academic-700 transition-colors shadow-sm hover:shadow flex items-center justify-center gap-2"
            >
              <span>Register for Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="text-center text-xs font-semibold text-slate-400 py-1">
              {isPast ? "Event Concluded Successfully" : "Registration Closed"}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

