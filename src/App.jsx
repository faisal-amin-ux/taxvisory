import { useState, useEffect, useRef } from "react";

/* ── DATA ─────────────────────────────────────────── */
const projects = [
  {
    id: "01",
    title: "Cordel Health",
    sub: "@ Modalys",
    type: "Healthcare SaaS",
    desc: "Led end-to-end design of an occupational healthcare SaaS — IA and user flows across 4 core modules to a full design system. Simplified complex org structures and employee onboarding.",
    stat: "4 modules shipped",
    tags: ["Healthcare", "SaaS", "Design System"],
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80",
    grad: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
  },
  {
    id: "02",
    title: "Packely",
    sub: "",
    type: "Startup · Web App",
    desc: "Built from scratch — user personas, paper wireframes, high-fidelity UI for a packaging visualisation platform targeting e-commerce brands.",
    stat: "1.6× revenue increase",
    tags: ["Packaging", "3D Rendering", "Web App"],
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80",
    grad: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
  },
  {
    id: "03",
    title: "OctiLearn",
    sub: "",
    type: "EdTech Platform",
    desc: "Redesigned sign-up flow, flashcards, and AI integration for an O/A-Level e-learning platform. Cut sign-up from 8 steps to 2.",
    stat: "3,000 pre-launch sign-ups",
    tags: ["EdTech", "Conversion", "Mobile"],
    img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900&q=80",
    grad: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
  },
  {
    id: "04",
    title: "Alpherra",
    sub: "Previously Fab AI",
    type: "AI · CAD SaaS",
    desc: "Integrated into Solidworks — an AI solution to read CAD drawings and run feasibility tests. Engineer-first interface achieving 93% AI accuracy.",
    stat: "93% AI accuracy",
    tags: ["AI", "SaaS", "B2B"],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    grad: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
  },
];

