"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Product, useProducts } from "@/contexts/products-context";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { updateProductStatus, deleteProduct } = useProducts();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Create image URL from File object
  React.useEffect(() => {
    if (product.photo) {
      const url = URL.createObjectURL(product.photo);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [product.photo]);

  const getStatusBadge = (status: Product["status"]) => {
    const statusConfig = {
      "em-liberacao": { label: "Em liberação", variant: "secondary" as const },
      liberados: { label: "Liberado", variant: "default" as const },
      vencidos: { label: "Vencido", variant: "destructive" as const },
      doados: { label: "Doado", variant: "outline" as const },
    };
    return statusConfig[status];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const handleStatusChange = (newStatus: Product["status"]) => {
    updateProductStatus(product.id, newStatus);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteProduct(product.id);
    setShowDeleteDialog(false);
  };

  const handleEdit = () => {
    setShowDetailsDialog(false);
    router.push(`/editar-produto/${product.id}`);
  };

  const handleViewDetails = () => {
    setShowDetailsDialog(true);
  };

  const openInGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
  };

  const statusBadge = getStatusBadge(product.status);

  return (
    <>
      <Card
        className="w-full cursor-pointer hover:shadow-lg transition-all duration-200 focus-within:ring-2 focus-within:ring-[#F57C00] focus-within:ring-offset-2"
        role="article"
        aria-labelledby={`product-title-${product.id}`}
        aria-describedby={`product-description-${product.id}`}
        tabIndex={0}
        onClick={handleViewDetails}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleViewDetails();
          }
        }}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <Badge
              variant={statusBadge.variant}
              role="status"
              aria-label={`Status do produto: ${statusBadge.label}`}
            >
              {statusBadge.label}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer hover:bg-gray-100 focus:ring-2 focus:ring-[#F57C00]"
                  aria-label={`Opções para o produto ${product.productName}`}
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                role="menu"
                aria-label="Menu de ações do produto"
              >
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails();
                  }}
                  className="cursor-pointer"
                  role="menuitem"
                  aria-label="Ver detalhes completos do produto"
                >
                  <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
                  Ver detalhes
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit();
                  }}
                  className="cursor-pointer"
                  role="menuitem"
                  aria-label="Editar informações do produto"
                >
                  <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange("liberados");
                  }}
                  disabled={product.status === "liberados"}
                  className="cursor-pointer disabled:cursor-not-allowed"
                  role="menuitem"
                  aria-label="Marcar produto como liberado para doação"
                  aria-disabled={product.status === "liberados"}
                >
                  Marcar como liberado
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange("doados");
                  }}
                  disabled={product.status === "doados"}
                  className="cursor-pointer disabled:cursor-not-allowed"
                  role="menuitem"
                  aria-label="Marcar produto como já doado"
                  aria-disabled={product.status === "doados"}
                >
                  Marcar como doado
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="text-red-600 cursor-pointer focus:bg-red-50"
                  role="menuitem"
                  aria-label="Excluir produto permanentemente"
                >
                  <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          {imageUrl ? (
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={
                  product.photoDescription ||
                  `Imagem do produto ${product.productName}`
                }
                fill
                className="object-cover"
                role="img"
                aria-describedby={`image-description-${product.id}`}
              />
              <div id={`image-description-${product.id}`} className="sr-only">
                {product.photoDescription}
              </div>
            </div>
          ) : (
            <div
              className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
              role="img"
              aria-label="Imagem não disponível para este produto"
            >
              <span className="text-gray-400" aria-hidden="true">
                Sem imagem
              </span>
            </div>
          )}

          <h3
            id={`product-title-${product.id}`}
            className="font-semibold text-lg mb-2"
            role="heading"
            aria-level={3}
          >
            {product.productName}
          </h3>
          <p
            id={`product-description-${product.id}`}
            className="text-sm text-gray-600 mb-3 line-clamp-2"
            aria-label={`Descrição: ${product.productDescription}`}
          >
            {product.productDescription}
          </p>

          <div
            className="space-y-2 text-sm text-gray-500"
            role="list"
            aria-label="Informações do produto"
          >
            <div className="flex items-center" role="listitem">
              <Calendar
                className="h-4 w-4 mr-2 text-[#F57C00]"
                aria-hidden="true"
              />
              <span
                aria-label={`Data de validade: ${formatDate(
                  product.expirationDate
                )}`}
              >
                Validade: {formatDate(product.expirationDate)}
              </span>
            </div>
            <div className="flex items-center" role="listitem">
              <Clock
                className="h-4 w-4 mr-2 text-[#F57C00]"
                aria-hidden="true"
              />
              <span aria-label={`Tempo para liberação: ${product.releaseTime}`}>
                Liberação: {product.releaseTime}
              </span>
            </div>
            <div className="flex items-center" role="listitem">
              <MapPin
                className="h-4 w-4 mr-2 text-[#F57C00]"
                aria-hidden="true"
              />
              <span
                className="line-clamp-1"
                aria-label={`Local de retirada: ${product.pickupInfo}`}
              >
                {product.pickupInfo}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t">
          <p
            className="text-xs text-gray-400"
            aria-label={`Produto criado em ${product.createdAt.toLocaleDateString(
              "pt-BR"
            )} às ${product.createdAt.toLocaleTimeString("pt-BR")}`}
          >
            Criado em {product.createdAt.toLocaleDateString("pt-BR")} às{" "}
            {product.createdAt.toLocaleTimeString("pt-BR")}
          </p>
        </CardFooter>
      </Card>

      {/* Product Details Dialog */}
      <Dialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        aria-labelledby="product-details-title"
        aria-describedby="product-details-description"
      >
        <DialogContent className="max-w-5xl w-[95vw] h-[85vh] mt-12 p-0 flex flex-col">
          {/* Fixed Header */}
          <div className="flex items-start justify-between p-6 pb-4 border-b bg-white shrink-0 rounded-lg">
            <div className="flex-1 pr-4">
              <DialogTitle
                id="product-details-title"
                className="text-xl font-bold text-gray-900 mb-2 line-clamp-2"
              >
                {product.productName}
              </DialogTitle>
              <Badge
                variant={statusBadge.variant}
                className="w-fit"
                role="status"
                aria-label={`Status atual: ${statusBadge.label}`}
              >
                {statusBadge.label}
              </Badge>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
            <div
              id="product-details-description"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Left Column - Image */}
              <div>
                {imageUrl ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={
                        product.photoDescription ||
                        `Imagem detalhada do produto ${product.productName}`
                      }
                      fill
                      className="object-cover"
                      role="img"
                    />
                  </div>
                ) : (
                  <div
                    className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
                    role="img"
                    aria-label="Imagem não disponível"
                  >
                    <span className="text-gray-400" aria-hidden="true">
                      Sem imagem
                    </span>
                  </div>
                )}
                <p
                  className="text-sm text-gray-500 mt-2"
                  aria-label={`Descrição da imagem: ${product.photoDescription}`}
                >
                  {product.photoDescription}
                </p>
              </div>

              {/* Right Column - Details */}
              <div
                className="space-y-4"
                role="region"
                aria-label="Detalhes do produto"
              >
                <div>
                  <h3
                    className="text-sm font-medium text-gray-500"
                    id="description-heading"
                  >
                    Descrição
                  </h3>
                  <p className="mt-1" aria-labelledby="description-heading">
                    {product.productDescription}
                  </p>
                </div>

                <div>
                  <h3
                    className="text-sm font-medium text-gray-500"
                    id="pickup-heading"
                  >
                    Informações sobre a retirada
                  </h3>
                  <div
                    className="flex items-start mt-1"
                    aria-labelledby="pickup-heading"
                  >
                    <MapPin
                      className="h-5 w-5 text-[#F57C00] mr-2 mt-0.5"
                      aria-hidden="true"
                    />
                    <p>{product.pickupInfo}</p>
                  </div>
                  <Button
                    variant="link"
                    className="text-[#F57C00] hover:text-[#E65100] p-0 h-auto mt-1 cursor-pointer"
                    onClick={() => openInGoogleMaps(product.pickupInfo)}
                    aria-label={`Abrir localização ${product.pickupInfo} no Google Maps em nova aba`}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" aria-hidden="true" />
                    Ver no Google Maps
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3
                      className="text-sm font-medium text-gray-500"
                      id="expiry-heading"
                    >
                      Data de validade
                    </h3>
                    <div
                      className="flex items-center mt-1"
                      aria-labelledby="expiry-heading"
                    >
                      <Calendar
                        className="h-5 w-5 text-[#F57C00] mr-2"
                        aria-hidden="true"
                      />
                      <p>{formatDate(product.expirationDate)}</p>
                    </div>
                  </div>

                  <div>
                    <h3
                      className="text-sm font-medium text-gray-500"
                      id="release-heading"
                    >
                      Prazo para liberação
                    </h3>
                    <div
                      className="flex items-center mt-1"
                      aria-labelledby="release-heading"
                    >
                      <Clock
                        className="h-5 w-5 text-[#F57C00] mr-2"
                        aria-hidden="true"
                      />
                      <p>{product.releaseTime}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    className="text-sm font-medium text-gray-500"
                    id="additional-heading"
                  >
                    Informações adicionais
                  </h3>
                  <p
                    className="text-sm mt-1"
                    aria-labelledby="additional-heading"
                  >
                    Criado em {product.createdAt.toLocaleDateString("pt-BR")} às{" "}
                    {product.createdAt.toLocaleTimeString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <DialogFooter className="border-t bg-gray-50 px-6 py-4 shrink-0">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Ações do produto"
              >
                <Button
                  variant="outline"
                  onClick={handleEdit}
                  className="bg-[#F57C00] hover:bg-[#E65100] text-black px-8 py-2 cursor-pointer"
                  aria-label="Editar este produto"
                >
                  <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("liberados")}
                  disabled={product.status === "liberados"}
                  className="cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#F57C00]"
                  aria-label="Marcar produto como liberado"
                  aria-disabled={product.status === "liberados"}
                >
                  Marcar como liberado
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("doados")}
                  disabled={product.status === "doados"}
                  className="cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#F57C00]"
                  aria-label="Marcar produto como doado"
                  aria-disabled={product.status === "doados"}
                >
                  Marcar como doado
                </Button>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowDetailsDialog(false)}
                className="text-red-600 hover:text-red-700 cursor-pointer"
                aria-label="Fechar janela de detalhes"
              >
                <p className="underline underline-offset-2">Fechar</p>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogContent role="alertdialog" className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle id="delete-dialog-title">
              Confirmar exclusão
            </DialogTitle>
            <DialogDescription id="delete-dialog-description">
              Tem certeza de que deseja excluir o produto &quot;
              {product.productName}&quot;? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter role="group" aria-label="Ações de confirmação">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="cursor-pointer hover:bg-gray-100 focus:ring-2 focus:ring-[#F57C00]"
              aria-label="Cancelar exclusão do produto"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="cursor-pointer focus:ring-2 focus:ring-red-500"
              aria-label={`Confirmar exclusão do produto ${product.productName}`}
            >
              Sim, excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
