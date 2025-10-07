import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container">
        {/* Quick Links */}
        <div className="quick-links">
          <h3>{t.quickLinks}</h3>
          <Link to="/">{t.home}</Link>
          <Link to="/submit">{t.suggestion}</Link>
          <Link to="/public">{t.public}</Link>
          <Link to="/contact">{t.contact}</Link>
        </div>

        {/* Contact Info */}
        <div className="contact">
          <h3>{t.contactUs}</h3>
          <p>Ethiopian Statistics Service</p>
          <p>{t.phone}: +251942215916</p>
          <p>{t.email}: info@ethiostat.gov.et</p>
        </div>
      </div>

      <div className="footer-bottom">
        {t.rights}
      </div>
    </footer>
  );
}
