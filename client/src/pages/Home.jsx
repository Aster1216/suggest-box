import React from 'react'

export default function Home({ t }) {
  const services = [
    { title: t.population, desc: t.populationDesc },
    { title: t.economic, desc: t.economicDesc },
    { title: t.agriculture, desc: t.agricultureDesc },
    { title: t.social, desc: t.socialDesc },
    { title: t.environment, desc: t.environmentDesc },
  ]

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{t.welcome}</h1>
          <p>{t.heroSubtitle}</p>
        </div>
      </section>

      <section className="services-section">
        <h2 className="services-title">{t.ourServices}</h2>
        <div className="service-grid">
          {services.map((s, i) => (
            <article key={i} className="card" aria-labelledby={`service-${i}`}>
              <h3 id={`service-${i}`}>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
