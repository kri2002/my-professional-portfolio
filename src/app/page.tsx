import Hero from '@/components/sections/Hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tu Nombre | Desarrollador Next.js',
  description: 'Portafolio profesional de desarrollo web frontend, especializado en Next.js, React y Tailwind CSS.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}