import React from "react";

const categories = [
  "General",
  "Technology",
  "Business",
  "Sports",
  "Health",
  "Science",
  "Entertainment",
];

export default function CategoryFilters({ currentCategory, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded-full border ${
            currentCategory === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          } hover:bg-blue-500 hover:text-white transition`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
