"use client";

import Link from "next/link";

export function AppHeader() {
  return (
    <header className="bg-gray-800 text-white" id="main-navigation">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="text-2xl">😊</span>
            </div>
            <Link href="/">
              <h1 className="text-2xl font-bold text-orange-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-300 rounded">
                BARRIGA CHEEA
              </h1>
            </Link>
          </div>
          <nav
            className="flex items-center space-x-8"
            aria-label="Menu principal"
          >
            <button
              type="button"
              className="hover:text-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 rounded px-2 py-1"
              aria-label="Página de contato"
            >
              Fale conosco
            </button>
            <button
              type="button"
              className="hover:text-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 rounded px-2 py-1"
              aria-label="Sobre nós"
            >
              Quem somos
            </button>
            <button
              type="button"
              className="hover:text-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 rounded px-2 py-1"
              aria-label="Localização"
            >
              Onde estamos
            </button>
            <button
              type="button"
              className="hover:text-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 rounded px-2 py-1"
              aria-label="Central de ajuda"
            >
              Ajuda
            </button>
            <div
              className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-300"
              role="button"
              tabIndex={0}
              aria-label="Perfil do usuário"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  // Handle user profile action
                }
              }}
            >
              <span className="text-white" aria-hidden="true">
                👤
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
