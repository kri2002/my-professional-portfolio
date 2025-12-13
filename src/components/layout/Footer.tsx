// src/components/layout/Footer.tsx
import Link from 'next/link';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Información de Copyright */}
          <div className="text-sm text-gray-500 dark:text-gray-400 order-2 md:order-1 mt-4 md:mt-0">
            &copy; {currentYear} Tu Nombre. Desarrollado con Next.js y Tailwind CSS.
          </div>

          {/* Enlaces y Navegación */}
          <div className="flex space-x-6 order-1 md:order-2">
            <Link href="/projects" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors text-sm">
              Proyectos
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors text-sm">
              Acerca de
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors text-sm">
              Contacto
            </Link>
          </div>
        </div>
        
        {/* Enlaces Sociales (Repetidos para accesibilidad o si el header no es fijo) */}
        <div className="flex justify-center mt-6 border-t border-gray-300 dark:border-gray-700 pt-6">
          <div className="space-x-6">
            <a href="URL_LINKEDIN" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <FiLinkedin className="h-5 w-5" />
            </a>
            <a href="URL_GITHUB" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <FiGithub className="h-5 w-5" />
            </a>
            <a href="mailto:TU_EMAIL" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <FiMail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;