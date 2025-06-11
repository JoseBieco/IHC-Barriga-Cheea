"use client";

import { useAccessibility } from "@/contexts/accessibility-context";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Minus, Plus, RotateCcw } from "lucide-react";

export function AccessibilityBar() {
  const [showFontModal, setShowFontModal] = useState(false);
  const {
    fontSize,
    highContrast,
    animationsDisabled,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    toggleAnimations,
    announceToScreenReader,
  } = useAccessibility();

  const getFontSizePercentage = () => {
    return Math.round(fontSize * 100);
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  const handleFontModalOpen = () => {
    setShowFontModal(true);
    announceToScreenReader("Modal de ajuste de fonte aberta");
  };

  const handleHighContrastToggle = () => {
    toggleHighContrast();
    announceToScreenReader(
      highContrast ? "Alto contraste desabilitado" : "Alto contraste habilitado"
    );
  };

  const handleAnimationsToggle = () => {
    toggleAnimations();
  };

  const skipToMain = () => {
    const mainContent = document.querySelector(
      'main, [role="main"], #main-content'
    );
    if (mainContent) {
      (mainContent as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      (mainContent as HTMLElement).focus();
      announceToScreenReader("Navegado para o conteúdo principal");
    }
  };

  const skipToMenu = () => {
    const menu = document.querySelector(
      '#main-navigation, nav[role="navigation"], header nav'
    );
    if (menu) {
      (menu as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      const firstLink = menu.querySelector("a, button");
      if (firstLink) {
        (firstLink as HTMLElement).focus();
      }
      announceToScreenReader("Navegado para o menu de navegação");
    }
  };

  const skipToFooter = () => {
    const footer = document.querySelector(
      'footer, [role="contentinfo"], #footer'
    );
    if (footer) {
      (footer as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      (footer as HTMLElement).focus();
      announceToScreenReader("Navegado para o rodapé");
    }
  };

  return (
    <>
      <div
        className="bg-gray-200 text-xs text-gray-600 px-4 py-2"
        role="banner"
        aria-label="Barra de acessibilidade"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-y-2">
          <nav
            aria-label="Links de navegação rápida"
            className="flex flex-wrap items-center gap-x-4"
          >
            <button
              type="button"
              onClick={skipToMain}
              className="underline underline-offset-2 text-gray-700 hover:text-[#F57C00] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-1"
              aria-label="Ir para conteúdo principal - Atalho 1"
              accessKey="1"
            >
              Ir para conteúdo [1]
            </button>
            <button
              type="button"
              onClick={skipToMenu}
              className="underline underline-offset-2 text-gray-700 hover:text-[#F57C00] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-1"
              aria-label="Ir para menu principal - Atalho 2"
              accessKey="2"
            >
              Ir para menu [2]
            </button>
            <button
              type="button"
              onClick={skipToFooter}
              className="underline underline-offset-2 text-gray-700 hover:text-[#F57C00] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-1"
              aria-label="Ir para rodapé - Atalho 3"
              accessKey="3"
            >
              Ir para o rodapé [3]
            </button>
            <Link
              href="/acessibilidade"
              className="underline underline-offset-2 text-gray-700 hover:text-[#F57C00] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-1"
              aria-label="Ir para página de informações sobre acessibilidade"
              accessKey="4"
              role="link"
            >
              Ir para Acessibilidade [4]
            </Link>
          </nav>
          <div
            className="flex flex-wrap items-center gap-x-4"
            role="toolbar"
            aria-label="Controles de acessibilidade"
          >
            <button
              type="button"
              className="underline underline-offset-2 text-gray-700 hover:text-[#F57C00] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-1"
              onClick={handleFontModalOpen}
              onKeyDown={(e) => handleKeyDown(e, handleFontModalOpen)}
              aria-label="Abrir configurações de tamanho de fonte"
              tabIndex={0}
            >
              A+ | A-
            </button>
            <button
              type="button"
              className={`underline underline-offset-2 text-gray-700 hover:text-[#F57C00] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-1 ${
                highContrast ? "font-bold" : ""
              }`}
              onClick={handleHighContrastToggle}
              onKeyDown={(e) => handleKeyDown(e, handleHighContrastToggle)}
              aria-label={
                highContrast
                  ? "Desabilitar alto contraste"
                  : "Habilitar alto contraste"
              }
              aria-pressed={highContrast}
              tabIndex={0}
            >
              Alto contraste
            </button>
            <button
              type="button"
              className={`underline underline-offset-2 text-gray-700 hover:text-[#F57C00] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-1 ${
                animationsDisabled ? "font-bold" : ""
              }`}
              onClick={handleAnimationsToggle}
              onKeyDown={(e) => handleKeyDown(e, handleAnimationsToggle)}
              aria-label={
                animationsDisabled
                  ? "Habilitar animações"
                  : "Desabilitar animações"
              }
              aria-pressed={animationsDisabled}
              tabIndex={0}
            >
              {animationsDisabled
                ? "Habilitar Animações"
                : "Desligar Animações"}
            </button>
          </div>
        </div>
      </div>

      {/* Font Size Modal */}
      <Dialog open={showFontModal} onOpenChange={setShowFontModal}>
        <DialogContent className="w-auto h-auto flex flex-col">
          <DialogHeader>
            <DialogTitle>Ajustar tamanho da fonte</DialogTitle>
            <DialogDescription>
              Use os botões abaixo para aumentar ou diminuir o tamanho da fonte
              em toda a aplicação.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Tamanho atual:</p>
              <p className="text-2xl font-bold">{getFontSizePercentage()}%</p>
            </div>

            <div className="flex justify-center space-x-4 flex flex-row flex-wrap gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  decreaseFontSize();
                  announceToScreenReader(
                    `Fonte diminuída para ${Math.round(
                      (fontSize - 0.05) * 100
                    )}%`
                  );
                }}
                disabled={fontSize <= 0.8}
                className="flex items-center space-x-2 cursor-pointer"
                aria-label="Diminuir tamanho da fonte"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
                <span>Diminuir fonte</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  resetFontSize();
                  announceToScreenReader("Fonte resetada para 100%");
                }}
                className="flex items-center space-x-2 cursor-pointer"
                aria-label="Resetar tamanho da fonte para padrão"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Resetar</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  increaseFontSize();
                  announceToScreenReader(
                    `Fonte aumentada para ${Math.round(
                      (fontSize + 0.05) * 100
                    )}%`
                  );
                }}
                disabled={fontSize >= 1.6}
                className="flex items-center space-x-2 cursor-pointer"
                aria-label="Aumentar tamanho da fonte"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>Aumentar fonte</span>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Faixa: 80% - 160% do tamanho original
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
