"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AccessibilityContextType {
  fontSize: number;
  highContrast: boolean;
  animationsDisabled: boolean;
  keyboardNavigation: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  toggleHighContrast: () => void;
  toggleAnimations: () => void;
  toggleKeyboardNavigation: () => void;
  announceToScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

const FONT_SIZE_MIN = 0.8;
const FONT_SIZE_MAX = 1.6;
const FONT_SIZE_STEP = 0.05; // Reduzido de 0.1 para 0.05 (5% em vez de 10%)
const FONT_SIZE_DEFAULT = 1.0;
const ANIMATIONS_DISABLED_DEFAULT = false;
const KEYBOARD_NAVIGATION_DEFAULT = true;

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState(FONT_SIZE_DEFAULT);
  const [highContrast, setHighContrast] = useState(false);
  const [animationsDisabled, setAnimationsDisabled] = useState(
    ANIMATIONS_DISABLED_DEFAULT
  );
  const [keyboardNavigation, setKeyboardNavigation] = useState(
    KEYBOARD_NAVIGATION_DEFAULT
  );

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem("accessibility-font-size");
    const savedHighContrast = localStorage.getItem(
      "accessibility-high-contrast"
    );
    const savedAnimationsDisabled = localStorage.getItem(
      "accessibility-animations-disabled"
    );
    const savedKeyboardNavigation = localStorage.getItem(
      "accessibility-keyboard-navigation"
    );

    if (savedFontSize) {
      const parsedFontSize = Number.parseFloat(savedFontSize);
      setFontSize(parsedFontSize);
      applyFontSize(parsedFontSize);
    }

    if (savedHighContrast) {
      const parsedHighContrast = savedHighContrast === "true";
      setHighContrast(parsedHighContrast);
      applyHighContrast(parsedHighContrast);
    }

    if (savedAnimationsDisabled) {
      const parsedAnimationsDisabled = savedAnimationsDisabled === "true";
      setAnimationsDisabled(parsedAnimationsDisabled);
      applyAnimationsDisabled(parsedAnimationsDisabled);
    }

    if (savedKeyboardNavigation) {
      const parsedKeyboardNavigation = savedKeyboardNavigation === "true";
      setKeyboardNavigation(parsedKeyboardNavigation);
      applyKeyboardNavigation(parsedKeyboardNavigation);
    }
  }, []);

  const applyFontSize = (size: number) => {
    document.documentElement.style.setProperty("--font-scale", size.toString());
  };

  const applyHighContrast = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + FONT_SIZE_STEP, FONT_SIZE_MAX);
    setFontSize(newSize);
    applyFontSize(newSize);
    localStorage.setItem("accessibility-font-size", newSize.toString());
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - FONT_SIZE_STEP, FONT_SIZE_MIN);
    setFontSize(newSize);
    applyFontSize(newSize);
    localStorage.setItem("accessibility-font-size", newSize.toString());
  };

  const resetFontSize = () => {
    setFontSize(FONT_SIZE_DEFAULT);
    applyFontSize(FONT_SIZE_DEFAULT);
    localStorage.setItem(
      "accessibility-font-size",
      FONT_SIZE_DEFAULT.toString()
    );
  };

  const toggleHighContrast = () => {
    const newHighContrast = !highContrast;
    setHighContrast(newHighContrast);
    applyHighContrast(newHighContrast);
    localStorage.setItem(
      "accessibility-high-contrast",
      newHighContrast.toString()
    );
  };

  const applyAnimationsDisabled = (disabled: boolean) => {
    if (disabled) {
      document.documentElement.classList.add("animations-disabled");
    } else {
      document.documentElement.classList.remove("animations-disabled");
    }
  };

  const applyKeyboardNavigation = (enabled: boolean) => {
    if (enabled) {
      document.documentElement.classList.add("keyboard-navigation");
    } else {
      document.documentElement.classList.remove("keyboard-navigation");
    }
  };

  const toggleAnimations = () => {
    const newAnimationsDisabled = !animationsDisabled;
    setAnimationsDisabled(newAnimationsDisabled);
    applyAnimationsDisabled(newAnimationsDisabled);
    localStorage.setItem(
      "accessibility-animations-disabled",
      newAnimationsDisabled.toString()
    );

    // Announce to screen reader
    announceToScreenReader(
      newAnimationsDisabled
        ? "Animações desabilitadas"
        : "Animações habilitadas"
    );
  };

  const toggleKeyboardNavigation = () => {
    const newKeyboardNavigation = !keyboardNavigation;
    setKeyboardNavigation(newKeyboardNavigation);
    applyKeyboardNavigation(newKeyboardNavigation);
    localStorage.setItem(
      "accessibility-keyboard-navigation",
      newKeyboardNavigation.toString()
    );

    // Announce to screen reader
    announceToScreenReader(
      newKeyboardNavigation
        ? "Navegação por teclado habilitada"
        : "Navegação por teclado desabilitada"
    );
  };

  const announceToScreenReader = (message: string) => {
    // Create a live region for screen reader announcements
    let liveRegion = document.getElementById("screen-reader-announcements");

    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "screen-reader-announcements";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.style.position = "absolute";
      liveRegion.style.left = "-10000px";
      liveRegion.style.width = "1px";
      liveRegion.style.height = "1px";
      liveRegion.style.overflow = "hidden";
      document.body.appendChild(liveRegion);
    }

    // Clear previous message and set new one
    liveRegion.textContent = "";
    setTimeout(() => {
      liveRegion!.textContent = message;
    }, 100);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        highContrast,
        animationsDisabled,
        keyboardNavigation,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        toggleHighContrast,
        toggleAnimations,
        toggleKeyboardNavigation,
        announceToScreenReader,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
}
