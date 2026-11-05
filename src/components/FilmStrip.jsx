import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const frames = [
  "/makati/IMG_7350.webp",
  "/makati/IMG_7375.webp",
  "/makati/IMG_7385.webp",
  "/makati/IMG_7407.webp",
  "/makati/IMG_7422.webp",
  "/makati/IMG_7454.webp",
  "/makati/IMG_7523.webp",
  "/makati/IMG_7539.webp",
  "/makati/IMG_7549.webp",
  "/makati/IMG_7555.webp",
  "/makati/IMG_7567-2.webp",
  "/makati/IMG_7567.webp",
  "/makati/IMG_7576.webp",
  "/makati/IMG_7577-Edit.webp",
  "/makati/IMG_7577.webp",
  "/makati/IMG_7591.webp",
  "/makati/IMG_7598.webp",
  "/makati/IMG_7610.webp",
  "/makati/IMG_7614.webp",
  "/makati/IMG_7641.webp",
  "/makati/IMG_7647.webp",
  "/makati/IMG_7650.webp",
  "/makati/IMG_7688.webp",
  "/makati/IMG_7733.webp",
  "/makati/IMG_7811.webp",
  "/makati/IMG_7835-2.webp",
  "/makati/IMG_7855.webp",
  "/makati/IMG_7864.webp",
  "/makati/IMG_7903.webp",
  "/makati/IMG_7930.webp",
  "/makati/IMG_7952.webp",
  "/makati/IMG_7990-2.webp",
  "/makati/IMG_7990-3.webp",
  "/makati/IMG_8029.webp",
  "/makati/IMG_8042.webp",
  "/makati/IMG_8095.webp",
  "/makati/IMG_8200-Edit.webp",
  "/makati/IMG_8206.webp",
  "/makati/IMG_8234.webp",
  "/makati/IMG_8283.webp",
  "/makati/IMG_8296.webp",
  "/makati/IMG_8306.webp",
  "/makati/IMG_8319.webp",
  "/makati/IMG_8359.webp",
  "/makati/IMG_8371.webp",
  "/makati/IMG_8385.webp",
  "/makati/IMG_8394.webp",
  "/makati/IMG_8398.webp",
  "/makati/IMG_8421.webp",
  "/makati/IMG_8448.webp",
  "/makati/IMG_8453.webp",
];

export default function FilmStrip() {
  const [lightbox, setLightbox] = useState(null);

  const prev = () => setLightbox((i) => (i - 1 + frames.length) % frames.length);
  const next = () => setLightbox((i) => (i + 1) % frames.length);

  const handleKey = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setLightbox(null);
  };

  return (
    <>
      <div className="w-full overflow-hidden flex justify-center z-20 relative">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={"auto"}
          spaceBetween={0}
          loop={true}
          speed={5000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          allowTouchMove={true}
          className="px-4"
        >
          {frames.map((src, i) => (
            <SwiperSlide key={src} className="w-auto!">
              <div
                className="flex items-center bg-black px-2 py-2.5 sm:py-3 cursor-pointer"
                onClick={() => setLightbox(i)}
              >
                <div className="flex flex-col justify-between py-1.5 mr-2">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="w-2 h-2 bg-white rounded-sm opacity-80" />
                  ))}
                </div>
                <div className="w-28 h-28 sm:w-38 sm:h-38 md:w-44 md:h-44 overflow-hidden">
                  <img
                    src={src}
                    alt={`Carl & Cy Makati Prenup ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-between py-1.5 ml-2">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="w-2 h-2 bg-white rounded-sm opacity-80" />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setLightbox(null)}
          onKeyDown={handleKey}
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          {/* close */}
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close photo preview"
            style={{
              position: "absolute",
              top: 16,
              right: 20,
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 32,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>

          {/* counter */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.65)",
              fontSize: 13,
              letterSpacing: "0.1em",
            }}
          >
            {lightbox + 1} / {frames.length}
          </div>

          {/* prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            style={{
              position: "absolute",
              left: 16,
              background: "rgba(255,255,255,0.14)",
              border: "none",
              color: "#fff",
              fontSize: 28,
              cursor: "pointer",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>

          {/* image */}
          <img
            src={frames[lightbox]}
            alt={`Carl & Cy Makati Prenup ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "88vh",
              objectFit: "contain",
              borderRadius: 4,
              boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
            }}
          />

          {/* next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            style={{
              position: "absolute",
              right: 16,
              background: "rgba(255,255,255,0.14)",
              border: "none",
              color: "#fff",
              fontSize: 28,
              cursor: "pointer",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
