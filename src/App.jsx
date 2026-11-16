import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  FileText,
  Globe2,
  ShieldCheck,
  ArrowUp,
  Home,
  Sparkles,
  MapPin,
  Clock,
  Send,
  CreditCard,
  Users
} from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SectionTabBar, { SECTION_TABS } from "./components/SectionTabBar";
import SectionHeading from "./components/SectionHeading";
import AboutSection from "./components/AboutSection";
import Tracks from "./components/Tracks";
import ImportantDates from "./components/ImportantDates";
import RegistrationSection from "./components/RegistrationSection";
import CommitteeSection from "./components/CommitteeSection";
import VenueSection from "./components/VenueSection";
import FloatingLogosMarquee from "./components/FloatingLogosMarquee";
import {
  ScrollProgressBar,
  WaveSeparator,
  OrbitRings,
  FloatingOrbs,
  HexGrid,
  AnimatedShield,
  StaggerReveal,
  AnimatedCounter
} from "./components/AnimatedSVGDecor";
import {
  conference,
  quickFactsStrip
} from "./data/conference";

const tabTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  // Sync with URL hash on mount and hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (SECTION_TABS.some((t) => t.id === hash)) {
        setActiveTab(hash);
      } else if (!hash || hash === "all" || hash === "top") {
        setActiveTab("home");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "home") {
      window.history.replaceState(null, "", " ");
    } else {
      window.history.replaceState(null, "", `#${tabId}`);
    }

    // Smoothly scroll to top of the page when switching tabs
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-shell">
      {/* Scroll progress bar at top */}
      <ScrollProgressBar />

      <Navbar activeTab={activeTab} onSelectTab={handleSelectTab} />

      <main>
        {/* Tab Breadcrumb Banner (shown on non-home tabs) */}
        {activeTab !== "home" && (
          <div className="active-tab-banner">
            <div className="container active-tab-banner-inner">
              <div className="active-tab-breadcrumbs">
                <button
                  type="button"
                  className="breadcrumb-home-link"
                  onClick={() => handleSelectTab("home")}
                >
                  <Home size={13} aria-hidden="true" />
                  <span>Home</span>
                </button>
                <span className="breadcrumb-separator" aria-hidden="true">/</span>
                <span className="breadcrumb-current">
                  {SECTION_TABS.find((t) => t.id === activeTab)?.label}
                </span>
              </div>
              <button
                type="button"
                className="view-all-sections-btn"
                onClick={() => handleSelectTab("home")}
              >
                <Home size={14} aria-hidden="true" />
                <span>Return to Home Page</span>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB CONTENTS (EACH TAB IS ITS OWN SEPARATE PAGE)
           ══════════════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {/* ── 1. HOME TAB ONLY: Hero, Quick Facts, and Home Welcome Portal ── */}
          {activeTab === "home" && (
            <motion.div key="home" {...tabTransition}>
              <Hero onSelectTab={handleSelectTab} />

              {/* Technical Co-Sponsors & Partner Societies Floating Marquee */}
              <FloatingLogosMarquee />

              {/* Quick Facts Strip */}
              <section className="partners-strip" aria-label="Conference quick facts">
                <HexGrid className="hex-facts-bg" />
                <div className="container partners-grid">
                  {quickFactsStrip.map((item, i) => (
                    <motion.div
                      className="partner-cell"
                      key={item.role}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <span className="partner-role">{item.role}</span>
                      <strong>
                        {/^\d+/.test(item.name) ? (
                          <AnimatedCounter
                            to={parseInt(item.name)}
                            suffix={item.name.replace(/^\d+/, "")}
                          />
                        ) : (
                          item.name
                        )}
                      </strong>
                      <small>{item.detail}</small>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* ── 2. ABOUT TAB ONLY ── */}
          {activeTab === "about" && (
            <motion.div key="about" {...tabTransition}>
              <AboutSection />
            </motion.div>
          )}

          {/* ── 3. TRACKS TAB ONLY ── */}
          {activeTab === "tracks" && (
            <motion.div key="tracks" {...tabTransition}>
              <Tracks />
            </motion.div>
          )}

          {/* ── 4. DATES TAB ONLY ── */}
          {activeTab === "dates" && (
            <motion.div key="dates" {...tabTransition}>
              <ImportantDates />
            </motion.div>
          )}

          {/* ── 5. PAPERS TAB ONLY ── */}
          {activeTab === "papers" && (
            <motion.div key="papers" {...tabTransition}>
              <section className="cfp-banner" id="papers">
                <OrbitRings className="cfp-orbit" />
                <FloatingOrbs count={4} className="cfp-orbs" />

                <div className="container cfp-grid">
                  <StaggerReveal className="cfp-copy">
                    <span className="eyebrow eyebrow-light">CALL FOR PAPERS / AUTHORS</span>
                    <h2>Call for Papers</h2>
                    <p>{conference.callForPapers}</p>
                    <div className="cfp-actions">
                      <button
                        type="button"
                        className="btn btn-amber"
                        onClick={() => handleSelectTab("dates")}
                      >
                        View Submission Timeline <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </StaggerReveal>

                  <motion.div
                    className="cfp-links-card"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3>Submission &amp; Author Quick Links</h3>
                    <ul>
                      <li>
                        <button
                          type="button"
                          className="cfp-quick-link-btn"
                          onClick={() => handleSelectTab("dates")}
                        >
                          <CalendarDays size={17} aria-hidden="true" />
                          <div>
                            <strong>Paper Submission Opens: 16 April 2028</strong>
                            <span>Full paper submission portal opens for all tracks</span>
                          </div>
                          <ArrowRight size={15} aria-hidden="true" />
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="cfp-quick-link-btn"
                          onClick={() => handleSelectTab("dates")}
                        >
                          <CalendarDays size={17} aria-hidden="true" />
                          <div>
                            <strong>Submission Deadline: 10 May 2028</strong>
                            <span>Final deadline for all full paper submissions</span>
                          </div>
                          <ArrowRight size={15} aria-hidden="true" />
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="cfp-quick-link-btn"
                          onClick={() => handleSelectTab("tracks")}
                        >
                          <BookOpen size={17} aria-hidden="true" />
                          <div>
                            <strong>4 Technical Tracks</strong>
                            <span>Frontier AI, Trustworthy AI, Autonomous Systems &amp; AI-Native Hardware</span>
                          </div>
                          <ArrowRight size={15} aria-hidden="true" />
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="cfp-quick-link-btn"
                          onClick={() => handleSelectTab("registration")}
                        >
                          <FileText size={17} aria-hidden="true" />
                          <div>
                            <strong>Registration Charges (INR)</strong>
                            <span>Author, Student &amp; Industry tiers for IEEE &amp; Non-IEEE delegates</span>
                          </div>
                          <ArrowRight size={15} aria-hidden="true" />
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ── 6. PUBLICATION TAB ONLY ── */}
          {activeTab === "publication" && (
            <motion.div key="publication" {...tabTransition}>
              <section className="section" id="publication">
                <div className="container publication-grid">
                  <div className="publication-main">
                    <SectionHeading
                      eyebrow="PROCEEDINGS & SUBMISSIONS"
                      title="Submission Format & Publication Updates"
                    />
                    <p className="lead-paragraph">
                      Submissions to AI UNIVERSE–2028 must present novel work, sound technical content,
                      and clear research contributions aligned with any of the four conference tracks.
                    </p>
                    <p className="body-paragraph">
                      Further details regarding the submission format, publication arrangements,
                      registration procedure and conference programme may be announced separately prior to
                      the paper submission opening date on 16 April 2028.
                    </p>
                    <button
                      type="button"
                      className="text-action-link text-action-btn"
                      onClick={() => handleSelectTab("dates")}
                    >
                      Check Key Submission Dates <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  </div>

                  <aside className="publication-note-card">
                    <AnimatedShield />
                    <div className="publication-note-head">
                      <ShieldCheck size={20} aria-hidden="true" />
                      <span>SUBMISSION STANDARDS</span>
                    </div>
                    <h3>Technical Review &amp; Originality</h3>
                    <p>
                      All manuscripts are expected to demonstrate original research results, rigorous
                      methodology, and clear relevance to intelligent, secure, trustworthy, and
                      sustainable ecosystems.
                    </p>
                    <div className="publication-partner-tag">
                      <Globe2 size={15} aria-hidden="true" />
                      <span>Submission Portal Opens: 16 April 2028</span>
                    </div>
                  </aside>
                </div>
              </section>
            </motion.div>
          )}

          {/* ── 7. REGISTRATION TAB ONLY ── */}
          {activeTab === "registration" && (
            <motion.div key="registration" {...tabTransition}>
              <RegistrationSection />
            </motion.div>
          )}

          {/* ── 8. COMMITTEE TAB ONLY ── */}
          {activeTab === "committee" && (
            <motion.div key="committee" {...tabTransition}>
              <CommitteeSection />
            </motion.div>
          )}

          {/* ── 9. VENUE TAB ONLY ── */}
          {activeTab === "venue" && (
            <motion.div key="venue" {...tabTransition}>
              <VenueSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <WaveSeparator color="var(--navy-deep)" />

      <footer className="site-footer" id="contact">
        <HexGrid className="footer-hex-bg" />
        <FloatingOrbs count={3} className="footer-orbs" />

        <div className="container footer-grid">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <img
                src="/images/logo.png"
                alt="AI UNIVERSE–2028 Logo"
                className="footer-logo-img"
              />
              <div>
                <strong>AI UNIVERSE–2028</strong>
                <span>International Conference on Artificial Intelligence</span>
              </div>
            </div>
            <p className="footer-summary">{conference.subtitle}.</p>
          </div>

          <div className="footer-col">
            <h4>Conference Tabs</h4>
            <ul>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => handleSelectTab("home")}>
                  Home Page
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => handleSelectTab("about")}>
                  Conference Overview
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => handleSelectTab("tracks")}>
                  Technical Tracks (01–04)
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => handleSelectTab("dates")}>
                  Important Dates
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Authors &amp; Venue</h4>
            <ul>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => handleSelectTab("papers")}>
                  Call for Papers
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => handleSelectTab("publication")}>
                  Submission &amp; Publication
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => handleSelectTab("registration")}>
                  Registration Charges
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => handleSelectTab("committee")}>
                  Venue &amp; Committees
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Conference Venue</h4>
            <p className="footer-venue-text">
              <strong>{conference.venueName}</strong>
              <br />
              {conference.venueAddress}
              <br />
              <strong>Dates:</strong> {conference.dates}
            </p>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2028 AI UNIVERSE–2028 · Rajasthan International Centre (RIC), Jaipur, India</span>
          <a href="#top" className="back-to-top">
            Back to Top <ArrowUp size={13} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
