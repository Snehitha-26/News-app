import React, { useState, useEffect } from "react";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");

  const categories = ["General", "Technology", "Sports", "Business", "Health", "Entertainment"];

  // ✅ Fetch news from your serverless backend (no CORS issue)
  const fetchNews = async (searchQuery = "latest") => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/news?q=${encodeURIComponent(searchQuery)}${
          category ? `&topic=${category.toLowerCase()}` : ""
        }`
      );

      if (!response.ok) throw new Error("Failed to fetch news");

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("⚠️ Fetch error:", err);
      setError("Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          News Feed
        </h1>
        <ThemeToggle />
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* 🔍 Search Bar */}
        <form onSubmit={handleSearch} className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-2/3 p-2 border rounded-l-lg focus:outline-none dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* 🧭 Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                category === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300"
              } hover:bg-blue-100 dark:hover:bg-gray-700`}
            >
              {cat}
            </button>
          ))}
          {category && (
            <button
              onClick={() => setCategory("")}
              className="px-3 py-1 text-sm border border-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* 📊 Loading, Error, or Articles */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* 📰 News Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && !error && articles.length > 0 ? (
            articles.map((article, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {article.description || "No description available."}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))
          ) : (
            !loading &&
            !error && (
              <p className="text-center text-gray-500">
                No articles found. Try another search.
              </p>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
