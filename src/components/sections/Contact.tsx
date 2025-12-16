"use client";

import React, { useRef, useEffect, useState } from "react";
import { useObserver } from "@/context/ObserverContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMessageSquare, FiCheck, FiCopy } from "react-icons/fi";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const observe = useObserver();
  const [copied, setCopied] = useState(false);
  const email = "aguilarlopez.jabeth@gmail.com";

  useEffect(() => {
    if (sectionRef.current) {
      observe(sectionRef.current);
    }
  }, [observe]);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();

    navigator.clipboard.writeText(email);
    setCopied(true);

    window.location.href = `mailto:${email}`;

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="flex flex-col justify-center items-center py-32 min-h-[60vh] text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-end gap-3 mb-8">
          <span className="text-4xl md:text-5xl font-black text-transparent [-webkit-text-stroke:1px_#818cf8]">
            06.
          </span>
          Contacto
        </h2>

        <p className="text-slate-400 text-lg leading-relaxed mb-12 text-justify">
          Actualmente estoy buscando nuevas oportunidades para unirme a un
          equipo de ingeniería como{" "}
          <strong className="text-indigo-300">Frontend Developer</strong>. Ya
          sea que tengas una vacante, una pregunta o simplemente quieras
          saludar, estoy disponible.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleEmailClick}
            className={`
                group flex items-center gap-2 border-2 font-mono text-sm px-8 py-4 rounded transition-all duration-300 w-full sm:w-auto justify-center min-w-50
                ${
                  copied
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                    : "border-indigo-400 text-indigo-400 hover:bg-indigo-400/10"
                }
              `}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="copied"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <FiCheck size={18} />
                  <span>¡Correo Copiado!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <FiMail
                    size={18}
                    className="group-hover:-translate-y-0.5 transition-transform"
                  />
                  <span>Mandar Correo</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <a
            href="https://wa.me/523332178939?text=Hola%20Cristo,%20vi%20tu%20portafolio%20y%20me%20interesa%20platicar%20contigo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#112240] border-2 border-transparent text-slate-300 font-mono text-sm px-8 py-4 rounded hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <FiMessageSquare size={18} />
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
