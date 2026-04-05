import { useEffect, useState } from "react";
import "../App.css";

/* ── SVG Icons ── */
function IconSearch() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconBookmark({ filled = false }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function IconExternal() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
    </svg>
  );
}

/* ── Component ── */
function Search() {
  const [query, setQuery]       = useState("");
  const [data, setData]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [history, setHistory]   = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage]         = useState(1);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("searchHistory")) || []);
    setFavorites(JSON.parse(localStorage.getItem("favoriteSearches")) || []);
  }, []);

  const handleSearch = async (searchQuery = query, pageNumber = 1) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setExpanded(null);
    setPage(pageNumber);
    setQuery(searchQuery);

    try {
      const res  = await fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(searchQuery)}&page=${pageNumber}`);
      const json = await res.json();
      setData(json);

      const updated = [searchQuery, ...history.filter((q) => q !== searchQuery)].slice(0, 8);
      setHistory(updated);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
    } catch (err) {
      console.error("Search failed", err);
    }
    setLoading(false);
  };

  const toggleFavorite = (item, e) => {
    e.stopPropagation();
    const updated = favorites.includes(item)
      ? favorites.filter((f) => f !== item)
      : [item, ...favorites];
    setFavorites(updated);
    localStorage.setItem("favoriteSearches", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="app-shell">

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">

        <div className="sidebar-section">
          <div className="sidebar-section-head">
            <span className="sidebar-label">
              <IconClock /> Recent
            </span>
            {history.length > 0 && (
              <button className="sidebar-clear-btn" onClick={clearHistory}>clear</button>
            )}
          </div>
          {history.length === 0 && <p className="empty">No searches yet</p>}
          {history.map((h, i) => (
            <div key={i} className="sidebar-item">
              <span onClick={() => handleSearch(h, 1)} title={h}>{h}</span>
              <button
                className={`fav-btn ${favorites.includes(h) ? "fav-btn--active" : ""}`}
                onClick={(e) => toggleFavorite(h, e)}
                title={favorites.includes(h) ? "Remove from saved" : "Save"}
              >
                <IconBookmark filled={favorites.includes(h)} />
              </button>
            </div>
          ))}
        </div>

        <div className="sidebar-section" style={{ marginTop: "20px" }}>
          <div className="sidebar-section-head">
            <span className="sidebar-label">
              <IconBookmark /> Saved
            </span>
          </div>
          {favorites.length === 0 && <p className="empty">Bookmark a search to save it</p>}
          {favorites.map((f, i) => (
            <div key={i} className="sidebar-item">
              <span onClick={() => handleSearch(f, 1)} title={f}>{f}</span>
              <button
                className="fav-btn fav-btn--active"
                onClick={(e) => toggleFavorite(f, e)}
              >
                <IconBookmark filled />
              </button>
            </div>
          ))}
        </div>

      </aside>

      {/* ── MAIN ── */}
      <main className="main-content">

        <div className="search-header">
          <h1>AI Semantic Search</h1>
          <p>Results ranked by meaning, not just keywords.</p>
        </div>

        <div className="search-box">
          <div className="search-input-wrap">
            <span className="search-icon"><IconSearch /></span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything…"
              onKeyDown={(e) => e.key === "Enter" && handleSearch(query, 1)}
            />
          </div>
          <button className="search-btn" onClick={() => handleSearch(query, 1)}>
            Search <IconChevronRight />
          </button>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="skeleton-list">
            {[1, 2, 3, 4, 5].map((i) => <div key={i} className="skeleton-card" />)}
          </div>
        )}

        {/* Results */}
        {data && !loading && (
          <>
            <div className="meta-bar">
              <div className="meta-chip">
                <IconSparkle /> Intent: <strong>{data.query_intent}</strong>
              </div>
              <div className="meta-divider" />
              <div className="meta-chip">
                Results: <strong>{data.total_results}</strong>
              </div>
              {data.why_top_result_wins && (
                <>
                  <div className="meta-divider" />
                  <p className="why-wins">{data.why_top_result_wins}</p>
                </>
              )}
            </div>

            <div className="results">
              {data.ranked_results.map((item, i) => {
                const globalIndex = (page - 1) * 5 + i + 1;
                const isOpen = expanded === i;

                return (
                  <div
                    key={i}
                    className={`card ${isOpen ? "card--open" : ""}`}
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    <div className="card-top">
                      <span className="card-rank">#{globalIndex}</span>
                      <h3>{item.title}</h3>
                      <span className={`badge ${item.confidence.toLowerCase()}`}>
                        {item.confidence}
                      </span>
                    </div>

                    <p className="description">{item.description}</p>

                    <div className="score-bar">
                      <div className="score-fill" style={{ width: `${item.final_score * 100}%` }} />
                    </div>

                    <div className="card-footer">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="visit-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Visit source <IconExternal />
                      </a>
                      <div className="scores">
                        <span className="score-item">Title <strong>{(item.title_similarity * 100).toFixed(0)}%</strong></span>
                        <span className="score-item">Content <strong>{(item.content_similarity * 100).toFixed(0)}%</strong></span>
                        <span className="score-item">Score <strong>{(item.final_score * 100).toFixed(0)}%</strong></span>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="explanation">
                        <strong>AI Explanation</strong>
                        {item.reason_for_ranking}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {data.total_pages > 1 && (
              <div className="pagination">
                <button disabled={page === 1} onClick={() => handleSearch(data.query, page - 1)}>
                  <IconChevronLeft /> Previous
                </button>
                <span>Page {data.current_page} / {data.total_pages}</span>
                <button disabled={page === data.total_pages} onClick={() => handleSearch(data.query, page + 1)}>
                  Next <IconChevronRight />
                </button>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
}

export default Search;