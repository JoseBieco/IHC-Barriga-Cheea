"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts, type Product } from "@/contexts/products-context";
import { ProductCard } from "@/components/product-card";

type SortOption = "date" | "time" | "proximity" | null;

export default function Component() {
  const { getProductsByStatus, getTotalProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState<SortOption>(null);

  // Filter products by search query
  const filterProductsBySearch = (products: Product[], query: string) => {
    if (!query.trim()) return products;

    const lowercaseQuery = query.toLowerCase().trim();
    return products.filter(
      (product) =>
        product.productName.toLowerCase().includes(lowercaseQuery) ||
        product.productDescription.toLowerCase().includes(lowercaseQuery) ||
        product.pickupInfo.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Sort products based on active sort option
  const sortProducts = (products: Product[], sortOption: SortOption) => {
    if (!sortOption) return products;

    const sortedProducts = [...products];

    switch (sortOption) {
      case "date":
        return sortedProducts.sort(
          (a, b) =>
            new Date(a.expirationDate).getTime() -
            new Date(b.expirationDate).getTime()
        );
      case "time":
        return sortedProducts.sort((a, b) => {
          const timeA = Number.parseInt(a.releaseTime.split(" ")[0]) || 0;
          const timeB = Number.parseInt(b.releaseTime.split(" ")[0]) || 0;
          return timeA - timeB;
        });
      case "proximity":
        return sortedProducts;
      default:
        return sortedProducts;
    }
  };

  const handleSortClick = (sortOption: SortOption) => {
    setActiveSort(activeSort === sortOption ? null : sortOption);
  };

  const EmptyState = () => (
    <div className="bg-[#FEFEFF] rounded-lg p-8 md:p-12 text-center shadow-sm">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
        Nenhum produto encontrado
      </h3>
      <p className="text-gray-600 mb-6 text-sm md:text-base">
        <Link
          href="/adicionar-produto"
          className="text-[#E65100] hover:text-[#F57C00] hover:underline underline underline-offset-2 transition-colors"
          aria-label="Adicionar primeiro produto ou sacola"
        >
          Adicionar
        </Link>{" "}
        o seu primeiro
        <br />
        produto ou sacola
      </p>
    </div>
  );

  const ProductGrid = ({
    status,
  }: {
    status: "em-liberacao" | "liberados" | "vencidos" | "doados";
  }) => {
    const products = getProductsByStatus(status);
    const filteredProducts = filterProductsBySearch(products, searchQuery);
    const sortedProducts = sortProducts(filteredProducts, activeSort);

    if (products.length === 0) {
      return <EmptyState />;
    }

    if (filteredProducts.length === 0) {
      return (
        <div className="bg-[#FEFEFF] rounded-lg p-8 md:p-12 text-center shadow-sm">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Sua busca não retornou resultados.
          </p>
        </div>
      );
    }

    return (
      <div className="h-[calc(100vh-340px)] overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 pb-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  };

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
            <span aria-current="page">Doador</span>
          </nav>
        </div>
      </div>

      {/* Hero Image Placeholder */}
      <div className="relative h-48 md:h-64 overflow-hidden bg-black">
        <div className="w-full h-full bg-black flex items-center justify-center">
          <span
            className="text-[#EBEBEB] text-base md:text-lg text-center px-4"
            role="img"
            aria-label="[ALT] Imagem principal mostrando doação de alimentos - substituir por imagem real"
          >
            [ALT] Imagem principal - substituir por imagem real
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main
        className="max-w-7xl mx-auto px-4 py-6 md:py-8"
        id="main-content"
        tabIndex={-1}
        role="main"
        aria-label="Conteúdo principal da página"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Lista de produtos ou pacotes
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total de produtos:{" "}
              <span aria-label={`${getTotalProducts()} produtos cadastrados`}>
                {getTotalProducts()}
              </span>
            </p>
          </div>
          <Link
            href="/adicionar-produto"
            aria-label="Adicionar novo produto ou sacola"
          >
            <Button className="bg-[#E65100] hover:bg-[#F57C00] text-[#EBEBEB] px-4 md:px-6 py-2 rounded-md cursor-pointer transition-colors w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
              <span className="text-sm md:text-base">
                Adicionar produto ou sacola
              </span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#FEFEFF] rounded-lg p-4 md:p-6 shadow-sm">
              <h3
                className="font-semibold text-gray-800 mb-4"
                id="filters-heading"
              >
                Filtros
              </h3>

              <div
                className="mb-6"
                role="search"
                aria-labelledby="search-label"
              >
                <label id="search-label" className="sr-only">
                  Buscar produtos
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                    aria-hidden="true"
                  />
                  <Input
                    type="text"
                    placeholder="Buscar"
                    className="pl-10 border-gray-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Buscar produtos por nome, descrição ou local de retirada"
                    aria-describedby="search-help"
                  />
                  <div id="search-help" className="sr-only">
                    Digite para buscar produtos por nome, descrição ou
                    informações de retirada
                  </div>
                </div>
              </div>

              <div role="group" aria-labelledby="sort-heading">
                <h4
                  id="sort-heading"
                  className="font-medium text-gray-700 mb-3"
                >
                  Ordenar por
                </h4>
                <div className="space-y-3">
                  <Button
                    variant={activeSort === "date" ? "default" : "ghost"}
                    className={`flex items-center justify-start w-full text-sm ${
                      activeSort === "date"
                        ? "bg-orange-100 text-[#E65100] hover:bg-orange-200"
                        : "text-gray-600 hover:text-[#E65100]"
                    }`}
                    onClick={() => handleSortClick("date")}
                    aria-label="Ordenar produtos por data de validade"
                    aria-pressed={activeSort === "date"}
                  >
                    <Calendar
                      className={`w-4 h-4 mr-2 ${
                        activeSort === "date"
                          ? "text-[#E65100]"
                          : "text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                    <span>Data de validade</span>
                  </Button>

                  <Button
                    variant={activeSort === "time" ? "default" : "ghost"}
                    className={`flex items-center justify-start w-full text-sm ${
                      activeSort === "time"
                        ? "bg-orange-100 text-[#E65100] hover:bg-orange-200"
                        : "text-gray-600 hover:text-[#E65100]"
                    }`}
                    onClick={() => handleSortClick("time")}
                    aria-label="Ordenar produtos por tempo de liberação"
                    aria-pressed={activeSort === "time"}
                  >
                    <Clock
                      className={`w-4 h-4 mr-2 ${
                        activeSort === "time"
                          ? "text-[#E65100]"
                          : "text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                    <span>Tempo de liberação</span>
                  </Button>

                  <Button
                    variant={activeSort === "proximity" ? "default" : "ghost"}
                    className={`flex items-center justify-start w-full text-sm ${
                      activeSort === "proximity"
                        ? "bg-orange-100 text-[#E65100] hover:bg-orange-200"
                        : "text-gray-600 hover:text-[#E65100]"
                    }`}
                    onClick={() => handleSortClick("proximity")}
                    aria-label="Ordenar produtos por proximidade geográfica"
                    aria-pressed={activeSort === "proximity"}
                  >
                    <MapPin
                      className={`w-4 h-4 mr-2 ${
                        activeSort === "proximity"
                          ? "text-[#E65100]"
                          : "text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                    <span>Mais próximos</span>
                  </Button>
                </div>
              </div>

              {/* Status Summary */}
              <div
                className="mt-6 pt-6 border-t"
                role="region"
                aria-labelledby="summary-heading"
              >
                <h4
                  id="summary-heading"
                  className="font-medium text-gray-700 mb-3"
                >
                  Resumo
                </h4>
                <div className="space-y-2 text-sm">
                  <div
                    className="flex justify-between"
                    aria-label={`${
                      getProductsByStatus("em-liberacao").length
                    } produtos em liberação`}
                  >
                    <span>Em liberação:</span>
                    <span className="font-medium">
                      {getProductsByStatus("em-liberacao").length}
                    </span>
                  </div>
                  <div
                    className="flex justify-between"
                    aria-label={`${
                      getProductsByStatus("liberados").length
                    } produtos liberados`}
                  >
                    <span>Liberados:</span>
                    <span className="font-medium">
                      {getProductsByStatus("liberados").length}
                    </span>
                  </div>
                  <div
                    className="flex justify-between"
                    aria-label={`${
                      getProductsByStatus("vencidos").length
                    } produtos vencidos`}
                  >
                    <span>Vencidos:</span>
                    <span className="font-medium">
                      {getProductsByStatus("vencidos").length}
                    </span>
                  </div>
                  <div
                    className="flex justify-between"
                    aria-label={`${
                      getProductsByStatus("doados").length
                    } produtos doados`}
                  >
                    <span>Doados:</span>
                    <span className="font-medium">
                      {getProductsByStatus("doados").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="em-liberacao" className="w-full">
              <TabsList
                className="grid w-full grid-cols-2 md:grid-cols-4 mb-2 gap-1"
                role="tablist"
                aria-label="Filtros de status de produtos"
              >
                <TabsTrigger
                  value="em-liberacao"
                  className="cursor-pointer text-xs md:text-sm px-2 py-2"
                  role="tab"
                  aria-label={`Produtos em liberação, ${
                    getProductsByStatus("em-liberacao").length
                  } itens`}
                >
                  <span className="hidden sm:inline">Em liberação</span>
                  <span className="sm:hidden">Em lib.</span>
                  <span className="ml-1">
                    ({getProductsByStatus("em-liberacao").length})
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="liberados"
                  className="cursor-pointer text-xs md:text-sm px-2 py-2"
                  role="tab"
                  aria-label={`Produtos liberados, ${
                    getProductsByStatus("liberados").length
                  } itens`}
                >
                  <span>Liberados</span>
                  <span className="ml-1">
                    ({getProductsByStatus("liberados").length})
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="vencidos"
                  className="cursor-pointer text-xs md:text-sm px-2 py-2"
                  role="tab"
                  aria-label={`Produtos vencidos, ${
                    getProductsByStatus("vencidos").length
                  } itens`}
                >
                  <span>Vencidos</span>
                  <span className="ml-1">
                    ({getProductsByStatus("vencidos").length})
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="doados"
                  className="cursor-pointer text-xs md:text-sm px-2 py-2"
                  role="tab"
                  aria-label={`Produtos doados, ${
                    getProductsByStatus("doados").length
                  } itens`}
                >
                  <span>Doados</span>
                  <span className="ml-1">
                    ({getProductsByStatus("doados").length})
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="em-liberacao"
                role="tabpanel"
                aria-labelledby="em-liberacao-tab"
              >
                <ProductGrid status="em-liberacao" />
              </TabsContent>

              <TabsContent
                value="liberados"
                role="tabpanel"
                aria-labelledby="liberados-tab"
              >
                <ProductGrid status="liberados" />
              </TabsContent>

              <TabsContent
                value="vencidos"
                role="tabpanel"
                aria-labelledby="vencidos-tab"
              >
                <ProductGrid status="vencidos" />
              </TabsContent>

              <TabsContent
                value="doados"
                role="tabpanel"
                aria-labelledby="doados-tab"
              >
                <ProductGrid status="doados" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="bg-[#212121] text-[#EBEBEB] mt-16"
        id="footer"
        tabIndex={-1}
        role="contentinfo"
        aria-label="Rodapé do site"
      >
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          {/* Newsletter Section */}
          <div className="mb-8 md:mb-12">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Assine a nossa <span className="text-[#F57C00]">newsletter</span>
            </h3>
            <p className="text-[#EBEBEB] mb-4 md:mb-6 text-sm md:text-base">
              Fique por dentro das últimas notícias, anúncios e artigos.
            </p>
            <form
              className="flex flex-col sm:flex-row max-w-md gap-2 sm:gap-0"
              role="form"
              aria-label="Formulário de inscrição na newsletter"
            >
              <Input
                type="email"
                placeholder="Digite seu email"
                className="rounded-r-none sm:rounded-r-none rounded-l-md border-gray-600 bg-[#FEFEFF] text-gray-800 flex-1"
                aria-label="Digite seu endereço de email para receber nossa newsletter"
                aria-required="true"
              />
              <Button
                className="bg-[#E65100] hover:bg-[#F57C00] rounded-l-none sm:rounded-l-none rounded-r-md px-4 md:px-6 text-[#EBEBEB] transition-colors"
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
                className="w-8 h-8 bg-[#F57C00] rounded-full flex items-center justify-center"
                role="img"
                aria-label="Logo do Barriga Cheea"
              >
                <span className="text-lg" aria-hidden="true">
                  😊
                </span>
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
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base"
                aria-label="Ir para página inicial"
              >
                Início
              </Link>
              <Link
                href="#"
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base"
                aria-label="Conhecer mais sobre a organização"
              >
                Quem somos
              </Link>
              <Link
                href="#"
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base"
                aria-label="Entender como funciona a plataforma"
              >
                Funcionamento
              </Link>
              <Link
                href="#"
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base"
                aria-label="Entrar em contato conosco"
              >
                Fale conosco
              </Link>
              <Link
                href="#"
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base"
                aria-label="Obter ajuda e suporte"
              >
                Ajuda
              </Link>
              <Link
                href="#"
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors text-sm md:text-base"
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
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors"
                aria-label="Seguir no Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="#"
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors"
                aria-label="Seguir no Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="#"
                className="text-[#EBEBEB] hover:text-[#F57C00] transition-colors"
                aria-label="Seguir no Twitter"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
