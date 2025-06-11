import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaInstagram as Instagram } from "react-icons/fa";
import { AiOutlineX as Twitter } from "react-icons/ai";
import { CiFacebook as Facebook } from "react-icons/ci";
import { BarriguinhaCheeaIcon } from "./barriguinha-cheea-icon";
import { PersonStanding } from "lucide-react";

export function AppFooter() {
  return (
    <footer
      className="bg-[#212121] text-[#EBEBEB] mt-16"
      id="footer"
      tabIndex={-1}
      role="contentinfo"
      aria-label="Rodapé do site"
    >
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Newsletter Section */}
        <div className="mb-8 md:mb-12 flex justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Assine a nossa <span className="text-[#F57C00]">newsletter</span>
            </h3>
            <p className="text-[#EBEBEB] mb-4 md:mb-6 text-sm md:text-base">
              Fique por dentro das últimas notícias, anúncios e artigos.
            </p>
          </div>
          <form
            className="flex flex-col sm:flex-row max-w-md gap-2 sm:gap-0"
            role="form"
            aria-label="Formulário de inscrição na newsletter"
          >
            <Input
              type="email"
              placeholder="Digite seu email"
              className="rounded-r-none sm:rounded-r-none rounded-l-md border-gray-600 bg-[#FEFEFF] text-gray-800 flex-1 cursor-text"
              aria-label="Digite seu endereço de email para receber nossa newsletter"
              aria-required="true"
            />
            <Button
              className="bg-[#F57C00] hover:bg-[#E65100] rounded-l-none sm:rounded-l-none rounded-r-md px-4 md:px-6 text-black transition-colors cursor-pointer"
              type="submit"
              aria-label="Inscrever-se na newsletter"
            >
              Inscrever-se
            </Button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-t border-gray-600 pt-6 md:pt-8 gap-6 lg:gap-0">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 flex items-center justify-center"
              role="img"
              aria-label="Logo do Barriga Cheea"
            >
              <BarriguinhaCheeaIcon />
            </div>
            <h4 className="text-lg md:text-xl font-bold text-[#F57C00]">
              BARRIGA CHEEA
            </h4>
          </div>

          <nav
            className="flex flex-wrap gap-4 md:gap-6 order-3 lg:order-2"
            aria-label="Links do rodapé"
            role="navigation"
          >
            <Link
              href="#"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded"
              aria-label="Ir para página inicial"
            >
              Início
            </Link>
            <Link
              href="#"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded"
              aria-label="Conhecer mais sobre a organização"
            >
              Quem somos
            </Link>
            <Link
              href="#"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded"
              aria-label="Entender como funciona a plataforma"
            >
              Funcionamento
            </Link>
            <Link
              href="#"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded"
              aria-label="Entrar em contato conosco"
            >
              Fale conosco
            </Link>
            <Link
              href="#"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded"
              aria-label="Obter ajuda e suporte"
            >
              Ajuda
            </Link>
            <Link
              href="#"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded"
              aria-label="Encontrar nossas localizações"
            >
              Onde estamos
            </Link>
          </nav>

          <div
            className="flex space-x-4 order-2 lg:order-3"
            role="group"
            aria-label="Links para redes sociais"
          >
            <Link
              href="#"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded"
              aria-label="Seguir no Instagram"
            >
              <Instagram className="w-6 h-6" aria-hidden="true" />
            </Link>
            <Link
              href="#"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded"
              aria-label="Seguir no Facebook"
            >
              <Facebook className="w-6 h-6" aria-hidden="true" />
            </Link>
            <Link
              href="#"
              className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded"
              aria-label="Seguir no Twitter"
            >
              <Twitter className="w-6 h-6" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Selo de Inclusão Digital */}
        <div className="mt-8 pt-6 border-t border-gray-600 text-center">
          <div className="inline-block px-4 py-2 rounded-lg">
            <div className="flex text-white text-sm font-semibold items-center justify-center">
              <span className="mr-2">
                <PersonStanding />
              </span>{" "}
              Comprometidos com a inclusão digital e acessibilidade para todos.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
