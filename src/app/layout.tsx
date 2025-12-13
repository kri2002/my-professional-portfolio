import type { Metadata } from 'next';
import './globals.css';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Cristo Aguilar | Portafolio de Desarrollo',
  description: 'Portafolio creado con Next.js y Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}