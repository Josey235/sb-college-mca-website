import React, { useEffect, useState } from 'react';
import StudentCard from '../components/StudentCard';
import { supabase } from '../lib/supabase';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('Students')
        .select(
          'id, created_at, name, roll_number, email, phone, batch, photo_url, bio, linkedin_url, github_url'
        )
        .order('id', { ascending: true });

      if (fetchError) {
        console.error('Error fetching students:', fetchError);
        setError('Unable to load student information right now.');
        setStudents([]);
      } else {
        setStudents(data || []);
      }

      setLoading(false);
    }

    fetchStudents();
  }, []);

  return (
    <div className="bg-[#f8f9f8] min-h-screen pb-20">

      {/* Hero Header */}
      <section className="bg-[#f8f9f8] border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

          <div className="max-w-3xl">

            {/* Labels */}
            <div className="flex items-center gap-2 flex-wrap mb-4">

              <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold bg-[#c9784d] text-white border border-[#c9784d]">
                Department Directory
              </span>

              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#fff4d6] text-[#a96f00] border border-[#e8c96b]">
                Batch 2026–2028
              </span>

            </div>

            {/* Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight">
              MCA{' '}
              <span className="text-[#c9784d]">
                Students
              </span>
            </h1>

            {/* Description */}
            <p className="mt-3 text-stone-500 text-sm sm:text-base max-w-2xl leading-relaxed">
              Inaugural cohort of the Master of Computer Applications programme
              at St. Berchmans College, Changanassery (Batch 2026–2028).
            </p>

          </div>

        </div>
      </section>

      {/* Students */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#c9784d] mb-4" />

            <p className="text-sm font-medium">
              Loading student profiles...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">

            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />

            <div>
              <p className="font-semibold">
                Unable to load students
              </p>

              <p className="text-sm mt-1">
                {error}
              </p>
            </div>

          </div>
        )}

        {/* Empty State */}
        {!loading && !error && students.length === 0 && (
          <div className="py-20 text-center">

            <div className="max-w-md mx-auto">

              <h2 className="font-serif text-2xl text-stone-900">
                No student profiles yet
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Student information will appear here once profiles are added
                to the department database.
              </p>

            </div>

          </div>
        )}

        {/* Student Cards */}
        {!loading && !error && students.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
              />
            ))}

          </div>
        )}

      </main>

    </div>
  );
}