const tools = [
  { name: "Figma", cat: "Design", logo: `<svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 28.5C19 23.8056 22.8056 20 27.5 20C32.1944 20 36 23.8056 36 28.5C36 33.1944 32.1944 37 27.5 37C22.8056 37 19 33.1944 19 28.5Z" fill="#1ABCFE"/><path d="M2 47C2 42.3056 5.80558 38.5 10.5 38.5H19V47C19 51.6944 15.1944 55.5 10.5 55.5C5.80558 55.5 2 51.6944 2 47Z" fill="#0ACF83"/><path d="M19 2V20H27.5C32.1944 20 36 16.1944 36 11.5C36 6.80558 32.1944 3 27.5 3L19 2Z" fill="#FF7262"/><path d="M2 11.5C2 16.1944 5.80558 20 10.5 20H19V3H10.5C5.80558 3 2 6.80558 2 11.5Z" fill="#F24E1E"/><path d="M2 28.5C2 33.1944 5.80558 37 10.5 37H19V20H10.5C5.80558 20 2 23.8056 2 28.5Z" fill="#A259FF"/></svg>` },
  { name: "FigJam", cat: "Collab", logo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#FFD166"/><path d="M20 10C20 10 12 16 12 23C12 27.4183 15.5817 31 20 31C24.4183 31 28 27.4183 28 23C28 16 20 10 20 10Z" fill="#FF6B35"/><circle cx="20" cy="23" r="4" fill="#FFD166"/></svg>` },
  { name: "Framer", cat: "Prototype", logo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#0A0A0A"/><path d="M10 10H30V20H20L30 30H20V40L10 30V20H20L10 10Z" fill="white"/></svg>` },
  { name: "Illustrator", cat: "Graphics", logo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="6" fill="#300000"/><text x="5" y="30" font-size="22" font-weight="900" fill="#FF9A00" font-family="serif">Ai</text></svg>` },
  { name: "Miro", cat: "Research", logo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#FFD02F"/><text x="6" y="28" font-size="18" font-weight="900" fill="#050038" font-family="sans-serif">M</text></svg>` },
  { name: "Notion", cat: "Docs", logo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#fff" stroke="#e5e5e5"/><path d="M12 10h12l6 6v20H12V10z" fill="#fff" stroke="#111" stroke-width="1.5"/><path d="M24 10v6h6" fill="none" stroke="#111" stroke-width="1.5"/><rect x="15" y="18" width="10" height="1.5" rx="0.75" fill="#111"/><rect x="15" y="22" width="8" height="1.5" rx="0.75" fill="#111"/><rect x="15" y="26" width="9" height="1.5" rx="0.75" fill="#111"/></svg>` },
  { name: "Slack", cat: "Comms", logo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#fff"/><path d="M14 22a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3h3v3z" fill="#E01E5A"/><path d="M15.5 22a3 3 0 013-3 3 3 0 013 3v7.5a3 3 0 01-3 3 3 3 0 01-3-3V22z" fill="#E01E5A"/><path d="M18.5 14a3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3v3h-3z" fill="#36C5F0"/><path d="M18.5 15.5a3 3 0 013 3 3 3 0 01-3 3H11a3 3 0 01-3-3 3 3 0 013-3h7.5z" fill="#36C5F0"/><path d="M26.5 18.5a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3v-3h3z" fill="#2EB67D"/><path d="M25 18.5a3 3 0 01-3-3 3 3 0 013-3h7.5a3 3 0 013 3 3 3 0 01-3 3H25z" fill="#2EB67D"/><path d="M22 26.5a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3v-3h3z" fill="#ECB22E"/><path d="M22 25a3 3 0 01-3-3 3 3 0 013-3h7.5a3 3 0 013 3 3 3 0 01-3 3H22z" fill="#ECB22E"/></svg>` },
  { name: "ClickUp", cat: "PM", logo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#7B68EE"/><path d="M10 26l5-6 5 5 5-7 5 4" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>` },
  { name: "Lottiefiles", cat: "Motion", logo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#00DDB3"/><circle cx="20" cy="20" r="7" stroke="#fff" stroke-width="2.5" fill="none"/><circle cx="20" cy="20" r="3" fill="#fff"/></svg>` },
  { name: "Jitter", cat: "Motion", logo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#111"/><path d="M13 14h14M13 20h10M13 26h12" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><circle cx="29" cy="20" r="3" fill="#6EE7B7"/></svg>` },
];

const processSteps = [
  { num: "01", name: "Understand", desc: "Research, stakeholder interviews, real user needs. The problem before the pixels.", visual: "understand" },
  { num: "02", name: "Define", desc: "Information architecture, sitemaps, user flows. Structure is design.", visual: "define" },
  { num: "03", name: "Design", desc: "Wireframes to high-fidelity. Accessible, responsive, handoff-ready.", visual: "design" },
  { num: "04", name: "Ship", desc: "Close dev collaboration until the product matches the intent.", visual: "ship" },
];

/* ── B&W ANIMATED VISUALS ─────────────────────────── */
function VisualUnderstand({ active }) {
  return (
    <svg viewBox="0 0 160 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        .mag { animation: ${active ? "magMove 2s ease-in-out infinite" : "none"}; }
        @keyframes magMove { 0%,100%{transform:translate(0,0)} 50%{transform:translate(14px,10px)} }
        .scan { animation: ${active ? "scanPulse 2s ease-in-out infinite" : "none"}; }
        @keyframes scanPulse { 0%,100%{opacity:0.15} 50%{opacity:0.55} }
        .dot-pop { animation: ${active ? "dotPop 2s ease-in-out infinite" : "none"}; }
        @keyframes dotPop { 0%,100%{r:2;opacity:0.3} 50%{r:4;opacity:1} }
      `}</style>
      {[25,42,59,76,93].map(y => <line key={y} x1="14" y1={y} x2="146" y2={y} stroke="white" strokeOpacity="0.08" strokeWidth="0.8"/>)}
      {[30,55,80,105,130].map(x => <line key={x} x1={x} y1="14" x2={x} y2="106" stroke="white" strokeOpacity="0.08" strokeWidth="0.8"/>)}
      <line className="scan" x1="14" y1="42" x2="146" y2="42" stroke="white" strokeWidth="1" strokeDasharray="5 4"/>
      <g className="mag" style={{transformOrigin:"80px 58px"}}>
        <circle cx="72" cy="55" r="22" stroke="white" strokeWidth="2.5" fill="none" strokeOpacity="0.9"/>
        <line x1="88" y1="71" x2="104" y2="87" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="62" y1="55" x2="82" y2="55" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="72" y1="45" x2="72" y2="65" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <circle className="dot-pop" cx="118" cy="34" r="3" fill="white" style={{animationDelay:"0s"}}/>
      <circle className="dot-pop" cx="30" cy="88" r="3" fill="white" style={{animationDelay:"0.6s"}}/>
      <circle className="dot-pop" cx="138" cy="90" r="3" fill="white" style={{animationDelay:"1.2s"}}/>
    </svg>
  );
}

function VisualDefine({ active }) {
  return (
    <svg viewBox="0 0 160 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        .n1{animation:${active?"nf 2s 0s ease-in-out infinite":"none"}}
        .n2{animation:${active?"nf 2s 0.4s ease-in-out infinite":"none"}}
        .n3{animation:${active?"nf 2s 0.8s ease-in-out infinite":"none"}}
        .n4{animation:${active?"nf 2s 1.2s ease-in-out infinite":"none"}}
        @keyframes nf{0%,100%{opacity:0.25}50%{opacity:1}}
        .ld{animation:${active?"ld 2s ease-in-out infinite":"none"};stroke-dasharray:200;stroke-dashoffset:200}
        @keyframes ld{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}
      `}</style>
      <circle cx="80" cy="18" r="8" fill="white" fillOpacity="0.9"/>
      <line className="ld" x1="80" y1="26" x2="42" y2="54" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
      <line className="ld" x1="80" y1="26" x2="118" y2="54" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
      <rect className="n1" x="26" y="54" width="32" height="14" rx="4" fill="white" fillOpacity="0.7"/>
      <rect className="n2" x="102" y="54" width="32" height="14" rx="4" fill="white" fillOpacity="0.7"/>
      <line x1="34" y1="68" x2="20" y2="90" stroke="white" strokeOpacity="0.25" strokeWidth="1.2"/>
      <line x1="50" y1="68" x2="58" y2="90" stroke="white" strokeOpacity="0.25" strokeWidth="1.2"/>
      <line x1="114" y1="68" x2="104" y2="90" stroke="white" strokeOpacity="0.25" strokeWidth="1.2"/>
      <line x1="128" y1="68" x2="140" y2="90" stroke="white" strokeOpacity="0.25" strokeWidth="1.2"/>
      <rect className="n3" x="10" y="90" width="24" height="11" rx="3" fill="white" fillOpacity="0.4"/>
      <rect className="n4" x="46" y="90" width="24" height="11" rx="3" fill="white" fillOpacity="0.4"/>
      <rect className="n1" x="92" y="90" width="24" height="11" rx="3" fill="white" fillOpacity="0.4"/>
      <rect className="n2" x="128" y="90" width="24" height="11" rx="3" fill="white" fillOpacity="0.4"/>
    </svg>
  );
}

function VisualDesign({ active }) {
  return (
    <svg viewBox="0 0 160 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        .cur{animation:${active?"curM 2.4s ease-in-out infinite":"none"}}
        @keyframes curM{0%{transform:translate(18px,16px)}25%{transform:translate(90px,20px)}50%{transform:translate(100px,76px)}75%{transform:translate(22px,80px)}100%{transform:translate(18px,16px)}}
        .bl{animation:${active?"blF 2.4s ease-in-out infinite":"none"}}
        @keyframes blF{0%,100%{opacity:0.18}50%{opacity:0.85}}
      `}</style>
      <rect x="18" y="16" width="124" height="88" rx="8" stroke="white" strokeWidth="1.5" fill="none" strokeOpacity="0.15"/>
      <rect className="bl" x="18" y="16" width="124" height="18" rx="8" fill="white" fillOpacity="0.1"/>
      <rect className="bl" x="26" y="46" width="48" height="36" rx="4" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" fill="none"/>
      <rect className="bl" x="82" y="46" width="52" height="13" rx="4" stroke="white" strokeOpacity="0.3" strokeWidth="1" fill="none"/>
      <rect className="bl" x="82" y="64" width="38" height="10" rx="4" stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none"/>
      <rect className="bl" x="26" y="88" width="108" height="10" rx="4" stroke="white" strokeOpacity="0.15" strokeWidth="1" fill="none"/>
      <g className="cur">
        <polygon points="0,0 0,16 5,11 8,19 11,18 8,10 14,10" fill="white" opacity="0.9"/>
      </g>
    </svg>
  );
}

function VisualShip({ active }) {
  return (
    <svg viewBox="0 0 160 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        .rk{animation:${active?"rkF 2s ease-in-out infinite":"none"}}
        @keyframes rkF{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        .tr1{animation:${active?"trA 2s 0.1s ease-in-out infinite":"none"}}
        .tr2{animation:${active?"trA 2s 0.3s ease-in-out infinite":"none"}}
        @keyframes trA{0%,100%{opacity:0.1;transform:scaleY(0.4)}50%{opacity:0.55;transform:scaleY(1)}}
        .dp{animation:${active?"dpA 2s ease-in-out infinite":"none"}}
        @keyframes dpA{0%{opacity:0}40%{opacity:1}100%{opacity:0}}
      `}</style>
      <rect className="tr2" x="74" y="74" width="12" height="28" rx="5" fill="white" fillOpacity="0.25" style={{transformOrigin:"80px 74px"}}/>
      <rect className="tr1" x="70" y="78" width="20" height="20" rx="6" fill="white" fillOpacity="0.45" style={{transformOrigin:"80px 78px"}}/>
      <g className="rk" style={{transformOrigin:"80px 58px"}}>
        <path d="M80 26C80 26 96 40 96 60L80 70L64 60C64 40 80 26 80 26Z" fill="white" fillOpacity="0.9"/>
        <circle cx="80" cy="52" r="6" fill="black" fillOpacity="0.45"/>
        <path d="M64 60L56 68L64 71Z" fill="white" fillOpacity="0.45"/>
        <path d="M96 60L104 68L96 71Z" fill="white" fillOpacity="0.45"/>
      </g>
      {[[-28,-12],[28,6],[0,32],[-24,26],[26,-18]].map(([x,y],i) => (
        <circle key={i} className="dp" cx={80+x} cy={58+y} r="3" fill="white" style={{animationDelay:`${i*0.35}s`}}/>
      ))}
    </svg>
  );
}

/* ── MAIN ────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveStep(s => (s + 1) % processSteps.length);
    }, 3200);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleStepClick = (i) => {
    clearInterval(timerRef.current);
    setActiveStep(i);
    timerRef.current = setInterval(() => {
      setActiveStep(s => (s + 1) % processSteps.length);
    }, 3200);
  };

  const visuals = [VisualUnderstand, VisualDefine, VisualDesign, VisualShip];
  const ActiveVisual = visuals[activeStep];

  // duplicate tools for infinite scroll
  const toolsDoubled = [...tools, ...tools];

  return (
    <>
      <style>{`
        @import url('https://rsms.me/inter/inter.css');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #f7f6f3;
          --fg: #0e0e0d;
          --muted: #6a6a66;
          --border: #e2e1dc;
          --card: #ffffff;
          --surface: #eeede9;
          --accent: #c8b89a;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--fg); font-family: "Inter", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }

        /* NAV */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 2.5rem; height: 58px; display: flex; align-items: center; justify-content: space-between; transition: background 0.3s, border-color 0.3s; }
        .nav.scrolled { background: rgba(247,246,243,0.88); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); }
        .nav-logo { font-size: 15px; font-weight: 600; letter-spacing: -0.025em; display: flex; align-items: center; gap: 9px; }
        .nav-mark { width: 24px; height: 24px; border-radius: 7px; background: var(--fg); display: grid; place-items: center; }
        .nav-mark span { width: 8px; height: 8px; border-radius: 2px; background: var(--accent); }
        .nav-links { display: flex; gap: 2rem; font-size: 13px; color: var(--muted); list-style: none; }
        .nav-links a { transition: color 0.15s; }
        .nav-links a:hover { color: var(--fg); }
        .nav-cta { font-size: 13px; font-weight: 500; padding: 8px 20px; border-radius: 9999px; background: var(--fg); color: #fff; transition: opacity 0.2s; }
        .nav-cta:hover { opacity: 0.75; }

        /* HERO */
        .hero { min-height: 100vh; display: flex; align-items: center; padding-top: 58px; background: var(--bg); }
        .hero-inner { width: 100%; max-width: 1080px; margin: 0 auto; padding: 4rem 2.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        @media(max-width:768px){ .hero-inner { grid-template-columns: 1fr; } }

        /* left */
        .hero-left {}
        .hero-tag { font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--muted); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 8px; }
        .hero-tag::before { content: ''; width: 18px; height: 1px; background: var(--accent); }
        .hero-h1 { font-size: clamp(38px, 5vw, 68px); font-weight: 600; letter-spacing: -0.04em; line-height: 1.0; margin-bottom: 1.5rem; }
        .hero-h1 em { font-style: normal; color: var(--muted); }
        .hero-desc { font-size: 16px; color: var(--muted); line-height: 1.7; max-width: 420px; margin-bottom: 2.5rem; }
        .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }

        /* right — image + floating stats */
        .hero-right { position: relative; display: flex; align-items: center; justify-content: center; }
        .hero-img-wrap { position: relative; }
        .hero-img { width: 260px; height: 310px; object-fit: cover; object-position: top center; border-radius: 140px; border: 3px solid var(--border); display: block; }

        /* floating stat cards */
        .fstat {
          position: absolute;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 18px;
          padding: 12px 18px;
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
          white-space: nowrap;
          animation: floatY 5s ease-in-out infinite;
        }
        .fstat:nth-child(2){ animation-delay: -1.8s; }
        .fstat:nth-child(3){ animation-delay: -3.5s; }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .fstat-num { font-size: 24px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; }
        .fstat-label { font-size: 11px; color: var(--muted); margin-top: 3px; }

        /* BUTTONS */
        .btn-primary { display: inline-flex; align-items: center; gap: 7px; height: 46px; padding-inline: 1.5rem; border-radius: 9999px; background: var(--fg); color: #fff; font-size: 14px; font-weight: 500; transition: opacity 0.2s; }
        .btn-primary:hover { opacity: 0.78; }
        .btn-outline { display: inline-flex; align-items: center; height: 46px; padding-inline: 1.5rem; border-radius: 9999px; border: 1px solid var(--border); color: var(--fg); font-size: 14px; font-weight: 500; transition: background 0.2s; }
        .btn-outline:hover { background: var(--surface); }

        /* SECTION SHARED */
        .section { padding-block: 6rem; }
        .wrap { width: 100%; max-width: 1080px; margin: 0 auto; padding-inline: 2.5rem; }
        .sec-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; }
        .sec-label::after { content: ''; width: 36px; height: 1px; background: var(--border); }
        .sec-title { font-size: clamp(26px, 3.2vw, 42px); font-weight: 600; letter-spacing: -0.035em; line-height: 1.06; }

        /* PROJECTS — light bg, rounded cards, 2-col grid */
        .projects-section { background: var(--bg); }
        .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 3rem; }
        @media(max-width:700px){ .projects-grid { grid-template-columns: 1fr; } }

        .proj-card {
          position: relative; overflow: hidden;
          border-radius: 28px;
          height: 440px;
          cursor: default;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .proj-card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(0,0,0,0.18); }
        .proj-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.55s ease; }
        .proj-card:hover .proj-img { transform: scale(1.06); }
        .proj-overlay { position: absolute; inset: 0; }
        .proj-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; }
        .proj-eyebrow { font-size: 11px; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 0.5rem; }
        .proj-title { font-size: clamp(22px, 3vw, 30px); font-weight: 600; letter-spacing: -0.035em; color: #fff; line-height: 1.05; }
        .proj-sub { font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 3px; }
        .proj-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.65; margin-top: 0.75rem; max-height: 0; overflow: hidden; transition: max-height 0.4s ease, opacity 0.4s ease; opacity: 0; }
        .proj-card:hover .proj-desc { max-height: 100px; opacity: 1; }
        .proj-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: 1rem; flex-wrap: wrap; gap: 8px; }
        .proj-stat { font-size: 13px; font-weight: 600; color: #fff; }
        .proj-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .proj-tag { font-size: 10px; padding: 3px 9px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.5); }

        /* PROCESS — dark, rounded section */
        .process-section { background: #0e0e0d; border-radius: 32px; margin: 0 1.5rem; overflow: hidden; }
        .process-wrap { max-width: 1080px; margin: 0 auto; padding: 5rem 2.5rem; }
        .process-section .sec-label { color: rgba(255,255,255,0.3); }
        .process-section .sec-label::after { background: rgba(255,255,255,0.1); }
        .process-section .sec-title { color: #fff; }
        .process-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; margin-top: 3rem; }
        @media(max-width:700px){ .process-layout { grid-template-columns: 1fr; } }

        .process-steps { display: flex; flex-direction: column; gap: 4px; }
        .pstep { padding: 1.1rem 1.25rem; border-radius: 14px; cursor: pointer; transition: background 0.2s; }
        .pstep.active { background: rgba(255,255,255,0.07); }
        .pstep:hover:not(.active) { background: rgba(255,255,255,0.03); }
        .pstep-top { display: flex; align-items: center; gap: 12px; }
        .pstep-n { font-size: 11px; color: rgba(255,255,255,0.22); letter-spacing: 0.08em; width: 24px; }
        .pstep-name { font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.85); letter-spacing: -0.02em; }
        .pstep-desc { font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.65; margin-top: 0.5rem; padding-left: 36px; max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.3s ease, opacity 0.3s ease; text-align: left; }
        .pstep.active .pstep-desc { max-height: 80px; opacity: 1; }

        .process-visual { aspect-ratio: 4/3; border-radius: 20px; background: rgba(255,255,255,0.04); display: flex; align-items: center; justify-content: center; padding: 2rem; position: sticky; top: 80px; }

        /* TOOLS — horizontal marquee */
        .tools-section { background: var(--bg); overflow: hidden; }
        .tools-track-wrap { position: relative; overflow: hidden; margin-top: 2.5rem; }
        .tools-track-wrap::before,
        .tools-track-wrap::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2; pointer-events: none;
        }
        .tools-track-wrap::before { left: 0; background: linear-gradient(to right, var(--bg), transparent); }
        .tools-track-wrap::after { right: 0; background: linear-gradient(to left, var(--bg), transparent); }
        .tools-track { display: flex; gap: 12px; width: max-content; animation: marquee 28s linear infinite; }
        .tools-track-wrap:hover .tools-track { animation-play-state: paused; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        .tool-chip { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-radius: 14px; background: var(--card); border: 1px solid var(--border); cursor: default; transition: transform 0.2s, box-shadow 0.2s; flex-shrink: 0; }
        .tool-chip:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.07); }
        .tool-logo { width: 28px; height: 28px; flex-shrink: 0; }
        .tool-logo svg { width: 28px; height: 28px; }
        .tool-name { font-size: 14px; font-weight: 500; white-space: nowrap; }
        .tool-cat { font-size: 11px; color: var(--muted); }

        /* CTA */
        .cta-section { background: var(--bg); padding-block: 4rem 6rem; }
        .cta-box { position: relative; overflow: hidden; border-radius: 28px; background: var(--fg); color: #fff; padding: 5rem 4rem; text-align: center; }
        .cta-box::before { content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%); width: 500px; height: 400px; background: radial-gradient(circle, rgba(200,184,154,0.13) 0%, transparent 70%); pointer-events: none; }
        @media(max-width:600px){ .cta-box { padding: 3rem 1.5rem; } }
        .cta-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: rgba(255,255,255,0.3); margin-bottom: 1.5rem; }
        .cta-title { font-size: clamp(34px, 5vw, 60px); font-weight: 600; letter-spacing: -0.04em; line-height: 1.0; margin-bottom: 1.25rem; }
        .cta-title em { font-style: normal; color: rgba(255,255,255,0.35); }
        .cta-sub { font-size: 16px; color: rgba(255,255,255,0.45); max-width: 380px; margin: 0 auto 2.5rem; line-height: 1.7; }
        .cta-actions { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .btn-white { display: inline-flex; align-items: center; height: 50px; padding-inline: 1.75rem; border-radius: 9999px; background: #fff; color: var(--fg); font-size: 15px; font-weight: 500; transition: opacity 0.2s; }
        .btn-white:hover { opacity: 0.88; }
        .btn-ghost-w { display: inline-flex; align-items: center; height: 50px; padding-inline: 1.75rem; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.16); color: rgba(255,255,255,0.65); font-size: 15px; font-weight: 500; transition: background 0.2s; }
        .btn-ghost-w:hover { background: rgba(255,255,255,0.06); }

        /* FOOTER */
        .footer { border-top: 1px solid var(--border); padding-block: 2.5rem; background: var(--bg); }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; font-size: 13px; color: var(--muted); }
        .footer-inner strong { color: var(--fg); font-weight: 500; }
        .footer-links { display: flex; gap: 1.5rem; }
        .footer-links a:hover { color: var(--fg); }

        @media(max-width:768px){
          .nav-links { display: none; }
          .section { padding-block: 4rem; }
          .hero-img { width: 200px; height: 240px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          <div className="nav-mark"><span /></div>
          Faisal Amin
        </div>
        <ul className="nav-links">
          {["Work","Process","Tools","Contact"].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta">Let's talk</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          {/* LEFT */}
          <div className="hero-left">
            <p className="hero-tag">Senior Product Designer</p>
            <h1 className="hero-h1">
              Faisal Amin<br />
              <em>Product Designer.</em>
            </h1>
            <p className="hero-desc">
              I design SaaS, healthcare, and EdTech products that actually ship — from first research session to final handoff.
            </p>
            <div className="hero-actions">
              <a href="#work" className="btn-primary">See my work ↓</a>
              <a href="#contact" className="btn-outline">Get in touch</a>
            </div>
          </div>

          {/* RIGHT — photo + floating stats */}
          <div className="hero-right">
            <div className="hero-img-wrap">
              {/* stat: top-left */}
              <div className="fstat" style={{ top: "-18px", left: "-130px" }}>
                <div className="fstat-num">50+</div>
                <div className="fstat-label">Projects designed</div>
              </div>
              {/* stat: top-right */}
              <div className="fstat" style={{ top: "30px", right: "-110px", animationDelay: "-1.8s" }}>
                <div className="fstat-num">3yr</div>
                <div className="fstat-label">Experience</div>
              </div>
              {/* stat: bottom-left */}
              <div className="fstat" style={{ bottom: "40px", left: "-120px", animationDelay: "-3.5s" }}>
                <div className="fstat-num">99%</div>
                <div className="fstat-label">Happy clients</div>
              </div>

              <img
                src="/bg.png"
                alt="Faisal Amin"
                className="hero-img"
                onError={e => { e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="section projects-section">
        <div className="wrap">
          <p className="sec-label">Selected Work</p>
          <h2 className="sec-title">Projects I'm proud of.</h2>
          <div className="projects-grid">
            {projects.map(p => (
              <div key={p.id} className="proj-card">
                <img src={p.img} alt={p.title} className="proj-img" />
                <div className="proj-overlay" style={{ background: p.grad }} />
                <div className="proj-body">
                  <p className="proj-eyebrow">{p.id} · {p.type}</p>
                  <h3 className="proj-title">{p.title}</h3>
                  {p.sub && <p className="proj-sub">{p.sub}</p>}
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-bottom">
                    <span className="proj-stat">↑ {p.stat}</span>
                    <div className="proj-tags">
                      {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ padding: "4rem 0" }}>
        <div className="process-section">
          <div className="process-wrap">
            <p className="sec-label">How I work</p>
            <h2 className="sec-title" style={{ color: "#fff" }}>A process built for real products.</h2>
            <div className="process-layout">
              <div className="process-steps">
                {processSteps.map((s, i) => (
                  <div key={s.num} className={`pstep ${activeStep === i ? "active" : ""}`} onClick={() => handleStepClick(i)}>
                    <div className="pstep-top">
                      <span className="pstep-n">{s.num}</span>
                      <span className="pstep-name">{s.name}</span>
                    </div>
                    <p className="pstep-desc">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="process-visual">
                <ActiveVisual active={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="section tools-section">
        <div className="wrap">
          <p className="sec-label">Toolstack</p>
          <h2 className="sec-title">Tools I design with.</h2>
        </div>
        <div className="tools-track-wrap" style={{ marginTop: "2.5rem" }}>
          <div className="tools-track">
            {toolsDoubled.map((t, i) => (
              <div key={i} className="tool-chip">
                <div className="tool-logo" dangerouslySetInnerHTML={{ __html: t.logo }} />
                <div>
                  <div className="tool-name">{t.name}</div>
                  <div className="tool-cat">{t.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="cta-section">
        <div className="wrap">
          <div className="cta-box">
            <p className="cta-eyebrow">Open to work</p>
            <h2 className="cta-title">
              Got a product<br /><em>worth building?</em>
            </h2>
            <p className="cta-sub">
              I take on a small number of projects at a time. If you're building something that needs real design thinking, let's talk.
            </p>
            <div className="cta-actions">
              <a href="mailto:faisal.amin.240302@gmail.com" className="btn-white">Send me an email</a>
              <a href="https://linkedin.com/in/faisal-amin-83a15320b" target="_blank" rel="noreferrer" className="btn-ghost-w">LinkedIn →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <div><strong>Faisal Amin</strong> · Senior Product Designer · Islamabad, Pakistan</div>
          <div className="footer-links">
            <a href="https://linkedin.com/in/faisal-amin-83a15320b" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:faisal.amin.240302@gmail.com">Email</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </>
  );
}