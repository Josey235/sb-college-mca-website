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
  Github,
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

  /* =========================================================
      LOADING
  ========================================================== */

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#E4DACC] text-stone-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#C96F45] mb-4" />

        <p className="text-sm font-medium">
          Loading student profile...
        </p>
      </div>
    );
  }

  /* =========================================================
      ERROR
  ========================================================== */

  if (error || !student) {
    return (
      <div className="min-h-[70vh] bg-[#E4DACC] py-12">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <Link
            to="/students"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-stone-600
              hover:text-[#C96F45]
              transition-colors
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Students
          </Link>

          <div
            className="
              mt-10
              p-6
              rounded-2xl
              bg-[#F8F3EC]
              border
              border-[#D8CABB]
              text-[#8B4E38]
              flex
              items-start
              gap-3
              shadow-[0_10px_30px_rgba(80,65,48,0.06)]
            "
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />

            <div>
              <p className="font-semibold">
                Student profile unavailable
              </p>

              <p className="text-sm mt-1 text-[#876F60]">
                {error || 'The requested student profile does not exist.'}
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  /* =========================================================
      MAIN PROFILE
  ========================================================== */

  return (
    <div className="min-h-screen bg-[#E4DACC] py-8 sm:py-10 pb-20">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            BACK BUTTON
        ====================================================== */}

        <div className="mb-6">

          <Link
            to="/students"
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              sm:text-sm
              font-bold
              text-stone-600
              hover:text-[#C96F45]
              transition-colors
              px-2.5
              py-2
              rounded-lg
              hover:bg-[#F3ECE3]
            "
          >
            <ArrowLeft className="w-4 h-4" />

            <span>
              Back to Students
            </span>
          </Link>

        </div>

        {/* =====================================================
            PROFILE CARD
        ====================================================== */}

        <div
          className="
            bg-[#F8F5EF]
            rounded-[2rem]
            border
            border-[#D8CABB]
            shadow-[0_20px_55px_rgba(80,65,48,0.10)]
            overflow-hidden
          "
        >

          {/* ===================================================
              TOP HEADER BANNER
          ==================================================== */}

          <div
            className="
              relative
              h-32
              sm:h-36
              overflow-hidden
              bg-[#14110F]
              border-b
              border-[#211C19]
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

            {/* Banner Content */}

            <div className="relative z-10 h-full">

              <div className="absolute left-6 sm:left-10 top-7">

                <div className="w-10 h-px bg-[#C96F45] mb-3" />

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    font-semibold
                    text-slate-300
                  "
                >
                  MCA · Inaugural Cohort
                </span>

              </div>

            </div>

          </div>

          {/* ===================================================
              PROFILE HEADER
          ==================================================== */}

          <div className="px-6 sm:px-10">

            <div className="relative">

              {/* =================================================
                  AVATAR
              ================================================== */}

              <div
                className="
                  absolute
                  left-0
                  -top-16
                  w-28
                  h-28
                  sm:w-32
                  sm:h-32
                  rounded-3xl
                  overflow-hidden
                  border-4
                  border-[#F8F5EF]
                  shadow-[0_12px_30px_rgba(45,35,25,0.18)]
                  bg-[#E8DED1]
                  flex
                  items-center
                  justify-center
                "
              >

                {student.photo_url ? (
                  <img
                    src={student.photo_url}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-[#B7A99A]" />
                )}

              </div>

              {/* =================================================
                  STUDENT INFORMATION
              ================================================== */}

              <div
                className="
                  pt-6
                  sm:pt-7
                  pb-7
                  pl-36
                  sm:pl-40
                  border-b
                  border-[#DED5CA]
                "
              >

                {/* Batch */}

                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    text-[10px]
                    sm:text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    bg-[#E9D8C8]
                    text-[#9C573B]
                    border
                    border-[#D9C0AA]
                    inline-block
                  "
                >
                  MCA Batch {student.batch || '2026–2028'}
                </span>

                {/* Name */}

                <h1
                  className="
                    mt-2
                    text-2xl
                    sm:text-3xl
                    font-extrabold
                    text-[#29231E]
                    font-display
                    leading-tight
                  "
                >
                  {student.name}
                </h1>

                {/* Roll Number */}

                {student.roll_number && (
                  <p
                    className="
                      text-xs
                      sm:text-sm
                      font-semibold
                      text-[#C96F45]
                      mt-1
                    "
                  >
                    Roll No. {student.roll_number}
                  </p>
                )}

                {/* Department */}

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-[#75695D]
                    mt-1
                    leading-relaxed
                  "
                >
                  Department of Computer Applications, St. Berchmans College,
                  Changanassery
                </p>

                {/* =================================================
                    SOCIAL LINKS
                ================================================== */}

                {(student.linkedin_url || student.github_url) && (
                  <div className="flex items-center gap-2 mt-4">

                    {/* LinkedIn */}

                    {student.linkedin_url && (
                      <a
                        href={student.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${student.name} on LinkedIn`}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-2
                          rounded-xl
                          border
                          border-[#D8CABB]
                          bg-[#F4EEE6]
                          text-[#75695D]
                          text-xs
                          font-semibold
                          transition-all
                          duration-200
                          hover:bg-[#EDE0D3]
                          hover:border-[#CBA98F]
                          hover:text-[#A65E3E]
                          hover:-translate-y-0.5
                        "
                      >
                        <Linkedin className="w-4 h-4" />

                        <span>
                          LinkedIn
                        </span>
                      </a>
                    )}

                    {/* GitHub */}

                    {student.github_url && (
                      <a
                        href={student.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${student.name} on GitHub`}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-2
                          rounded-xl
                          border
                          border-[#D8CABB]
                          bg-[#F4EEE6]
                          text-[#75695D]
                          text-xs
                          font-semibold
                          transition-all
                          duration-200
                          hover:bg-[#E8E0D6]
                          hover:border-[#B9AA9B]
                          hover:text-[#3E342C]
                          hover:-translate-y-0.5
                        "
                      >
                        <Github className="w-4 h-4" />

                        <span>
                          GitHub
                        </span>
                      </a>
                    )}

                  </div>
                )}

              </div>

            </div>

            {/* =================================================
                DETAILS SECTION
            ================================================== */}

            <div className="mt-8 pb-10">

              <div>

                {/* Academic Overview Heading */}

                <h3
                  className="
                    text-sm
                    font-bold
                    text-[#3A3028]
                    font-display
                    uppercase
                    tracking-wider
                    mb-3
                    flex
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      w-8
                      h-8
                      rounded-lg
                      bg-[#E9D8C8]
                      text-[#C96F45]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <GraduationCap className="w-4 h-4" />
                  </span>

                  <span>
                    Academic Overview
                  </span>

                </h3>

                {/* Bio */}

                <div
                  className="
                    text-sm
                    text-[#75695D]
                    leading-relaxed
                    bg-[#F1EBE2]
                    p-5
                    rounded-2xl
                    border
                    border-[#DED5CA]
                  "
                >
                  {student.bio ||
                    'MCA Batch 2026–2028 scholar at St. Berchmans College, Changanassery. Additional profile details and project showcases will be updated as the academic session progresses.'}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            FOOTER NOTE
        ====================================================== */}

        <div className="mt-5 text-center">

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.2em]
              font-semibold
              text-[#978878]
            "
          >
            MCA Department · St. Berchmans College · 2026–2028
          </p>

        </div>

      </div>

    </div>
  );
}