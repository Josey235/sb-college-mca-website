import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  User,
  GraduationCap
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Enquiry',
        message: ''
      });
    }, 800);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white py-16 sm:py-20 relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 bg-dots-dark opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-academic-600/80 text-white border border-academic-400/40">
              Department Communications
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
              Contact <span className="text-gradient">Department</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Reach out to the Department of Computer Applications at St. Berchmans College, Changanassery.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Contact Information & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Real Address & Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
              <div>
                <span className="text-xs font-bold text-academic-600 uppercase tracking-wider">
                  Official Details
                </span>
                <h3 className="text-xl font-bold text-navy-900 font-display mt-1">
                  Department of Computer Applications (MCA)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  St. Berchmans College, Changanassery
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-academic-50 text-academic-600 flex items-center justify-center shrink-0 mt-0.5 border border-academic-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900">College Address</h4>
                    <p className="mt-0.5 text-slate-600 leading-relaxed">
                      St. Berchmans College, Changanassery, Kottayam District, Kerala, PIN: 686101
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-academic-50 text-academic-600 flex items-center justify-center shrink-0 mt-0.5 border border-academic-100">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900">Head of Department</h4>
                    <p className="mt-0.5 text-slate-700 font-semibold">
                      Smitha
                    </p>
                    <p className="text-xs text-slate-500">Department of Computer Applications</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-academic-50 text-academic-600 flex items-center justify-center shrink-0 mt-0.5 border border-academic-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900">Department Email</h4>
                    <p className="mt-0.5 text-slate-700">
                      MCA Department, St. Berchmans College
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
                <span>MCA Batch 2026–2028 (First Batch)</span>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
              
              <div className="mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-academic-50 text-academic-700 border border-academic-200">
                  Enquiry Form
                </span>
                <h3 className="text-2xl font-bold text-navy-900 font-display mt-2">
                  Send a Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Submit your query to the MCA Department.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950 font-display">
                    Thank You! Message Received
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                    Your message has been submitted.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-academic-500 focus:bg-white text-navy-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-academic-500 focus:bg-white text-navy-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-academic-500 focus:bg-white text-navy-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Subject *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-academic-500 focus:bg-white text-navy-900 font-medium"
                      >
                        <option value="General Enquiry">General MCA Enquiry</option>
                        <option value="MCA Batch 2026-28">MCA Batch 2026–2028</option>
                        <option value="Academics & Syllabus">Academics & Syllabus</option>
                        <option value="Other">Other Enquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-academic-500 focus:bg-white text-navy-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-academic-600 hover:bg-academic-700 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Google Maps Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-academic-600 uppercase tracking-wider">
                Location Map
              </span>
              <h3 className="text-xl font-bold text-navy-900 font-display">
                St. Berchmans College, Changanassery
              </h3>
            </div>
            <a
              href="https://maps.google.com/?q=St.+Berchmans+College+Changanassery"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-academic-600 hover:text-academic-700"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100">
            <iframe
              title="St. Berchmans College Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.539316027389!2d76.53696547585098!3d9.461324790618454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0625907e85c181%3A0xe10faec7d6a59960!2sSt.%20Berchmans%20College!5e0!3m2!1sen!2sin!4v1709720000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
