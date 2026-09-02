import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FacultyCard from '../components/FacultyCard';
import StudentCard from '../components/StudentCard';
import SectionTitle from '../components/SectionTitle';
import { facultyMembers } from '../data/faculty';
import { supabase } from '../lib/supabase';
import sbCollegeImg from '../assets/images/college/sb-college.jpg';

import {
  BookOpen,
  ArrowRight,
  Calendar,
  Code,
  Images,
} from 'lucide-react';

export default function Home() {
  const displayFaculty = facultyMembers.slice(0, 4);

  const [displayStudents, setDisplayStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [studentsError, setStudentsError] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      setStudentsLoading(true);
      setStudentsError('');

      const { data, error } = await supabase
        .from('Students')
        .select(
          'id, created_at, name, roll_number, email, phone, batch, photo_url, bio, linkedin_url, github_url'
        )
        .order('id', { ascending: true })
        .limit(4);

      if (error) {
        console.error('Error fetching homepage students:', error);
        setStudentsError('Unable to load student profiles right now.');
        setDisplayStudents([]);
      } else {
        setDisplayStudents(data || []);
      }

      setStudentsLoading(false);
    }

    fetchStudents();
  }, []);

  return (
    <div className="space-y-20 pb-20">

      {/* =========================================================
          1. HERO SECTION
      ========================================================= */}
      <Hero />

      {/* =========================================================
          2. ABOUT OUR MCA PROGRAMME
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-7">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#c9784d]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#796b5c]">
                About the MCA Programme
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-[#40382f] sm:text-5xl lg:text-[3.4rem]">
              Empowering Minds.
              <br />
              <span className="text-[#c9784d]">
                Building Futures.
              </span>
            </h2>

            <div className="mb-6 mt-6 h-px w-12 bg-[#c9784d]" />

            <div className="max-w-2xl space-y-5">

              <p className="font-serif text-lg leading-relaxed text-[#62574c] sm:text-xl">
                The Master of Computer Applications (MCA) programme at{' '}
                <strong className="font-semibold text-[#40382f]">
                  St. Berchmans College, Changanassery
                </strong>
                , began in{' '}
                <strong className="font-semibold text-[#40382f]">
                  2026
                </strong>
                . The{' '}
                <strong className="font-semibold text-[#40382f]">
                  MCA Batch 2026–2028
                </strong>{' '}
                represents the first batch of the programme.
              </p>

              <p className="text-[15px] leading-7 text-[#796b5c] sm:text-base">
                The department is led by{' '}
                <strong className="font-semibold text-[#51463b]">
                  Mrs. Smitha Krishnan
                </strong>
                , Head of the Department. As the inaugural cohort, the
                2026–2028 batch marks a foundational milestone in postgraduate
                computer science education at St. Berchmans College.
              </p>

            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Programme Launch */}
              <div className="rounded-lg border border-[#d5c2aa] bg-[#f4ebdd] p-5">

                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a8875]">
                  Programme Launch
                </span>

                <span className="font-serif text-2xl text-[#40382f]">
                  Year 2026
                </span>

                <p className="mt-1.5 text-xs text-[#796b5c]">
                  Newly started postgraduate programme
                </p>

              </div>

              {/* Inaugural Batch */}
              <div className="rounded-lg border border-[#d5c2aa] bg-[#f4ebdd] p-5">

                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a8875]">
                  Inaugural Batch
                </span>

                <span className="font-serif text-2xl text-[#40382f]">
                  2026–2028
                </span>

                <p className="mt-1.5 text-xs text-[#796b5c]">
                  First MCA Batch of SB College
                </p>

              </div>

            </div>

            <div className="mt-8">

              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#a96846] hover:text-[#8f593b]"
              >
                <span>
                  Read more about our MCA Department
                </span>

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

            </div>

          </div>

          {/* RIGHT COLLEGE IMAGE */}
          <div className="lg:col-span-5">

            <div className="relative">

              <div className="absolute -inset-4 rounded-[2rem] bg-[#d6bfa3]/30 blur-2xl" />

              <div className="relative overflow-hidden rounded-[1.5rem] border border-[#d5c2aa] bg-[#e5d6c3] shadow-[0_20px_50px_rgba(72,61,49,0.12)]">

                <img
                  src={sbCollegeImg}
                  alt="St. Berchmans College Campus, Changanassery"
                  className="h-[400px] w-full object-cover"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          3. FACULTY SECTION
      ========================================================= */}
      <section className="faculty-texture-section border-y border-[#d5c8b8] py-20 sm:py-24">

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[#c9784a]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#796b5c]">
                  Department Leadership
                </span>
              </div>

              <h2 className="font-serif text-3xl text-[#40382f] sm:text-4xl">
                MCA Department{' '}
                <span className="text-[#c9784a]">
                  Faculty
                </span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm text-[#796b5c]">
                Led by Head of Department{' '}
                <strong className="text-[#51463b]">
                  Mrs. Smitha Krishnan
                </strong>
                . Additional faculty members will be updated as department
                details are added.
              </p>

            </div>

            <Link
              to="/faculty"
              className="
                inline-flex shrink-0 items-center gap-2
                rounded-lg
                border border-[#d2c1ad]
                bg-[#f8f3ec]
                px-5 py-2.5
                text-sm font-semibold text-[#51463b]
                transition-colors
                hover:bg-[#eee5d9]
              "
            >
              <span>View Faculty Page</span>

              <ArrowRight className="h-4 w-4 text-[#c9784a]" />
            </Link>

          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {displayFaculty.map((faculty) => (
              <FacultyCard
                key={faculty.id}
                faculty={faculty}
              />
            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          4. STUDENT SHOWCASE
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>

            <div className="mb-4 flex items-center gap-3">

              <span className="h-px w-10 bg-[#c9784d]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#796b5c]">
                MCA Batch 2026–2028
              </span>

            </div>

            <h2 className="font-serif text-3xl text-[#40382f] sm:text-4xl">
              Our{' '}
              <span className="text-[#c9784d]">
                Students
              </span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm text-[#796b5c]">
              Meet the scholars of the First MCA Batch (2026–2028) at
              St. Berchmans College, Changanassery.
            </p>

          </div>

          <Link
            to="/students"
            className="
              inline-flex shrink-0 items-center gap-2
              rounded-lg
              bg-[#c9784d]
              px-5 py-2.5
              text-sm font-semibold text-white
              transition-colors
              hover:bg-[#b96843]
            "
          >
            <span>View All Students</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

        {/* DATABASE STUDENTS */}
        {studentsLoading ? (

          <div className="flex min-h-[180px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-[#796b5c]">

              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#d5c8b8] border-t-[#c9784d]" />

              <span>Loading student profiles...</span>

            </div>
          </div>

        ) : studentsError ? (

          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
            {studentsError}
          </div>

        ) : displayStudents.length === 0 ? (

          <div className="rounded-2xl border border-[#d5c8b8] bg-[#f4ebdd] px-6 py-8 text-center text-sm text-[#796b5c]">
            Student profiles will appear here once they are added to the
            department database.
          </div>

        ) : (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {displayStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
              />
            ))}

          </div>

        )}

      </section>

      {/* =========================================================
          5. DEPARTMENT PORTALS
      ========================================================= */}
      <section
        className="
          relative
          overflow-hidden
          border-y border-[#211C19]
          py-20
          text-white
          sm:py-24
        "
        style={{
          backgroundColor: '#14110F',
          backgroundImage: `
            radial-gradient(
              circle at 50% 45%,
              rgba(201, 111, 69, 0.10),
              transparent 42%
            ),
            linear-gradient(
              rgba(255, 255, 255, 0.055) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.055) 1px,
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
            100% 100%,
            74px 74px,
            74px 74px,
            148px 148px,
            148px 148px
          `,
        }}
      >

        {/* Soft orange ambient glow */}
        <div
          className="
            pointer-events-none
            absolute left-1/2 top-1/2
            h-[500px] w-[500px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-[#C96F45]/[0.06]
            blur-[120px]
          "
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionTitle
            badge="Department Hub"
            title="Explore MCA"
            highlightText="Sections"
            subtitle="Quick access to curriculum, student projects, events, and department gallery."
            dark={true}
          />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Academics */}
            <Link
              to="/academics"
              className="
                group flex flex-col justify-between
                rounded-2xl
                border border-white/[0.08]
                bg-[#211C19]
                p-6
                transition-all duration-300
                hover:border-[#C96F45]/50
                hover:bg-[#261F1C]
              "
            >

              <div>

                <div
                  className="
                    mb-5 flex h-11 w-11 items-center justify-center
                    rounded-xl
                    border border-[#3FA7C7]/15
                    bg-[#3FA7C7]/10
                    text-[#3FA7C7]
                    transition-colors
                    group-hover:bg-[#3FA7C7]/15
                  "
                >
                  <BookOpen className="h-5 w-5" />
                </div>

                <h3 className="mb-2 text-base font-bold text-white">
                  Academics
                </h3>

                <p className="text-sm leading-relaxed text-stone-400">
                  Academic information and syllabus structure for the MCA programme.
                </p>

              </div>

              <span
                className="
                  mt-6 flex items-center gap-1.5
                  text-xs font-semibold text-[#3FA7C7]
                  transition-transform
                  group-hover:translate-x-1
                "
              >
                View Academics
                <ArrowRight className="h-3.5 w-3.5" />
              </span>

            </Link>

            {/* Projects */}
            <Link
              to="/projects"
              className="
                group flex flex-col justify-between
                rounded-2xl
                border border-white/[0.08]
                bg-[#211C19]
                p-6
                transition-all duration-300
                hover:border-[#C96F45]/50
                hover:bg-[#261F1C]
              "
            >

              <div>

                <div
                  className="
                    mb-5 flex h-11 w-11 items-center justify-center
                    rounded-xl
                    border border-[#3FA7C7]/15
                    bg-[#3FA7C7]/10
                    text-[#3FA7C7]
                    transition-colors
                    group-hover:bg-[#3FA7C7]/15
                  "
                >
                  <Code className="h-5 w-5" />
                </div>

                <h3 className="mb-2 text-base font-bold text-white">
                  Projects
                </h3>

                <p className="text-sm leading-relaxed text-stone-400">
                  Student semester projects will be showcased here as coursework
                  progresses.
                </p>

              </div>

              <span
                className="
                  mt-6 flex items-center gap-1.5
                  text-xs font-semibold text-[#3FA7C7]
                  transition-transform
                  group-hover:translate-x-1
                "
              >
                View Projects
                <ArrowRight className="h-3.5 w-3.5" />
              </span>

            </Link>

            {/* Events */}
            <Link
              to="/events"
              className="
                group flex flex-col justify-between
                rounded-2xl
                border border-white/[0.08]
                bg-[#211C19]
                p-6
                transition-all duration-300
                hover:border-[#C96F45]/50
                hover:bg-[#261F1C]
              "
            >

              <div>

                <div
                  className="
                    mb-5 flex h-11 w-11 items-center justify-center
                    rounded-xl
                    border border-[#C96F45]/15
                    bg-[#C96F45]/10
                    text-[#E08A5B]
                    transition-colors
                    group-hover:bg-[#C96F45]/15
                  "
                >
                  <Calendar className="h-5 w-5" />
                </div>

                <h3 className="mb-2 text-base font-bold text-white">
                  Events
                </h3>

                <p className="text-sm leading-relaxed text-stone-400">
                  Departmental events and announcements for the new batch.
                </p>

              </div>

              <span
                className="
                  mt-6 flex items-center gap-1.5
                  text-xs font-semibold text-[#E08A5B]
                  transition-transform
                  group-hover:translate-x-1
                "
              >
                View Events
                <ArrowRight className="h-3.5 w-3.5" />
              </span>

            </Link>

            {/* Gallery */}
            <Link
              to="/gallery"
              className="
                group flex flex-col justify-between
                rounded-2xl
                border border-white/[0.08]
                bg-[#211C19]
                p-6
                transition-all duration-300
                hover:border-[#C96F45]/50
                hover:bg-[#261F1C]
              "
            >

              <div>

                <div
                  className="
                    mb-5 flex h-11 w-11 items-center justify-center
                    rounded-xl
                    border border-[#C96F45]/15
                    bg-[#C96F45]/10
                    text-[#E08A5B]
                    transition-colors
                    group-hover:bg-[#C96F45]/15
                  "
                >
                  <Images className="h-5 w-5" />
                </div>

                <h3 className="mb-2 text-base font-bold text-white">
                  Gallery
                </h3>

                <p className="text-sm leading-relaxed text-stone-400">
                  Department and campus photo gallery for St. Berchmans College.
                </p>

              </div>

              <span
                className="
                  mt-6 flex items-center gap-1.5
                  text-xs font-semibold text-[#E08A5B]
                  transition-transform
                  group-hover:translate-x-1
                "
              >
                View Gallery
                <ArrowRight className="h-3.5 w-3.5" />
              </span>

            </Link>

          </div>

        </div>

      </section>

      {/* =========================================================
          6. CALL TO ACTION
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div
          className="
            flex flex-col items-center justify-between
            gap-6 rounded-3xl
            border border-[#302a25]
            bg-[#171411]
            p-8 text-white
            shadow-xl
            sm:p-12
            md:flex-row
          "
        >

          <div className="space-y-2 text-center md:text-left">

            <span className="mb-1 inline-block rounded-full bg-[#c9784d] px-3 py-0.5 text-xs font-bold text-white">
              St. Berchmans College, Changanassery
            </span>

            <h3 className="font-serif text-2xl text-white sm:text-3xl">
              MCA Batch 2026–2028
            </h3>

            <p className="max-w-xl text-xs sm:text-sm text-stone-400">
              Where our first MCA journey begins. Get in touch with the

              department for enquiries.
            </p>

          </div>

          <Link
            to="/contact"
            className="
              flex shrink-0 items-center gap-2
              rounded-xl
              bg-white
              px-6 py-3.5
              text-xs font-bold text-stone-900
              shadow
              transition-colors
              hover:bg-stone-100
              sm:text-sm
            "
          >
            <span>Contact MCA Department</span>

            <ArrowRight className="h-4 w-4 text-[#c9784d]" />
          </Link>

        </div>

      </section>

    </div>
  );
}