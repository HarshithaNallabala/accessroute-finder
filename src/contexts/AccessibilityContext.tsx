import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilityContextType {
  accessibilityMode: boolean;
  toggleAccessibilityMode: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  accessibilityMode: false,
  toggleAccessibilityMode: () => {},
});

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [accessibilityMode, setAccessibilityMode] = useState(() => {
    return localStorage.getItem("accessibilityMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("accessibilityMode", String(accessibilityMode));
    const root = document.documentElement;
    if (accessibilityMode) {
      root.classList.add("a11y-mode");
      // Announce to screen readers
      const announcement = document.createElement("div");
      announcement.setAttribute("role", "status");
      announcement.setAttribute("aria-live", "polite");
      announcement.className = "sr-only";
      announcement.textContent = "Accessibility mode enabled: larger text, higher contrast, and enhanced focus indicators are now active.";
      document.body.appendChild(announcement);
      setTimeout(() => announcement.remove(), 3000);
    } else {
      root.classList.remove("a11y-mode");
    }
  }, [accessibilityMode]);

  const toggleAccessibilityMode = () => setAccessibilityMode((prev) => !prev);

  return (
    <AccessibilityContext.Provider value={{ accessibilityMode, toggleAccessibilityMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => useContext(AccessibilityContext);
