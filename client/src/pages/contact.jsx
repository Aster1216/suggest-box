import React from 'react'

export default function Contact({ t }) {
  return (
    <div className="container" style={{ padding: 28 }}>
      <h2>{t.contactUs}</h2>
      <p>{t.contactHelp}</p>
      <p><strong>Ethiopian Statistics Service</strong></p>
      <p>{t.phone}: +251942215916</p>
      <p>{t.email}: <a href="mailto:info@ethiostat.gov.et">info@ethiostat.gov.et</a></p>
    </div>
  )
}
