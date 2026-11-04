import { useState, useRef } from "react";
import {
  MapPin,
  ExternalLink,
  Clock,
  Sparkles,
  Droplets,
  Armchair,
  Heart,
  ZoomIn,
  Navigation,
  Download,
} from "lucide-react";
import ImageContainer from "./components/ImageContainer";
import Countdown from "./components/Countdown";
import WeddingHeader from "./components/WeddingHeader";
import StickyControls from "./components/StickyControls";
import Sticker from "./components/Sticker";
import Reveal from "./components/Reveal";
import FilmStrip from "./components/FilmStrip";

const CHAPEL_GMAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Don+Bosco+Chapel+on+the+Hill+Nasugbu+Batangas";
const CHAPEL_WAZE_URL =
  "https://waze.com/ul?ll=14.0574537,120.8360742&navigate=yes";
const WINDSONG_GMAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Gorio%27s+Restaurant+Tagaytay";
const GORIOS_WAZE_URL =
  "https://waze.com/ul?ll=14.1059587,120.9548174&navigate=yes";
const DIRECTIONS_GMAPS_URL =
  "https://www.google.com/maps/dir/14.0574537,120.8360742/14.1059587,120.9548174";
const MAIN_WEDDING_SITE_DRESS_CODE = "https://carlcywedding.site/#dress-code";

const REMINDERS = [
  {
    number: "01",
    tapeLabel: "Dress Code",
    title: "Dress code:",
    bodyBeforeLink:
      "Gentlemen are requested to wear a barong paired with black slacks, while ladies are invited to wear a formal dress in any of the colors indicated in ",
    linkText: "our wedding website",
    linkHref: MAIN_WEDDING_SITE_DRESS_CODE,
    bodyAfterLink:
      ". Thank you for helping us bring our wedding vision to life! ♡",
    icon: Sparkles,
    rotation: "-0.5deg",
    tapeConfig: { left: "24px", top: "-14px", rotate: "-3.5deg" },
    // Top-right corner (opposite left tape) — never overlaps text
    sticker: {
      src: "/STICKERS/36.webp",
      width: 90,
      mdWidth: 140,
      lgWidth: 165,
      top: "-38px",
      right: "-16px",
      mdRight: "-38px",
      rotate: 12,
    },
    swatches: [
      { role: "Parents", colors: ["#6c3f2e", "#734f3d", "#826652"] },
      { role: "Principal Sponsors", colors: ["#f3e0c7", "#d8c1a5"] },
      { role: "Secondary Sponsors", colors: ["#808000"] },
      {
        role: "Guests",
        colors: [
          "#cdc1ba",
          "#8f8177",
          "#d1aba6",
          "#6f3b3e",
          "#a7a376",
          "#414224",
          "#c2a35a",
          "#844f39",
        ],
      },
    ],
  },
  {
    number: "02",
    tapeLabel: "Punctuality",
    title: "Be on time:",
    body: "Kindly arrive at the ceremony venue a little early to avoid missing any part of the ceremony.",
    icon: Clock,
    rotation: "0.5deg",
    tapeConfig: { right: "24px", top: "-14px", rotate: "3.5deg" },
    // Top-left corner (opposite right tape) — never overlaps text
    sticker: {
      src: "/STICKERS/23.webp",
      width: 85,
      mdWidth: 130,
      lgWidth: 150,
      top: "-36px",
      left: "-16px",
      mdLeft: "-36px",
      rotate: -10,
    },
  },
  {
    number: "03",
    tapeLabel: "Comfort",
    title: "Stay cool and hydrated:",
    body: "With the warm weather expected around this time of year, please remember to drink plenty of water and keep cool throughout the day. We want everyone to feel comfortable and enjoy the celebration with us! ♡",
    icon: Droplets,
    rotation: "-0.4deg",
    tapeConfig: { left: "24px", top: "-14px", rotate: "-2deg" },
    // Top-right corner (opposite left tape)
    sticker: {
      src: "/STICKERS/45.webp",
      width: 85,
      mdWidth: 130,
      lgWidth: 150,
      top: "-36px",
      right: "-16px",
      mdRight: "-36px",
      rotate: 10,
    },
  },
  {
    number: "04",
    tapeLabel: "Seating",
    title: "Reserved seats:",
    body: "Please follow the seating arrangements, if applicable, and feel free to ask our coordinators for assistance.",
    icon: Armchair,
    rotation: "0.5deg",
    tapeConfig: { right: "24px", top: "-14px", rotate: "3deg" },
    // Top-left corner (opposite right tape)
    sticker: {
      src: "/STICKERS/46.webp",
      width: 85,
      mdWidth: 130,
      lgWidth: 150,
      top: "-36px",
      left: "-16px",
      mdLeft: "-36px",
      rotate: -12,
    },
  },
  {
    number: "05",
    tapeLabel: "Celebrate",
    title: "Most importantly:",
    body: "Come ready to celebrate, enjoy good company, and make beautiful memories with us!",
    icon: Heart,
    rotation: "-0.4deg",
    tapeConfig: { left: "24px", top: "-14px", rotate: "-3deg" },
    // Top-right corner (opposite left tape)
    sticker: {
      src: "/STICKERS/22.webp",
      width: 92,
      mdWidth: 140,
      lgWidth: 160,
      top: "-38px",
      right: "-16px",
      mdRight: "-36px",
      rotate: 10,
    },
  },
];

function TornBannerTitle({
  title,
  stickerSrc,
  stickerProps,
  height = 165,
  mdHeight = 210,
  lgHeight = 250,
  className = "",
}) {
  return (
    <ImageContainer
      className={className}
      height={height}
      mdHeight={mdHeight}
      lgHeight={lgHeight}
    >
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <img
          src="/images/scrapaper.webp"
          alt=""
          className="h-full w-full object-cover object-left"
          loading="lazy"
        />
        <span
          className="text-[1.6rem] sm:text-[2.1rem] md:text-[2.65rem] lg:text-[3.2rem] leading-tight text-center px-6 sm:whitespace-nowrap w-full sm:w-auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Great Vibes', cursive",
            color: "#722F37",
            pointerEvents: "none",
            textShadow: "0 1px 6px rgba(255,253,248,0.85)",
          }}
        >
          {title}
        </span>
        {stickerSrc && <Sticker src={stickerSrc} {...stickerProps} />}
      </div>
    </ImageContainer>
  );
}

