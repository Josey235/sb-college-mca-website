import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  GraduationCap,
  ChevronDown,
  BookOpen,
  FileText,
} from 'lucide-react';

import collegeLogo from '../assets/images/college/logo.png';

/* ─────────────────────────────────────────────
   Academics dropdown items
──────────────────────────────────────────────── */
const ACADEMICS_CHILDREN = [
  {
    name: 'Syllabus',
    path: '/academics',
    icon: BookOpen,
    
  },
  {
    name: 'Previous Year Question Papers',
    path: '/academics/question-papers',
    icon: FileText,
    
  },
];

/* ─────────────────────────────────────────────
   Desktop Academics dropdown
──────────────────────────────────────────────── */
function AcademicsDropdown({ isAcademicsActive }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const closeTimer = useRef(null);

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeDropdown = () => {
    // small delay so moving between trigger → menu doesn't flicker
    closeTimer.current = setTimeout(() => setOpen(false), 80);
  };

  // Clean up on unmount
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      {/* Trigger */}
      <button
        type="button"
        className={`
          relative flex items-center gap-1
          px-2.5 py-2.5
          text-xs font-medium
          transition-colors duration-200
          xl:px-3 xl:text-sm
          ${isAcademicsActive ? 'text-[#e08a5b]' : 'text-stone-300 hover:text-white'}
        `}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Academics
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />

        {/* Active underline — matches other nav links */}
        <span
          className={`
            absolute -bottom-0.5 left-2.5 right-2.5
            h-px origin-center bg-[#c9784d]
            transition-transform duration-200
            xl:left-3 xl:right-3
            ${isAcademicsActive ? 'scale-x-100' : 'scale-x-0'}
          `}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="
            absolute left-0 top-full z-50
            mt-1.5
            w-64
            overflow-hidden
            rounded-xl
            border border-[#302a25]
            bg-[#1c1815]
            shadow-[0_12px_40px_rgba(10,8,7,0.55)]
          "
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          {/* Top accent bar */}
          <div className="h-0.5 w-full bg-gradient-to-r from-[#c9784d] to-transparent" />

          <div className="p-1.5">
            {ACADEMICS_CHILDREN.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/academics'}
                  className={({ isActive }) => `
                    group flex items-start gap-3
                    rounded-lg px-3 py-2.5
                    transition-colors duration-150
                    ${isActive
                      ? 'bg-[#c9784d]/15 text-[#e08a5b]'
                      : 'text-stone-300 hover:bg-white/[0.05] hover:text-white'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`
                          mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center
                          rounded-md transition-colors duration-150
                          ${isActive ? 'bg-[#c9784d]/20 text-[#e08a5b]' : 'bg-white/[0.05] text-stone-400 group-hover:bg-[#c9784d]/10 group-hover:text-[#e08a5b]'}
                        `}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-tight xl:text-[13px]">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-[10px] leading-snug text-stone-500 xl:text-[11px]">
                          {item.description}
                        </p>
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Navbar
──────────────────────────────────────────────── */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileAcademicsOpen, setMobileAcademicsOpen] = useState(false);
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
    setMobileAcademicsOpen(false);
  }, [location.pathname]);

  // Whether any academics sub-route is active
  const isAcademicsActive =
    location.pathname === '/academics' ||
    location.pathname.startsWith('/academics/');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Students', path: '/students' },
    // 'Academics' is rendered separately as a dropdown
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* =========================================================
          MAIN NAVBAR
      ========================================================== */}
      <header
        className={`sticky top-0 z-50 border-b border-[#302a25] bg-[#171411] text-white transition-all duration-300 ${
          scrolled ? 'shadow-[0_8px_30px_rgba(20,17,15,0.28)]' : ''
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? 'py-3' : 'py-4'
            }`}
          >

            {/* =====================================================
                COLLEGE & DEPARTMENT IDENTITY
            ====================================================== */}
            <Link
              to="/"
              className="group flex min-w-0 items-center gap-3.5"
            >

              {/* College Logo */}
              <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center sm:h-14 sm:w-14">
                <img
                  src={collegeLogo}
                  alt="St. Berchmans College"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* College Name */}
              <div className="min-w-0">
                <span
                  className="
                    block
                    font-display
                    text-base
                    font-bold
                    leading-tight
                    tracking-tight
                    text-white
                    sm:text-lg
                  "
                >
                  St. Berchmans College
                </span>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    font-medium
                    text-stone-400
                    sm:text-[11px]
                  "
                >
                  Department of Computer Applications (MCA)
                </p>
              </div>

            </Link>


            {/* =====================================================
                DESKTOP NAVIGATION
            ====================================================== */}
            <nav className="hidden items-center gap-0.5 lg:flex">

              {/* Home, About, Faculty, Students */}
              {navLinks.slice(0, 4).map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `
                      relative
                      px-2.5
                      py-2.5
                      text-xs
                      font-medium
                      transition-colors
                      duration-200
                      xl:px-3
                      xl:text-sm
                      ${
                        isActive
                          ? 'text-[#e08a5b]'
                          : 'text-stone-300 hover:text-white'
                      }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {/* Active underline */}
                      <span
                        className={`
                          absolute
                          -bottom-0.5
                          left-2.5
                          right-2.5
                          h-px
                          origin-center
                          bg-[#c9784d]
                          transition-transform
                          duration-200
                          xl:left-3
                          xl:right-3
                          ${isActive ? 'scale-x-100' : 'scale-x-0'}
                        `}
                      />
                    </>
                  )}
                </NavLink>
              ))}

              {/* ── Academics dropdown ── */}
              <AcademicsDropdown isAcademicsActive={isAcademicsActive} />

              {/* Projects, Events, Gallery, Contact */}
              {navLinks.slice(4).map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `
                      relative
                      px-2.5
                      py-2.5
                      text-xs
                      font-medium
                      transition-colors
                      duration-200
                      xl:px-3
                      xl:text-sm
                      ${
                        isActive
                          ? 'text-[#e08a5b]'
                          : 'text-stone-300 hover:text-white'
                      }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span
                        className={`
                          absolute
                          -bottom-0.5
                          left-2.5
                          right-2.5
                          h-px
                          origin-center
                          bg-[#c9784d]
                          transition-transform
                          duration-200
                          xl:left-3
                          xl:right-3
                          ${isActive ? 'scale-x-100' : 'scale-x-0'}
                        `}
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
                className="
                  rounded-full
                  border border-white/10
                  p-2.5
                  text-stone-300
                  transition-all
                  duration-200
                  hover:border-[#c9784d]/50
                  hover:bg-[#c9784d]/10
                  hover:text-[#e08a5b]
                  focus:outline-none
                "
                aria-label="Toggle Menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>

          </div>

        </div>


        {/* =========================================================
            MOBILE DRAWER
        ========================================================== */}
        {isOpen && (
          <div
            className="
              animate-fadeIn
              border-t
              border-[#302a25]
              bg-[#171411]
              px-4
              pb-6
              pt-4
              lg:hidden
            "
          >
            <div className="space-y-1">

              {/* Home, About, Faculty, Students */}
              {navLinks.slice(0, 4).map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `
                      flex
                      items-center
                      justify-between
                      rounded-lg
                      px-4
                      py-3
                      text-sm
                      font-medium
                      transition-all
                      ${
                        isActive
                          ? 'bg-[#c9784d]/15 text-[#e08a5b]'
                          : 'text-stone-300 hover:bg-white/[0.04] hover:text-white'
                      }
                    `
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {/* ── Mobile Academics accordion ── */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAcademicsOpen((v) => !v)}
                  className={`
                    flex w-full items-center justify-between
                    rounded-lg px-4 py-3
                    text-sm font-medium transition-all
                    ${
                      isAcademicsActive
                        ? 'bg-[#c9784d]/15 text-[#e08a5b]'
                        : 'text-stone-300 hover:bg-white/[0.04] hover:text-white'
                    }
                  `}
                >
                  Academics
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      mobileAcademicsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Mobile sub-items */}
                {mobileAcademicsOpen && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l border-[#302a25] pl-3">
                    {ACADEMICS_CHILDREN.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={item.path === '/academics'}
                          className={({ isActive }) => `
                            flex items-center gap-2.5
                            rounded-lg px-3 py-2.5
                            text-sm font-medium transition-all
                            ${
                              isActive
                                ? 'bg-[#c9784d]/15 text-[#e08a5b]'
                                : 'text-stone-400 hover:bg-white/[0.04] hover:text-white'
                            }
                          `}
                        >
                          <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                          {item.name}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Projects, Events, Gallery, Contact */}
              {navLinks.slice(4).map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `
                      flex
                      items-center
                      justify-between
                      rounded-lg
                      px-4
                      py-3
                      text-sm
                      font-medium
                      transition-all
                      ${
                        isActive
                          ? 'bg-[#c9784d]/15 text-[#e08a5b]'
                          : 'text-stone-300 hover:bg-white/[0.04] hover:text-white'
                      }
                    `
                  }
                >
                  {link.name}
                </NavLink>
              ))}

            </div>


            {/* Mobile Student Button */}
            <div className="mt-4 border-t border-[#302a25] pt-4">

              <Link
                to="/students"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#c9784d]
                  px-4
                  py-3
                  text-xs
                  font-bold
                  text-white
                  transition-colors
                  hover:bg-[#b96843]
                "
              >

                <GraduationCap className="h-4 w-4" />

                MCA Students (Batch 2026–2028)

              </Link>

            </div>

          </div>
        )}

      </header>
    </>
  );
}