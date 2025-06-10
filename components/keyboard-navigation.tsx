"use client";

import { useEffect } from "react";
import { useAccessibility } from "@/contexts/accessibility-context";

export function KeyboardNavigation() {
  const { keyboardNavigation, announceToScreenReader } = useAccessibility();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!keyboardNavigation) return;

      // Alt + 1: Go to main content
      if (event.altKey && event.key === "1") {
        event.preventDefault();
        const mainContent = document.querySelector("main");
        if (mainContent) {
          (mainContent as HTMLElement).focus();
          announceToScreenReader("Navegando para o conteúdo principal");
        }
      }

      // Alt + 2: Go to navigation
      if (event.altKey && event.key === "2") {
        event.preventDefault();
        const navigation = document.querySelector("nav");
        if (navigation) {
          const firstLink = navigation.querySelector("a, button");
          if (firstLink) {
            (firstLink as HTMLElement).focus();
            announceToScreenReader("Navegando para o menu");
          }
        }
      }

      // Alt + 3: Go to footer
      if (event.altKey && event.key === "3") {
        event.preventDefault();
        const footer = document.querySelector("footer");
        if (footer) {
          (footer as HTMLElement).focus();
          announceToScreenReader("Navegando para o rodapé");
        }
      }

      // Alt + 4: Go to accessibility bar
      if (event.altKey && event.key === "4") {
        event.preventDefault();
        const accessibilityBar = document.querySelector(
          '[aria-label="Barra de acessibilidade"]'
        );
        if (accessibilityBar) {
          const firstButton = accessibilityBar.querySelector(
            "button, a, [tabindex]"
          );
          if (firstButton) {
            (firstButton as HTMLElement).focus();
            announceToScreenReader("Navegando para a barra de acessibilidade");
          }
        }
      }

      // Escape key: Close modals/dialogs
      if (event.key === "Escape") {
        const openDialog = document.querySelector(
          '[role="dialog"][data-state="open"]'
        );
        if (openDialog) {
          const closeButton = openDialog.querySelector(
            '[aria-label*="fechar"], [aria-label*="close"]'
          );
          if (closeButton) {
            (closeButton as HTMLElement).click();
            announceToScreenReader("Modal fechada");
          }
        }
      }

      // Tab navigation announcements
      if (event.key === "Tab") {
        setTimeout(() => {
          const activeElement = document.activeElement;
          if (activeElement && activeElement.getAttribute("aria-label")) {
            const label = activeElement.getAttribute("aria-label");
            announceToScreenReader(`Foco em: ${label}`);
          }
        }, 100);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [keyboardNavigation, announceToScreenReader]);

  // Melhora a ordem de navegação por Tab incluindo VLibras
  // Remover a função improveTabOrder que está causando o erro de hidratação
  // e substituir por uma abordagem mais segura

  // Remover este useEffect que está causando o problema:

  return null;
}
