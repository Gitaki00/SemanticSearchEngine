import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function IconSearch() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

function IconBookmarkEmpty() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ color: "var(--border-hi)" }}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function Saved() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favoriteSearches")) || []);
  }, []);

  const remove = (item) => {
    const updated = favorites.filter((f) => f !== item);
    setFavorites(updated);
    localStorage.setItem("favoriteSearches", JSON.stringify(updated));
  };

  const searchNow = (q) => navigate(`/search?q=${encodeURIComponent(q)}`);

  return (
    <div className="main-content">
      <div className="saved-page">

        <h1 className="page-title">Saved Searches</h1>
        <p className="page-subtitle">
          {favorites.length} saved {favorites.length === 1 ? "query" : "queries"} — click any to search again.
        </p>

        {favorites.length === 0 ? (
          <div className="saved-empty">
            <IconBookmarkEmpty />
            <p>No saved searches yet.</p>
            <p style={{ marginTop: "8px", fontSize: "12px", opacity: 0.5 }}>
              Bookmark a search from the Search page to save it here.
            </p>
          </div>
        ) : (
          <div className="saved-grid">
            {favorites.map((item, i) => (
              <div key={i} className="saved-card" onClick={() => searchNow(item)}>
                <span className="saved-query" title={item}>{item}</span>
                <div className="saved-actions">
                  <button title="Search again" onClick={(e) => { e.stopPropagation(); searchNow(item); }}>
                    <IconSearch />
                  </button>
                  <button title="Remove" onClick={(e) => { e.stopPropagation(); remove(item); }}>
                    <IconX />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Saved;