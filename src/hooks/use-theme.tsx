import { createContext, forwardRef, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: "light", toggleTheme: () => {} });

export const ThemeProvider = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, _ref) => {
    const [theme, setTheme] = useState<Theme>(() => {
      const stored = localStorage.getItem("nirvaha-theme");
      return (stored === "dark" ? "dark" : "light") as Theme;
    });

    useEffect(() => {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("nirvaha-theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }
);
ThemeProvider.displayName = "ThemeProvider";

export const useTheme = () => useContext(ThemeContext);
