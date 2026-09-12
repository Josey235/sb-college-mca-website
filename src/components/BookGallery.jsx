import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';

const STRIP_COUNT = 18;
const SPAN = 0.449;
const BETA = 0.60;

const COMMIT_STIFFNESS = 170;
const COMMIT_DAMPING = 26;
const CANCEL_STIFFNESS = 150;
const CANCEL_DAMPING = 24;

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function getPointerX(event) {
  if (event.pointerType) {
    return event.clientX;
  }

  if (event.touches?.length) {
    return event.touches[0].clientX;
  }

  if (event.changedTouches?.length) {
    return event.changedTouches[0].clientX;
  }

  return event.clientX;
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function getImageAlt(image, fallback) {
  return (
    image?.title ||
    fallback ||
    'MCA gallery photograph'
  );
}

function PageHalf({
  position,
  image,
  shade,
}) {
  if (!image?.image_url) {
    return null;
  }

  return (
    <div
      className={`sb-half ${position}`}
      aria-hidden="true"
    >
      <img
        className={`sb-half-img ${position}`}
        src={image.image_url}
        alt=""
        draggable={false}
      />

      <div
        className={`gutter-shade ${position}`}
        style={{
          opacity: shade * 0.62,
        }}
      />
    </div>
  );
}

function CurlStrip({
  index,
  direction,
  fromUrl,
  toUrl,
  bookWidth,
  thetaTotal,
  thetaDelta,
  parent = false,
}) {
  const stripWidth = (bookWidth * SPAN) / STRIP_COUNT;
  const gutter = bookWidth * 0.5;
  const offsetA = `calc(-1 * (${gutter}px + ${index} * ${stripWidth}px))`;
  const offsetB = `calc(${index + 1} * ${stripWidth}px - ${gutter}px)`;
  const lightNear = Math.abs(Math.cos(thetaTotal - index * thetaDelta));
  const lightFar = Math.abs(Math.cos(thetaTotal - (index + 1) * thetaDelta));
  const stripVars = {
    '--strip-width': `${stripWidth}px`,
    '--strip-index': index,
    '--lit': lightNear.toFixed(3),
    '--a1': ((1 - lightNear) * 0.62).toFixed(3),
    '--a2': ((1 - lightFar) * 0.62).toFixed(3),
  };

  const children = index < STRIP_COUNT - 1 ? (
    <CurlStrip
      index={index + 1}
      direction={direction}
      fromUrl={fromUrl}
      toUrl={toUrl}
      bookWidth={bookWidth}
      thetaTotal={thetaTotal}
      thetaDelta={thetaDelta}
    />
  ) : null;

  return (
    <div
      className={`sb-strip ${parent ? 'sb-strip-root' : ''} ${
        index === STRIP_COUNT - 1 ? 'edge' : ''
      }`}
      style={stripVars}
    >
      <div
        className="sb-face front"
        style={{
          backgroundImage: `url("${fromUrl}")`,
          backgroundPositionX:
            direction === 'next' ? offsetA : offsetB,
        }}
      >
        <div className="sb-face-shadow" />
        <div className="sb-face-highlight" />
      </div>

      <div
        className="sb-face back"
        style={{
          backgroundImage: `url("${toUrl}")`,
          backgroundPositionX:
            direction === 'next' ? offsetB : offsetA,
        }}
      >
        <div className="sb-face-shadow" />
        <div className="sb-face-highlight" />
      </div>

      {children}
    </div>
  );
}

function Curl({
  direction,
  fromImage,
  toImage,
  bookWidth,
  progress,
}) {
  const theta = Math.PI * progress;
  const beta = BETA * Math.sin(Math.PI * progress);
  const thetaTotal = theta + beta;
  const thetaDelta = (2 * beta) / STRIP_COUNT;
  const degrees = 180 / Math.PI;

  const curlStyle = {
    '--bw': `${bookWidth}px`,
    '--n': STRIP_COUNT,
    '--span': SPAN,
    '--tt': `${(thetaTotal * degrees).toFixed(2)}deg`,
    '--td': `${(thetaDelta * degrees).toFixed(3)}deg`,
    '--shade': Math.sin(Math.PI * progress).toFixed(3),
  };

  return (
    <div
      className={`sb-curl ${direction === 'next' ? 'next' : 'prev'}`}
      style={curlStyle}
    >
      <CurlStrip
        index={0}
        direction={direction}
        fromUrl={fromImage.image_url}
        toUrl={toImage.image_url}
        bookWidth={bookWidth}
        thetaTotal={thetaTotal}
        thetaDelta={thetaDelta}
        parent
      />
    </div>
  );
}

function useSpringFrame() {
  const frameRef = useRef(null);
  const lastRef = useRef(0);
  const springRef = useRef(null);

  const stop = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(
        frameRef.current
      );
      frameRef.current = null;
    }

    springRef.current = null;
  }, []);

  const animate = useCallback(
    ({
      from,
      to,
      stiffness,
      damping,
      onUpdate,
      onComplete,
    }) => {
      if (frameRef.current) {
        cancelAnimationFrame(
          frameRef.current
        );
      }

      springRef.current = {
        value: from,
        velocity: 0,
        target: to,
        stiffness,
        damping,
        onUpdate,
        onComplete,
      };

      lastRef.current =
        performance.now();

      const tick = (now) => {
        const spring =
          springRef.current;

        if (!spring) {
          frameRef.current = null;
          return;
        }

        const dt = Math.min(
          0.032,
          (now - lastRef.current) /
            1000 || 0.016
        );

        lastRef.current = now;

        const distance =
          spring.value -
          spring.target;

        spring.velocity +=
          (
            -spring.stiffness *
              distance -
            spring.damping *
              spring.velocity
          ) * dt;

        spring.value +=
          spring.velocity * dt;

        spring.onUpdate(
          spring.value
        );

        if (
          Math.abs(
            spring.value -
              spring.target
          ) < 0.002 &&
          Math.abs(
            spring.velocity
          ) < 0.02
        ) {
          spring.value =
            spring.target;

          spring.onUpdate(
            spring.value
          );

          springRef.current = null;
          frameRef.current = null;

          spring.onComplete?.();

          return;
        }

        frameRef.current =
          requestAnimationFrame(
            tick
          );
      };

      frameRef.current =
        requestAnimationFrame(
          tick
        );
    },
    []
  );

  useEffect(() => {
    return stop;
  }, [stop]);

  return {
    animate,
    stop,
  };
}

