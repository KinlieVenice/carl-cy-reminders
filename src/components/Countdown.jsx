import { useEffect, useState } from "react";

function Box({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="min-w-[68px] sm:min-w-[80px] md:min-w-[94px] lg:min-w-[106px] px-2.5 py-2 sm:px-3.5 sm:py-2.5 md:px-4 md:py-3 flex flex-col items-center gap-1"
        style={{
          border: "2.5px solid rgba(255,255,255,1)",
          borderRadius: "6px",
          background: "rgba(0,0,0,0.22)",
          backdropFilter: "blur(3px)",
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.75))",
        }}
      >
        <span
          className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.1rem] leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "#fff",
            letterSpacing: "0.02em",
            textShadow: "0 1px 6px rgba(0,0,0,0.85)",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
        <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.65)" }} />
        <span
          className="text-[0.55rem] sm:text-[0.64rem] md:text-[0.72rem] lg:text-[0.78rem]"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            letterSpacing: "0.18em",
            color: "#fff",
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
    <div className="relative z-30 flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="flex items-center gap-2.5">
        <div className="w-10 sm:w-14 md:w-16 h-[1px] bg-white/70" />
        <span
          className="text-xs sm:text-sm md:text-base"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1,
            textShadow: "0 1px 4px rgba(0,0,0,0.8)",
          }}
        >
          ✦
        </span>
        <div className="w-10 sm:w-14 md:w-16 h-[1px] bg-white/70" />
      </div>

      <p
        className="text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] text-center px-2"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          fontStyle: "italic",
          letterSpacing: "0.12em",
          color: "#fff",
          margin: 0,
          textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8)",
        }}
      >
        Counting Down To Our Day
      </p>

      <div className="flex gap-2.5 sm:gap-3.5 md:gap-4 items-center mt-1">
        <Box value={timeLeft.days} label="Days" />

        <span
          className="text-2xl sm:text-3xl md:text-4xl mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "rgba(255,255,255,0.65)",
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
            fontWeight: 300,
            color: "rgba(255,255,255,0.65)",
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
