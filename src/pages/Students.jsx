import React, { useEffect, useState } from 'react';
import StudentCard from '../components/StudentCard';
import { supabase } from '../lib/supabase';
import { AlertCircle, Loader2 } from 'lucide-react';
import PageHero from '../components/PageHero';

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
    <div className="min-h-screen bg-[#f8f9f8] pb-20">

      {/* =========================================================
          HERO HEADER
      ========================================================= */}
      <PageHero
        badge="Department Directory"
        title="MCA"
        highlight="Students"
        description="Inaugural cohort of the Master of Computer Applications programme at St. Berchmans College, Changanassery (Batch 2026–2028)."
      />


      {/* =========================================================
          STUDENT CONTENT
      ========================================================= */}
      <main
        className="
          mx-auto
          max-w-7xl
          px-4
          pt-10
          sm:px-6
          lg:px-8
        "
      >

        {/* Loading State */}
        {loading && (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              py-20
              text-slate-500
            "
          >
            <Loader2
              className="
                mb-4
                h-8
                w-8
                animate-spin
                text-[#c9784d]
              "
            />

            <p className="text-sm font-medium">
              Loading student profiles...
            </p>
          </div>
        )}


        {/* Error State */}
        {!loading && error && (
          <div
            className="
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-5
              text-red-800
            "
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-semibold">
                Unable to load students
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          </div>
        )}


        {/* Empty State */}
        {!loading && !error && students.length === 0 && (
          <div className="py-20 text-center">

            <div className="mx-auto max-w-md">

              <h2 className="font-serif text-2xl text-stone-900">
                No student profiles yet
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Student information will appear here once profiles are
                added to the department database.
              </p>

            </div>

          </div>
        )}


        {/* Student Cards */}
        {!loading && !error && students.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              gap-7
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
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