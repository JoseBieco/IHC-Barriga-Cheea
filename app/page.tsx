"use client";

import { useState } from "react";
// import Image from "next/image";
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
        // Sort by expiration date (ascending - closest expiration first)
        return sortedProducts.sort(
          (a, b) =>
            new Date(a.expirationDate).getTime() -
            new Date(b.expirationDate).getTime()
        );
      case "time":
        // Sort by release time (assuming format like "2 horas", "30 minutos", etc.)
        // This is a simple implementation - you might need to adjust based on your actual data format
        return sortedProducts.sort((a, b) => {
          const timeA = Number.parseInt(a.releaseTime.split(" ")[0]) || 0;
          const timeB = Number.parseInt(b.releaseTime.split(" ")[0]) || 0;
          return timeA - timeB;
        });
      case "proximity":
        // For proximity, we'd typically need geolocation data
        // Since we don't have that, this is just a placeholder
        // In a real app, you'd calculate distance from user's location
        return sortedProducts;
      default:
        return sortedProducts;
    }
  };

  const handleSortClick = (sortOption: SortOption) => {
    setActiveSort(activeSort === sortOption ? null : sortOption);
  };

  const EmptyState = (/*{ status }: { status: string }*/) => (
    <div className="bg-white rounded-lg p-12 text-center shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Nenhum produto encontrado
      </h3>
      <p className="text-gray-600 mb-6">
        <Link
          href="/adicionar-produto"
          className="text-orange-500 hover:underline"
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
      return <EmptyState /*status={status}*/ />;
    }

    if (filteredProducts.length === 0) {
      return (
        <div className="bg-white rounded-lg p-12 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-600">Sua busca não retornou resultados.</p>
        </div>
      );
    }

    return (
      <div className="h-[calc(100vh-340px)] overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Accessibility Bar */}
      <div className="sticky top-0 z-999">
        <div className="bg-gray-200 text-xs text-gray-600 px-4 py-1">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex space-x-4">
              <button type="button" className="hover:underline">
                Ir para conteúdo [1]
              </button>
              <button type="button" className="hover:underline">
                Ir para menu [2]
              </button>
              <button type="button" className="hover:underline">
                Ir para o rodapé [3]
              </button>
              <button type="button" className="hover:underline">
                Ir para Acessibilidade [4]
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span>A+ | A-</span>
              <span>Alto contraste</span>
              <span>Desligar Animações</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <header className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">😊</span>
                </div>
                <h1 className="text-2xl font-bold text-orange-500">
                  BARRIGA CHEEA
                </h1>
              </div>
              <nav className="flex items-center space-x-8">
                <button
                  type="button"
                  className="hover:text-orange-500 transition-colors"
                >
                  Fale conosco
                </button>
                <button
                  type="button"
                  className="hover:text-orange-500 transition-colors"
                >
                  Funcionamento
                </button>
                <button
                  type="button"
                  className="hover:text-orange-500 transition-colors"
                >
                  Onde estamos
                </button>
                <button
                  type="button"
                  className="hover:text-orange-500 transition-colors"
                >
                  Ajuda
                </button>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white">👤</span>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-500">
              Página inicial
            </Link>
            <span className="mx-2">/</span>
            <span>Doador</span>
          </nav>
        </div>
      </div>

      {/* Hero Image */}
      {/* <div className="relative h-64 overflow-hidden">
        <Image
          src="/hero-food-box.png"
          alt="Caixa com produtos alimentícios"
          fill
          className="object-cover"
        />
      </div> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Lista de produtos ou pacotes
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total de produtos: {getTotalProducts()}
            </p>
          </div>
          <Link href="/adicionar-produto">
            <Button className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 rounded-md cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar produto ou sacola
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Filtros</h3>

              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar"
                    className="pl-10 border-gray-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-3">Ordenar por</h4>
                <div className="space-y-3">
                  <Button
                    variant={activeSort === "date" ? "default" : "ghost"}
                    className={`flex items-center justify-start w-full ${
                      activeSort === "date"
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        : "text-gray-600"
                    }`}
                    onClick={() => handleSortClick("date")}
                  >
                    <Calendar
                      className={`w-4 h-4 mr-2 ${
                        activeSort === "date"
                          ? "text-orange-500"
                          : "text-gray-500"
                      }`}
                    />
                    <span className="text-sm">Data de validade</span>
                  </Button>

                  <Button
                    variant={activeSort === "time" ? "default" : "ghost"}
                    className={`flex items-center justify-start w-full ${
                      activeSort === "time"
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        : "text-gray-600"
                    }`}
                    onClick={() => handleSortClick("time")}
                  >
                    <Clock
                      className={`w-4 h-4 mr-2 ${
                        activeSort === "time"
                          ? "text-orange-500"
                          : "text-gray-500"
                      }`}
                    />
                    <span className="text-sm">Tempo de liberação</span>
                  </Button>

                  <Button
                    variant={activeSort === "proximity" ? "default" : "ghost"}
                    className={`flex items-center justify-start w-full ${
                      activeSort === "proximity"
                        ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                        : "text-gray-600"
                    }`}
                    onClick={() => handleSortClick("proximity")}
                  >
                    <MapPin
                      className={`w-4 h-4 mr-2 ${
                        activeSort === "proximity"
                          ? "text-orange-500"
                          : "text-gray-500"
                      }`}
                    />
                    <span className="text-sm">Mais próximos</span>
                  </Button>
                </div>
              </div>

              {/* Status Summary */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-700 mb-3">Resumo</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Em liberação:</span>
                    <span className="font-medium">
                      {getProductsByStatus("em-liberacao").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Liberados:</span>
                    <span className="font-medium">
                      {getProductsByStatus("liberados").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vencidos:</span>
                    <span className="font-medium">
                      {getProductsByStatus("vencidos").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
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
              <TabsList className="grid w-full grid-cols-4 mb-2">
                <TabsTrigger value="em-liberacao" className="cursor-pointer">
                  Em liberação ({getProductsByStatus("em-liberacao").length})
                </TabsTrigger>
                <TabsTrigger value="liberados" className="cursor-pointer">
                  Liberados ({getProductsByStatus("liberados").length})
                </TabsTrigger>
                <TabsTrigger value="vencidos" className="cursor-pointer">
                  Vencidos ({getProductsByStatus("vencidos").length})
                </TabsTrigger>
                <TabsTrigger value="doados" className="cursor-pointer">
                  Doados ({getProductsByStatus("doados").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="em-liberacao">
                <ProductGrid status="em-liberacao" />
              </TabsContent>

              <TabsContent value="liberados">
                <ProductGrid status="liberados" />
              </TabsContent>

              <TabsContent value="vencidos">
                <ProductGrid status="vencidos" />
              </TabsContent>

              <TabsContent value="doados">
                <ProductGrid status="doados" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Newsletter Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-2">
              Assine a nossa <span className="text-orange-500">newsletter</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Fique por dentro das últimas notícias, anúncios e artigos.
            </p>
            <div className="flex max-w-md">
              <Input
                type="email"
                placeholder="Digite seu email"
                className="rounded-r-none border-gray-600 bg-white text-gray-800"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-l-none px-6 text-black">
                Inscrever-se
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-between items-center border-t border-gray-700 pt-8">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-lg">😊</span>
              </div>
              <h4 className="text-xl font-bold text-orange-500">
                BARRIGA CHEEA
              </h4>
            </div>

            <nav className="flex flex-wrap gap-6 mb-4 lg:mb-0">
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                Início
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                Quem somos
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                Funcionamento
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                Fale conosco
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                Ajuda
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                Onde estamos
              </Link>
            </nav>

            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
