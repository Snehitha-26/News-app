import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        📰 News Feed
      </h1>

      <ThemeToggle />
    </header>
  );
}
