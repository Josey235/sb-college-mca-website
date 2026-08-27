import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { studentsList } from '../data/students';
import { ArrowLeft, User, GraduationCap, Sparkles } from 'lucide-react';

export default function StudentProfile() {
  const { id } = useParams();
  const student = studentsList.find(s => s.id === id) || studentsList[0];

  return (
    <div className="space-y-10 pb-20 pt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back Button */}
      <div>
        <Link
          to="/students"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-academic-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students</span>
        </Link>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        
        {/* Top Header Banner */}
        <div className="h-32 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 relative">
          <div className="absolute inset-0 bg-dots-dark opacity-20" />
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-10 pb-10 relative -mt-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left pb-6 border-b border-slate-100">
            
            {/* Avatar Container */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
              {student.photo ? (
                <img 
                  src={student.photo} 
                  alt={student.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-slate-300" />
              )}
            </div>

            <div className="space-y-1.5">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase bg-academic-50 text-academic-700 border border-academic-200 inline-block">
                MCA Batch {student.batch} (First Batch)
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
                {student.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500">
                Department of Computer Applications, St. Berchmans College, Changanassery
              </p>
            </div>

          </div>

          {/* Details Section */}
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-navy-900 font-display uppercase tracking-wider mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-academic-600" />
                <span>Academic Overview</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {student.about || "MCA Batch 2026–2028 scholar at St. Berchmans College, Changanassery. Additional profile details and project showcases will be updated as the academic session progresses."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Member of the Inaugural MCA Batch (2026–2028) at St. Berchmans College.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
