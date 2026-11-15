/**
 * AnimatedSVGDecor — Reusable Awwwards-grade SVG decorations
 * Self-drawing paths, orbiting glows, circuit meshes, wave separators
 */
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

/* ─── Scroll Progress Bar ─────────────────────────────────────────────────── */
export function ScrollProgressBar() {
  const barRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${progress}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="scroll-progress-track">
      <div className="scroll-progress-bar" ref={barRef} />
    </div>
  );
}

/* ─── Self-Drawing Circuit SVG ────────────────────────────────────────────── */
export function CircuitSVG({ className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`circuit-svg-wrap ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main horizontal trace */}
        <motion.path
          d="M0 160 H120 L150 130 H280 L310 160 H440 L470 130 H600"
          stroke="url(#circuitGrad1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
        {/* Branch up */}
        <motion.path
          d="M220 130 V60 H340 V130"
          stroke="url(#circuitGrad1)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
        />
        {/* Branch down */}
        <motion.path
          d="M350 160 V240 H460 V200"
          stroke="url(#circuitGrad2)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{ duration: 1.8, delay: 0.9, ease: "easeInOut" }}
        />
        {/* Node dots */}
        {[
          [150, 130], [280, 130], [310, 160], [440, 160],
          [220, 60], [340, 60], [350, 240], [460, 200]
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r="4"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
          />
        ))}
        {/* Pulse dot on main line */}
        <motion.circle
          cx="0" cy="160" r="5"
          fill="#00d4ff"
          initial={{ cx: 0, opacity: 0 }}
          animate={isInView ? { cx: 600, opacity: [0, 1, 1, 0] } : {}}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="circuitGrad1" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00629b" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00629b" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="circuitGrad2" x1="0" y1="0" x2="0" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Animated Wave Separator ─────────────────────────────────────────────── */
export function WaveSeparator({ flip = false, color = "#f4f7fb" }) {
  return (
    <div
      className="wave-separator"
      style={{ transform: flip ? "scaleX(-1)" : undefined, lineHeight: 0 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z"
          fill={color}
          initial={{ d: "M0,28 C240,28 480,28 720,28 C960,28 1200,28 1440,28 L1440,56 L0,56 Z" }}
          animate={{ d: "M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

/* ─── Orbiting Glow Rings ─────────────────────────────────────────────────── */
export function OrbitRings({ className = "" }) {
  return (
    <div className={`orbit-rings-wrap ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {/* Outer ring */}
        <motion.ellipse
          cx="200" cy="200" rx="180" ry="60"
          fill="none" stroke="url(#orbitGrad)" strokeWidth="1"
          strokeDasharray="8 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        {/* Middle ring */}
        <motion.ellipse
          cx="200" cy="200" rx="130" ry="45"
          fill="none" stroke="url(#orbitGrad2)" strokeWidth="1"
          strokeDasharray="6 6"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        {/* Inner ring */}
        <motion.ellipse
          cx="200" cy="200" rx="80" ry="28"
          fill="none" stroke="#00d4ff" strokeWidth="0.8"
          strokeOpacity="0.4"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        {/* Orbiting dots */}
        {[0, 120, 240].map((offset, i) => (
          <motion.circle
            key={i}
            cx="380" cy="200" r="5"
            fill="#00d4ff"
            animate={{ rotate: 360 + offset }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: (i * 20) / 3 }}
            style={{ transformOrigin: "200px 200px", fillOpacity: 0.8 }}
          />
        ))}
        {/* Center glow dot */}
        <motion.circle
          cx="200" cy="200" r="8"
          fill="#00d4ff"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <defs>
          <linearGradient id="orbitGrad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00629b" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#00629b" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="orbitGrad2" x1="400" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Floating Particle Orbs ─────────────────────────────────────────────── */
export function FloatingOrbs({ count = 5, className = "" }) {
  const orbs = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 60 + i * 30,
    x: 10 + i * 18,
    y: 20 + ((i * 23) % 60),
    duration: 6 + i * 2,
    delay: i * 0.8,
    color: i % 2 === 0 ? "rgba(0,100,155,0.07)" : "rgba(217,119,6,0.05)",
  }));
  return (
    <div className={`floating-orbs ${className}`} aria-hidden="true">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Path Timeline ─────────────────────────────────────────────── */
export function TimelineSVGPath({ steps = 6 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const height = steps * 80;
  return (
    <div ref={ref} className="timeline-svg-path" aria-hidden="true">
      <svg viewBox={`0 0 60 ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Vertical spine */}
        <motion.line
          x1="30" y1="0" x2="30" y2={height}
          stroke="url(#tlGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2.0, ease: "easeInOut" }}
        />
        {/* Step dots */}
        {Array.from({ length: steps }, (_, i) => (
          <motion.circle
            key={i}
            cx="30"
            cy={40 + i * 80}
            r="8"
            fill="var(--navy)"
            stroke="#00d4ff"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.3 }}
          />
        ))}
        <defs>
          <linearGradient id="tlGrad" x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Hexagon Grid Background ─────────────────────────────────────────────── */
export function HexGrid({ className = "" }) {
  return (
    <div className={`hex-grid-bg ${className}`} aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexPat" x="0" y="0" width="56" height="97" patternUnits="userSpaceOnUse">
            <polygon
              points="28,2 54,14 54,42 28,54 2,42 2,14"
              fill="none"
              stroke="#00629b"
              strokeWidth="0.4"
              strokeOpacity="0.15"
            />
            <polygon
              points="28,51 54,63 54,91 28,103 2,91 2,63"
              fill="none"
              stroke="#00629b"
              strokeWidth="0.4"
              strokeOpacity="0.15"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPat)" />
      </svg>
    </div>
  );
}

/* ─── Glowing Shield (Publication) ───────────────────────────────────────── */
export function AnimatedShield() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="animated-shield" aria-hidden="true">
      <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield outline */}
        <motion.path
          d="M60 8 L104 26 L104 70 C104 96 84 118 60 128 C36 118 16 96 16 70 L16 26 Z"
          stroke="url(#shieldGrad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        {/* Fill glow */}
        <motion.path
          d="M60 8 L104 26 L104 70 C104 96 84 118 60 128 C36 118 16 96 16 70 L16 26 Z"
          fill="url(#shieldFill)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        />
        {/* Check mark */}
        <motion.path
          d="M42 70 L55 83 L80 58"
          stroke="#00d4ff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.6, ease: "easeInOut" }}
        />
        {/* Pulse ring */}
        <motion.circle
          cx="60" cy="70" r="45"
          stroke="#00629b"
          strokeWidth="1"
          fill="none"
          strokeOpacity="0.3"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "60px 70px" }}
        />
        <defs>
          <linearGradient id="shieldGrad" x1="16" y1="8" x2="104" y2="128" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#00629b" />
          </linearGradient>
          <linearGradient id="shieldFill" x1="16" y1="8" x2="104" y2="128" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00629b" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.04" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── DNA / Helix Strand (About) ─────────────────────────────────────────── */
export function DNAStrand({ className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const pts1 = "M20,10 C50,30 50,60 20,80 C-10,100 -10,130 20,150 C50,170 50,200 20,220 C-10,240 -10,270 20,290";
  const pts2 = "M60,10 C30,30 30,60 60,80 C90,100 90,130 60,150 C30,170 30,200 60,220 C90,240 90,270 60,290";
  return (
    <div ref={ref} className={`dna-strand ${className}`} aria-hidden="true">
      <svg viewBox="0 0 80 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path d={pts1} stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.8 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path d={pts2} stroke="#d97706" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.8 } : {}}
          transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
        />
        {/* Cross bars */}
        {[40, 80, 120, 160, 200, 240].map((y, i) => (
          <motion.line key={i} x1="20" y1={y} x2="60" y2={y}
            stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.5"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.5 } : {}}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.2 }}
            style={{ transformOrigin: "40px " + y + "px" }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── Staggered Text Reveal ───────────────────────────────────────────────── */
export function StaggerReveal({ children, className = "", stagger = 0.08 }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>{child}</motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>}
    </motion.div>
  );
}

/* ─── Animated Counter ────────────────────────────────────────────────────── */
export function AnimatedCounter({ to, suffix = "", prefix = "", duration = 1.5 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const controls = useAnimation();

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(to, 10);
    if (isNaN(end)) return;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      if (ref.current) ref.current.textContent = `${prefix}${Math.floor(start)}${suffix}`;
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, to, suffix, prefix, duration]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

