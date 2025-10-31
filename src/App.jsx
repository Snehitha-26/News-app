import React, { useState, useEffect } from "react";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilters";
import NewsCard from "./components/NewsCard";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");

  const apiKey = "63d7ec112089bb2ad562fbf8fa77718d";

  const fetchNews = async (searchQuery = "latest") => {
    setLoading(true);
    setError("");

    try {
      const endpoint = category
        ? `https://gnews.io/api/v4/top-headlines?category=${category.toLowerCase()}&lang=en&max=12&apikey=${apiKey}`
        : `https://gnews.io/api/v4/search?q=${encodeURIComponent(
            searchQuery
          )}&lang=en&max=12&apikey=${apiKey}`;

      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(endpoint)}`;

      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Failed to fetch news");

      const proxyData = await response.json();
      const data = JSON.parse(proxyData.contents);

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
  }, [category]);

  const handleSearch = (term) => {
    setQuery(term);
    fetchNews(term);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          News Feed
        </h1>
        <ThemeToggle />
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* 🔍 Search Bar */}
        <SearchBar query={query} onSearch={handleSearch} />

        {/* 🧭 Category Filter */}
        <CategoryFilter category={category} setCategory={setCategory} />

        {/* 📊 Status Messages */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* 📰 News Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && !error && articles.length > 0 ? (
            articles.map((article, index) => (
              <NewsCard key={index} article={article} />
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
