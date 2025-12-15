"use client";

import React, { useEffect, useState, useRef } from "react";
import NavPanel from "@/components/layout/NavPanel";
import {
  ActiveSectionProvider,
  useActiveSection,
} from "@/context/ActiveSectionContext";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ObserverProvider } from "@/context/ObserverContext";
import { motion } from "framer-motion";

interface MainLayoutProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<MainLayoutProps> = ({ children }) => {
  const { activeSection, setActiveSection } = useActiveSection();
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(
    null
  );
  const [isHeroMode, setIsHeroMode] = useState(true);
  const touchStartY = useRef(0);

  const { activeSection: observedSection, observe } = useIntersectionObserver(
    scrollContainer,
    "-10% 0px -45% 0px"
  );

  useEffect(() => {
    if (!isHeroMode && observedSection) {
      setActiveSection(observedSection);
    }
  }, [observedSection, setActiveSection, isHeroMode]);

  useEffect(() => {
    if (activeSection === "hero") setIsHeroMode(true);
  }, [activeSection]);

  const handleWheel = (e: React.WheelEvent) => {
    if (isHeroMode) {
      if (e.deltaY > 0) {
        setIsHeroMode(false);
      }
    } else {
      if (scrollContainer && scrollContainer.scrollTop === 0 && e.deltaY < 0) {
        setIsHeroMode(true);
        setActiveSection("hero");
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (isHeroMode) {
      if (deltaY > 50) setIsHeroMode(false);
    } else {
      if (scrollContainer && scrollContainer.scrollTop === 0 && deltaY < -50) {
        setIsHeroMode(true);
        setActiveSection("hero");
      }
    }
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="flex min-h-screen w-full bg-gray-900 text-white font-sans overflow-hidden"
    >
      <motion.aside
        layout
        initial={false}
        animate={{
          width: isHeroMode ? "100%" : "40%",
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 h-full z-50 bg-gray-900 pointer-events-none hidden lg:flex flex-col py-24 px-12 xl:px-24"
      >
        <NavPanel />
      </motion.aside>

      <div
        ref={setScrollContainer}
        className={`w-full h-screen scroll-smooth relative z-10 ${
          isHeroMode ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden"
        }`}
        id="scroll-container"
      >
        <motion.main
          className="px-12 xl:px-24 pb-48 w-full lg:w-[60%] lg:ml-[40%]"
          animate={{ opacity: isHeroMode ? 0 : 1 }}
          transition={{ duration: 0.8 }}
        >
          <ObserverProvider value={observe}>{children}</ObserverProvider>
        </motion.main>
      </div>
    </div>
  );
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ActiveSectionProvider>
      <LayoutContent>{children}</LayoutContent>
    </ActiveSectionProvider>
  );
};

export default MainLayout;
