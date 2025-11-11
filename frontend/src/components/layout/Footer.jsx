/* src/components/layout/Footer.jsx */
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import "../../style/tenant-profile.scss";

const Footer = () => {
  return (
    <footer className="stat-card mt-5 p-5">
      <div className="container">
        <div className="row g-4 text-light">
          <div className="col-md-4">
            <h1 className="username mb-3">HomeQuest</h1>
            <div className="d-flex gap-3 mb-3">
              <InstagramIcon className="text-accent" fontSize="large" />
              <TwitterIcon className="text-accent" fontSize="large" />
              <FacebookIcon className="text-accent" fontSize="large" />
            </div>
            <ul className="list-unstyled small text-muted">
              <li>Phone: +91 98753-04467</li>
              <li>Email: LodgingGood@haus.com</li>
            </ul>
          </div>

          {[
            { title: "About", links: ["Services", "Packages", "Docs"] },
            { title: "Goals", links: ["Legal", "Community", "Team"] },
            { title: "Users", links: ["Developers", "Freelancers", "Enthusiasts", "HealthFolk"] },
          ].map((col, i) => (
            <div className="col-md-2" key={i}>
              <h5 className="fw-bold text-light mb-3">{col.title}</h5>
              <ul className="list-unstyled small text-muted">
                {col.links.map((link, j) => (
                  <li key={j} className="mb-1">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="border-secondary my-4" />
        <p className="text-center text-muted small mb-0">
          © 2025 HomeQuest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;