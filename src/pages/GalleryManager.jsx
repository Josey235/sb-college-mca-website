import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ArrowLeft,
  Edit3,
  ExternalLink,
  Image,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react';

import {
  Link,
} from 'react-router-dom';

import {
  supabase,
} from '../lib/supabase';

import GalleryForm from './GalleryForm';

const BUCKET = 'gallery-photos';

function getStoragePathFromPublicUrl(
  photoUrl
) {
  if (!photoUrl) return null;

  const marker =
    `/storage/v1/object/public/${BUCKET}/`;

  const index =
    photoUrl.indexOf(marker);

  if (index === -1) {
    return null;
  }

  const path =
    photoUrl.slice(
      index + marker.length
    );

  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

function createSafeFileName(file) {
  const originalName =
    file?.name ||
    'gallery-photo';

  const extension =
    originalName.includes('.')
      ? originalName
          .split('.')
          .pop()
          .toLowerCase()
      : 'jpg';

  const baseName =
    originalName
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60);

  return `${
    baseName || 'gallery-photo'
  }.${extension}`;
}

async function uploadGalleryPhoto(file) {
  if (!file) {
    throw new Error(
      'Please choose a photograph.'
    );
  }

  const filePath =
    `photos/${crypto.randomUUID()}-${createSafeFileName(file)}`;

  const {
    error: uploadError,
  } = await supabase.storage
    .from(BUCKET)
    .upload(
      filePath,
      file,
      {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      }
    );

  if (uploadError) {
    throw new Error(
      `Photo upload failed: ${uploadError.message}`
    );
  }

  const {
    data,
  } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  if (!data?.publicUrl) {

    await supabase.storage
      .from(BUCKET)
      .remove([filePath]);

    throw new Error(
      'The photo uploaded, but its public URL could not be generated.'
    );
  }

  return {
    path: filePath,
    url: data.publicUrl,
  };
}

