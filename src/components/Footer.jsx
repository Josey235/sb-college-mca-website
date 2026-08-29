import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400 text-sm border-t border-navy-800">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: College & Dept */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-academic-600 flex items-center justify-center text-white shadow">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base font-display">
                  Department of MCA
                </h3>
                <p className="text-xs text-slate-400">
                  St. Berchmans College
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              The Master of Computer Applications programme at St. Berchmans College, Changanassery, began in 2026. MCA Batch 2026–2028 represents the first batch of the programme.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-navy-900 text-amber-300 border border-navy-800">
                <Sparkles className="w-3 h-3 text-amber-400" /> MCA Batch 2026–2028 (First Batch)
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 border-b border-navy-800 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-academic-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-academic-400 transition-colors">About MCA</Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-academic-400 transition-colors">Faculty</Link>
              </li>
              <li>
                <Link to="/students" className="hover:text-academic-400 transition-colors">Students (Batch 2026–2028)</Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-academic-400 transition-colors">Academics</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 border-b border-navy-800 pb-2">
              Department Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/projects" className="hover:text-academic-400 transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-academic-400 transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-academic-400 transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-academic-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 border-b border-navy-800 pb-2">
              Location & Contact
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-academic-400 shrink-0 mt-0.5" />
                <span>St. Berchmans College, Changanassery, Kottayam, Kerala 686101</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-academic-400 shrink-0" />
                <span>HOD: Ms. Smitha Krishnan</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-academic-400 shrink-0" />
                <span>MCA Department, SB College</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} St. Berchmans College, Changanassery. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Master of Computer Applications</span>
            <span>•</span>
            <span className="text-academic-400">Batch 2026–2028</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
