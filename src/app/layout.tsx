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
      <head>
        {/* Cole aqui o script do Google AdSense */}
       <script
         async
         src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3385119571124977"
         crossOrigin="anonymous"
/>
      </head>
      <body>{children}</body>
    </html>
  );
}