async function deleteGalleryPhoto(
  photoUrl
) {
  const path =
    getStoragePathFromPublicUrl(
      photoUrl
    );

  if (!path) {
    return {
      success: false,
      skipped: true,
    };
  }

  const {
    error,
  } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) {
    console.error(
      'Gallery Storage deletion error:',
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

export default function GalleryManager() {
  const [
    items,
    setItems,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState('');

  const [
    notice,
    setNotice,
  ] = useState('');

  const [
    pageError,
    setPageError,
  ] = useState('');

  const [
    formOpen,
    setFormOpen,
  ] = useState(false);

  const [
    editingItem,
    setEditingItem,
  ] = useState(null);

  const [
    deleteItem,
    setDeleteItem,
  ] = useState(null);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  async function fetchGallery(
    showRefresh = false
  ) {
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setPageError('');

    const {
      data,
      error,
    } = await supabase
      .from('Gallery')
      .select(
        'id, created_at, title, description, category, image_url, display_order'
      )
      .order(
        'display_order',
        {
          ascending: true,
        }
      )
      .order(
        'id',
        {
          ascending: true,
        }
      );

    if (error) {
      console.error(
        'Gallery manager fetch error:',
        error
      );

      setItems([]);

      setPageError(
        `Unable to load gallery: ${error.message}`
      );
    } else {
      setItems(data || []);
    }

    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchGallery();
  }, []);

  const filteredItems =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return items;
      }

      return items.filter(
        (item) =>
          [
            item.title,
            item.description,
            item.category,
          ].some((value) =>
            String(value || '')
              .toLowerCase()
              .includes(query)
          )
      );
    }, [items, search]);

  function openAdd() {
    setEditingItem(null);
    setNotice('');
    setPageError('');
    setFormOpen(true);
  }

  function openEdit(item) {
    setEditingItem(item);
    setNotice('');
    setPageError('');
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingItem(null);
  }

  async function handleSave({
    form,
    photo,
  }) {
    setNotice('');
    setPageError('');

    let uploadedPhoto = null;

    const oldPhotoUrl =
      editingItem?.image_url ||
      null;

    try {

      /* =====================================================
         ADD
      ===================================================== */

      if (!editingItem) {

        uploadedPhoto =
          await uploadGalleryPhoto(
            photo
          );

        const {
          error,
        } = await supabase
          .from('Gallery')
          .insert({
            title: form.title,
            description:
              form.description ||
              null,
            category:
              form.category ||
              'General',
            image_url:
              uploadedPhoto.url,
            display_order:
              form.display_order,
          });

        if (error) {

          await supabase.storage
            .from(BUCKET)
            .remove([
              uploadedPhoto.path,
            ]);

          throw new Error(
            `Gallery photo could not be added: ${error.message}`
          );
        }

        closeForm();

        setNotice(
          `${form.title || 'Gallery photo'} was added successfully.`
        );

        await fetchGallery(true);

        return;
      }

      /* =====================================================
         EDIT
      ===================================================== */

      if (photo) {
        uploadedPhoto =
          await uploadGalleryPhoto(
            photo
          );
      }

      const nextPhotoUrl =
        uploadedPhoto?.url ||
        oldPhotoUrl;

      const {
        error,
      } = await supabase
        .from('Gallery')
        .update({
          title: form.title,
          description:
            form.description ||
            null,
          category:
            form.category ||
            'General',
          image_url:
            nextPhotoUrl,
          display_order:
            form.display_order,
        })
        .eq(
          'id',
          editingItem.id
        );

      if (error) {

        if (uploadedPhoto?.path) {
          await supabase.storage
            .from(BUCKET)
            .remove([
              uploadedPhoto.path,
            ]);
        }

        throw new Error(
          `Gallery photo could not be updated: ${error.message}`
        );
      }

      /* Delete old Storage image only
         after database update succeeds. */

      if (
        uploadedPhoto?.url &&
        oldPhotoUrl
      ) {

        const result =
          await deleteGalleryPhoto(
            oldPhotoUrl
          );

        if (
          !result.success &&
          !result.skipped
        ) {
          setNotice(
            `${form.title || 'Gallery photo'} was updated, but the old Storage file could not be removed.`
          );
        }
      }

      closeForm();

      setNotice(
        `${form.title || 'Gallery photo'} was updated successfully.`
      );

      await fetchGallery(true);

    } catch (error) {

      console.error(
        'Gallery save error:',
        error
      );

      throw error;
    }
  }

  async function handleDelete() {
    if (!deleteItem) {
      return;
    }

    setDeleting(true);
    setNotice('');
    setPageError('');

    try {

      const {
        error,
      } = await supabase
        .from('Gallery')
        .delete()
        .eq(
          'id',
          deleteItem.id
        );

      if (error) {
        throw new Error(
          `Gallery photo could not be deleted: ${error.message}`
        );
      }

      let storageWarning = false;

      if (deleteItem.image_url) {

        const result =
          await deleteGalleryPhoto(
            deleteItem.image_url
          );

        storageWarning =
          !result.success &&
          !result.skipped;
      }

      const deletedTitle =
        deleteItem.title ||
        'Gallery photo';

      setDeleteItem(null);

      setNotice(
        storageWarning
          ? `${deletedTitle} was deleted, but its Storage file could not be removed.`
          : `${deletedTitle} was deleted successfully.`
      );

      await fetchGallery(true);

    } catch (error) {

      console.error(
        'Gallery deletion error:',
        error
      );

      setPageError(
        error?.message ||
          'Unable to delete the gallery photograph.'
      );

    } finally {
      setDeleting(false);
    }
  }

  if (formOpen) {
    return (
      <GalleryForm
        item={editingItem}
        onSave={handleSave}
        onCancel={closeForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-stone-900">

      <header className="border-b border-stone-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex min-h-20 items-center justify-between gap-4">

            <Link
              to="/admin"
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition-colors hover:text-[#c9784d]"
            >
              <ArrowLeft className="h-4 w-4" />
              Admin Dashboard
            </Link>

            <div className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400 sm:flex">

              <Image className="h-4 w-4" />

              Gallery Manager

            </div>

          </div>

        </div>

      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        <section className="mb-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c9784d]">
                Gallery Management
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">

                <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">
                  MCA Gallery
                </h1>

                <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-bold text-stone-500">
                  {items.length} photos
                </span>

              </div>

              <p className="mt-3 max-w-2xl text-sm text-stone-500">
                Upload and arrange the photographs that become pages
                of the public digital sketchbook.
              </p>

            </div>

            <button
              type="button"
              onClick={openAdd}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-stone-900 px-5 text-sm font-bold text-white transition-colors hover:bg-[#c9784d]"
            >
              <Plus className="h-4 w-4" />
              Add Photo
            </button>

          </div>

        </section>

        {notice && (
          <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800">
            {notice}
          </div>
        )}

        {pageError && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {pageError}
          </div>
        )}

        <section className="mb-5 flex flex-col gap-3 sm:flex-row">

          <div className="relative flex-1">

            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search gallery..."
              className="h-11 w-full rounded-xl border border-stone-200 bg-white pl-11 pr-4 text-sm text-stone-900 outline-none focus:border-[#c9784d] focus:ring-2 focus:ring-[#c9784d]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch('')
                }
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}

          </div>

          <button
            type="button"
            onClick={() =>
              fetchGallery(true)
            }
            disabled={refreshing}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-600 hover:bg-stone-50 disabled:opacity-60"
          >
            <RefreshCw
              className={
                refreshing
                  ? 'h-4 w-4 animate-spin'
                  : 'h-4 w-4'
              }
            />

            Refresh
          </button>

        </section>

        {loading ? (
          <EmptyState
            loading
          />
        ) : filteredItems.length === 0 ? (
          <EmptyState
            empty
            searching={Boolean(search)}
            onAdd={openAdd}
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredItems.map(
              (item) => (
                <GalleryItem
                  key={item.id}
                  item={item}
                  onEdit={openEdit}
                  onDelete={setDeleteItem}
                />
              )
            )}

          </div>
        )}

      </main>

      {deleteItem && (
        <DeleteGalleryModal
          item={deleteItem}
          loading={deleting}
          onCancel={() => {
            if (!deleting) {
              setDeleteItem(null);
            }
          }}
          onConfirm={handleDelete}
        />
      )}

    </div>
  );
}

