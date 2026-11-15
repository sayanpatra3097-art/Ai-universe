import { motion } from "framer-motion";
import { Users, ShieldCheck, ArrowRight } from "lucide-react";
import { committeeStructure } from "../data/conference";
import SectionHeading from "./SectionHeading";

export default function CommitteeSection() {
  return (
    <section className="section" id="committee">
      <div className="container">
        <SectionHeading
          eyebrow="GOVERNANCE &amp; LEADERSHIP"
          title="Committee"
          text="AI UNIVERSE–2028 governance structure comprising General Chairs, Technical Programme Committee, Advisory Boards, and Organizing Secretaries."
        />

        <div className="committee-cards-grid">
          {committeeStructure.map((item, idx) => (
            <motion.article
              className="committee-card"
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
            >
              <div className="committee-icon">
                <Users size={19} aria-hidden="true" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="committee-directory-note">
          <div>
            <strong>Committee &amp; Keynote Announcements</strong>
            <p>
              Detailed chair appointments, International Advisory rosters, and invited keynote speaker
              profiles will be announced separately on the official conference portal.
            </p>
          </div>
          <a className="btn btn-outline-dark" href="#papers">
            View Call for Papers
          </a>
        </div>
      </div>
    </section>
  );
}
