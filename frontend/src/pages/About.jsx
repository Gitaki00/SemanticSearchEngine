import { Link } from "react-router-dom";
import "../App.css";

/* ── Inline SVG icons ── */
function IconBrain() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66Z" />
    </svg>
  );
}

function IconBarChart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6"  y1="20" x2="6"  y2="14" />
      <line x1="2"  y1="20" x2="22" y2="20" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconHistory() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-5.01" />
      <line x1="12" y1="7" x2="12" y2="12" />
      <line x1="12" y1="12" x2="15" y2="14" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const features = [
  {
    Icon: IconBrain,
    title: "Semantic Understanding",
    desc: "Queries and results are converted into vector embeddings using a Sentence Transformer model — capturing meaning, not just words.",
  },
  {
    Icon: IconBarChart,
    title: "AI Ranking",
    desc: "Cosine similarity scores how closely each result matches intent. Weighted title + content scoring gives nuanced rankings.",
  },
  {
    Icon: IconTarget,
    title: "Intent Detection",
    desc: "Queries are classified into informational, transactional, or recommendation-based intent for smarter result prioritization.",
  },
  {
    Icon: IconHistory,
    title: "Smart History",
    desc: "Save favorite searches, revisit recent queries, and explore results with expandable AI explanations.",
  },
];

const archSteps = [
  "User enters a search query",
  "React frontend sends request to FastAPI backend",
  "Backend fetches web results via EXA Search API",
  "Sentence Transformer generates query + content embeddings",
  "Cosine similarity scores and ranks all results",
  "Ranked results with AI explanations returned to UI",
];

const techStack = [
  "React", "React Router", "FastAPI", "Python",
  "Sentence Transformers", "Cosine Similarity", "EXA Search API", "LocalStorage",
];

function About() {
  return (
    <div className="main-content">
      <div className="about-page">

        {/* Hero */}
        <div className="hero">
          <div className="hero-badge">v1.0 — Open Source</div>
          <h1>AI Semantic Search</h1>
          <p className="hero-tagline">
            Find smarter answers using AI ranking and semantic understanding.
            Results ranked by meaning, not just keyword matches.
          </p>
          <Link to="/search">
            <button className="hero-btn">
              Start Searching <IconArrowRight />
            </button>
          </Link>
        </div>

        {/* About */}
        <div className="about-section">
          <h2>About this Project</h2>
          <p>
            Traditional search engines rely mostly on keyword matching — if your words
            appear in a document, it ranks higher. This project demonstrates a smarter
            approach using modern AI and vector embeddings.
          </p>
          <p>
            Machine learning models analyze the <em>meaning</em> behind your query and
            compare it to the meaning of each result, not just the words themselves.
            This makes the search far more robust to paraphrasing and context shifts.
          </p>
        </div>

        {/* Features */}
        <div className="about-section">
          <h2>Core Features</h2>
          <div className="feature-grid">
            {features.map(({ Icon, title, desc }) => (
              <div key={title} className="feature-card">
                <div className="feature-icon-wrap">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div className="about-section">
          <h2>System Architecture</h2>
          <div className="architecture">
            {archSteps.map((step, i) => (
              <div key={i} className="arch-step">
                <div className="arch-num">{i + 1}</div>
                <div className="arch-line" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="about-section">
          <h2>Tech Stack</h2>
          <div className="tech-grid">
            {techStack.map((t) => (
              <span key={t} className="tech-chip">{t}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;