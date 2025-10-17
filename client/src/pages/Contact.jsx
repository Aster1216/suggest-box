import React, { useState } from "react";


export default function Contact({ t }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "+251",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\+251[0-9]{8,12}$/.test(formData.phone.replace(/\s+/g, "")))
      newErrors.phone = "Enter a valid Ethiopian phone number.";

    if (!formData.message.trim())
      newErrors.message = "Please enter your message.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("✅ Message sent successfully!");
      setFormData({ fullName: "", email: "", phone: "+251", message: "" });
    }
  };

  return (
    <div className="contact-page">
      <h2 className="contact-title">{t.contactUs}</h2>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          placeholder="+2519XXXXXXXX"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label>Message</label>
        <textarea
          name="message"
          placeholder="Say hello to us"
          value={formData.message}
          onChange={handleChange}
          rows="4"
        ></textarea>
        {errors.message && <p className="error">{errors.message}</p>}

        <button type="submit" className="send-btn">
          Send Message
        </button>
      </form>

      {/* Contact Info */}
      <div className="contact-info">
        <h3>contact info</h3>
        <p>
          <strong>Address</strong>
          <br />
          Churchill Road, Addis Ababa
        </p>
        <p>
          <strong>Tele</strong>
          <br />
          +251-11553112, +251-11553011
        </p>
        <p>
          <strong>P.O.Box</strong>
          <br />
          1143
        </p>
        <p>
          <strong>Email</strong>
          <br />
          <a href="mailto:info@ess.gov.et">info@ess.gov.et</a>
        </p>
      </div>
    </div>
  );
}
