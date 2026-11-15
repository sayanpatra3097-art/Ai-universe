import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { tracks, trackFilters } from "../data/conference";
import SectionHeading from "./SectionHeading";
import { HexGrid } from "./AnimatedSVGDecor";

/* Stagger grid for track cards */
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export default function Tracks() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleTracks =
    activeFilter === "all"
      ? tracks
      : tracks.filter((track) => track.category === activeFilter);

  return (
    <section className="section tracks-section-wrap" id="tracks">
      {/* Neural hex mesh background */}
      <HexGrid className="tracks-hex-bg" />

      {/* Top glow accent bar */}
      <div className="tracks-glow-bar" aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          className="tracks-header-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            eyebrow="TECHNICAL SCOPE / TRACKS 01–04"
            title="Technical Tracks"
            text="AI UNIVERSE–2028 features four specialized tracks spanning Frontier Artificial Intelligence & Agentic Systems, Secure & Trustworthy AI, Autonomous Intelligence & Cyber-Physical Ecosystems, and Intelligent Communication & AI-Native Hardware."
          />

          <div className="track-filter-group" role="tablist" aria-label="Filter technical tracks">
            {trackFilters.map((filter) => (
              <motion.button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.id}
                className={`track-filter-btn ${activeFilter === filter.id ? "is-active" : ""}`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="tracks-grid"
            variants={gridVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {visibleTracks.map((track) => (
              <motion.article
                className="track-card"
                key={track.number}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 16px 48px rgba(0, 98, 155, 0.16)",
                  transition: { duration: 0.2 }
                }}
              >
                {/* Animated track number glow */}
                <div className="track-card-head">
                  <span className="track-badge">TRACK {track.number}</span>
                  <span className="track-num-glow" aria-hidden="true">{track.number}</span>
                </div>
                <h3>{track.title}</h3>
                <ul className="track-topics">
                  {track.topics.map((topic) => (
                    <li key={topic}>
                      <CheckCircle2 size={14} aria-hidden="true" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
