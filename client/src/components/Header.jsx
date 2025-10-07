import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Header({ lang, setLang, t }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true)
    }
  }, [])

  const navStyle = ({ isActive }) => ({
    color: isActive ? "var(--accent)" : "#fff"
  })

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("bureau")
    setIsLoggedIn(false)
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
          <NavLink to="/" style={navStyle}>{t.home}</NavLink>
          <NavLink to="/submit" style={navStyle}>{t.suggestion}</NavLink>
          <NavLink to="/public" style={navStyle}>{t.public}</NavLink>
          <NavLink to="/contact" style={navStyle}>{t.contact}</NavLink>
          {isLoggedIn && (
            <NavLink to="/dashboard" style={navStyle}>{t.dashboard || "Dashboard"}</NavLink>
          )}

          {/* Language toggle */}
          <button className="lang-btn" onClick={() => setLang(lang === "en" ? "am" : "en")}>
            {t.language}
          </button>

          {/* Logout only (no login) */}
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
          <NavLink to="/" style={navStyle} onClick={() => setMenuOpen(false)}>{t.home}</NavLink>
          <NavLink to="/submit" style={navStyle} onClick={() => setMenuOpen(false)}>{t.suggestion}</NavLink>
          <NavLink to="/public" style={navStyle} onClick={() => setMenuOpen(false)}>{t.public}</NavLink>
          <NavLink to="/contact" style={navStyle} onClick={() => setMenuOpen(false)}>{t.contact}</NavLink>
          {isLoggedIn && (
            <NavLink to="/dashboard" style={navStyle} onClick={() => setMenuOpen(false)}>
              {t.dashboard || "Dashboard"}
            </NavLink>
          )}
          <button
            className="lang-btn"
            onClick={() => {
              setLang(lang === "en" ? "am" : "en")
              setMenuOpen(false)
            }}
          >
            {t.language}
          </button>
          {isLoggedIn && (
            <button className="logout-btn" onClick={handleLogout}>
              {lang === "en" ? "Logout" : "ውጣ"}
            </button>
          )}
        </div>
      )}
    </header>
  )
}
