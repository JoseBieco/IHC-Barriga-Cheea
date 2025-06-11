"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import loginImg from "../../public/login.png";

export default function CadastroPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    cidade: "",
    estado: "",
    cep: "",
    endereco: "",
    senha: "",
    confirmarSenha: "",
    aceitarTermos: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);

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

    if (!formData.nomeCompleto.trim()) {
      newErrors.nomeCompleto = "Nome completo é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.cidade.trim()) {
      newErrors.cidade = "Cidade é obrigatória";
    }

    if (!formData.estado.trim()) {
      newErrors.estado = "Estado é obrigatório";
    }

    if (!formData.cep.trim()) {
      newErrors.cep = "CEP é obrigatório";
    }

    if (!formData.endereco.trim()) {
      newErrors.endereco = "Endereço é obrigatório";
    }

    if (!formData.senha.trim()) {
      newErrors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.senha)) {
      newErrors.senha = "Senha deve conter pelo menos um caractere especial";
    }

    if (!formData.confirmarSenha.trim()) {
      newErrors.confirmarSenha = "Confirmação de senha é obrigatória";
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "Senhas não coincidem";
    }

    if (!formData.aceitarTermos) {
      newErrors.aceitarTermos = "Você deve aceitar os termos e condições";
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
      const result = await register({
        nomeCompleto: formData.nomeCompleto,
        email: formData.email,
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep,
        endereco: formData.endereco,
        senha: formData.senha,
      });

      if (result.success) {
        router.push(
          `/cadastro-sucesso?email=${encodeURIComponent(formData.email)}`
        );
      } else {
        setGeneralError(result.error || "Erro ao criar conta");
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Image */}
          <div className="relative h-96 lg:h-[582px] rounded-lg overflow-hidden">
            <Image src={loginImg} alt="Pessoas com máscaras e luvas embalando alimentos para doação" />
          </div>

          {/* Right Side - Registration Form */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Cadastre-se <span className="text-orange-500">Doador</span>
              </h1>
              <p className="text-gray-600 mb-8">
                Preencha os dados abaixo para completar o seu cadastro.
              </p>

              {generalError && (
                <Alert className="mb-6 bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {generalError}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="nomeCompleto"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nome completo*
                  </Label>
                  <Input
                    id="nomeCompleto"
                    type="text"
                    value={formData.nomeCompleto}
                    onChange={(e) =>
                      handleInputChange("nomeCompleto", e.target.value)
                    }
                    className={`mt-1 cursor-text ${
                      errors.nomeCompleto
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="Digite seu nome completo"
                  />
                  {errors.nomeCompleto && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.nomeCompleto}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    E-mail*
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`mt-1 cursor-text ${
                      errors.email ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="Digite seu e-mail"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="cidade"
                      className="text-sm font-medium text-gray-700"
                    >
                      Cidade*
                    </Label>
                    <Input
                      id="cidade"
                      type="text"
                      value={formData.cidade}
                      onChange={(e) =>
                        handleInputChange("cidade", e.target.value)
                      }
                      className={`mt-1 cursor-text ${
                        errors.cidade
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      placeholder="Cidade"
                    />
                    {errors.cidade && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.cidade}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="estado"
                      className="text-sm font-medium text-gray-700"
                    >
                      Estado*
                    </Label>
                    <Input
                      id="estado"
                      type="text"
                      value={formData.estado}
                      onChange={(e) =>
                        handleInputChange("estado", e.target.value)
                      }
                      className={`mt-1 cursor-text ${
                        errors.estado
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      placeholder="Estado"
                    />
                    {errors.estado && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.estado}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="cep"
                    className="text-sm font-medium text-gray-700"
                  >
                    Cep*
                  </Label>
                  <Input
                    id="cep"
                    type="text"
                    value={formData.cep}
                    onChange={(e) => handleInputChange("cep", e.target.value)}
                    className={`mt-1 cursor-text ${
                      errors.cep ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="Digite seu CEP"
                  />
                  {errors.cep && (
                    <p className="text-xs text-red-600 mt-1">{errors.cep}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="endereco"
                    className="text-sm font-medium text-gray-700"
                  >
                    Endereço*
                  </Label>
                  <Input
                    id="endereco"
                    type="text"
                    value={formData.endereco}
                    onChange={(e) =>
                      handleInputChange("endereco", e.target.value)
                    }
                    className={`mt-1 cursor-text ${
                      errors.endereco
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="Digite seu endereço"
                  />
                  {errors.endereco && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.endereco}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="senha"
                    className="text-sm font-medium text-gray-700"
                  >
                    Senha*
                  </Label>
                  <Input
                    id="senha"
                    type="password"
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    className={`mt-1 cursor-text ${
                      errors.senha ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="Digite sua senha"
                  />
                  {errors.senha && (
                    <p className="text-xs text-red-600 mt-1">{errors.senha}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="confirmarSenha"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirmar senha*
                  </Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    value={formData.confirmarSenha}
                    onChange={(e) =>
                      handleInputChange("confirmarSenha", e.target.value)
                    }
                    className={`mt-1 cursor-text ${
                      errors.confirmarSenha
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="Confirme sua senha"
                  />
                  {errors.confirmarSenha && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.confirmarSenha}
                    </p>
                  )}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="aceitarTermos"
                    checked={formData.aceitarTermos}
                    onCheckedChange={(checked: boolean) =>
                      handleInputChange("aceitarTermos", checked as boolean)
                    }
                    className={`cursor-pointer ${
                      errors.aceitarTermos ? "border-red-500" : ""
                    }`}
                  />
                  <Label
                    htmlFor="aceitarTermos"
                    className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                  >
                    Aceito os{" "}
                    <button
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer"
                    >
                      termos e condições de uso e a política de privacidade
                    </button>
                    .
                  </Label>
                </div>
                {errors.aceitarTermos && (
                  <p className="text-xs text-red-600">{errors.aceitarTermos}</p>
                )}

                {/* Terms and Privacy Modal */}
                <Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
                  <DialogContent className="max-w-2xl max-h-[80vh] p-0">
                    <DialogHeader className="p-6 pb-4 border-b">
                      {/* <div className="p-6 pb-4 border-b"> */}
                      <DialogTitle className="text-xl font-bold text-center">
                        Políticas de Privacidade
                      </DialogTitle>
                      {/* </div> */}
                    </DialogHeader>

                    <div className="p-6 overflow-y-auto max-h-[60vh] text-sm leading-relaxed space-y-4">
                      {/* <p>
                        A sua privacidade é importante para nós. É política do
                        Barriga Chea respeitar a sua privacidade em relação a
                        qualquer informação sua que possamos coletar no site
                        Barriga Chea, e outros sites que possuímos e operamos.
                      </p>
                      <p>
                        Solicitamos informações pessoais apenas quando realmente
                        precisamos delas para lhe fornecer um serviço. Fazemo-lo
                        por meios justos e legais, com o seu conhecimento e
                        consentimento. Também informamos por que estamos
                        coletando e como será usado.
                      </p>
                      <p>
                        Apenas retemos as informações coletadas pelo tempo
                        necessário para fornecer o serviço solicitado. Quando
                        armazenamos dados, protegemos dentro de meios
                        comercialmente aceitáveis para evitar perdas e roubos,
                        bem como acesso, divulgação, cópia, uso ou modificação
                        não autorizados.
                      </p>
                      <p>
                        Não compartilhamos informações de identificação pessoal
                        publicamente ou com terceiros, exceto quando exigido por
                        lei.
                      </p>
                      <p>
                        O nosso site pode ter links para sites externos que não
                        são operados por nós. Esteja ciente de que não temos
                        controle sobre o conteúdo e práticas desses sites e não
                        podemos aceitar responsabilidade por suas respectivas
                        políticas de privacidade.
                      </p>
                      <p>
                        Você é livre para recusar a nossa solicitação de
                        informações pessoais, entendendo que talvez não possamos
                        fornecer alguns dos serviços desejados.
                      </p>
                      <p>
                        O uso continuado de nosso site será considerado como
                        aceitação de nossas práticas em torno de privacidade e
                        informações pessoais. Se você tiver alguma dúvida sobre
                        como lidamos com dados do usuário e informações
                        pessoais, entre em contacto connosco.
                      </p>
                      <p className="font-semibold">INSERIR TEXTO</p>
                      <p>
                        Esta política é efetiva a partir de 1 de janeiro de
                        2024. Reservamo-nos o direito de alterar esta política a
                        qualquer momento. Quaisquer alterações a esta política
                        serão publicadas nesta página.
                      </p> */}
                      <p>
                        A sua privacidade é importante para nós. É política do
                        Barriga Cheea respeitar a sua privacidade em relação a
                        qualquer informação sua que possamos coletar no site
                        Barriga Cheea, e outros sites que possuímos e operamos.
                        Solicitamos informações pessoais apenas quando realmente
                        precisamos delas para lhe fornecer um serviço. Fazemo-lo
                        por meios justos e legais, com o seu conhecimento e
                        consentimento. Também informamos por que estamos
                        coletando e como será usado. Apenas retemos as
                        informações coletadas pelo tempo necessário para
                        fornecer o serviço solicitado. Quando armazenamos dados,
                        protegemos dentro de meios comercialmente aceitáveis
                        para evitar perdas e roubos, bem como acesso,
                        divulgação, cópia, uso ou modificação não autorizados.
                      </p>
                      <p>
                        Não compartilhamos informações de identificação pessoal
                        publicamente ou com terceiros, exceto quando exigido por
                        lei. O nosso site pode ter links para sites externos que
                        não são operados por nós. Esteja ciente de que não temos
                        controle sobre o conteúdo e práticas desses sites e não
                        podemos aceitar responsabilidade por suas
                        respectivas políticas de privacidade. Você é livre para
                        recusar a nossa solicitação de informações pessoais,
                        entendendo que talvez não possamos fornecer alguns dos
                        serviços desejados.
                      </p>
                      <p>
                        O uso continuado de nosso site será considerado como
                        aceitação de nossas práticas em torno de privacidade e
                        informações pessoais. Se você tiver alguma dúvida sobre
                        como lidamos com dados do usuário e informações
                        pessoais, entre em contacto conosco.
                      </p>
                      <p>
                        O serviço Google AdSense que usamos para veicular
                        publicidade usa um cookie DoubleClick para veicular
                        anúncios mais relevantes em toda a Web e limitar o
                        número de vezes que um determinado anúncio é exibido
                        para você.
                      </p>
                      <p>
                        Para mais informações sobre o Google AdSense, consulte
                        as FAQs oficiais sobre privacidade do Google AdSense.
                        Utilizamos anúncios para compensar os custos de
                        funcionamento deste site e fornecer financiamento para
                        futuros desenvolvimentos. Os cookies de publicidade
                        comportamental usados ​​por este site foram projetados
                        para garantir que você forneça os anúncios mais
                        relevantes sempre que possível, rastreando anonimamente
                        seus interesses e apresentando coisas semelhantes que
                        possam ser do seu interesse.
                      </p>
                      <p>
                        Vários parceiros anunciam em nosso nome e os cookies de
                        rastreamento de afiliados simplesmente nos permitem ver
                        se nossos clientes acessaram o site através de um dos
                        sites de nossos parceiros, para que possamos creditá-los
                        adequadamente e, quando aplicável, permitir que nossos
                        parceiros afiliados ofereçam qualquer promoção que pode
                        fornecê-lo para fazer uma compra.
                      </p>
                      <p>
                        Compromisso do Usuário O usuário se compromete a fazer
                        uso adequado dos conteúdos e da informação que o Barriga
                        Cheea oferece no site e com caráter enunciativo, mas não
                        limitativo: <br />
                        A) Não se envolver em atividades que sejam ilegais ou
                        contrárias à boa fé a à ordem pública; <br />
                        B) Não difundir propaganda ou conteúdo de natureza
                        racista, xenofóbica, jogos de sorte ou azar, qualquer
                        tipo de pornografia ilegal, de apologia ao terrorismo ou
                        contra os direitos humanos; <br />
                        C) Não causar danos aos sistemas físicos (hardwares) e
                        lógicos (softwares) do Barriga Cheea, de seus
                        fornecedores ou terceiros, para introduzir ou disseminar
                        vírus informáticos ou quaisquer outros sistemas de
                        hardware ou software que sejam capazes de causar danos
                        anteriormente mencionados.
                      </p>
                      <p>
                        Mais informações <br />
                        Esperemos que esteja esclarecido e, como mencionado
                        anteriormente, se houver algo que você não tem certeza
                        se precisa ou não, geralmente é mais seguro deixar os
                        cookies ativados, caso interaja com um dos recursos que
                        você usa em nosso site. Esta política é efetiva a partir
                        de 6 Maio 2025 17:46
                      </p>
                    </div>

                    <DialogFooter className="p-6 pt-4 border-t flex justify-end">
                      <Button
                        onClick={() => setShowTermsModal(false)}
                        className="bg-gray-800 hover:bg-gray-900 text-white px-6 cursor-pointer"
                      >
                        Fechar
                      </Button>
                    </DialogFooter>
                    {/* <div className="p-6 pt-4 border-t flex justify-end">
                      <Button
                        onClick={() => setShowTermsModal(false)}
                        className="bg-gray-800 hover:bg-gray-900 text-white px-6 cursor-pointer"
                      >
                        Fechar
                      </Button>
                    </div> */}
                  </DialogContent>
                </Dialog>

                <div className="flex justify-between items-center pt-4">
                  <Button
                    type="submit"
                    className="bg-[#F57C00] hover:bg-[#E65100] text-black px-8 py-2 cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                  <Link
                    href="/login"
                    className="text-red-600 hover:underline text-sm cursor-pointer underline underline-offset-2"
                  >
                    Voltar
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
