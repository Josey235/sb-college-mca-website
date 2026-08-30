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
  GraduationCap,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
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
          'id, created_at, name, roll_number, email, phone, batch, photo_url, bio'
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-7">

            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-[#c9784d]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                About the MCA Programme
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-tight text-stone-900">
              Empowering Minds.
              <br />
              <span className="text-[#c9784d]">
                Building Futures.
              </span>
            </h2>

            <div className="w-12 h-px bg-[#c9784d] mt-6 mb-6" />

            <div className="space-y-5 max-w-2xl">

              <p className="font-serif text-lg sm:text-xl leading-relaxed text-stone-700">
                The Master of Computer Applications (MCA) programme at{' '}
                <strong className="font-semibold text-stone-900">
                  St. Berchmans College, Changanassery
                </strong>
                , began in{' '}
                <strong className="font-semibold text-stone-900">
                  2026
                </strong>
                . The{' '}
                <strong className="font-semibold text-stone-900">
                  MCA Batch 2026–2028
                </strong>{' '}
                represents the first batch of the programme.
              </p>

              <p className="text-[15px] sm:text-base leading-7 text-stone-600">
                The department is led by{' '}
                <strong className="font-semibold text-stone-800">
                  Ms. Smitha Krishnan
                </strong>
                , Head of the Department. As the inaugural cohort, the
                2026–2028 batch marks a foundational milestone in postgraduate
                computer science education at St. Berchmans College.
              </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

              {/* Programme Launch */}
              <div className="p-5 rounded-lg bg-[#faf8f5] border border-stone-200">

                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.18em] block mb-2">
                  Programme Launch
                </span>

                <span className="font-serif text-2xl text-stone-900">
                  Year 2026
                </span>

                <p className="text-xs text-stone-500 mt-1.5">
                  Newly started postgraduate programme
                </p>

              </div>

              {/* Inaugural Batch */}
              <div className="p-5 rounded-lg bg-[#faf8f5] border border-stone-200">

                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.18em] block mb-2">
                  Inaugural Batch
                </span>

                <span className="font-serif text-2xl text-stone-900">
                  2026–2028
                </span>

                <p className="text-xs text-stone-500 mt-1.5">
                  First MCA Batch of SB College
                </p>

              </div>

            </div>

            <div className="mt-8">

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#b96843] hover:text-[#a95736] group"
              >
                <span>
                  Read more about our MCA Department
                </span>

                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>

          </div>

          {/* RIGHT COLLEGE IMAGE */}
          <div className="lg:col-span-5">

            <div className="relative">

              <div className="absolute -inset-4 bg-[#e8c7b5]/30 blur-2xl rounded-[2rem]" />

              <div className="relative overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-100 shadow-[0_20px_50px_rgba(45,39,35,0.10)]">

                <img
                  src={sbCollegeImg}
                  alt="St. Berchmans College Campus, Changanassery"
                  className="w-full h-[400px] object-cover"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          3. FACULTY SECTION
      ========================================================= */}
      <section className="bg-[#f5f1ec] py-20 sm:py-24 border-y border-stone-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <span className="w-10 h-px bg-[#c9784d]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
                  Department Leadership
                </span>

              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
                MCA Department{' '}
                <span className="text-[#c9784d]">
                  Faculty
                </span>
              </h2>

              <p className="mt-3 text-stone-500 text-sm max-w-2xl">
                Led by Head of Department{' '}
                <strong className="text-stone-700">
                  Ms. Smitha Krishnan
                </strong>
                . Additional faculty members will be updated as department
                details are added.
              </p>

            </div>

            <Link
              to="/faculty"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 transition-colors shrink-0"
            >
              <span>View Faculty Page</span>

              <ArrowRight className="w-4 h-4 text-[#c9784d]" />
            </Link>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">

          <div>

            <div className="flex items-center gap-3 mb-4">

              <span className="w-10 h-px bg-[#c9784d]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
                MCA Batch 2026–2028
              </span>

            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
              Our{' '}
              <span className="text-[#c9784d]">
                Students
              </span>
            </h2>

            <p className="mt-3 text-stone-500 text-sm max-w-2xl">
              Meet the scholars of the First MCA Batch (2026–2028) at
              St. Berchmans College, Changanassery.
            </p>

          </div>

          <Link
            to="/students"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-[#c9784d] hover:bg-[#b96843] transition-colors shrink-0"
          >
            <span>View All Students</span>

            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>

        {/* DATABASE STUDENTS */}
        {studentsLoading ? (
          <div className="min-h-[180px] flex items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-stone-500">
              <div className="w-5 h-5 border-2 border-stone-300 border-t-[#c9784d] rounded-full animate-spin" />
              <span>Loading student profiles...</span>
            </div>
          </div>
        ) : studentsError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
            {studentsError}
          </div>
        ) : displayStudents.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-[#faf8f5] px-6 py-8 text-center text-sm text-stone-500">
            Student profiles will appear here once they are added to the department database.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

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
      <section className="bg-[#171411] py-20 text-white relative">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionTitle
            badge="Department Hub"
            title="Explore MCA"
            highlightText="Sections"
            subtitle="Quick access to curriculum, student projects, events, and department gallery."
            dark={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            {/* Academics */}
            <Link
              to="/academics"
              className="p-6 rounded-2xl bg-[#211d1a] border border-stone-800 hover:border-[#c9784d] transition-all duration-200 group flex flex-col justify-between"
            >

              <div>

                <div className="w-10 h-10 rounded-xl bg-[#c9784d]/15 text-[#e6a27e] flex items-center justify-center mb-4 group-hover:bg-[#c9784d] group-hover:text-white transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-[#e6a27e]">
                  Academics
                </h3>

                <p className="text-xs text-stone-400 leading-relaxed">
                  Academic information and syllabus structure for the MCA programme.
                </p>

              </div>

              <span className="mt-4 text-xs font-semibold text-[#e6a27e] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Academics
                <ArrowRight className="w-3.5 h-3.5" />
              </span>

            </Link>

            {/* Projects */}
            <Link
              to="/projects"
              className="p-6 rounded-2xl bg-[#211d1a] border border-stone-800 hover:border-[#c9784d] transition-all duration-200 group flex flex-col justify-between"
            >

              <div>

                <div className="w-10 h-10 rounded-xl bg-[#c9784d]/15 text-[#e6a27e] flex items-center justify-center mb-4 group-hover:bg-[#c9784d] group-hover:text-white transition-colors">
                  <Code className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-[#e6a27e]">
                  Projects
                </h3>

                <p className="text-xs text-stone-400 leading-relaxed">
                  Student semester projects will be showcased here as coursework progresses.
                </p>

              </div>

              <span className="mt-4 text-xs font-semibold text-[#e6a27e] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Projects
                <ArrowRight className="w-3.5 h-3.5" />
              </span>

            </Link>

            {/* Events */}
            <Link
              to="/events"
              className="p-6 rounded-2xl bg-[#211d1a] border border-stone-800 hover:border-[#c9784d] transition-all duration-200 group flex flex-col justify-between"
            >

              <div>

                <div className="w-10 h-10 rounded-xl bg-[#c9784d]/15 text-[#e6a27e] flex items-center justify-center mb-4 group-hover:bg-[#c9784d] group-hover:text-white transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-[#e6a27e]">
                  Events
                </h3>

                <p className="text-xs text-stone-400 leading-relaxed">
                  Departmental events and announcements for the new batch.
                </p>

              </div>

              <span className="mt-4 text-xs font-semibold text-[#e6a27e] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Events
                <ArrowRight className="w-3.5 h-3.5" />
              </span>

            </Link>

            {/* Gallery */}
            <Link
              to="/gallery"
              className="p-6 rounded-2xl bg-[#211d1a] border border-stone-800 hover:border-[#c9784d] transition-all duration-200 group flex flex-col justify-between"
            >

              <div>

                <div className="w-10 h-10 rounded-xl bg-[#c9784d]/15 text-[#e6a27e] flex items-center justify-center mb-4 group-hover:bg-[#c9784d] group-hover:text-white transition-colors">
                  <Images className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-[#e6a27e]">
                  Gallery
                </h3>

                <p className="text-xs text-stone-400 leading-relaxed">
                  Department and campus photo gallery for St. Berchmans College.
                </p>

              </div>

              <span className="mt-4 text-xs font-semibold text-[#e6a27e] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Gallery
                <ArrowRight className="w-3.5 h-3.5" />
              </span>

            </Link>

          </div>

        </div>

      </section>

      {/* =========================================================
          6. CALL TO ACTION
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="rounded-3xl bg-[#171411] border border-stone-800 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="space-y-2 text-center md:text-left">

            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#c9784d] text-white inline-block mb-1">
              St. Berchmans College, Changanassery
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-white">
              MCA Batch 2026–2028
            </h3>

            <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
              Where our first MCA journey begins. Get in touch with the
              department for enquiries.
            </p>

          </div>

          <Link
            to="/contact"
            className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white text-stone-900 hover:bg-stone-100 transition-colors shadow shrink-0 flex items-center gap-2"
          >
            <span>Contact MCA Department</span>

            <ArrowRight className="w-4 h-4 text-[#c9784d]" />
          </Link>

        </div>

      </section>

    </div>
  );
}