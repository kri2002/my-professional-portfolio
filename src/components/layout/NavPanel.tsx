"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDown } from "react-icons/fi";
import { useActiveSection } from "@/context/ActiveSectionContext";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

const transitionConfig = {
  type: "spring" as const,
  damping: 25,
  stiffness: 120,
  duration: 0.8,
};

const navContainerVariants: Variants = {
  hidden: { 
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" }
  },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.4, staggerChildren: 0.1 }
  }
};

const navItemVariants: Variants = {
  hidden: { y: -10, opacity: 0, transition: { duration: 0.2 } },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
};

const WireframeLaptop = ({ material }: { material: THREE.Material }) => {
    const groupRef = useRef<THREE.Group>(null);
  
    useFrame((state) => {
      if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.9) * 0.15; 
      }
    });
  
    return (
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0} position={[7, 0, -2]}>
        <group ref={groupRef} rotation={[0.3, -0.5, 0.1]}>
          <mesh material={material} scale={[3.5, 0.15, 2.5]}>
            <boxGeometry />
          </mesh>
          <mesh material={material} scale={[3.5, 2.2, 0.15]} position={[0, 1.2, -1.2]} rotation={[-0.3, 0, 0]}>
            <boxGeometry />
          </mesh>
        </group>
      </Float>
    );
  };

const WireframeShapes = () => {
  const wireframeMaterial = new THREE.MeshStandardMaterial({
    color: "#60a5fa", 
    emissive: "#60a5fa",
    emissiveIntensity: 0.8,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  });

  return (
    <group>
        <WireframeLaptop material={wireframeMaterial} />

      <Float speed={1.5} rotationIntensity={2} floatIntensity={0} position={[-7, 5, -2]}>
        <mesh scale={[2.5, 2.5, 2.5]} material={wireframeMaterial}>
          <icosahedronGeometry args={[1, 1]} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={0} position={[-6, -5, -2]}>
        <mesh scale={[3, 3, 3]} material={wireframeMaterial} rotation={[0.5, 1, 0]}>
          <icosahedronGeometry args={[1, 0]} />
        </mesh>
      </Float>
      
      <Float speed={1} rotationIntensity={3} floatIntensity={0} position={[6, 6, -4]}>
         <mesh scale={[1.5, 1.5, 1.5]} material={wireframeMaterial} rotation={[1, 0, 0.5]}>
            <octahedronGeometry args={[1, 0]} />
         </mesh>
      </Float>

       <Float speed={1} rotationIntensity={10} floatIntensity={0} position={[5, -7, -5]}>
         <mesh scale={[1, 1, 1]} material={wireframeMaterial} rotation={[0, 0.5, 1]}>
            <icosahedronGeometry args={[1, 2]} />
         </mesh>
      </Float>
    </group>
  );
};

const Scene3D = () => {
  // Detectamos móvil para alejar la cámara y que los objetos no estorben
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 -z-10" style={{ pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, isMobile ? 22 : 14], fov: 45 }} 
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.1} />
        <WireframeShapes />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

