import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ChangePassword({ t }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError(t?.passwordsDontMatch || "Passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/auth/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setMessage(t?.changePasswordSuccess || "Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || t?.changePasswordFail || "Error changing password. Try again."
      );
    }
  };

  return (
    <div className="change-password-container">
      <h2>{t?.changePasswordTitle || "Change Password"}</h2>

      <form onSubmit={handleSubmit} className="change-password-form">
        {/* Old Password */}
        <div className="form-group">
          <label>{t?.oldPassword || "Old Password"}</label>
          <div className="password-container">
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              placeholder={t?.oldPassword || "Enter old password"}
            />
            <span
              className="password-toggle"
              onClick={() => setShowOld(!showOld)}
            >
              {showOld ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* New Password */}
        <div className="form-group">
          <label>{t?.newPassword || "New Password"}</label>
          <div className="password-container">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder={t?.newPassword || "Enter new password"}
            />
            <span
              className="password-toggle"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="form-group">
          <label>{t?.confirmNewPassword || "Confirm New Password"}</label>
          <div className="password-container">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder={t?.confirmNewPassword || "Re-enter new password"}
            />
            <span
              className="password-toggle"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit" className="change-password-btn">
          {t?.updatePasswordBtn || "Update Password"}
        </button>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}
