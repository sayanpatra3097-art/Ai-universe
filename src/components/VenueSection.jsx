import { motion } from "framer-motion";
import {
  MapPin,
  Building,
  Calendar,
  Navigation,
  Globe,
  ExternalLink,
  Sparkles,
  Plane,
  Train,
  Car
} from "lucide-react";
import { conference } from "../data/conference";
import SectionHeading from "./SectionHeading";

export default function VenueSection() {
  const venuePhotos = [
    {
      id: "exterior",
      img: "/images/ric-exterior.jpg",
      tag: "RIC CAMPUS & ARCHITECTURE",
      title: "Rajasthan International Center (RIC)",
      desc: "Premier convention landmark in Jaipur featuring a modern sandstone-inspired facade, illuminated grand driveway, and landscaped plazas."
    },
    {
      id: "auditorium",
      img: "/images/ric-auditorium.jpg",
      tag: "MAIN PLENARY AUDITORIUM",
      title: "World-Class Convention Theater",
      desc: "Acoustically engineered tiered auditorium with plush theater seating for 800+ delegates, high-definition stage display, and broadcast-ready media pods."
    }
  ];

  const transitInfo = [
    {
      icon: Plane,
      title: "By Air",
      detail: "Jaipur International Airport (JAI)",
      dist: "~ 8.5 km (15-20 mins via JLN Marg)"
    },
    {
      icon: Train,
      title: "By Rail",
      detail: "Gandhinagar Jaipur (GADJ) / Jaipur Jn (JP)",
      dist: "~ 5 km (GADJ) / ~ 9 km (Main JP Station)"
    },
    {
      icon: Car,
      title: "By Road / Metro",
      detail: "Jhalana Institutional Area",
      dist: "Easily accessible via JLN Marg & Apex Circle"
    }
  ];

  return (
    <section className="section" id="venue">
      <div className="container">
        <SectionHeading
          eyebrow="HOST CITY &amp; FACILITY"
          title="Conference Venue"
          text="AI UNIVERSE–2028 will be convened at the Rajasthan International Center (RIC), Jaipur — a premier world-class convention destination."
        />

        {/* ═══════════════════════════════════════════════════════════════════
            VENUE PHOTOS SHOWCASE (REAL PHOTOS PROVIDED BY USER)
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="venue-photos-grid">
          {venuePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="venue-photo-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="venue-photo-img-wrap">
                <img
                  src={photo.img}
                  alt={photo.title}
                  className="venue-photo-img"
                  loading="lazy"
                />
                <span className="venue-photo-badge">{photo.tag}</span>
              </div>
              <div className="venue-photo-body">
                <h3 className="venue-photo-title">{photo.title}</h3>
                <p className="venue-photo-desc">{photo.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            INTERACTIVE MAP LOCATION & GET DIRECTIONS
            ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="venue-map-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="venue-map-header">
            <div className="venue-map-info">
              <div className="venue-map-icon-box">
                <MapPin size={22} className="venue-map-pin" />
              </div>
              <div>
                <h3 className="venue-map-title">Interactive Venue Location</h3>
                <p className="venue-map-subtitle">
                  Rajasthan International Center (RIC), Jhalana Doongri, Jaipur – 302017
                </p>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Rajasthan+International+Center,+Jaipur"
              target="_blank"
              rel="noopener noreferrer"
              className="venue-directions-btn"
              aria-label="Get Directions to Rajasthan International Center on Google Maps"
            >
              <Navigation size={15} />
              <span>Get Directions</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Embedded Google Map Frame */}
          <div className="venue-map-iframe-container">
            <iframe
              title="Google Map - Rajasthan International Center (RIC) Jaipur"
              src="https://maps.google.com/maps?q=Rajasthan+International+Center+Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Transit & Commute Highlights */}
          <div className="venue-transit-strip">
            {transitInfo.map((t, idx) => {
              const TIcon = t.icon;
              return (
                <div key={idx} className="venue-transit-item">
                  <div className="venue-transit-icon-wrap">
                    <TIcon size={17} />
                  </div>
                  <div className="venue-transit-text">
                    <strong>{t.title}: {t.detail}</strong>
                    <span>{t.dist}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            HOST INSTITUTION & JAIPUR CITY HIGHLIGHTS
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="venue-details-grid">
          <motion.div
            className="info-card"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <div className="institution-card-top">
              <Sparkles size={18} aria-hidden="true" />
              <span>ORGANIZING HOST INSTITUTION</span>
            </div>
            <h3>Dept. of Computer Science &amp; Engineering</h3>
            <p className="info-card-lead">
              University of Engineering &amp; Management (UEM), Jaipur
            </p>
            <p>
              UEM Jaipur is a renowned institution for technical education and research in Rajasthan,
              regularly hosting premier IEEE international conferences, advanced technical symposiums,
              and global academic collaborations.
            </p>
          </motion.div>

          <motion.div
            className="info-card"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.08 }}
          >
            <div className="institution-card-top">
              <Globe size={18} aria-hidden="true" />
              <span>ABOUT JAIPUR (THE PINK CITY)</span>
            </div>
            <h3>Heritage, Technology &amp; Culture</h3>
            <p className="info-card-lead">
              A UNESCO World Heritage destination &amp; emerging tech capital
            </p>
            <p>
              Jaipur is conveniently connected via Jaipur International Airport (JAI), major railway
              junctions, and modern expressways. Renowned for its historic forts, palaces, and vibrant
              hospitality, Jaipur offers a memorable experience for delegates and authors.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
