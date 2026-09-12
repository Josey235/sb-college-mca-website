import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Save,
  X,
} from 'lucide-react';

import ImageUploader from '../components/admin/ImageUploader';

const EMPTY_FORM = {
  title: '',
  description: '',
  category: 'General',
  display_order: 0,
};

export default function GalleryForm({
  item = null,
  onSave,
  onCancel,
}) {
  const editing = Boolean(item);

  const [form, setForm] = useState(EMPTY_FORM);
  const [photo, setPhoto] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title || '',
        description: item.description || '',
        category: item.category || 'General',
        display_order:
          item.display_order ?? 0,
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setPhoto(null);
    setError('');
  }, [item]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handlePhotoChange(file) {
    setPhoto(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');

    if (!editing && !photo) {
      setError(
        'Please choose a photograph before saving.'
      );

      return;
    }

    setSaving(true);

    try {
      await onSave({
        form: {
          title: form.title.trim(),
          description:
            form.description.trim(),
          category:
            form.category.trim() ||
            'General',
          display_order:
            Number(form.display_order) || 0,
        },
        photo,
      });
    } catch (saveError) {
      console.error(
        'Gallery form save error:',
        saveError
      );

      setError(
        saveError?.message ||
          'Unable to save the gallery photograph.'
      );

      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef]">

      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="flex min-h-20 items-center justify-between gap-4">

            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition-colors hover:text-[#c9784d] disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Gallery
            </button>

            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">

              <ImagePlus className="h-4 w-4" />

              {editing
                ? 'Edit Gallery Photo'
                : 'New Gallery Photo'}

            </div>

          </div>

        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        <div className="mb-8">

          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9784d]">
            Gallery Management
          </p>

          <h1 className="mt-2 font-serif text-3xl text-stone-900 sm:text-4xl">
            {editing
              ? 'Edit gallery photograph'
              : 'Add a gallery photograph'}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-500">
            Each photograph becomes a page in the public MCA
            digital sketchbook.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_12px_45px_rgba(45,39,35,0.05)]">

            {/* Photograph */}
            <section className="border-b border-stone-100 p-6 sm:p-8">

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
                Photograph
              </p>

              <p className="mt-1 text-xs text-stone-500">
                JPG, PNG or WebP. Maximum 5 MB.
              </p>

              <div className="mt-5">

                <ImageUploader
                  value={
                    photo === null
                      ? item?.image_url || ''
                      : undefined
                  }
                  onChange={handlePhotoChange}
                  disabled={saving}
                />

              </div>

            </section>

            {/* Information */}
            <section className="p-6 sm:p-8">

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
                Page Information
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                <Field
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="MCA Orientation Day"
                  disabled={saving}
                />

                <Field
                  label="Category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Events"
                  disabled={saving}
                />

                <Field
                  label="Display Order"
                  name="display_order"
                  type="number"
                  min="0"
                  value={form.display_order}
                  onChange={handleChange}
                  placeholder="1"
                  disabled={saving}
                />

                <div className="md:col-span-2">

                  <label
                    htmlFor="description"
                    className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-stone-500"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    disabled={saving}
                    rows={5}
                    placeholder="A short note about this memory..."
                    className="w-full resize-y rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-relaxed text-stone-900 outline-none transition focus:border-[#c9784d] focus:ring-2 focus:ring-[#c9784d]/10 disabled:opacity-60"
                  />

                </div>

              </div>

              {error && (
                <div className="mt-6 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                  <X className="mt-0.5 h-4 w-4 shrink-0" />

                  <span>{error}</span>

                </div>
              )}

            </section>

            {/* Actions */}
            <footer className="flex flex-col-reverse gap-2 border-t border-stone-100 bg-stone-50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">

              <button
                type="button"
                onClick={onCancel}
                disabled={saving}
                className="h-11 rounded-xl border border-stone-200 bg-white px-5 text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-stone-900 px-5 text-sm font-bold text-white transition-colors hover:bg-[#c9784d] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}

                {saving
                  ? 'Saving...'
                  : editing
                    ? 'Save Changes'
                    : 'Add Photo'}

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
  disabled = false,
  min,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-stone-500"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-[#c9784d] focus:ring-2 focus:ring-[#c9784d]/10 disabled:opacity-60"
      />

    </div>
  );
}