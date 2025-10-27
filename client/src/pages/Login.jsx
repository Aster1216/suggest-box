import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login({ lang, API_BASE, onSuccess, onCancel }) {
  const [bureaus, setBureaus] = useState([]);
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load bureaus from API
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/bureaus`);
        if (!res.ok) throw new Error("Failed to fetch bureaus");
        const data = await res.json();
        setBureaus(data);
      } catch (err) {
        console.error("Error fetching bureaus:", err);
      }
    }
    load();
  }, [API_BASE]);

  // Auto-fill email when office changes
  useEffect(() => {
    if (office) {
      const bureau = bureaus.find((b) => b.key === office);
      if (bureau) setEmail(bureau.email || "");
    } else {
      setEmail("");
    }
  }, [office, bureaus]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ office, email, password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("bureau", JSON.stringify(data.bureau));
        onSuccess(data);
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{lang === "en" ? "Login" : "ግባ"}</h2>

        <form onSubmit={handleSubmit}>
          {/* Office Dropdown */}
          <label>
            <span>{lang === "en" ? "Select Office" : "ቢሮ ይምረጡ"}</span>
            <select
              value={office}
              onChange={(e) => setOffice(e.target.value)}
              required
            >
              <option value="">
                {lang === "en" ? "Choose..." : "ይምረጡ..."}
              </option>
              {bureaus.map((b) => (
                <option key={b.key} value={b.key}>
                  {lang === "en" ? b.name_en : b.name_am}
                </option>
              ))}
            </select>
          </label>

          {/* Email */}
          <label>
            <span>{lang === "en" ? "Bureau Email" : "ኢሜይል"}</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                lang === "en" ? "Enter bureau email" : "ኢሜይል ያስገቡ"
              }
              required
            />
          </label>

          {/* Password with Eye Toggle */}
          <label>
            <span>{lang === "en" ? "Password" : "የይለፍ ቃል"}</span>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  lang === "en" ? "Enter password" : "የይለፍ ቃል ያስገቡ"
                }
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </label>

          {/* Buttons */}
          <div className="btn-group">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading
                ? lang === "en"
                  ? "Logging in..."
                  : "በመግባት ላይ..."
                : lang === "en"
                ? "Login"
                : "ግባ"}
            </button>
            <button type="button" className="btn-secondary" onClick={onCancel}>
              {lang === "en" ? "Cancel" : "ሰርዝ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
