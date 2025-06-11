"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  CheckCircle,
} from "lucide-react";

export default function AcessibilidadePage() {
  const [showWcagModal, setShowWcagModal] = useState(false);

  const scrollToAccessibilityBar = () => {
    // Primeiro tenta encontrar a barra de acessibilidade
    const accessibilityBar = document.querySelector(
      '[aria-label="Barra de acessibilidade"]'
    );

    if (accessibilityBar) {
      // Rola suavemente até a barra de acessibilidade
      accessibilityBar.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });

      // Aguarda um pouco e então foca no primeiro elemento interativo
      setTimeout(() => {
        const firstButton = accessibilityBar.querySelector(
          "button, a, [tabindex]"
        ) as HTMLElement;
        if (firstButton) {
          firstButton.focus();

          // Anuncia para leitores de tela
          const announcement = document.getElementById(
            "screen-reader-announcements"
          );
          if (announcement) {
            announcement.textContent =
              "Navegado para os controles de acessibilidade no topo da página";
          }
        }
      }, 500);
    } else {
      // Fallback: rola para o topo da página
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Tenta focar no primeiro elemento interativo da página
      setTimeout(() => {
        const firstInteractive = document.querySelector(
          'button, a, input, [tabindex="0"]'
        ) as HTMLElement;
        if (firstInteractive) {
          firstInteractive.focus();
        }
      }, 500);
    }
  };

  const wcagCriteria = [
    {
      principle: "1. Perceptível",
      description:
        "A informação e os componentes da interface devem ser apresentados de forma que os usuários possam percebê-los.",
      criteria: [
        {
          id: "1.1.1",
          name: "Conteúdo Não Textual",
          level: "A",
          description: "Todo conteúdo não textual possui alternativa textual.",
          implementation:
            "Todas as imagens possuem atributos alt descritivos, ícones têm aria-label, e elementos decorativos são marcados como aria-hidden.",
        },
        {
          id: "1.3.1",
          name: "Informações e Relações",
          level: "A",
          description:
            "Informações, estrutura e relações são preservadas quando a apresentação muda.",
          implementation:
            "Usamos elementos semânticos HTML5 (header, nav, main, footer), headings hierárquicos (h1-h6), e atributos ARIA para relações complexas.",
        },
        {
          id: "1.3.2",
          name: "Sequência com Significado",
          level: "A",
          description: "A sequência de leitura é lógica e significativa.",
          implementation:
            "A ordem dos elementos no DOM segue uma sequência lógica de leitura, independente da apresentação visual.",
        },
        {
          id: "1.4.1",
          name: "Uso de Cor",
          level: "A",
          description:
            "A cor não é usada como único meio de transmitir informação.",
          implementation:
            "Status de produtos usam ícones além de cores, links têm sublinhado, e estados de erro incluem texto explicativo.",
        },
        {
          id: "1.4.3",
          name: "Contraste (Mínimo)",
          level: "AA",
          description:
            "Contraste mínimo de 4.5:1 para texto normal e 3:1 para texto grande.",
          implementation:
            "Todas as combinações de cores atendem ou excedem os requisitos de contraste, com modo de alto contraste disponível.",
        },
        {
          id: "1.4.4",
          name: "Redimensionar Texto",
          level: "AA",
          description:
            "Texto pode ser redimensionado até 200% sem perda de funcionalidade.",
          implementation:
            "Sistema de escala de fonte permite ajuste de 80% a 160%, mantendo toda funcionalidade e legibilidade.",
        },
        {
          id: "1.4.10",
          name: "Refluxo",
          level: "AA",
          description:
            "Conteúdo pode ser apresentado sem rolagem horizontal em 320px.",
          implementation:
            "Design responsivo garante que todo conteúdo seja acessível em dispositivos móveis sem rolagem horizontal.",
        },
        {
          id: "1.4.11",
          name: "Contraste de Não Texto",
          level: "AA",
          description:
            "Contraste mínimo de 3:1 para componentes de interface e objetos gráficos.",
          implementation:
            "Botões, campos de entrada e elementos interativos mantêm contraste adequado em todos os estados.",
        },
      ],
    },
    {
      principle: "2. Operável",
      description:
        "Os componentes da interface e a navegação devem ser operáveis.",
      criteria: [
        {
          id: "2.1.1",
          name: "Teclado",
          level: "A",
          description: "Toda funcionalidade está disponível via teclado.",
          implementation:
            "Todos os elementos interativos são acessíveis por teclado, com ordem de tabulação lógica e atalhos de navegação.",
        },
        {
          id: "2.1.2",
          name: "Sem Armadilha de Teclado",
          level: "A",
          description: "O foco do teclado não fica preso em nenhum componente.",
          implementation:
            "Modais e menus permitem saída via Escape, e o foco retorna ao elemento que os ativou.",
        },
        {
          id: "2.1.4",
          name: "Atalhos de Teclado de Caractere",
          level: "A",
          description:
            "Atalhos de teclado podem ser desabilitados ou remapeados.",
          implementation:
            "Atalhos Alt+1-3 são padrão de acessibilidade e podem ser desabilitados nas configurações do navegador.",
        },
        {
          id: "2.2.1",
          name: "Tempo Ajustável",
          level: "A",
          description:
            "Usuários podem ajustar ou desabilitar limites de tempo.",
          implementation:
            "Não há limites de tempo automáticos na aplicação que afetem a funcionalidade.",
        },
        {
          id: "2.2.2",
          name: "Pausar, Parar, Ocultar",
          level: "A",
          description:
            "Usuários podem pausar, parar ou ocultar conteúdo em movimento.",
          implementation:
            "Animações podem ser desabilitadas via controles de acessibilidade, respeitando prefers-reduced-motion.",
        },
        {
          id: "2.3.1",
          name: "Três Flashes ou Abaixo do Limite",
          level: "A",
          description:
            "Conteúdo não contém flashes que possam causar convulsões.",
          implementation:
            "Não utilizamos elementos que piscam ou têm flashes rápidos em nossa interface.",
        },
        {
          id: "2.4.1",
          name: "Ignorar Blocos",
          level: "A",
          description: "Mecanismo para pular blocos de conteúdo repetitivo.",
          implementation:
            "Links de pular para conteúdo principal, menu e rodapé estão disponíveis na barra de acessibilidade.",
        },
        {
          id: "2.4.2",
          name: "Título da Página",
          level: "A",
          description: "Páginas têm títulos que descrevem tópico ou propósito.",
          implementation:
            "Cada página tem um título único e descritivo que reflete seu conteúdo e função.",
        },
        {
          id: "2.4.3",
          name: "Ordem do Foco",
          level: "A",
          description: "Ordem de navegação por teclado é lógica e intuitiva.",
          implementation:
            "Ordem de tabulação segue fluxo visual lógico: barra de acessibilidade → menu → conteúdo → rodapé.",
        },
        {
          id: "2.4.4",
          name: "Propósito do Link (Em Contexto)",
          level: "A",
          description: "Propósito de cada link é claro pelo texto ou contexto.",
          implementation:
            "Links têm textos descritivos ou aria-label explicativo, evitando textos genéricos como 'clique aqui'.",
        },
        {
          id: "2.4.6",
          name: "Cabeçalhos e Rótulos",
          level: "AA",
          description: "Cabeçalhos e rótulos descrevem tópico ou propósito.",
          implementation:
            "Estrutura hierárquica de headings clara, labels descritivos em formulários, e títulos de seção informativos.",
        },
        {
          id: "2.4.7",
          name: "Foco Visível",
          level: "AA",
          description: "Indicador de foco do teclado é visível.",
          implementation:
            "Todos os elementos focáveis têm indicador visual claro com contorno laranja e sombra.",
        },
        {
          id: "2.5.1",
          name: "Gestos de Ponteiro",
          level: "A",
          description:
            "Funcionalidade que usa gestos multiponto ou baseados em caminho tem alternativa.",
          implementation:
            "Toda funcionalidade é acessível via clique/toque simples, sem necessidade de gestos complexos.",
        },
        {
          id: "2.5.2",
          name: "Cancelamento de Ponteiro",
          level: "A",
          description: "Ações podem ser canceladas antes da conclusão.",
          implementation:
            "Ações destrutivas têm confirmação, e cliques podem ser cancelados movendo o ponteiro antes de soltar.",
        },
        {
          id: "2.5.3",
          name: "Rótulo no Nome",
          level: "A",
          description: "Nome acessível contém o texto visível do rótulo.",
          implementation:
            "Aria-label e textos visíveis são consistentes, facilitando comandos de voz.",
        },
        {
          id: "2.5.4",
          name: "Ativação por Movimento",
          level: "A",
          description:
            "Funcionalidade ativada por movimento pode ser desabilitada.",
          implementation:
            "Não utilizamos ativação por movimento ou acelerômetro em nossa interface.",
        },
      ],
    },
    {
      principle: "3. Compreensível",
      description:
        "A informação e a operação da interface devem ser compreensíveis.",
      criteria: [
        {
          id: "3.1.1",
          name: "Idioma da Página",
          level: "A",
          description:
            "Idioma principal de cada página é identificado programaticamente.",
          implementation:
            "Atributo lang='pt-BR' definido no elemento html de todas as páginas.",
        },
        {
          id: "3.2.1",
          name: "Em Foco",
          level: "A",
          description: "Receber foco não inicia mudança de contexto.",
          implementation:
            "Focar em elementos não causa redirecionamentos automáticos ou mudanças inesperadas de contexto.",
        },
        {
          id: "3.2.2",
          name: "Na Entrada",
          level: "A",
          description:
            "Alterar configuração não causa mudança de contexto automaticamente.",
          implementation:
            "Formulários requerem ação explícita (botão enviar) para processar dados, sem auto-submit.",
        },
        {
          id: "3.2.3",
          name: "Navegação Consistente",
          level: "AA",
          description:
            "Mecanismos de navegação são consistentes entre páginas.",
          implementation:
            "Menu principal, barra de acessibilidade e estrutura de navegação são idênticos em todas as páginas.",
        },
        {
          id: "3.2.4",
          name: "Identificação Consistente",
          level: "AA",
          description:
            "Componentes com mesma funcionalidade são identificados consistentemente.",
          implementation:
            "Botões, links e elementos interativos mantêm padrões visuais e de nomenclatura consistentes.",
        },
        {
          id: "3.3.1",
          name: "Identificação de Erro",
          level: "A",
          description:
            "Erros de entrada são identificados e descritos em texto.",
          implementation:
            "Mensagens de erro são claras, específicas e associadas aos campos correspondentes via aria-describedby.",
        },
        {
          id: "3.3.2",
          name: "Rótulos ou Instruções",
          level: "A",
          description:
            "Rótulos ou instruções são fornecidos quando necessário.",
          implementation:
            "Todos os campos de formulário têm labels claros, instruções de preenchimento e indicação de campos obrigatórios.",
        },
        {
          id: "3.3.3",
          name: "Sugestão de Erro",
          level: "AA",
          description: "Sugestões são fornecidas quando erros são detectados.",
          implementation:
            "Mensagens de erro incluem orientações específicas sobre como corrigir o problema.",
        },
        {
          id: "3.3.4",
          name: "Prevenção de Erro (Legal, Financeiro, Dados)",
          level: "AA",
          description:
            "Ações importantes podem ser revertidas, verificadas ou confirmadas.",
          implementation:
            "Ações destrutivas (excluir produto) têm confirmação, e dados de formulário podem ser revisados antes do envio.",
        },
      ],
    },
    {
      principle: "4. Robusto",
      description:
        "O conteúdo deve ser robusto o suficiente para ser interpretado por uma ampla variedade de agentes de usuário.",
      criteria: [
        {
          id: "4.1.1",
          name: "Análise",
          level: "A",
          description:
            "Marcação tem elementos de início e fim completos e aninhamento correto.",
          implementation:
            "HTML válido com elementos corretamente aninhados e fechados, validado por ferramentas de lint.",
        },
        {
          id: "4.1.2",
          name: "Nome, Função, Valor",
          level: "A",
          description:
            "Nome e função podem ser determinados programaticamente.",
          implementation:
            "Todos os elementos interativos têm nomes acessíveis via aria-label, aria-labelledby ou texto visível.",
        },
        {
          id: "4.1.3",
          name: "Mensagens de Status",
          level: "AA",
          description:
            "Mensagens de status são apresentadas aos usuários de tecnologia assistiva.",
          implementation:
            "Regiões live (aria-live) anunciam mudanças de status, confirmações e mensagens importantes para leitores de tela.",
        },
      ],
    },
  ];

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
              className="hover:text-[#E65100] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded"
              aria-label="Voltar para página inicial"
              tabIndex={0}
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
        tabIndex={-1}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            tabIndex={0}
          >
            Recursos de <span className="text-[#F57C00]">Acessibilidade</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" tabIndex={0}>
            O Barriga Cheea foi desenvolvido com foco na inclusão digital,
            oferecendo diversos recursos para garantir que todos possam utilizar
            nossa plataforma de forma eficiente e confortável.
          </p>
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" aria-label="Voltar para página inicial" tabIndex={0}>
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-[#F57C00] hover:text-black transition-colors cursor-pointer focus:ring-2 focus:ring-[#F57C00]"
              tabIndex={0}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Voltar ao Início
            </Button>
          </Link>
        </div>

        {/* Accessibility Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Navegação por Teclado */}
          <Card className="border-l-4 border-l-[#F57C00]" tabIndex={0}>
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
          <Card className="border-l-4 border-l-[#F57C00]" tabIndex={0}>
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
          <Card className="border-l-4 border-l-[#F57C00]" tabIndex={0}>
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
          <Card className="border-l-4 border-l-[#F57C00]" tabIndex={0}>
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
          <Card className="border-l-4 border-l-[#F57C00]" tabIndex={0}>
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
          <Card className="border-l-4 border-l-[#F57C00]" tabIndex={0}>
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
                  <li>• Use Tab para navegar até o botão do VLibras</li>
                  <li>• Pressione Enter ou Espaço para ativar o avatar</li>
                  <li>• Selecione textos para tradução automática</li>
                  <li>• Ajuste velocidade e tamanho do avatar</li>
                </ul>
                <div className="mt-3 pt-3 border-t">
                  <Link
                    href="https://vlibras.gov.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E65100] hover:text-[#F57C00] flex items-center gap-1 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded transition-colors"
                    aria-label="Saiba mais sobre VLibras - abre em nova aba"
                    tabIndex={0}
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
        <Card className="mb-8" tabIndex={0}>
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
              <div
                className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F57C00] focus:ring-offset-2"
                onClick={() => setShowWcagModal(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setShowWcagModal(true);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label="Clique para ver detalhes dos critérios WCAG 2.1 implementados"
              >
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  WCAG 2.1 Nível AA
                  <ExternalLink
                    className="w-4 h-4 text-[#F57C00]"
                    aria-hidden="true"
                  />
                </h4>
                <p className="text-sm text-gray-600">
                  Seguimos as Diretrizes de Acessibilidade para Conteúdo Web,
                  garantindo que o site seja perceptível, operável,
                  compreensível e robusto.{" "}
                  <span className="text-[#E65100] font-medium">
                    Clique para ver detalhes.
                  </span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg" tabIndex={0}>
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

        {/* WCAG Modal */}
        <Dialog open={showWcagModal} onOpenChange={setShowWcagModal}>
          <DialogContent className="max-w-4xl w-[95vw] h-[85vh] flex flex-col">
            <DialogHeader className="p-6 pb-4 border-b bg-white shrink-0">
              <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle
                  className="w-6 h-6 text-green-600"
                  aria-hidden="true"
                />
                Critérios WCAG 2.1 Nível AA Implementados
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-2">
                Detalhamento dos critérios de acessibilidade que seguimos e como
                os implementamos no Barriga Cheea.
              </p>
            </DialogHeader>

            {/* Conteúdo com scroll */}
            <div className="flex-1 overflow-auto px-6 py-4">
              <div className="space-y-8">
                {wcagCriteria.map((principle, principleIndex) => (
                  <div key={principleIndex} className="space-y-4">
                    <div className="border-l-4 border-l-[#F57C00] pl-4">
                      <h3 className="text-lg font-bold text-gray-900">
                        {principle.principle}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {principle.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {principle.criteria.map((criterion, criterionIndex) => (
                        <div
                          key={criterionIndex}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {criterion.id} - {criterion.name}
                            </h4>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                criterion.level === "A"
                                  ? "bg-green-100 text-green-800"
                                  : criterion.level === "AA"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              Nível {criterion.level}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">
                            {criterion.description}
                          </p>
                          <div className="bg-white p-3 rounded border-l-2 border-l-green-500">
                            <p className="text-sm text-gray-800">
                              <strong className="text-green-700">
                                Nossa implementação:
                              </strong>{" "}
                              {criterion.implementation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer fixo */}
            <div className="border-t bg-gray-50 px-6 py-4 shrink-0">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Total:{" "}
                  <strong>
                    {wcagCriteria.reduce(
                      (acc, principle) => acc + principle.criteria.length,
                      0
                    )}{" "}
                    critérios
                  </strong>{" "}
                  implementados
                </p>
                <Button
                  onClick={() => setShowWcagModal(false)}
                  className="bg-[#E65100] hover:bg-[#F57C00] text-black cursor-pointer focus:ring-2 focus:ring-[#F57C00]"
                  tabIndex={0}
                >
                  Fechar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Help and Support */}
        <Card className="mb-8" tabIndex={0}>
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
          <h3 className="text-xl font-semibold mb-4" tabIndex={0}>
            Ações Rápidas
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-[#E65100] hover:bg-[#F57C00] text-black cursor-pointer focus:ring-2 focus:ring-[#F57C00] focus:ring-offset-2 transition-colors"
              onClick={scrollToAccessibilityBar}
              aria-label="Ir para controles de acessibilidade no topo da página"
              aria-describedby="accessibility-controls-help"
              tabIndex={0}
            >
              <MousePointer className="w-4 h-4 mr-2" aria-hidden="true" />
              Ir para Controles de Acessibilidade
            </Button>
            <div id="accessibility-controls-help" className="sr-only">
              Este botão irá rolar a página para o topo e focar nos controles de
              acessibilidade
            </div>

            <Link href="/" aria-label="Voltar para página inicial" tabIndex={0}>
              <Button
                variant="outline"
                className="w-full sm:w-auto cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-[#F57C00] focus:ring-offset-2 transition-colors"
                tabIndex={0}
              >
                Voltar ao Site
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Selo de Acessibilidade */}
      <div className="bg-gray-100 py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="inline-block bg-white p-4 rounded-lg shadow-sm border-2 border-[#F57C00]"
            tabIndex={0}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <CheckCircle
                  className="w-6 h-6 text-green-600 mr-2"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-bold">
                  Selo de Acessibilidade Digital
                </h3>
              </div>
              <p className="text-sm text-gray-700 max-w-md">
                Comprometidos com a inclusão digital e acessibilidade para
                todos. Nosso site segue as diretrizes WCAG 2.1 Nível AA.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  WCAG 2.1 AA
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                  LBI Compatível
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
