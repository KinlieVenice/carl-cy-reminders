import { useEffect, useState } from "react";

function calculateTimeLeft(targetDate) {
  const difference = +new Date(targetDate) - +new Date();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0 };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
  };
}

function Box({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="min-w-[74px] sm:min-w-[84px] md:min-w-[94px] px-2.5 pt-2.5 pb-2 sm:px-3.5 sm:pt-3 sm:pb-2.5 flex flex-col items-center gap-1 rounded-md"
        style={{
          border: "2.5px solid rgba(255,255,255,1)",
          background: "none",
          filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.75))",
        }}
      >
        <span
          className="text-3xl sm:text-4xl md:text-[2.6rem] leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "#fff",
            letterSpacing: "0.02em",
            textShadow: "0 1px 5px rgba(0,0,0,0.85)",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,0.65)",
          }}
        />
        <span
          className="text-[0.6rem] sm:text-[0.66rem] md:text-[0.72rem]"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            letterSpacing: "0.18em",
            color: "#fff",
            textTransform: "uppercase",
            textShadow: "0 1px 3px rgba(0,0,0,0.85)",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center gap-1.5 mt-1 mb-1">
      <div className="flex items-center gap-2">
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "rgba(255,255,255,0.7)",
          }}
        />
        <span
          className="text-xs sm:text-sm"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1,
          }}
        >
          ✦
        </span>
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "rgba(255,255,255,0.7)",
          }}
        />
      </div>
      <p
        className="text-2xl sm:text-[1.7rem] md:text-[1.95rem] text-center m-0"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          fontStyle: "italic",
          letterSpacing: "0.12em",
          color: "#fff",
          textShadow: "0 1px 6px rgba(0,0,0,0.9)",
        }}
      >
        Counting Down To
      </p>

      <div className="flex gap-3 sm:gap-4 md:gap-5 items-center mt-0.5">
        <Box value={timeLeft.days} label="Days" />

        <span
          className="text-2xl sm:text-3xl mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "rgba(255,255,255,0.65)",
          }}
        >
          ·
        </span>

        <Box value={timeLeft.hours} label="Hours" />

        <span
          className="text-2xl sm:text-3xl mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            color: "rgba(255,255,255,0.65)",
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
