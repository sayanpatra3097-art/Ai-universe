import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  User,
  Building2,
  Award,
  Sparkles,
  ShieldCheck,
  Camera
} from "lucide-react";
import { committeeMembers, committeeCategories } from "../data/conference";
import SectionHeading from "./SectionHeading";

function CommitteeMemberCard({ member, index }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.article
      className={`committee-photo-card badge-type-${member.badgeType}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
      layout
    >
      {/* Photo Frame Container */}
      <div className="committee-photo-frame">
        {member.photo && !imgFailed ? (
          <img
            src={member.photo}
            alt={member.name}
            className="committee-photo-img"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : null}

        {/* Fallback & Photo Placeholder Frame (Ready for images to be attached) */}
        {(!member.photo || imgFailed) && (
          <div
            className="committee-photo-placeholder"
            aria-label={`Photo placeholder for ${member.name}`}
          >
            <div className="placeholder-avatar-bubble">
              <User size={38} aria-hidden="true" />
            </div>
            <div className="placeholder-initials-chip">{member.initials}</div>
            <span className="placeholder-hint-label">
              <Camera size={11} aria-hidden="true" /> Photo
            </span>
          </div>
        )}

        {/* Floating Role Badge */}
        <span className={`committee-role-badge role-${member.badgeType}`}>
          {member.role}
        </span>
      </div>

      {/* Member Info Content */}
      <div className="committee-card-body">
        <h3 className="committee-member-name">{member.name}</h3>
        <p className="committee-member-designation">{member.designation}</p>
        <div className="committee-member-affil">
          <Building2 size={13} aria-hidden="true" className="affil-icon" />
          <span>{member.affiliation}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function CommitteeSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredMembers =
    selectedCategory === "all"
      ? committeeMembers
      : committeeMembers.filter((m) => m.category === selectedCategory);

  return (
    <section className="section committee-section-enhanced" id="committee">
      <div className="container">
        <SectionHeading
          eyebrow="GOVERNANCE & LEADERSHIP"
          title="Organizing & Technical Committees"
          text="AI UNIVERSE–2028 leadership roster comprising Patrons, General Chairs, Conveners, Technical Program Committee, Publication & Publicity Chairs, and Steering Committee."
        />

        {/* Quick Facts Strip for Committee */}
        <div className="committee-stats-strip">
          <div className="committee-stat-pill">
            <Users size={16} className="stat-pill-icon" aria-hidden="true" />
            <span>
              <strong>19</strong> Committee Leaders
            </span>
          </div>
          <div className="committee-stat-pill">
            <Award size={16} className="stat-pill-icon" aria-hidden="true" />
            <span>
              <strong>6</strong> Premier Institutions Represented
            </span>
          </div>
          <div className="committee-stat-pill">
            <ShieldCheck size={16} className="stat-pill-icon" aria-hidden="true" />
            <span>
              <strong>5</strong> Executive Governance Panels
            </span>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div
          className="committee-filter-bar"
          role="tablist"
          aria-label="Filter committee by category"
        >
          {committeeCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? committeeMembers.length
                : committeeMembers.filter((m) => m.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`committee-filter-pill ${isSelected ? "is-active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="pill-count-chip">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Photo Cards Grid */}
        <motion.div className="committee-photo-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member, idx) => (
              <CommitteeMemberCard key={member.id} member={member} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
