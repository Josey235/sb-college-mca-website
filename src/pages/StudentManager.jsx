import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Edit3,
  ExternalLink,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { supabase } from '../lib/supabase';
import StudentForm from './StudentForm';
import DeleteConfirmModal from '../components/admin/DeleteConfirmModal';

const BUCKET = 'student-photos';

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
  const originalName = file.name || 'student-photo';

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

  return `${baseName || 'student-photo'}.${extension}`;
}

async function uploadStudentPhoto(file) {
  if (!file) return null;

  const fileName = createSafeFileName(file);
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

async function deleteStudentPhoto(photoUrl) {
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
    console.error('Storage photo deletion error:', error);

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

export default function StudentManager() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pageError, setPageError] = useState('');
  const [notice, setNotice] = useState('');

  const [search, setSearch] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [deleteStudent, setDeleteStudent] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  async function fetchStudents(showRefreshState = false) {
    if (showRefreshState) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setPageError('');

    const { data, error } = await supabase
      .from('Students')
      .select(
        'id, created_at, name, roll_number, email, phone, batch, photo_url, bio, linkedin_url, github_url'
      )
      .order('id', { ascending: true });

    if (error) {
      console.error('Student manager fetch error:', error);
      setPageError(
        'Unable to load students. Please refresh and try again.'
      );
      setStudents([]);
    } else {
      setStudents(data || []);
    }

    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return students;

    return students.filter((student) => {
      const values = [
        student.name,
        student.roll_number,
        student.email,
        student.phone,
        student.batch,
      ];

      return values.some((value) =>
        String(value || '')
          .toLowerCase()
          .includes(query)
      );
    });
  }, [students, search]);

  function openAddForm() {
    setNotice('');
    setPageError('');
    setEditingStudent(null);
    setFormOpen(true);
  }

  function openEditForm(student) {
    setNotice('');
    setPageError('');
    setEditingStudent(student);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingStudent(null);
  }

  async function handleSaveStudent({
    form,
    photo,
    removeExistingPhoto,
  }) {
    setNotice('');
    setPageError('');

    let uploadedPhoto = null;
    const oldPhotoUrl = editingStudent?.photo_url || null;

    try {
      /*
       * -------------------------------------------------------
       * ADD
       * -------------------------------------------------------
       */

      if (!editingStudent) {
        if (photo) {
          uploadedPhoto = await uploadStudentPhoto(photo);
        }

        const { error } = await supabase
          .from('Students')
          .insert({
            name: form.name,
            roll_number: form.roll_number,
            email: form.email || null,
            phone: form.phone || null,
            batch: form.batch || null,
            bio: form.bio || null,
            linkedin_url: form.linkedin_url || null,
            github_url: form.github_url || null,
            photo_url: uploadedPhoto?.url || null,
          });

        if (error) {
          if (uploadedPhoto?.path) {
            await supabase.storage
              .from(BUCKET)
              .remove([uploadedPhoto.path]);
          }

          throw new Error(
            `Student could not be added: ${error.message}`
          );
        }

        closeForm();

        setNotice(
          `${form.name} was added successfully.`
        );

        await fetchStudents(true);

        return;
      }

      /*
       * -------------------------------------------------------
       * EDIT
       * -------------------------------------------------------
       */

      if (photo) {
        uploadedPhoto = await uploadStudentPhoto(photo);
      }

      let nextPhotoUrl = oldPhotoUrl;

      if (uploadedPhoto?.url) {
        nextPhotoUrl = uploadedPhoto.url;
      }

      if (removeExistingPhoto && !uploadedPhoto) {
        nextPhotoUrl = null;
      }

      const { error } = await supabase
        .from('Students')
        .update({
          name: form.name,
          roll_number: form.roll_number,
          email: form.email || null,
          phone: form.phone || null,
          batch: form.batch || null,
          bio: form.bio || null,
          linkedin_url: form.linkedin_url || null,
          github_url: form.github_url || null,
          photo_url: nextPhotoUrl,
        })
        .eq('id', editingStudent.id);

      if (error) {
        if (uploadedPhoto?.path) {
          await supabase.storage
            .from(BUCKET)
            .remove([uploadedPhoto.path]);
        }

        throw new Error(
          `Student could not be updated: ${error.message}`
        );
      }

      /*
       * Delete old photo only AFTER database update succeeds.
       */
      if (
        oldPhotoUrl &&
        (uploadedPhoto?.url || removeExistingPhoto)
      ) {
        const result = await deleteStudentPhoto(oldPhotoUrl);

        if (
          !result.success &&
          !result.skipped
        ) {
          setNotice(
            `${form.name} was updated, but the old photo could not be removed from Storage.`
          );
        }
      }

      closeForm();

      if (
        !notice &&
        !(
          oldPhotoUrl &&
          (uploadedPhoto?.url || removeExistingPhoto)
        )
      ) {
        setNotice(
          `${form.name} was updated successfully.`
        );
      }

      await fetchStudents(true);
    } catch (error) {
      console.error('Student save error:', error);
      throw error;
    }
  }

  async function handleDeleteStudent() {
    if (!deleteStudent) return;

    setDeleting(true);
    setNotice('');
    setPageError('');

    const photoUrl = deleteStudent.photo_url;

    try {
      /*
       * Delete database row first.
       */
      const { error: databaseError } = await supabase
        .from('Students')
        .delete()
        .eq('id', deleteStudent.id);

      if (databaseError) {
        throw new Error(
          `Student could not be deleted: ${databaseError.message}`
        );
      }

      /*
       * Then remove the associated Storage image.
       */
      let storageWarning = false;

      if (photoUrl) {
        const result = await deleteStudentPhoto(photoUrl);

        if (!result.success && !result.skipped) {
          storageWarning = true;
        }
      }

      setDeleteStudent(null);

      if (storageWarning) {
        setNotice(
          `${deleteStudent.name || 'Student'} was deleted, but the old photo could not be removed from Storage.`
        );
      } else {
        setNotice(
          `${deleteStudent.name || 'Student'} was deleted successfully.`
        );
      }

      await fetchStudents(true);
    } catch (error) {
      console.error('Student deletion error:', error);

      setPageError(
        error?.message ||
          'Unable to delete the student.'
      );
    } finally {
      setDeleting(false);
    }
  }

  if (formOpen) {
    return (
      <StudentForm
        student={editingStudent}
        onSave={handleSaveStudent}
        onCancel={closeForm}
      />
    );
  }

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
              <Users className="w-4 h-4" />
              Student Manager
            </div>

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Page heading */}
        <section className="mb-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] font-bold text-[#c9784d]">
                Student Management
              </p>

              <div className="mt-2 flex items-center gap-3 flex-wrap">
                <h1 className="font-serif text-3xl sm:text-4xl text-stone-900">
                  Students
                </h1>

                <span className="px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-500">
                  {students.length} profiles
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-sm text-stone-500">
                Manage student profiles, social links and profile
                photos without opening the Supabase tables manually.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddForm}
              className="h-11 px-5 rounded-xl bg-stone-900 text-white text-sm font-bold inline-flex items-center justify-center gap-2 hover:bg-[#c9784d] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Student
            </button>

          </div>

        </section>

        {/* Notice */}
        {notice && (
          <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800">
            {notice}
          </div>
        )}

        {/* Error */}
        {pageError && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {pageError}
          </div>
        )}

        {/* Toolbar */}
        <section className="mb-5 flex flex-col sm:flex-row gap-3">

          <div className="relative flex-1">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, roll number, email or batch..."
              className="w-full h-11 rounded-xl border border-stone-200 bg-white pl-11 pr-10 text-sm text-stone-900 outline-none focus:border-[#c9784d] focus:ring-2 focus:ring-[#c9784d]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center text-stone-400 hover:bg-stone-100 hover:text-stone-700"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

          </div>

          <button
            type="button"
            onClick={() => fetchStudents(true)}
            disabled={refreshing}
            className="h-11 px-4 rounded-xl border border-stone-200 bg-white text-stone-600 text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-stone-50 disabled:opacity-60"
          >
            <RefreshCw
              className={[
                'w-4 h-4',
                refreshing ? 'animate-spin' : '',
              ].join(' ')}
            />

            Refresh
          </button>

        </section>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-3xl border border-stone-200 min-h-[320px] flex flex-col items-center justify-center">
            <Loader2 className="w-7 h-7 text-[#c9784d] animate-spin" />

            <p className="mt-4 text-sm font-semibold text-stone-600">
              Loading students...
            </p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 min-h-[320px] flex flex-col items-center justify-center text-center px-6">

            <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-stone-400" />
            </div>

            <h2 className="mt-5 font-serif text-2xl text-stone-800">
              {search
                ? 'No matching students'
                : 'No students yet'}
            </h2>

            <p className="mt-2 max-w-md text-sm text-stone-500">
              {search
                ? 'Try another name, roll number or batch.'
                : 'Add your first student using the button above.'}
            </p>

            {!search && (
              <button
                type="button"
                onClick={openAddForm}
                className="mt-5 h-10 px-4 rounded-xl bg-stone-900 text-white text-sm font-bold inline-flex items-center gap-2 hover:bg-[#c9784d]"
              >
                <Plus className="w-4 h-4" />
                Add Student
              </button>
            )}

          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-[0_8px_35px_rgba(45,39,35,0.04)]">

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">

              <table className="w-full text-left">

                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50/70">
                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-stone-400">
                      Student
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-stone-400">
                      Roll Number
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-stone-400">
                      Batch
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-stone-400">
                      Contact
                    </th>

                    <th className="px-5 py-4 text-[10px] uppercase tracking-[0.14em] font-bold text-stone-400 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => (
                    <StudentRow
                      key={student.id}
                      student={student}
                      onEdit={openEditForm}
                      onDelete={setDeleteStudent}
                    />
                  ))}
                </tbody>

              </table>

            </div>

            {/* Mobile/tablet cards */}
            <div className="lg:hidden divide-y divide-stone-100">

              {filteredStudents.map((student) => (
                <StudentMobileCard
                  key={student.id}
                  student={student}
                  onEdit={openEditForm}
                  onDelete={setDeleteStudent}
                />
              ))}

            </div>

          </div>
        )}

        {/* Search count */}
        {!loading && search && filteredStudents.length > 0 && (
          <p className="mt-4 text-xs text-stone-400">
            Showing {filteredStudents.length} of {students.length} students.
          </p>
        )}

      </main>

      <DeleteConfirmModal
        open={Boolean(deleteStudent)}
        student={deleteStudent}
        loading={deleting}
        onCancel={() => {
          if (!deleting) {
            setDeleteStudent(null);
          }
        }}
        onConfirm={handleDeleteStudent}
      />

    </div>
  );
}

