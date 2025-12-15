"use client";

import React, { useRef } from "react";
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
  return (
    <div className="absolute inset-0 -z-10" style={{ pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 14], fov: 45 }} 
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
    <div className="sticky top-0 flex flex-col h-screen w-full pointer-events-none isolate">
      
      <motion.div
        className="fixed inset-0 -z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHero ? 1 : 0 }}
        transition={{ duration: .5, ease: "easeInOut" }}
        style={{ pointerEvents: "none" }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-[#0f172a] via-transparent to-[#0f172a] z-10" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0f172a]/60 to-[#0f172a] z-10" />
        
        <Scene3D />
      </motion.div>

      <motion.div 
        layout
        transition={transitionConfig}
        className={`flex flex-col z-20 pointer-events-none ${
          isHero 
            ? 'h-[calc(100vh-100px)] justify-center items-center' 
            : 'h-auto justify-start items-start mb-12'
        }`}
      >
        <motion.div 
          layout 
          transition={transitionConfig}
          className={`flex ${
            isHero 
              ? 'flex-col items-center gap-1' 
              : 'flex-row items-baseline gap-3'
          }`}
        >
          <motion.h1
            layoutId="title-cristo"
            transition={transitionConfig}
            className={`font-extrabold tracking-tight text-white leading-none ${
              isHero ? 'text-6xl md:text-8xl drop-shadow-2xl' : 'text-5xl'
            }`}
          >
            Cristo
          </motion.h1>

          <motion.h1
            layoutId="title-aguilar"
            transition={transitionConfig}
            className={`font-extrabold tracking-tight leading-none bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-blue-300 to-indigo-300 bg-size-[200%_auto] animate-gradient ${
              isHero ? 'text-6xl md:text-8xl drop-shadow-xl pb-3' : 'text-5xl text-indigo-400 pb-2'
            }`}
          >
            Aguilar
          </motion.h1>
        </motion.div>

        <motion.h2 
          layoutId="subtitle"
          transition={transitionConfig}
          className={`font-medium tracking-wide text-slate-200 mt-3 whitespace-nowrap leading-none ${
            isHero ? 'text-xl md:text-3xl' : 'text-xl'
          }`}
          style={{ transformOrigin: isHero ? "center" : "left" }}
          animate={{ paddingLeft: isHero ? 0 : 4 }}
        >
          Ingeniero en Desarrollo de Software
        </motion.h2>

        <motion.p 
          layoutId="description" 
          transition={transitionConfig}
          className={`text-slate-400 whitespace-nowrap leading-none ${
            isHero ? 'text-base mt-5 text-center max-w-md font-light' : 'text-xs mt-3 text-left'
          }`}
          style={{ transformOrigin: isHero ? "center" : "left" }}
          animate={{ paddingLeft: isHero ? 0 : 4 }}
        >
          Convirtiendo problemas complejos en soluciones desplegables.
        </motion.p>

        <AnimatePresence>
          {isHero && (
            <motion.div 
              layout
              key="arrow-container"
              initial={{ opacity: 0, marginTop: 0, scale: 0.8 }}
              animate={{ opacity: 1, marginTop: 56, scale: 1, transition: { delay: 0.5, type: "spring" as const } }}
              exit={{ opacity: 0, marginTop: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="flex flex-col items-center gap-4"
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
        className="mt-auto flex space-x-6 pl-1 pb-1 z-20 pointer-events-auto"
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