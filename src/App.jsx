import { useState, useEffect, useRef } from "react";

/* ── DATA ─────────────────────────────────────────── */
const projects = [
  {
    id: "01",
    title: "Cordel Health",
    sub: "@ Modalys",
    type: "Healthcare SaaS",
    desc: "Led end-to-end design of an occupational healthcare SaaS — from IA and user flows across 4 core modules to a full design system. Simplified complex org structures and employee onboarding.",
    stat: "4 modules shipped",
    tags: ["Healthcare", "SaaS", "Design System"],
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80",
    grad: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
  },
  {
    id: "02",
    title: "Packely",
    sub: "",
    type: "Startup · Web App",
    desc: "Built from scratch using user personas, paper wireframes and high-fidelity UI for a packaging visualisation platform targeting e-commerce brands.",
    stat: "1.6× revenue increase",
    tags: ["Packaging", "3D Rendering", "Web App"],
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80",
    grad: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
  },
  {
    id: "03",
    title: "OctiLearn",
    sub: "",
    type: "EdTech Platform",
    desc: "Redesigned sign-up flow, flashcards, and AI integration for an O/A-Level e-learning platform. Cut sign-up from 8 steps to 2 — drove 3,000 pre-launch user sign-ups.",
    stat: "3,000 pre-launch sign-ups",
    tags: ["EdTech", "Conversion", "Mobile"],
    img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900&q=80",
    grad: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)",
  },
  {
    id: "04",
    title: "Alpherra",
    sub: "Previously Fab AI",
    type: "AI · CAD SaaS",
    desc: "Integrated Alpherra into Solidworks — an AI solution to read and scan CAD drawings and run feasibility tests. Achieved 93% AI accuracy with a clear, engineer-first interface.",
    stat: "93% AI accuracy",
    tags: ["AI", "SaaS", "B2B"],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    grad: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
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
  {
    num: "01",
    name: "Understand",
    desc: "Research, stakeholder interviews, real user needs. The problem before the pixels.",
    // B&W animated visual: magnifying glass scanning
    visual: "understand",
  },
  {
    num: "02",
    name: "Define",
    desc: "Information architecture, sitemaps, user flows. Structure is design.",
    visual: "define",
  },
  {
    num: "03",
    name: "Design",
    desc: "Wireframes to high-fidelity. Accessible, responsive, handoff-ready.",
    visual: "design",
  },
  {
    num: "04",
    name: "Ship",
    desc: "Close dev collaboration until the product matches the intent.",
    visual: "ship",
  },
];

