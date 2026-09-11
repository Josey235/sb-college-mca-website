import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Faculty from './pages/Faculty';
import Students from './pages/Students';
import StudentProfile from './pages/StudentProfile';
import Academics from './pages/Academics';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Achievements from './pages/Achievements';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import StudentManager from './pages/StudentManager';
import FacultyManager from './pages/FacultyManager';
import AdminGuard from './components/admin/AdminGuard';

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-academic-600 selection:text-white font-sans antialiased">

      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

    </div>
  );
}

function ProtectedAdminRoute({ children }) {
  return (
    <AdminGuard>
      {children}
    </AdminGuard>
  );
}

export default function App() {
  return (
    <Router>

      <ScrollToTop />

      <Routes>

        {/* =====================================================
            PUBLIC WEBSITE
        ===================================================== */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/faculty"
          element={
            <PublicLayout>
              <Faculty />
            </PublicLayout>
          }
        />

        <Route
          path="/students"
          element={
            <PublicLayout>
              <Students />
            </PublicLayout>
          }
        />

        <Route
          path="/students/:id"
          element={
            <PublicLayout>
              <StudentProfile />
            </PublicLayout>
          }
        />

        <Route
          path="/academics"
          element={
            <PublicLayout>
              <Academics />
            </PublicLayout>
          }
        />

        <Route
          path="/projects"
          element={
            <PublicLayout>
              <Projects />
            </PublicLayout>
          }
        />

        <Route
          path="/events"
          element={
            <PublicLayout>
              <Events />
            </PublicLayout>
          }
        />

        <Route
          path="/achievements"
          element={
            <PublicLayout>
              <Achievements />
            </PublicLayout>
          }
        />

        <Route
          path="/gallery"
          element={
            <PublicLayout>
              <Gallery />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        {/* =====================================================
            ADMIN
        ===================================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedAdminRoute>
              <StudentManager />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/faculty"
          element={
            <ProtectedAdminRoute>
              <FacultyManager />
            </ProtectedAdminRoute>
          }
        />

        {/* =====================================================
            FALLBACK
        ===================================================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </Router>
  );
}