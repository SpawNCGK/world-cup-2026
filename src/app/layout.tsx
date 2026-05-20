import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Copa do Mundo 2026 | Tabela, Jogos e Resultados",
  description:
    "Acompanhe todos os jogos, grupos, chaveamento e estatísticas da Copa do Mundo FIFA 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}