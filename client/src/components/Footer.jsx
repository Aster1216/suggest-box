import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTelegram } from "react-icons/fa";

export default function Footer({ t }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Quick Links */}
        <div className="quick-links">
          <h3>Quick Links</h3>
          <Link to="/">{t.home}</Link>
          <Link to="/submit">{t.suggestion}</Link>
          <Link to="/public">{t.public}</Link>
          <Link to="/contact">{t.contact}</Link>
        </div>

        {/* Contact Info */}
        <div className="contact">
          <h3>HEADQUARTERS</h3>
          <p>Churchill Road, Addis Ababa</p>
          <p>Tele: +251-11553112, +251-11553011</p>
          <p>P.O.Box: 1143</p>
          <p>Email: info@ess.gov.et</p>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <h3>Follow Us</h3>
          <div className="icons">
            <a
              href="https://www.facebook.com/essethiopia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://t.me/ess_statistics"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {currentYear} Ethiopian Statistics Service. All rights reserved.
      </div>
    </footer>
  );
}
