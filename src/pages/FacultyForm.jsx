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
  title: '',
  designation: '',
  role: '',
  is_hod: false,
  is_tutor: false,
  department: 'Computer Science',
  qualification: '',
  email: '',
  display_order: 0,
};

export default function FacultyForm({
  faculty = null,
  onSave,
  onCancel,
}) {
  const editing = Boolean(faculty);

  const [form, setForm] = useState(EMPTY_FORM);
  const [photo, setPhoto] = useState(null);
  const [removeExistingPhoto, setRemoveExistingPhoto] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (faculty) {
      setForm({
        name: faculty.name || '',
        title: faculty.title || '',
        designation: faculty.designation || '',
        role: faculty.role || '',
        is_hod: Boolean(faculty.is_hod),
        is_tutor: Boolean(faculty.is_tutor),
        department: faculty.department || 'Computer Science',
        qualification: faculty.qualification || '',
        email: faculty.email || '',
        display_order:
          faculty.display_order !== null &&
          faculty.display_order !== undefined
            ? faculty.display_order
            : 0,
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setPhoto(null);
    setRemoveExistingPhoto(false);
    setError('');
  }, [faculty]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
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
      setError('Faculty name is required.');
      return;
    }

    if (!form.designation.trim()) {
      setError('Designation is required.');
      return;
    }

    setSaving(true);

    try {
      await onSave({
        form: {
          name: form.name.trim(),
          title: form.title.trim(),
          designation: form.designation.trim(),
          role: form.role.trim(),
          is_hod: Boolean(form.is_hod),
          is_tutor: Boolean(form.is_tutor),
          department: form.department.trim(),
          qualification: form.qualification.trim(),
          email: form.email.trim(),
          display_order:
            form.display_order === '' ||
            form.display_order === null ||
            form.display_order === undefined
              ? 0
              : Number(form.display_order),
        },
        photo,
        removeExistingPhoto,
      });
    } catch (saveError) {
      console.error('Faculty form save error:', saveError);

      setError(
        saveError?.message ||
          'Unable to save the faculty profile. Please try again.'
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
              <span>Faculty</span>
            </button>

            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold text-stone-400">
              <UserRound className="w-4 h-4" />
              {editing ? 'Edit Faculty' : 'New Faculty'}
            </div>

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#c9784d]">
            Faculty Management
          </p>

          <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-stone-900">
            {editing ? 'Edit faculty profile' : 'Add a faculty member'}
          </h1>

          <p className="mt-3 text-sm text-stone-500">
            {editing
              ? 'Update the faculty information and optionally replace the profile photo.'
              : 'Add the faculty details and profile photo. Everything will be saved automatically to Supabase.'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="bg-white rounded-3xl border border-stone-200 shadow-[0_12px_45px_rgba(45,39,35,0.05)] overflow-hidden">

            {/* =====================================================
                PROFILE PHOTO
            ===================================================== */}
            <section className="p-6 sm:p-8 border-b border-stone-100">

              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-400">
                  Profile Photo
                </p>

                <p className="mt-1 text-xs text-stone-500">
                  This image will be uploaded to the faculty-photos
                  Storage bucket.
                </p>
              </div>

              <ImageUploader
                value={
                  photo
                    ? undefined
                    : removeExistingPhoto
                      ? ''
                      : faculty?.photo_url || ''
                }
                onChange={handlePhotoChange}
                disabled={saving}
              />

              {editing &&
                faculty?.photo_url &&
                !photo &&
                !removeExistingPhoto && (
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
                    disabled={saving}
                    className="text-xs font-bold text-amber-900 hover:underline disabled:opacity-50"
                  >
                    Undo
                  </button>

                </div>
              )}

            </section>

            {/* =====================================================
                BASIC INFORMATION
            ===================================================== */}
            <section className="p-6 sm:p-8 border-b border-stone-100">

              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-400">
                  Faculty Information
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <Field
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Mrs. Smitha Krishnan"
                  required
                  disabled={saving}
                />

                <Field
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Mrs., Mr., Dr., Ms."
                  disabled={saving}
                />

                <Field
                  label="Designation"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="Assistant Professor"
                  required
                  disabled={saving}
                />

                <Field
                  label="Role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="Head of Department / Tutor"
                  disabled={saving}
                />

                <Field
                  label="Department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="Computer Science"
                  disabled={saving}
                />

                <Field
                  label="Qualification"
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  placeholder="MCA / M.Sc. / Ph.D."
                  disabled={saving}
                />

                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="faculty@sbcollege.ac.in"
                  disabled={saving}
                />

                <Field
                  label="Display Order"
                  name="display_order"
                  type="number"
                  value={form.display_order}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  disabled={saving}
                />

              </div>

            </section>

            {/* =====================================================
                DEPARTMENT ROLES
            ===================================================== */}
            <section className="p-6 sm:p-8 border-b border-stone-100">

              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-400">
                  Department Roles
                </p>

                <p className="mt-1 text-xs text-stone-500">
                  Select the responsibilities this faculty member currently
                  holds.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* HOD */}
                <label
                  className={[
                    'flex items-start gap-4 rounded-2xl border p-4 cursor-pointer transition-colors',
                    form.is_hod
                      ? 'border-[#c9784d] bg-[#fdf8f4]'
                      : 'border-stone-200 bg-stone-50 hover:border-stone-300',
                  ].join(' ')}
                >
                  <input
                    type="checkbox"
                    name="is_hod"
                    checked={form.is_hod}
                    onChange={handleChange}
                    disabled={saving}
                    className="mt-1 h-4 w-4 accent-[#c9784d]"
                  />

                  <div>
                    <p className="text-sm font-bold text-stone-800">
                      Head of Department
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-stone-500">
                      Mark this faculty member as the current HOD.
                    </p>
                  </div>
                </label>

                {/* Tutor */}
                <label
                  className={[
                    'flex items-start gap-4 rounded-2xl border p-4 cursor-pointer transition-colors',
                    form.is_tutor
                      ? 'border-[#c9784d] bg-[#fdf8f4]'
                      : 'border-stone-200 bg-stone-50 hover:border-stone-300',
                  ].join(' ')}
                >
                  <input
                    type="checkbox"
                    name="is_tutor"
                    checked={form.is_tutor}
                    onChange={handleChange}
                    disabled={saving}
                    className="mt-1 h-4 w-4 accent-[#c9784d]"
                  />

                  <div>
                    <p className="text-sm font-bold text-stone-800">
                      Tutor
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-stone-500">
                      Mark this faculty member as a class tutor.
                    </p>
                  </div>
                </label>

              </div>

            </section>

            {/* =====================================================
                ERROR
            ===================================================== */}
            {error && (
              <div className="mx-6 sm:mx-8 mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* =====================================================
                ACTIONS
            ===================================================== */}
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
                    {editing ? 'Save Changes' : 'Add Faculty'}
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
  min,
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
        min={min}
        className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-[#c9784d] focus:ring-2 focus:ring-[#c9784d]/10 disabled:opacity-60"
      />
    </div>
  );
}