function StudentRow({
  student,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b border-stone-100 last:border-0 hover:bg-stone-50/60 transition-colors">

      <td className="px-5 py-4">

        <div className="flex items-center gap-3 min-w-[230px]">

          <StudentAvatar student={student} />

          <div className="min-w-0">
            <p className="text-sm font-semibold text-stone-800 truncate">
              {student.name || 'Unnamed student'}
            </p>

            <p className="mt-0.5 text-xs text-stone-400 truncate max-w-[230px]">
              {student.email || 'No email'}
            </p>
          </div>

        </div>

      </td>

      <td className="px-5 py-4">
        <span className="text-sm font-medium text-stone-600">
          {student.roll_number || '—'}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex px-2.5 py-1 rounded-full bg-stone-100 text-[11px] font-bold text-stone-500">
          {student.batch || 'Not set'}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="text-xs text-stone-500">
          {student.phone || 'No phone'}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">

          {student.id && (
            <Link
              to={`/students/${student.id}`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-50"
              title="View profile"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}

          <button
            type="button"
            onClick={() => onEdit(student)}
            className="w-9 h-9 rounded-lg border border-stone-200 bg-white flex items-center justify-center text-stone-400 hover:text-[#c9784d] hover:bg-[#fdf6f2]"
            title="Edit student"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(student)}
            className="w-9 h-9 rounded-lg border border-red-100 bg-white flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50"
            title="Delete student"
          >
            <Trash2 className="w-4 h-4" />
          </button>

        </div>
      </td>

    </tr>
  );
}

function StudentMobileCard({
  student,
  onEdit,
  onDelete,
}) {
  return (
    <div className="p-4 sm:p-5">

      <div className="flex items-start gap-3">

        <StudentAvatar student={student} />

        <div className="flex-1 min-w-0">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-stone-800 truncate">
                {student.name || 'Unnamed student'}
              </h3>

              <p className="mt-0.5 text-xs text-stone-400 truncate">
                {student.roll_number || 'No roll number'}
              </p>
            </div>

            <span className="shrink-0 px-2.5 py-1 rounded-full bg-stone-100 text-[10px] font-bold text-stone-500">
              {student.batch || '—'}
            </span>

          </div>

          <div className="mt-3 space-y-1">

            {student.email && (
              <p className="text-xs text-stone-500 truncate">
                {student.email}
              </p>
            )}

            {student.phone && (
              <p className="text-xs text-stone-500">
                {student.phone}
              </p>
            )}

          </div>

          <div className="mt-4 flex gap-2">

            <Link
              to={`/students/${student.id}`}
              target="_blank"
              rel="noreferrer"
              className="h-9 px-3 rounded-lg border border-stone-200 text-xs font-semibold text-stone-500 inline-flex items-center gap-1.5 hover:bg-stone-50"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View
            </Link>

            <button
              type="button"
              onClick={() => onEdit(student)}
              className="h-9 px-3 rounded-lg border border-stone-200 text-xs font-semibold text-stone-500 inline-flex items-center gap-1.5 hover:bg-[#fdf6f2] hover:text-[#c9784d]"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(student)}
              className="h-9 px-3 rounded-lg border border-red-100 text-xs font-semibold text-red-500 inline-flex items-center gap-1.5 hover:bg-red-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

function StudentAvatar({ student }) {
  return (
    <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">

      {student.photo_url ? (
        <img
          src={student.photo_url}
          alt={student.name || 'Student'}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-stone-400">
          <Users className="w-5 h-5" />
        </div>
      )}

    </div>
  );
}