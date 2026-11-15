import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, AlertCircle, FileText, Layers } from "lucide-react";
import { registrationFees, registrationNotes } from "../data/conference";
import SectionHeading from "./SectionHeading";

const REG_SUB_TABS = [
  { id: "all", label: "Complete Details", icon: Layers },
  { id: "fees", label: "Fee Structure", icon: CreditCard },
  { id: "guidelines", label: "Delegate Guidelines", icon: FileText }
];

export default function RegistrationSection() {
  const [subTab, setSubTab] = useState("all");

  return (
    <section className="section section-alt" id="registration">
      <div className="container">
        {/* Internal Section Sub-Tabs */}
        <div className="section-subtabs-row">
          <SectionHeading
            eyebrow="FEES & PARTICIPATION"
            title="Registration Charges"
            text="Official registration fees for AI UNIVERSE–2028 across Academician/Research Scholar, Student, Industry Professional, and Foreign Author categories for IEEE and Non-IEEE members."
          />

          <div className="section-subtabs-group" role="tablist" aria-label="Registration views">
            {REG_SUB_TABS.map((tab) => {
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
            {/* View: All or Fees */}
            {(subTab === "all" || subTab === "fees") && (
              <div className={subTab === "all" ? "registration-grid" : "registration-single-view"}>
                <motion.div
                  className={`table-card ${subTab === "fees" ? "table-card-full" : ""}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="table-card-header">
                    <CreditCard size={17} aria-hidden="true" />
                    <span>Official Registration Fee Structure</span>
                  </div>
                  <div className="table-scroll">
                    <table className="official-table">
                      <thead>
                        <tr>
                          <th scope="col">Participant Category</th>
                          <th scope="col">IEEE Member</th>
                          <th scope="col">Non-IEEE Member</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-section-row">
                          <td colSpan={3}>
                            <span className="table-section-tag">Indian Authors &amp; Delegates (INR)</span>
                          </td>
                        </tr>
                        {registrationFees
                          .filter((r) => r.scope?.includes("INR"))
                          .map((row) => (
                            <tr key={row.category}>
                              <td className="cell-strong">{row.category}</td>
                              <td className="cell-num cell-highlight">{row.ieee}</td>
                              <td className="cell-num">{row.nonIeee}</td>
                            </tr>
                          ))}
                        <tr className="table-section-row">
                          <td colSpan={3}>
                            <span className="table-section-tag">Foreign Authors &amp; Delegates (USD)</span>
                          </td>
                        </tr>
                        {registrationFees
                          .filter((r) => r.scope?.includes("USD"))
                          .map((row) => (
                            <tr key={row.category}>
                              <td className="cell-strong">{row.category}</td>
                              <td className="cell-num cell-highlight">{row.ieee}</td>
                              <td className="cell-num">{row.nonIeee}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Right Column in All View: Guidelines */}
                {subTab === "all" && (
                  <motion.aside
                    className="info-card"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.35, delay: 0.06 }}
                  >
                    <h3>Registration Notes &amp; Guidelines</h3>
                    <p className="info-card-lead">
                      Important details regarding delegate categories, discounts, and registration windows:
                    </p>
                    <ul className="checklist">
                      {registrationNotes.map((item) => (
                        <li key={item}>
                          <Check size={15} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="registration-notice-pill">
                      <AlertCircle size={15} aria-hidden="true" />
                      <span>Registration Opens: 03 July 2028 · Deadline: 25 July 2028</span>
                    </div>
                  </motion.aside>
                )}
              </div>
            )}

            {/* View: Guidelines Only */}
            {subTab === "guidelines" && (
              <div className="info-card info-card-full">
                <h3>Delegate Guidelines, Discounts &amp; Deadlines</h3>
                <p className="info-card-lead">
                  Please review the official registration guidelines carefully prior to initiating delegate registration:
                </p>
                <div className="guidelines-expanded-grid">
                  <ul className="checklist">
                    {registrationNotes.map((item) => (
                      <li key={item}>
                        <Check size={15} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="registration-notice-card">
                    <div className="registration-notice-pill">
                      <AlertCircle size={15} aria-hidden="true" />
                      <span>Registration Window: 03 July 2028 – 25 July 2028</span>
                    </div>
                    <p>
                      Each accepted paper requires at least one full author registration at the applicable
                      Author/Academician rate to be scheduled in the technical programme.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
