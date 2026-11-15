import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Building,
  MapPin,
  CalendarDays
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import {
  FloatingOrbs,
  DNAStrand,
  CircuitSVG
} from "./AnimatedSVGDecor";
import { conference, programFormats } from "../data/conference";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const ABOUT_SUB_TABS = [
  { id: "all", label: "Complete Overview", icon: Layers },
  { id: "overview", label: "Conference Vision", icon: Sparkles },
  { id: "programme", label: "Programme Scope", icon: Layers },
  { id: "venue", label: "RIC Venue & Host", icon: Building }
];

export default function AboutSection() {
  const [subTab, setSubTab] = useState("all");

  return (
    <section className="section section-alt" id="about">
      <FloatingOrbs count={5} className="about-orbs" />

      <div className="container">
        {/* Internal Section Sub-Tabs */}
        <div className="section-subtabs-row">
          <SectionHeading
            eyebrow="WELCOME MESSAGE / ABOUT THE CONFERENCE"
            title="Conference Overview"
          />

          <div className="section-subtabs-group" role="tablist" aria-label="About section views">
            {ABOUT_SUB_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = subTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`section-subtab-btn ${isActive ? "is-active" : ""}`}
                  onClick={() => setSubTab(tab.id)}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={subTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {/* View: All or Overview */}
            {(subTab === "all" || subTab === "overview") && (
              <div className="about-grid">
                <div className="about-overview">
                  <p className="lead-paragraph">{conference.overview}</p>

                  <div className="about-summary-box">
                    <div>
                      <span>CONFERENCE DATES</span>
                      <strong>{conference.dates}</strong>
                    </div>
                    <div>
                      <span>FORMAT</span>
                      <strong>{conference.format}</strong>
                    </div>
                    <div>
                      <span>VENUE</span>
                      <strong>{conference.venueShort}</strong>
                    </div>
                    <div>
                      <span>LOCATION</span>
                      <strong>Jhalana Doongri, Jaipur – 302017</strong>
                    </div>
                  </div>

                  <div className="about-actions">
                    <a className="btn btn-primary" href="#tracks">
                      Explore Technical Tracks <ArrowRight size={15} aria-hidden="true" />
                    </a>
                    <a className="btn btn-outline-dark" href="#dates">
                      Important Dates
                    </a>
                  </div>
                </div>

                {/* Right Column in All View: Highlights */}
                {subTab === "all" && (
                  <div className="program-highlights">
                    <DNAStrand className="about-dna" />
                    <div className="highlights-header">
                      <span>PROGRAMME STRUCTURE</span>
                      <h3>Conference Scope &amp; Format</h3>
                    </div>
                    <div className="highlights-grid">
                      {programFormats.map((item) => (
                        <div className="highlight-item" key={item.title}>
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* View: Programme Scope Only */}
            {subTab === "programme" && (
              <div className="about-tab-panel">
                <div className="highlights-header">
                  <span>SPECIALIZED SESSIONS &amp; PLENARY FORUMS</span>
                  <h3>AI UNIVERSE–2028 Academic Programme Structure</h3>
                </div>
                <div className="highlights-grid highlights-grid-expanded">
                  {programFormats.map((item) => (
                    <motion.div
                      className="highlight-item highlight-item-large"
                      key={item.title}
                      variants={fadeUp}
                      initial="hidden"
                      animate="show"
                    >
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* View: Venue & Host Only */}
            {subTab === "venue" && (
              <div className="about-tab-panel">
                <div className="about-venue-spotlight">
                  <div className="venue-spotlight-card">
                    <div className="institution-card-top">
                      <MapPin size={18} aria-hidden="true" />
                      <span>OFFICIAL VENUE</span>
                    </div>
                    <h3>{conference.venueName}</h3>
                    <p className="venue-address-text">{conference.venueAddress}</p>
                    <p className="venue-desc-text">
                      Rajasthan International Center (RIC), Jaipur, is Rajasthan's premier world-class convention
                      destination, purpose-built with cutting-edge audiovisual facilities, plenary halls, and
                      symposium suites for global technological and scientific leadership.
                    </p>
                    <div className="venue-meta-pills">
                      <span><CalendarDays size={13} /> {conference.dates}</span>
                      <span><Building size={13} /> Block-C, Jhalana Doongri</span>
                    </div>
                  </div>

                  <div className="venue-spotlight-card">
                    <div className="institution-card-top">
                      <Sparkles size={18} aria-hidden="true" />
                      <span>ORGANIZING HOST</span>
                    </div>
                    <h3>Department of Computer Science &amp; Engineering</h3>
                    <p className="venue-address-text">University of Engineering &amp; Management (UEM), Jaipur</p>
                    <p className="venue-desc-text">
                      UEM Jaipur is an accredited premier research university committed to pioneering
                      advancements in Artificial Intelligence, Cybersecurity, Machine Learning, and
                      next-generation autonomous computational ecosystems.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <CircuitSVG className="about-circuit" />
      </div>
    </section>
  );
}

