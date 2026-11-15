import { motion } from "framer-motion";
import {
  Home,
  Sparkles,
  BookOpen,
  CalendarDays,
  Send,
  ShieldCheck,
  CreditCard,
  Users,
  MapPin
} from "lucide-react";

export const SECTION_TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: Sparkles },
  { id: "tracks", label: "Technical Tracks", icon: BookOpen, badge: "04 Tracks" },
  { id: "dates", label: "Important Dates", icon: CalendarDays, badge: "2028" },
  { id: "papers", label: "Call for Papers", icon: Send },
  { id: "publication", label: "Publication", icon: ShieldCheck },
  { id: "registration", label: "Registration", icon: CreditCard, badge: "INR" },
  { id: "committee", label: "Committee", icon: Users },
  { id: "venue", label: "Venue", icon: MapPin }
];

export default function SectionTabBar({ activeTab, onSelectTab }) {
  return (
    <nav className="section-tabs-bar" aria-label="Conference sections navigation">
      <div className="container section-tabs-inner">
        <div className="section-tabs-scroll" role="tablist">
          {SECTION_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`section-tab-btn ${isActive ? "is-active" : ""}`}
                onClick={() => onSelectTab(tab.id)}
              >
                <Icon size={15} aria-hidden="true" />
                <span className="section-tab-label">{tab.label}</span>
                {tab.badge && (
                  <span className="section-tab-badge">{tab.badge}</span>
                )}
                {isActive && (
                  <motion.div
                    className="section-tab-indicator"
                    layoutId="activeSectionGlow"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
