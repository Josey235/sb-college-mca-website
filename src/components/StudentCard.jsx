import React from 'react';
import { Link } from 'react-router-dom';
import { User, ArrowRight, Sparkles } from 'lucide-react';

export default function StudentCard({ student }) {
  const isPlaceholder = student.isPlaceholder;

  return (
    <div className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
      isPlaceholder 
        ? 'bg-slate-50/70 border-dashed border-slate-300 p-5' 
        : 'bg-white border-slate-200 shadow-card hover:shadow-card-hover p-5 hover:-translate-y-1'
    }`}>
      
      {/* Top Header */}
      <div>
        <div className="flex items-start gap-4">
          
          {/* Avatar Container */}
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
            {student.photo ? (
              <img 
                src={student.photo} 
                alt={student.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-slate-300" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-academic-50 text-academic-700 border border-academic-200 inline-block mb-1">
              MCA Batch {student.batch}
            </span>

            <h3 className={`text-base font-bold font-display truncate ${
              isPlaceholder ? 'text-slate-400' : 'text-navy-900'
            }`}>
              {student.name}
            </h3>

            <p className="text-[11px] text-slate-500">
              {student.batchLabel || "First MCA Batch"}
            </p>
          </div>

        </div>

        {/* Short info */}
        <div className="mt-4 text-xs text-slate-500">
          {isPlaceholder ? (
            <p className="italic text-slate-400">Student information will be updated soon.</p>
          ) : (
            <p className="text-slate-600">Postgraduate Scholar at St. Berchmans College</p>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          {isPlaceholder ? "Available Slot" : "MCA Scholar"}
        </span>

        {!isPlaceholder && (
          <Link
            to={`/students/${student.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-academic-600 hover:text-academic-700"
          >
            <span>View Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

    </div>
  );
}
