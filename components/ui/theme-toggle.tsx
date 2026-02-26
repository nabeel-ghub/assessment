"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes"; // or however you manage theme

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <button className="absolute top-4 right-4 px-3 py-2 rounded opacity-0">
            {}
            ...
        </button>
    );
  }

  return (
    <button
      className="absolute top-4 right-4 px-3 py-2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 transition"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}