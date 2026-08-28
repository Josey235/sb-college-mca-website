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
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Our MCA Programme (Factual Overview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-academic-50 text-academic-700 border border-academic-200">
              <span className="w-2 h-2 rounded-full bg-academic-500"></span>
              welcome to kristu jyothi
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 font-display leading-tight">
              About the <span className="text-gradient">MCA Programme</span>
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              The Master of Computer Applications (MCA) programme at <strong>St. Berchmans College, Changanassery</strong>, began in <strong>2026</strong>. The <strong>MCA Batch 2026–2028</strong> represents the first batch of the programme.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The department is led by <strong>Smitha</strong>, Head of the Department. As the inaugural cohort, the 2026–2028 batch marks a proud and foundational milestone in postgraduate computer science education at St. Berchmans College.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Programme Launch
                </span>
                <span className="text-lg font-extrabold text-navy-900 font-display">Year 2026</span>
                <p className="text-xs text-slate-500 mt-0.5">Newly started postgraduate programme</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Inaugural Batch
                </span>
                <span className="text-lg font-extrabold text-navy-900 font-display">Batch 2026–2028</span>
                <p className="text-xs text-slate-500 mt-0.5">First MCA Batch of SB College</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-academic-600 hover:text-academic-700 group"
              >
                <span>Read more about our MCA Department</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-navy-950">
              <img 
                src={sbCollegeImg} 
                alt="St. Berchmans College Campus, Changanassery" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs font-mono text-cyan-300">St. Berchmans College</span>
                <h3 className="text-base font-bold font-display mt-0.5">Changanassery, Kerala</h3>
                <p className="text-xs text-slate-300">Department of Computer Applications</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Faculty Section (HOD Smitha + Placeholders) */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-academic-700 border border-slate-200 mb-3 shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5 text-academic-600" />
                Department Leadership
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 font-display">
                MCA Department <span className="text-gradient">Faculty</span>
              </h2>
              <p className="mt-2 text-slate-600 text-sm max-w-2xl">
                Led by Head of Department <strong>Smitha</strong>. Additional faculty members will be updated as department details are added.
              </p>
            </div>

            <Link
              to="/faculty"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-navy-900 bg-white hover:bg-slate-50 border border-slate-300 transition-colors shadow-2xs shrink-0"
            >
              <span>View Faculty Page</span>
              <ArrowRight className="w-4 h-4 text-academic-600" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayFaculty.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Student Showcase (Sillamol Shibu, Josey Joseph + Placeholders) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-academic-50 text-academic-700 border border-academic-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              MCA Batch 2026–2028
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 font-display">
              Our <span className="text-gradient">Students</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl">
              Meet the scholars of the First MCA Batch (2026–2028) at St. Berchmans College, Changanassery.
            </p>
          </div>

          <Link
            to="/students"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-academic-600 hover:bg-academic-700 transition-colors shadow-sm shrink-0"
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
      </section>

      {/* 5. Department Portals Grid */}
      <section className="bg-navy-950 py-16 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Department Hub"
            title="Explore MCA"
            highlightText="Sections"
            subtitle="Quick access to curriculum, student projects, events, and department gallery."
            dark={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            
            <Link 
              to="/academics"
              className="p-6 rounded-2xl bg-navy-900/90 border border-navy-800 hover:border-academic-500 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-academic-600/20 text-academic-400 flex items-center justify-center mb-4 group-hover:bg-academic-600 group-hover:text-white transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-academic-300">
                  Academics
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Academic information and syllabus structure for the MCA programme.
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-academic-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Academics <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link 
              to="/projects"
              className="p-6 rounded-2xl bg-navy-900/90 border border-navy-800 hover:border-academic-500 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-academic-600/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:bg-academic-600 group-hover:text-white transition-colors">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-academic-300">
                  Projects
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Student semester projects will be showcased here as coursework progresses.
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-academic-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Projects <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link 
              to="/events"
              className="p-6 rounded-2xl bg-navy-900/90 border border-navy-800 hover:border-academic-500 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-academic-600/20 text-amber-400 flex items-center justify-center mb-4 group-hover:bg-academic-600 group-hover:text-white transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-academic-300">
                  Events
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Departmental events and announcements for the new batch.
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-academic-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Events <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link 
              to="/gallery"
              className="p-6 rounded-2xl bg-navy-900/90 border border-navy-800 hover:border-academic-500 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-academic-600/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-academic-600 group-hover:text-white transition-colors">
                  <Images className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-academic-300">
                  Gallery
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Department and campus photo gallery for St. Berchmans College.
                </p>
              </div>
              <span className="mt-4 text-xs font-semibold text-academic-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Gallery <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border border-navy-800 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-academic-600 text-white inline-block mb-1">
              St. Berchmans College, Changanassery
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              MCA Batch 2026–2028
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Where our first MCA journey begins. Get in touch with the department for enquiries.
            </p>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white text-navy-950 hover:bg-slate-100 transition-colors shadow shrink-0 flex items-center gap-2"
          >
            <span>Contact MCA Department</span>
            <ArrowRight className="w-4 h-4 text-academic-600" />
          </Link>
        </div>
      </section>

    </div>
  );
}
