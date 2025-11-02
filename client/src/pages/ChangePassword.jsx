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
  const [strengthMsg, setStrengthMsg] = useState("");

  // ✅ Password strength check
  const validatePasswordStrength = (password) => {
    const minLength = /.{8,}/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password))
      return "Password must be at least 8 characters long.";
    if (!upperCase.test(password))
      return "Include at least one uppercase letter.";
    if (!lowerCase.test(password))
      return "Include at least one lowercase letter.";
    if (!number.test(password)) return "Include at least one number.";
    if (!specialChar.test(password))
      return "Include at least one special character (!@#$%^&*).";

    return ""; // ✅ Strong password
  };

  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
    const msg = validatePasswordStrength(value);
    setStrengthMsg(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // ✅ Check strength
    const strengthError = validatePasswordStrength(newPassword);
    if (strengthError) {
      setError(strengthError);
      return;
    }

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
        setStrengthMsg("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          t?.changePasswordFail ||
          "Error changing password. Try again."
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
              onChange={(e) => handleNewPasswordChange(e.target.value)}
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
          {/* ✅ Show live password strength feedback */}
          {strengthMsg ? (
            <p className="error-msg small-text">{strengthMsg}</p>
          ) : (
            newPassword && (
              <p className="success-msg small-text">Strong password ✅</p>
            )
          )}
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

        <button
          type="submit"
          className="change-password-btn"
          disabled={!!validatePasswordStrength(newPassword)} // ❌ disable if weak
        >
          {t?.updatePasswordBtn || "Update Password"}
        </button>

        {message && <p className="success-msg">{message}</p>}
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
}
