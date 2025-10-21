import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header({ lang, setLang, t }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const navStyle = ({ isActive }) => ({
    color: isActive ? "var(--accent)" : "#fff",
  });

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("bureau");
    setIsLoggedIn(false);
    navigate("/"); // ✅ Redirect to home after logout
  }

  function handleChangePasswordClick() {
    // ✅ Toggle the visibility and navigate only when showing
    if (showChangePassword) {
      navigate("/"); // hide -> go home
      setShowChangePassword(false);
    } else {
      navigate("/change-password");
      setShowChangePassword(true);
    }
  }

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Brand */}
        <div className="brand">
          <img src={logo} alt="Ethiopian Statistical Service Logo" className="logo" />
          <div className="brand-text">
            <div className="brand-title">Ethiopian Statistical Service</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="nav" role="navigation">
          <NavLink to="/" style={navStyle}>
            {t.home}
          </NavLink>
          <NavLink to="/submit" style={navStyle}>
            {t.suggestion}
          </NavLink>
          <NavLink to="/public" style={navStyle}>
            {t.public}
          </NavLink>
          <NavLink to="/contact" style={navStyle}>
            {t.contact}
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink to="/dashboard" style={navStyle}>
                {t.dashboard || "Dashboard"}
              </NavLink>
              <button className="change-pass-btn" onClick={handleChangePasswordClick}>
                {lang === "en" ? "Change Password" : "የይለፍ ቃል ቀይር"}
              </button>
            </>
          )}

          {/* Language toggle */}
          <button
            className="lang-btn"
            onClick={() => setLang(lang === "en" ? "am" : "en")}
          >
            {t.language}
          </button>

          {isLoggedIn && (
            <button className="logout-btn" onClick={handleLogout}>
              {lang === "en" ? "Logout" : "ውጣ"}
            </button>
          )}
        </nav>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="mobile-nav container">
          <NavLink to="/" style={navStyle} onClick={() => setMenuOpen(false)}>
            {t.home}
          </NavLink>
          <NavLink to="/submit" style={navStyle} onClick={() => setMenuOpen(false)}>
            {t.suggestion}
          </NavLink>
          <NavLink to="/public" style={navStyle} onClick={() => setMenuOpen(false)}>
            {t.public}
          </NavLink>
          <NavLink to="/contact" style={navStyle} onClick={() => setMenuOpen(false)}>
            {t.contact}
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink
                to="/dashboard"
                style={navStyle}
                onClick={() => setMenuOpen(false)}
              >
                {t.dashboard || "Dashboard"}
              </NavLink>
              <button
                className="change-pass-btn"
                onClick={() => {
                  handleChangePasswordClick();
                  setMenuOpen(false);
                }}
              >
                {lang === "en" ? "Change Password" : "የይለፍ ቃል ቀይር"}
              </button>
            </>
          )}

          <button
            className="lang-btn"
            onClick={() => {
              setLang(lang === "en" ? "am" : "en");
              setMenuOpen(false);
            }}
          >
            {t.language}
          </button>

          {isLoggedIn && (
            <button
              className="logout-btn"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              {lang === "en" ? "Logout" : "ውጣ"}
            </button>
          )}
        </div>
      )}
    </header>
  );
}
