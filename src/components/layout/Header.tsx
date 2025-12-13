import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Tu Nombre
        </Link>
        <div className="space-x-4">
          <Link href="/projects" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
            Proyectos
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
            Acerca de Mí
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">
            Contacto
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;