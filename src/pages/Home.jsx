import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FacultyCard from '../components/FacultyCard';
import StudentCard from '../components/StudentCard';
import SectionTitle from '../components/SectionTitle';

import { supabase } from '../lib/supabase';

import sbCollegeImg from '../assets/images/college/sb-college.jpg';

import {
  BookOpen,
  ArrowRight,
  Calendar,
  Code,
  Images,
  ChevronDown,
} from 'lucide-react';

export default function Home() {
  const [displayFaculty, setDisplayFaculty] = useState([]);
  const [facultyLoading, setFacultyLoading] = useState(true);
  const [facultyError, setFacultyError] = useState('');

  const [displayStudents, setDisplayStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [studentsError, setStudentsError] = useState('');

  const [scrollY, setScrollY] = useState(0);

  /* =========================================================
     PARALLAX SCROLL
  ========================================================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* =========================================================
     FETCH FACULTY
  ========================================================= */
  useEffect(() => {
    async function fetchFaculty() {
      setFacultyLoading(true);
      setFacultyError('');

      const { data, error } = await supabase
        .from('Faculty')
        .select(
          'id, created_at, name, title, designation, role, is_hod, is_tutor, department, qualification, email, photo_url, display_order'
        )
        .order('display_order', { ascending: true })
        .limit(4);

      if (error) {
        console.error('Error fetching homepage faculty:', error);

        setFacultyError(
          'Unable to load faculty profiles right now.'
        );

        setDisplayFaculty([]);
      } else {
        const formattedFaculty = (data || []).map((faculty) => ({
          ...faculty,
          isHOD: faculty.is_hod ?? false,
          isTutor: faculty.is_tutor ?? false,
          photo: faculty.photo_url || null,
          isPlaceholder: false,
        }));

        setDisplayFaculty(formattedFaculty);
      }

      setFacultyLoading(false);
    }

    fetchFaculty();
  }, []);

  /* =========================================================
     FETCH STUDENTS
  ========================================================= */
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

        setStudentsError(
          'Unable to load student profiles right now.'
        );

        setDisplayStudents([]);
      } else {
        setDisplayStudents(data || []);
      }

      setStudentsLoading(false);
    }

    fetchStudents();
  }, []);

  /* =========================================================
     SCROLL TO ABOUT
  ========================================================= */
  const scrollToAbout = () => {
    document.getElementById('about-mca')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  /* =========================================================
     DEPARTMENT PORTALS
  ========================================================= */
  const portals = [
    {
      to: '/academics',
      title: 'Academics',
      description:
        'Academic information and syllabus structure for the MCA programme.',
      label: 'View Academics',
      icon: BookOpen,
    },
    {
      to: '/projects',
      title: 'Projects',
      description:
        'Student semester projects will be showcased here as coursework progresses.',
      label: 'View Projects',
      icon: Code,
    },
    {
      to: '/events',
      title: 'Events',
      description:
        'Departmental events and announcements for the new batch.',
      label: 'View Events',
      icon: Calendar,
    },
    {
      to: '/gallery',
      title: 'Gallery',
      description:
        'Department and campus photo gallery for St. Berchmans College.',
      label: 'View Gallery',
      icon: Images,
    },
  ];

  return (
    <div className="space-y-20 pb-20">

      {/* =========================================================
          1. HERO SECTION
      ========================================================= */}
      <section className="relative isolate min-h-[calc(100vh-80px)] overflow-hidden bg-[#F1EBE4] text-[#40382F]">

        {/* =====================================================
            COLLEGE IMAGE BACKGROUND
        ===================================================== */}
        <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">

          <div
            className="absolute inset-0 h-full w-full"
            style={{
              transform: `translateY(${scrollY * 0.08}px)`,
              transition: 'transform 0.1s linear',
            }}
          >

            <img
              src={sbCollegeImg}
              alt="St. Berchmans College"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-65"
            />

          </div>

        </div>

        {/* =====================================================
            SOFT CREAM OVERLAY
        ===================================================== */}
        <div className="absolute inset-0 -z-10 bg-[#F1EBE4]/70" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F1EBE4]/85 via-[#F1EBE4]/72 to-[#F1EBE4]/55" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#F1EBE4]/80 via-transparent to-[#F1EBE4]/15" />

        {/* =====================================================
            GRID TEXTURE
        ===================================================== */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(64,56,47,0.13) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(64,56,47,0.13) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '70px 70px',
          }}
        />

        {/* =====================================================
            AMBIENT GLOW
        ===================================================== */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9784D]/10 blur-[130px]" />

        {/* =====================================================
            HERO CONTENT
        ===================================================== */}
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            {/* Small Badge */}
            <div className="mb-7 flex animate-[fadeUp_0.8s_ease-out_both] items-center gap-3">

              <span className="h-px w-12 bg-[#E08A5B]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#796B5C]">
                St. Berchmans College · Changanassery
              </span>

            </div>

            {/* Main Heading */}
            <h1 className="animate-[fadeUp_1s_ease-out_0.15s_both] font-serif text-4xl leading-[1.05] tracking-tight text-[#40382F] sm:text-5xl lg:text-6xl">

              Master of
              <br />

              <span className="text-[#C9784D]">
                Computer Applications
              </span>

            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl animate-[fadeUp_1s_ease-out_0.3s_both] text-sm leading-relaxed text-[#62574C] sm:text-base">

              Explore the first MCA journey at St. Berchmans College.
              Discover our academic programme, faculty, students, projects,
              and department activities.

            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-4 animate-[fadeUp_1s_ease-out_0.45s_both] sm:flex-row">

              <Link
                to="/about"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#C9784D] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#B96843] hover:shadow-[0_12px_30px_rgba(201,120,77,0.25)]"
              >
                Explore Our Department

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>

              <button
                type="button"
                onClick={scrollToAbout}
                className="group inline-flex items-center justify-center gap-3 rounded-xl border border-[#BFAF9F] bg-white/40 px-6 py-3.5 text-sm font-semibold text-[#51463B] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9784D]/70 hover:bg-white/60"
              >
                Discover MCA

                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </button>

            </div>

            {/* Batch Information */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 animate-[fadeUp_1s_ease-out_0.6s_both]">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A8875]">
                  Programme
                </p>

                <p className="mt-1 font-serif text-lg text-[#40382F]">
                  Established 2026
                </p>

              </div>

              <div className="hidden h-10 w-px bg-[#CFC1B4] sm:block" />

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A8875]">
                  Inaugural Batch
                </p>

                <p className="mt-1 font-serif text-lg text-[#40382F]">
                  2026–2028
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            SCROLL INDICATOR
        ===================================================== */}
        <button
          type="button"
          onClick={scrollToAbout}
          className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#796B5C] transition-colors duration-300 hover:text-[#40382F]"
          aria-label="Scroll to explore"
        >

          <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
            Scroll to explore
          </span>

          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-[#BFAF9F] p-1.5">

            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#E08A5B]" />

          </span>

        </button>

      </section>

      {/* =========================================================
          2. ABOUT OUR MCA PROGRAMME
      ========================================================= */}
      <section
        id="about-mca"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-2 sm:px-6 lg:px-8"
      >

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Content */}
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

              <p className="font-serif text-base leading-relaxed text-[#62574c] sm:text-lg">

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

              <p className="font-serif text-base leading-relaxed text-[#62574c] sm:text-lg">

                The department is led by{' '}

                <strong className="font-semibold text-[#51463b]">
                  Mrs. Smitha Krishnan
                </strong>

                , Head of the Department. As the inaugural cohort, the
                2026–2028 batch marks a foundational milestone in postgraduate
                computer science education at St. Berchmans College.

              </p>

            </div>

            {/* Programme Cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

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

            {/* Read More */}
            <div className="mt-8">

              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#a96846] transition-colors hover:text-[#8f593b]"
              >

                <span>
                  Read more about our MCA Department
                </span>

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

              </Link>

            </div>

          </div>

          {/* College Image */}
          <div className="lg:col-span-5">

            <div className="relative">

              <div className="absolute -inset-4 rounded-[2rem] bg-[#d6bfa3]/30 blur-2xl" />

              <div className="relative overflow-hidden rounded-[1.5rem] border border-[#d5c2aa] bg-[#e5d6c3] shadow-[0_20px_50px_rgba(72,61,49,0.12)]">

                <img
                  src={sbCollegeImg}
                  alt="St. Berchmans College Campus, Changanassery"
                  className="h-[400px] w-full object-cover transition-transform duration-700 hover:scale-105"
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
                Meet the faculty members of the Department of Computer
                Applications at St. Berchmans College.
              </p>

            </div>

            <Link
              to="/faculty"
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#d2c1ad] bg-[#f8f3ec] px-5 py-2.5 text-sm font-semibold text-[#51463b] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eee5d9]"
            >

              <span>
                View Faculty Page
              </span>

              <ArrowRight className="h-4 w-4 text-[#c9784a] transition-transform duration-300 group-hover:translate-x-1" />

            </Link>

          </div>

          {facultyLoading ? (

            <div className="flex min-h-[220px] items-center justify-center">

              <div className="flex items-center gap-3 text-sm text-[#796b5c]">

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#d5c8b8] border-t-[#c9784d]" />

                <span>
                  Loading faculty profiles...
                </span>

              </div>

            </div>

          ) : facultyError ? (

            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
              {facultyError}
            </div>

          ) : displayFaculty.length === 0 ? (

            <div className="rounded-2xl border border-[#d5c8b8] bg-[#f4ebdd] px-6 py-8 text-center text-sm text-[#796b5c]">
              Faculty profiles will appear here once they are added to the
              department database.
            </div>

          ) : (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {displayFaculty.map((faculty) => (

                <FacultyCard
                  key={faculty.id}
                  faculty={faculty}
                />

              ))}

            </div>

          )}

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
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#c9784d] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b96843]"
          >

            <span>
              View All Students
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

          </Link>

        </div>

        {studentsLoading ? (

          <div className="flex min-h-[180px] items-center justify-center">

            <div className="flex items-center gap-3 text-sm text-[#796b5c]">

              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#d5c8b8] border-t-[#c9784d]" />

              <span>
                Loading student profiles...
              </span>

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
        className="relative overflow-hidden border-y border-[#211C19] py-20 text-white sm:py-24"
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

        {/* Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C96F45]/[0.06] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <SectionTitle
            badge="Department Hub"
            title="Explore MCA"
            highlightText="Sections"
            subtitle="Quick access to curriculum, student projects, events, and department gallery."
            dark={true}
          />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {portals.map((portal) => {

              const PortalIcon = portal.icon;

              return (
                <Link
                  key={portal.to}
                  to={portal.to}
                  className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#211C19] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C96F45]/50 hover:bg-[#261F1C] hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)]"
                >

                  <div>

                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#C96F45]/15 bg-[#C96F45]/10 text-[#E08A5B] transition-colors group-hover:bg-[#C96F45]/15">

                      <PortalIcon className="h-5 w-5" />

                    </div>

                    <h3 className="mb-2 text-base font-bold text-white">
                      {portal.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-stone-400">
                      {portal.description}
                    </p>

                  </div>

                  <span className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#E08A5B]">

                    {portal.label}

                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />

                  </span>

                </Link>
              );
            })}

          </div>

        </div>

      </section>

      {/* =========================================================
          6. CALL TO ACTION
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-[#302a25] bg-[#171411] p-8 text-white shadow-xl sm:p-12 md:flex-row">

          <div className="space-y-2 text-center md:text-left">

            <span className="mb-1 inline-flex items-center rounded-full border border-[#c9784d]/50 bg-[#c9784d]/15 px-3.5 py-1 text-xs font-bold text-[#e08a5b]">
              Department Hub
            </span>

            <h3 className="font-serif text-2xl text-white sm:text-3xl">
              MCA Batch 2026–2028
            </h3>

            <p className="max-w-xl text-xs text-stone-400 sm:text-sm">
              Where our first MCA journey begins. Get in touch with the
              department for enquiries.
            </p>

          </div>

          {/* ORANGE CONTACT BUTTON */}
          <Link
            to="/contact"
            className="group flex shrink-0 items-center gap-2 rounded-xl bg-[#C9784D] px-6 py-3.5 text-xs font-bold text-white shadow-[0_10px_25px_rgba(201,120,77,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B96843] hover:shadow-[0_12px_30px_rgba(201,120,77,0.28)] sm:text-sm"
          >

            <span>
              Contact MCA Department
            </span>

            <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />

          </Link>

        </div>

      </section>

      {/* =========================================================
          ANIMATION STYLES
      ========================================================= */}
      <style>{`

        @keyframes fadeUp {

          from {
            opacity: 0;
            transform: translateY(28px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

        }

      `}</style>

    </div>
  );
}