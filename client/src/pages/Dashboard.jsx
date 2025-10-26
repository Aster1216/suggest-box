import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ t, lang }) {
  const [bureau, setBureau] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const bureauData = localStorage.getItem("bureau");

    if (!token || !bureauData) {
      navigate("/login", { replace: true });
      return;
    }

    setBureau(JSON.parse(bureauData));

    async function loadSuggestions() {
      try {
        const res = await fetch(`${API_BASE}/suggestions/bureau`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("bureau");
          navigate("/login", { replace: true });
          return;
        }

        if (!res.ok) throw new Error("Failed to load suggestions");
        const data = await res.json();
        setSuggestions(data.suggestions || []);
        setTotal(data.total || 0); // ✅ Automatically updates
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    }

    loadSuggestions();

    const checkTokenInterval = setInterval(() => {
      if (!localStorage.getItem("token")) navigate("/login", { replace: true });
    }, 1000);

    return () => clearInterval(checkTokenInterval);
  }, [API_BASE, navigate]);

  return (
    <div style={{ padding: "20px" }}>
      {bureau && <h2>{lang === "en" ? bureau.name_en : bureau.name_am}</h2>}

      <h3>{t.yourSuggestions}</h3>

      {suggestions.length > 0 ? (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ background: "#f4f4f4" }}>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>#</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {t.suggestionCol}
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {t.dateCol}
                </th>
              </tr>
            </thead>
            <tbody>
              {suggestions.map((s, idx) => (
                <tr key={s._id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {idx + 1}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {s.message}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {new Date(s.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Total Suggestions Box at the bottom */}
          <div
            style={{
              background: "#f0f4ff",
              borderRadius: "10px",
              padding: "15px 25px",
              display: "inline-block",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              marginTop: "20px",
            }}
          >
            <h3 style={{ margin: 0, color: "#003366" }}>
              {t.totalSuggestions || "Total Suggestions"}
            </h3>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#0066cc",
                margin: "5px 0 0 0",
              }}
            >
              {total}
            </p>
          </div>
        </>
      ) : (
        <p>{t.noSuggestions}</p>
      )}
    </div>
  );
}