export default function App() {
  const [qrZoom, setQrZoom] = useState(null);
  const mapDialog = useRef(null);

  const openGiftModal = () => {
    setQrZoom({ src: "/images/bpi.webp", label: "BPI InstaPay · Carl & Cy" });
  };

  return (
    <>
      <style>{`
        .washi-tape-pill {
          position: absolute;
          z-index: 20;
          white-space: nowrap;
          transform-origin: center center;
          padding: 4px 22px;
          font-family: 'Great Vibes', cursive;
          letter-spacing: 0.04em;
          color: #fffdf8;
          text-shadow: 0 1px 3px rgba(80,20,25,0.35);
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E"),
            linear-gradient(180deg, rgba(255,253,248,0.12) 0%, rgba(0,0,0,0.06) 100%);
          background-color: rgba(140, 60, 68, 0.85);
          background-blend-mode: overlay, normal;
          box-shadow:
            0 1px 0 rgba(255,253,248,0.18) inset,
            0 -1px 0 rgba(80,20,25,0.18) inset,
            0 3px 10px rgba(80,20,25,0.22),
            0 1px 2px rgba(80,20,25,0.14);
          border-top: 1.5px solid rgba(255,220,220,0.22);
          border-bottom: 1.5px solid rgba(80,20,25,0.28);
        }

        .scrapbook-card {
          position: relative;
          background: #fffdf8;
          box-shadow: 0 10px 36px rgba(58, 26, 30, 0.16), 0 2px 6px rgba(0,0,0,0.06);
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }
        .scrapbook-card:hover {
          box-shadow: 0 16px 48px rgba(114, 47, 55, 0.22), 0 3px 10px rgba(0,0,0,0.08);
        }

        .venue-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #722F37;
          text-decoration: none;
          border-bottom: 1.5px solid rgba(114, 47, 55, 0.45);
          padding-bottom: 2px;
          transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .venue-link:hover {
          color: #5a2029;
          border-bottom-color: #5a2029;
          transform: translateY(-1px);
        }

        .gmaps-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fffdf8;
          background: #722F37;
          border: 1.5px solid rgba(255,253,248,0.55);
          border-radius: 2px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(114,47,55,0.32);
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .gmaps-pill:hover {
          background: #5a2029;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(114,47,55,0.45);
        }

        .waze-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #722F37;
          background: #fffdf8;
          border: 1.5px solid rgba(114,47,55,0.45);
          border-radius: 2px;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(114,47,55,0.12);
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }
        .waze-pill:hover {
          background: #f6edd9;
          border-color: #722F37;
          transform: translateY(-1px);
        }
      `}</style>

      <WeddingHeader
        coupleName="Carl & Cy"
        weddingDate="November 26, 2026"
        quickActionLabel="Gift QR"
        onQuickAction={openGiftModal}
      />

      {/* =====================================================================
          SECTION 1: HERO — OUR WEDDING DAY (SCRAPBOOK POSTCARD & PIZZA COLLAGE)
      ===================================================================== */}
      <section
        id="home"
        className="relative bg-[url('/makati/IMG_8296.webp')] bg-cover bg-no-repeat bg-position-[50%_88%] lg:bg-position-[50%_58%] pt-5 sm:pt-8 md:pt-10 pb-76 sm:pb-80 md:pb-40 lg:pb-44 overflow-x-clip"
      >
        {/* Subtle top gradient so the collage & countdown pop while keeping the couple bright below */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(22, 10, 12, 0.36) 0%, rgba(22, 10, 12, 0.22) 55%, rgba(22, 10, 12, 0.05) 78%, rgba(22, 10, 12, 0.18) 100%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          {/* ── MOBILE & TABLET (< lg): FANNED PIZZA POLAROID DUO AT TOP (CLIPPED TO POSTCARD BELOW) ── */}
          <div className="lg:hidden relative w-full max-w-[360px] sm:max-w-[400px] mx-auto flex items-center justify-center pt-1">
            {/* Pressed lavender sprig peeking behind left polaroid */}
            <img
              src="/STICKERS/lavender.webp"
              alt=""
              aria-hidden="true"
              className="w-20 sm:w-24 object-contain pointer-events-none select-none absolute -top-4 left-1 -rotate-18 z-10 opacity-90 drop-shadow"
            />

            {/* Left Polaroid: Couple holding "Getting Married! ♡ 11.26.26" Pizza Box */}
            <div
              onClick={() =>
                setQrZoom({
                  src: "/makati/IMG_8448.webp",
                  label: "Getting Married! ♡ 11.26.26",
                })
              }
              role="button"
              tabIndex={0}
              className="relative bg-[#fffdf8] p-1.5 pb-4 sm:p-2 sm:pb-5 shadow-2xl cursor-zoom-in w-[47%] z-20"
              style={{
                transform: "rotate(-5.5deg) translateX(6px)",
                border: "1px solid rgba(114,47,55,0.16)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-7px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(-2deg)",
                  width: "54px",
                  height: "14px",
                  background: "rgba(140, 60, 68, 0.82)",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.18)",
                }}
              />
              <img
                src="/makati/IMG_8448.webp"
                alt="Carl and Cy holding Getting Married pizza box"
                className="w-full h-33 sm:h-38 object-cover object-top"
                fetchPriority="high"
                loading="eager"
              />
              <p
                className="text-center text-[0.95rem] sm:text-base mt-1 whitespace-nowrap"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: "#722F37",
                  lineHeight: 1,
                }}
              >
                Getting Married! ♡
              </p>
            </div>

            {/* Right Polaroid: Close-Up of "Getting Married! ♡ 11.26.26" Pizza Box & Bouquet */}
            <div
              onClick={() =>
                setQrZoom({
                  src: "/makati/IMG_8385.webp",
                  label: "Getting Married! ♡ 11.26.26",
                })
              }
              role="button"
              tabIndex={0}
              className="relative bg-[#fffdf8] p-1.5 pb-4 sm:p-2 sm:pb-5 shadow-2xl cursor-zoom-in w-[51%] z-25"
              style={{
                transform: "rotate(4.5deg) translateX(-6px) translateY(4px)",
                border: "1px solid rgba(114,47,55,0.16)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-7px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(2deg)",
                  width: "54px",
                  height: "14px",
                  background: "rgba(107, 112, 65, 0.85)",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.18)",
                }}
              />
              <img
                src="/makati/IMG_8385.webp"
                alt="Getting Married 11.26.26 pizza box close-up with bouquet"
                className="w-full h-33 sm:h-38 object-cover"
                fetchPriority="high"
                loading="eager"
              />
              <p
                className="text-center text-[0.95rem] sm:text-base mt-1 whitespace-nowrap"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: "#722F37",
                  lineHeight: 1,
                }}
              >
                Pizza &amp; Forever · 11·26·26
              </p>
            </div>
          </div>

          {/* 3-Column Desktop / Layered Mobile Scrapbook Spread */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4 mt-4 lg:mt-0">
            {/* ── LEFT WING (Desktop): Cafe Veil + Feeding Pizza Polaroids ── */}
            <div className="hidden lg:flex lg:col-span-3 flex-col items-center relative">
              {/* Pressed lavender sprig behind polaroid */}
              <img
                src="/STICKERS/lavender.webp"
                alt=""
                aria-hidden="true"
                className="w-28 object-contain pointer-events-none select-none absolute -top-10 -left-6 -rotate-18 z-10 opacity-95 drop-shadow"
              />

              {/* Top Left Polaroid: Cafe Veil */}
              <div
                onClick={() =>
                  setQrZoom({
                    src: "/makati/IMG_7555.webp",
                    label: "Carl & Cy · Makati Prenup",
                  })
                }
                role="button"
                tabIndex={0}
                className="relative bg-[#fffdf8] p-2.5 pb-7 shadow-2xl cursor-zoom-in transition-transform duration-300 hover:scale-[1.03] z-20"
                style={{
                  transform: "rotate(-5deg)",
                  border: "1px solid rgba(114,47,55,0.14)",
                }}
              >
                {/* Mini washi tape at top */}
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(-2deg)",
                    width: "76px",
                    height: "20px",
                    background: "rgba(140, 60, 68, 0.78)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                  }}
                />
                <img
                  src="/makati/IMG_7555.webp"
                  alt="Carl and Cy at cafe"
                  className="w-56 xl:w-60 h-40 object-cover"
                  fetchPriority="high"
                  loading="eager"
                />
                <p
                  className="text-center text-xl mt-1.5"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    color: "#722F37",
                    lineHeight: 1,
                  }}
                >
                  Forever starts here ♡
                </p>
              </div>

              {/* Bottom Left Overlapping Polaroid: Feeding Pizza */}
              <div
                onClick={() =>
                  setQrZoom({
                    src: "/makati/IMG_8421.webp",
                    label: "A Slice of Forever · Carl & Cy",
                  })
                }
                role="button"
                tabIndex={0}
                className="relative bg-[#fffdf8] p-2.5 pb-6 shadow-2xl cursor-zoom-in transition-transform duration-300 hover:scale-[1.03] -mt-6 ml-8 z-30"
                style={{
                  transform: "rotate(4deg)",
                  border: "1px solid rgba(114,47,55,0.14)",
                }}
              >
                <img
                  src="/makati/IMG_8421.webp"
                  alt="Cy feeding Carl pizza"
                  className="w-48 xl:w-52 h-34 object-cover"
                  loading="eager"
                />
                <p
                  className="text-center text-lg mt-1.5"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    color: "#722F37",
                    lineHeight: 1,
                  }}
                >
                  A slice of forever ♡
                </p>
              </div>
            </div>

            {/* ── CENTERPIECE: "OUR WEDDING DAY" VINTAGE POSTCARD & LOVE LETTER ── */}
            <div className="lg:col-span-6 flex justify-center relative z-30">
              <div className="relative w-full max-w-[385px] sm:max-w-[440px] md:max-w-[500px]">
                {/* C&C Monogrammed Parchment Envelope peeking from top-left behind postcard (desktop/tablet) */}
                <img
                  src="/STICKERS/envelope.webp"
                  alt=""
                  aria-hidden="true"
                  className="hidden sm:block w-40 md:w-48 object-contain pointer-events-none select-none absolute -top-9 -left-8 -rotate-12 z-0 opacity-95 drop-shadow-lg"
                />

                {/* Pressed floral sticker peeking top-right */}
                <Sticker
                  src="/STICKERS/36.webp"
                  width={76}
                  mdWidth={120}
                  top="-28px"
                  right="-10px"
                  mdRight="-18px"
                  rotate={14}
                  zIndex={10}
                />

                {/* Main Postcard / Love-Note Card */}
                <div
                  className="scrapbook-card relative z-20 px-5 py-6 sm:px-8 sm:py-8 md:px-11 md:py-10"
                  style={{
                    transform: "rotate(0.5deg)",
                    backgroundImage:
                      "radial-gradient(rgba(114,47,55,0.03) 1px, transparent 0), linear-gradient(135deg, #fffdf9 0%, #f9f1e2 100%)",
                    backgroundSize: "18px 18px, 100% 100%",
                    border: "1px solid #eadbc2",
                  }}
                >
                  {/* Realistic Metallic Silver Paperclip SVG on Top-Left Edge (clips Postcard to Polaroids on mobile!) */}
                  <svg
                    viewBox="0 0 36 90"
                    className="w-5.5 sm:w-7 md:w-8 h-auto absolute -top-5 sm:-top-6 left-6 sm:left-9 z-40 pointer-events-none drop-shadow-md"
                    fill="none"
                  >
                    <path
                      d="M10 24V66C10 73.732 16.268 80 24 80C31.732 80 38 73.732 38 66V16C38 9.92487 33.0751 5 27 5C20.9249 5 16 9.92487 16 16V60C16 63.866 19.134 67 23 67C26.866 67 30 63.866 30 60V24"
                      stroke="url(#paperclipGrad)"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="paperclipGrad" x1="10" y1="5" x2="38" y2="80" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#d8d8d8" />
                        <stop offset="45%" stopColor="#ffffff" />
                        <stop offset="70%" stopColor="#9e9e9e" />
                        <stop offset="100%" stopColor="#cccccc" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Washi tape top center */}
                  <div
                    className="washi-tape-pill text-lg sm:text-2xl md:text-[1.65rem]"
                    style={{
                      top: "-14px",
                      left: "50%",
                      transform: "translateX(-50%) rotate(-1.5deg)",
                    }}
                  >
                    November 26, 2026
                  </div>

                  {/* Outer & Inner Editorial Hairline Frames */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "7px",
                      border: "1px solid rgba(114,47,55,0.18)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: "11px",
                      border: "1px dashed rgba(114,47,55,0.12)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Vintage Postmark Cancellation Stamp in Top-Right Corner */}
                  <div
                    className="absolute top-3.5 right-3.5 sm:top-5 sm:right-6 pointer-events-none select-none opacity-30 sm:opacity-35"
                    style={{ transform: "rotate(12deg)" }}
                  >
                    <svg className="w-15 sm:w-19 h-auto" viewBox="0 0 110 64" fill="none">
                      <circle cx="32" cy="32" r="26" stroke="#722F37" strokeWidth="1.8" strokeDasharray="3 2" />
                      <circle cx="32" cy="32" r="21" stroke="#722F37" strokeWidth="1" />
                      <text
                        x="32"
                        y="28"
                        textAnchor="middle"
                        fill="#722F37"
                        fontSize="7"
                        fontFamily="Jost, sans-serif"
                        letterSpacing="1.5"
                      >
                        NOV 26
                      </text>
                      <text
                        x="32"
                        y="39"
                        textAnchor="middle"
                        fill="#722F37"
                        fontSize="7.5"
                        fontFamily="Jost, sans-serif"
                        fontWeight="bold"
                        letterSpacing="1.5"
                      >
                        2026
                      </text>
                      <path
                        d="M62 20 Q 74 15, 86 20 T 108 20 M62 28 Q 74 23, 86 28 T 108 28 M62 36 Q 74 31, 86 36 T 108 36 M62 44 Q 74 39, 86 44 T 108 44"
                        stroke="#722F37"
                        strokeWidth="1.4"
                        fill="none"
                      />
                    </svg>
                  </div>

                  <div className="text-center relative z-10 pt-1.5">
                    <p
                      className="text-[0.58rem] sm:text-xs md:text-[0.76rem] mb-1"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: 400,
                        letterSpacing: "0.26em",
                        textTransform: "uppercase",
                        color: "#6B7041",
                      }}
                    >
                      Carl &amp; Cy · Wedding Day Guide
                    </p>

                    <h1
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.45rem]"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        color: "#722F37",
                        lineHeight: 1.12,
                        textTransform: "uppercase",
                      }}
                    >
                      Our Wedding Day
                    </h1>

                    {/* Ornamental divider */}
                    <div className="flex items-center justify-center gap-2.5 my-2.5">
                      <div
                        style={{
                          height: 1,
                          width: 44,
                          background: "linear-gradient(90deg, transparent, rgba(114,47,55,0.4))",
                        }}
                      />
                      <span className="text-xs md:text-sm" style={{ color: "#6B7041" }}>
                        ✦
                      </span>
                      <div
                        style={{
                          height: 1,
                          width: 44,
                          background: "linear-gradient(90deg, rgba(114,47,55,0.4), transparent)",
                        }}
                      />
                    </div>

                    <p
                      className="text-[0.98rem] sm:text-lg md:text-xl lg:text-[1.24rem] leading-relaxed px-1"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 400,
                        color: "#3a1a1e",
                        letterSpacing: "0.01em",
                      }}
                    >
                      We are so excited to celebrate this special day with you! Here are a few
                      helpful reminders to make your journey to our wedding as smooth and
                      enjoyable as possible.
                    </p>

                    {/* Venue & Time Mini Summary Strip inside Postcard — stays on 1 clean line */}
                    <div
                      className="mt-3.5 mb-3.5 py-1.5 px-2.5 mx-auto flex items-center justify-center gap-2 sm:gap-3 text-[0.78rem] sm:text-sm whitespace-nowrap"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic",
                        color: "#722F37",
                        background: "rgba(246, 237, 217, 0.65)",
                        borderTop: "1px solid rgba(114,47,55,0.15)",
                        borderBottom: "1px solid rgba(114,47,55,0.15)",
                      }}
                    >
                      <span>1:00 PM Ceremony</span>
                      <span style={{ color: "#6B7041" }}>✦</span>
                      <span>Chapel on the Hill</span>
                      <span style={{ color: "#6B7041" }}>✦</span>
                      <span>Windsong</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                      <a
                        href="#ceremony"
                        className="gmaps-pill text-[0.6rem] sm:text-xs md:text-[0.74rem] px-3.5 py-2 sm:px-5 sm:py-2.5 whitespace-nowrap"
                      >
                        <span>✦</span> Venues &amp; Maps
                      </a>
                      <a
                        href="#reminders"
                        className="waze-pill text-[0.6rem] sm:text-xs md:text-[0.74rem] px-3.5 py-2 sm:px-5 sm:py-2.5 whitespace-nowrap"
                      >
                        Gentle Reminders
                      </a>
                    </div>
                  </div>
                </div>

                {/* C&C Burgundy Wax Seal stamped on bottom-left corner of postcard */}
                <Sticker
                  src="/STICKERS/MONOG.webp"
                  width={64}
                  mdWidth={92}
                  bottom="-22px"
                  left="-10px"
                  rotate={-8}
                  zIndex={35}
                />
              </div>
            </div>

            {/* ── RIGHT WING (Desktop): DEDICATED PIZZA BOX POLAROID COLLAGE ── */}
            <div className="hidden lg:flex lg:col-span-3 flex-col items-center relative">
              {/* Top Right Polaroid: Couple holding "Getting Married! ♡ 11.26.26" Pizza Box */}
              <div
                onClick={() =>
                  setQrZoom({
                    src: "/makati/IMG_8448.webp",
                    label: "Getting Married! ♡ 11.26.26",
                  })
                }
                role="button"
                tabIndex={0}
                className="relative bg-[#fffdf8] p-2.5 pb-7 shadow-2xl cursor-zoom-in transition-transform duration-300 hover:scale-[1.03] z-20"
                style={{
                  transform: "rotate(4.5deg)",
                  border: "1px solid rgba(114,47,55,0.14)",
                }}
              >
                {/* Mini washi tape at top */}
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(2deg)",
                    width: "82px",
                    height: "20px",
                    background: "rgba(107, 112, 65, 0.82)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                  }}
                />
                <img
                  src="/makati/IMG_8448.webp"
                  alt="Carl and Cy holding Getting Married 11.26.26 pizza box"
                  className="w-52 xl:w-56 h-56 object-cover object-top"
                  fetchPriority="high"
                  loading="eager"
                />
                <p
                  className="text-center text-xl mt-1.5"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    color: "#722F37",
                    lineHeight: 1,
                  }}
                >
                  Getting Married! ♡
                </p>
              </div>

              {/* Bottom Right Overlapping Polaroid: Close-up of "Getting Married! ♡ 11.26.26" Pizza Box & Bouquet */}
              <div
                onClick={() =>
                  setQrZoom({
                    src: "/makati/IMG_8371.webp",
                    label: "Getting Married! ♡ 11.26.26",
                  })
                }
                role="button"
                tabIndex={0}
                className="relative bg-[#fffdf8] p-2.5 pb-6 shadow-2xl cursor-zoom-in transition-transform duration-300 hover:scale-[1.03] -mt-7 -ml-6 z-30"
                style={{
                  transform: "rotate(-4deg)",
                  border: "1px solid rgba(114,47,55,0.14)",
                }}
              >
                <img
                  src="/makati/IMG_8371.webp"
                  alt="Getting Married 11.26.26 pizza box close-up with bouquet"
                  className="w-52 xl:w-56 h-38 object-cover"
                  loading="eager"
                />
                <p
                  className="text-center text-lg mt-1.5"
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    color: "#722F37",
                    lineHeight: 1,
                  }}
                >
                  Pizza &amp; Forever · 11·26·26
                </p>
              </div>
            </div>
          </div>

          {/* Countdown to Nov 26, 2026 1:00 PM */}
          <div className="mt-7 sm:mt-9 lg:mt-22">
            <Countdown targetDate="2026-11-26T13:00:00" />
          </div>
        </div>

        {/* Overlapping torn paper transition — anchored to the bottom of <section id="home"> */}
        <TornBannerTitle
          title="Ceremony & Reception"
          className="absolute -bottom-22 sm:-bottom-26 md:-bottom-30 left-0 right-0 z-20 object-cover"
          height={160}
          mdHeight={205}
          lgHeight={240}
          stickerSrc="/STICKERS/19.webp"
          stickerProps={{
            width: 170,
            mdWidth: 220,
            bottom: "-36px",
            right: "-45px",
            rotate: -20,
            zIndex: 30,
          }}
        />
      </section>

      {/* =====================================================================
          SECTION 2: THE CEREMONY & THE RECEPTION
      ===================================================================== */}
      <section
        id="ceremony"
        className="bg-[url('/makati/IMG_8029.webp')] md:bg-[url('/makati/IMG_7454.webp')] bg-cover bg-center bg-no-repeat relative z-10 pt-32 sm:pt-36 md:pt-44 pb-52 sm:pb-56 md:pb-64"
      >
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center gap-16 md:gap-20">
          {/* ── THE CEREMONY ── */}
          <Reveal animation="fade-up" className="w-full">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-7 lg:gap-12">
              {/* Same photo card as website */}
              <div className="relative">
                <a
                  href={CHAPEL_GMAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  title="Open Chapel on the Hill in Google Maps"
                  className="block transition-transform duration-300 hover:scale-[1.02]"
                >
                  <ImageContainer rotation={-2}>
                    <img
                      src="/images/chapel-h.webp"
                      alt="Chapel on the Hill — Wedding Location"
                      loading="lazy"
                      className="w-78 sm:w-94 md:w-106 lg:w-115 drop-shadow-2xl"
                    />
                  </ImageContainer>
                </a>
                <Sticker
                  src="/STICKERS/32.webp"
                  width={115}
                  mdWidth={165}
                  top="-32px"
                  left="-30px"
                  mdLeft="-55px"
                  rotate={-14}
                  zIndex={25}
                />
              </div>

              {/* Ceremony Details Scrapbook Card */}
              <div
                className="scrapbook-card w-full max-w-md md:max-w-lg px-6 py-8 sm:px-9 sm:py-9 md:px-10 md:py-10 text-center"
                style={{ transform: "rotate(0.8deg)" }}
              >
                <div
                  className="washi-tape-pill text-xl sm:text-2xl md:text-[1.65rem]"
                  style={{
                    top: "-15px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(-1.5deg)",
                  }}
                >
                  The Ceremony
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: "9px",
                    border: "1px solid rgba(114,47,55,0.12)",
                    pointerEvents: "none",
                  }}
                />

                <p
                  className="text-xs sm:text-sm md:text-[0.92rem] mb-1.5"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#6B7041",
                  }}
                >
                  THE CEREMONY
                </p>

                <p
                  className="text-xl sm:text-2xl md:text-3xl mb-3"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                    color: "#3a1a1e",
                    letterSpacing: "0.04em",
                  }}
                >
                  November 26, 2026 &nbsp;|&nbsp; 1 PM
                </p>

                <div className="flex items-center justify-center gap-2 my-3">
                  <div
                    style={{
                      height: 1,
                      width: 42,
                      background: "linear-gradient(90deg, transparent, rgba(114,47,55,0.3))",
                    }}
                  />
                  <span className="text-xs md:text-sm" style={{ color: "#722F37", opacity: 0.6 }}>
                    ✦
                  </span>
                  <div
                    style={{
                      height: 1,
                      width: 42,
                      background: "linear-gradient(90deg, rgba(114,47,55,0.3), transparent)",
                    }}
                  />
                </div>

                {/* Hyperlink to Google Maps */}
                <div className="my-2">
                  <a
                    href={CHAPEL_GMAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="venue-link text-xl sm:text-2xl md:text-3xl lg:text-[2rem]"
                  >
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 shrink-0" style={{ color: "#722F37" }} />
                    <span>Chapel on the Hill</span>
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5 shrink-0 opacity-65" />
                  </a>
                </div>

                <p
                  className="text-base sm:text-lg md:text-xl mt-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    color: "#6b5c5e",
                  }}
                >
                  Don Bosco Batulao, Nasugbu, Batangas
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={CHAPEL_GMAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="gmaps-pill text-[0.64rem] sm:text-xs md:text-[0.76rem] px-4 py-2.5 sm:px-5"
                  >
                    <MapPin size={14} />
                    Google Maps
                  </a>
                  <a
                    href={CHAPEL_WAZE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="waze-pill text-[0.64rem] sm:text-xs md:text-[0.76rem] px-4 py-2.5 sm:px-5"
                  >
                    <Navigation size={13} />
                    Open in Waze
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── THE RECEPTION ── */}
          <Reveal animation="fade-up" delay={100} className="w-full">
            <div
              id="reception"
              className="flex flex-col lg:flex-row-reverse items-center justify-center gap-7 lg:gap-12 pt-2"
            >
              {/* Same photo card as website */}
              <div className="relative">
                <a
                  href={WINDSONG_GMAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  title="Open Windsong Tagaytay in Google Maps"
                  className="block transition-transform duration-300 hover:scale-[1.02]"
                >
                  <ImageContainer rotation={2}>
                    <img
                      src="/images/windsong-t.webp"
                      alt="Windsong Tagaytay — Reception Location"
                      loading="lazy"
                      className="w-78 sm:w-94 md:w-106 lg:w-115 drop-shadow-2xl"
                    />
                  </ImageContainer>
                </a>
                <Sticker
                  src="/STICKERS/15.webp"
                  width={115}
                  mdWidth={160}
                  bottom="-34px"
                  right="-26px"
                  mdRight="-45px"
                  rotate={12}
                  zIndex={25}
                />
              </div>

              {/* Reception Details Scrapbook Card */}
              <div
                className="scrapbook-card w-full max-w-md md:max-w-lg px-6 py-8 sm:px-9 sm:py-9 md:px-10 md:py-10 text-center"
                style={{ transform: "rotate(-0.8deg)" }}
              >
                <div
                  className="washi-tape-pill text-xl sm:text-2xl md:text-[1.65rem]"
                  style={{
                    top: "-15px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(1.8deg)",
                  }}
                >
                  The Reception
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: "9px",
                    border: "1px solid rgba(114,47,55,0.12)",
                    pointerEvents: "none",
                  }}
                />

                <p
                  className="text-xs sm:text-sm md:text-[0.92rem] mb-1.5"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#6B7041",
                  }}
                >
                  THE RECEPTION
                </p>

                <p
                  className="text-xl sm:text-2xl md:text-3xl mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#3a1a1e",
                  }}
                >
                  Let&rsquo;s continue the celebration!
                </p>

                <div className="flex items-center justify-center gap-2 my-3">
                  <div
                    style={{
                      height: 1,
                      width: 42,
                      background: "linear-gradient(90deg, transparent, rgba(114,47,55,0.3))",
                    }}
                  />
                  <span className="text-xs md:text-sm" style={{ color: "#722F37", opacity: 0.6 }}>
                    ✦
                  </span>
                  <div
                    style={{
                      height: 1,
                      width: 42,
                      background: "linear-gradient(90deg, rgba(114,47,55,0.3), transparent)",
                    }}
                  />
                </div>

                {/* Hyperlink to Google Maps */}
                <div className="my-2">
                  <a
                    href={WINDSONG_GMAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="venue-link text-xl sm:text-2xl md:text-3xl lg:text-[2rem]"
                  >
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 shrink-0" style={{ color: "#722F37" }} />
                    <span>Windsong Tagaytay</span>
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5 shrink-0 opacity-65" />
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={WINDSONG_GMAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="gmaps-pill text-[0.64rem] sm:text-xs md:text-[0.76rem] px-4 py-2.5 sm:px-5"
                  >
                    <MapPin size={14} />
                    Google Maps
                  </a>
                  <a
                    href={GORIOS_WAZE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="waze-pill text-[0.64rem] sm:text-xs md:text-[0.76rem] px-4 py-2.5 sm:px-5"
                  >
                    <Navigation size={13} />
                    Waze (Pin Gorio&rsquo;s)
                  </a>
                </div>

                {/* Waze Important Note Box */}
                <div
                  className="mt-6 px-4 py-3.5 md:px-5 md:py-4 text-left"
                  style={{
                    background: "rgba(246, 237, 217, 0.7)",
                    borderLeft: "3px solid #722F37",
                    borderRadius: "2px",
                  }}
                >
                  <p
                    className="text-base sm:text-lg md:text-xl leading-relaxed"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      color: "#4a1c21",
                    }}
                  >
                    <strong
                      className="text-xs sm:text-sm md:text-[0.82rem]"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        letterSpacing: "0.16em",
                        color: "#722F37",
                      }}
                    >
                      NOTE:{" "}
                    </strong>
                    If using Waze, please pin <strong>Gorio&rsquo;s Restaurant</strong>.
                    Following the Windsong pin may lead to incorrect directions.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── CEREMONY → RECEPTION ROUTE MAP (same as main website) ── */}
          <Reveal animation="fade-up" delay={150} className="w-full max-w-4xl pt-2">
            <div className="relative shadow-2xl border-4 border-[#fffdf8]">
              <img
                src="/images/gmaps.webp"
                alt="Route map from Chapel on the Hill to Windsong Tagaytay"
                loading="lazy"
                onClick={() => mapDialog.current?.showModal()}
                className="block w-full max-h-72 object-cover cursor-pointer md:max-h-80 lg:max-h-96"
              />
              <dialog
                ref={mapDialog}
                onClick={(e) => e.currentTarget.close()}
                className="m-auto max-w-none max-h-none border-0 bg-transparent p-0 backdrop:bg-black/90"
              >
                <img
                  src="/images/gmaps.webp"
                  alt="Route map from Chapel on the Hill to Windsong Tagaytay"
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-[92vw] max-h-[88vh]"
                />
              </dialog>
              <div className="absolute bottom-4 right-4 w-1/2">
                <a
                  href={DIRECTIONS_GMAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open directions from Don Bosco Chapel on the Hill to Gorio's Restaurant in Google Maps"
                  className="block shadow-lg"
                >
                  <iframe
                    title="Directions from Don Bosco Chapel on the Hill to Gorio's Restaurant"
                    src="https://maps.google.com/maps?saddr=14.0574537,120.8360742&daddr=14.1059587,120.9548174&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={-1}
                    className="block w-full h-20 border-0 pointer-events-none md:h-28 lg:h-36"
                  />
                </a>
              </div>
            </div>
            <p
              className="mt-3 block w-fit ml-auto px-3.5 py-1.5 text-right bg-[#fffdf8]/95 shadow text-sm sm:text-base md:text-lg"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                color: "#722F37",
              }}
            >
              Windsong Tagaytay is right beside Gorio&rsquo;s Restaurant. Click the map to
              enlarge or view live directions.
            </p>
          </Reveal>
        </div>

        {/* Overlapping torn paper transition into Gentle Reminders */}
        <TornBannerTitle
          title="A Few Gentle Reminders"
          className="absolute -bottom-22 sm:-bottom-26 md:-bottom-30 left-0 right-0 z-20 object-cover"
          height={165}
          mdHeight={210}
          lgHeight={250}
          stickerSrc="/STICKERS/26.webp"
          stickerProps={{
            width: 145,
            mdWidth: 205,
            top: "-88px",
            left: "-28px",
            rotate: -10,
            zIndex: -1,
          }}
        />
      </section>

      {/* =====================================================================
          SECTION 3: A FEW GENTLE REMINDERS
      ===================================================================== */}
      <section
        id="reminders"
        className="bg-[url('/makati/IMG_7855.webp')] md:bg-[url('/makati/IMG_7350.webp')] bg-cover bg-center bg-no-repeat relative pt-32 sm:pt-36 md:pt-44 pb-48 sm:pb-52 md:pb-60 overflow-x-clip"
      >
        <div className="absolute inset-0 bg-black/22 pointer-events-none" />

        <div className="relative max-w-3xl lg:max-w-4xl mx-auto px-5 sm:px-6 md:px-8 flex flex-col gap-12 sm:gap-14 md:gap-16">
          {/* Section Subtitle Card */}
          <Reveal animation="fade-up">
            <div className="text-center mb-1">
              <p
                className="text-xs sm:text-sm md:text-base"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#fffdf8",
                  textShadow: "0 1px 6px rgba(0,0,0,0.75)",
                }}
              >
                ✦ &nbsp; Kindly Keep In Mind &nbsp; ✦
              </p>
            </div>
          </Reveal>

          {REMINDERS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.number}
                animation="fade-up"
                delay={idx * 50}
              >
                <div
                  className="scrapbook-card px-6 py-7 sm:px-8 sm:py-8 md:px-10 md:py-9"
                  style={{
                    transform: `rotate(${item.rotation})`,
                  }}
                >
                  {/* Washi tape label */}
                  <div
                    className="washi-tape-pill text-xl sm:text-2xl md:text-[1.65rem]"
                    style={{
                      top: item.tapeConfig.top,
                      left: item.tapeConfig.left,
                      right: item.tapeConfig.right,
                      transform: `rotate(${item.tapeConfig.rotate})`,
                    }}
                  >
                    {item.tapeLabel}
                  </div>

                  {/* Inner hairline frame */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "9px",
                      border: "1px solid rgba(114,47,55,0.1)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Corner flower sticker — placed on top corner opposite tape so it never overlaps text */}
                  {item.sticker && <Sticker {...item.sticker} zIndex={25} />}

                  <div className="relative z-10 flex items-start gap-4 md:gap-5 pt-2">
                    <div
                      className="hidden sm:flex items-center justify-center shrink-0 mt-1 w-11 h-11 md:w-12 md:h-12"
                      style={{
                        borderRadius: "50%",
                        background: "rgba(114,47,55,0.08)",
                        border: "1px solid rgba(114,47,55,0.22)",
                        color: "#722F37",
                      }}
                    >
                      <Icon className="w-5 h-5 md:w-5.5 md:h-5.5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline gap-2.5 flex-wrap pr-12 sm:pr-14">
                        <span
                          className="text-sm md:text-base"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            color: "#6B7041",
                            letterSpacing: "0.1em",
                          }}
                        >
                          ✦
                        </span>
                        <h3
                          className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem]"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontStyle: "italic",
                            fontWeight: 500,
                            color: "#722F37",
                            lineHeight: 1.25,
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>

                      <div
                        style={{
                          height: "1px",
                          margin: "0.65rem 0 0.85rem",
                          background:
                            "linear-gradient(to right, rgba(114,47,55,0.22), rgba(107,112,65,0.15), transparent)",
                        }}
                      />

                      <p
                        className="text-base sm:text-lg md:text-xl lg:text-[1.32rem] leading-relaxed"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 400,
                          color: "#3d1a1e",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {item.linkHref ? (
                          <>
                            {item.bodyBeforeLink}
                            <a
                              href={item.linkHref}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: "#722F37",
                                fontStyle: "italic",
                                fontWeight: 500,
                                textDecoration: "underline",
                                textDecorationColor: "rgba(114,47,55,0.45)",
                                textUnderlineOffset: "3px",
                              }}
                            >
                              {item.linkText}
                            </a>
                            {item.bodyAfterLink}
                          </>
                        ) : (
                          item.body
                        )}
                      </p>

                      {/* Color Swatches Reference inside Dress Code Card */}
                      {item.swatches && (
                        <div
                          className="mt-5 pt-4"
                          style={{
                            borderTop: "1px dashed rgba(114,47,55,0.2)",
                          }}
                        >
                          <p
                            className="text-[0.65rem] sm:text-xs md:text-sm mb-3"
                            style={{
                              fontFamily: "'Jost', sans-serif",
                              fontWeight: 400,
                              letterSpacing: "0.22em",
                              textTransform: "uppercase",
                              color: "#6B7041",
                            }}
                          >
                            Wedding Color Palette Reference
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {item.swatches.map((group) => (
                              <div
                                key={group.role}
                                className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded"
                                style={{
                                  background: "rgba(246, 237, 217, 0.55)",
                                  border: "1px solid rgba(114,47,55,0.1)",
                                }}
                              >
                                <span
                                  className="text-base sm:text-lg md:text-xl"
                                  style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontStyle: "italic",
                                    color: "#3a1a1e",
                                  }}
                                >
                                  {group.role}
                                </span>
                                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                                  {group.colors.map((hex) => (
                                    <span
                                      key={hex}
                                      title={hex}
                                      className="w-4.5 h-4.5 md:w-5 md:h-5"
                                      style={{
                                        borderRadius: "50%",
                                        backgroundColor: hex,
                                        border: "1.5px solid rgba(255,253,248,0.9)",
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                                        display: "inline-block",
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Overlapping torn paper transition into Greatest Gift */}
        <TornBannerTitle
          title="Your Presence is Our Greatest Gift"
          className="absolute -bottom-22 sm:-bottom-26 md:-bottom-30 left-0 right-0 z-20 object-cover"
          height={165}
          mdHeight={210}
          lgHeight={250}
        />
      </section>

      {/* =====================================================================
          SECTION 4: YOUR PRESENCE IS OUR GREATEST GIFT + BPI QR + SIGN-OFF
      ===================================================================== */}
      <section
        id="gift"
        className="bg-[url('/makati/IMG_8306.webp')] md:bg-[url('/makati/IMG_8206.webp')] bg-center bg-cover bg-no-repeat relative pt-32 sm:pt-36 md:pt-44 pb-24 sm:pb-28 md:pb-36 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        <div className="relative max-w-2xl lg:max-w-3xl mx-auto px-5 sm:px-6 md:px-8 z-10">
          <Reveal animation="fade-up">
            <div
              className="scrapbook-card px-6 py-10 sm:px-10 sm:py-11 md:px-14 md:py-14 text-center"
              style={{
                transform: "rotate(-0.4deg)",
              }}
            >
              {/* Washi tape top */}
              <div
                className="washi-tape-pill text-xl sm:text-2xl md:text-[1.65rem]"
                style={{
                  top: "-15px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(1.5deg)",
                }}
              >
                With Love &amp; Gratitude
              </div>

              {/* Inner hairline border */}
              <div
                style={{
                  position: "absolute",
                  inset: "10px",
                  border: "1px solid rgba(114,47,55,0.14)",
                  pointerEvents: "none",
                }}
              />

              {/* Wax Seal at top */}
              <div className="flex justify-center mb-3">
                <img
                  src="/STICKERS/MONOG.webp"
                  alt="Carl & Cy Wax Seal"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow"
                />
              </div>

              <p
                className="text-xs sm:text-sm md:text-[0.88rem] mb-1.5"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#6B7041",
                }}
              >
                A Note From The Couple
              </p>

              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.45rem]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#722F37",
                  lineHeight: 1.2,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Your Presence is Our Greatest Gift
              </h2>

              <div className="flex items-center justify-center gap-2.5 my-4">
                <div
                  style={{
                    height: 1,
                    width: 52,
                    background: "linear-gradient(90deg, transparent, rgba(114,47,55,0.35))",
                  }}
                />
                <span className="text-xs md:text-sm" style={{ color: "#6B7041" }}>
                  ✦
                </span>
                <div
                  style={{
                    height: 1,
                    width: 52,
                    background: "linear-gradient(90deg, rgba(114,47,55,0.35), transparent)",
                  }}
                />
              </div>

              <p
                className="text-base sm:text-lg md:text-xl lg:text-[1.32rem] leading-relaxed mb-4"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  color: "#3d1a1e",
                }}
              >
                Having you with us on our wedding day is already more than we could ask for.
                Your love, prayers, and presence mean the world to us, and we are so grateful
                to have you as part of our story.
              </p>

              <p
                className="text-base sm:text-lg md:text-xl lg:text-[1.32rem] leading-relaxed mb-7"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  color: "#3d1a1e",
                }}
              >
                For those who have kindly asked about giving a monetary gift, we&rsquo;ve
                included our bank and e-wallet details below simply for your convenience.
                Please know that there is absolutely no expectation to give anything beyond
                your presence and well wishes.
              </p>

              {/* BPI QR Polaroid / Stamp Frame */}
              <div className="flex flex-col items-center my-6 gap-3">
                <div
                  onClick={openGiftModal}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openGiftModal();
                  }}
                  className="group cursor-zoom-in bg-white p-4 pb-5 md:p-5 md:pb-6 shadow-lg transition-transform duration-300 hover:scale-[1.03] max-w-[260px] md:max-w-[300px]"
                  style={{
                    border: "1px solid rgba(114,47,55,0.16)",
                    transform: "rotate(1deg)",
                  }}
                >
                  <p
                    className="text-xs sm:text-sm md:text-[0.82rem] mb-2"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0.24em",
                      color: "#722F37",
                      textTransform: "uppercase",
                    }}
                  >
                    BPI InstaPay QR
                  </p>
                  <img
                    src="/images/bpi.webp"
                    alt="BPI InstaPay QR Code — Carl & Cy"
                    className="w-52 h-52 md:w-60 md:h-60 object-contain mx-auto rounded-sm"
                  />
                  <div
                    className="mt-2.5 flex items-center justify-center gap-1.5 text-sm sm:text-base md:text-lg"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      color: "#8a7070",
                    }}
                  >
                    <ZoomIn size={14} />
                    <span>Tap to enlarge QR code</span>
                  </div>
                </div>

                {/* One-tap Save QR button for mobile banking apps */}
                <a
                  href="/images/bpi.webp"
                  download="Carl-Cy-BPI-InstaPay-QR.webp"
                  className="waze-pill text-[0.64rem] sm:text-xs md:text-[0.76rem] px-4 py-2 mt-1"
                >
                  <Download size={13} />
                  Save QR Image for Mobile Banking
                </a>
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center gap-2.5 my-6">
                <div
                  style={{
                    height: 1,
                    width: 60,
                    background: "linear-gradient(90deg, transparent, rgba(107,112,65,0.4))",
                  }}
                />
                <span className="text-sm md:text-base" style={{ color: "#722F37" }}>
                  ✦
                </span>
                <div
                  style={{
                    height: 1,
                    width: 60,
                    background: "linear-gradient(90deg, rgba(107,112,65,0.4), transparent)",
                  }}
                />
              </div>

              {/* Closing Sign-off */}
              <p
                className="text-lg sm:text-xl md:text-2xl lg:text-[1.6rem] mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#6b5c5e",
                }}
              >
                With all our love and gratitude,
              </p>

              <p
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem]"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: "#722F37",
                  lineHeight: 1.15,
                  textShadow: "0 1px 4px rgba(114,47,55,0.12)",
                }}
              >
                Carl &amp; Cy ♡
              </p>

              <p
                className="text-[0.65rem] sm:text-xs md:text-sm mt-2"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 300,
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: "#6B7041",
                }}
              >
                November 26, 2026 &nbsp;·&nbsp; #CyYesToCarl
              </p>
            </div>
          </Reveal>
        </div>

        {/* Makati Prenup FilmStrip Gallery */}
        <div className="relative z-20 mt-14 sm:mt-16 md:mt-20">
          <FilmStrip />
        </div>

        <Sticker
          src="/STICKERS/33.webp"
          width={210}
          mdWidth={280}
          bottom="-90px"
          right="-70px"
          rotate={18}
          zIndex={15}
        />
        <Sticker
          src="/STICKERS/27.webp"
          width={165}
          mdWidth={205}
          bottom="-65px"
          left="-60px"
          rotate={-12}
          zIndex={15}
        />
      </section>

      {/* =====================================================================
          QR ZOOM LIGHTBOX MODAL
      ===================================================================== */}
      {qrZoom && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            background: "rgba(35, 12, 15, 0.88)",
            backdropFilter: "blur(5px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setQrZoom(null)}
        >
          <button
            onClick={() => setQrZoom(null)}
            aria-label="Close QR preview"
            style={{
              position: "absolute",
              top: 16,
              right: 22,
              background: "none",
              border: "none",
              color: "#fffdf8",
              fontSize: 34,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <div
            className="flex flex-col items-center gap-4"
            style={{ textAlign: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="text-lg sm:text-xl md:text-2xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                color: "#fffdf8",
                letterSpacing: "0.06em",
              }}
            >
              {qrZoom.label}
            </p>
            <img
              src={qrZoom.src}
              alt={qrZoom.label}
              style={{
                maxWidth: "84vw",
                maxHeight: "72vh",
                objectFit: "contain",
                borderRadius: 6,
                background: "#fff",
                padding: 14,
                boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              }}
            />
            <a
              href={qrZoom.src}
              download="Carl-Cy-BPI-InstaPay-QR.webp"
              className="gmaps-pill text-xs px-5 py-2.5"
            >
              <Download size={14} />
              Save QR Image
            </a>
          </div>
        </div>
      )}

      <StickyControls quickActionLabel="BPI Gift QR" onQuickAction={openGiftModal} />
    </>
  );
}
