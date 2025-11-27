import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilters from "./components/CategoryFilters";
import NewsCard from "./components/NewsCard";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("latest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [usingProxy, setUsingProxy] = useState(false);

  const apiKey = "63d7ec112089bb2ad562fbf8fa77718d";

  // Fetch news with fallback to proxy
  const fetchNews = async (searchQuery = "latest") => {
    setLoading(true);
    setError("");
    setArticles([]);
    setUsingProxy(false);

    const endpoint = category
      ? `https://gnews.io/api/v4/top-headlines?category=${category.toLowerCase()}&lang=en&max=12&apikey=${apiKey}`
      : `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          searchQuery
        )}&lang=en&max=12&apikey=${apiKey}`;

    try {
      // Try direct request first
      const directResponse = await fetch(endpoint);
      if (!directResponse.ok) throw new Error(`Status ${directResponse.status}`);

      const directData = await directResponse.json();
      if (directData.articles) {
        setArticles(directData.articles);
        setLoading(false);
        return;
      }

      throw new Error("No articles returned from direct fetch");
    } catch (err) {
      console.warn("Direct fetch failed, using proxy:", err);
    }

    // Proxy fallback
    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const proxiedUrl = `${proxyUrl}${endpoint}`;

      setUsingProxy(true);
      const proxyResponse = await fetch(proxiedUrl);

      if (!proxyResponse.ok)
        throw new Error(`Proxy failed: ${proxyResponse.status}`);

      const proxyData = await proxyResponse.json();
      if (proxyData.articles) {
        setArticles(proxyData.articles);
      } else {
        throw new Error("No articles returned from proxy");
      }
    } catch (err) {
      console.error("Proxy fetch failed:", err);
      setError("Failed to fetch news. Please check your internet or API key.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever category changes
  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      {/* Header (separate component now) */}
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Search */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={() => fetchNews(query)}
        />

        {/* Categories */}
        <CategoryFilters currentCategory={category} onSelect={setCategory} />

        {/* Status Messages */}
        {usingProxy && (
          <p className="text-center text-yellow-500 mt-4">
            ⚠️ Using proxy mode due to CORS restrictions.
          </p>
        )}

        {loading && (
          <p className="text-center text-gray-500 mt-6">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500 mt-6">{error}</p>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
