import React, { useEffect, useState } from 'react';
import FacultyCard from '../components/FacultyCard';
import { Info } from 'lucide-react';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

const FACULTY_BUCKET = 'faculty-photos';

export default function Faculty() {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchFaculty() {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('Faculty')
        .select(
          'id, created_at, name, title, designation, role, is_hod, is_tutor, department, qualification, email, photo_url, photo_filename, display_order'
        )
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching faculty:', error);
        setError('Unable to load faculty profiles right now.');
        setFacultyMembers([]);
        setLoading(false);
        return;
      }

      const formattedFaculty = (data || []).map((faculty) => {
        let photo = faculty.photo_url || null;

        /*
         * If photo_url is empty but photo_filename exists,
         * generate the public Supabase Storage URL automatically.
         */
        if (!photo && faculty.photo_filename) {
          const { data: publicUrlData } = supabase.storage
            .from(FACULTY_BUCKET)
            .getPublicUrl(faculty.photo_filename);

          photo = publicUrlData?.publicUrl || null;
        }

        return {
          ...faculty,

          // Convert database field names to the names
          // expected by FacultyCard.
          isHOD: faculty.is_hod ?? false,
          isTutor: faculty.is_tutor ?? false,

          // PhotoCard expects `photo`.
          photo,

          // Real database faculty members are not placeholders.
          isPlaceholder: false,
        };
      });

      setFacultyMembers(formattedFaculty);
      setLoading(false);
    }

    fetchFaculty();
  }, []);

  return (
    <div className="space-y-16 pb-20">

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Department Information */}
        <div className="p-4 rounded-2xl bg-academic-50 border border-academic-200 text-xs sm:text-sm text-academic-900 flex items-start gap-3">

          <Info className="w-5 h-5 text-academic-600 shrink-0 mt-0.5" />

          <div>
            <p className="font-semibold text-navy-900">
              Department Leadership
            </p>

            <p className="text-slate-600 mt-0.5">
              The MCA Department faculty profiles are loaded directly from
              the department database.
            </p>
          </div>

        </div>

        {/* =========================================================
            LOADING STATE
        ========================================================= */}
        {loading && (
          <div className="min-h-[220px] flex items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-stone-500">

              <div className="w-5 h-5 border-2 border-stone-300 border-t-[#c9784d] rounded-full animate-spin" />

              <span>
                Loading faculty profiles...
              </span>

            </div>
          </div>
        )}

        {/* =========================================================
            ERROR STATE
        ========================================================= */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* =========================================================
            EMPTY STATE
        ========================================================= */}
        {!loading && !error && facultyMembers.length === 0 && (
          <div className="min-h-[220px] flex items-center justify-center rounded-2xl border border-stone-200 bg-white">
            <p className="text-sm text-stone-500">
              No faculty profiles are available yet.
            </p>
          </div>
        )}

        {/* =========================================================
            FACULTY CARDS
        ========================================================= */}
        {!loading && !error && facultyMembers.length > 0 && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">

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