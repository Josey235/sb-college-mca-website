import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Loader2,
  Save,
  UserRound,
  X,
} from 'lucide-react';
import ImageUploader from '../components/admin/ImageUploader';

const EMPTY_FORM = {
  name: '',
  roll_number: '',
  email: '',
  phone: '',
  batch: '',
  bio: '',
  linkedin_url: '',
  github_url: '',
};

export default function StudentForm({
  student = null,
  onSave,
  onCancel,
}) {
  const editing = Boolean(student);

  const [form, setForm] = useState(EMPTY_FORM);
  const [photo, setPhoto] = useState(null);
  const [removeExistingPhoto, setRemoveExistingPhoto] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || '',
        roll_number: student.roll_number || '',
        email: student.email || '',
        phone: student.phone || '',
        batch: student.batch || '',
        bio: student.bio || '',
        linkedin_url: student.linkedin_url || '',
        github_url: student.github_url || '',
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setPhoto(null);
    setRemoveExistingPhoto(false);
    setError('');
  }, [student]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handlePhotoChange(file) {
    setPhoto(file);

    if (file) {
      setRemoveExistingPhoto(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');

    if (!form.name.trim()) {
      setError('Student name is required.');
      return;
    }

    if (!form.roll_number.trim()) {
      setError('Roll number is required.');
      return;
    }

    setSaving(true);

    try {
      await onSave({
        form: {
          name: form.name.trim(),
          roll_number: form.roll_number.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          batch: form.batch.trim(),
          bio: form.bio.trim(),
          linkedin_url: form.linkedin_url.trim(),
          github_url: form.github_url.trim(),
        },
        photo,
        removeExistingPhoto,
      });
    } catch (saveError) {
      console.error('Student form save error:', saveError);

      setError(
        saveError?.message ||
          'Unable to save the student. Please try again.'
      );

      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef]">

      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="min-h-20 flex items-center justify-between gap-4">

            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-[#c9784d] transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Students</span>
            </button>

            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold text-stone-400">
              <UserRound className="w-4 h-4" />
              {editing ? 'Edit Student' : 'New Student'}
            </div>

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#c9784d]">
            Student Management
          </p>

          <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900">
            {editing ? 'Edit student profile' : 'Add a student'}
          </h1>

          <p className="mt-3 text-sm text-stone-500">
            {editing
              ? 'Update the profile information and optionally replace the profile photo.'
              : 'Add the student details and profile photo. Everything will be saved automatically to Supabase.'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="bg-white rounded-3xl border border-stone-200 shadow-[0_12px_45px_rgba(45,39,35,0.05)] overflow-hidden">

            {/* Photo */}
            <section className="p-6 sm:p-8 border-b border-stone-100">

              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-400">
                  Profile Photo
                </p>

                <p className="mt-1 text-xs text-stone-500">
                  This image will be uploaded to the student-photos
                  Storage bucket.
                </p>
              </div>

              <ImageUploader
                value={
                  photo
                    ? undefined
                    : removeExistingPhoto
                      ? ''
                      : student?.photo_url || ''
                }
                onChange={handlePhotoChange}
                disabled={saving}
              />

              {editing && student?.photo_url && !photo && !removeExistingPhoto && (
                <button
                  type="button"
                  onClick={() => setRemoveExistingPhoto(true)}
                  disabled={saving}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  <X className="w-3.5 h-3.5" />
                  Remove current photo
                </button>
              )}

              {editing && removeExistingPhoto && !photo && (
                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">

                  <p className="text-xs text-amber-800">
                    The current photo will be removed when you save.
                  </p>

                  <button
                    type="button"
                    onClick={() => setRemoveExistingPhoto(false)}
                    className="text-xs font-bold text-amber-900 hover:underline"
                  >
                    Undo
                  </button>

                </div>
              )}

            </section>

            {/* Details */}
            <section className="p-6 sm:p-8">

              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-400">
                  Student Information
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Name */}
                <Field
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                  disabled={saving}
                />

                {/* Roll */}
                <Field
                  label="Roll Number"
                  name="roll_number"
                  value={form.roll_number}
                  onChange={handleChange}
                  placeholder="MCA001"
                  required
                  disabled={saving}
                />

                {/* Email */}
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  disabled={saving}
                />

                {/* Phone */}
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91..."
                  disabled={saving}
                />

                {/* Batch */}
                <Field
                  label="Batch"
                  name="batch"
                  value={form.batch}
                  onChange={handleChange}
                  placeholder="2026–2028"
                  disabled={saving}
                />

                {/* LinkedIn */}
                <Field
                  label="LinkedIn URL"
                  name="linkedin_url"
                  type="url"
                  value={form.linkedin_url}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  disabled={saving}
                />

                {/* GitHub */}
                <Field
                  label="GitHub URL"
                  name="github_url"
                  type="url"
                  value={form.github_url}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  disabled={saving}
                />

                {/* Bio */}
                <div className="md:col-span-2">

                  <label
                    htmlFor="bio"
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-stone-500 mb-2"
                  >
                    Bio
                  </label>

                  <textarea
                    id="bio"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    disabled={saving}
                    rows={5}
                    placeholder="Write a short introduction about the student..."
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-relaxed text-stone-900 outline-none resize-y transition focus:border-[#c9784d] focus:ring-2 focus:ring-[#c9784d]/10 disabled:opacity-60"
                  />

                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

            </section>

            {/* Actions */}
            <footer className="px-6 sm:px-8 py-5 border-t border-stone-100 bg-stone-50 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">

              <button
                type="button"
                onClick={onCancel}
                disabled={saving}
                className="h-11 px-5 rounded-xl border border-stone-200 bg-white text-sm font-semibold text-stone-600 hover:bg-stone-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="h-11 px-5 rounded-xl bg-stone-900 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#c9784d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editing ? 'Save Changes' : 'Add Student'}
                  </>
                )}
              </button>

            </footer>

          </div>

        </form>

      </main>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-bold uppercase tracking-[0.12em] text-stone-500 mb-2"
      >
        {label}
        {required && (
          <span className="text-[#c9784d] ml-1">*</span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-[#c9784d] focus:ring-2 focus:ring-[#c9784d]/10 disabled:opacity-60"
      />
    </div>
  );
}