export default function BookGallery({
  images = [],
  loading = false,
  error = '',
}) {
  const [
    index,
    setIndex,
  ] = useState(0);

  const [
    turn,
    setTurn,
  ] = useState(null);

  const [
    reducedMotion,
    setReducedMotion,
  ] = useState(false);

  const [
    bookSize,
    setBookSize,
  ] = useState({
    width: 0,
    height: 0,
  });

  const [
    tilt,
    setTilt,
  ] = useState({
    x: 0,
    y: 0,
  });

  const bookRef =
    useRef(null);

  const dragRef =
    useRef(null);

  const autoCommitRef =
    useRef(false);

  const { animate, stop } =
    useSpringFrame();

  useEffect(() => {
    const media =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      );

    setReducedMotion(
      media.matches
    );

    const handleChange =
      () => {
        setReducedMotion(
          media.matches
        );
      };

    media.addEventListener?.(
      'change',
      handleChange
    );

    return () => {
      media.removeEventListener?.(
        'change',
        handleChange
      );
    };
  }, []);

  useEffect(() => {
    const element =
      bookRef.current;

    if (!element) {
      return undefined;
    }

    const measure = () => {
      const rect =
        element.getBoundingClientRect();

      setBookSize({
        width: rect.width,
        height: rect.height,
      });
    };

    measure();

    const observer =
      new ResizeObserver(
        measure
      );

    observer.observe(element);

    window.addEventListener(
      'resize',
      measure
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        'resize',
        measure
      );
    };
  }, []);

  useEffect(() => {
    if (!images.length) {
      setIndex(0);
      setTurn(null);
      return;
    }

    setIndex((current) =>
      Math.min(
        current,
        images.length - 1
      )
    );
  }, [images.length]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const currentImage =
    images[index] || null;

  const previousImage =
    images[
      (index - 1 + images.length) %
        Math.max(images.length, 1)
    ] || null;

  const nextImage =
    images[
      (index + 1) %
        Math.max(images.length, 1)
    ] || null;

  const hasNext =
    images.length > 1;

  const hasPrevious =
    images.length > 1;

  const pageNumber =
    images.length
      ? `${String(index + 1).padStart(
          2,
          '0'
        )} / ${String(
          images.length
        ).padStart(2, '0')}`
      : '00 / 00';

  const startTurn =
    useCallback(
      (direction) => {
        if (
          images.length < 2 ||
          turn
        ) {
          return;
        }

        stop();

        const from =
          index;

        const to =
          direction === 'next'
            ? (
                index + 1
              ) % images.length
            : (
                index -
                1 +
                images.length
              ) % images.length;

        const fromImage =
          images[from];

        const toImage =
          images[to];

        if (
          !fromImage ||
          !toImage
        ) {
          return;
        }

        setTurn({
          direction,
          from,
          to,
          fromImage,
          toImage,
          progress: 0,
        });
      },
      [
        images,
        index,
        stop,
        turn,
      ]
    );

  const finishTurn =
    useCallback(
      (target) => {
        if (!turn) {
          return;
        }

        if (reducedMotion) {
          if (target >= 1) {
            setIndex(turn.to);
          }

          setTurn(null);
          return;
        }

        animate({
          from:
            turn.progress,
          to: target,
          stiffness:
            target >= 1
              ? COMMIT_STIFFNESS
              : CANCEL_STIFFNESS,
          damping:
            target >= 1
              ? COMMIT_DAMPING
              : CANCEL_DAMPING,
          onUpdate:
            (value) => {
              setTurn(
                (current) =>
                  current
                    ? {
                        ...current,
                        progress:
                          clamp(
                            value
                          ),
                      }
                    : current
              );
            },
          onComplete:
            () => {
              if (
                target >= 1
              ) {
                setIndex(
                  turn.to
                );
              }

              setTurn(null);
            },
        });
      },
      [
        animate,
        reducedMotion,
        turn,
      ]
    );

  const commitTurn =
    useCallback(() => {
      finishTurn(1);
    }, [finishTurn]);

  const cancelTurn =
    useCallback(() => {
      finishTurn(0);
    }, [finishTurn]);

  const step =
    useCallback(
      (direction) => {
        if (
          images.length < 2
        ) {
          return;
        }

        if (turn) {
          stop();

          setIndex(
            turn.to
          );

          setTurn(null);

          return;
        }

        autoCommitRef.current =
          true;

        startTurn(
          direction
        );
      },
      [
        images.length,
        startTurn,
        stop,
        turn,
      ]
    );

  useEffect(() => {
    if (
      !turn ||
      !autoCommitRef.current
    ) {
      return;
    }

    autoCommitRef.current =
      false;

    const frame =
      requestAnimationFrame(() => {
        finishTurn(1);
      });

    return () =>
      cancelAnimationFrame(frame);
  }, [finishTurn, turn]);

  const handlePointerDown =
    useCallback(
      (event) => {
        if (
          event.button !== 0 ||
          images.length < 2 ||
          turn
        ) {
          return;
        }

        const book =
          bookRef.current;

        if (!book) {
          return;
        }

        event.preventDefault();

        const rect =
          book.getBoundingClientRect();

        const x =
          getPointerX(event);

        const direction =
          (x - rect.left) /
            rect.width >
          0.5
            ? 'next'
            : 'prev';

        startTurn(
          direction
        );

        dragRef.current = {
          direction,
          startX: x,
          width: rect.width,
          lastProgress: 0,
          lastTime:
            performance.now(),
          velocity: 0,
          moved: 0,
        };

        try {
          event.currentTarget.setPointerCapture(
            event.pointerId
          );
        } catch {
          // Pointer capture is not available
          // in every browser/context.
        }
      },
      [
        images.length,
        startTurn,
        turn,
      ]
    );

  useEffect(() => {
    const handleMove =
      (event) => {
        const drag =
          dragRef.current;

        if (!drag) {
          return;
        }

        const x =
          getPointerX(event);

        const dx =
          x -
          drag.startX;

        drag.moved =
          Math.max(
            drag.moved,
            Math.abs(dx)
          );

        const raw =
          (
            drag.direction ===
            'next'
              ? -dx
              : dx
          ) /
          (drag.width * 0.62);

        const progress =
          clamp(raw);

        const now =
          performance.now();

        const seconds =
          Math.max(
            0.001,
            (
              now -
              drag.lastTime
            ) / 1000
          );

        drag.velocity =
          (
            progress -
            drag.lastProgress
          ) / seconds;

        drag.lastProgress =
          progress;

        drag.lastTime =
          now;

        setTurn(
          (current) =>
            current
              ? {
                  ...current,
                  progress,
                }
              : current
        );

        event.preventDefault();
      };

    const handleUp =
      () => {
        const drag =
          dragRef.current;

        if (!drag) {
          return;
        }

        dragRef.current =
          null;

        if (!turn) {
          return;
        }

        if (drag.moved < 6) {
          commitTurn();
          return;
        }

        const shouldCommit =
          turn.progress > 0.42 ||
          drag.velocity > 1.1;

        if (shouldCommit) {
          commitTurn();
        } else {
          cancelTurn();
        }
      };

    window.addEventListener(
      'pointermove',
      handleMove,
      { passive: false }
    );

    window.addEventListener(
      'pointerup',
      handleUp
    );

    window.addEventListener(
      'pointercancel',
      handleUp
    );

    return () => {
      window.removeEventListener(
        'pointermove',
        handleMove
      );

      window.removeEventListener(
        'pointerup',
        handleUp
      );

      window.removeEventListener(
        'pointercancel',
        handleUp
      );
    };
  }, [
    cancelTurn,
    commitTurn,
    turn,
  ]);

  useEffect(() => {
    const handleKeyDown =
      (event) => {
        if (
          event.key !==
            'ArrowLeft' &&
          event.key !==
            'ArrowRight'
        ) {
          return;
        }

        const target =
          event.target;

        if (
          target?.tagName ===
            'INPUT' ||
          target?.tagName ===
            'TEXTAREA' ||
          target?.isContentEditable
        ) {
          return;
        }

        event.preventDefault();

        if (turn) {
          commitTurn();
          return;
        }

        step(
          event.key ===
            'ArrowRight'
            ? 'next'
            : 'prev'
        );
      };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
  }, [
    commitTurn,
    step,
    turn,
  ]);

  const handlePointerMoveTilt =
    useCallback(
      (event) => {
        if (
          event.pointerType ===
            'touch' ||
          dragRef.current
        ) {
          return;
        }

        const book =
          bookRef.current;

        if (!book) {
          return;
        }

        const rect =
          book.getBoundingClientRect();

        const nx =
          clamp(
            (
              event.clientX -
              (
                rect.left +
                rect.width / 2
              )
            ) /
              (rect.width *
                0.62),
            -1,
            1
          );

        const ny =
          clamp(
            (
              event.clientY -
              (
                rect.top +
                rect.height / 2
              )
            ) /
              (rect.height *
                0.9),
            -1,
            1
          );

        setTilt({
          x: -ny * 4.5,
          y: nx * 7,
        });
      },
      []
    );

  const resetTilt =
    useCallback(() => {
      if (!dragRef.current) {
        setTilt({
          x: 0,
          y: 0,
        });
      }
    }, []);

  const activeProgress =
    turn?.progress || 0;

  const activeDirection =
    turn?.direction || null;

  const displayImage =
    turn?.fromImage ||
    currentImage;

  const shade =
    Math.sin(
      Math.PI *
        activeProgress
    );

  const metadataImage =
    turn &&
    activeProgress > 0.56
      ? turn.toImage
      : currentImage;

  if (loading) {
    return (
      <div className="flex min-h-[520px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#c9784d]" />

          <p className="mt-4 text-sm font-semibold text-stone-700">
            Opening the sketchbook...
          </p>

          <p className="mt-1 text-xs text-stone-400">
            Loading photographs from the MCA archive.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-red-200 bg-red-50 px-6 text-center">
        <div>
          <h2 className="font-serif text-2xl text-stone-900">
            Gallery unavailable
          </h2>

          <p className="mt-2 text-sm text-red-700">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="flex min-h-[520px] items-center justify-center rounded-3xl border border-stone-200 bg-[#eee9df] px-6 text-center">
        <div className="max-w-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-stone-400">
            MCA Visual Archive
          </p>

          <h2 className="mt-2 font-serif text-3xl text-stone-900">
            The sketchbook is empty
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-stone-500">
            Gallery photographs will appear here when they are
            uploaded through the administrator panel.
          </p>
        </div>
      </div>
    );
  }

  const hasMeasuredBook =
    bookSize.width > 0 &&
    bookSize.height > 0;

  return (
    <div
      className="sb-gallery-shell relative mx-auto w-full"
      onPointerMove={
        handlePointerMoveTilt
      }
      onPointerLeave={
        resetTilt
      }
    >
      <style>
        {`
          .sb-gallery-shell {
            --sb-paper: #eee8dc;
            --sb-ink: #2b2721;
            --sb-soft: rgba(43,39,33,.58);
            --sb-faint: rgba(43,39,33,.36);
            --sb-earth: #9a6a3e;
          }

          .sb-stage {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            position: relative;
            touch-action: pan-y;
          }

          .sb-3d {
            position: relative;
            flex: 1 1 auto;
            min-width: 0;
            width: 100%;
            max-width: 1120px;
            perspective: 1750px;
            perspective-origin: 50% 46%;
          }

          .sb-tilt {
            position: relative;
            transform-style: preserve-3d;
            transform:
              rotateX(${tilt.x.toFixed(2)}deg)
              rotateY(${tilt.y.toFixed(2)}deg);
            transition:
              transform 160ms ease-out;
            will-change: transform;
          }

          .sb-book {
            position: relative;
            width: 100%;
            aspect-ratio: 1760 / 1240;
            transform-style: preserve-3d;
            z-index: 1;
            user-select: none;
            -webkit-user-select: none;
          }

          .sb-book::before {
            content: "";
            position: absolute;
            left: 4%;
            right: 4%;
            bottom: -4%;
            height: 18%;
            border-radius: 50%;
            background:
              radial-gradient(
                50% 50% at 50% 50%,
                rgba(58,44,26,.28) 0%,
                rgba(58,44,26,.16) 42%,
                rgba(58,44,26,0) 76%
              );
            filter: blur(18px);
            opacity: ${(
              1 -
              shade * 0.42
            ).toFixed(3)};
            pointer-events: none;
            z-index: -2;
          }

          .sb-book::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 50;
            background:
              linear-gradient(
                90deg,
                transparent 0%,
                rgba(82,61,35,.07) 49.5%,
                rgba(42,30,16,.15) 50%,
                rgba(255,255,255,.10) 50.5%,
                transparent 51%
              );
            opacity: .72;
          }

          .sb-full {
            position: absolute;
            inset: 0;
            overflow: hidden;
            background: var(--sb-paper);
            box-shadow:
              0 26px 52px rgba(58,44,26,.16);
          }

          .sb-full img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            object-position: center;
            user-select: none;
            -webkit-user-drag: none;
            pointer-events: none;
          }

          .sb-full::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              linear-gradient(
                90deg,
                rgba(58,43,20,.05),
                transparent 12%,
                transparent 88%,
                rgba(58,43,20,.08)
              );
          }

          .sb-half {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 50%;
            overflow-x: clip;
            overflow-y: visible;
            z-index: 2;
          }

          .sb-half.left {
            left: 0;
          }

          .sb-half.right {
            left: 50%;
          }

          .sb-half-img {
            width: 200%;
            max-width: none;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
            user-select: none;
            -webkit-user-drag: none;
            pointer-events: none;
          }

          .sb-half-img.right {
            margin-left: -100%;
          }

          .gutter-shade {
            position: absolute;
            top: 21.8%;
            bottom: 21.8%;
            width: 46%;
            pointer-events: none;
            -webkit-mask-image:
              linear-gradient(
                180deg,
                transparent 0,
                #000 5.2%,
                #000 94.8%,
                transparent 100%
              );
            mask-image:
              linear-gradient(
                180deg,
                transparent 0,
                #000 5.2%,
                #000 94.8%,
                transparent 100%
              );
          }

          .gutter-shade.left {
            right: 0;
            background:
              linear-gradient(
                270deg,
                rgba(52,38,20,.30),
                rgba(52,38,20,0) 82%
              );
          }

          .gutter-shade.right {
            left: 0;
            background:
              linear-gradient(
                90deg,
                rgba(52,38,20,.24),
                rgba(52,38,20,0) 82%
              );
          }

          .sb-curl {
            position: absolute;
            top: 0;
            height: 100%;
            width: calc(
              var(--bw, 0px) *
              var(--span)
            );
            transform-style: preserve-3d;
            z-index: 6;
            pointer-events: none;
          }

          .sb-curl.next {
            left: 50%;
            transform-origin: left center;
            transform: rotateY(
              calc(-1 * var(--tt, 0deg))
            );
          }

          .sb-curl.prev {
            right: 50%;
            transform-origin: right center;
            transform: rotateY(var(--tt, 0deg));
          }

          .sb-strip {
            position: absolute;
            top: 0;
            height: 100%;
            width: calc(
              var(--bw, 0px) *
              var(--span) /
              var(--n)
            );
            transform-style: preserve-3d;
          }

          .sb-curl.next .sb-strip {
            transform-origin: left center;
          }

          .sb-curl.prev .sb-strip {
            transform-origin: right center;
          }

          .sb-curl.next > .sb-strip {
            left: 0;
          }

          .sb-curl.prev > .sb-strip {
            right: 0;
            left: auto;
          }

          .sb-curl.next .sb-strip .sb-strip {
            left: 100%;
            transform: rotateY(var(--td, 0deg));
          }

          .sb-curl.prev .sb-strip .sb-strip {
            right: 100%;
            transform: rotateY(calc(-1 * var(--td, 0deg)));
          }

          .sb-face {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: -1.1px;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            background-repeat: no-repeat;
            background-size: var(--bw, 0px) auto;
          }

          .sb-face.back {
            transform: rotateY(180deg);
          }

          .sb-face-shadow,
          .sb-face-highlight {
            -webkit-mask-image:
              linear-gradient(
                180deg,
                transparent 0,
                #000 5.2%,
                #000 94.8%,
                transparent 100%
              );
            mask-image:
              linear-gradient(
                180deg,
                transparent 0,
                #000 5.2%,
                #000 94.8%,
                transparent 100%
              );
          }

          .sb-strip.edge .sb-face-shadow,
          .sb-strip.edge .sb-face-highlight {
            -webkit-mask-image:
              linear-gradient(
                180deg,
                transparent 0,
                #000 9%,
                #000 91%,
                transparent 100%
              );
            mask-image:
              linear-gradient(
                180deg,
                transparent 0,
                #000 9%,
                #000 91%,
                transparent 100%
              );
          }

          .sb-face-shadow {
            position: absolute;
            left: 0;
            right: 0;
            top: 21.8%;
            bottom: 21.8%;
            pointer-events: none;
          }

          .sb-curl.next .sb-face.front .sb-face-shadow,
          .sb-curl.prev .sb-face.back .sb-face-shadow {
            background: linear-gradient(
              90deg,
              rgba(58,43,20,var(--a1, 0)),
              rgba(58,43,20,var(--a2, 0))
            );
          }

          .sb-curl.next .sb-face.back .sb-face-shadow,
          .sb-curl.prev .sb-face.front .sb-face-shadow {
            background: linear-gradient(
              90deg,
              rgba(58,43,20,var(--a2, 0)),
              rgba(58,43,20,var(--a1, 0))
            );
          }

          .sb-face-highlight {
            position: absolute;
            left: 0;
            right: 0;
            top: 21.8%;
            bottom: 21.8%;
            pointer-events: none;
            background: #fffaf0;
            opacity: calc(
              var(--shade, 0) *
              var(--lit, 1) *
              var(--lit, 1) *
              .20
            );
          }

          @media (max-width: 900px) {
            .sb-stage {
              padding-inline: 0;
            }

            .sb-3d {
              max-width: 100%;
            }

            .sb-arrow {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              z-index: 70;
            }

            .sb-arrow.left {
              left: -2px;
            }

            .sb-arrow.right {
              right: -2px;
            }
          }

          @media (max-width: 640px) {
            .sb-book {
              aspect-ratio: 1.32 / 1;
            }

            .sb-captions {
              min-height: 50px;
            }

            .sb-caption {
              font-size: 9px;
              letter-spacing: .17em;
            }

            .sb-hint {
              font-size: 8.5px;
            }

            .sb-arrow {
              width: 32px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .sb-tilt {
              transition: none;
            }

            .sb-arrow {
              transition: none;
            }
          }
        `}
      </style>

      <div className="sb-stage">
        <button
          type="button"
          className="sb-arrow left"
          aria-label="Previous page"
          disabled={
            !hasPrevious ||
            Boolean(turn)
          }
          onClick={() =>
            step('prev')
          }
        >
          <ChevronLeft
            className="h-6 w-6"
            strokeWidth={1.2}
          />
        </button>

        <div className="sb-3d">
          <div className="sb-tilt">
            <div
              ref={bookRef}
              className="sb-book"
            >
              {!turn && (
                <>
                  <div className="sb-full">
                    <img
                      src={
                        currentImage.image_url
                      }
                      alt={getImageAlt(
                        currentImage
                      )}
                    />
                  </div>

                  <div
                    className="sb-page-shadow"
                    aria-hidden="true"
                  />
                </>
              )}

              {turn && (
                <>
                  <PageHalf
                    position="left"
                    image={
                      activeDirection ===
                      'next'
                        ? turn.fromImage
                        : turn.toImage
                    }
                    shade={shade}
                  />

                  <PageHalf
                    position="right"
                    image={
                      activeDirection ===
                      'next'
                        ? turn.toImage
                        : turn.fromImage
                    }
                    shade={shade}
                  />

                  {hasMeasuredBook && (
                    <Curl
                      direction={
                        activeDirection
                      }
                      fromImage={
                        turn.fromImage
                      }
                      toImage={
                        turn.toImage
                      }
                      bookWidth={
                        bookSize.width
                      }
                      bookHeight={
                        bookSize.height
                      }
                      progress={
                        activeProgress
                      }
                    />
                  )}
                </>
              )}

              <button
                type="button"
                className="sb-zone sb-prev"
                aria-label="Previous page"
                disabled={
                  !hasPrevious ||
                  Boolean(turn)
                }
                onPointerDown={(event) =>
                  event.stopPropagation()
                }
                onClick={() =>
                  step('prev')
                }
              />

              <button
                type="button"
                className="sb-zone sb-next"
                aria-label="Next page"
                disabled={
                  !hasNext ||
                  Boolean(turn)
                }
                onPointerDown={(event) =>
                  event.stopPropagation()
                }
                onClick={() =>
                  step('next')
                }
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          className="sb-arrow right"
          aria-label="Next page"
          disabled={
            !hasNext ||
            Boolean(turn)
          }
          onClick={() =>
            step('next')
          }
        >
          <ChevronRight
            className="h-6 w-6"
            strokeWidth={1.2}
          />
        </button>
      </div>

      <div className="sb-captions">
        <p
          className="sb-caption"
          style={{
            opacity:
              turn
                ? Math.max(
                    0,
                    1 -
                      Math.max(
                        0,
                        Math.min(
                          1,
                          (
                            activeProgress -
                            0.10
                          ) / 0.28
                        )
                      )
                  )
                : 1,
          }}
        >
          {displayImage?.title ||
            'MCA Visual Archive'}
        </p>

        {turn && (
          <p
            className="sb-caption"
            style={{
              opacity:
                Math.max(
                  0,
                  Math.min(
                    1,
                    (
                      activeProgress -
                      0.56
                    ) / 0.30
                  )
                ),
            }}
          >
            {turn.toImage?.title ||
              'MCA Visual Archive'}
          </p>
        )}
      </div>

      <p className="sb-meta">
        {pageNumber}
        {' · '}
        {metadataImage?.category ||
          'MCA Visual Archives'}
      </p>

      <p className="sb-hint">
        Drag the page to turn · click the arrows · use ← →
      </p>

      {metadataImage && (
        <div className="mx-auto mt-6 max-w-2xl text-center">
          {metadataImage.category && (
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c9784d]">
              {metadataImage.category}
            </p>
          )}

          {metadataImage.title && (
            <h3 className="mt-2 font-serif text-2xl text-stone-900">
              {metadataImage.title}
            </h3>
          )}

          {metadataImage.description && (
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              {metadataImage.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
