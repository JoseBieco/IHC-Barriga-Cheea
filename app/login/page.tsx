"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    lembrarMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Clear general error
    if (generalError) {
      setGeneralError("");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.senha.trim()) {
      newErrors.senha = "Senha é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setGeneralError("");

    try {
      const result = await login(
        formData.email,
        formData.senha,
        formData.lembrarMe
      );

      if (result.success) {
        router.push("/");
      } else {
        setGeneralError(result.error || "Erro ao fazer login");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setGeneralError("Erro interno. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
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
              className="hover:text-[#E65100] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded"
              aria-label="Voltar para página inicial"
            >
              Página inicial
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span aria-current="page">Entrar</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main
        className="max-w-7xl mx-auto px-4 py-8"
        role="main"
        aria-label="Formulário de login"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image */}
          <div className="relative h-96 lg:h-[600px] bg-black rounded-lg overflow-hidden">
            <div
              className="w-full h-full bg-black flex items-center justify-center"
              role="img"
              aria-label="[ALT] Imagem representativa de doação de alimentos - substituir por imagem real"
            >
              <span
                className="text-white text-lg text-center px-4"
                aria-hidden="true"
              >
                [ALT] Imagem de doação de alimentos - substituir por imagem real
              </span>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-[#FEFEFF] rounded-lg p-8 shadow-sm">
              <header className="mb-8">
                <h1
                  className="text-2xl font-bold text-gray-800 mb-2"
                  id="login-title"
                >
                  Login <span className="text-[#F57C00]">Doador</span>
                </h1>
                <p
                  className="text-gray-600"
                  id="login-description"
                  aria-describedby="login-title"
                >
                  Bem-vindo ao Barriga Cheea. Insira seus dados para acessar sua
                  conta.
                </p>
              </header>

              {generalError && (
                <Alert
                  className="mb-6 bg-red-50 border-red-200"
                  role="alert"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <AlertCircle
                    className="h-4 w-4 text-red-600"
                    aria-hidden="true"
                  />
                  <AlertDescription className="text-red-800">
                    {generalError}
                  </AlertDescription>
                </Alert>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
                aria-labelledby="login-title"
                aria-describedby="login-description"
              >
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                    id="email-label"
                  >
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`mt-1 cursor-text ${
                      errors.email ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="Digite seu e-mail"
                    aria-labelledby="email-label"
                    aria-describedby={
                      errors.email ? "email-error" : "email-help"
                    }
                    aria-required="true"
                    aria-invalid={!!errors.email}
                  />
                  <div id="email-help" className="sr-only">
                    Digite seu endereço de e-mail para fazer login
                  </div>
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-xs text-red-600 mt-1"
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="senha"
                    className="text-sm font-medium text-gray-700"
                    id="senha-label"
                  >
                    Senha *
                  </Label>
                  <Input
                    id="senha"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    className={`mt-1 cursor-text ${
                      errors.senha ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="Digite sua senha"
                    aria-labelledby="senha-label"
                    aria-describedby={
                      errors.senha ? "senha-error" : "senha-help"
                    }
                    aria-required="true"
                    aria-invalid={!!errors.senha}
                  />
                  <div id="senha-help" className="sr-only">
                    Digite sua senha para fazer login
                  </div>
                  {errors.senha && (
                    <p
                      id="senha-error"
                      className="text-xs text-red-600 mt-1"
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.senha}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lembrarMe"
                    checked={formData.lembrarMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("lembrarMe", checked as boolean)
                    }
                    className="cursor-pointer"
                    aria-describedby="lembrar-help"
                  />
                  <Label
                    htmlFor="lembrarMe"
                    className="text-sm text-gray-600 cursor-pointer"
                    id="lembrar-label"
                  >
                    Lembrar-me
                  </Label>
                  <div id="lembrar-help" className="sr-only">
                    Marque esta opção para manter-se logado neste dispositivo
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#E65100] hover:bg-[#F57C00] text-white py-3 cursor-pointer focus:ring-2 focus:ring-[#F57C00] focus:ring-offset-2 transition-colors"
                  disabled={isLoading}
                  aria-describedby="submit-help"
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
                <div id="submit-help" className="sr-only">
                  Clique para fazer login com suas credenciais
                </div>

                <div className="text-center">
                  <Link
                    href="/esqueci-senha"
                    className="text-red-600 hover:text-red-700 hover:underline text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 rounded transition-colors"
                    aria-label="Recuperar senha esquecida"
                  >
                    Esqueci a senha
                  </Link>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full py-3 border-gray-300 cursor-pointer hover:bg-gray-50 focus:ring-2 focus:ring-[#F57C00] focus:ring-offset-2 transition-colors"
                  onClick={() => {
                    alert("Funcionalidade do Google em desenvolvimento");
                  }}
                  aria-label="Fazer login com conta do Google"
                  aria-describedby="google-help"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </Button>
                <div id="google-help" className="sr-only">
                  Opção alternativa para fazer login usando sua conta do Google
                </div>

                <div className="text-center text-sm text-gray-600">
                  Ainda não possui uma conta?{" "}
                  <Link
                    href="/cadastro"
                    className="text-gray-800 hover:text-[#E65100] hover:underline font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F57C00] rounded transition-colors"
                    aria-label="Criar nova conta de usuário"
                  >
                    Cadastre-se
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
