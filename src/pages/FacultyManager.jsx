import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Edit3,
  ExternalLink,
  GraduationCap,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { supabase } from '../lib/supabase';
import FacultyForm from './FacultyForm';

const BUCKET = 'faculty-photos';

const FACULTY_FIELDS =
  'id, created_at, name, title, designation, role, is_hod, is_tutor, department, qualification, email, photo_url, display_order';

/* =========================================================
   STORAGE HELPERS
========================================================= */

function getStoragePathFromPublicUrl(photoUrl) {
  if (!photoUrl) return null;

  const marker = `/storage/v1/object/public/${BUCKET}/`;

  const index = photoUrl.indexOf(marker);

  if (index === -1) {
    return null;
  }

  const path = photoUrl.slice(index + marker.length);

  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

function createSafeFileName(file) {
  const originalName = file.name || 'faculty-photo';

  const extension =
    originalName.includes('.')
      ? originalName.split('.').pop().toLowerCase()
      : 'jpg';

  const baseName = originalName
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

  return `${baseName || 'faculty-photo'}.${extension}`;
}

async function uploadFacultyPhoto(file) {
  if (!file) return null;

  const fileName = createSafeFileName(file);

  /*
   * Keep faculty photos inside a dedicated profiles folder.
   * UUID prevents collisions even when the same filename
   * is uploaded multiple times.
   */
  const filePath = `profiles/${crypto.randomUUID()}-${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(
      `Photo upload failed: ${uploadError.message}`
    );
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  if (!data?.publicUrl) {
    await supabase.storage
      .from(BUCKET)
      .remove([filePath]);

    throw new Error(
      'The photo was uploaded, but a public URL could not be generated.'
    );
  }

  return {
    path: filePath,
    url: data.publicUrl,
  };
}

async function deleteFacultyPhoto(photoUrl) {
  const path = getStoragePathFromPublicUrl(photoUrl);

  if (!path) {
    return {
      success: false,
      skipped: true,
    };
  }

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) {
    console.error(
      'Faculty storage photo deletion error:',
      error
    );

    return {
      success: false,
      skipped: false,
      error,
    };
  }

  return {
    success: true,
    skipped: false,
  };
}

/* =========================================================
   MAIN MANAGER
========================================================= */

export default function FacultyManager() {
  const [facultyMembers, setFacultyMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [pageError, setPageError] = useState('');
  const [notice, setNotice] = useState('');

  const [search, setSearch] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);

  const [deleteFaculty, setDeleteFaculty] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /* =========================================================
     FETCH FACULTY
  ========================================================= */

  async function fetchFaculty(showRefreshState = false) {
    if (showRefreshState) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setPageError('');

    const { data, error } = await supabase
      .from('Faculty')
      .select(FACULTY_FIELDS)
      .order('display_order', {
        ascending: true,
        nullsFirst: false,
      })
      .order('id', {
        ascending: true,
      });

    if (error) {
      console.error(
        'Faculty manager fetch error:',
        error
      );

      setPageError(
        'Unable to load faculty profiles. Please refresh and try again.'
      );

      setFacultyMembers([]);
    } else {
      setFacultyMembers(data || []);
    }

    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchFaculty();
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredFaculty = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return facultyMembers;
    }

    return facultyMembers.filter((faculty) => {
      const values = [
        faculty.name,
        faculty.title,
        faculty.designation,
        faculty.role,
        faculty.department,
        faculty.qualification,
        faculty.email,
      ];

      return values.some((value) =>
        String(value || '')
          .toLowerCase()
          .includes(query)
      );
    });
  }, [facultyMembers, search]);

  /* =========================================================
     FORM CONTROLS
  ========================================================= */

  function openAddForm() {
    setNotice('');
    setPageError('');
    setEditingFaculty(null);
    setFormOpen(true);
  }

  function openEditForm(faculty) {
    setNotice('');
    setPageError('');
    setEditingFaculty(faculty);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingFaculty(null);
  }

  /* =========================================================
     SAVE FACULTY
  ========================================================= */

  async function handleSaveFaculty({
    form,
    photo,
    removeExistingPhoto,
  }) {
    setNotice('');
    setPageError('');

    let uploadedPhoto = null;

    const oldPhotoUrl =
      editingFaculty?.photo_url || null;

    try {
      /* -------------------------------------------------------
         ADD
      ------------------------------------------------------- */

      if (!editingFaculty) {
        /*
         * Upload the photo first.
         */
        if (photo) {
          uploadedPhoto =
            await uploadFacultyPhoto(photo);
        }

        /*
         * Insert the faculty record.
         */
        const { error } = await supabase
          .from('Faculty')
          .insert({
            name: form.name,
            title: form.title || null,
            designation: form.designation,
            role: form.role || null,
            is_hod: Boolean(form.is_hod),
            is_tutor: Boolean(form.is_tutor),
            department:
              form.department || null,
            qualification:
              form.qualification || null,
            email: form.email || null,
            photo_url:
              uploadedPhoto?.url || null,
            display_order:
              Number.isFinite(form.display_order)
                ? form.display_order
                : 0,
          });

        /*
         * If the database insert fails, remove the newly
         * uploaded Storage object so we don't leave an orphan.
         */
        if (error) {
          if (uploadedPhoto?.path) {
            await supabase.storage
              .from(BUCKET)
              .remove([uploadedPhoto.path]);
          }

          throw new Error(
            `Faculty could not be added: ${error.message}`
          );
        }

        closeForm();

        setNotice(
          `${form.name} was added successfully.`
        );

        await fetchFaculty(true);

        return;
      }

      /* -------------------------------------------------------
         EDIT
      ------------------------------------------------------- */

      /*
       * Upload replacement photo before updating the database.
       */
      if (photo) {
        uploadedPhoto =
          await uploadFacultyPhoto(photo);
      }

      let nextPhotoUrl = oldPhotoUrl;

      if (uploadedPhoto?.url) {
        nextPhotoUrl = uploadedPhoto.url;
      }

      if (
        removeExistingPhoto &&
        !uploadedPhoto
      ) {
        nextPhotoUrl = null;
      }

      const { error } = await supabase
        .from('Faculty')
        .update({
          name: form.name,
          title: form.title || null,
          designation: form.designation,
          role: form.role || null,
          is_hod: Boolean(form.is_hod),
          is_tutor: Boolean(form.is_tutor),
          department:
            form.department || null,
          qualification:
            form.qualification || null,
          email: form.email || null,
          photo_url: nextPhotoUrl,
          display_order:
            Number.isFinite(form.display_order)
              ? form.display_order
              : 0,
        })
        .eq('id', editingFaculty.id);

      /*
       * Database update failed.
       * Remove the newly uploaded replacement photo.
       */
      if (error) {
        if (uploadedPhoto?.path) {
          await supabase.storage
            .from(BUCKET)
            .remove([uploadedPhoto.path]);
        }

        throw new Error(
          `Faculty could not be updated: ${error.message}`
        );
      }

      /*
       * IMPORTANT:
       * Delete the old Storage photo only AFTER the database
       * successfully points to the new URL/null.
       */
      let storageWarning = false;

      if (
        oldPhotoUrl &&
        (uploadedPhoto?.url ||
          removeExistingPhoto)
      ) {
        const result =
          await deleteFacultyPhoto(oldPhotoUrl);

        if (
          !result.success &&
          !result.skipped
        ) {
          storageWarning = true;
        }
      }

      closeForm();

      if (storageWarning) {
        setNotice(
          `${form.name} was updated, but the old photo could not be removed from Storage.`
        );
      } else {
        setNotice(
          `${form.name} was updated successfully.`
        );
      }

      await fetchFaculty(true);
    } catch (error) {
      console.error(
        'Faculty save error:',
        error
      );

      throw error;
    }
  }

  /* =========================================================
     DELETE FACULTY
  ========================================================= */

  async function handleDeleteFaculty() {
    if (!deleteFaculty) {
      return;
    }

    setDeleting(true);
    setNotice('');
    setPageError('');

    const facultyToDelete =
      deleteFaculty;

    const photoUrl =
      facultyToDelete.photo_url;

    try {
      /*
       * Delete database record first.
       */
      const { error: databaseError } =
        await supabase
          .from('Faculty')
          .delete()
          .eq('id', facultyToDelete.id);

      if (databaseError) {
        throw new Error(
          `Faculty could not be deleted: ${databaseError.message}`
        );
      }

      /*
       * Then delete associated Storage image.
       */
      let storageWarning = false;

      if (photoUrl) {
        const result =
          await deleteFacultyPhoto(photoUrl);

        if (
          !result.success &&
          !result.skipped
        ) {
          storageWarning = true;
        }
      }

      setDeleteFaculty(null);

      if (storageWarning) {
        setNotice(
          `${facultyToDelete.name || 'Faculty member'} was deleted, but the photo could not be removed from Storage.`
        );
      } else {
        setNotice(
          `${facultyToDelete.name || 'Faculty member'} was deleted successfully.`
        );
      }

      await fetchFaculty(true);
    } catch (error) {
      console.error(
        'Faculty deletion error:',
        error
      );

      setPageError(
        error?.message ||
          'Unable to delete the faculty profile.'
      );
    } finally {
      setDeleting(false);
    }
  }

  /* =========================================================
     FORM VIEW
  ========================================================= */

  if (formOpen) {
    return (
      <FacultyForm
        faculty={editingFaculty}
        onSave={handleSaveFaculty}
        onCancel={closeForm}
      />
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-stone-900">

      {/* Header */}
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="min-h-20 flex items-center justify-between gap-4">

            <Link
              to="/admin"
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-[#c9784d] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Admin Dashboard
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold text-stone-400">
              <GraduationCap className="w-4 h-4" />
              Faculty Manager
            </div>

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Heading */}
        <section className="mb-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#c9784d]">
                Faculty Management
              </p>

              <div className="mt-2 flex items-center gap-3 flex-wrap">

                <h1 className="font-serif text-3xl sm:text-4xl text-stone-900">
                  Faculty
                </h1>

                <span className="px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-500">
                  {facultyMembers.length} profiles
                </span>

              </div>

              <p className="mt-3 max-w-2xl text-sm text-stone-500">
                Manage faculty profiles, department roles,
                qualifications and profile photos without
                opening the Supabase tables manually.
              </p>

            </div>

            <button
              type="button"
              onClick={openAddForm}
              className="h-11 px-5 rounded-xl bg-stone-900 text-white text-sm font-bold inline-flex items-center justify-center gap-2 hover:bg-[#c9784d] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Faculty
            </button>

          </div>

        </section>

        {/* Notice */}
        {notice && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
            {notice}
          </div>
        )}

        {/* Page Error */}
        {pageError && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-red-700">
                {pageError}
              </p>

              <button
                type="button"
                onClick={() => fetchFaculty()}
                className="shrink-0 h-9 px-4 rounded-lg bg-white border border-red-200 text-xs font-bold text-red-700 hover:bg-red-100 inline-flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Try Again
              </button>

            </div>

          </div>
        )}

        {/* Search + Refresh */}
        <section className="mb-5">

          <div className="flex flex-col sm:flex-row gap-3">

            <div className="relative flex-1">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search faculty by name, designation, department..."
                className="w-full h-11 rounded-xl border border-stone-200 bg-white pl-11 pr-4 text-sm text-stone-900 outline-none transition focus:border-[#c9784d] focus:ring-2 focus:ring-[#c9784d]/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 flex items-center justify-center"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

            </div>

            <button
              type="button"
              onClick={() => fetchFaculty(true)}
              disabled={refreshing}
              className="h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm font-semibold text-stone-600 hover:bg-stone-50 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={[
                  'w-4 h-4',
                  refreshing
                    ? 'animate-spin'
                    : '',
                ].join(' ')}
              />
              Refresh
            </button>

          </div>

        </section>

        {/* Loading */}
        {loading && (
          <div className="min-h-[300px] rounded-3xl border border-stone-200 bg-white flex items-center justify-center">

            <div className="flex items-center gap-3 text-sm text-stone-500">

              <Loader2 className="w-5 h-5 animate-spin text-[#c9784d]" />

              <span>
                Loading faculty profiles...
              </span>

            </div>

          </div>
        )}

        {/* Empty */}
        {!loading &&
          filteredFaculty.length === 0 && (
            <div className="min-h-[300px] rounded-3xl border border-stone-200 bg-white flex items-center justify-center px-6">

              <div className="text-center">

                <div className="w-14 h-14 mx-auto rounded-2xl bg-stone-100 flex items-center justify-center">
                  <UserRound className="w-6 h-6 text-stone-400" />
                </div>

                <h2 className="mt-5 text-lg font-bold text-stone-800">
                  {search
                    ? 'No faculty found'
                    : 'No faculty profiles yet'}
                </h2>

                <p className="mt-2 max-w-sm text-sm text-stone-500">
                  {search
                    ? 'Try another search term or clear the search.'
                    : 'Add your first faculty member using the button above.'}
                </p>

                {!search && (
                  <button
                    type="button"
                    onClick={openAddForm}
                    className="mt-5 h-10 px-4 rounded-xl bg-stone-900 text-white text-sm font-bold inline-flex items-center gap-2 hover:bg-[#c9784d]"
                  >
                    <Plus className="w-4 h-4" />
                    Add Faculty
                  </button>
                )}

              </div>

            </div>
          )}

        {/* Faculty list */}
        {!loading &&
          filteredFaculty.length > 0 && (
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-[0_8px_35px_rgba(45,39,35,0.04)]">

              {/* Desktop */}
              <div className="hidden lg:block overflow-x-auto">

                <table className="w-full text-left">

                  <thead>
                    <tr className="border-b border-stone-100 bg-stone-50/70">

                      <th className="px-5 py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-stone-400">
                        Faculty
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-stone-400">
                        Designation
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-stone-400">
                        Department
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-stone-400">
                        Roles
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-stone-400 text-center">
                        Order
                      </th>

                      <th className="px-5 py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-stone-400 text-right">
                        Actions
                      </th>

                    </tr>
                  </thead>

                  <tbody>
                    {filteredFaculty.map(
                      (faculty) => (
                        <FacultyRow
                          key={faculty.id}
                          faculty={faculty}
                          onEdit={openEditForm}
                          onDelete={setDeleteFaculty}
                        />
                      )
                    )}
                  </tbody>

                </table>

              </div>

              {/* Mobile / tablet */}
              <div className="lg:hidden divide-y divide-stone-100">

                {filteredFaculty.map(
                  (faculty) => (
                    <FacultyMobileCard
                      key={faculty.id}
                      faculty={faculty}
                      onEdit={openEditForm}
                      onDelete={setDeleteFaculty}
                    />
                  )
                )}

              </div>

            </div>
          )}

        {/* Search count */}
        {!loading &&
          search &&
          filteredFaculty.length > 0 && (
            <p className="mt-4 text-xs text-stone-400">
              Showing {filteredFaculty.length} of{' '}
              {facultyMembers.length} faculty profiles.
            </p>
          )}

      </main>

      {/* Delete Confirmation */}
      <DeleteFacultyModal
        faculty={deleteFaculty}
        loading={deleting}
        onCancel={() => {
          if (!deleting) {
            setDeleteFaculty(null);
          }
        }}
        onConfirm={handleDeleteFaculty}
      />

    </div>
  );
}

/* =========================================================
   DESKTOP ROW
========================================================= */

function FacultyRow({
  faculty,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b border-stone-100 last:border-0 hover:bg-stone-50/60 transition-colors">

      <td className="px-5 py-4">

        <div className="flex items-center gap-3 min-w-[250px]">

          <FacultyAvatar faculty={faculty} />

          <div className="min-w-0">

            <p className="text-sm font-semibold text-stone-800 truncate">
              {faculty.title
                ? `${faculty.title} ${faculty.name || ''}`
                : faculty.name ||
                  'Unnamed faculty'}
            </p>

            <p className="mt-0.5 text-xs text-stone-400 truncate max-w-[240px]">
              {faculty.email || 'No email'}
            </p>

          </div>

        </div>

      </td>

      <td className="px-5 py-4">

        <div className="min-w-[180px]">

          <p className="text-sm font-medium text-stone-600">
            {faculty.designation || 'Not set'}
          </p>

          {faculty.qualification && (
            <p className="mt-1 text-xs text-stone-400">
              {faculty.qualification}
            </p>
          )}

        </div>

      </td>

      <td className="px-5 py-4">

        <span className="inline-flex px-2.5 py-1 rounded-full bg-stone-100 text-[11px] font-bold text-stone-500">
          {faculty.department || 'Not set'}
        </span>

      </td>

      <td className="px-5 py-4">

        <div className="flex flex-wrap gap-1.5">

          {faculty.is_hod && (
            <span className="inline-flex px-2 py-1 rounded-full bg-[#fdf1ea] text-[10px] font-bold text-[#a95e38]">
              HOD
            </span>
          )}

          {faculty.is_tutor && (
            <span className="inline-flex px-2 py-1 rounded-full bg-stone-100 text-[10px] font-bold text-stone-600">
              Tutor
            </span>
          )}

          {!faculty.is_hod &&
            !faculty.is_tutor &&
            faculty.role && (
              <span className="inline-flex px-2 py-1 rounded-full bg-stone-100 text-[10px] font-bold text-stone-500">
                {faculty.role}
              </span>
            )}

          {!faculty.is_hod &&
            !faculty.is_tutor &&
            !faculty.role && (
              <span className="text-xs text-stone-400">
                —
              </span>
            )}

        </div>

      </td>

      <td className="px-5 py-4 text-center">

        <span className="inline-flex min-w-8 justify-center px-2 py-1 rounded-lg bg-stone-100 text-xs font-bold text-stone-500">
          {faculty.display_order ?? 0}
        </span>

      </td>

      <td className="px-5 py-4">

        <div className="flex justify-end gap-2">

          {faculty.email && (
            <a
              href={`mailto:${faculty.email}`}
              className="w-9 h-9 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:text-[#c9784d] hover:border-[#c9784d]/40 transition-colors"
              aria-label={`Email ${faculty.name}`}
            >
              <span className="text-[11px] font-bold">
                @
              </span>
            </a>
          )}

          <button
            type="button"
            onClick={() => onEdit(faculty)}
            className="w-9 h-9 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:text-[#c9784d] hover:border-[#c9784d]/40 transition-colors"
            aria-label={`Edit ${faculty.name}`}
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(faculty)}
            className="w-9 h-9 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:text-red-600 hover:border-red-200 transition-colors"
            aria-label={`Delete ${faculty.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>

        </div>

      </td>

    </tr>
  );
}

/* =========================================================
   MOBILE CARD
========================================================= */

function FacultyMobileCard({
  faculty,
  onEdit,
  onDelete,
}) {
  return (
    <div className="p-5">

      <div className="flex items-start gap-4">

        <FacultyAvatar faculty={faculty} />

        <div className="min-w-0 flex-1">

          <p className="text-sm font-bold text-stone-800">
            {faculty.title
              ? `${faculty.title} ${faculty.name || ''}`
              : faculty.name ||
                'Unnamed faculty'}
          </p>

          <p className="mt-1 text-xs text-stone-500">
            {faculty.designation ||
              'Designation not set'}
          </p>

          {faculty.department && (
            <p className="mt-1 text-xs text-stone-400">
              {faculty.department}
            </p>
          )}

        </div>

      </div>

      <div className="mt-4 flex flex-wrap gap-2">

        {faculty.is_hod && (
          <span className="inline-flex px-2.5 py-1 rounded-full bg-[#fdf1ea] text-[10px] font-bold text-[#a95e38]">
            Head of Department
          </span>
        )}

        {faculty.is_tutor && (
          <span className="inline-flex px-2.5 py-1 rounded-full bg-stone-100 text-[10px] font-bold text-stone-600">
            Tutor
          </span>
        )}

        {faculty.qualification && (
          <span className="inline-flex px-2.5 py-1 rounded-full bg-stone-100 text-[10px] font-bold text-stone-500">
            {faculty.qualification}
          </span>
        )}

      </div>

      {faculty.email && (
        <p className="mt-3 text-xs text-stone-400 truncate">
          {faculty.email}
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">

        <button
          type="button"
          onClick={() => onEdit(faculty)}
          className="h-10 rounded-xl border border-stone-200 bg-white text-xs font-bold text-stone-600 hover:bg-stone-50 inline-flex items-center justify-center gap-2"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(faculty)}
          className="h-10 rounded-xl border border-red-200 bg-red-50 text-xs font-bold text-red-600 hover:bg-red-100 inline-flex items-center justify-center gap-2"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>

      </div>

    </div>
  );
}

/* =========================================================
   AVATAR
========================================================= */

function FacultyAvatar({ faculty }) {
  const [imageFailed, setImageFailed] =
    useState(false);

  const photoUrl =
    faculty?.photo_url || '';

  const initials = getInitials(
    faculty?.name
  );

  if (!photoUrl || imageFailed) {
    return (
      <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-stone-500">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img
      src={photoUrl}
      alt={faculty?.name || 'Faculty'}
      onError={() =>
        setImageFailed(true)
      }
      className="w-12 h-12 rounded-xl object-cover border border-stone-200 bg-stone-50 shrink-0"
    />
  );
}

function getInitials(name) {
  if (!name) return 'FM';

  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 1) {
    return words[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    words[0][0] +
    words[words.length - 1][0]
  ).toUpperCase();
}

/* =========================================================
   DELETE MODAL
========================================================= */

function DeleteFacultyModal({
  faculty,
  loading,
  onCancel,
  onConfirm,
}) {
  if (!faculty) {
    return null;
  }

  const displayName = faculty.title
    ? `${faculty.title} ${faculty.name || ''}`
    : faculty.name ||
      'this faculty member';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-faculty-title"
    >

      <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white shadow-2xl overflow-hidden">

        <div className="p-6 sm:p-7">

          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>

          <h2
            id="delete-faculty-title"
            className="mt-5 text-xl font-bold text-stone-900"
          >
            Delete faculty profile?
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            You are about to permanently delete{' '}
            <span className="font-semibold text-stone-800">
              {displayName}
            </span>
            . The associated profile photo will also
            be removed from Storage.
          </p>

          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">

            <p className="text-xs leading-relaxed text-amber-800">
              This action cannot be undone.
            </p>

          </div>

        </div>

        <div className="px-6 sm:px-7 py-4 border-t border-stone-100 bg-stone-50 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="h-10 px-4 rounded-xl border border-stone-200 bg-white text-sm font-semibold text-stone-600 hover:bg-stone-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="h-10 px-4 rounded-xl bg-red-600 text-white text-sm font-bold inline-flex items-center justify-center gap-2 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Faculty
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}