/* ── ANIMATED SVG VISUALS (B&W) ─────────────────── */
function VisualUnderstand({ active }) {
  return (
    <svg viewBox="0 0 120 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        .scan-line { animation: ${active ? "scanDown 1.8s ease-in-out infinite" : "none"}; }
        @keyframes scanDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(36px)} }
        .mag { animation: ${active ? "magMove 1.8s ease-in-out infinite" : "none"}; }
        @keyframes magMove { 0%,100%{transform:translate(0,0)} 50%{transform:translate(10px,8px)} }
        .pulse { animation: ${active ? "pulseR 1.8s ease-in-out infinite" : "none"}; }
        @keyframes pulseR { 0%,100%{r:16} 50%{r:19} }
      `}</style>
      {/* grid lines */}
      {[20,35,50,65,80].map(y => <line key={y} x1="10" y1={y} x2="110" y2={y} stroke="white" strokeOpacity="0.1" strokeWidth="0.8"/>)}
      {[25,45,65,85,105].map(x => <line key={x} x1={x} y1="10" x2={x} y2="90" stroke="white" strokeOpacity="0.1" strokeWidth="0.8"/>)}
      {/* scan line */}
      <line className="scan-line" x1="10" y1="30" x2="110" y2="30" stroke="white" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 3"/>
      {/* magnifier */}
      <g className="mag" transform="translate(35,25)">
        <circle className="pulse" cx="20" cy="20" r="16" stroke="white" strokeWidth="2.5" fill="none"/>
        <line x1="31" y1="31" x2="42" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="13" y1="20" x2="27" y2="20" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="20" y1="13" x2="20" y2="27" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function VisualDefine({ active }) {
  return (
    <svg viewBox="0 0 120 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        .node1 { animation: ${active ? "nodeP 2s 0s ease-in-out infinite" : "none"}; }
        .node2 { animation: ${active ? "nodeP 2s 0.4s ease-in-out infinite" : "none"}; }
        .node3 { animation: ${active ? "nodeP 2s 0.8s ease-in-out infinite" : "none"}; }
        .node4 { animation: ${active ? "nodeP 2s 1.2s ease-in-out infinite" : "none"}; }
        .line-draw { animation: ${active ? "drawLine 2s ease-in-out infinite" : "none"}; }
        @keyframes nodeP { 0%,100%{opacity:0.3} 50%{opacity:1} }
        @keyframes drawLine { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
      `}</style>
      {/* root */}
      <circle cx="60" cy="18" r="6" fill="white" fillOpacity="0.9"/>
      {/* lines */}
      <line x1="60" y1="24" x2="30" y2="48" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="200" className="line-draw"/>
      <line x1="60" y1="24" x2="90" y2="48" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="200" className="line-draw"/>
      <line x1="30" y1="54" x2="18" y2="76" stroke="white" strokeWidth="1.2" strokeOpacity="0.3"/>
      <line x1="30" y1="54" x2="42" y2="76" stroke="white" strokeWidth="1.2" strokeOpacity="0.3"/>
      <line x1="90" y1="54" x2="78" y2="76" stroke="white" strokeWidth="1.2" strokeOpacity="0.3"/>
      <line x1="90" y1="54" x2="102" y2="76" stroke="white" strokeWidth="1.2" strokeOpacity="0.3"/>
      {/* L2 */}
      <rect className="node1" x="22" y="48" width="16" height="10" rx="3" fill="white" fillOpacity="0.7"/>
      <rect className="node2" x="82" y="48" width="16" height="10" rx="3" fill="white" fillOpacity="0.7"/>
      {/* L3 */}
      <rect className="node3" x="10" y="72" width="16" height="9" rx="2.5" fill="white" fillOpacity="0.4"/>
      <rect className="node4" x="34" y="72" width="16" height="9" rx="2.5" fill="white" fillOpacity="0.4"/>
      <rect className="node1" x="70" y="72" width="16" height="9" rx="2.5" fill="white" fillOpacity="0.4"/>
      <rect className="node2" x="94" y="72" width="16" height="9" rx="2.5" fill="white" fillOpacity="0.4"/>
    </svg>
  );
}

