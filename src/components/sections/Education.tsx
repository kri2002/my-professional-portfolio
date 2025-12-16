"use client";

import React, { useRef, useEffect } from "react";
import { useObserver } from "@/context/ObserverContext";
import { motion } from "framer-motion";

const educationData = [
  {
    school: "Universidad Tecnológica de Jalisco",
    degree: "Ingeniería en Desarrollo y Gestión de Software",
    period: "2023 - 2025",
    description: "Especialización en arquitectura de software, gestión de proyectos ágiles y desarrollo full stack escalable."
  },
  {
    school: "Universidad Tecnológica de Jalisco",
    degree: "TSU en Desarrollo de Software Multiplataforma",
    period: "2021 - 2023",
    description: "Fundamentos sólidos de programación, bases de datos y desarrollo de aplicaciones web y móviles."
  }
];

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const observe = useObserver();

  useEffect(() => {
    if (sectionRef.current) {
      observe(sectionRef.current);
    }
  }, [observe]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="flex flex-col justify-center py-24 min-h-[40vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-end gap-3">
          <span className="text-4xl md:text-5xl font-black text-transparent [-webkit-text-stroke:1px_#818cf8]">
            05.
          </span>
          Educación
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-[#112240]/30 border border-gray-800 p-8 rounded-lg hover:border-indigo-500/30 transition-colors duration-300"
          >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-100 max-w-[80%]">
                    {edu.degree}
                </h3>
                <span className="text-indigo-400 font-mono text-xs whitespace-nowrap border border-indigo-500/20 px-2 py-1 rounded">
                    {edu.period}
                </span>
            </div>
            
            <h4 className="text-indigo-300 font-medium mb-4 text-sm tracking-wide">
                {edu.school}
            </h4>

            <p className="text-slate-400 text-sm leading-relaxed">
                {edu.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;