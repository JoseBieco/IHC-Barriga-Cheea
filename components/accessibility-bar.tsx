"use client";

import type React from "react";

import { useState } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAccessibility } from "@/contexts/accessibility-context";

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

  return (
    <>
      <div
        className="bg-gray-200 text-xs text-gray-600 px-4 py-1"
        role="banner"
        aria-label="Barra de acessibilidade"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <nav
            aria-label="Links de navegação rápida"
            className="flex space-x-4"
          >
            <a
              href="#main-content"
              className="skip-link hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Ir para conteúdo principal"
            >
              Ir para conteúdo [1]
            </a>
            <a
              href="#main-navigation"
              className="skip-link hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Ir para menu principal"
            >
              Ir para menu [2]
            </a>
            <a
              href="#footer"
              className="skip-link hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Ir para rodapé"
            >
              Ir para o rodapé [3]
            </a>
            <button
              type="button"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500"
              onClick={() => {
                const firstAccessibilityButton = document.querySelector(
                  '[aria-label="Abrir configurações de tamanho de fonte"]'
                );
                if (firstAccessibilityButton) {
                  (firstAccessibilityButton as HTMLElement).focus();
                }
              }}
              aria-label="Ir para controles de acessibilidade"
            >
              Ir para Acessibilidade [4]
            </button>
          </nav>
          <div
            className="flex items-center space-x-4"
            role="toolbar"
            aria-label="Controles de acessibilidade"
          >
            <button
              type="button"
              className="hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded px-1"
              onClick={handleFontModalOpen}
              onKeyDown={(e) => handleKeyDown(e, handleFontModalOpen)}
              aria-label="Abrir configurações de tamanho de fonte"
              tabIndex={0}
            >
              A+ | A-
            </button>
            <button
              type="button"
              className={`hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded px-1 ${
                highContrast ? "font-bold text-black" : ""
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
              className={`hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded px-1 ${
                animationsDisabled ? "font-bold text-black" : ""
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
        <DialogContent className="sm:max-w-md">
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

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  decreaseFontSize();
                  announceToScreenReader(
                    `Fonte diminuída para ${Math.round(
                      (fontSize - 0.1) * 100
                    )}%`
                  );
                }}
                disabled={fontSize <= 0.8}
                className="flex items-center space-x-2"
                aria-label="Diminuir tamanho da fonte"
              >
                <Minus className="h-4 w-4" />
                <span>Diminuir fonte</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  resetFontSize();
                  announceToScreenReader("Fonte resetada para 100%");
                }}
                className="flex items-center space-x-2"
                aria-label="Resetar tamanho da fonte para padrão"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Resetar</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  increaseFontSize();
                  announceToScreenReader(
                    `Fonte aumentada para ${Math.round(
                      (fontSize + 0.1) * 100
                    )}%`
                  );
                }}
                disabled={fontSize >= 1.6}
                className="flex items-center space-x-2"
                aria-label="Aumentar tamanho da fonte"
              >
                <Plus className="h-4 w-4" />
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
