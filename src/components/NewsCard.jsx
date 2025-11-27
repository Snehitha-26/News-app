import React from "react";

export default function NewsCard({ article }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="font-bold text-lg mb-2 dark:text-white">{article.title}</h2>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          {article.description || "No description available."}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          Read more →
        </a>
      </div>
    </div>
  );
}
