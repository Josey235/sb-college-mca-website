import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Image,
  Loader2,
  LogOut,
  UserRound,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [adminEmail, setAdminEmail] = useState('');
  const [studentCount, setStudentCount] = useState(null);
  const [facultyCount, setFacultyCount] = useState(null);
  const [galleryCount, setGalleryCount] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        navigate('/admin/login', { replace: true });
        return;
      }

      if (!mounted) return;

      setAdminEmail(session.user.email || '');

      const [
        { count: studentsTotal, error: studentsError },
        { count: facultyTotal, error: facultyError },
        { count: galleryTotal, error: galleryError },
      ] = await Promise.all([
        supabase
          .from('Students')
          .select('*', {
            count: 'exact',
            head: true,
          }),

        supabase
          .from('Faculty')
          .select('*', {
            count: 'exact',
            head: true,
          }),

        supabase
          .from('Gallery')
          .select('*', {
            count: 'exact',
            head: true,
          }),
      ]);

      if (studentsError) {
        console.error('Error loading student count:', studentsError);
      }

      if (facultyError) {
        console.error('Error loading faculty count:', facultyError);
      }

      if (galleryError) {
        console.error('Error loading gallery count:', galleryError);
      }

      if (!mounted) return;

      setStudentCount(studentsTotal ?? 0);
      setFacultyCount(facultyTotal ?? 0);
      setGalleryCount(galleryTotal ?? 0);
      setLoading(false);
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  async function handleLogout() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
      return;
    }

    navigate('/admin/login', {
      replace: true,
    });
  }

  const statValue = (value) =>
    loading ? (
      <Loader2 className="w-6 h-6 animate-spin text-stone-300" />
    ) : (
      value
    );

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-stone-900">

      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">

            <Link
              to="/admin"
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-stone-900 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] font-bold text-stone-400">
                  St. Berchmans College
                </p>

                <h1 className="font-serif text-xl leading-tight">
                  MCA Admin
                </h1>
              </div>
            </Link>

            <div className="flex items-center gap-3">

              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-50 border border-stone-100">
                <ShieldCheck className="w-4 h-4 text-[#c9784d]" />

                <span className="text-xs text-stone-600 max-w-[220px] truncate">
                  {adminEmail || 'Administrator'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="h-10 px-3 sm:px-4 rounded-xl border border-stone-200 bg-white text-stone-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2 text-xs font-bold disabled:opacity-60"
              >
                {loggingOut ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}

                <span className="hidden sm:inline">
                  {loggingOut ? 'Signing out...' : 'Sign out'}
                </span>
              </button>

            </div>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <section className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#c9784d]">
            Control Center
          </p>

          <h2 className="mt-2 font-serif text-4xl sm:text-5xl text-stone-900">
            Website Administration
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-500">
            Manage students, faculty and gallery content from one
            place. The public MCA website remains separate from this
            administration panel.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

          <Link
            to="/admin/students"
            className="group bg-white rounded-2xl border border-stone-200 p-6 shadow-[0_8px_30px_rgba(45,39,35,0.04)] hover:shadow-[0_15px_40px_rgba(45,39,35,0.08)] hover:border-[#dec1af] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-[#f8eee8] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#c9784d]" />
              </div>

              <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#c9784d] group-hover:translate-x-1 transition-all" />
            </div>

            <p className="mt-6 text-3xl font-semibold text-stone-900">
              {statValue(studentCount)}
            </p>

            <p className="mt-1 text-sm text-stone-500">
              Student profiles
            </p>

            <p className="mt-3 text-[11px] font-semibold text-[#c9784d]">
              Open Student Manager →
            </p>
          </Link>

          <Link
            to="/admin/faculty"
            className="group bg-white rounded-2xl border border-stone-200 p-6 shadow-[0_8px_30px_rgba(45,39,35,0.04)] hover:shadow-[0_15px_40px_rgba(45,39,35,0.08)] hover:border-[#dec1af] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-[#f8eee8] flex items-center justify-center">
                <UserRound className="w-5 h-5 text-[#c9784d]" />
              </div>

              <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#c9784d] group-hover:translate-x-1 transition-all" />
            </div>

            <p className="mt-6 text-3xl font-semibold text-stone-900">
              {statValue(facultyCount)}
            </p>

            <p className="mt-1 text-sm text-stone-500">
              Faculty profiles
            </p>

            <p className="mt-3 text-[11px] font-semibold text-[#c9784d]">
              Open Faculty Manager →
            </p>
          </Link>

          <Link
            to="/admin/gallery"
            className="group bg-white rounded-2xl border border-stone-200 p-6 shadow-[0_8px_30px_rgba(45,39,35,0.04)] hover:shadow-[0_15px_40px_rgba(45,39,35,0.08)] hover:border-[#dec1af] transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-[#f8eee8] flex items-center justify-center">
                <Image className="w-5 h-5 text-[#c9784d]" />
              </div>

              <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#c9784d] group-hover:translate-x-1 transition-all" />
            </div>

            <p className="mt-6 text-3xl font-semibold text-stone-900">
              {statValue(galleryCount)}
            </p>

            <p className="mt-1 text-sm text-stone-500">
              Gallery photographs
            </p>

            <p className="mt-3 text-[11px] font-semibold text-[#c9784d]">
              Open Gallery Manager →
            </p>
          </Link>

        </section>

        <section>
          <div className="mb-5">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
              Management
            </p>

            <h3 className="mt-1 font-serif text-2xl text-stone-900">
              Website Data
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <Link
              to="/admin/students"
              className="group bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-[0_15px_40px_rgba(45,39,35,0.07)] hover:border-[#dec1af] transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-stone-700" />
                </div>

                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#c9784d] group-hover:translate-x-1 transition-all" />
              </div>

              <h4 className="mt-6 text-xl font-semibold">
                Student Manager
              </h4>

              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Add, edit, delete and upload profile photos for MCA
                students directly from the website.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#c9784d]">
                Manage Students
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/admin/faculty"
              className="group bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-[0_15px_40px_rgba(45,39,35,0.07)] hover:border-[#dec1af] transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center">
                  <UserRound className="w-5 h-5 text-stone-700" />
                </div>

                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#c9784d] group-hover:translate-x-1 transition-all" />
              </div>

              <h4 className="mt-6 text-xl font-semibold">
                Faculty Manager
              </h4>

              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Add, edit, delete and upload faculty profile photos,
                roles, qualifications and contact details.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#c9784d]">
                Manage Faculty
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/admin/gallery"
              className="group bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-[0_15px_40px_rgba(45,39,35,0.07)] hover:border-[#dec1af] transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center">
                  <Image className="w-5 h-5 text-stone-700" />
                </div>

                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#c9784d] group-hover:translate-x-1 transition-all" />
              </div>

              <h4 className="mt-6 text-xl font-semibold">
                Gallery Manager
              </h4>

              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Upload, edit, reorder and delete the photographs used
                by the public MCA sketchbook gallery.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#c9784d]">
                Manage Gallery
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-stone-900 p-6 text-white shadow-[0_8px_30px_rgba(45,39,35,0.08)]">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>

            <div>
              <p className="text-lg font-semibold">
                Content Management
              </p>

              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone-400">
                Students, faculty and gallery photographs are now
                connected to the protected administration panel.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
