# AI-Powered Semantic Search Engine using Exa API

An intelligent full-stack web application that retrieves and ranks web results based on **semantic meaning** rather than traditional keyword matching. Built with React, FastAPI, and Sentence Transformers.

---

## 🚀 Features

- 🔍 **Semantic Search** — Results ranked by meaning using vector embeddings and cosine similarity
- 🧠 **AI Explanations** — Every result includes an AI-generated explanation for its ranking
- 🎯 **Query Intent Detection** — Classifies queries as Informational, Transactional, or Recommendation
- 📊 **Confidence Labels** — High, Medium, Low confidence badges per result
- 📄 **Pagination** — 5 results per page from 10 retrieved results
- 🕘 **Search History** — Recent searches saved in browser local storage
- ❤️ **Saved Queries** — Bookmark favourite searches for quick access
- ⚡ **AI Ranking Demo** — Dedicated page to explore ranking scores and explanations

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Routing | React Router DOM |
| Backend | FastAPI (Python) |
| Embedding Model | all-MiniLM-L6-v2 (Sentence Transformers) |
| Similarity | Scikit-learn (Cosine Similarity) |
| Web Retrieval | Exa Search API |
| Storage | Browser Local Storage |

---

## 🖥️ Pages

| Page | Description |
|---|---|
| Home / About | Project overview, features, architecture steps, and tech stack |
| Search | Semantic search with ranked results, scores, and AI explanations |
| AI Ranking Demo | Standalone page to explore ranking scores and explanations |
| Saved Searches | Manage and revisit bookmarked queries |

## 📌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | Check if backend is running |
| GET | /search?query=&page= | Semantic search with ranked results |

## 👩‍💻 Developed By

**Reshmi B Kiriyath**
MCA — Federal Institute of Science and Technology (FISAT)

