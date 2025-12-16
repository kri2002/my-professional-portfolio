"use client";

import React, { useRef, useEffect } from "react";
import { useObserver } from "@/context/ObserverContext";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Image from "next/image";

const learningProjects = [
  {
    title: "TalentMind UI",
    type: "Proyecto Freelance",
    description:
      "Landing page SaaS pixel-perfect con animaciones fluidas y arquitectura de componentes reutilizables.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    // github: "#",
    link: "https://talent-mind.netlify.app/",
    image: "/projects/talentmind.png",
  },
  {
    title: "XV Jatziry - Invitación",
    type: "Proyecto Freelance",
    description:
      "Invitación interactiva con gestión de accesos, mapas y diseño elegante mobile-first.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Maps API"],
    // github: "#",
    link: "https://xv-jatziry.netlify.app/",
    image: "/projects/jatziry.png",
  },
  {
    title: "Tip Calculator",
    type: "Proyecto de Aprendizaje",
    description:
      "Calculadora de consumo en tiempo real con lógica robusta en TypeScript y diseño responsivo.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Hooks"],
    // github: "#",
    link: "https://calculatortips260802.netlify.app/",
    image: "/projects/tips.png",
  },
  {
    title: "GuitarLA - TS",
    type: "Proyecto de Aprendizaje",
    description:
      "E-commerce con carrito persistente, gestión de estado compleja (useReducer) y tipado estricto.",
    tech: ["React", "TypeScript", "CSS Modules", "Vite"],
    // github: "#",
    link: "https://guitarlats260802.netlify.app/",
    image: "/projects/guitarla.png",
  },
];

const LearningProjectCard = ({
  project,
  index,
}: {
  project: any;
  index: number;
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group grid grid-cols-12 items-center gap-y-8 md:gap-y-0"
    >
      <div
        className={`
        col-span-12 relative w-full aspect-video shadow-xl rounded-lg overflow-hidden
        md:row-start-1 md:col-span-8 {/* CAMBIO: Aumentado a 8 columnas */}
        ${isEven ? "md:col-start-1" : "md:col-start-5"} {/* CAMBIO: Ajuste de inicio para mantener alineación */}
        z-10 transition-all duration-300 group-hover:z-30
      `}
      >
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full relative group"
        >
          <div className="absolute inset-0 bg-indigo-900/40 mix-blend-multiply z-10 transition-all duration-300 group-hover:bg-transparent" />
          <div className="absolute inset-0 bg-gray-900/20 z-10 transition-all duration-300 group-hover:bg-transparent" />

          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </a>
      </div>

      <div
        className={`
        col-span-12 relative z-20 flex flex-col pointer-events-none md:pointer-events-auto
        md:row-start-1 md:col-span-7
        ${
          isEven
            ? "md:col-start-6 md:items-end md:text-right"
            : "md:col-start-1 md:items-start md:text-left"
        }
      `}
      >
        <p className="text-indigo-400 font-mono text-xs md:text-sm mb-2 tracking-wide font-bold">
          {project.type}
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6 hover:text-indigo-400 transition-colors pointer-events-auto">
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h3>

        <div
          className={`
            bg-[#112240] p-6 rounded-lg shadow-xl text-slate-400 text-sm md:text-base leading-relaxed mb-6 w-full pointer-events-auto hover:shadow-2xl transition-shadow
            ${isEven ? "" : "md:text-left"} 
        `}
        >
          {project.description}
        </div>

        <ul
          className={`flex flex-wrap gap-x-5 gap-y-2 mb-8 text-xs font-mono text-slate-400 pointer-events-auto ${
            isEven ? "justify-end" : "justify-start"
          }`}
        >
          {project.tech.map((t: string, i: number) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        <div
          className={`flex items-center gap-6 text-slate-100 pointer-events-auto ${
            isEven ? "justify-end" : "justify-start"
          }`}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            <FiExternalLink size={22} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const OtherProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const observe = useObserver();

  useEffect(() => {
    if (sectionRef.current) {
      observe(sectionRef.current);
    }
  }, [observe]);

  return (
    <section
      id="learning"
      ref={sectionRef}
      className="flex flex-col justify-center py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 md:mb-32"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-end gap-3">
          <span className="text-2xl md:text-5xl font-black text-transparent [-webkit-text-stroke:1px_#818cf8]">
            04.
          </span>
          Otros Proyectos
        </h2>
      </motion.div>

      <div className="flex flex-col gap-24 md:gap-32">
        {learningProjects.map((project, index) => (
          <LearningProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default OtherProjects;