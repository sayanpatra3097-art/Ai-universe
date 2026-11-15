import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  Bell,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
  BookOpen
} from "lucide-react";
import { announcements, conference, heroSlides } from "../data/conference";

export default function Hero({ onSelectTab }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const showcaseRef = useRef(null);
  const canvasRef = useRef(null);

  // Neural Particle Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes
    const particleCount = Math.min(50, Math.floor(width / 26));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1.2,
      baseAlpha: Math.random() * 0.45 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting neural lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 135;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.14;
            ctx.strokeStyle = `rgba(0, 98, 155, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(0, 98, 155, ${p.baseAlpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Slide auto-advance
  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const current = heroSlides[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handleMouseMove = (e) => {
    if (!showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotX = ((y - midY) / midY) * -8;
    const rotY = ((x - midX) / midX) * 8;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setPaused(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <>
      <section className="hero" id="top">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-grid-pattern" aria-hidden="true" />

        {/* Dynamic HTML5 Neural Particle Canvas */}
        <canvas ref={canvasRef} className="hero-particle-canvas" aria-hidden="true" />

        <div className="container hero-layout">
          <motion.div
            className="hero-main"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Futuristic AI Conference Typography */}
            <div className="hero-title-wrap">
              <h1 className="hero-title">
                <span className="hero-title-brand">AI UNIVERSE</span>
                <span className="hero-title-year">
                  <span className="year-dash">–</span>2028
                </span>
              </h1>
              <div className="hero-title-glow" aria-hidden="true" />
            </div>

            <div className="hero-conf-lead">IEEE Conference on</div>
            <p className="hero-subtitle">{conference.subtitle}</p>

            {/* Interactive Glass Cards */}
            <div className="hero-meta-grid">
              <div className="hero-meta-item">
                <div className="meta-icon-bubble">
                  <CalendarDays size={18} aria-hidden="true" />
                </div>
                <div>
                  <small>CONFERENCE DATES</small>
                  <strong>{conference.dates}</strong>
                  <span className="meta-sub">Five-Day Summit</span>
                </div>
              </div>

              <div className="hero-meta-item">
                <div className="meta-icon-bubble">
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <div>
                  <small>CONFERENCE VENUE</small>
                  <strong>{conference.venueShort}</strong>
                  <span className="meta-sub">Jhalana Doongri, Jaipur</span>
                </div>
              </div>
            </div>

            {/* Classy Animated CTA Buttons */}
            <div className="hero-actions">
              <a
                className="btn btn-shimmer"
                href="#papers"
                onClick={(e) => {
                  if (onSelectTab) {
                    e.preventDefault();
                    onSelectTab("papers");
                  }
                }}
              >
                <Send size={15} aria-hidden="true" />
                <span>Call for Papers</span>
                <ArrowRight size={15} className="btn-arrow" aria-hidden="true" />
              </a>
              <a
                className="btn btn-glass-cyan"
                href="#tracks"
                onClick={(e) => {
                  if (onSelectTab) {
                    e.preventDefault();
                    onSelectTab("tracks");
                  }
                }}
              >
                <BookOpen size={15} aria-hidden="true" />
                <span>Explore 4 Tracks</span>
              </a>
              <a
                className="btn btn-glass-subtle"
                href="#dates"
                onClick={(e) => {
                  if (onSelectTab) {
                    e.preventDefault();
                    onSelectTab("dates");
                  }
                }}
              >
                <span>Key Deadlines</span>
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Cloud-Nested Visual Showcase (Seamlessly blended, zero visible edges) */}
          <div
            className="hero-cloud-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Ambient subtle luminous cyan backdrop */}
            <div className="cloud-glow-aura" aria-hidden="true" />

            {/* Seamless feathered image frame (image extends behind right change button) */}
            <div className="cloud-image-frame">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  className="cloud-image-img"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.75, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Full-screen Left & Right Navigation Arrows (pinned to full screen left and right edges like ieeemapcon) */}
        <button
          type="button"
          className="hero-fullscreen-arrow hero-fullscreen-prev"
          onClick={handlePrev}
          aria-label="Previous conference visual"
        >
          <ChevronLeft size={28} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="hero-fullscreen-arrow hero-fullscreen-next"
          onClick={handleNext}
          aria-label="Next conference visual"
        >
          <ChevronRight size={28} aria-hidden="true" />
        </button>
      </section>

      <div className="ticker-bar" aria-label="Conference announcements">
        <div className="container ticker-inner">
          <div className="ticker-label">
            <Bell size={14} aria-hidden="true" />
            <span>UPDATES</span>
          </div>
          <div className="ticker-viewport">
            <div className="ticker-track">
              {[...announcements, ...announcements].map((item, idx) => (
                <span className="ticker-item" key={`${idx}-${item.slice(0, 18)}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
