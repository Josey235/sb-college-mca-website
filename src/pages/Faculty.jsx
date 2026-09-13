import React, { useEffect, useState } from 'react';
import FacultyCard from '../components/FacultyCard';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

export default function Faculty() {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchFaculty() {
      setLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('Faculty')
        .select(
          'id, created_at, name, title, designation, role, is_hod, is_tutor, department, qualification, email, photo_url, display_order'
        )
        .order('display_order', { ascending: true });

      if (fetchError) {
        console.error('Error fetching faculty:', fetchError);

        setError(
          'Unable to load faculty profiles right now.'
        );

        setFacultyMembers([]);
        setLoading(false);
        return;
      }

      const formattedFaculty = (data || []).map((faculty) => ({
        ...faculty,

        // Convert database field names to the names
        // expected by FacultyCard.
        isHOD: faculty.is_hod ?? false,
        isTutor: faculty.is_tutor ?? false,

        // FacultyCard expects `photo`.
        photo: faculty.photo_url || null,

        // These are real faculty records.
        isPlaceholder: false,
      }));

      setFacultyMembers(formattedFaculty);
      setLoading(false);
    }

    fetchFaculty();
  }, []);

  return (
    <div className="pb-20">

      {/* =========================================================
          HERO HEADER
      ========================================================= */}
      <PageHero
        badge="Department Mentors"
        title="Faculty"
        highlight="Directory"
        description="Faculty members of the Department of Computer Applications (MCA), St. Berchmans College, Changanassery."
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          pt-10
          sm:px-6
          sm:pt-11
          lg:px-8
        "
      >

        {/* =====================================================
            LOADING STATE
        ===================================================== */}
        {loading && (
          <div className="flex min-h-[220px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-stone-500">

              <div
                className="
                  h-5
                  w-5
                  animate-spin
                  rounded-full
                  border-2
                  border-stone-300
                  border-t-[#c9784d]
                "
              />

              <span>
                Loading faculty profiles...
              </span>

            </div>
          </div>
        )}

        {/* =====================================================
            ERROR STATE
        ===================================================== */}
        {!loading && error && (
          <div
            className="
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-5
              py-4
              text-sm
              text-red-700
            "
          >
            {error}
          </div>
        )}

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}
        {!loading && !error && facultyMembers.length === 0 && (
          <div
            className="
              flex
              min-h-[220px]
              items-center
              justify-center
              rounded-2xl
              border
              border-stone-200
              bg-white
            "
          >
            <p className="text-sm text-stone-500">
              No faculty profiles are available yet.
            </p>
          </div>
        )}

        {/* =====================================================
            FACULTY CARDS
        ===================================================== */}
        {!loading && !error && facultyMembers.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              gap-7
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {facultyMembers.map((faculty) => (
              <FacultyCard
                key={faculty.id}
                faculty={faculty}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}