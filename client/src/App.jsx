import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SuggestionBox from "./pages/SuggestionBox";
import PublicSuggestions from "./pages/PublicSuggestions";
import Contact from "/src./pages/Contact.jsx";
;
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"; // ✅ Import your Login page
import translations from "./translations";

export default function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  return (
    <div className="app-root" style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header lang={lang} setLang={setLang} t={t} />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/submit" element={<SuggestionBox t={t} lang={lang} />} />
          <Route path="/public" element={<PublicSuggestions t={t} lang={lang} />} />
          <Route path="/contact" element={<Contact t={t} />} />
          <Route path="/dashboard" element={<Dashboard t={t} lang={lang} />} />
          <Route
            path="/login"
            element={<Login lang={lang} API_BASE={API_BASE} onSuccess={() => window.location.href = "/dashboard"} />}
          />
          <Route
            path="*"
            element={
              <div style={{ padding: 40, textAlign: "center" }}>
                <h2>404 · Not found</h2>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer t={t} />
    </div>
  );
}
