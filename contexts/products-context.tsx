"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface Product {
  id: string;
  photo: File | null;
  photoDescription: string;
  productName: string;
  pickupInfo: string;
  expirationDate: string;
  releaseTime: string;
  productDescription: string;
  status: "em-liberacao" | "liberados" | "vencidos" | "doados";
  createdAt: Date;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "status" | "createdAt">) => void;
  updateProduct: (
    id: string,
    product: Omit<Product, "id" | "status" | "createdAt">
  ) => void;
  updateProductStatus: (id: string, status: Product["status"]) => void;
  deleteProduct: (id: string) => void;
  getProductsByStatus: (status: Product["status"]) => Product[];
  getProductById: (id: string) => Product | undefined;
  getTotalProducts: () => number;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);
async function urlToFile(url: string, filename: string, mimeType: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}
// Mock data for demonstration
const createMockProducts = async (): Promise<Product[]> => {
  const mockProducts: Product[] = [
    {
      id: "1",
      photo: await urlToFile(
        "/images/cesta_frutas.png",
        "cesta_frutas.png",
        "image/png"
      ),
      photoDescription: "Cesta com frutas frescas e saudáveis, perfeitas para consumo imediato",
      productName: "Cesta de Frutas Variadas",
      pickupInfo:
        "Retirada na Rua das Flores, 123 - Centro. Disponível das 8h às 18h",
      expirationDate: "2025-02-15",
      releaseTime: "2 horas",
      productDescription:
        "Cesta com frutas frescas e saudáveis, perfeitas para consumo imediato. Inclui maçãs, bananas, laranjas e outras frutas da estação. Ideal para famílias ou pessoas que buscam uma alimentação mais saudável.",
      status: "em-liberacao",
      createdAt: new Date("2025-01-28T10:30:00"),
    },
    {
      id: "2",
      photo: await urlToFile(
        "/images/paes_frescos.png",
        "paes_frescos.png",
        "image/png"
      ),
      photoDescription: "Pães frescos de padaria artesanal",
      productName: "Pães Artesanais Frescos",
      pickupInfo: "Padaria do João - Av. Principal, 456. Retirar até 20h",
      expirationDate: "2025-02-02",
      releaseTime: "1 hora",
      productDescription:
        "Pães frescos feitos artesanalmente na manhã de hoje. Variedade inclui pão francês, pão integral e pão de centeio. Perfeitos para o café da manhã ou lanche da tarde.",
      status: "liberados",
      createdAt: new Date("2025-01-27T14:20:00"),
    },
    {
      id: "3",
      photo: await urlToFile(
        "/images/legumes_2.png",
        "legumes_2.png",
        "image/png"
      ),
      photoDescription: "Legumes frescos da horta orgânica local",
      productName: "Legumes Orgânicos da Horta",
      pickupInfo: "Feira Orgânica - Praça Central. Sábados das 7h às 12h",
      expirationDate: "2025-02-10",
      releaseTime: "3 horas",
      productDescription:
        "Legumes frescos e orgânicos colhidos diretamente da horta. Inclui cenouras, abobrinha, brócolis e couve-flor. Sem agrotóxicos, cultivados com amor e cuidado para sua família.",
      status: "em-liberacao",
      createdAt: new Date("2025-01-26T09:15:00"),
    },
    {
      id: "4",
      photo: await urlToFile(
        "/images/marmitas.png",
        "marmitas.png",
        "image/png"
      ),
      photoDescription: "Refeições prontas congeladas caseiras",
      productName: "Marmitas Caseiras Congeladas",
      pickupInfo:
        "Cozinha Solidária - Rua da Esperança, 789. Segunda a sexta, 12h às 14h",
      expirationDate: "2025-03-01",
      releaseTime: "4 horas",
      productDescription:
        "Marmitas caseiras preparadas com ingredientes frescos e muito carinho. Opções incluem arroz, feijão, carne, frango e saladas. Prontas para aquecer e servir.",
      status: "liberados",
      createdAt: new Date("2025-01-25T16:45:00"),
    },
    // {
    //   id: "5",
    //   photo: null,
    //   photoDescription: "Produtos de limpeza e higiene pessoal",
    //   productName: "Kit Higiene e Limpeza",
    //   pickupInfo: "Farmácia Popular - Shopping Center, Loja 45",
    //   expirationDate: "2025-12-31",
    //   releaseTime: "6 horas",
    //   productDescription:
    //     "Kit completo com produtos de higiene pessoal e limpeza doméstica. Inclui sabonete, shampoo, pasta de dente, detergente e desinfetante. Produtos de qualidade para o cuidado da família.",
    //   status: "doados",
    //   createdAt: new Date("2025-01-24T11:30:00"),
    // },
    // {
    //   id: "6",
    //   photo: null,
    //   photoDescription: "Roupas infantis em bom estado de conservação",
    //   productName: "Roupas Infantis Variadas",
    //   pickupInfo: "Bazar Beneficente - Igreja São José, Rua da Paz, 321",
    //   expirationDate: "2025-06-30",
    //   releaseTime: "24 horas",
    //   productDescription:
    //     "Roupas infantis em excelente estado, tamanhos de 2 a 8 anos. Inclui camisetas, calças, vestidos e casacos. Peças limpas e bem conservadas, ideais para crianças em crescimento.",
    //   status: "em-liberacao",
    //   createdAt: new Date("2025-01-23T13:20:00"),
    // },
    {
      id: "7",
      photo: await urlToFile("/images/lacteos.png", "lacteos.png", "image/png"),
      photoDescription:
        "Produtos lácteos frescos da fazenda local como leite, queijo e iogurte",
      productName: "Laticínios Frescos da Fazenda",
      pickupInfo:
        "Fazenda Esperança - Estrada Rural, Km 15. Todos os dias das 6h às 10h",
      expirationDate: "2025-01-30",
      releaseTime: "30 minutos",
      productDescription:
        "Leite fresco, queijo artesanal e iogurte natural produzidos na fazenda. Produtos sem conservantes, direto do produtor para sua mesa. Qualidade garantida e sabor incomparável.",
      status: "vencidos",
      createdAt: new Date("2025-01-22T07:10:00"),
    },
    // {
    //   id: "8",
    //   photo: null,
    //   photoDescription: "Livros didáticos e literatura para todas as idades",
    //   productName: "Livros Educativos e Literatura",
    //   pickupInfo: "Biblioteca Comunitária - Centro Cultural, 2º andar",
    //   expirationDate: "2025-12-31",
    //   releaseTime: "12 horas",
    //   productDescription:
    //     "Coleção de livros didáticos, romances, livros infantis e material educativo. Perfeito para estudantes, professores e amantes da leitura. Conhecimento que transforma vidas.",
    //   status: "liberados",
    //   createdAt: new Date("2025-01-21T15:40:00"),
    // },
    // {
    //   id: "9",
    //   photo: null,
    //   photoDescription: "Brinquedos educativos e jogos para crianças",
    //   productName: "Brinquedos Educativos",
    //   pickupInfo: "Creche Municipal - Rua das Crianças, 159. Horário comercial",
    //   expirationDate: "2025-12-31",
    //   releaseTime: "8 horas",
    //   productDescription:
    //     "Brinquedos educativos, jogos de tabuleiro, quebra-cabeças e material pedagógico. Todos higienizados e em bom estado. Diversão e aprendizado garantidos para as crianças.",
    //   status: "doados",
    //   createdAt: new Date("2025-01-20T12:25:00"),
    // },
    // {
    //   id: "10",
    //   photo: null,
    //   photoDescription: "Medicamentos básicos e material de primeiros socorros",
    //   productName: "Kit Primeiros Socorros",
    //   pickupInfo:
    //     "Posto de Saúde Central - Av. da Saúde, 852. Segunda a sexta, 8h às 17h",
    //   expirationDate: "2025-08-15",
    //   releaseTime: "1 hora",
    //   productDescription:
    //     "Kit completo de primeiros socorros com medicamentos básicos, bandagens, antissépticos e termômetro. Essencial para ter em casa em caso de emergências médicas.",
    //   status: "em-liberacao",
    //   createdAt: new Date("2025-01-19T09:50:00"),
    // },
    // {
    //   id: "11",
    //   photo: null,
    //   photoDescription: "Produtos de panificação artesanal com grãos integrais",
    //   productName: "Pães Integrais Artesanais",
    //   pickupInfo: "Padaria Vida Saudável - Rua do Bem-Estar, 741",
    //   expirationDate: "2025-02-05",
    //   releaseTime: "2 horas",
    //   productDescription:
    //     "Pães integrais feitos com farinha orgânica, sementes e grãos especiais. Rico em fibras e nutrientes, ideal para uma alimentação balanceada e saudável.",
    //   status: "liberados",
    //   createdAt: new Date("2025-01-18T08:15:00"),
    // },
    // {
    //   id: "12",
    //   photo: null,
    //   photoDescription: "Produtos de limpeza ecológicos biodegradáveis",
    //   productName: "Produtos de Limpeza Ecológicos",
    //   pickupInfo: "Loja Verde - Shopping Sustentável, Piso 2",
    //   expirationDate: "2025-10-30",
    //   releaseTime: "5 horas",
    //   productDescription:
    //     "Linha completa de produtos de limpeza ecológicos e biodegradáveis. Seguros para a família e o meio ambiente. Inclui multiuso, lava-roupas e detergente natural.",
    //   status: "vencidos",
    //   createdAt: new Date("2025-01-17T14:35:00"),
    // },
  ];

  return mockProducts;
};

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  // Initialize with mock data on component mount
  useEffect(() => {
    async function fetchMockProducts() {
      const mockProducts = await createMockProducts();
      setProducts(mockProducts);
    }
    fetchMockProducts();
  }, []);

  // Função auxiliar para determinar o status com base na data de validade
  const determineProductStatus = (
    expirationDate: string
  ): Product["status"] => {
    const today = new Date();
    const expDate = new Date(expirationDate);

    // Se a data de validade for menor que a data atual, o produto está vencido
    if (expDate < today) {
      return "vencidos";
    }

    // Caso contrário, o produto está em liberação
    return "em-liberacao";
  };

  const addProduct = (
    productData: Omit<Product, "id" | "status" | "createdAt">
  ) => {
    // Determina o status com base na data de validade
    const status = determineProductStatus(productData.expirationDate);

    const newProduct: Product = {
      ...productData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      status,
      createdAt: new Date(),
    };

    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (
    id: string,
    updatedData: Omit<Product, "id" | "status" | "createdAt">
  ) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          // Se a data de validade foi alterada, precisamos verificar se o status deve mudar
          const status =
            // Se o produto já estava marcado como doado, mantém como doado
            product.status === "doados"
              ? "doados"
              : // Se o produto já estava marcado como liberado, mantém como liberado
              product.status === "liberados"
              ? "liberados"
              : // Caso contrário, determina o status com base na nova data de validade
                determineProductStatus(updatedData.expirationDate);

          return {
            ...product,
            ...updatedData,
            // Mantém o ID, status (possivelmente atualizado) e data de criação originais
            id: product.id,
            status,
            createdAt: product.createdAt,
          };
        }
        return product;
      })
    );
  };

  const updateProductStatus = (id: string, status: Product["status"]) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, status } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const getProductsByStatus = (status: Product["status"]) => {
    return products.filter((product) => product.status === status);
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const getTotalProducts = () => {
    return products.length;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        updateProductStatus,
        deleteProduct,
        getProductsByStatus,
        getProductById,
        getTotalProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
