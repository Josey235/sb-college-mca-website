import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Send,
  CheckCircle2,
  ExternalLink,
  User,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
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
        message: '',
      });
    }, 800);
  };

  return (
    <div className="space-y-16 pb-20">

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-navy-800 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-16 text-white sm:py-20">

        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '74px 74px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">

            <span className="inline-block rounded-full border border-academic-400/40 bg-academic-600/80 px-3.5 py-1 text-xs font-semibold text-white">
              Department Communications
            </span>

            <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-5xl">
              Contact{' '}
              <span className="text-gradient">
                Department
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Reach out to the Department of Computer Applications at
              St. Berchmans College, Changanassery.
            </p>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Contact Information + Form Grid */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">

          {/* Left Column */}
          <div className="space-y-6 lg:col-span-5">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">

              <div className="mb-7">
                <span className="text-xs font-bold uppercase tracking-wider text-academic-600">
                  Official Details
                </span>

                <h2 className="mt-1 font-display text-xl font-bold text-navy-900">
                  Department of Computer Applications (MCA)
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  St. Berchmans College, Changanassery
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">

                {/* Address */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-academic-100 bg-academic-50 text-academic-600">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-navy-900">
                        College Address
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        St. Berchmans College, Changanassery,
                        Kottayam District, Kerala, PIN: 686101
                      </p>
                    </div>

                  </div>
                </div>

                {/* HOD */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-academic-100 bg-academic-50 text-academic-600">
                      <User className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-navy-900">
                        Head of Department
                      </h3>

                      <p className="mt-1 font-semibold text-slate-700">
                        Ms. Smitha Krishnan
                      </p>

                      <p className="text-xs text-slate-500">
                        Department of Computer Applications
                      </p>
                    </div>

                  </div>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-academic-100 bg-academic-50 text-academic-600">
                      <Mail className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-navy-900">
                        Department Email
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        MCA Department, St. Berchmans College
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-400">
                MCA Batch 2026–2028 (First Batch)
              </div>

            </div>

          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-10">

              <div className="mb-6">
                <span className="inline-block rounded-full border border-academic-200 bg-academic-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-academic-700">
                  Enquiry Form
                </span>

                <h2 className="mt-2 font-display text-2xl font-bold text-navy-900">
                  Send a Message
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Submit your query to the MCA Department.
                </p>
              </div>

              {submitted ? (

                /* Success State */
                <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-emerald-950">
                    Thank You! Message Received
                  </h3>

                  <p className="mx-auto max-w-md text-xs text-emerald-800 sm:text-sm">
                    Your message has been submitted.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 rounded-xl bg-emerald-700 px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-800"
                  >
                    Send Another Message
                  </button>

                </div>

              ) : (

                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-700">
                        Your Name *
                      </label>

                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-navy-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-academic-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-700">
                        Email Address *
                      </label>

                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-navy-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-academic-500 sm:text-sm"
                      />
                    </div>

                  </div>

                  {/* Phone + Subject */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-700">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-navy-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-academic-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-700">
                        Subject *
                      </label>

                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            subject: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-navy-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-academic-500 sm:text-sm"
                      >
                        <option value="General Enquiry">
                          General MCA Enquiry
                        </option>

                        <option value="MCA Batch 2026-28">
                          MCA Batch 2026–2028
                        </option>

                        <option value="Academics & Syllabus">
                          Academics & Syllabus
                        </option>

                        <option value="Other">
                          Other Enquiry
                        </option>
                      </select>
                    </div>

                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-700">
                      Message *
                    </label>

                    <textarea
                      required
                      rows={5}
                      placeholder="Write your message..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-navy-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-academic-500 sm:text-sm"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-academic-600 px-6 py-3.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-academic-700 disabled:opacity-75 sm:text-sm"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>

          </div>

        </div>

        {/* Google Maps */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">

          <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-academic-600">
                Location Map
              </span>

              <h2 className="font-display text-xl font-bold text-navy-900">
                St. Berchmans College, Changanassery
              </h2>
            </div>

            <a
              href="https://maps.google.com/?q=St.+Berchmans+College+Changanassery"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-academic-600 transition-colors hover:text-academic-700"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

          </div>

          <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:h-96">

            <iframe
              title="St. Berchmans College Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.539316027389!2d76.53696547585098!3d9.461324790618454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0625907e85c181%3A0xe10faec7d6a59960!2sSt.%20Berchmans%20College!5e0!3m2!1sen!2sin!4v1709720000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />

          </div>

        </div>

      </main>

    </div>
  );
}