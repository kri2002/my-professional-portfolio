import type { Metadata } from 'next';
import { Space_Grotesk } from "next/font/google";
import './globals.css';
import MainLayout from '@/components/layout/MainLayout';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: 'Cristo Aguilar',
  description: 'Portafolio creado con Next.js y Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} antialiased bg-[#0f172a] text-slate-200`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}