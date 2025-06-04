"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Upload,
  Instagram,
  Facebook,
  Twitter,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProducts } from "@/contexts/products-context";
// import { AccessibilityBar } from "@/components/accessibility-bar";
// import { AppHeader } from "@/components/app-header";

interface ValidationErrors {
  photo: boolean;
  photoDescription: boolean;
  productName: boolean;
  pickupInfo: boolean;
  expirationDate: boolean;
  releaseTime: boolean;
  productDescription: boolean;
}

export default function EditarProduto() {
  const params = useParams();
  const router = useRouter();
  const { getProductById, updateProduct } = useProducts();
  const productId = params.id as string;

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [showNotFoundAlert, setShowNotFoundAlert] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    photo: false,
    photoDescription: false,
    productName: false,
    pickupInfo: false,
    expirationDate: false,
    releaseTime: false,
    productDescription: false,
  });

  const [formData, setFormData] = useState({
    photo: null as File | null,
    photoDescription: "",
    productName: "",
    pickupInfo: "",
    expirationDate: "",
    releaseTime: "2 horas",
    productDescription: "",
  });

  // Load product data
  useEffect(() => {
    const product = getProductById(productId);
    if (product) {
      setFormData({
        photo: product.photo,
        photoDescription: product.photoDescription,
        productName: product.productName,
        pickupInfo: product.pickupInfo,
        expirationDate: product.expirationDate,
        releaseTime: product.releaseTime,
        productDescription: product.productDescription,
      });

      // Create image URL if photo exists
      if (product.photo) {
        const url = URL.createObjectURL(product.photo);
        setImageUrl(url);
        return () => URL.revokeObjectURL(url);
      }
    } else {
      // Product not found
      setShowNotFoundAlert(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [productId, getProductById, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));

      // Create and set image URL
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      const url = URL.createObjectURL(file);
      setImageUrl(url);

      // Clear photo validation error when file is selected
      if (validationErrors.photo) {
        setValidationErrors((prev) => ({
          ...prev,
          photo: false,
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {
      photo: !formData.photo,
      photoDescription: !formData.photoDescription.trim(),
      productName: !formData.productName.trim(),
      pickupInfo: !formData.pickupInfo.trim(),
      expirationDate: !formData.expirationDate.trim(),
      releaseTime: !formData.releaseTime.trim(),
      productDescription: !formData.productDescription.trim(),
    };

    setValidationErrors(errors);

    // Check if any field has an error
    return !Object.values(errors).some((hasError) => hasError);
  };

  const handleSave = () => {
    if (!validateForm()) {
      setShowValidationAlert(true);
      setTimeout(() => {
        setShowValidationAlert(false);
      }, 5000);
      return;
    }

    // Update the existing product
    updateProduct(productId, {
      photo: formData.photo,
      photoDescription: formData.photoDescription,
      productName: formData.productName,
      pickupInfo: formData.pickupInfo,
      expirationDate: formData.expirationDate,
      releaseTime: formData.releaseTime,
      productDescription: formData.productDescription,
    });

    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
      // Redirect to main page
      router.push("/");
    }, 3000);
  };

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    setShowCancelDialog(false);
    // Redirect to main page
    router.push("/");
  };

  // Cleanup image URL on unmount
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Produto atualizado com sucesso!
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Validation Error Alert */}
      {showValidationAlert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Por favor, preencha todos os campos obrigatórios antes de salvar.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Product Not Found Alert */}
      {showNotFoundAlert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Produto não encontrado. Redirecionando para a página principal...
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar cancelamento</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja cancelar a edição do produto? Todas as
              alterações serão perdidas.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
            >
              Continuar editando
            </Button>
            <Button variant="destructive" onClick={confirmCancel}>
              Sim, cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Accessibility Bar and Header */}
      {/* <AccessibilityBar />
      <AppHeader /> */}

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-500">
              Página inicial
            </Link>
            <span className="mx-2">/</span>
            <Link href="/" className="hover:text-orange-500">
              Doador
            </Link>
            <span className="mx-2">/</span>
            <span>Editar produto</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Editar produto
        </h2>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <form className="space-y-6">
            {/* Photo Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="photo"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Foto*
                </Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 ${
                    validationErrors.photo
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                >
                  {imageUrl && (
                    <div className="mb-4">
                      <div className="relative w-full h-40 rounded overflow-hidden">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("photo")?.click()}
                      className={`flex items-center space-x-2 ${
                        validationErrors.photo
                          ? "border-red-500 text-red-600"
                          : ""
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span>
                        {imageUrl ? "Trocar imagem" : "Escolher arquivo"}
                      </span>
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Dimensões sugeridas 300px x 300px • Tamanho máximo: 500kb •
                    Formatos: JPG e PNG
                  </p>
                  {formData.photo && !imageUrl && (
                    <p className="text-xs text-green-600 mt-1">
                      Arquivo selecionado: {formData.photo.name}
                    </p>
                  )}
                </div>
                {validationErrors.photo && (
                  <p className="text-xs text-red-600 mt-1">
                    Este campo é obrigatório
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="photoDescription"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Descrição da foto*
                </Label>
                <Textarea
                  id="photoDescription"
                  placeholder="Escreva uma breve descrição sobre a foto"
                  value={formData.photoDescription}
                  onChange={(e) =>
                    handleInputChange("photoDescription", e.target.value)
                  }
                  className={`min-h-[100px] ${
                    validationErrors.photoDescription
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
                {validationErrors.photoDescription && (
                  <p className="text-xs text-red-600 mt-1">
                    Este campo é obrigatório
                  </p>
                )}
              </div>
            </div>

            {/* Product Name and Pickup Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="productName"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Nome do produto ou sacola*
                </Label>
                <Input
                  id="productName"
                  placeholder="Nome do produto ou sacola"
                  value={formData.productName}
                  onChange={(e) =>
                    handleInputChange("productName", e.target.value)
                  }
                  className={
                    validationErrors.productName
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {validationErrors.productName && (
                  <p className="text-xs text-red-600 mt-1">
                    Este campo é obrigatório
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="pickupInfo"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Informações sobre a retirada*
                </Label>
                <Input
                  id="pickupInfo"
                  placeholder="Informações sobre a retirada"
                  value={formData.pickupInfo}
                  onChange={(e) =>
                    handleInputChange("pickupInfo", e.target.value)
                  }
                  className={
                    validationErrors.pickupInfo
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {validationErrors.pickupInfo && (
                  <p className="text-xs text-red-600 mt-1">
                    Este campo é obrigatório
                  </p>
                )}
              </div>
            </div>

            {/* Expiration Date and Release Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="expirationDate"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Data de validade* (mínimo de 10 dias)
                </Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) =>
                    handleInputChange("expirationDate", e.target.value)
                  }
                  className={
                    validationErrors.expirationDate
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {validationErrors.expirationDate && (
                  <p className="text-xs text-red-600 mt-1">
                    Este campo é obrigatório
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="releaseTime"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Prazo para liberação*
                </Label>
                <Input
                  id="releaseTime"
                  placeholder="2 horas"
                  value={formData.releaseTime}
                  onChange={(e) =>
                    handleInputChange("releaseTime", e.target.value)
                  }
                  className={
                    validationErrors.releaseTime
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }
                />
                {validationErrors.releaseTime && (
                  <p className="text-xs text-red-600 mt-1">
                    Este campo é obrigatório
                  </p>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div>
              <Label
                htmlFor="productDescription"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                O que é esperado do produto ou sacola?*
              </Label>
              <Textarea
                id="productDescription"
                placeholder="Escreva uma breve descrição"
                value={formData.productDescription}
                onChange={(e) =>
                  handleInputChange("productDescription", e.target.value)
                }
                className={`min-h-[150px] ${
                  validationErrors.productDescription
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
                maxLength={1400}
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">
                  máximo de 1400 caracteres
                </p>
                <p className="text-xs text-gray-500">
                  {formData.productDescription.length}/1400
                </p>
              </div>
              {validationErrors.productDescription && (
                <p className="text-xs text-red-600 mt-1">
                  Este campo é obrigatório
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6">
              <Button
                type="button"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2"
                onClick={handleSave}
              >
                Salvar alterações
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="text-red-600 hover:text-red-700"
                onClick={handleCancel}
              >
                <p className="underline underline-offset-2">Cancelar</p>
              </Button>
            </div>
          </form>
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
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-l-none px-6">
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
