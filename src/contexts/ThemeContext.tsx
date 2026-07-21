import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const FORCED_THEME: Theme = "dark";
const STORAGE_KEY = "certifygrc-theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeClass() {
  const root = document.documentElement;
  root.classList.add("dark");
  root.style.colorScheme = "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyThemeClass();
    try {
      window.localStorage.setItem(STORAGE_KEY, FORCED_THEME);
    } catch {
      // localStorage unavailable — dark mode still applies for this session.
    }
  }, []);

  const setTheme = useCallback((_next: Theme) => {
    applyThemeClass();
  }, []);

  const toggleTheme = useCallback(() => {
    applyThemeClass();
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme: FORCED_THEME, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return { theme: FORCED_THEME, setTheme: () => {}, toggleTheme: () => {} };
  }
  return ctx;
}