function VisualDesign({ active }) {
  return (
    <svg viewBox="0 0 120 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        .cursor { animation: ${active ? "cursorMove 2.4s ease-in-out infinite" : "none"}; }
        @keyframes cursorMove {
          0%{transform:translate(20px,20px)} 25%{transform:translate(70px,25px)}
          50%{transform:translate(80px,65px)} 75%{transform:translate(25px,70px)} 100%{transform:translate(20px,20px)}
        }
        .box-draw { animation: ${active ? "fadeUp 2.4s ease-in-out infinite" : "none"}; }
        @keyframes fadeUp { 0%,100%{opacity:0.2} 50%{opacity:0.9} }
      `}</style>
      {/* wireframe */}
      <rect x="15" y="15" width="90" height="70" rx="6" stroke="white" strokeWidth="1.5" fill="none" strokeOpacity="0.2"/>
      {/* header bar */}
      <rect className="box-draw" x="15" y="15" width="90" height="14" rx="6" fill="white" fillOpacity="0.12"/>
      {/* content blocks */}
      <rect className="box-draw" x="22" y="38" width="36" height="28" rx="3" stroke="white" strokeOpacity="0.35" strokeWidth="1.2" fill="none"/>
      <rect className="box-draw" x="64" y="38" width="36" height="10" rx="3" stroke="white" strokeOpacity="0.25" strokeWidth="1" fill="none"/>
      <rect className="box-draw" x="64" y="52" width="28" height="7" rx="3" stroke="white" strokeOpacity="0.2" strokeWidth="1" fill="none"/>
      <rect className="box-draw" x="22" y="70" width="78" height="8" rx="3" stroke="white" strokeOpacity="0.15" strokeWidth="1" fill="none"/>
      {/* cursor */}
      <g className="cursor">
        <polygon points="0,0 0,14 4,10 7,17 9,16 6,9 11,9" fill="white" stroke="none"/>
      </g>
    </svg>
  );
}

function VisualShip({ active }) {
  return (
    <svg viewBox="0 0 120 100" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        .rocket { animation: ${active ? "rocketUp 2s ease-in-out infinite" : "none"}; }
        @keyframes rocketUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .trail1 { animation: ${active ? "trail 2s 0.1s ease-in-out infinite" : "none"}; }
        .trail2 { animation: ${active ? "trail 2s 0.3s ease-in-out infinite" : "none"}; }
        @keyframes trail { 0%,100%{opacity:0.1;transform:scaleY(0.5)} 50%{opacity:0.6;transform:scaleY(1)} }
        .dot { animation: ${active ? "dotFade 2s ease-in-out infinite" : "none"}; }
        @keyframes dotFade { 0%{opacity:0} 30%{opacity:1} 100%{opacity:0} }
      `}</style>
      {/* launch trail */}
      <rect className="trail2" x="57" y="62" width="6" height="20" rx="3" fill="white" fillOpacity="0.3" style={{transformOrigin:"57px 62px"}}/>
      <rect className="trail1" x="55" y="65" width="10" height="14" rx="4" fill="white" fillOpacity="0.5" style={{transformOrigin:"55px 65px"}}/>
      {/* rocket */}
      <g className="rocket" style={{transformOrigin:"60px 50px"}}>
        <path d="M60 22 C60 22 72 34 72 50 L60 58 L48 50 C48 34 60 22 60 22Z" fill="white" fillOpacity="0.9"/>
        <circle cx="60" cy="44" r="5" fill="black" fillOpacity="0.5"/>
        <path d="M48 50 L42 56 L48 58Z" fill="white" fillOpacity="0.5"/>
        <path d="M72 50 L78 56 L72 58Z" fill="white" fillOpacity="0.5"/>
      </g>
      {/* orbit dots */}
      {[[-22,-10],[22,5],[0,26],[-18,20]].map(([x,y],i) => (
        <circle key={i} className="dot" cx={60+x} cy={50+y} r="2.5" fill="white"
          style={{animationDelay:`${i*0.4}s`}}/>
      ))}
    </svg>
  );
}

