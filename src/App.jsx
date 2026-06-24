import { useState, useEffect } from "react";

const advisorsImg = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1280";
const strategyImg = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400";

const services = [
  { name: "Tax Advisory", desc: "Proactive structuring and year-round planning so tax stops being a surprise." },
  { name: "Bookkeeping", desc: "Clean books, on time, every month — with insights you can actually read." },
  { name: "Payroll", desc: "Fully compliant, perfectly timed. Your team paid, your obligations met." },
  { name: "CFO Advisory", desc: "A senior financial mind on call, without the senior financial salary." },
];

const industries = ["Technology", "Real Estate", "Healthcare", "E-Commerce", "Hospitality", "Professional Services"];

const reasons = [
  { k: "20+", v: "Years of advisory experience across Australian SMEs." },
  { k: "ATO", v: "Compliance expertise across federal and state obligations." },
  { k: "1:1", v: "A dedicated partner, not a rotating account manager." },
  { k: "AU", v: "All advice delivered locally, in plain English." },
];

const reviews = [
  { n: "Tara Burley", q: "Switching to Taxvisory was the easiest financial decision we've made all year. Sharp, calm, responsive." },
  { n: "Rohan Kher", q: "They translated tax law into a plan our whole leadership team could rally around. Genuinely strategic." },
  { n: "Bethany Walsh", q: "Our books finally make sense. The monthly call alone is worth the engagement." },
];

const contacts = [
  { k: "Email", v: "hello@taxvisory.com.au" },
  { k: "Office", v: "Level 12, Collins St, Melbourne VIC" },
  { k: "Hours", v: "Mon–Fri · 9:00 – 17:30 AEST" },
];

const sessionCards = [
  { t: "30 min", s: "Focused 1:1 time" },
  { t: "Tailored", s: "Built for your stage" },
  { t: "Actionable", s: "3 moves to make now" },
  { t: "No-pitch", s: "Advice, not a sales call" },
];

