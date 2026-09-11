import React from 'react';
import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from 'lucide-react';

export default function DeleteConfirmModal({
  open,
  student,
  loading = false,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-sm"
        onClick={loading ? undefined : onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-[0_25px_80px_rgba(30,25,20,0.2)] overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-6 pb-4">

          <div className="flex items-start justify-between">

            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>

            {!loading && (
              <button
                type="button"
                onClick={onCancel}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}

          </div>

          <h2 className="mt-5 font-serif text-2xl text-stone-900">
            Delete student?
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            This will permanently remove the student profile from
            the database and attempt to remove its uploaded profile
            photo from Storage.
          </p>

          {student && (
            <div className="mt-5 flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100">

              <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                {student.photo_url ? (
                  <img
                    src={student.photo_url}
                    alt={student.name || 'Student'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-stone-400">
                    —
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-stone-800 truncate">
                  {student.name || 'Unnamed student'}
                </p>

                <p className="text-[11px] text-stone-400 truncate">
                  {student.roll_number || 'No roll number'}
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Actions */}
        <div className="px-6 py-5 border-t border-stone-100 bg-stone-50 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="h-11 px-5 rounded-xl border border-stone-200 bg-white text-sm font-semibold text-stone-600 hover:bg-stone-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="h-11 px-5 rounded-xl bg-red-600 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Student
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
}