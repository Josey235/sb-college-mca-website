import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, ShieldAlert } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminGuard({ children }) {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkAdminAccess() {
      setLoading(true);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        if (mounted) {
          setAuthorized(false);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id, email, role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        console.error('Admin authorization error:', error);
        setAuthorized(false);
      } else {
        setAuthorized(Boolean(data));
      }

      setLoading(false);
    }

    checkAdminAccess();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkAdminAccess();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center px-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-[#c9784d] animate-spin" />
          </div>

          <p className="mt-4 text-sm font-medium text-stone-700">
            Verifying administrator access...
          </p>

          <p className="mt-1 text-xs text-stone-500">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}