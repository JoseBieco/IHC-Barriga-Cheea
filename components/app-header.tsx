"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="bg-[#212121] text-[#EBEBEB]"
      id="main-navigation"
      role="banner"
      aria-label="Cabeçalho principal do site"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 bg-[#F57C00] rounded-full flex items-center justify-center"
              aria-hidden="true"
              role="img"
              aria-label="Logo do Barriga Cheea - emoji sorridente"
            >
              <span className="text-2xl" aria-hidden="true">
                😊
              </span>
            </div>
            <Link href="/" aria-label="Ir para página inicial do Barriga Cheea">
              <h1 className="text-xl md:text-2xl font-bold text-[#F57C00] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded transition-colors hover:text-[#E65100]">
                BARRIGA CHEEA
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-6 xl:space-x-8"
            aria-label="Menu principal de navegação"
            role="navigation"
          >
            <button
              type="button"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-2 py-1 text-sm xl:text-base"
              aria-label="Acessar página de contato"
            >
              Fale conosco
            </button>
            <button
              type="button"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-2 py-1 text-sm xl:text-base"
              aria-label="Conhecer mais sobre a organização"
            >
              Funcionamento
            </button>
            <button
              type="button"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-2 py-1 text-sm xl:text-base"
              aria-label="Encontrar localizações de atendimento"
            >
              Onde estamos
            </button>
            <button
              type="button"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-2 py-1 text-sm xl:text-base"
              aria-label="Acessar perguntas frequentes e central de ajuda"
            >
              FAQ
            </button>

            {/* User Profile/Login */}
            {isAuthenticated && currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="w-10 h-10 bg-[#E65100] rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] transition-colors hover:bg-[#F57C00]"
                    aria-label={`Menu do usuário: ${currentUser.nomeCompleto}. Clique para ver opções`}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <User
                      className="w-5 h-5 text-[#EBEBEB]"
                      aria-hidden="true"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48"
                  role="menu"
                  aria-label="Menu de opções do usuário"
                >
                  <div
                    className="px-2 py-1.5 text-sm text-gray-600 border-b"
                    role="menuitem"
                  >
                    <p
                      className="font-medium text-gray-900 truncate"
                      aria-label={`Nome do usuário: ${currentUser.nomeCompleto}`}
                    >
                      {currentUser.nomeCompleto}
                    </p>
                    <p
                      className="text-xs truncate"
                      aria-label={`Email do usuário: ${currentUser.email}`}
                    >
                      {currentUser.email}
                    </p>
                  </div>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                    role="menuitem"
                    aria-label="Sair da conta"
                  >
                    <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" aria-label="Fazer login na plataforma">
                <button
                  className="w-10 h-10 bg-[#E65100] rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] transition-colors hover:bg-[#F57C00]"
                  aria-label="Botão para fazer login"
                >
                  <User className="w-5 h-5 text-[#EBEBEB]" aria-hidden="true" />
                </button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* User Profile/Login for Mobile */}
            {isAuthenticated && currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="w-8 h-8 bg-[#E65100] rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] transition-colors hover:bg-[#F57C00]"
                    aria-label={`Menu do usuário: ${currentUser.nomeCompleto}`}
                  >
                    <User
                      className="w-4 h-4 text-[#EBEBEB]"
                      aria-hidden="true"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm text-gray-600 border-b">
                    <p className="font-medium text-gray-900 truncate">
                      {currentUser.nomeCompleto}
                    </p>
                    <p className="text-xs truncate">{currentUser.email}</p>
                  </div>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <button
                  className="w-8 h-8 bg-[#E65100] rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] transition-colors hover:bg-[#F57C00]"
                  aria-label="Fazer login"
                >
                  <User className="w-4 h-4 text-[#EBEBEB]" aria-hidden="true" />
                </button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-[#EBEBEB] hover:text-[#F57C00] hover:bg-transparent p-2"
              aria-label={
                isMobileMenuOpen
                  ? "Fechar menu de navegação"
                  : "Abrir menu de navegação"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="lg:hidden mt-4 pb-4 border-t border-gray-600"
            role="navigation"
            aria-label="Menu de navegação móvel"
          >
            <div className="flex flex-col space-y-3 pt-4">
              <button
                type="button"
                onClick={closeMobileMenu}
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-2 py-2 text-left"
                aria-label="Acessar página de contato"
              >
                Fale conosco
              </button>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-2 py-2 text-left"
                aria-label="Conhecer funcionamento da plataforma"
              >
                Funcionamento
              </button>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-2 py-2 text-left"
                aria-label="Encontrar localizações"
              >
                Onde estamos
              </button>
              <button
                type="button"
                onClick={closeMobileMenu}
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded px-2 py-2 text-left"
                aria-label="Perguntas frequentes"
              >
                FAQ
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
