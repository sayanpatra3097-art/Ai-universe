import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { conference } from "../data/conference";

const navLinksBefore = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "tracks", label: "Tracks", href: "#tracks" },
  { id: "dates", label: "Important Dates", href: "#dates" }
];

const navLinksAfter = [
  { id: "publication", label: "Publication", href: "#publication" },
  { id: "committee", label: "Committee", href: "#committee" },
  { id: "venue", label: "Venue", href: "#venue" },
  { id: "contact", label: "Contact", href: "#contact" }
];

export default function Navbar({ activeTab = "home", onSelectTab }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [attendOpen, setAttendOpen] = useState(false);
  const [mobileAttendOpen, setMobileAttendOpen] = useState(false);
  const closeTimerRef = useRef(null);

  const isAttendActive = activeTab === "registration" || activeTab === "papers";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (e, item) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onSelectTab && item.id !== "contact") {
      onSelectTab(item.id);
    }
    setOpen(false);
    setAttendOpen(false);
  };

  const handleMouseEnterAttend = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setAttendOpen(true);
  };

  const handleMouseLeaveAttend = () => {
    closeTimerRef.current = setTimeout(() => {
      setAttendOpen(false);
    }, 180);
  };

  return (
    <header className="site-header-two-tier">
      {/* ═══════════════════════════════════════════════════════════════════
          TIER 1: CLEAN WHITE LOGO & INSTITUTIONAL PARTNERS HEADER
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="header-top-logo-bar">
        <div className="container header-top-inner">
          {/* Left: Host Institution (UEM Jaipur) Logo */}
          <div className="header-top-col header-top-left">
            <div
              aria-label="University of Engineering & Management (UEM) Jaipur"
              className="header-provided-logo-item"
            >
              <img
                src="/images/uem-logo.jpg"
                alt="University of Engineering & Management (UEM) Jaipur"
                className="header-top-provided-logo header-top-uem-logo"
              />
            </div>
          </div>

          {/* Middle: AI UNIVERSE Logo & Conference Title */}
          <div className="header-top-col header-top-center">
            <a
              className="brand-mapcon brand-mapcon-center"
              href="#home"
              aria-label="AI UNIVERSE–2028 Home"
              onClick={(e) => {
                e.preventDefault();
                if (onSelectTab) onSelectTab("home");
              }}
            >
              <img
                src="/images/logo.png"
                alt="AI UNIVERSE–2028 Logo"
                className="brand-logo-img-large"
              />
              <div className="brand-mapcon-titles">
                <strong className="brand-mapcon-heading">AI UNIVERSE–2028</strong>
                <div className="brand-mapcon-date-loc">August 24–26, 2028 | JAIPUR</div>
              </div>
            </a>
          </div>

          {/* Right: IEEE Computer Society Logo & IEEE UEMJ Student Branch Logo */}
          <div className="header-top-col header-top-right">
            <div
              aria-label="IEEE Computer Society UEMJ Student Branch Chapter"
              className="header-provided-logo-item"
            >
              <img
                src="/images/ieee-cs-uemj-logo.png"
                alt="IEEE Computer Society UEMJ Student Branch Chapter"
                className="header-top-provided-logo header-top-cs-logo"
              />
            </div>
            <div
              aria-label="IEEE UEMJ Student Branch"
              className="header-provided-logo-item"
            >
              <img
                src="/images/ieee-uemj-student-branch.png"
                alt="IEEE UEMJ Student Branch"
                className="header-top-provided-logo header-top-uemj-sb-logo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TIER 2: DEEP SOLID NAVY BLUE NAVIGATION BAR (STICKY)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className={`main-nav-bar-dark ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container nav-bar-inner">
          <nav className="desktop-nav-dark" aria-label="Main navigation">
            {navLinksBefore.map((item) => {
              const isCurrent = activeTab === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link-dark ${isCurrent ? "is-active" : ""}`}
                  onClick={(e) => handleLinkClick(e, item)}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Register Dropdown Menu (Registration & Call for Papers) */}
            <div
              className="nav-dropdown-wrap"
              onMouseEnter={handleMouseEnterAttend}
              onMouseLeave={handleMouseLeaveAttend}
            >
              <button
                type="button"
                className={`nav-dropdown-btn-dark ${isAttendActive ? "is-active" : ""}`}
                onClick={() => setAttendOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={attendOpen}
              >
                <span>Register</span>
                <ChevronDown
                  size={14}
                  className={`dropdown-chevron ${attendOpen ? "is-rotated" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {attendOpen && (
                <div className="nav-dropdown-menu" role="menu">
                  <a
                    href="#registration"
                    role="menuitem"
                    className={`dropdown-item ${activeTab === "registration" ? "is-active" : ""}`}
                    onClick={(e) => handleLinkClick(e, { id: "registration", href: "#registration" })}
                  >
                    Registration
                  </a>
                  <a
                    href="#papers"
                    role="menuitem"
                    className={`dropdown-item ${activeTab === "papers" ? "is-active" : ""}`}
                    onClick={(e) => handleLinkClick(e, { id: "papers", href: "#papers" })}
                  >
                    Call for Papers
                  </a>
                </div>
              )}
            </div>

            {navLinksAfter.map((item) => {
              const isCurrent = activeTab === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link-dark ${isCurrent ? "is-active" : ""}`}
                  onClick={(e) => handleLinkClick(e, item)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: White Register Now button matching MAPCON */}
          <div className="nav-actions-dark">
            <button
              type="button"
              className="btn-register-now"
              onClick={(e) => handleLinkClick(e, { id: "registration", href: "#registration" })}
            >
              Register Now
            </button>

            <button
              type="button"
              className="menu-toggle-dark"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <nav className="mobile-nav-dark" aria-label="Mobile navigation">
          <div className="container mobile-nav-inner">
            {navLinksBefore.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`mobile-link-dark ${activeTab === item.id ? "is-active" : ""}`}
                onClick={(e) => handleLinkClick(e, item)}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Register Accordion */}
            <div className="mobile-dropdown-wrap">
              <button
                type="button"
                className={`mobile-dropdown-btn-dark ${isAttendActive ? "is-active" : ""}`}
                onClick={() => setMobileAttendOpen((prev) => !prev)}
              >
                <span>Register</span>
                <ChevronDown
                  size={15}
                  className={`dropdown-chevron ${mobileAttendOpen ? "is-rotated" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {mobileAttendOpen && (
                <div className="mobile-dropdown-sub-dark">
                  <a
                    href="#registration"
                    className={activeTab === "registration" ? "is-active" : ""}
                    onClick={(e) => handleLinkClick(e, { id: "registration", href: "#registration" })}
                  >
                    Registration
                  </a>
                  <a
                    href="#papers"
                    className={activeTab === "papers" ? "is-active" : ""}
                    onClick={(e) => handleLinkClick(e, { id: "papers", href: "#papers" })}
                  >
                    Call for Papers
                  </a>
                </div>
              )}
            </div>

            {navLinksAfter.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`mobile-link-dark ${activeTab === item.id ? "is-active" : ""}`}
                onClick={(e) => handleLinkClick(e, item)}
              >
                {item.label}
              </a>
            ))}

            <button
              type="button"
              className="mobile-btn-register"
              onClick={(e) => handleLinkClick(e, { id: "registration", href: "#registration" })}
            >
              Register Now
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
