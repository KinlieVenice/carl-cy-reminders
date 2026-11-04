import { useState, useRef } from "react";
import { MapPin, ExternalLink, Clock, Sparkles, Droplets, Armchair, Heart, ZoomIn } from "lucide-react";
import ImageContainer from "./components/ImageContainer";
import Countdown from "./components/Countdown";
import WeddingHeader from "./components/WeddingHeader";
import StickyControls from "./components/StickyControls";
import Sticker from "./components/Sticker";
import Reveal from "./components/Reveal";

const CHAPEL_GMAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Don+Bosco+Chapel+on+the+Hill+Nasugbu+Batangas";
const WINDSONG_GMAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Gorio%27s+Restaurant+Tagaytay";
const DIRECTIONS_GMAPS_URL =
  "https://www.google.com/maps/dir/14.0574537,120.8360742/14.1059587,120.9548174";

const REMINDERS = [
  {
    number: "01",
    tapeLabel: "Dress Code",
    title: "Dress code:",
    body: "Gentlemen are requested to wear a barong paired with black slacks, while ladies are invited to wear a formal dress in any of the colors indicated in our wedding website. Thank you for helping us bring our wedding vision to life! ♡",
    icon: Sparkles,
    rotation: "-0.7deg",
    tapeConfig: { left: "26px", top: "-14px", rotate: "-4deg" },
    sticker: {
      src: "/STICKERS/36.webp",
      width: 135,
      mdWidth: 175,
      lgWidth: 195,
      top: "-55px",
      right: "-45px",
      mdRight: "-55px",
      rotate: 12,
    },
    swatches: [
      { role: "Parents", colors: ["#6c3f2e", "#734f3d", "#826652"] },
      { role: "Principal Sponsors", colors: ["#f3e0c7", "#d8c1a5"] },
      { role: "Secondary Sponsors", colors: ["#808000"] },
      {
        role: "Guests",
        colors: ["#cdc1ba", "#8f8177", "#d1aba6", "#6f3b3e", "#a7a376", "#414224", "#c2a35a", "#844f39"],
      },
    ],
  },
  {
    number: "02",
    tapeLabel: "Punctuality",
    title: "Be on time:",
    body: "Kindly arrive at the ceremony venue a little early to avoid missing any part of the ceremony.",
    icon: Clock,
    rotation: "0.6deg",
    tapeConfig: { right: "28px", top: "-14px", rotate: "4deg" },
    sticker: {
      src: "/STICKERS/23.webp",
      width: 130,
      mdWidth: 165,
      lgWidth: 185,
      bottom: "-55px",
      left: "-45px",
      mdLeft: "-60px",
      rotate: -10,
    },
  },
  {
    number: "03",
    tapeLabel: "Comfort",
    title: "Stay cool and hydrated:",
    body: "With the warm weather expected around this time of year, please remember to drink plenty of water and keep cool throughout the day. We want everyone to feel comfortable and enjoy the celebration with us! ♡",
    icon: Droplets,
    rotation: "-0.5deg",
    tapeConfig: { left: "calc(50% - 60px)", top: "-14px", rotate: "-1.5deg" },
    sticker: {
      src: "/STICKERS/45.webp",
      width: 125,
      mdWidth: 160,
      lgWidth: 175,
      top: "-50px",
      right: "-45px",
      mdRight: "-55px",
      rotate: 10,
    },
  },
  {
    number: "04",
    tapeLabel: "Seating",
    title: "Reserved seats:",
    body: "Please follow the seating arrangements, if applicable, and feel free to ask our coordinators for assistance.",
    icon: Armchair,
    rotation: "0.7deg",
    tapeConfig: { left: "30px", top: "-14px", rotate: "-5deg" },
    sticker: {
      src: "/STICKERS/46.webp",
      width: 125,
      mdWidth: 160,
      lgWidth: 175,
      bottom: "-50px",
      right: "-42px",
      mdRight: "-52px",
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
    tapeConfig: { right: "32px", top: "-14px", rotate: "3.5deg" },
    sticker: {
      src: "/STICKERS/22.webp",
      width: 140,
      mdWidth: 180,
      lgWidth: 200,
      bottom: "-55px",
      left: "-45px",
      mdLeft: "-55px",
      rotate: 8,
    },
  },
];

function TornBannerTitle({
  title,
  stickerSrc,
  stickerProps,
  height = 175,
  mdHeight = 215,
  lgHeight = 255,
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
          gap: 7px;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          letter-spacing: 0.2em;
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
      `}</style>

      <WeddingHeader
        coupleName="Carl & Cy"
        weddingDate="November 26, 2026"
        quickActionLabel="Gift QR"
        onQuickAction={openGiftModal}
      />

      {/* =====================================================================
          SECTION 1: HERO — OUR WEDDING DAY
      ===================================================================== */}
      <section
        id="home"
        className="relative bg-[url('/images/banner_bg_sm.webp')] md:bg-[url('/images/banner_bg.webp')] bg-cover bg-no-repeat bg-position-[55%_55%] pt-8 md:pt-14 pb-44 sm:pb-48 md:pb-56 lg:pb-64"
      >
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center px-4 sm:px-6">
          <Reveal
            animation="fade-up"
            className="flex flex-col items-center md:flex-row md:items-center md:justify-center gap-8 md:gap-4 max-w-5xl w-full"
          >
            {/* Left: Tilted Polaroid Photo with Wax Seal */}
            <div className="relative flex justify-center">
              <div className="relative">
                <ImageContainer height={200} mdHeight={260} lgHeight={310} rotation={-4}>
                  <img
                    src="/images/banner_pic.webp"
                    alt="Carl and Cy"
                    className="h-full object-cover shadow-2xl"
                    fetchPriority="high"
                    loading="eager"
                  />
                </ImageContainer>
                <Sticker
                  src="/STICKERS/MONOG.webp"
                  width={84}
                  mdWidth={102}
                  lgWidth={116}
                  bottom="-30px"
                  left="-16px"
                  rotate={-8}
                  zIndex={30}
                />
              </div>
            </div>

            {/* Right: "OUR WEDDING DAY" Love-Letter Note Card */}
            <div className="relative w-full max-w-[420px] md:max-w-[460px] lg:max-w-[510px] md:ml-[-12px] z-20">
              <div
                className="scrapbook-card px-6 py-7 sm:px-8 sm:py-8 md:px-9 md:py-9"
                style={{
                  transform: "rotate(1.5deg)",
                  border: "1px solid #f6edd9",
                }}
              >
                {/* Washi tape top */}
                <div
                  className="washi-tape-pill text-xl sm:text-2xl md:text-[1.6rem]"
                  style={{
                    top: "-15px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(-2deg)",
                  }}
                >
                  November 26, 2026
                </div>

                {/* Inner decorative hairline border */}
                <div
                  style={{
                    position: "absolute",
                    inset: "9px",
                    border: "1px solid rgba(114,47,55,0.14)",
                    pointerEvents: "none",
                  }}
                />

                <div className="text-center relative z-10 pt-1">
                  <p
                    className="text-[0.62rem] sm:text-xs md:text-[0.8rem] mb-1.5"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#6B7041",
                    }}
                  >
                    Wedding Day Guide &amp; Reminders
                  </p>

                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      letterSpacing: "0.06em",
                      color: "#722F37",
                      lineHeight: 1.15,
                      textTransform: "uppercase",
                    }}
                  >
                    Our Wedding Day
                  </h1>

                  {/* Ornamental divider */}
                  <div className="flex items-center justify-center gap-2.5 my-3">
                    <div
                      style={{
                        height: 1,
                        width: 48,
                        background: "linear-gradient(90deg, transparent, rgba(114,47,55,0.35))",
                      }}
                    />
                    <span className="text-xs md:text-sm" style={{ color: "#6B7041" }}>
                      ✦
                    </span>
                    <div
                      style={{
                        height: 1,
                        width: 48,
                        background: "linear-gradient(90deg, rgba(114,47,55,0.35), transparent)",
                      }}
                    />
                  </div>

                  <p
                    className="text-base sm:text-lg md:text-xl lg:text-[1.28rem] leading-relaxed"
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

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href="#ceremony"
                      className="gmaps-pill text-[0.65rem] sm:text-xs md:text-[0.78rem] px-4 py-2 sm:px-5 sm:py-2.5"
                    >
                      <span>✦</span> View Venues &amp; Reminders
                    </a>
                  </div>
                </div>
              </div>

              <Sticker
                src="/STICKERS/envelope-stamp.webp"
                width={84}
                mdWidth={96}
                bottom="-30px"
                right="-16px"
                rotate={14}
                zIndex={30}
              />
            </div>
          </Reveal>

          {/* Countdown to Nov 26, 2026 1:00 PM — given generous vertical space so nothing overlaps it */}
          <div className="mt-14 sm:mt-16 md:mt-20">
            <Countdown targetDate="2026-11-26T13:00:00" />
          </div>
        </div>

        {/* Overlapping torn paper transition — anchored to the bottom of <section id="home"> */}
        <TornBannerTitle
          title="Ceremony & Reception"
          className="absolute -bottom-24 sm:-bottom-28 md:-bottom-32 left-0 right-0 z-20 object-cover"
          height={165}
          mdHeight={210}
          lgHeight={245}
          stickerSrc="/STICKERS/19.webp"
          stickerProps={{
            width: 190,
            mdWidth: 230,
            bottom: "-40px",
            right: "-55px",
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
        className="bg-[url('/images/banner5cp.webp')] bg-cover md:bg-center bg-bottom bg-no-repeat bg-[position:60%_50%] relative z-10 pt-28 sm:pt-32 md:pt-40 pb-44 sm:pb-48 md:pb-56"
      >
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center gap-16 md:gap-20">
          {/* ── THE CEREMONY ── */}
          <Reveal animation="fade-up" className="w-full">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
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
                      className="w-80 sm:w-96 md:w-108 lg:w-115 drop-shadow-2xl"
                    />
                  </ImageContainer>
                </a>
                <Sticker
                  src="/STICKERS/32.webp"
                  width={160}
                  mdWidth={195}
                  top="-40px"
                  left="-65px"
                  rotate={-14}
                  zIndex={25}
                />
              </div>

              {/* Ceremony Details Scrapbook Card */}
              <div
                className="scrapbook-card w-full max-w-md md:max-w-lg px-7 py-8 sm:px-9 sm:py-9 md:px-10 md:py-10 text-center"
                style={{ transform: "rotate(1deg)" }}
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

                <div className="flex items-center justify-center gap-2 my-3.5">
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
                    <span>CHAPEL ON THE HILL</span>
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5 shrink-0 opacity-65" />
                  </a>
                </div>

                <p
                  className="text-base sm:text-lg md:text-xl mt-1.5"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    color: "#6b5c5e",
                  }}
                >
                  Don Bosco Batulao, Nasugbu, Batangas
                </p>

                <div className="mt-5">
                  <a
                    href={CHAPEL_GMAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="gmaps-pill text-[0.65rem] sm:text-xs md:text-[0.78rem] px-4 py-2 sm:px-5 sm:py-2.5"
                  >
                    <MapPin size={14} />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── THE RECEPTION ── */}
          <Reveal animation="fade-up" delay={100} className="w-full">
            <div
              id="reception"
              className="flex flex-col lg:flex-row-reverse items-center justify-center gap-8 lg:gap-12 pt-4"
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
                      className="w-80 sm:w-96 md:w-108 lg:w-115 drop-shadow-2xl"
                    />
                  </ImageContainer>
                </a>
                <Sticker
                  src="/STICKERS/15.webp"
                  width={155}
                  mdWidth={185}
                  bottom="-50px"
                  right="-55px"
                  rotate={12}
                  zIndex={25}
                />
              </div>

              {/* Reception Details Scrapbook Card */}
              <div
                className="scrapbook-card w-full max-w-md md:max-w-lg px-7 py-8 sm:px-9 sm:py-9 md:px-10 md:py-10 text-center"
                style={{ transform: "rotate(-1deg)" }}
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

                <div className="flex items-center justify-center gap-2 my-3.5">
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

                <div className="mt-4">
                  <a
                    href={WINDSONG_GMAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="gmaps-pill text-[0.65rem] sm:text-xs md:text-[0.78rem] px-4 py-2 sm:px-5 sm:py-2.5"
                  >
                    <MapPin size={14} />
                    Open in Google Maps
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
          className="absolute -bottom-24 sm:-bottom-28 md:-bottom-32 left-0 right-0 z-20 object-cover"
          height={175}
          mdHeight={215}
          lgHeight={255}
          stickerSrc="/STICKERS/26.webp"
          stickerProps={{
            width: 190,
            mdWidth: 225,
            top: "-115px",
            left: "-38px",
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
        className="bg-[url('/images/banner3cp.webp')] bg-cover bg-position-[25%_20%] bg-no-repeat relative pt-32 sm:pt-36 md:pt-44 pb-44 sm:pb-48 md:pb-56 overflow-x-clip"
      >
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        <div className="relative max-w-3xl lg:max-w-4xl mx-auto px-5 sm:px-6 md:px-8 flex flex-col gap-12 md:gap-14">
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
                animation={idx % 2 === 0 ? "fade-left" : "fade-right"}
                delay={idx * 60}
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

                  {/* Corner flower sticker */}
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
                      <div className="flex items-baseline gap-2.5 flex-wrap">
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
                        {item.body}
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
                                      className="w-4 h-4 md:w-5 md:h-5"
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
          className="absolute -bottom-24 sm:-bottom-28 md:-bottom-32 left-0 right-0 z-20 object-cover"
          height={175}
          mdHeight={215}
          lgHeight={255}
        />
      </section>

      {/* =====================================================================
          SECTION 4: YOUR PRESENCE IS OUR GREATEST GIFT + BPI QR + SIGN-OFF
      ===================================================================== */}
      <section
        id="gift"
        className="bg-[url('/images/banner4.webp')] md:bg-center bg-cover bg-no-repeat relative pt-32 sm:pt-36 md:pt-44 pb-28 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        <div className="relative max-w-2xl lg:max-w-3xl mx-auto px-5 sm:px-6 md:px-8 z-10">
          <Reveal animation="fade-up">
            <div
              className="scrapbook-card px-7 py-10 sm:px-10 sm:py-11 md:px-14 md:py-14 text-center"
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
              <div className="flex justify-center my-6">
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

        <Sticker
          src="/STICKERS/33.webp"
          width={240}
          mdWidth={290}
          bottom="-95px"
          right="-75px"
          rotate={18}
          zIndex={15}
        />
        <Sticker
          src="/STICKERS/27.webp"
          width={180}
          mdWidth={210}
          bottom="-65px"
          left="-65px"
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
          <div style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <p
              className="text-lg sm:text-xl md:text-2xl mb-3"
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
                maxHeight: "78vh",
                objectFit: "contain",
                borderRadius: 6,
                background: "#fff",
                padding: 14,
                boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
              }}
            />
          </div>
        </div>
      )}

      <StickyControls quickActionLabel="BPI Gift QR" onQuickAction={openGiftModal} />
    </>
  );
}
