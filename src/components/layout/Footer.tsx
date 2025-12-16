"use client";

import React from "react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 text-center text-slate-400 text-sm font-mono bg-[#0f172a]/50">
      <div className="flex justify-center gap-6 mb-4 lg:hidden">
        <a
          href="https://github.com/kri2002"
          target="_blank"
          rel="noreferrer"
          className="hover:text-indigo-400 transition-colors"
        >
          <FiGithub size={20} />
        </a>
      </div>

      <div>Diseñado & Construido por Cristo Aguilar</div>
      <div className="mt-1 text-xs opacity-70">
        Next.js · Tailwind · Framer Motion
      </div>
      <div className="text-xs text-slate-500 mt-2">
             &copy; {currentYear} Cristo Aguilar. Todos los derechos reservados.
          </div>
    </footer>
  );
};

export default Footer;
