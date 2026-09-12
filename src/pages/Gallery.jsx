import React, {
  useEffect,
  useState,
} from 'react';
import { Images } from 'lucide-react';

import PageHero from '../components/PageHero';
import BookGallery from '../components/BookGallery';
import { supabase } from '../lib/supabase';

export default function Gallery() {
  const [
    gallery,
    setGallery,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState('');

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function fetchGallery() {
      setLoading(true);
      setError('');

      const {
        data,
        error: galleryError,
      } = await supabase
        .from('Gallery')
        .select(
          'id, title, description, category, image_url, display_order, created_at'
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

      if (!mounted) {
        return;
      }

      if (galleryError) {
        console.error(
          'Gallery fetch error:',
          galleryError
        );

        setGallery([]);

        setError(
          'Unable to load the department gallery right now.'
        );
      } else {
        setGallery(
          data || []
        );

        setActiveIndex(0);
      }

      setLoading(false);
    }

    fetchGallery();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * Kept so the existing Gallery page
   * state/data flow remains intact.
   */
  const selectPlate = (
    index
  ) => {
    setActiveIndex(index);

    const book =
      document.getElementById(
        'mca-sketchbook'
      );

    if (book) {
      book.dispatchEvent(
        new CustomEvent(
          'mca-sketchbook-select',
          {
            detail: {
              index,
            },
          }
        )
      );

      book.scrollIntoView({
        behavior:
          'smooth',
        block:
          'center',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#ece7dc] pb-24 text-[#2b2721]">

      <PageHero
        badge="Visual Archives"
        title="Department"
        highlight="Gallery"
        description="A visual archive of the St. Berchmans College MCA Department."
      />

      <main className="mx-auto max-w-[1240px] px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">

        <section className="relative overflow-hidden border-b border-[#2b2721]/10 pb-10">

          <div className="pointer-events-none absolute -left-16 -top-12 h-48 w-48 rounded-full bg-[#d7c8ad]/30 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">

            <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#7f766b]">
              SB College · MCA
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-none text-[#2b2721] sm:text-5xl">
              The Department Sketchbook
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#71685e]">
              A living collection of photographs from the Department
              of Computer Applications. Turn the pages to explore.
            </p>

          </div>

        </section>

        <section
          id="mca-sketchbook"
          className="relative py-12 sm:py-16"
        >
          <BookGallery
            images={gallery}
            loading={loading}
            error={error}
            onIndexChange={
              setActiveIndex
            }
          />
        </section>

      </main>
    </div>
  );
}