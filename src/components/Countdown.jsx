import { useEffect, useState } from "react";

function Box({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="min-w-[70px] sm:min-w-[82px] md:min-w-[96px] lg:min-w-[106px] px-2.5 py-2 sm:px-3.5 sm:py-2.5 md:px-4 md:py-3 flex flex-col items-center gap-1"
        style={{
          border: "2px solid rgba(255,253,248,0.92)",
          borderRadius: "6px",
          background: "rgba(38, 16, 19, 0.42)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          boxShadow: "0 4px 18px rgba(0,0,0,0.35)",
        }}
      >
        <span
          className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.1rem] leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            color: "#fffdf8",
            letterSpacing: "0.03em",
            textShadow: "0 1px 6px rgba(0,0,0,0.85)",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
        <div style={{ width: "100%", height: "1px", background: "rgba(255,253,248,0.55)" }} />
        <span
          className="text-[0.56rem] sm:text-[0.65rem] md:text-[0.72rem] lg:text-[0.78rem]"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            letterSpacing: "0.2em",
            color: "#fffdf8",
            textTransform: "uppercase",
            textShadow: "0 1px 4px rgba(0,0,0,0.85)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  });

  return (
    <div className="relative z-30 flex flex-col items-center gap-2">
      {/* Frosted pill header so "Counting Down To Our Day" is always crystal-clear over cherry blossoms */}
      <div
        className="flex flex-col items-center px-5 py-1.5 rounded-full"
        style={{
          background: "rgba(38, 16, 19, 0.42)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          border: "1px solid rgba(255,253,248,0.28)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 sm:w-10 h-[1px] bg-white/75" />
          <span
            className="text-[0.65rem] sm:text-xs"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#fffdf8",
              lineHeight: 1,
            }}
          >
            ✦
          </span>
          <div className="w-7 sm:w-10 h-[1px] bg-white/75" />
        </div>

        <p
          className="text-lg sm:text-2xl md:text-3xl text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontStyle: "italic",
            letterSpacing: "0.1em",
            color: "#fffdf8",
            margin: 0,
            lineHeight: 1.15,
            textShadow: "0 1px 6px rgba(0,0,0,0.85)",
          }}
        >
          Counting Down To Our Day
        </p>
      </div>

      <div className="flex gap-2.5 sm:gap-3.5 md:gap-4 items-center mt-0.5">
        <Box value={timeLeft.days} label="Days" />

        <span
          className="text-2xl sm:text-3xl md:text-4xl mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            color: "rgba(255,253,248,0.85)",
            textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          ·
        </span>

        <Box value={timeLeft.hours} label="Hours" />

        <span
          className="text-2xl sm:text-3xl md:text-4xl mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            color: "rgba(255,253,248,0.85)",
            textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          ·
        </span>

        <Box value={timeLeft.minutes} label="Minutes" />
      </div>
    </div>
  );
}

export default Countdown;