const styles = `
  @import url('https://rsms.me/inter/inter.css');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: oklch(0.995 0.002 90);
    --fg: oklch(0.18 0.01 260);
    --surface: oklch(0.97 0.004 90);
    --card: oklch(1 0 0);
    --muted: oklch(0.52 0.012 260);
    --border: oklch(0.91 0.006 90);
    --accent: oklch(0.72 0.13 55);
    --primary: oklch(0.18 0.012 260);
    --primary-fg: oklch(0.99 0.002 90);
    --font-display: "Inter", system-ui, sans-serif;
    --font-sans: "Inter", system-ui, sans-serif;
  }

  body {
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  a { text-decoration: none; color: inherit; }

  .container {
    width: 100%;
    max-width: 1120px;
    margin-inline: auto;
    padding-inline: 1.5rem;
  }

  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: oklch(0.995 0.002 90 / 0.75);
    border-bottom: 1px solid var(--border);
  }
  .nav-inner {
    display: flex;
    height: 56px;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.03em;
  }
  .logo-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--fg);
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-size: 13px;
    color: var(--muted);
    list-style: none;
  }
  .nav-links a:hover { color: var(--fg); transition: color 0.15s; }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 46px;
    padding-inline: 1.5rem;
    border-radius: 9999px;
    background: var(--primary);
    color: var(--primary-fg);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.01em;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08), 0 8px 24px -12px rgba(0,0,0,0.3);
    white-space: nowrap;
  }
  .btn:hover { transform: translateY(-1px); background: oklch(0.25 0.012 260); }
  .btn-sm { height: 36px; font-size: 13px; padding-inline: 1rem; }
  .btn-ghost { background: transparent; color: var(--fg); box-shadow: none; }
  .btn-ghost:hover { background: oklch(0.955 0.005 90); transform: none; }

  .hero { overflow: hidden; }
  .hero-inner { padding-block: 6rem 5rem; text-align: center; }
  @media (min-width: 768px) { .hero-inner { padding-block: 9rem 8rem; } }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 9999px;
    border: 1px solid var(--border);
    background: oklch(1 0 0 / 0.7);
    padding: 4px 12px;
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 2rem;
  }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

  .hero h1 { font-size: clamp(42px, 8vw, 88px); font-weight: 600; letter-spacing: -0.04em; line-height: 1.02; }
  .hero-sub { color: var(--muted); }
  .hero-desc { margin-top: 1.75rem; font-size: clamp(16px, 2vw, 19px); line-height: 1.65; color: var(--muted); max-width: 560px; margin-inline: auto; }
  .hero-ctas { margin-top: 2.5rem; display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }

  .hero-img-wrap { position: relative; max-width: 900px; margin: 5rem auto 0; }
  .hero-img-glow { position: absolute; inset-inline: 2.5rem; bottom: -1.5rem; height: 6rem; border-radius: 3rem; background: oklch(0.18 0.01 260 / 0.1); filter: blur(20px); }
  .hero-img-card { position: relative; overflow: hidden; border-radius: 2rem; border: 1px solid var(--border); background: var(--card); box-shadow: 0 30px 80px -30px rgba(0,0,0,0.2); }
  .hero-img-card img { width: 100%; height: 420px; object-fit: cover; object-position: top; display: block; }
  @media (min-width: 768px) { .hero-img-card img { height: 520px; } }
  .hero-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, oklch(0.995 0.002 90 / 0.4), transparent); }
  .hero-img-caption { position: absolute; bottom: 1.5rem; left: 1.5rem; right: 1.5rem; display: flex; align-items: flex-end; justify-content: space-between; text-align: left; }
  .hero-img-caption .eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: var(--muted); }
  .hero-img-caption h3 { font-size: clamp(20px, 3vw, 28px); font-weight: 600; letter-spacing: -0.03em; margin-top: 4px; }

  .section { padding-block: 6rem; }
  @media (min-width: 768px) { .section { padding-block: 8rem; } }
  .section-surface { background: var(--surface); }

  .section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 3rem; }
  .eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: var(--muted); margin-bottom: 0.75rem; }
  .section-header h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 600; letter-spacing: -0.035em; max-width: 480px; line-height: 1.05; }

  .services-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
  @media (min-width: 768px) { .services-grid { grid-template-columns: 1fr 1fr; } }

  .service-card { position: relative; overflow: hidden; border-radius: 1.5rem; border: 1px solid var(--border); background: var(--card); padding: 2rem 2.5rem; transition: box-shadow 0.25s ease, transform 0.25s ease; cursor: default; }
  .service-card:hover { box-shadow: 0 20px 60px -30px rgba(0,0,0,0.2); transform: translateY(-2px); }
  .service-card-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .service-num { font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; }
  .service-arrow { width: 36px; height: 36px; border-radius: 50%; background: var(--fg); color: var(--primary-fg); display: grid; place-items: center; font-size: 14px; transition: transform 0.25s ease; }
  .service-card:hover .service-arrow { transform: rotate(45deg); }
  .service-card h3 { margin-top: 2.5rem; font-size: clamp(22px, 2.5vw, 28px); font-weight: 600; letter-spacing: -0.035em; }
  .service-card p { margin-top: 0.75rem; color: var(--muted); line-height: 1.65; max-width: 380px; }

  .approach-grid { display: grid; gap: 3rem; align-items: center; }
  @media (min-width: 768px) { .approach-grid { grid-template-columns: 1fr 1fr; } }
  .approach-img { aspect-ratio: 5/6; overflow: hidden; border-radius: 2rem; border: 1px solid var(--border); }
  .approach-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .approach-text h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 600; letter-spacing: -0.035em; line-height: 1.05; }
  .approach-text p { margin-top: 1.5rem; font-size: 17px; color: var(--muted); line-height: 1.65; }
  .reasons-grid { margin-top: 2.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .reason { border-top: 1px solid var(--border); padding-top: 1rem; }
  .reason-key { font-size: 30px; font-weight: 600; letter-spacing: -0.03em; }
  .reason p { margin-top: 8px; font-size: 14px; color: var(--muted); line-height: 1.6; }

  .industries-center { text-align: center; }
  .industries-center h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 600; letter-spacing: -0.035em; max-width: 600px; margin-inline: auto; line-height: 1.05; }
  .industry-pills { margin-top: 3.5rem; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
  .pill { border-radius: 9999px; border: 1px solid var(--border); background: var(--card); padding: 10px 20px; font-size: 14px; cursor: default; transition: background 0.2s ease, color 0.2s ease; }
  .pill:hover { background: var(--fg); color: var(--primary-fg); }

  .cta-banner { position: relative; overflow: hidden; border-radius: 2.5rem; background: var(--fg); color: var(--primary-fg); padding: 2.5rem; }
  @media (min-width: 768px) { .cta-banner { padding: 4rem; } }
  .cta-glow { position: absolute; right: -8rem; top: -8rem; width: 24rem; height: 24rem; border-radius: 50%; background: oklch(0.72 0.13 55 / 0.3); filter: blur(60px); pointer-events: none; }
  .cta-inner { position: relative; display: grid; gap: 3rem; align-items: center; }
  @media (min-width: 768px) { .cta-inner { grid-template-columns: 1fr 1fr; } }
  .cta-eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: oklch(1 0 0 / 0.6); margin-bottom: 1rem; }
  .cta-banner h2 { font-size: clamp(32px, 5vw, 56px); font-weight: 600; letter-spacing: -0.035em; line-height: 1.05; }
  .cta-banner p { margin-top: 1.5rem; color: oklch(1 0 0 / 0.7); font-size: 17px; line-height: 1.65; max-width: 380px; }
  .btn-cta { display: inline-flex; align-items: center; height: 48px; padding-inline: 1.5rem; border-radius: 9999px; background: var(--primary-fg); color: var(--fg); font-size: 15px; font-weight: 500; margin-top: 2rem; transition: transform 0.2s ease; border: none; cursor: pointer; text-decoration: none; }
  .btn-cta:hover { transform: scale(1.02); }
  .cta-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .cta-card { border-radius: 1rem; background: oklch(1 0 0 / 0.05); border: 1px solid oklch(1 0 0 / 0.1); padding: 1.5rem; }
  .cta-card-title { font-size: 22px; font-weight: 600; letter-spacing: -0.03em; }
  .cta-card p { margin-top: 4px; font-size: 14px; color: oklch(1 0 0 / 0.6); }

  .reviews-header { text-align: center; margin-bottom: 3.5rem; }
  .stars { color: var(--accent); font-size: 16px; letter-spacing: 4px; }
  .reviews-header .stars-line { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; color: var(--muted); }
  .reviews-header h2 { margin-top: 1.25rem; font-size: clamp(32px, 4vw, 48px); font-weight: 600; letter-spacing: -0.035em; }
  .reviews-grid { display: grid; gap: 1rem; }
  @media (min-width: 768px) { .reviews-grid { grid-template-columns: repeat(3, 1fr); } }
  .review-card { border-radius: 1.5rem; border: 1px solid var(--border); background: var(--card); padding: 2rem; display: flex; flex-direction: column; }
  .review-card blockquote { flex: 1; font-size: 15px; line-height: 1.7; margin-top: 1rem; }
  .review-footer { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .review-name { font-size: 14px; font-weight: 500; }
  .review-source { font-size: 12px; color: var(--muted); }

  .contact-section { text-align: center; }
  .contact-section h2 { font-size: clamp(42px, 7vw, 72px); font-weight: 600; letter-spacing: -0.04em; line-height: 1.02; }
  .contact-section p { margin-top: 1.5rem; font-size: 18px; color: var(--muted); max-width: 480px; margin-inline: auto; line-height: 1.65; }
  .contact-ctas { margin-top: 2.5rem; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
  .contact-cards { margin-top: 4rem; display: grid; gap: 1rem; }
  @media (min-width: 768px) { .contact-cards { grid-template-columns: repeat(3, 1fr); } }
  .contact-card { border-radius: 1rem; border: 1px solid var(--border); background: var(--card); padding: 1.5rem; text-align: left; }
  .contact-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: var(--muted); }
  .contact-value { margin-top: 8px; font-size: 15px; }

  .footer { border-top: 1px solid var(--border); padding-block: 3rem; }
  .footer-inner { display: flex; flex-direction: column; gap: 1.5rem; align-items: center; font-size: 14px; color: var(--muted); }
  @media (min-width: 768px) { .footer-inner { flex-direction: row; justify-content: space-between; } }
  .footer-brand { display: flex; align-items: center; gap: 8px; }
  .footer-brand strong { color: var(--fg); font-weight: 500; }
  .footer-links { display: flex; align-items: center; gap: 1.5rem; }
  .footer-links a:hover { color: var(--fg); transition: color 0.15s; }

  @media (max-width: 767px) {
    .nav-links, .nav-desktop-btn { display: none; }
    .section-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
  }
`;

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <header className="nav" style={{ boxShadow: scrolled ? "0 1px 0 var(--border)" : "none" }}>
        <div className="container nav-inner">
          <a href="#" className="logo">
            <span className="logo-dot" />
            Taxvisory
          </a>
          <ul className="nav-links">
            {["Services", "Approach", "Industries", "Reviews", "Contact"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-sm nav-desktop-btn">Book a call</a>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-inner">
          <div className="badge">
            <span className="badge-dot" />
            Now accepting FY26 strategy sessions
          </div>
          <h1>
            Tax, simplified.
            <br />
            <span className="hero-sub">Strategy, amplified.</span>
          </h1>
          <p className="hero-desc">
            Taxvisory is a modern advisory firm for ambitious Australian businesses — from structuring and compliance to long-term financial strategy.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="btn">Book a free 30‑min session</a>
            <a href="#services" className="btn btn-ghost">Explore services →</a>
          </div>
          <div className="hero-img-wrap">
            <div className="hero-img-glow" />
            <div className="hero-img-card">
              <img src={advisorsImg} alt="Taxvisory advisors" />
              <div className="hero-img-overlay" />
              <div className="hero-img-caption">
                <div>
                  <p className="eyebrow">Smart accounting</p>
                  <h3>For a brighter tomorrow.</h3>
                </div>
                <a href="#contact" className="btn btn-sm">Get started</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Four disciplines. One financial partner.</h2>
            </div>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <article key={s.name} className="service-card">
                <div className="service-card-top">
                  <span className="service-num">0{i + 1}</span>
                  <span className="service-arrow">↗</span>
                </div>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="section section-surface">
        <div className="container">
          <div className="approach-grid">
            <div className="approach-img">
              <img src={strategyImg} alt="Strategy" loading="lazy" />
            </div>
            <div className="approach-text">
              <p className="eyebrow">The approach</p>
              <h2>A fresh outlook on how to actually operate a business.</h2>
              <p>We don't just file returns. We sit beside founders and finance teams to design structures that scale, decisions that compound, and reporting that tells the truth — fast.</p>
              <div className="reasons-grid">
                {reasons.map((r) => (
                  <div key={r.k} className="reason">
                    <div className="reason-key">{r.k}</div>
                    <p>{r.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="industries" className="section">
        <div className="container industries-center">
          <p className="eyebrow">Industries we serve</p>
          <h2>Specialists across the sectors driving Australia forward.</h2>
          <div className="industry-pills">
            {industries.map((ind) => (
              <span key={ind} className="pill">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-surface">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-glow" />
            <div className="cta-inner">
              <div>
                <p className="cta-eyebrow">Complimentary</p>
                <h2>Free 30‑minute strategy session.</h2>
                <p>Sit down with a senior advisor. Walk away with three actionable moves you can make this quarter — no obligations.</p>
                <a href="#contact" className="btn-cta">Reserve your session</a>
              </div>
              <div className="cta-cards">
                {sessionCards.map((c) => (
                  <div key={c.t} className="cta-card">
                    <div className="cta-card-title">{c.t}</div>
                    <p>{c.s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="section">
        <div className="container">
          <div className="reviews-header">
            <div className="stars-line">
              <span className="stars">★★★★★</span>
              <span>Excellent · Verified Google reviews</span>
            </div>
            <h2>Don't just take our word for it.</h2>
          </div>
          <div className="reviews-grid">
            {reviews.map((r) => (
              <figure key={r.n} className="review-card">
                <span className="stars">★★★★★</span>
                <blockquote>"{r.q}"</blockquote>
                <div className="review-footer">
                  <span className="review-name">{r.n}</span>
                  <span className="review-source">via Google</span>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container" style={{ maxWidth: 720 }}>
          <h2>
            Ready to grow
            <br />
            <span style={{ color: "var(--muted)" }}>with clarity?</span>
          </h2>
          <p>Book a complimentary session and meet the team that's quietly reshaping advisory in Australia.</p>
          <div className="contact-ctas">
            <a href="mailto:hello@taxvisory.com.au" className="btn">Book an appointment</a>
            <a href="tel:+61391234567" className="btn btn-ghost">Call (03) 9123 4567</a>
          </div>
          <div className="contact-cards">
            {contacts.map((c) => (
              <div key={c.k} className="contact-card">
                <p className="contact-label">{c.k}</p>
                <p className="contact-value">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="logo-dot" />
            <strong>Taxvisory</strong>
            <span>· Chartered Accountants ANZ · Tax Agent 26294148</span>
          </div>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">© {new Date().getFullYear()}</a>
          </div>
        </div>
      </footer>
    </>
  );
}