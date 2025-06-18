"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context";
import { CheckCircle } from "lucide-react";

import successImg from "../../public/success.png";

export default function CadastroSucessoPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { resendConfirmationEmail } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const handleResendEmail = async () => {
    if (!email) return;

    setIsResending(true);
    setResendMessage("");

    try {
      const result = await resendConfirmationEmail(email);
      if (result.success) {
        setResendMessage("E-mail de confirmação reenviado com sucesso!");
      } else {
        setResendMessage(result.error || "Erro ao reenviar e-mail");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setResendMessage("Erro interno. Tente novamente.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-500 cursor-pointer">
              Página inicial
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/login"
              className="hover:text-orange-500 cursor-pointer"
            >
              Entrar
            </Link>
            <span className="mx-2">/</span>
            <span>Cadastre-se</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-96 lg:h-[582px] rounded-lg overflow-hidden">
            <Image src={successImg} alt="Caixa de papelão com alimentos" />
          </div>

          {/* Right Side - Success Message */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-lg p-8 shadow-sm text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Cadastro realizado com{" "}
                  <span className="text-orange-500">sucesso!</span>
                </h1>
              </div>

              <div className="mb-8">
                <p className="text-gray-600 mb-4">
                  Acesse seu e-mail para confirmar o seu cadastro e continuar
                  para o <span className="font-semibold">Barriga Cheea</span>.
                </p>

                {email && (
                  <p className="text-sm text-gray-500 mb-4">
                    E-mail enviado para:{" "}
                    <span className="font-medium">{email}</span>
                  </p>
                )}

                <p className="text-sm text-gray-500">
                  Caso não tenha recebido o e-mail clique em{" "}
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={isResending || !email}
                    className="text-blue-600 hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isResending ? "Reenviando..." : "Reenviar"}
                  </button>
                </p>
              </div>

              {resendMessage && (
                <Alert
                  className={`mb-6 ${
                    resendMessage.includes("sucesso")
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <AlertDescription
                    className={
                      resendMessage.includes("sucesso")
                        ? "text-green-800"
                        : "text-red-800"
                    }
                  >
                    {resendMessage}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <Link href="/login">
                  <span className="w-full bg-[#E65100] hover:bg-[#F57C00] text-black py-3 cursor-pointer">
                    Ir para Login
                  </span>
                </Link>

                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full py-3 cursor-pointer"
                  >
                    Voltar ao Início
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
