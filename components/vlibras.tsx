/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { type EffectCallback, type JSX, useEffect, useRef } from "react";

type ExpectedReadyState =
  | ReadonlyArray<DocumentReadyState>
  | DocumentReadyState
  | undefined;

const isReadyStateMatch = (expected?: ExpectedReadyState): boolean => {
  if (!expected) {
    return true;
  }
  if (typeof expected === "string" && document.readyState === expected) {
    return true;
  }
  return expected.indexOf(document.readyState) !== -1;
};

type useReadyStateEffect = (
  effect: EffectCallback,
  deps?: any[],
  onState?: ExpectedReadyState
) => void;

const useReadyStateEffect: useReadyStateEffect = (
  effect,
  deps = [],
  onState = "complete"
): void => {
  useEffect(() => {
    const destructors: Array<() => void> = [
      () => document.removeEventListener("readystatechange", listener),
    ];

    const listener = () => {
      if (!isReadyStateMatch(onState)) {
        return;
      }
      const destructor = effect();
      if (destructor) {
        destructors.push(destructor);
      }
    };

    listener();
    document.addEventListener("readystatechange", listener);

    return () => destructors.forEach((d) => d());
  }, [deps, effect, onState]);
};

type Props = {
  forceOnload?: boolean;
};

export function VLibras({ forceOnload }: Props): JSX.Element {
  const vLibrasRef = useRef<HTMLDivElement>(null);

  useReadyStateEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
      script.async = true;
      const widgetUrl = `https://vlibras.gov.br/app`;

      script.onload = () => {
        // @ts-expect-error aaa
        new window.VLibras.Widget(widgetUrl);
        if (forceOnload) {
          // @ts-expect-error aaa
          window.onload();
        }

        // Aguarda um pouco para o widget ser renderizado e então torna-o acessível
        setTimeout(() => {
          makeVLibrasAccessible();
        }, 2000);
      };

      document.head.appendChild(script);

      return () => {
        // Cleanup se necessário
        const existingScript = document.querySelector(
          'script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]'
        );
        if (existingScript) {
          existingScript.remove();
        }
      };
    },
    [forceOnload],
    "complete"
  );

  const makeVLibrasAccessible = () => {
    // Procura pelo botão do VLibras que é criado dinamicamente
    const vLibrasButton = document.querySelector(
      '[vw-access-button="true"]'
    ) as HTMLElement;
    const vLibrasWidget = document.querySelector(
      '[vw-plugin-wrapper="true"]'
    ) as HTMLElement;

    if (vLibrasButton) {
      // Torna o botão acessível por teclado
      vLibrasButton.setAttribute("tabindex", "0");
      vLibrasButton.setAttribute("role", "button");
      vLibrasButton.setAttribute(
        "aria-label",
        "Ativar tradução em Libras - Língua Brasileira de Sinais"
      );
      vLibrasButton.setAttribute("aria-describedby", "vlibras-help");
      vLibrasButton.style.cursor = "pointer";

      // Adiciona suporte para navegação por teclado sem interferir no comportamento original
      vLibrasButton.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          // Simula um clique direto no botão original
          vLibrasButton.click();
        }
      });

      // Adiciona feedback visual para foco
      vLibrasButton.addEventListener("focus", () => {
        vLibrasButton.style.outline = "2px solid #F57C00";
        vLibrasButton.style.outlineOffset = "2px";
        vLibrasButton.style.boxShadow = "0 0 0 4px rgba(245, 124, 0, 0.2)";
      });

      vLibrasButton.addEventListener("blur", () => {
        vLibrasButton.style.outline = "";
        vLibrasButton.style.outlineOffset = "";
        vLibrasButton.style.boxShadow = "";
      });

      // Adiciona descrição de ajuda (invisível)
      if (!document.getElementById("vlibras-help")) {
        const helpText = document.createElement("div");
        helpText.id = "vlibras-help";
        helpText.className = "sr-only";
        helpText.textContent =
          "Plugin oficial do governo brasileiro para tradução automática em Língua Brasileira de Sinais. Pressione Enter ou Espaço para ativar.";
        document.body.appendChild(helpText);
      }
    }

    if (vLibrasWidget) {
      // Torna o widget acessível quando aberto
      vLibrasWidget.setAttribute("role", "region");
      vLibrasWidget.setAttribute("aria-label", "Widget de tradução VLibras");

      // Observa mudanças no widget para manter acessibilidade
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
          // Procura por elementos interativos dentro do widget
          const interactiveElements = vLibrasWidget.querySelectorAll(
            'button, [role="button"], input, select, div[onclick], span[onclick]'
          );
          interactiveElements.forEach((element) => {
            if (!element.hasAttribute("tabindex")) {
              element.setAttribute("tabindex", "0");
            }
            if (
              !element.hasAttribute("aria-label") &&
              !element.textContent?.trim()
            ) {
              element.setAttribute("aria-label", "Controle do VLibras");
            }
            (element as HTMLElement).style.cursor = "pointer";

            // Adiciona suporte para teclado em elementos interativos do widget
            element.addEventListener("keydown", (event) => {
              // @ts-expect-error funcionamento
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                (element as HTMLElement).click();
              }
            });
          });
        });
      });

      observer.observe(vLibrasWidget, {
        childList: true,
        subtree: true,
      });
    }
  };

  // Força a verificação periodicamente caso o widget demore para carregar
  useEffect(() => {
    const interval = setInterval(() => {
      const vLibrasButton = document.querySelector('[vw-access-button="true"]');
      if (vLibrasButton && !vLibrasButton.hasAttribute("tabindex")) {
        makeVLibrasAccessible();
      }
    }, 1000);

    // Para o intervalo após 15 segundos
    setTimeout(() => {
      clearInterval(interval);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={vLibrasRef}
      // @ts-expect-error aaa
      vw="true"
      className="enabled"
      role="complementary"
      aria-label="Área do plugin VLibras para tradução em Libras"
    >
      <div
        vw-access-button="true"
        className="active"
        tabIndex={0}
        role="button"
        aria-label="Ativar tradutor VLibras"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.currentTarget.click(); // Simula o clique com teclado
          }
        }}
        // Atributos de acessibilidade serão adicionados dinamicamente
      />
      <div
        vw-plugin-wrapper="true"
        role="region"
        aria-label="Widget de tradução VLibras"
      >
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
