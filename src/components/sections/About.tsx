"use client";

import React, { useRef, useEffect } from "react";
import { useObserver } from "@/context/ObserverContext";
import { motion } from "framer-motion";

const skills = [
  "React", "Next.js", "TypeScript", "JavaScript (ES6+)",
  "Tailwind CSS", "Sass", "Framer Motion", "Redux Toolkit",
  "Node.js", "PHP", "Laravel", "MySQL",
  "AWS (S3, EC2, Cognito)", "DigitalOcean", "Vercel", "Docker",
  "Git / GitHub", "CI/CD", "Figma", "Scrum / Jira"
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const observe = useObserver();

  useEffect(() => {
    if (sectionRef.current) {
      observe(sectionRef.current);
    }
  }, [observe]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="flex flex-col justify-start py-16 md:py-24 min-h-[50vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-white flex items-end gap-2 md:gap-3">
          <span className="text-4xl md:text-5xl font-black text-transparent [-webkit-text-stroke:1px_#818cf8]">
            01.
          </span> 
          Acerca de Mí
        </h2>

        <div className="space-y-4 md:space-y-6 text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl text-justify">
          <p>
            Hola, soy Cristo. Mi viaje en la programación comenzó con una simple curiosidad: 
            quería entender qué sucedía "detrás de escena" en las aplicaciones que usamos a diario. 
            Esa curiosidad se transformó en mi profesión. Hoy, soy un <strong className="text-indigo-300">Desarrollador Frontend</strong> especializado en <strong className="text-white">React, Next.js y TypeScript</strong>.
          </p>

          <p>
            Me motiva crear módulos nuevos desde cero y resolver el rompecabezas que implica conectar un frontend atractivo con lógica de backend y servicios <strong className="text-white">AWS</strong>. 
            No solo escribo código; me involucro en la creación de soluciones que funcionen.
          </p>

          <p>
            Creo firmemente que el mejor software se construye en equipo. Me caracterizo por ser quien apoya a sus compañeros, resuelve dudas técnicas y fomenta un ambiente de crecimiento. 
            Cuando no estoy programando o aprendiendo sobre tecnologías Serverless, probablemente me encuentres disfrutando de un buen videojuego.
          </p>
        </div>

        <div className="mt-8 md:mt-12">
          <h3 className="text-lg md:text-xl font-black tracking-widest text-transparent [-webkit-text-stroke:1px_#818cf8] uppercase mb-4 md:mb-6">
            Stack
          </h3>
          
          <ul className="flex flex-wrap gap-2 md:gap-3">
            {skills.map((skill, index) => (
              <motion.li
                key={index}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  borderColor: "#818cf8",
                  boxShadow: "0 0 15px rgba(129, 140, 248, 0.4)",
                  y: -3
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gray-800/40 text-gray-300 px-3 py-1.5 md:px-4 md:py-2 rounded text-xs md:text-sm font-mono border border-gray-700/50 cursor-default"
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default About;