"use client";

import React, { useRef, useEffect } from "react";
import { useObserver } from "@/context/ObserverContext";
import { motion } from "framer-motion";

const skills = [
  "PHP", "Laravel", "Livewire", "MySQL", 
  "React", "Next.js", "Redux", "Angular", 
  "AWS (S3, EC2, Cognito)", "DigitalOcean", 
  "REST API", "Git / GitHub", "Scrum / Jira", "Sass / Tailwind"
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
      className="flex flex-col justify-start pt-24 pb-24 min-h-[50vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-8 text-white">
          <span className="text-indigo-400">01.</span> Acerca de Mí
        </h2>

        <div className="space-y-6 text-gray-400 text-lg leading-relaxed max-w-3xl">
          <p>
            Soy un <strong className="text-indigo-300">Desarrollador Web Full Stack Junior</strong> con más de 3 años de experiencia 
            construyendo aplicaciones end-to-end.
          </p>

          <p>
            Me especializo en integrar servicios en la nube como <strong className="text-white">AWS</strong> y DigitalOcean,
            y actualmente construyo soluciones modernas utilizando <strong className="text-white">Laravel + Next.js</strong>.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">
            Stack Tecnológico
          </h3>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.li
                key={index}
                className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded text-xs font-mono border border-gray-700/50"
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