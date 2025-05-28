import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ProductsProvider } from "@/contexts/products-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Barriga Cheea",
  description: "Plataforma de doação de alimentos",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ProductsProvider>{children}</ProductsProvider>
      </body>
    </html>
  )
}
