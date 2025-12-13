import Link from 'next/link';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="py-20 md:py-32 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">
          Hola, soy <span className="text-indigo-600 dark:text-indigo-400">Tu Nombre</span>.
        </h1>
        
        {/* Propuesta de Valor */}
        <p className="mt-4 text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Ingeniero Frontend especializado en construir soluciones de alto rendimiento con **Next.js** y **Tailwind CSS**.
        </p>

        {/* Llamada a la Acción (CTA) */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition duration-150 ease-in-out transform hover:scale-[1.02]"
          >
            Ver Proyectos
            <FiArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-indigo-600 dark:border-indigo-400 text-base font-medium rounded-lg text-indigo-600 dark:text-indigo-400 bg-transparent hover:bg-indigo-50 dark:hover:bg-gray-800 transition duration-150 ease-in-out"
          >
            Contáctame
          </Link>
        </div>

        {/* Enlaces Sociales */}
        <div className="mt-10 flex justify-center space-x-6">
          <a href="URL_LINKEDIN" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <FiLinkedin className="h-6 w-6" />
          </a>
          <a href="URL_GITHUB" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <FiGithub className="h-6 w-6" />
          </a>
          <a href="mailto:TU_EMAIL" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <FiMail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;