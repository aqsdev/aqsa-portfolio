import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  return document.documentElement.dataset["theme"] === "dark" ? "dark" : "light";
}

/**
 * Switches between light and dark. The first visit follows the system setting;
 * after that the visitor's choice is remembered. The initial theme is applied
 * before the page paints by a small script in __root.tsx, so there is no flash.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => setTheme(currentTheme()), []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.dataset["theme"] = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the switch still works for this visit.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} theme` : "Switch theme"}
      title={theme ? `Switch to ${next} theme` : "Switch theme"}
      className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
    >
      {/* Both icons render on the server; CSS shows the right one before hydration. */}
      <Moon className="size-[1.15rem] dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-[1.15rem] dark:block" aria-hidden="true" />
    </button>
  );
}
