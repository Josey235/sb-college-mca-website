import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  GraduationCap
} from 'lucide-react';

import collegeLogo from '../assets/images/college/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Students', path: '/students' },
    { name: 'Academics', path: '/academics' },
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* =========================================================
          MAIN NAVBAR
      ========================================================== */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(45,39,35,0.06)] border-b border-stone-200'
            : 'bg-white border-b border-stone-100'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled
                ? 'py-3'
                : 'py-4'
            }`}
          >

            {/* =====================================================
                COLLEGE & DEPARTMENT IDENTITY
            ====================================================== */}
            <Link
              to="/"
              className="flex items-center gap-3.5 group min-w-0"
            >

              {/* College Logo */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
                <img
                  src={collegeLogo}
                  alt="St. Berchmans College"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* College Name */}
              <div className="min-w-0">

                <span className="text-stone-900 font-display font-bold text-base sm:text-lg tracking-tight block leading-tight">
                  St. Berchmans College
                </span>

                <p className="text-[10px] sm:text-[11px] text-stone-500 font-medium mt-0.5">
                  Department of Computer Applications (MCA)
                </p>

              </div>

            </Link>

            {/* =====================================================
                DESKTOP NAVIGATION
            ====================================================== */}
            <nav className="hidden lg:flex items-center gap-0.5">

              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-2.5 xl:px-3 py-2.5 text-xs xl:text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-[#c9784d]'
                        : 'text-stone-700 hover:text-[#c9784d]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}

                      <span
                        className={`absolute left-2.5 right-2.5 xl:left-3 xl:right-3 -bottom-0.5 h-px bg-[#c9784d] transition-transform duration-200 origin-center ${
                          isActive
                            ? 'scale-x-100'
                            : 'scale-x-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}

            </nav>

            {/* =====================================================
                MOBILE MENU BUTTON
            ====================================================== */}
            <div className="flex lg:hidden">

              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="p-2.5 rounded-full text-stone-700 border border-stone-200 hover:border-[#d89a7a] hover:text-[#b96843] hover:bg-[#fdf4ef] transition-all duration-200 focus:outline-none"
                aria-label="Toggle Menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

            </div>

          </div>

        </div>

        {/* =========================================================
            MOBILE DRAWER
        ========================================================== */}
        {isOpen && (
          <div className="lg:hidden bg-[#faf8f5] border-t border-stone-200 border-b px-4 pt-4 pb-6 animate-fadeIn">

            <div className="space-y-1">

              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-[#b96843] bg-[#fdf1eb]'
                        : 'text-stone-700 hover:text-[#b96843] hover:bg-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

            </div>

            {/* Mobile Student Button */}
            <div className="mt-4 pt-4 border-t border-stone-200">

              <Link
                to="/students"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold text-white bg-[#c9784d] hover:bg-[#b96843] transition-colors"
              >
                <GraduationCap className="w-4 h-4" />

                MCA Students (Batch 2026–2028)
              </Link>

            </div>

          </div>
        )}

      </header>
    </>
  );
}