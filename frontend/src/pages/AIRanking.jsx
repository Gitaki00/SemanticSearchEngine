import { useState } from "react";
import "../App.css";

function AIRanking() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const runDemo = async () => {
    if (!query) return;

    const res = await fetch(`http://127.0.0.1:8000/search?query=${query}`);
    const data = await res.json();

    setResults(data.ranked_results);
  };

  return (
    <div className="main-content">
      <div className="page">

        <h1>AI Ranking Demo</h1>

        <p className="about-intro">
          This page demonstrates how the AI model ranks search results using
          semantic similarity between the user query and content.
        </p>

        <div className="search-box">
          <div className="search-input-wrap">
            <span className="search-icon">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              placeholder="Try: best laptop for programming"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runDemo()}
            />
          </div>
          <button className="search-btn" onClick={runDemo}>Run AI Ranking</button>
        </div>

        {results.length > 0 && (
          <div className="results">
            {results.map((r, i) => (
              <div className="card" key={i}>
                <div className="card-top">
                  <span className="card-rank">#{i + 1}</span>
                  <h3>{r.title}</h3>
                  <span className={`badge ${r.confidence.toLowerCase()}`}>
                    {r.confidence}
                  </span>
                </div>

                <p className="description">{r.description}</p>

                <div className="score-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${r.final_score * 100}%` }}
                  />
                </div>

                <div className="card-footer">
                  <div className="scores">
                    <span className="score-item">Title <strong>{(r.title_similarity * 100).toFixed(0)}%</strong></span>
                    <span className="score-item">Content <strong>{(r.content_similarity * 100).toFixed(0)}%</strong></span>
                    <span className="score-item">Score <strong>{(r.final_score * 100).toFixed(0)}%</strong></span>
                  </div>
                </div>

                <div className="explanation">
                  <strong>AI Explanation</strong>
                  {r.reason_for_ranking}
                </div>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && (
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "8px" }}>
            Run a demo query to see how AI ranks results.
          </p>
        )}

      </div>
    </div>
  );
}

export default AIRanking;