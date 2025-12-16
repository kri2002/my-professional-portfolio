"use client";

import React, { useRef, useEffect } from "react";
import { useObserver } from "@/context/ObserverContext";
import { motion } from "framer-motion";

const jobs = [
  {
    company: "Kuub",
    role: "Web Developer",
    period: "Ene 2025 - Presente",
    description: [
      "Arquitectura del frontend para una plataforma e-commerce multivendedor escalable usando Next.js y React.",
      "Integración de seguridad y almacenamiento en la nube mediante servicios AWS (Cognito, S3).",
      "Ingeniería de un sistema robusto de estado global con Redux para flujos de datos complejos.",
      "Colaboración en equipo Agile/Scrum utilizando Jira y Git para el control de versiones."
    ]
  },
  {
    company: "BitWave",
    role: "Web Developer",
    period: "2024 - 2025",
    description: [
      "Desarrollo de aplicaciones web end-to-end traduciendo diseños UI/UX en código pixel-perfect.",
      "Optimización del rendimiento de dashboards en un 35% mediante refactorización de código.",
      "Implementación de pipelines de despliegue seguro e integración de servidores con AWS EC2.",
      "Estilización de interfaces modernas y responsivas utilizando Tailwind CSS y SCSS."
    ]
  }
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const observe = useObserver();

  useEffect(() => {
    if (sectionRef.current) {
      observe(sectionRef.current);
    }
  }, [observe]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-white flex items-end gap-2 md:gap-3">
          <span className="text-4xl md:text-5xl font-black text-transparent [-webkit-text-stroke:1px_#818cf8]">
            02.
          </span> 
          Experiencia
        </h2>

        <div className="relative border-l border-gray-800 ml-3 md:ml-6 space-y-12 md:space-y-16">
          {jobs.map((job, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              <span className="absolute -left-1.25 top-2 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-gray-900" />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-200">
                  {job.role} <span className="text-indigo-400">@ {job.company}</span>
                </h3>
                <span className="text-xs md:text-sm font-mono text-gray-500 mt-1 sm:mt-0 uppercase tracking-wide">
                  {job.period}
                </span>
              </div>

              <ul className="space-y-3">
                {job.description.map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start text-gray-400 text-sm md:text-base"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <span className="mr-3 text-indigo-400 mt-1.25 text-xs">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;