/* ── MAIN COMPONENT ───────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredTool, setHoveredTool] = useState(null);
  const processRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Auto-advance process steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(s => (s + 1) % processSteps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const visuals = [VisualUnderstand, VisualDefine, VisualDesign, VisualShip];
  const ActiveVisual = visuals[activeStep];

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
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 2rem; height: 58px;
          display: flex; align-items: center; justify-content: space-between;
          transition: background 0.3s, border-color 0.3s;
        }
        .nav.scrolled { background: rgba(247,246,243,0.9); backdrop-filter: blur(14px); border-bottom: 1px solid var(--border); }
        .nav-logo { font-size: 15px; font-weight: 600; letter-spacing: -0.025em; display: flex; align-items: center; gap: 9px; }
        .nav-mark { width: 24px; height: 24px; border-radius: 7px; background: var(--fg); display: grid; place-items: center; }
        .nav-mark span { width: 8px; height: 8px; border-radius: 2px; background: var(--accent); }
        .nav-links { display: flex; gap: 2rem; font-size: 13px; color: var(--muted); list-style: none; }
        .nav-links a:hover { color: var(--fg); transition: color 0.15s; }
        .nav-cta { font-size: 13px; font-weight: 500; padding: 8px 20px; border-radius: 9999px; background: var(--fg); color: #fff; transition: opacity 0.2s; }
        .nav-cta:hover { opacity: 0.75; }

        /* HERO */
        .hero { min-height: 100vh; display: flex; align-items: center; padding-top: 58px; position: relative; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=60') center/cover no-repeat; filter: grayscale(30%) brightness(0.97); z-index: 0; }
        .hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(247,246,243,0.92) 50%, rgba(247,246,243,0.6) 100%); }
        .hero-inner { position: relative; z-index: 1; width: 100%; max-width: 1080px; margin: 0 auto; padding: 5rem 2rem; display: grid; place-items: center; }
        .hero-center { position: relative; display: flex; flex-direction: column; align-items: center; gap: 0; }
        .hero-img-wrap { position: relative; width: 220px; height: 270px; }
        .hero-img { width: 220px; height: 270px; object-fit: cover; object-position: top; border-radius: 120px; border: 3px solid var(--border); filter: grayscale(15%); display: block; }
        .hero-tag { font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--muted); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 8px; }
        .hero-tag::before { content: ''; width: 18px; height: 1px; background: var(--accent); }
        .hero-name { font-size: clamp(42px, 6vw, 80px); font-weight: 600; letter-spacing: -0.04em; line-height: 0.98; text-align: center; margin-top: 1.5rem; }
        .hero-name em { font-style: normal; color: var(--muted); }
        .hero-desc { font-size: 16px; color: var(--muted); max-width: 420px; text-align: center; line-height: 1.7; margin-top: 1.25rem; }
        .hero-actions { display: flex; gap: 10px; margin-top: 2rem; flex-wrap: wrap; justify-content: center; }

        /* floating stats */
        .float-stat {
          position: absolute;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 10px 16px;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          animation: floatDrift 5s ease-in-out infinite;
        }
        .float-stat:nth-child(2) { animation-delay: -1.5s; }
        .float-stat:nth-child(3) { animation-delay: -3s; }
        .float-stat:nth-child(4) { animation-delay: -4s; }
        @keyframes floatDrift { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
        .float-num { font-size: 22px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; }
        .float-label { font-size: 11px; color: var(--muted); margin-top: 2px; }

        /* BUTTONS */
        .btn-primary { display: inline-flex; align-items: center; gap: 7px; height: 46px; padding-inline: 1.5rem; border-radius: 9999px; background: var(--fg); color: #fff; font-size: 14px; font-weight: 500; transition: opacity 0.2s; }
        .btn-primary:hover { opacity: 0.78; }
        .btn-outline { display: inline-flex; align-items: center; gap: 7px; height: 46px; padding-inline: 1.5rem; border-radius: 9999px; border: 1px solid var(--border); color: var(--fg); font-size: 14px; font-weight: 500; background: transparent; transition: background 0.2s; }
        .btn-outline:hover { background: var(--surface); }

        /* SECTION SHARED */
        .section { padding-block: 6rem; }
        .wrap { width: 100%; max-width: 1080px; margin: 0 auto; padding-inline: 2rem; }
        .sec-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; }
        .sec-label::after { content: ''; width: 40px; height: 1px; background: var(--border); }
        .sec-title { font-size: clamp(28px, 3.5vw, 44px); font-weight: 600; letter-spacing: -0.035em; line-height: 1.06; }

        /* WORK — vertical cards with gradient overlay */
        .work-section { background: #0e0e0d; }
        .work-header { padding-block: 5rem 3rem; }
        .work-header .sec-label { color: rgba(255,255,255,0.35); }
        .work-header .sec-label::after { background: rgba(255,255,255,0.12); }
        .work-header .sec-title { color: #fff; }
        .work-list { display: flex; flex-direction: column; gap: 2px; }
        .proj-card {
          position: relative; overflow: hidden; border-radius: 0;
          height: 480px; cursor: default;
          transition: height 0.4s ease;
        }
        .proj-card:first-child { border-radius: 20px 20px 0 0; }
        .proj-card:last-child { border-radius: 0 0 20px 20px; }
        .proj-card:hover { height: 560px; }
        .proj-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; filter: grayscale(20%); }
        .proj-card:hover .proj-img { transform: scale(1.04); }
        .proj-overlay { position: absolute; inset: 0; }
        .proj-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 2.5rem; }
        .proj-num { font-size: 11px; letter-spacing: 0.14em; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 1rem; }
        .proj-type-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 0.75rem; }
        .proj-title { font-size: clamp(28px, 4vw, 48px); font-weight: 600; letter-spacing: -0.04em; color: #fff; line-height: 1.0; }
        .proj-sub { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 4px; }
        .proj-row { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 1.25rem; gap: 1rem; flex-wrap: wrap; }
        .proj-desc { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.65; max-width: 560px; }
        .proj-stat { font-size: 15px; font-weight: 600; color: #fff; white-space: nowrap; padding: 8px 16px; border: 1px solid rgba(255,255,255,0.2); border-radius: 9999px; background: rgba(255,255,255,0.07); }
        .proj-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 1rem; }
        .proj-tag { font-size: 11px; padding: 4px 10px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.45); }

        /* PROCESS — horizontal step selector + animated visual */
        .process-section { background: #0e0e0d; }
        .process-section .sec-label { color: rgba(255,255,255,0.35); }
        .process-section .sec-label::after { background: rgba(255,255,255,0.12); }
        .process-section .sec-title { color: #fff; }
        .process-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; margin-top: 3rem; }
        @media(max-width:700px){ .process-layout { grid-template-columns: 1fr; } }
        .process-steps { display: flex; flex-direction: column; gap: 2px; }
        .process-step {
          padding: 1.25rem 1.5rem; border-radius: 14px; cursor: pointer;
          transition: background 0.2s;
          border: 1px solid transparent;
        }
        .process-step.active { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.1); }
        .process-step:hover:not(.active) { background: rgba(255,255,255,0.03); }
        .process-step-top { display: flex; align-items: center; gap: 12px; }
        .process-step-n { font-size: 11px; color: rgba(255,255,255,0.25); letter-spacing: 0.1em; }
        .process-step-name { font-size: 17px; font-weight: 600; color: rgba(255,255,255,0.9); letter-spacing: -0.02em; }
        .process-step-desc { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.65; margin-top: 0.6rem; padding-left: 2rem; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, opacity 0.3s ease; opacity: 0; }
        .process-step.active .process-step-desc { max-height: 80px; opacity: 1; }
        .process-progress { width: 100%; height: 2px; background: rgba(255,255,255,0.08); border-radius: 1px; margin-top: 0.75rem; margin-left: 2rem; }
        .process-progress-bar { height: 100%; border-radius: 1px; background: var(--accent); animation: fillBar 2.8s linear; }
        @keyframes fillBar { from{width:0%} to{width:100%} }
        .process-visual {
          aspect-ratio: 4/3; border-radius: 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          padding: 2rem;
          position: sticky; top: 80px;
        }

        /* TOOLS */
        .tools-section { background: var(--bg); }
        .tools-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 2.5rem; }
        .tool-chip {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 16px; border-radius: 14px;
          border: 1px solid var(--border); background: var(--card);
          cursor: default; transition: all 0.2s ease;
          position: relative;
        }
        .tool-chip:hover { border-color: var(--fg); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .tool-logo { width: 28px; height: 28px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .tool-logo svg { width: 28px; height: 28px; }
        .tool-name { font-size: 14px; font-weight: 500; }
        .tool-cat { font-size: 11px; color: var(--muted); }

        /* CTA */
        .cta-section { background: var(--surface); }
        .cta-box {
          position: relative; overflow: hidden;
          border-radius: 28px; background: var(--fg); color: #fff;
          padding: 5rem 4rem; text-align: center;
        }
        .cta-box::before { content: ''; position: absolute; top: -120px; left: 50%; transform: translateX(-50%); width: 500px; height: 400px; background: radial-gradient(circle, rgba(200,184,154,0.15) 0%, transparent 70%); pointer-events: none; }
        .cta-eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: rgba(255,255,255,0.35); margin-bottom: 1.5rem; }
        .cta-title { font-size: clamp(36px, 5.5vw, 64px); font-weight: 600; letter-spacing: -0.04em; line-height: 1.0; margin-bottom: 1.25rem; }
        .cta-title em { font-style: normal; color: rgba(255,255,255,0.4); }
        .cta-sub { font-size: 16px; color: rgba(255,255,255,0.5); max-width: 400px; margin: 0 auto 2.5rem; line-height: 1.7; }
        .cta-actions { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .btn-white { display: inline-flex; align-items: center; height: 50px; padding-inline: 1.75rem; border-radius: 9999px; background: #fff; color: var(--fg); font-size: 15px; font-weight: 500; transition: opacity 0.2s; }
        .btn-white:hover { opacity: 0.88; }
        .btn-ghost-white { display: inline-flex; align-items: center; height: 50px; padding-inline: 1.75rem; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.7); font-size: 15px; font-weight: 500; transition: background 0.2s; }
        .btn-ghost-white:hover { background: rgba(255,255,255,0.07); }

        /* FOOTER */
        .footer { border-top: 1px solid var(--border); padding-block: 2.5rem; background: var(--bg); }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; font-size: 13px; color: var(--muted); }
        .footer-inner strong { color: var(--fg); font-weight: 500; }
        .footer-links { display: flex; gap: 1.5rem; }
        .footer-links a:hover { color: var(--fg); }

        @media(max-width:768px){
          .nav-links { display: none; }
          .section { padding-block: 4rem; }
          .cta-box { padding: 3rem 1.5rem; }
          .hero-name { font-size: 40px; }
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
        <div className="hero-bg" />
        <div className="hero-inner">
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
            <p className="hero-tag">Senior Product Designer</p>

            {/* image + floating stats */}
            <div style={{ position:"relative", display:"inline-block" }}>
              {/* stat: top-left */}
              <div className="float-stat" style={{ top:"-10px", left:"-130px" }}>
                <div className="float-num">50+</div>
                <div className="float-label">Projects designed</div>
              </div>
              {/* stat: top-right */}
              <div className="float-stat" style={{ top:"20px", right:"-120px" }}>
                <div className="float-num">3yr</div>
                <div className="float-label">Experience</div>
              </div>
              {/* stat: bottom-left */}
              <div className="float-stat" style={{ bottom:"30px", left:"-115px" }}>
                <div className="float-num">99%</div>
                <div className="float-label">Happy clients</div>
              </div>

              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                alt="Faisal Amin"
                className="hero-img"
              />
            </div>

            <h1 className="hero-name">
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
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="work-section">
        <div className="wrap">
          <div className="work-header">
            <p className="sec-label">Selected Work</p>
            <h2 className="sec-title" style={{ color:"#fff" }}>Projects I'm proud of.</h2>
          </div>
        </div>
        <div className="wrap" style={{ paddingBottom:"5rem" }}>
          <div className="work-list">
            {projects.map((p) => (
              <div key={p.id} className="proj-card">
                <img src={p.img} alt={p.title} className="proj-img" />
                <div className="proj-overlay" style={{ background: p.grad }} />
                <div className="proj-body">
                  <p className="proj-num">{p.id} / {p.type}</p>
                  <h3 className="proj-title">{p.title}</h3>
                  {p.sub && <p className="proj-sub">{p.sub}</p>}
                  <div className="proj-row">
                    <p className="proj-desc">{p.desc}</p>
                    <span className="proj-stat">{p.stat}</span>
                  </div>
                  <div className="proj-tags">
                    {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="section process-section">
        <div className="wrap">
          <p className="sec-label">How I work</p>
          <h2 className="sec-title" style={{ color:"#fff" }}>A process built for real products.</h2>
          <div className="process-layout">
            <div className="process-steps">
              {processSteps.map((s, i) => (
                <div
                  key={s.num}
                  className={`process-step ${activeStep === i ? "active" : ""}`}
                  onClick={() => setActiveStep(i)}
                >
                  <div className="process-step-top">
                    <span className="process-step-n">{s.num}</span>
                    <span className="process-step-name">{s.name}</span>
                  </div>
                  <p className="process-step-desc">{s.desc}</p>
                  {activeStep === i && (
                    <div className="process-progress">
                      <div className="process-progress-bar" key={`${i}-${Date.now()}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="process-visual">
              <ActiveVisual active={true} />
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="section tools-section">
        <div className="wrap">
          <p className="sec-label">Toolstack</p>
          <h2 className="sec-title">Tools I design with.</h2>
          <div className="tools-row">
            {tools.map(t => (
              <div
                key={t.name}
                className="tool-chip"
                onMouseEnter={() => setHoveredTool(t.name)}
                onMouseLeave={() => setHoveredTool(null)}
              >
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
      <section id="contact" className="section cta-section">
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
              <a href="https://linkedin.com/in/faisal-amin-83a15320b" target="_blank" rel="noreferrer" className="btn-ghost-white">LinkedIn →</a>
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