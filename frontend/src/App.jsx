import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Search from "./pages/Search";
import About from "./pages/About";
import AIRanking from "./pages/AIRanking";
import Saved from "./pages/Saved";
import "./App.css";

/* ── Floating particles (decorative) ── */
function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  );
}

/* ── SVG Icons ── */
export function IconSearch({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function IconHome({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function IconCpu({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

export function IconBookmark({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function NavBar() {
  const location = useLocation();
  const links = [
    { to: "/",        label: "Home",       Icon: IconHome     },
    { to: "/search",  label: "Search",     Icon: IconSearch   },
    { to: "/ranking", label: "AI Ranking", Icon: IconCpu      },
    { to: "/saved",   label: "Saved",      Icon: IconBookmark },
  ];

  return (
    <nav className="navbar">
      {/* Logo mark — pure SVG */}
      <Link to="/" className="logo">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 6px var(--green))" }}>
          <circle cx="11" cy="11" r="8" />
          <path d="M11 8v6M8 11h6" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        Semantic<span style={{ color: "var(--green-dim)" }}>AI</span>
      </Link>

      <div className="nav-links">
        {links.map(({ to, label, Icon }) => (
          <Link key={to} to={to} className={location.pathname === to ? "active" : ""}>
            <Icon size={13} />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Particles />
      <NavBar />
      <Routes>
        <Route path="/"        element={<About />}     />
        <Route path="/search"  element={<Search />}    />
        <Route path="/ranking" element={<AIRanking />} />
        <Route path="/saved"   element={<Saved />}     />
      </Routes>
    </Router>
  );
}

export default App;