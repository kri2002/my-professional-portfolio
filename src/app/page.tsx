"use client";

import React, { useRef, useEffect } from 'react';
import { useObserver } from '@/context/ObserverContext';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import OtherProjects from '@/components/sections/OtherProjects';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const observe = useObserver();

  useEffect(() => {
    if (heroRef.current) observe(heroRef.current);
  }, [observe]);

  return (
    <div className="max-w-4xl">
      
      <About />
      <Experience />
      <Projects />
      <OtherProjects />
      <Education />
      <Contact />
      <Footer/>
    </div>
  );
}