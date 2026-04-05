from fastapi import FastAPI
from dotenv import load_dotenv
import os
from exa_py import Exa

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# App
app = FastAPI(title="AI-Powered Semantic Search Engine")

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exa client
exa = Exa(api_key=os.getenv("EXA_API_KEY"))

# Load embedding model ONCE
model = SentenceTransformer("all-MiniLM-L6-v2")


@app.get("/")
def root():
    return {"message": "Backend is running successfully"}


# ---------------- INTENT CLASSIFICATION ---------------- #

def classify_intent(query: str) -> str:
    q = query.lower()
    if "best" in q or "top" in q:
        return "Comparative / Recommendation"
    if "how" in q or "guide" in q:
        return "Informational"
    if "buy" in q or "price" in q:
        return "Transactional"
    return "General Search"


# ---------------- CONFIDENCE (RANK BASED) ---------------- #

def confidence_label(score: float, rank: int) -> str:
    if rank == 0 and score > 0.6:
        return "High"
    elif score > 0.55:
        return "Medium"
    return "Low"


# ---------------- SEARCH ENDPOINT ---------------- #

@app.get("/search")
def semantic_search(query: str, page: int = 1):

    # Always fetch 10 results
    exa_response = exa.search(query=query, num_results=10)
    results = exa_response.results if hasattr(exa_response, "results") else exa_response

    query_embedding = model.encode([query])

    ranked_results = []

    for item in results:
        title = getattr(item, "title", "") or ""
        text = getattr(item, "text", "") or ""

        if not title and not text:
            continue

        # Embeddings
        title_emb = model.encode([title]) if title else None
        text_emb = model.encode([text]) if text else None

        title_score = (
            float(cosine_similarity(query_embedding, title_emb)[0][0])
            if title_emb is not None
            else 0.0
        )

        content_score = (
            float(cosine_similarity(query_embedding, text_emb)[0][0])
            if text_emb is not None
            else 0.0
        )

        final_score = float((0.6 * title_score) + (0.4 * content_score))
        diff = abs(title_score - content_score)

        # Explanation
        if title_score > 0.75 and title_score > content_score:
            explanation = "Title strongly matches the search intent"
        elif diff < 0.03:
            explanation = "Title and content are equally relevant"
        elif content_score > title_score:
            explanation = "Content provides deeper contextual relevance"
        elif final_score > 0.65:
            explanation = "Strong overall semantic relevance"
        else:
            explanation = "Relevant but weaker semantic alignment"

        # Small description (first 200 characters)
        description = text[:200] + "..." if text else "No description available"

        ranked_results.append({
            "title": title,
            "url": getattr(item, "url", ""),
            "description": description,
            "final_score": round(final_score, 3),
            "title_similarity": round(title_score, 3),
            "content_similarity": round(content_score, 3),
            "reason_for_ranking": explanation
        })

    # Sort by score descending
    ranked_results.sort(key=lambda x: x["final_score"], reverse=True)

    # Assign confidence AFTER sorting
    for i, result in enumerate(ranked_results):
        result["confidence"] = confidence_label(result["final_score"], i)

    # Pagination (5 per page)
    page_size = 5
    start = (page - 1) * page_size
    end = start + page_size
    paginated_results = ranked_results[start:end]

    # Comparison explanation
    comparison = ""
    if len(ranked_results) >= 2:
        comparison = (
            f"Result #1 ranks higher than #2 because its semantic score "
            f"({ranked_results[0]['final_score']}) is stronger than "
            f"result #2 ({ranked_results[1]['final_score']}), "
            f"indicating better intent alignment."
        )

    return {
        "query": query,
        "query_intent": classify_intent(query),
        "ranking_logic": "Sentence-transformer embeddings with weighted title/content scoring",
        "why_top_result_wins": comparison,
        "total_results": len(ranked_results),
        "current_page": page,
        "total_pages": (len(ranked_results) + page_size - 1) // page_size,
        "ranked_results": paginated_results
    }
