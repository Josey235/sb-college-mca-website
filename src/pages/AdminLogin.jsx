import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  LockKeyhole,
  LogIn,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    async function checkExistingSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data, error: adminError } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!adminError && data) {
        navigate('/admin', { replace: true });
      }
    }

    checkExistingSession();
  }, [navigate]);

  async function handleLogin(event) {
    event.preventDefault();

    setError('');

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

    if (loginError) {
      console.error('Admin login error:', loginError);

      setError(
        loginError.message ||
          'Unable to sign in. Please check your credentials.'
      );

      setLoading(false);
      return;
    }

    if (!data?.user) {
      setError('Login could not be completed. Please try again.');
      setLoading(false);
      return;
    }

    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('user_id, email, role')
      .eq('user_id', data.user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (adminError) {
      console.error('Admin verification error:', adminError);

      await supabase.auth.signOut();

      setError(
        'Your account is not authorized to access the administrator panel.'
      );

      setLoading(false);
      return;
    }

    if (!adminData) {
      await supabase.auth.signOut();

      setError(
        'This account does not have administrator access.'
      );

      setLoading(false);
      return;
    }

    navigate('/admin', { replace: true });
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-stone-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Back to website */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-[#c9784d] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to website
        </Link>

        {/* Login Card */}
        <div className="bg-white border border-stone-200 rounded-3xl shadow-[0_20px_60px_rgba(45,39,35,0.08)] overflow-hidden">

          {/* Header */}
          <div className="px-7 pt-8 pb-7 border-b border-stone-100">
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-[#f8eee8] border border-[#ead7cb] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#c9784d]" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-stone-400">
                  MCA Department
                </p>

                <h1 className="font-serif text-2xl text-stone-900">
                  Administrator
                </h1>
              </div>

            </div>

            <div className="mt-6 flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
              <ShieldCheck className="w-4 h-4 text-[#c9784d] mt-0.5 shrink-0" />

              <p className="text-xs leading-relaxed text-stone-600">
                Sign in with your authorized administrator account
                to manage the MCA website.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="p-7 space-y-5"
          >

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-red-800">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />

                <p className="text-xs leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold uppercase tracking-[0.12em] text-stone-500 mb-2"
              >
                Email address
              </label>

              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full h-12 rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-[#c9784d] focus:ring-2 focus:ring-[#c9784d]/10 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold uppercase tracking-[0.12em] text-stone-500 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />

                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full h-12 rounded-xl border border-stone-200 bg-stone-50 pl-11 pr-12 text-sm text-stone-900 outline-none transition focus:border-[#c9784d] focus:ring-2 focus:ring-[#c9784d]/10 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-stone-900 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#c9784d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in to Admin
                </>
              )}
            </button>

          </form>

          {/* Footer */}
          <div className="px-7 py-5 border-t border-stone-100 bg-stone-50">
            <p className="text-center text-[11px] text-stone-400">
              Authorized personnel only
            </p>
          </div>

        </div>

        <p className="text-center text-[11px] text-stone-400 mt-6">
          St. Berchmans College · MCA Department
        </p>

      </div>
    </div>
  );
}