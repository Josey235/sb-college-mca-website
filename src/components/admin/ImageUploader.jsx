import React, { useEffect, useRef, useState } from 'react';
import {
  ImagePlus,
  Upload,
  X,
  Loader2,
  AlertCircle,
} from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
];

export default function ImageUploader({
  value,
  onChange,
  disabled = false,
}) {
  const inputRef = useRef(null);
  const objectUrlRef = useRef(null);

  const [preview, setPreview] = useState(value || '');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  /*
   * Sync preview when the parent provides a real image URL.
   *
   * IMPORTANT:
   * `undefined` means the parent currently has a newly selected
   * local file. In that case, do NOT overwrite our local object URL.
   */
  useEffect(() => {
    if (value !== undefined) {
      setPreview(value || '');
    }
  }, [value]);

  /*
   * Clean up the current local object URL when the component unmounts.
   */
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  function openFilePicker() {
    if (disabled || processing) return;

    inputRef.current?.click();
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError('');

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please choose a JPG, PNG, or WebP image.');
      event.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Image size must be 5 MB or smaller.');
      event.target.value = '';
      return;
    }

    setProcessing(true);

    /*
     * Revoke the previous local preview before creating a new one.
     */
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const objectUrl = URL.createObjectURL(file);

    objectUrlRef.current = objectUrl;

    /*
     * Set the preview first so the UI immediately reflects
     * the newly selected image.
     */
    setPreview(objectUrl);

    /*
     * Pass the actual File object to the parent.
     * StudentForm will keep this in its `photo` state.
     */
    onChange(file);

    setProcessing(false);

    /*
     * Reset the native file input so selecting the same
     * image again will still trigger onChange.
     */
    event.target.value = '';
  }

  function handleRemove() {
    if (disabled || processing) return;

    /*
     * Revoke any local object URL.
     */
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setPreview('');
    setError('');

    onChange(null);

    /*
     * Reset the input so the user can select the same
     * image again.
     */
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  const hasImage = Boolean(preview);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-5">

        {/* Preview */}
        <div className="relative shrink-0">

          <div
            className={[
              'w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden',
              'border border-stone-200 bg-stone-50',
              'flex items-center justify-center',
            ].join(' ')}
          >
            {hasImage ? (
              <img
                src={preview}
                alt="Student preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center px-3">
                <ImagePlus className="w-7 h-7 mx-auto text-stone-300" />

                <p className="mt-2 text-[10px] uppercase tracking-[0.12em] font-bold text-stone-400">
                  No photo
                </p>
              </div>
            )}
          </div>

          {hasImage && !disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
              aria-label="Remove photo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Upload controls */}
        <div className="flex-1">

          <div
            onClick={openFilePicker}
            className={[
              'min-h-32 rounded-2xl border-2 border-dashed',
              'flex flex-col items-center justify-center text-center px-5',
              'transition-colors',
              disabled || processing
                ? 'border-stone-200 bg-stone-50 cursor-not-allowed'
                : 'border-stone-200 bg-stone-50 hover:border-[#c9784d] hover:bg-[#fdf8f4] cursor-pointer',
            ].join(' ')}
          >
            {processing ? (
              <Loader2 className="w-6 h-6 text-[#c9784d] animate-spin" />
            ) : (
              <Upload className="w-6 h-6 text-stone-400" />
            )}

            <p className="mt-2 text-sm font-semibold text-stone-700">
              {processing
                ? 'Preparing image...'
                : hasImage
                  ? 'Choose a different photo'
                  : 'Upload profile photo'}
            </p>

            <p className="mt-1 text-[11px] text-stone-400">
              JPG, PNG or WebP · Maximum 5 MB
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={disabled || processing}
            className="hidden"
          />

          {error && (
            <div className="mt-3 flex items-start gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}