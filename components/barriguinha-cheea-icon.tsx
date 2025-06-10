import Image from "next/image";
import Link from "next/link";

export function BarriguinhaCheeaIcon() {
  return (
    <Link
      href="/"
      aria-label="Ir para página inicial do Barriga Cheea"
      className="cursor-pointer"
    >
      {/* <span className="text-2xl" aria-hidden="true">
                😊
              </span> */}
      <Image
        src={"BarriguinhaCheea.svg"}
        alt="Mascote do Barriga Cheea, a Barriguinha Cheea, que é uma pera cortada ao meio, com a parte superior da fruta deitada para a direita. 
                  No meio da fruta, tem-se um rosto com 2 olhos, um sorriso e bochechas. O mascote tem tons de laranja, sendo a casca um laranja médio, o meio
                  da fruta um laranja bem claro e o rosto (olhos, sorriso e bochechas) um laranja escuro."
        className="object-cover"
        aria-description="Ícone com o mascote da plataforma, a Barriguinha Cheea. Ao clicar será redirecionado para a tela principal do sistema."
        width={256}
        height={256}
        unoptimized
      />
    </Link>
  );
}
