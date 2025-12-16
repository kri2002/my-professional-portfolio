"use client";

import React, { useRef, useEffect } from "react";
import { useObserver } from "@/context/ObserverContext";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Image from "next/image";

const projects = [
  {
    title: "Kiiwik E-commerce",
    description:
      "Arquitectura multivendedor de alto rendimiento. Implementé autenticación segura con AWS Cognito, almacenamiento optimizado en S3 y un estado global complejo para manejar carritos dinámicos.",
    tech: ["Next.js", "Redux", "AWS Cognito", "S3", "Stripe"],
    // github: "#",
    link: "https://www.kiiwik.mx/",
    image: "/projects/kiiwik.jpeg",
    isLogo: false,
  },
  {
    title: "Kridexia",
    description:
      "Aplicación SPA que consume la PokeAPI para explorar, buscar y visualizar detalles de Pokémon. Enfocada en la performance, diseño responsivo y buenas prácticas de arquitectura de componentes. Incluye pruebas unitarias.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Jest"],
    // github: "#",
    link: "https://kridexia.netlify.app/",
    image: "/projects/kridexia.jpeg",
    isLogo: false,
  },
];

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative border border-gray-800 bg-gray-900/40 rounded-lg overflow-hidden transition-colors duration-300 hover:border-gray-700/50 hover:bg-gray-900/60"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative p-6 flex flex-col md:flex-row gap-6 items-center">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 relative w-full md:w-52 aspect-video rounded border border-white/5 bg-gray-950 overflow-hidden group-hover:border-white/10 transition-colors"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`transition-transform duration-500 group-hover:scale-105 ${
              project.isLogo ? "object-contain p-2" : "object-cover"
            }`}
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </a>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="text-xl font-bold text-slate-100 group/title">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-indigo-400 transition-colors"
              >
                {project.title}
                <FiExternalLink
                  className="inline-block transition-transform duration-200 group-hover/title:-translate-y-1 group-hover/title:translate-x-1"
                  size={18}
                />
              </a>
            </h3>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          <ul className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((t: string, i: number) => (
              <li
                key={i}
                className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const observe = useObserver();

  useEffect(() => {
    if (sectionRef.current) {
      observe(sectionRef.current);
    }
  }, [observe]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="flex flex-col justify-center py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white flex items-end gap-3">
          <span className="text-4xl md:text-5xl font-black text-transparent [-webkit-text-stroke:1px_#818cf8]">
            03.
          </span>
          Proyectos
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <a
          href="https://github.com/kri2002"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono text-indigo-400 hover:text-indigo-300 transition-colors border-b border-transparent hover:border-indigo-300 pb-0.5"
        >
          Ver todos los proyectos <FiExternalLink />
        </a>
      </motion.div>
    </section>
  );
};

export default Projects;
