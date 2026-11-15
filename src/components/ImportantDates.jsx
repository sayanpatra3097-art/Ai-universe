import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Info, Clock, Table, Layers } from "lucide-react";
import { timeline } from "../data/conference";
import SectionHeading from "./SectionHeading";
import { TimelineSVGPath } from "./AnimatedSVGDecor";

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};

const DATES_SUB_TABS = [
  { id: "all", label: "All Details", icon: Layers },
  { id: "timeline", label: "Timeline & Milestones", icon: Clock },
  { id: "table", label: "Official Schedule Table", icon: Table }
];

export default function ImportantDates() {
  const [subTab, setSubTab] = useState("all");

  return (
    <section className="section section-alt" id="dates">
      <div className="container">
        {/* Internal Section Sub-Tabs */}
        <div className="section-subtabs-row">
          <SectionHeading
            eyebrow="SCHEDULE & MILESTONES"
            title="Important Dates"
            text="Official submission, notification, registration, and conference milestones for AI UNIVERSE–2028."
          />

          <div className="section-subtabs-group" role="tablist" aria-label="Important dates views">
            {DATES_SUB_TABS.map((tab) => {
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
            {/* View: All or Timeline */}
            {(subTab === "all" || subTab === "timeline") && (
              <div className={subTab === "all" ? "dates-split" : "dates-single-view"}>
                <div className="dates-sidebar" style={subTab === "timeline" ? { maxWidth: "700px", margin: "0 auto" } : undefined}>
                  <div className="dates-timeline-wrap">
                    <TimelineSVGPath steps={timeline.length} />

                    <div className="dates-summary-card" aria-label="Key dates summary">
                      <div className="hero-card-header">
                        <span>KEY DATES &amp; MILESTONES</span>
                        <small>2028 Schedule</small>
                      </div>
                      <ul className="hero-dates-list">
                        {timeline.map((item, i) => (
                          <motion.li
                            key={item.title}
                            custom={i}
                            variants={rowVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                          >
                            <span className="hero-date-label">{item.title}</span>
                            <strong className="hero-date-value">{item.date}</strong>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="notice-box" role="note">
                    <div className="notice-box-title">
                      <Info size={16} aria-hidden="true" />
                      <strong>Schedule Note</strong>
                    </div>
                    <p>
                      Paper submission opens on 16 April 2028 and closes on 10 May 2028. Further details
                      regarding submission format and conference programme schedules may be announced
                      separately.
                    </p>
                  </div>
                </div>

                {/* Right Column in All View: Table */}
                {subTab === "all" && (
                  <motion.div
                    className="table-card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="table-card-header">
                      <CalendarDays size={17} aria-hidden="true" />
                      <span>AI UNIVERSE–2028 — Official Milestone Schedule</span>
                    </div>
                    <div className="table-scroll">
                      <table className="official-table">
                        <thead>
                          <tr>
                            <th scope="col">Milestone</th>
                            <th scope="col">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {timeline.map((item, i) => (
                            <motion.tr
                              key={item.title}
                              custom={i}
                              variants={rowVariants}
                              initial="hidden"
                              whileInView="show"
                              viewport={{ once: true }}
                            >
                              <td className="cell-strong">{item.title}</td>
                              <td className="cell-date">{item.date}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* View: Table Only */}
            {subTab === "table" && (
              <div className="table-card table-card-full">
                <div className="table-card-header">
                  <CalendarDays size={17} aria-hidden="true" />
                  <span>AI UNIVERSE–2028 — Comprehensive Schedule &amp; Deadlines</span>
                </div>
                <div className="table-scroll">
                  <table className="official-table">
                    <thead>
                      <tr>
                        <th scope="col">Milestone</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeline.map((item, i) => (
                        <motion.tr
                          key={item.title}
                          custom={i}
                          variants={rowVariants}
                          initial="hidden"
                          animate="show"
                        >
                          <td className="cell-strong">{item.title}</td>
                          <td className="cell-date">{item.date}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
