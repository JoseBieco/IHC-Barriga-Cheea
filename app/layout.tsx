import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProductsProvider } from "@/contexts/products-context";
import { AccessibilityProvider } from "@/contexts/accessibility-context";
import { KeyboardNavigation } from "@/components/keyboard-navigation";
import { ScreenReaderAnnouncer } from "@/components/screen-reader-announcer";
import { AccessibilityBar } from "@/components/accessibility-bar";
import { AppHeader } from "@/components/app-header";
import { VLibras } from "@/components/vlibras";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barriga Cheea",
  description: "Plataforma de doação de alimentos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AccessibilityProvider>
          <AuthProvider>
            <ProductsProvider>
              <ScreenReaderAnnouncer />
              <KeyboardNavigation />
              <div className="sticky top-0 z-50">
                <AccessibilityBar />
                <AppHeader />
              </div>
              {children}
            </ProductsProvider>
          </AuthProvider>
        </AccessibilityProvider>
        <VLibras forceOnload />
      </body>
    </html>
  );
}
