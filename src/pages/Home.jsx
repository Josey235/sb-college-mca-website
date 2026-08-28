import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FacultyCard from '../components/FacultyCard';
import StudentCard from '../components/StudentCard';
import SectionTitle from '../components/SectionTitle';
import { facultyMembers } from '../data/faculty';
import { studentsList } from '../data/students';
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
  Award,
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const displayFaculty = facultyMembers.slice(0, 4);
  const displayStudents = studentsList.slice(0, 4);

  return (
    <div className="space-y-0 pb-20 bg-[#faf8f5]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Our MCA Programme */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-px bg-terracotta-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
                  About the MCA Programme
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-stone-900">
                Empowering Minds.
                <br />
                <span className="text-terracotta-600">
                  Building Futures.
                </span>
              </h2>

              <p className="mt-7 text-sm sm:text-base leading-7 text-stone-600 max-w-2xl">
                The Master of Computer Applications (MCA) programme at{' '}
                <strong className="text-stone-800">
                  St. Berchmans College, Changanassery
                </strong>
                , began in <strong className="text-stone-800">2026</strong>.
                The <strong className="text-stone-800">MCA Batch 2026–2028</strong>{' '}
                represents the first batch of the programme.
              </p>

              <p className="mt-4 text-sm sm:text-base leading-7 text-stone-500 max-w-2xl">
                The department is led by <strong className="text-stone-700">Smitha</strong>,
                Head of the Department. As the inaugural cohort, the 2026–2028
                batch marks a proud and foundational milestone in postgraduate
                computer science education at St. Berchmans College.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-2xl">
                <div className="p-5 bg-[#faf8f5] border border-stone-200 rounded-lg">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.16em] block mb-2">
                    Programme Launch
                  </span>

                  <span className="font-serif text-2xl text-stone-900">
                    Year 2026
                  </span>

                  <p className="text-xs text-stone-500 mt-1.5">
                    Newly started postgraduate programme
                  </p>
                </div>

                <div className="p-5 bg-[#faf8f5] border border-stone-200 rounded-lg">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.16em] block mb-2">
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
                  className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta-700 hover:text-terracotta-800 group"
                >
                  <span>Read more about our MCA Department</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* College Image */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-3 bg-terracotta-100/50 rounded-[2rem] blur-xl" />

                <div className="relative overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-100 shadow-[0_20px_50px_rgba(45,39,35,0.08)]">
                  <img
                    src={sbCollegeImg}
                    alt="St. Berchmans College Campus, Changanassery"
                    className="w-full h-[420px] object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">
                      St. Berchmans College
                    </span>

                    <h3 className="font-serif text-xl text-white mt-1">
                      Changanassery, Kerala
                    </h3>

                    <p className="text-xs text-white/70 mt-1">
                      Department of Computer Applications
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Faculty Section */}
      <section className="bg-[#f5f1ec] py-20 sm:py-24 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-terracotta-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
                  Department Leadership
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
                MCA Department{' '}
                <span className="text-terracotta-600">Faculty</span>
              </h2>

              <p className="mt-3 text-stone-500 text-sm max-w-2xl">
                Led by Head of Department <strong className="text-stone-700">Smitha</strong>.
                Additional faculty members will be updated as department
                details are added.
              </p>
            </div>

            <Link
              to="/faculty"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-xs sm:text-sm text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 transition-colors shrink-0"
            >
              <span>View Faculty Page</span>
              <ArrowRight className="w-4 h-4 text-terracotta-600" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayFaculty.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Student Showcase */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-terracotta-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
                  MCA Batch 2026–2028
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
                Our <span className="text-terracotta-600">Students</span>
              </h2>

              <p className="mt-3 text-stone-500 text-sm max-w-2xl">
                Meet the scholars of the First MCA Batch (2026–2028) at
                St. Berchmans College, Changanassery.
              </p>
            </div>

            <Link
              to="/students"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-xs sm:text-sm text-white bg-terracotta-600 hover:bg-terracotta-700 transition-colors shrink-0"
            >
              <span>View All Students</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Department Portals */}
      <section className="bg-stone-900 py-20 sm:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-terracotta-400" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-400">
                Department Hub
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
              Explore MCA{' '}
              <span className="text-terracotta-400">Sections</span>
            </h2>

            <p className="mt-4 text-sm text-stone-400 max-w-2xl leading-6">
              Quick access to curriculum, student projects, events, and
              department gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-700/50 mt-12 border border-stone-700/50">
            {/* Academics */}
            <Link
              to="/academics"
              className="p-7 bg-stone-900 hover:bg-stone-800 transition-colors group flex flex-col justify-between min-h-[230px]"
            >
              <div>
                <div className="w-11 h-11 rounded-full border border-stone-700 text-terracotta-400 flex items-center justify-center mb-6 group-hover:border-terracotta-500 group-hover:bg-terracotta-500/10 transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>

                <h3 className="font-serif text-xl text-white mb-2">
                  Academics
                </h3>

                <p className="text-xs text-stone-400 leading-6">
                  Academic information and syllabus structure for the MCA
                  programme.
                </p>
              </div>

              <span className="mt-6 text-xs font-semibold text-terracotta-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Academics
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Projects */}
            <Link
              to="/projects"
              className="p-7 bg-stone-900 hover:bg-stone-800 transition-colors group flex flex-col justify-between min-h-[230px]"
            >
              <div>
                <div className="w-11 h-11 rounded-full border border-stone-700 text-terracotta-400 flex items-center justify-center mb-6 group-hover:border-terracotta-500 group-hover:bg-terracotta-500/10 transition-colors">
                  <Code className="w-5 h-5" />
                </div>

                <h3 className="font-serif text-xl text-white mb-2">
                  Projects
                </h3>

                <p className="text-xs text-stone-400 leading-6">
                  Student semester projects will be showcased here as
                  coursework progresses.
                </p>
              </div>

              <span className="mt-6 text-xs font-semibold text-terracotta-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Projects
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Events */}
            <Link
              to="/events"
              className="p-7 bg-stone-900 hover:bg-stone-800 transition-colors group flex flex-col justify-between min-h-[230px]"
            >
              <div>
                <div className="w-11 h-11 rounded-full border border-stone-700 text-terracotta-400 flex items-center justify-center mb-6 group-hover:border-terracotta-500 group-hover:bg-terracotta-500/10 transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>

                <h3 className="font-serif text-xl text-white mb-2">
                  Events
                </h3>

                <p className="text-xs text-stone-400 leading-6">
                  Departmental events and announcements for the new batch.
                </p>
              </div>

              <span className="mt-6 text-xs font-semibold text-terracotta-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Events
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            {/* Gallery */}
            <Link
              to="/gallery"
              className="p-7 bg-stone-900 hover:bg-stone-800 transition-colors group flex flex-col justify-between min-h-[230px]"
            >
              <div>
                <div className="w-11 h-11 rounded-full border border-stone-700 text-terracotta-400 flex items-center justify-center mb-6 group-hover:border-terracotta-500 group-hover:bg-terracotta-500/10 transition-colors">
                  <Images className="w-5 h-5" />
                </div>

                <h3 className="font-serif text-xl text-white mb-2">
                  Gallery
                </h3>

                <p className="text-xs text-stone-400 leading-6">
                  Department and campus photo gallery for St. Berchmans
                  College.
                </p>
              </div>

              <span className="mt-6 text-xs font-semibold text-terracotta-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Gallery
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="bg-[#faf8f5] py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-px bg-terracotta-500" />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-stone-500">
                St. Berchmans College, Changanassery
              </span>

              <span className="w-10 h-px bg-terracotta-500" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900">
              MCA Batch 2026–2028
            </h3>

            <p className="mt-4 text-sm text-stone-500 max-w-xl mx-auto leading-6">
              Where our first MCA journey begins. Get in touch with the
              department for enquiries.
            </p>

            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-semibold text-sm bg-terracotta-600 text-white hover:bg-terracotta-700 transition-colors shadow-sm"
              >
                <span>Contact MCA Department</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}