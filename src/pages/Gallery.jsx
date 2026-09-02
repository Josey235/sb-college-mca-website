import React from 'react';
import { Images } from 'lucide-react';

import PageHero from '../components/PageHero';
import sbCollegeImg from '../assets/images/college/sb-college.jpg';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#f8f9f8] pb-20">

      {/* =========================================================
          HERO
      ========================================================= */}
      <PageHero
        badge="Visual Archives"
        title="Department"
        highlight="Gallery"
        description="Photographs of St. Berchmans College and Department of Computer Applications."
      />

      {/* =========================================================
          GALLERY CONTENT
      ========================================================= */}
      <main className="mx-auto max-w-4xl space-y-12 px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">

        {/* Campus Image */}
        <div
          className="
            rounded-3xl
            border border-slate-200
            bg-white
            p-6
            shadow-card
          "
        >
          <div
            className="
              overflow-hidden
              rounded-2xl
              border border-slate-200
              bg-[#14110F]
              shadow-sm
            "
          >
            <img
              src={sbCollegeImg}
              alt="St. Berchmans College Campus, Changanassery"
              className="
                h-80
                w-full
                object-cover
                object-center
                sm:h-96
              "
            />
          </div>

          <div className="mt-4 text-center">

            <h3 className="font-display text-lg font-bold text-[#14110F]">
              St. Berchmans College Campus
            </h3>

            <p className="mt-0.5 text-xs text-slate-500">
              Changanassery, Kottayam District, Kerala 686101
            </p>

          </div>
        </div>


        {/* Empty State */}
        <div
          className="
            space-y-4
            rounded-3xl
            border border-slate-200
            bg-white
            p-8
            text-center
            shadow-card
          "
        >

          {/* Icon */}
          <div
            className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border border-[#C96F45]/20
              bg-[#C96F45]/10
              text-[#C96F45]
            "
          >
            <Images className="h-6 w-6" />
          </div>


          {/* Text */}
          <div className="space-y-1.5">

            <h2
              className="
                font-display
                text-xl
                font-bold
                text-[#14110F]
                sm:text-2xl
              "
            >
              MCA Gallery Will Be Updated Soon
            </h2>

            <p
              className="
                mx-auto
                max-w-md
                text-xs
                leading-relaxed
                text-slate-600
                sm:text-sm
              "
            >
              Photographs of departmental activities, lab sessions, and
              student moments for the inaugural{' '}
              <strong>Batch 2026–2028</strong> will be added here.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}