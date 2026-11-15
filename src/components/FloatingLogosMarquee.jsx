import React from "react";
import { ExternalLink, Sparkles } from "lucide-react";

export const FLOATING_LOGOS = [
  {
    id: "uem",
    name: "University of Engineering & Management (UEM) Jaipur",
    shortName: "UEM Jaipur",
    role: "Host University",
    badgeType: "host",
    img: "/images/floating_logos/logo-uem.png",
    fallbackImg: "/images/uem-logo.jpg",
    url: "https://uem.edu.in/uem-jaipur/"
  },
  {
    id: "ieee-uemj",
    name: "IEEE UEMJ Student Branch",
    shortName: "IEEE UEMJ",
    role: "Organizer",
    badgeType: "organizer",
    img: "/images/floating_logos/logo-ieee-uemj.png",
    url: "https://www.ieee.org"
  },
  {
    id: "ieee-cs",
    name: "IEEE Computer Society UEMJ Student Branch Chapter",
    shortName: "IEEE Computer Society",
    role: "Technical Co-Sponsor",
    badgeType: "sponsor",
    img: "/images/floating_logos/logo-ieee-cs.png",
    url: "https://www.computer.org"
  },
  {
    id: "mtts",
    name: "IEEE MTT-S UEMJ Student Branch Chapter",
    shortName: "IEEE MTT-S",
    role: "Technical Co-Sponsor",
    badgeType: "sponsor",
    img: "/images/floating_logos/logo-mtts.png",
    url: "https://mtt.org"
  },
  {
    id: "aps",
    name: "IEEE AP-S UEMJ Student Branch Chapter",
    shortName: "IEEE AP-S",
    role: "Technical Co-Sponsor",
    badgeType: "sponsor",
    img: "/images/floating_logos/logo-aps.png",
    fallbackImg: "/images/floating_logos/logo-aps.jpg",
    url: "https://ieeeaps.org"
  },
  {
    id: "emc",
    name: "IEEE EMC Society UEMJ Student Branch Chapter",
    shortName: "IEEE EMC Society",
    role: "Technical Co-Sponsor",
    badgeType: "sponsor",
    img: "/images/floating_logos/logo-emc.png",
    url: "https://emcs.org"
  }
];

export default function FloatingLogosMarquee() {
  // Duplicate array 3 times for a completely seamless, continuous infinite scroll loop
  const marqueeItems = [...FLOATING_LOGOS, ...FLOATING_LOGOS, ...FLOATING_LOGOS];

  return (
    <section className="floating-marquee-section" aria-label="Partner Societies & Sponsors">
      {/* Header Accent Bar Inspired by Reference */}
      <div className="floating-marquee-header-bar">
        <div className="container floating-marquee-header-inner">
          <div className="floating-marquee-heading-wrap">
            <span className="floating-marquee-eyebrow">
              <Sparkles size={13} className="floating-marquee-sparkle" aria-hidden="true" />
              CO-SPONSORS &amp; ORGANIZERS
            </span>
            <h2 className="floating-marquee-title">Technical Co-Sponsoring Societies &amp; Partners</h2>
          </div>
          <p className="floating-marquee-subtitle">
            Supported by premier IEEE Societies, Student Branch Chapters &amp; UEM Jaipur
          </p>
        </div>
      </div>

      {/* Marquee Floating Track Container with Edge Fades */}
      <div className="floating-marquee-outer">
        <div className="floating-marquee-fade floating-marquee-fade-left" aria-hidden="true" />
        <div className="floating-marquee-fade floating-marquee-fade-right" aria-hidden="true" />

        <div className="floating-marquee-track">
          {marqueeItems.map((item, index) => (
            <a
              key={`${item.id}-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="floating-logo-card"
              title={`Visit ${item.name}`}
            >
              <div className="floating-logo-img-box">
                <img
                  src={item.img}
                  alt={item.name}
                  className="floating-logo-img"
                  loading="lazy"
                  onError={(e) => {
                    if (item.fallbackImg && e.target.src !== item.fallbackImg) {
                      e.target.src = item.fallbackImg;
                    }
                  }}
                />
              </div>

              <div className="floating-logo-meta">
                <span className={`floating-logo-badge badge-${item.badgeType}`}>
                  {item.role}
                </span>
                <span className="floating-logo-ext-hint" aria-hidden="true">
                  <ExternalLink size={11} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

