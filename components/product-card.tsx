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
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleViewDetails}>
                  <Eye className="h-4 w-4 mr-2" />
                  Ver detalhes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange("liberados")}
                  disabled={product.status === "liberados"}
                >
                  Marcar como liberado
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange("doados")}
                  disabled={product.status === "doados"}
                >
                  Marcar como doado
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
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
                alt={product.photoDescription}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Sem imagem</span>
            </div>
          )}

          <h3 className="font-semibold text-lg mb-2">{product.productName}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.productDescription}
          </p>

          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Validade: {formatDate(product.expirationDate)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>Liberação: {product.releaseTime}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="line-clamp-1">{product.pickupInfo}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t">
          <p className="text-xs text-gray-400">
            Criado em {product.createdAt.toLocaleDateString("pt-BR")} às{" "}
            {product.createdAt.toLocaleTimeString("pt-BR")}
          </p>
        </CardFooter>
      </Card>

      {/* Product Details Dialog - Fixed Header and Footer */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-5xl w-[95vw] h-[85vh] mt-12 p-0 flex flex-col">
          {/* Fixed Header - Always Visible */}
          <div className="flex items-start justify-between p-6 pb-4 border-b bg-white shrink-0 rounded-lg">
            <div className="flex-1 pr-4">
              <DialogTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {product.productName}
              </DialogTitle>
              <Badge variant={statusBadge.variant} className="w-fit">
                {statusBadge.label}
              </Badge>
            </div>
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetailsDialog(false)}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button> */}
          </div>

          {/* Scrollable Content Area - Takes remaining space */}
          <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Image */}
              <div>
                {imageUrl ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={product.photoDescription}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Sem imagem</span>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  {product.photoDescription}
                </p>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Descrição
                  </h3>
                  <p className="mt-1">{product.productDescription}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Informações sobre a retirada
                  </h3>
                  <div className="flex items-start mt-1">
                    <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                    <p>{product.pickupInfo}</p>
                  </div>
                  <Button
                    variant="link"
                    className="text-orange-500 p-0 h-auto mt-1"
                    onClick={() => openInGoogleMaps(product.pickupInfo)}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Ver no Google Maps
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Data de validade
                    </h3>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-5 w-5 text-orange-500 mr-2" />
                      <p>{formatDate(product.expirationDate)}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Prazo para liberação
                    </h3>
                    <div className="flex items-center mt-1">
                      <Clock className="h-5 w-5 text-orange-500 mr-2" />
                      <p>{product.releaseTime}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Informações adicionais
                  </h3>
                  <p className="text-sm mt-1">
                    Criado em {product.createdAt.toLocaleDateString("pt-BR")} às{" "}
                    {product.createdAt.toLocaleTimeString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Footer - Always Visible */}
          <div className="border-t bg-gray-50 px-6 py-4 shrink-0">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("liberados")}
                  disabled={product.status === "liberados"}
                >
                  Marcar como liberado
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("doados")}
                  disabled={product.status === "doados"}
                >
                  Marcar como doado
                </Button>
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowDetailsDialog(false)}
              >
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja excluir o produto &quot;
              {product.productName}&quot;? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Sim, excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
