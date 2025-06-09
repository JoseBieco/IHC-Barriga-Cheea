"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye,
  Keyboard,
  Volume2,
  MousePointer,
  Type,
  Contrast,
  Play,
  Users,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

export default function AcessibilidadePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-[#FEFEFF] border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav
            className="text-sm text-gray-600"
            aria-label="Navegação estrutural"
            role="navigation"
          >
            <Link
              href="/"
              className="hover:text-[#E65100] transition-colors"
              aria-label="Voltar para página inicial"
            >
              Página inicial
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span aria-current="page">Acessibilidade</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main
        className="max-w-4xl mx-auto px-4 py-8"
        role="main"
        aria-label="Informações sobre acessibilidade do site"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Recursos de <span className="text-[#F57C00]">Acessibilidade</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            O Barriga Cheea foi desenvolvido com foco na inclusão digital,
            oferecendo diversos recursos para garantir que todos possam utilizar
            nossa plataforma de forma eficiente e confortável.
          </p>
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" aria-label="Voltar para página inicial">
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-[#F57C00] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Voltar ao Início
            </Button>
          </Link>
        </div>

        {/* Accessibility Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Navegação por Teclado */}
          <Card className="border-l-4 border-l-[#F57C00]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Keyboard
                  className="w-6 h-6 text-[#F57C00]"
                  aria-hidden="true"
                />
                Navegação por Teclado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Navegue por todo o site usando apenas o teclado, sem necessidade
                do mouse.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Atalhos disponíveis:</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <kbd className="bg-gray-200 px-2 py-1 rounded">Alt + 1</kbd>{" "}
                    - Ir para conteúdo principal
                  </li>
                  <li>
                    <kbd className="bg-gray-200 px-2 py-1 rounded">Alt + 2</kbd>{" "}
                    - Ir para menu de navegação
                  </li>
                  <li>
                    <kbd className="bg-gray-200 px-2 py-1 rounded">Alt + 3</kbd>{" "}
                    - Ir para rodapé
                  </li>
                  <li>
                    <kbd className="bg-gray-200 px-2 py-1 rounded">Alt + 4</kbd>{" "}
                    - Ir para controles de acessibilidade
                  </li>
                  <li>
                    <kbd className="bg-gray-200 px-2 py-1 rounded">Tab</kbd> -
                    Navegar entre elementos
                  </li>
                  <li>
                    <kbd className="bg-gray-200 px-2 py-1 rounded">
                      Enter/Espaço
                    </kbd>{" "}
                    - Ativar botões e links
                  </li>
                  <li>
                    <kbd className="bg-gray-200 px-2 py-1 rounded">Esc</kbd> -
                    Fechar modais e menus
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Ajuste de Fonte */}
          <Card className="border-l-4 border-l-[#F57C00]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Type className="w-6 h-6 text-[#F57C00]" aria-hidden="true" />
                Ajuste de Tamanho da Fonte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Aumente ou diminua o tamanho da fonte para melhor legibilidade.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Como usar:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Clique em A+ | A- na barra de acessibilidade</li>
                  <li>• Use os botões para aumentar, diminuir ou resetar</li>
                  <li>• Faixa disponível: 80% a 160% do tamanho original</li>
                  <li>• As configurações são salvas automaticamente</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Alto Contraste */}
          <Card className="border-l-4 border-l-[#F57C00]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Contrast
                  className="w-6 h-6 text-[#F57C00]"
                  aria-hidden="true"
                />
                Alto Contraste
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Ative o modo de alto contraste para melhor visualização de
                textos e elementos.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Características:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Contraste mínimo de 4.5:1 (WCAG 2.1 AA)</li>
                  <li>• Cores otimizadas para baixa visão</li>
                  <li>• Bordas mais definidas em elementos</li>
                  <li>• Clique em Alto contraste para ativar/desativar</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Controle de Animações */}
          <Card className="border-l-4 border-l-[#F57C00]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Play className="w-6 h-6 text-[#F57C00]" aria-hidden="true" />
                Controle de Animações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Desabilite animações para reduzir distrações e melhorar o foco.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Benefícios:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Reduz enjoo causado por movimento</li>
                  <li>• Melhora foco para pessoas com TDAH</li>
                  <li>• Economiza bateria em dispositivos móveis</li>
                  <li>• Clique em Desligar Animações para ativar</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Leitores de Tela */}
          <Card className="border-l-4 border-l-[#F57C00]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Volume2
                  className="w-6 h-6 text-[#F57C00]"
                  aria-hidden="true"
                />
                Compatibilidade com Leitores de Tela
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Site otimizado para funcionar com leitores de tela populares.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Leitores testados:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• NVDA (Windows) - Gratuito</li>
                  <li>• JAWS (Windows) - Comercial</li>
                  <li>• VoiceOver (Mac/iOS) - Nativo</li>
                  <li>• TalkBack (Android) - Nativo</li>
                  <li>• Orca (Linux) - Gratuito</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* VLibras */}
          <Card className="border-l-4 border-l-[#F57C00]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#F57C00]" aria-hidden="true" />
                VLibras - Tradução em Libras
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Plugin oficial do governo brasileiro para tradução automática em
                Língua Brasileira de Sinais.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Como usar:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Procure pelo ícone azul do VLibras no canto da tela</li>
                  <li>• Clique para ativar o avatar de tradução</li>
                  <li>• Selecione textos para tradução automática</li>
                  <li>• Ajuste velocidade e tamanho do avatar</li>
                </ul>
                <div className="mt-3 pt-3 border-t">
                  <Link
                    href="https://vlibras.gov.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E65100] hover:text-[#F57C00] flex items-center gap-1 text-sm"
                    aria-label="Saiba mais sobre VLibras - abre em nova aba"
                  >
                    Saiba mais sobre VLibras
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Standards and Compliance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-[#F57C00]" aria-hidden="true" />
              Padrões e Conformidade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Nosso site segue as principais diretrizes internacionais de
              acessibilidade web:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">WCAG 2.1 Nível AA</h4>
                <p className="text-sm text-gray-600">
                  Seguimos as Diretrizes de Acessibilidade para Conteúdo Web,
                  garantindo que o site seja perceptível, operável,
                  compreensível e robusto.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">
                  Lei Brasileira de Inclusão
                </h4>
                <p className="text-sm text-gray-600">
                  Cumprimos a Lei nº 13.146/2015 (LBI) e o Decreto nº
                  9.508/2018, que estabelecem a obrigatoriedade de
                  acessibilidade em sites públicos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help and Support */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Precisa de Ajuda?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Se você encontrar alguma barreira de acessibilidade ou precisar de
              assistência adicional, entre em contato conosco:
            </p>
            <div className="bg-[#F57C00] bg-opacity-10 p-4 rounded-lg">
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> acessibilidade@barrigacheea.org.br
                </p>
                <p>
                  <strong>Telefone:</strong> (11) 1234-5678
                </p>
                <p>
                  <strong>Horário:</strong> Segunda a sexta, das 8h às 18h
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Responderemos sua solicitação em até 48 horas úteis.
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Ações Rápidas</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-[#E65100] hover:bg-[#F57C00] text-white"
              onClick={() => {
                const accessibilityBar = document.querySelector(
                  '[aria-label="Barra de acessibilidade"]'
                );
                if (accessibilityBar) {
                  const firstButton = accessibilityBar.querySelector("button");
                  if (firstButton) {
                    firstButton.focus();
                    firstButton.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              aria-label="Ir para controles de acessibilidade no topo da página"
            >
              <MousePointer className="w-4 h-4 mr-2" aria-hidden="true" />
              Ir para Controles de Acessibilidade
            </Button>
            <Link href="/" aria-label="Voltar para página inicial">
              <Button variant="outline" className="w-full sm:w-auto">
                Voltar ao Site
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="bg-[#212121] text-[#EBEBEB] mt-16"
        role="contentinfo"
        aria-label="Rodapé do site"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div
                className="w-8 h-8 bg-[#F57C00] rounded-full flex items-center justify-center"
                role="img"
                aria-label="Logo do Barriga Cheea"
              >
                <span className="text-lg" aria-hidden="true">
                  😊
                </span>
              </div>
              <h4 className="text-xl font-bold text-[#F57C00]">
                BARRIGA CHEEA
              </h4>
            </div>
            <p className="text-sm text-[#EBEBEB]">
              Comprometidos com a inclusão digital e acessibilidade para todos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
