import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // ✅ icons from lucide-react

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
      title="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-gray-800" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
}
