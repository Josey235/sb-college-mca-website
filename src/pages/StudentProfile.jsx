import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  ArrowLeft,
  User,
  GraduationCap,
  Loader2,
  AlertCircle,
  Linkedin,
  Github
} from 'lucide-react';

export default function StudentProfile() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStudent() {
      setLoading(true);
      setError('');

      const numericId = Number(id);

      if (!Number.isInteger(numericId)) {
        setError('Invalid student profile.');
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('Students')
        .select(
          'id, created_at, name, roll_number, email, phone, batch, photo_url, bio, linkedin_url, github_url'
        )
        .eq('id', numericId)
        .single();

      if (fetchError) {
        console.error('Error fetching student profile:', fetchError);
        setError('Student profile could not be found.');
        setStudent(null);
      } else {
        setStudent(data);
      }

      setLoading(false);
    }

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-academic-600 mb-4" />

        <p className="text-sm font-medium">
          Loading student profile...
        </p>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <Link
          to="/students"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-academic-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </Link>

        <div className="mt-10 p-6 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />

          <div>
            <p className="font-semibold">
              Student profile unavailable
            </p>

            <p className="text-sm mt-1">
              {error || 'The requested student profile does not exist.'}
            </p>
          </div>
        </div>

      </div>
    );
  }

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

        {/* Profile Header */}
        <div className="px-6 sm:px-10">

          <div className="relative">

            {/* Avatar */}
            <div className="absolute left-0 -top-16 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-slate-100 flex items-center justify-center text-slate-400">

              {student.photo_url ? (
                <img
                  src={student.photo_url}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-slate-300" />
              )}

            </div>

            {/* Student Information */}
            <div className="pt-6 sm:pt-7 pb-6 pl-36 sm:pl-40 border-b border-slate-100">

              <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase bg-academic-50 text-academic-700 border border-academic-200 inline-block">
                MCA Batch {student.batch || '2026–2028'}
              </span>

              <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-navy-900 font-display leading-tight">
                {student.name}
              </h1>

              {student.roll_number && (
                <p className="text-xs sm:text-sm font-semibold text-academic-600 mt-1">
                  Roll No. {student.roll_number}
                </p>
              )}

              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Department of Computer Applications, St. Berchmans College,
                Changanassery
              </p>

              {/* Social Links */}
              {(student.linkedin_url || student.github_url) && (
                <div className="flex items-center gap-2 mt-4">

                  {student.linkedin_url && (
                    <a
                      href={student.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold transition-all duration-200 hover:bg-academic-50 hover:border-academic-200 hover:text-academic-600 hover:-translate-y-0.5"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {student.github_url && (
                    <a
                      href={student.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold transition-all duration-200 hover:bg-navy-50 hover:border-navy-200 hover:text-navy-900 hover:-translate-y-0.5"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}

                </div>
              )}

            </div>

          </div>

          {/* Details Section */}
          <div className="mt-8 pb-10">

            {/* Academic Overview */}
            <div>

              <h3 className="text-sm font-bold text-navy-900 font-display uppercase tracking-wider mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-academic-600" />
                <span>Academic Overview</span>
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {student.bio ||
                  'MCA Batch 2026–2028 scholar at St. Berchmans College, Changanassery. Additional profile details and project showcases will be updated as the academic session progresses.'}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}