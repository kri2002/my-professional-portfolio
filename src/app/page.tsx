"use client";

import React, { useRef, useEffect } from 'react';
import { useObserver } from '@/context/ObserverContext';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';


export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const observe = useObserver();

  useEffect(() => {
    if (heroRef.current) observe(heroRef.current);
  }, [observe]);

  return (
    <div className="max-w-4xl">
      
      <div ref={heroRef} id="hero" className="absolute top-0 h-10 w-full pointer-events-none" />

      <About />
      <Experience />
      
    </div>
  );
}