const NavPanel: React.FC = () => {
  const { activeSection, setActiveSection } = useActiveSection();
  const isHero = activeSection === 'hero';

  const navItems = [
    { id: "about", label: "ACERCA DE MÍ", href: "#about" },
    { id: "experience", label: "EXPERIENCIA", href: "#experience" },
    // { id: "projects", label: "PROYECTOS", href: "#projects" },
  ];

  return (
    <div className="flex flex-col w-full lg:h-screen lg:sticky lg:top-0 pointer-events-auto relative isolate bg-[#0f172a]">
      
      {/* FONDO 3D */}
      <motion.div
        className="fixed inset-0 -z-50"
        // En móvil siempre mostramos el fondo (opacity 1), en desktop depende de si es hero
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} // Siempre visible para dar ambiente
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ pointerEvents: "none" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-transparent to-[#0f172a] z-10" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0f172a]/60 to-[#0f172a] z-10" />
        
        <Scene3D />
      </motion.div>

      {/* CONTENEDOR PRINCIPAL: TEXTO + HEADER */}
      <motion.div 
        layout
        transition={transitionConfig}
        className={`flex flex-col z-20 pointer-events-auto px-6 lg:px-0 
          ${isHero 
            // MOBILE: Altura automática y padding normal. DESKTOP: Altura completa y centrado
            ? 'h-auto pt-10 pb-4 lg:h-[calc(100vh-100px)] lg:justify-center lg:items-center lg:pt-0 lg:pb-0' 
            // NO HERO (Ambos): Alineado arriba
            : 'h-auto justify-start items-center lg:items-start pt-10 lg:pt-0 mb-4 lg:mb-12' 
          }`}
      >
        <motion.div 
          layout 
          transition={transitionConfig}
          className={`flex ${
            isHero 
              // MOBILE: Siempre fila compacta. DESKTOP: Columna centrada
              ? 'flex-row items-baseline gap-2 lg:flex-col lg:items-center lg:gap-1' 
              : 'flex-row items-baseline gap-2 lg:gap-3'
          }`}
        >
          <motion.h1
            layoutId="title-cristo"
            transition={transitionConfig}
            className={`font-extrabold tracking-tight text-white leading-none ${
              // Texto más pequeño en móvil para que quepa en una línea
              isHero ? 'text-3xl lg:text-6xl xl:text-8xl drop-shadow-2xl' : 'text-2xl lg:text-5xl'
            }`}
          >
            Cristo
          </motion.h1>

          <motion.h1
            layoutId="title-aguilar"
            transition={transitionConfig}
            className={`font-black tracking-tight leading-none text-transparent [-webkit-text-stroke:1px_#818cf8] lg:[-webkit-text-stroke:2px_#818cf8] ${
              isHero ? 'text-3xl lg:text-6xl xl:text-8xl pb-1 lg:pb-3' : 'text-2xl lg:text-5xl text-indigo-400 pb-1 lg:pb-2'
            }`}
          >
            Aguilar
          </motion.h1>
        </motion.div>

        <motion.h2 
          layoutId="subtitle"
          transition={transitionConfig}
          className={`font-medium tracking-wide text-slate-200 mt-1 lg:mt-3 whitespace-nowrap leading-none ${
            isHero ? 'text-sm lg:text-xl md:text-3xl' : 'text-xs lg:text-xl'
          }`}
          style={{ transformOrigin: isHero ? "center" : "left" }}
          animate={{ paddingLeft: isHero ? 0 : 4 }}
        >
          Ingeniero Frontend
        </motion.h2>

        {/* Descripción: Oculta en móvil para limpiar la vista, visible en desktop */}
        <motion.p 
          layoutId="description" 
          transition={transitionConfig}
          className={`text-slate-400 whitespace-nowrap leading-none ${
            // En móvil ocultamos la descripción si es Hero para que sea solo un Header limpio
            isHero 
                ? 'hidden lg:block text-base mt-5 text-center max-w-md font-light' 
                : 'hidden lg:block text-xs mt-3 text-left'
          }`}
          style={{ transformOrigin: isHero ? "center" : "left" }}
          animate={{ paddingLeft: isHero ? 0 : 4 }}
        >
          Construyo experiencias digitales sólidas y escalables.
        </motion.p>

        {/* Flecha: SOLO visible en DESKTOP cuando es Hero */}
        <AnimatePresence>
          {isHero && (
            <motion.div 
              layout
              key="arrow-container"
              initial={{ opacity: 0, marginTop: 0, scale: 0.8 }}
              animate={{ opacity: 1, marginTop: 56, scale: 1, transition: { delay: 0.5, type: "spring" as const } }}
              exit={{ opacity: 0, marginTop: 0, scale: 0.8, transition: { duration: 0.2 } }}
              // CLAVE: 'hidden lg:flex' para que no salga en el móvil
              className="hidden lg:flex flex-col items-center gap-4"
            >
              <motion.div 
                animate={{ y: [0, 8, 0] }} 
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="p-3 rounded-full border border-indigo-400/20 bg-indigo-950/30 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.15)]"
              >
                <FiArrowDown className="text-indigo-300 text-xl" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* MENÚ MÓVIL: Siempre visible debajo del nombre */}
      <motion.nav 
        layout
        transition={transitionConfig}
        className={`flex z-20 pointer-events-auto lg:hidden w-full justify-center pb-4`}
      >
         <div className="flex gap-5">
            {navItems.map((item) => (
                <Link 
                    key={item.id} 
                    href={item.href} 
                    onClick={() => setActiveSection(item.id)} 
                    className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${
                        activeSection === item.id ? "text-indigo-400" : "text-slate-400"
                    }`}
                >
                    {item.label}
                </Link>
            ))}
         </div>
      </motion.nav>

      {/* MENÚ DESKTOP: Comportamiento original (Sidebar) */}
      <motion.nav 
        layout
        transition={transitionConfig}
        className={`hidden lg:flex flex-col pl-1 mt-16 z-20 pointer-events-auto ${
            isHero ? 'flex-none h-0 opacity-0' : 'flex-1 opacity-100'
        }`}
      >
        <motion.ul 
          layout
          className="space-y-6 py-2"
          variants={navContainerVariants}
          initial="hidden"
          animate={isHero ? "hidden" : "visible"}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <motion.li layout key={item.id} variants={navItemVariants}>
                <Link
                  href={item.href}
                  className="flex items-center group py-1 w-fit cursor-pointer"
                  onClick={() => setActiveSection(item.id)}
                >
                  <motion.div
                    className="mr-4 h-px"
                    animate={{
                      width: isActive ? 48 : 24,
                      backgroundColor: isActive ? "#818cf8" : "#4b5563"
                    }}
                    whileHover={{ width: 48, backgroundColor: isActive ? "#818cf8" : "#9ca3af" }}
                  />
                  <motion.span 
                    className={`text-xs font-bold tracking-widest leading-none transition-colors duration-300 ${isActive ? "text-indigo-400" : "text-gray-400 group-hover:text-indigo-400"}`}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.nav>

      <motion.div 
        layout
        transition={transitionConfig}
        className="hidden lg:flex mt-auto space-x-6 pl-1 pb-1 z-20 pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <FiGithub className="h-5 w-5 text-slate-500 hover:text-indigo-300 cursor-pointer transition-colors duration-300" />
        <FiLinkedin className="h-5 w-5 text-slate-500 hover:text-indigo-300 cursor-pointer transition-colors duration-300" />
        <FiTwitter className="h-5 w-5 text-slate-500 hover:text-indigo-300 cursor-pointer transition-colors duration-300" />
      </motion.div>
    </div>
  );
};

export default NavPanel;