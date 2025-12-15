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
      "Desarrollo de una plataforma e-commerce multivendedor escalable usando React, Next.js y Sass.",
      "Integración de servicios AWS (Cognito, S3, EC2) para autenticación y almacenamiento.",
      "Gestión del estado global con Redux para optimizar el flujo de datos.",
      "Colaboración bajo metodología Scrum con Jira y Git para entregas de alta calidad."
    ]
  },
  {
    company: "BitWave",
    role: "Web Developer",
    period: "2024 - 2025",
    description: [
      "Desarrollo de aplicaciones web end-to-end usando React y Next.js.",
      "Implementación de interfaces responsivas basadas en diseños UI/UX.",
      "Consumo de APIs REST asegurando un flujo de datos fluido entre frontend y backend.",
      "Diseño de componentes estilizados con Tailwind CSS y SCSS manteniendo un código limpio."
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
      className="min-h-screen flex flex-col justify-center py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-16 text-white">
          <span className="text-indigo-400">02.</span> Experiencia
        </h2>

        <div className="relative border-l border-gray-800 ml-3 space-y-16">
          {jobs.map((job, index) => (
            <div key={index} className="relative pl-12">
              <span className="absolute -left-1.25 top-2 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-gray-900" />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-200">
                  {job.role} <span className="text-indigo-400">@ {job.company}</span>
                </h3>
                <span className="text-sm font-mono text-gray-500 mt-1 sm:mt-0">
                  {job.period}
                </span>
              </div>

              <ul className="space-y-3">
                {job.description.map((item, i) => (
                  <li key={i} className="flex items-start text-gray-400">
                    <span className="mr-3 text-indigo-400 mt-1.5">▹</span>
                    <span className="leading-relaxed text-base">{item}</span>
                  </li>
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