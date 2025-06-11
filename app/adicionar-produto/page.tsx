"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import Link from "next/link";
import { Upload, AlertCircle, Info } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

export default function AdicionarProduto() {
  const router = useRouter();
  const { addProduct } = useProducts();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [showExpirationWarning, setShowExpirationWarning] = useState(false);
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

    // Check if expiration date is in the past
    if (field === "expirationDate") {
      const today = new Date();
      const expDate = new Date(value);
      setShowExpirationWarning(expDate < today);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));

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
      }, 1000);
      return;
    }

    // Add product to context
    addProduct({
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
    }, 2500);
  };

  const handleCancel = () => {
    setShowCancelDialog(true);
  };

  const confirmCancel = () => {
    setShowCancelDialog(false);
    // Redirect to main page
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-50">
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Produto criado com sucesso!
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

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Confirmar cancelamento</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja cancelar a criação do produto? Todas as
              informações inseridas serão perdidas.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              className="cursor-pointer"
            >
              Continuar editando
            </Button>
            <Button
              variant="destructive"
              onClick={confirmCancel}
              className="cursor-pointer"
            >
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
            <Link href="/" className="hover:text-orange-500 cursor-pointer">
              Página inicial
            </Link>
            <span className="mx-2">/</span>
            <Link href="/" className="hover:text-orange-500 cursor-pointer">
              Doador
            </Link>
            <span className="mx-2">/</span>
            <span>Adicionar produto ou sacola</span>
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Adicionar produto ou sacola
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
                      className={`flex items-center space-x-2 cursor-pointer ${
                        validationErrors.photo
                          ? "border-red-500 text-red-600"
                          : ""
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span className="cursor-pointer">Escolher arquivo</span>
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Dimensões sugeridas 300px x 300px • Tamanho máximo: 500kb •
                    Formatos: JPG e PNG
                  </p>
                  {formData.photo && (
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
                  className={`min-h-[100px] cursor-text ${
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
                  className={`cursor-text ${
                    validationErrors.productName
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
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
                  className={`cursor-text ${
                    validationErrors.pickupInfo
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
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
                  Data de validade*
                </Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={formData.expirationDate}
                  onChange={(e) =>
                    handleInputChange("expirationDate", e.target.value)
                  }
                  className={
                    (validationErrors.expirationDate
                      ? "border-red-500 focus:border-red-500"
                      : "") + " cursor-pointer"
                  }
                />
                {validationErrors.expirationDate && (
                  <p className="text-xs text-red-600 mt-1">
                    Este campo é obrigatório
                  </p>
                )}
                {showExpirationWarning && (
                  <Alert className="mt-2 py-2 bg-amber-50 border-amber-200 text-amber-800">
                    <Info className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-xs font-medium">
                      Atenção
                    </AlertTitle>
                    <AlertDescription className="text-xs">
                      A data de validade está no passado. O produto será marcado
                      como Vencido.
                    </AlertDescription>
                  </Alert>
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
                  className={`cursor-text ${
                    validationErrors.releaseTime
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
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
                className={`min-h-[150px] cursor-text ${
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
                className="bg-[#F57C00] hover:bg-[#E65100] text-black px-8 py-2 cursor-pointer"
                onClick={handleSave}
              >
                Salvar
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="text-red-600 hover:text-red-700 cursor-pointer"
                onClick={handleCancel}
              >
                <p className="underline underline-offset-2">Cancelar</p>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