function GalleryItem({
  item,
  onEdit,
  onDelete,
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_8px_30px_rgba(45,39,35,0.04)]">

      <div className="aspect-[4/3] overflow-hidden bg-stone-100">

        {item.image_url ? (
          <img
            src={item.image_url}
            alt={
              item.title ||
              'Gallery photograph'
            }
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-300">
            <Image className="h-8 w-8" />
          </div>
        )}

      </div>

      <div className="p-4">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <p className="truncate text-sm font-semibold text-stone-800">
              {item.title ||
                'Untitled photograph'}
            </p>

            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c9784d]">
              {item.category ||
                'General'}
            </p>

          </div>

          <span className="shrink-0 rounded-full bg-stone-100 px-2 py-1 text-[10px] font-bold text-stone-500">
            #{item.display_order}
          </span>

        </div>

        {item.description && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-stone-500">
            {item.description}
          </p>
        )}

        <div className="mt-4 flex gap-2">

          <a
            href={item.image_url}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-500 hover:bg-stone-50"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View
          </a>

          <button
            type="button"
            onClick={() =>
              onEdit(item)
            }
            className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-500 hover:bg-[#fdf6f2] hover:text-[#c9784d]"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete(item)
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 hover:bg-red-50"
            aria-label="Delete photograph"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>

        </div>

      </div>

    </article>
  );
}

function EmptyState({
  loading = false,
  empty = false,
  searching = false,
  onAdd,
}) {
  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-stone-200 bg-white">

        <div className="text-center">

          <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#c9784d]" />

          <p className="mt-4 text-sm font-semibold text-stone-700">
            Loading gallery...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-stone-200 bg-white px-6 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100">
        <Image className="h-6 w-6 text-stone-400" />
      </div>

      <h2 className="mt-5 font-serif text-2xl text-stone-800">
        {searching
          ? 'No matching photographs'
          : 'No gallery photographs yet'}
      </h2>

      <p className="mt-2 max-w-md text-sm text-stone-500">
        {searching
          ? 'Try a different title, description or category.'
          : 'Upload your first photograph and it will become part of the digital sketchbook.'}
      </p>

      {empty && !searching && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-stone-900 px-4 text-sm font-bold text-white hover:bg-[#c9784d]"
        >
          <Plus className="h-4 w-4" />
          Add Photo
        </button>
      )}

    </div>
  );
}

function DeleteGalleryModal({
  item,
  loading,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      <div
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-sm"
        onClick={
          loading
            ? undefined
            : onCancel
        }
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_25px_80px_rgba(30,25,20,0.2)]">

        <div className="p-6">

          <div className="flex items-start justify-between">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>

            {!loading && (
              <button
                type="button"
                onClick={onCancel}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            )}

          </div>

          <h2 className="mt-5 font-serif text-2xl text-stone-900">
            Delete photograph?
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            This removes the gallery record and attempts to
            remove the associated image from Supabase Storage.
          </p>

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-stone-100 bg-stone-50 p-3">

            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-stone-200">

              {item.image_url && (
                <img
                  src={item.image_url}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}

            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-stone-800">
                {item.title ||
                  'Untitled photograph'}
              </p>

              <p className="text-xs text-stone-400">
                Order #{item.display_order}
              </p>

            </div>

          </div>

        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-stone-100 bg-stone-50 px-6 py-5 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="h-11 rounded-xl border border-stone-200 bg-white px-5 text-sm font-semibold text-stone-600 hover:bg-stone-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60"
          >

            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}

            {loading
              ? 'Deleting...'
              : 'Delete Photo'}

          </button>

        </div>

      </div>

    </div>
  );
}